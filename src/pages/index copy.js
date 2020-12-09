import React from "react"
import { Link } from "gatsby"
import { Jumbotron, Container, Col, Row, Button, Form, Card } from 'react-bootstrap'
import Layout from "../components/layout"
import NavbarFrugalis from "../components/navbar"
import SEO from "../components/seo";
import { graphql } from 'gatsby';
import GatsbyDef from "../images/gatsby-astronaut.png";

const card = (title, path, data) =>
  <div class="card mb-4 shadow-sm post" style={{ borderRadius: "14px" }} >
   <div class="post-header">
   <img style={{ borderTopLeftRadius: "13px", borderTopRightRadius: "13px" }}
      src={path} height="150" />
   </div>
   
    <div class="card-body">
      <h2 className="card-title">{title}</h2>
      <h3 class="card-subtitle">{data.node.excerpt}.</h3>
      <div class="d-flex justify-content-between align-items-center">
        <small class="text-muted"> 20th march 1990</small>
        <small class="text-muted"> 9 mins Read</small>
      </div>
    </div>
    <Link to={`${data.node.frontmatter.path}`} ></Link>
  </div>;


const IndexPage = ({ data }) => {
  console.log(data);
  const { edges } = data.latest;
  console.log(GatsbyDef);
  return (
    <Layout>
      <SEO title="Home" />
      <Jumbotron className="text-center">
        <h1>Welcomne Frugalis !!</h1>
        <container>
          <h1>Learn to Code In Production</h1>
        </container>
      </Jumbotron>

      <div class="post-wrapper">
        
          <div className="posts">
            {edges.map((data) => {
              return (
                <div>
                  {card(data.node.frontmatter.title, data.node.frontmatter.cover != null ? data.node.frontmatter.cover.childImageSharp.fluid.src : GatsbyDef, data)}
                </div>
              );
            })}
          </div>
        
      </div>



      <Jumbotron className="text-center" style={{ padding: 0, margin: 0 }}>
        <h3>Never Miss any article from our blog</h3>
        <p>Susbcribe to get regular updates</p>
        <Container>
          <Form>
            <Row>
              <Col>
                <Form.Control placeholder="Name" />
              </Col>
              <Col>
                <Form.Control placeholder="EMail" />
              </Col>
              <Button variant="outline-secondary">Subscribe</Button>
            </Row>
          </Form>
        </Container>
      </Jumbotron>

    </Layout>
  );
};

export default IndexPage

export const query = graphql`
query {
  latest : allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, limit: 12) {
    edges {
      node {
        id
        excerpt(pruneLength: 75)
        frontmatter {
          category
          path
          title
          cover {
              childImageSharp {
                fluid(
                  maxWidth: 1000
                  quality: 90
                  traceSVG: { color: "#2B2B2F" }
                ) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
        }
        
      }
    }
    bytag: group(field: frontmatter___category) {
      totalCount
      nodes {
        timeToRead
        excerpt(pruneLength: 80)
        frontmatter {
          path
          category
        }
      }
      edges {
        node {
          excerpt(pruneLength: 75)
          frontmatter {
            category
            path
            title
          }
        }
      }
    }
  }
  dataMarkDown: allMarkdownRemark {
    edges {
      node {
        id
        frontmatter {
          category
          path
        }
      }
    }
   
  }
}
`;