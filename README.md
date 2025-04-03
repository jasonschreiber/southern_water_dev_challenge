# Setting up environment to run locally

These are the instructions to setup and run this dev challenge locally. Unfortunately with the time limit I was not able to publish to a live production domain.

## Clone the repository

Clone the repostory down into your local machine using git clone https://github.com/jasonschreiber/southern_water_dev_challenge.git
Open in Visual Studio Code and open a bash terminal. Or open directly in a bash terminal and cd to the root directory.

### `npm install`

Run npm install in the root directory and client directory. This will install the required node_modules. The node.js backend server runs from the route and the front end React will run from the client.

### `npm run build`

if you want to run the production version of react set NODE_ENV=production in the .env. I normally would upload the .env in the source code as it can be a security risk. However it was needed for this test to allow you to run it easier.

You will also need to run npm run build to compile the static pages and code for the client.

if you want to leave the client in dev then leave  NODE_ENV=dev

### `npm run dev`
if the .env NODE_ENV=dev is set use this command.
The backend server will launch on localhost:5000 and front-end on localhost:3000

### `npm run start`
if the .env NODE_ENV=prodcution is set use this command.
The backend server will launch on localhost:5000 and host the front-end on localhost:5000 as well.
