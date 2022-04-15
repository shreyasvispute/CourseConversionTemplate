import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import Home from "./components/home";
import UserForm from "./components/userForm";
import NotFound from "./components/notfound";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar expand="sm" sticky="top">
          <Container>
            <Nav className="me-auto">
              <Navbar.Brand className="logo-size"></Navbar.Brand>
            </Nav>
          </Container>
        </Navbar>
      </header>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/userData" element={<UserForm />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
