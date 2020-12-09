import React from 'react';
import {Navbar,Link,NavDropdown,Nav ,Container} from 'react-bootstrap';
import logo from "../images/gatsby-icon.png" 
// Tell Webpack this JS file uses this image
class NavbarFrugalis extends React.Component {


    render() {

      return  <>
    <link rel="apple-touch-icon" sizes="57x57" href="/icons/apple-icon-57x57.png"/>
<link rel="apple-touch-icon" sizes="60x60" href="/icons/apple-icon-60x60.png"/>
<link rel="apple-touch-icon" sizes="72x72" href="/icons/apple-icon-72x72.png"/>
<link rel="apple-touch-icon" sizes="76x76" href="/icons/apple-icon-76x76.png"/>
<link rel="apple-touch-icon" sizes="114x114" href="/icons/apple-icon-114x114.png"/>
<link rel="apple-touch-icon" sizes="120x120" href="/icons/apple-icon-120x120.png"/>
<link rel="apple-touch-icon" sizes="144x144" href="/icons/apple-icon-144x144.png"/>
<link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-icon-152x152.png"/>
<link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-icon-180x180.png"/>
<link rel="icon" type="image/png" sizes="192x192"  href="/icons/android-icon-192x192.png"/>
<link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png"/>
<link rel="icon" type="image/png" sizes="96x96" href="/icons/favicon-96x96.png"/>
<link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png"/>
<link rel="manifest" href="/icons/manifest.json"/>
<meta name="msapplication-TileColor" content="#ffffff"/>
<meta name="msapplication-TileImage" content="/ms-icon-144x144.png"/>
<meta name="theme-color" content="#ffffff"></meta>

  <Navbar collapseOnSelect expand="lg" style={{backgroundColor:'#23323a'}} variant="dark">
  <Navbar.Brand href="/">TheLinuxTerminal</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
     
      <Nav.Link href="/category/java">Ubuntu</Nav.Link>
      {/* <NavDropdown title="Spring"  id="collasible-nav-dropdown">
     
        <NavDropdown.Item href="/category/spring">Ubuntu</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/category/spring-boot">Linux</NavDropdown.Item>
       
       
        <NavDropdown.Divider />
        <NavDropdown.Item href="/category/spring-cloud">Commands</NavDropdown.Item>
      </NavDropdown> */}
            <Nav.Link href="/category/spring-security">Debian</Nav.Link>
            <Nav.Link href="/category/spring-security">Scripts</Nav.Link>

      <Nav.Link href="/category/spring-security">CentOs</Nav.Link>
      
    </Nav>
    <Nav>
      <Nav.Link href="/about">About Us</Nav.Link>
      <Nav.Link eventKey={2} href="/contact">
       Contact Us
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
  

      </>

    }
  }

export default NavbarFrugalis;
