const { ObjectID } = require("bson");
const mongoCollections = require("../config/mongoCollections");
const validations = require("./validations");
const userCollection = mongoCollections._collection;

async function getUserData() {
  const _collection = await userCollection();
  const userData = await _collection.find({}).toArray();

  if (userData === null) throw "No user data found";

  return userData;
}

async function createUser(firstName, lastName, email, university, docFile) {
  firstName = firstName.trim();
  lastName = lastName.trim();
  email = email.trim();
  university = university.trim();

  validations.validate(firstName, lastName, email, university);

  let userData = {
    firstName,
    lastName,
    email,
    university,
    docFile,
  };

  const _collection = await userCollection();
  const insertData = await _collection.insertOne(userData);

  if (insertData.insertedCount === 0) throw "Could not add new user data";

  return `User information Inserted!`;
}

module.exports = {
  createUser,
  getUserData,
};
