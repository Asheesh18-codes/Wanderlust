# Wanderlust

Wanderlust is a full-stack web application for listing, reviewing, and managing travel accommodations. Built with Node.js, Express, MongoDB, and EJS, it allows users to sign up, log in, create listings, and leave reviews.

## Features

- User authentication (signup, login, logout)
- Create, edit, and delete listings
- Leave reviews on listings
- Flash messages for user feedback
- Responsive UI with Bootstrap and custom CSS
- RESTful routing for listings and reviews
- Modular code structure for scalability
- Database seeding for demo/testing

## Folder Structure

```
.
├── app.js
├── middleware.js
├── schema.js
├── models/
├── Routes/
├── utils/
├── init/
├── public/
├── views/
└── package.json
```

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB running locally or Atlas

### Installation

1. Clone the repository:
    ```sh
    git clone <your-repo-url>
    cd Full-Stack-Wanderlust-Project
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. (Optional) Seed the database:
    ```sh
    node init/index.js
    ```

4. Start the server:
    ```sh
    node app.js
    ```

5. Visit [http://localhost:8080](http://localhost:8080) in your browser.

## Environment Variables

Create a `.env` file in the root directory and add:

```
SESSION_SECRET=your_secret_key
MONGODB_URI=your_mongodb_connection_string
```

- `SESSION_SECRET`: Set a custom session secret for production.
- `MONGODB_URI`: (Optional) Use a custom MongoDB URI (defaults to localhost if not set).

## Technologies Used

- Node.js, Express
- MongoDB, Mongoose
- Passport.js (authentication)
- EJS & EJS-Mate (templating)
- Bootstrap 5, Font Awesome

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT

---

*This project is for educational purposes.*