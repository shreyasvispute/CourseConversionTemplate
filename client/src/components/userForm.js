import React, { useState } from "react";
import axios from "axios";

import { Container, Spinner, Button, Form, Row, Col } from "react-bootstrap";

function UserForm({ setRefresh }) {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [fileObject, setFileObject] = useState("");

  let firstName = "";
  let lastName = "";
  let university = "";
  let email = "";
  let fileUpload = "";

  //checks every field for validaton
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  //submit form button click if all the errors are false
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };

        const formdata = new FormData();
        formdata.append("firstName", firstName.value);
        formdata.append("lastName", lastName.value);
        formdata.append("email", email.value);
        formdata.append("university", university.value);
        formdata.append("fileUpload", fileObject.fileUpload[0]);

        const result = await axios.post("/apiroutes/upload", formdata, config);
        firstName.value = "";
        lastName.value = "";
        email.value = "";
        university.value = "";
        fileUpload.value = "";
        setRefresh(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  //error checking fields(validation checks)
  const findFormErrors = () => {
    const { firstName, lastName, email, university, fileUpload } = form;
    const newErrors = {};

    if (!firstName) newErrors.firstName = "cannot be blank!";
    if (!lastName) newErrors.lastName = "cannot be blank!";
    if (!email) newErrors.email = "cannot be blank!";
    if (!university) newErrors.university = "cannot be blank!";

    if (fileUpload) {
      //   if (file.trim().length === 0)
      //     newErrors.file = "Description cannot be blank spaces!";
      console.log(fileUpload);
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setField("file", e.target.value);
    setFileObject({ fileUpload: e.target.files });
  };

  return (
    <Container>
      <Form noValidate onSubmit={handleSubmit}>
        <Row className="mb-3 justify-content-center">
          <Form.Group as={Col} md="3" controlId="firstName">
            <Form.Label>First name</Form.Label>
            <Form.Control
              ref={(node) => {
                firstName = node;
              }}
              type="text"
              name="firstName"
              placeholder="First Name"
              autoFocus={true}
              onChange={(e) => setField("firstName", e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="lastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              ref={(node) => {
                lastName = node;
              }}
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={(e) => setField("lastName", e.target.value)}
            />

            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3 justify-content-center">
          <Form.Group
            as={Col}
            md="3"
            className="position-relative mb-3"
            controlId="email"
          >
            <Form.Label>Email</Form.Label>
            <Form.Control
              ref={(node) => {
                email = node;
              }}
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={(e) => setField("email", e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="university">
            <Form.Label>University</Form.Label>
            <Form.Control
              ref={(node) => {
                university = node;
              }}
              type="text"
              placeholder="University"
              name="university"
              onChange={(e) => setField("university", e.target.value)}
            />

            <Form.Control.Feedback type="invalid">
              {errors.city}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3 justify-content-center">
          <Form.Group
            as={Col}
            md="6"
            controlId="fileUpload"
            className="position-relative mb-3"
          >
            <Form.Label>File</Form.Label>
            <Form.Control
              ref={(node) => {
                fileUpload = node;
              }}
              type="file"
              required
              name="fileUpload"
              accept=".jpg, .doc, .docx, .pdf"
              onChange={handleChange}
              isInvalid={!!errors.fileUpload}
            />
            <Form.Control.Feedback type="invalid">
              {errors.fileUpload}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type="submit">Submit form</Button>
      </Form>
    </Container>
  );
}

export default UserForm;
