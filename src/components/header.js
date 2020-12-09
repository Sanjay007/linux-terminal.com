import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import NavbarFrugalis from '../components/navbar';

const Header = ({ siteTitle }) => (
  <header
   
  >
  
    <NavbarFrugalis/>

   
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
