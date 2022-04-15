import axios from "axios";
import React, { useEffect, useState } from "react";

import { Container, Table, Col } from "react-bootstrap";

function Details({ shouldRefresh }) {
  const [listofUserData, setListofUserData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const list = await axios.get("/apiRoutes");
        setListofUserData(list.data.reverse());
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [shouldRefresh]);

  if (listofUserData && listofUserData.length > 0) {
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
                //absolute path given to open file from the browser
                let filedownload = `http://localhost:4000/${e.docFile.replaceAll(
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
  } else {
    return (
      <Container>
        <p>No data found</p>
      </Container>
    );
  }
}

export default Details;
