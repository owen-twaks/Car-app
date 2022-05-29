# MERN Car Database

App performs _CRUD_ operations for a car database.

_Creates_ - A new car with fields:

- Model
- Make
- Colour
- Registration
- Owner
- Address

_Reads_ - The entire car database and cars older than 5 years.

_Updates_ - The registration, owner and address for individual cars. The owner and address an be updated (updateMany) for all cars older than 10 years.

_Delete_ - remove a car from the database.

## Installation

Download files and run the following commands:

```
# cars (backend)
 - Install backend dependencies
    npm install

 - Run Express server only
    npm run server

# client
 - Install client dependencies
    npm install - in the client directory
    npm run client-install - in the Express server directory

 - Run the client React app
    npm run client

# Run client and server concurrently
    npm run dev

```

The server runs on `localhost:3001/api`.

The client app runs on `localhost:3000`

## Usage

Create a config.env in the config directory with the following:

```
MONGO_URI = mongodb+srv://xxxxxxx
JWT_SECRET = xxx

```
