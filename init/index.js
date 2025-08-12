const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const Listing = require('../models/listing');
const rawData = require('./data');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');

const DB_URL = process.env.ATLASDB_URL || process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wanderlust";
const token = (process.env.MAPBOX_TOKEN || process.env.MAP_TOKEN || "").trim();

if(!token.startsWith('pk.')){
  console.error("Valid Mapbox public token (pk.*) required. Set MAPBOX_TOKEN or MAP_TOKEN.");
  process.exit(1);
}

const geocoder = mbxGeocoding({ accessToken: token });

const seeds = Array.isArray(rawData) ? rawData :
              Array.isArray(rawData.data) ? rawData.data :
              Array.isArray(rawData.listings) ? rawData.listings : [];

if(!seeds.length){
  console.error("No seed data found.");
  process.exit(1);
}

(async ()=>{
  try {
    await mongoose.connect(DB_URL);
    console.log("Connected:", DB_URL);
    await Listing.deleteMany({});
    console.log("Cleared old listings.");

    const docs = [];
    for (const seed of seeds) {
      let geometry = { type: "Point", coordinates: [0,0] };
      try {
        const resp = await geocoder.forwardGeocode({
          query: `${seed.location}, ${seed.country}`,
          limit: 1
        }).send();
        if(resp.body.features?.length){
          geometry = resp.body.features[0].geometry;
        } else {
          console.warn("No geocode result:", seed.title);
        }
      } catch(err){
        console.warn("Geocode error:", seed.title, err.message);
      }
      docs.push({ ...seed, geometry });
      // small delay to respect rate limits
      await new Promise(r=>setTimeout(r, 150));
    }

    await Listing.insertMany(docs);
    console.log("Seeded", docs.length, "listings.");
  } catch(e){
    console.error(e);
  } finally {
    await mongoose.connection.close();
    console.log("Done.");
  }
})();