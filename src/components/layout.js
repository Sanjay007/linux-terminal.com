/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import '../components/layout.css'
// import '../components/bootstrap.min.css'
import Header from "./header"
import { Container } from "react-bootstrap"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />


      <main>{children}</main>
      

<Container>
      <footer className="pt-4 my-md-5 pt-md-5 border-top">
        <div className="row">
          <div className="col-12 col-md">
            <img className="mb-2" src="/logo/logo.png" alt="" width="100" height="100"/>
            <small className="d-block mb-3 text-muted">Code Written from Heart & Development tutorials Shared As We Learn </small>
            <small className="d-block mb-3 text-muted">Copyright © 2018-2019</small>
            <a href="//www.dmca.com/Protection/Status.aspx?ID=47f4a3bf-3b84-48fc-afac-50992ce8ef50" title="DMCA.com Protection Status" class="dmca-badge"> <img src ="https://images.dmca.com/Badges/dmca_protected_sml_120n.png?ID=47f4a3bf-3b84-48fc-afac-50992ce8ef50"  alt="DMCA.com Protection Status" /></a>  <script src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js"> </script>
         
          </div>
          <div className="col-6 col-md">
            <h5>Categories</h5>
            <ul className="list-unstyled text-small">
              <li><a className="text-muted" href="/category/ubuntu">Ubuntu</a></li>
              <li><a className="text-muted" href="/category/linux">Linux</a></li>
              <li><a className="text-muted" href="/category/centos7">Centos7</a></li>
              <li><a className="text-muted" href="/category/shell-spring">Shell Scripting</a></li>
            </ul>
          </div>
          <div className="col-6 col-md">
            <h5>Categories</h5>
            <ul className="list-unstyled text-small">
              <li><a className="text-muted" href="/category/ubuntu">Ubuntu</a></li>
              <li><a className="text-muted" href="/category/linux">Linux</a></li>
              <li><a className="text-muted" href="/category/centos7">Centos7 </a></li>
              <li><a className="text-muted" href="/category/shell-script">Shell Scripting </a></li>
            </ul>
          </div>
          <div className="col-6 col-md">
            <h5>About</h5>
            <ul className="list-unstyled text-small">
              <li><a className="text-muted" href="/about">About</a></li>
              <li><a className="text-muted" href="/contact">Contact Us</a></li>
              <li><a className="text-muted" href="/privacy-policy">Privacy</a></li>
            </ul>
          </div>
        </div>
      </footer>

      </Container>
  

    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
