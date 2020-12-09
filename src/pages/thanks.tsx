// Gatsby supports TypeScript natively!
import React from "react"
import { PageProps, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Thanks = (props: PageProps) => (
  <Layout>
    <SEO title="Tanks " />
    <div className="article-wrapper">
    <h1>Thank you!</h1>
    <p>We will get in touch Shortly !!! Have a Great Day Ahead ! </p>
    
      </div>
   
  </Layout>
)

export default Thanks
