const { ObjectID } = require("bson");

function validate(firstName, lastName, email, university) {
  const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

  if (typeof firstName != "string") {
    throw "firstName must be string";
  }
  if (firstName.trim().length === 0) {
    throw "firstName cannot be empty or spaces!";
  }
  if (typeof lastName != "string") {
    throw "lastName must be string";
  }
  if (lastName.trim().length === 0) {
    throw "lastName cannot be empty or spaces!";
  }
  if (typeof email != "string") {
    throw "Name must be string";
  }
  if (email.trim().length === 0) {
    throw "Name cannot be empty or spaces!";
  }
  if (!emailPattern.test(email)) {
    throw "Email address not valid";
  }
  if (typeof university != "string") {
    throw "Name must be string";
  }
  if (university.trim().length === 0) {
    throw "Name cannot be empty or spaces!";
  }
}

module.exports = {
  validate,
};
