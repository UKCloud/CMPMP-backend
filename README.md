# Express Session Management
An express session will hold the clients unique data to allow the server to keep track of the user's state. It will save the session ID in the cookie itself.

### Installations
When installing packages use `npm install ` and the package name needed to be following after. The main packages needed for express-session are 'express', 'express-session' and 'express-mysql-session.' 

### Environment Variables
* SESSION_SECRET: This is the key used for signing and encrypting cookies set by application to mantain session state. It will compute the hash.
* SESSION_HOST: The host name of database connection.
* SESSION_PORT: The port number of database connection.
* SESSION_USER: The username of database user.
* SESSION_PASSWORD: The password for the database user.
* SESSION_DATABASE: The name of the database.

### Code explained:
The code needed to set up a session:
`app.use(session({
  secret: getOption("SESSION_SECRET"),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true,
            maxAge: 2628000000}
}))`
* secret: random unique string key used for authenticating the session. It is a envrinoment variable as it should not be available for the public, thisbis retrieved from the .env file by the get function made. 
* resave: a boolean value, which allows the session to be stored back to the session store. 'True' is the default value.
* saveUninitialized: a boolean value,this lets any 'uninitialized' session to be sent to store. 'Uninitialized' means a session that has been created and not modified.
* cookies: 'maxage' sets the expiry time for cookie. 'secure' is set to 'true' to prevent cookie being available to unauthorized parties.

Config.js file explained:
This file exports the environment variables from the .env file in a config function, this allows you to use the variables throughout the code. When using those variables you will need to import them on that page using:
`import { config } from "./config.js" ;`


### Running express-session
Run `npm run dev` to start the express session.
