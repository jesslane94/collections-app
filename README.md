# Collection Tracking App

## Overview

This web app was created for keeping track of a collection of items you own. Its intended use is for organization/productivity, to help prevent duplicate buying of products,
and to see everything you own in one spot! You can also make note of each items characteristics at time of ownership. At the time, you must fill in all the fields in order to submit an item.

**LIVE LINK**: https://collections-90baf.web.app/

## Features

- authentication through Google
- image and data upload to Firestore
- update and delete items already in the database
- dynamic population of items

## Dependencies

- React
- React-DOM
- React-Router-DOM
- Firebase
- Bootstrap

### running locally

1. clone repo locally
2. add config file to src with your firebase information (API key, etc). this involves setting up a project on the firebase console. See - https://firebase.google.com/docs/web/setup

- I used app, firestore database, storage, and auth in my project.

3. cd into the collections folder
4. run npm install
5. run npm start on the command line

### task list

- [x] add delete functionality
- [x] add update functionality
- [x] have update fields autopopulate with previous information
- [ ] make all fields optional besides name?
- [ ] add search/filter functionality
- [ ] ongoing - make UI prettier

### stretch goals

- [ ] adding multiple photos
- [ ] add ability to customize fields?
- [ ] add multiple collections ability?
