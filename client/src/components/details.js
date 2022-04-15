import axios from "axios";
import React, { useEffect, useState } from "react";

import { Container, Table, Col } from "react-bootstrap";

function Details({ shouldRefresh }) {
  const [listofUserData, setListofUserData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const list = await axios.get("/apiRoutes");
        setListofUserData(list.data);
        console.log(list);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [shouldRefresh]);

  if (listofUserData) {
    return (
      <Container>
        <Table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>University</th>
              <th>Document</th>
            </tr>
          </thead>
          <tbody>
            {listofUserData &&
              listofUserData.map((e) => {
                let filedownload = `http://localhost:3000/${e.docFile.replaceAll(
                  " ",
                  "%20"
                )}`;
                return (
                  <tr>
                    <td>{e.firstName}</td>
                    <td>{e.lastName}</td>
                    <td>{e.email}</td>
                    <td>{e.university}</td>
                    <td>
                      <a download href={filedownload} target="_blank">
                        {e.docFile.split("/")[2]}
                      </a>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default Details;
