import { Container, Form, FormControl, Nav, Navbar, Button } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import Link from "next/link";

export default function Header() {
  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <img
            src="./logo.png"
            height="30"
            width="30"
            className="d-inline-block align-top"
            alt="logo-image"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <NavbarCollapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link href="/" passHref>
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link href="/blog" passHref>
              <Nav.Link>Blog</Nav.Link>
            </Link>
            <Link href="/about" passHref>
              <Nav.Link>About</Nav.Link>
            </Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
}
