const express = require("express");
const router = express.Router();
const data = require("../data");
const validations = require("../data/validations");
const apiData = data.api;
const multer = require("multer");
const path = require("path");

//middleware to store the file data
const storage = multer.diskStorage({
  destination: "./public/images",
  filename: function (req, file, callback) {
    const fullName =
      file.originalname.split(".")[0] +
      "-" +
      Date.now() +
      path.extname(file.originalname);
    callback(null, fullName);
  },
});

//upload middleware to handle file upload data
const maxSize = 16 * 1024 * 1024; //max size is 16MB

const upload = multer({
  fileFilter: function (req, file, cb) {
    const fileTypes = /png|jpeg|jpg|pdf|docx|doc|txt/;
    const fileSize = parseInt(req.headers["content-length"]);
    const extName = fileTypes.test(path.extname(file.originalname));
    file.originalname.toLowerCase();
    const mimeType = fileTypes.test(file.mimetype);
    if (fileSize >= maxSize) {
      cb("Error: Please upload file with size less than 16 MB", false);
    } else {
      cb(null, true);
    }
    if (extName && mimeType) {
      cb(null, true);
    } else {
      cb("Error: only pdf, jpg, png, jpeg, doc, txt, docx are allowed!", false);
    }
  },
  storage: storage,
  limits: { fileSize: maxSize },
});

router.get("/", async (req, res) => {
  try {
    const getData = await apiData.getUserData();
    return res.json(getData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//upload info routes
router.post("/upload", upload.single("fileUpload"), async (req, res) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let university = req.body.university;

  if (!firstName) {
    res.status(400).json({
      error: "firstName is required",
    });
    return;
  }
  if (!lastName) {
    res.status(400).json({
      error: "lastName is required",
    });
    return;
  }

  if (!email) {
    res.status(400).json({
      error: "email is required",
    });
    return;
  }

  if (!university) {
    res.status(400).json({
      error: "university is required",
    });
    return;
  }
  try {
    //validations.validate(name, email, university);

    let docFile = req.file.path.split("\\").join("/");

    const createUser = await apiData.createUser(
      firstName,
      lastName,
      email,
      university,
      docFile
    );

    if (createUser) {
      res.json(createUser);
      return;
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;
