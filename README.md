# YelpCamp - project by [Mitul30M](https://github.com/Mitul30M)


[YelpCamp](https://yelpcamp-boqf.onrender.com) is a camping site application that allows users to view, create, edit, and review campgrounds around the world. Built with Node.js, Express, and MongoDB, it features full CRUD functionality, user authentication, and session management.


![Screenshot (274)](https://github.com/Mitul30M/YelpCamp/assets/120619177/58a4499a-28d4-49be-a244-26ea6f9bcd66)

![Screenshot (275)](https://github.com/Mitul30M/YelpCamp/assets/120619177/4248ad39-6a4e-44a7-bbb2-e504a70d7a94)

![Screenshot (270)](https://github.com/Mitul30M/YelpCamp/assets/120619177/0dccb579-8726-40fb-83ef-faf603786a5f)

![Screenshot (268)](https://github.com/Mitul30M/YelpCamp/assets/120619177/36357be2-bd6d-45c4-826e-3e7f53ff2bb5)

![Screenshot (283)](https://github.com/Mitul30M/YelpCamp/assets/120619177/c14dfc96-b796-4df8-9dad-1223bdacd6ec)





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

## Project Dependencies

### Dependencies

- **[@mapbox/mapbox-sdk](https://www.npmjs.com/package/@mapbox/mapbox-sdk)**: Mapbox SDK for Node.js.
- **[axios](https://www.npmjs.com/package/axios)**: Promise-based HTTP client for the browser and Node.js.
- **[bootstrap](https://getbootstrap.com/)**: Front-end framework for developing responsive and mobile-first websites.
- **[cloudinary](https://cloudinary.com/documentation/node_integration)**: Cloud-based image and video management service.
- **[connect-flash](https://www.npmjs.com/package/connect-flash)**: Flash message middleware for Connect/Express.
- **[connect-mongo](https://www.npmjs.com/package/connect-mongo)**: MongoDB session store for Express and Connect.
- **[dotenv](https://www.npmjs.com/package/dotenv)**: Loads environment variables from a `.env` file into `process.env`.
- **[ejs](https://ejs.co/)**: Embedded JavaScript templates for rendering dynamic content.
- **[ejs-mate](https://www.npmjs.com/package/ejs-mate)**: EJS layouts for Express.
- **[express](https://expressjs.com/)**: Web application framework for Node.js.
- **[express-mongo-sanitize](https://www.npmjs.com/package/express-mongo-sanitize)**: Middleware to sanitize user-supplied data to prevent MongoDB Operator Injection.
- **[express-session](https://www.npmjs.com/package/express-session)**: Session middleware for Express.
- **[helmet](https://helmetjs.github.io/)**: Secure Express apps with various HTTP headers.
- **[joi](https://joi.dev/)**: Object schema description language and validator for JavaScript objects.
- **[method-override](https://www.npmjs.com/package/method-override)**: Override HTTP verbs for Express middleware.
- **[mongoose](https://mongoosejs.com/)**: MongoDB object modeling for Node.js.
- **[multer](https://www.npmjs.com/package/multer)**: Middleware for handling `multipart/form-data`, primarily used for file uploads.
- **[multer-storage-cloudinary](https://www.npmjs.com/package/multer-storage-cloudinary)**: Multer storage engine for Cloudinary.
- **[nodemon](https://nodemon.io/)**: Monitor for any changes in your source and automatically restart your server.
- **[passport](http://www.passportjs.org/)**: Simple, unobtrusive authentication for Node.js.
- **[passport-local](https://www.npmjs.com/package/passport-local)**: Passport strategy for authenticating with a username and password.
- **[passport-local-mongoose](https://www.npmjs.com/package/passport-local-mongoose)**: Passport plugin for Mongoose with built-in username/password hashing.
- **[sanitize-html](https://www.npmjs.com/package/sanitize-html)**: HTML and text sanitization library.

### Development Dependencies

- **[@types/sanitize-html](https://www.npmjs.com/package/@types/sanitize-html)**: TypeScript type definitions for sanitize-html.



## Authors

* Mitul Mungase - *Initial work* - [Mitul30M](https://github.com/Mitul30M)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details.

## Acknowledgments

* Colt Steele, whose course inspired this project.
* All contributors and testers who helped in improving the app.


