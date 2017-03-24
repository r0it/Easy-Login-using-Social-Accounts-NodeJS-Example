Easy Login using Social Accounts NodeJS Example
==============

Take a look at the example here [Easy Login using Social Accounts](https://easy-social-auths.herokuapp.com/).

This repository serves as an example for a basic Node.js application which is using [Passport](http://passportjs.org/) as the authentication middleware for authenticating using Facebook, Google+, LinkedIn and storing the details in a locally configured Mongo backend

Steps to run the app
=====================
* After cloning the repo, install the dependencies by running **npm install**
* Create Facebook, Google and LinkedIn apps and update the config file config/config.js with the respective app details before running the server.
* To start the server, run **npm start** on the base directory
 

Perquisites
============
The server assumes that you have a local mongo instance running. This means if you have mongo installed locally, all you need to do is configure the file config/config.js with mongodb url correctly and run the mongod daemon.
