import React, { useState } from "react";

import { Container, Row, Col } from "react-bootstrap";
import Details from "./details";
import UserForm from "./userForm";

function Home() {
  const [shouldRefresh, setRefresh] = useState(false);
  return (
    <Container>
      <Row> </Row>
      <Row className="mb-3 row-mb-3">
        <Col>
          <h1>User Form</h1>
          <UserForm setRefresh={setRefresh}></UserForm>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <h1>User Details</h1>
          <Details shouldRefresh={shouldRefresh}></Details>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
