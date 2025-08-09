require('dotenv').config();
const mongoose = require("mongoose");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wanderlust";
const MAP_TOKEN = process.env.MAP_TOKEN || 'your_mapbox_token_here';
const geocodingClient = mbxGeocoding({ accessToken: MAP_TOKEN });

async function main() {
  await mongoose.connect(MONGO_URL);
}

async function ensureSeedUser() {
    // Ensure a valid owner exists (Listing.owner is required)
    let owner = await User.findOne({ username: "Ashish Singh" });
    if (!owner) {
      owner = new User({ email: "mofane8980@dosonex.com", username: "Ashish Singh" });
      // passport-local-mongoose helper to set a hashed password
      await User.register(owner, "Ashish Singh");
    }
  return owner;
}

const geocodeLocation = async (location, country) => {
  try {
    const queryString = country ? `${location}, ${country}` : location;
    const response = await geocodingClient.forwardGeocode({
      query: queryString,
      limit: 1
    }).send();
    const feature = response.body.features[0];
    if (feature && feature.geometry && Array.isArray(feature.geometry.coordinates)) {
      return feature.geometry.coordinates;
    }
  } catch (err) {
    console.warn(`Geocoding failed for "${location}" -> using fallback [0,0]. Reason: ${err.message}`);
  }
  return [0, 0];
};

const initDB = async () => {
  const owner = await ensureSeedUser();

  // Clear existing listings
  await Listing.deleteMany({});
  console.log('Cleared existing listings');

  const listingsToInsert = [];
  for (const obj of initData.data) {
    const coordinates = await geocodeLocation(obj.location, obj.country);
    listingsToInsert.push({
      ...obj,
      owner: owner._id,
      geometry: { type: 'Point', coordinates }
    });
  }

  await Listing.insertMany(listingsToInsert);
  console.log(`Inserted ${listingsToInsert.length} listings`);
};

// Connect, seed, then disconnect cleanly
main()
  .then(async () => {
    console.log("Connected to DB");
    if (!process.env.MAP_TOKEN) {
      console.warn("MAP_TOKEN not set. Geocoding may fail or use placeholder token.");
    }
    await initDB();
  })
  .catch((err) => {
    console.error('Seeding failed:', err);
  })
  .finally(async () => {
    await mongoose.disconnect();
    console.log("Disconnected from DB");
  });