<h1>YelpCamp</h1>

<p>
YelpCamp is a camping site application that allows users to view, create, edit, and review campgrounds around the world. Built with Node.js, Express, and MongoDB, it features full CRUD functionality, user authentication, and session management.
</p>

<h2>Getting Started</h2>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js
- MongoDB
- npm (Node package manager)

### Installation

1. Clone the repository to your local machine:
   ```
   git clone https://github.com/yourusername/yelpcamp.git
   cd yelpcamp
   ```

2. Install the required npm packages:
   ```
   npm install
   
   ```

3. Create a `.env` file in the root directory and add your MongoDB URI and other secret keys:
   ```
   MONGO_ATLAS_DB_URL=your_mongodb_uri
   SESSION_SECRET=your_secret_key
   ```

### Running the Application

To run the application on your local machine:

1. Start the server:
   ```
   node index.js
   
   ```

2. Open your web browser and navigate to:
   ```
   http://localhost:3030
   
   ```

## Built With

* [Node.js](https://nodejs.org/en/) - The JavaScript runtime environment.
* [Express](https://expressjs.com/) - The web application framework.
* [MongoDB](https://www.mongodb.com/) - The NoSQL database.
* [Mongoose](https://mongoosejs.com/) - MongoDB object modeling tool.
* [Passport](http://www.passportjs.org/) - Authentication middleware for Node.js.
* [EJS](https://ejs.co/) - The templating engine.
* [Connect-Flash](https://github.com/jaredhanson/connect-flash) - For flashing messages.
* [Cloudinary](https://cloudinary.com/) - Image management and optimization.
* [Mapbox](https://www.mapbox.com/) - Location data platform for mobile and web applications.
* [Helmet](https://helmetjs.github.io/) - Helps secure Express apps by setting various HTTP headers.
* [Express-Session](https://github.com/expressjs/session) - Session middleware.
* [Method-Override](https://github.com/expressjs/method-override) - Use HTTP verbs like PUT or DELETE in places where the client doesn't support it.

## Authors

* Mitul Mungase - *Initial work* - [Mitul30M](https://github.com/Mitul30M)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details.

## Acknowledgments

* Colt Steele, whose course inspired this project.
* All contributors and testers who helped in improving the app.

