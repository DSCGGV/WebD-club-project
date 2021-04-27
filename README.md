# WebD-club-project

This repo will contain webD projects made by our awesome club members. This project contains code for online feedback system developed for our university by WebD club of DSC GGV.

### How to run server

- Go to server directory and run `npm install`
- Install Nodemon by using the following command `npm i nodemon`
- Run Server by `nodemon server.js`

### Database Connection

- Create `config.env` in main directory
- Create a veriable DATABASE and initiate it with your MongoDB connection uri string
  `DATABASE=Your_MongoDB_Connection_URI`  
  and port number  
  `PORT= Port number`

## Folder Structure

    .
    ├── public
    │   ├── animate
    │   ├── css
    │   ├── fonts
    │   ├── html
    │   ├── images
    │   └── js
    ├── server
    │   ├── db
    │   ├── node_modules
    │   ├── router
    │   ├── views
    │   ├── package-lock.json
    │   ├── package.json
    │   └── server.js
    ├── .gitignore
    ├── config.env
    ├── CONTRIBUTION.md
    ├── PROFILE.md
    └── README.md
