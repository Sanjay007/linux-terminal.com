import React from "react"
import { Link } from "gatsby"
import { Jumbotron, Container, Col, Row, Button, Form, Card } from 'react-bootstrap'
import Layout from "../components/layout"
import NavbarFrugalis from "../components/navbar"
import SEO from "../components/seo";
import { graphql } from 'gatsby';
import GatsbyDef from "../images/gatsby-astronaut.png";
import Image from 'react-bootstrap/Image';

const card = (title, path, data) =>
  <div className="card mb-4 shadow-sm post" style={{ borderRadius: "14px" }} >
    <div className="post-header">
      <img alt={title} style={{ borderTopLeftRadius: "13px",objectFit:'fill', borderTopRightRadius: "13px" }}
        src={path} height="180" />
    </div>

    <div className="card-body">
      <h2 className="card-title">{title}</h2>
      <h3 className="card-subtitle">{data.node.excerpt}.</h3>
      <div className="d-flex justify-content-between align-items-center">
        <small className="text-muted"> {data.node.frontmatter.date}</small>
        <small className="text-muted"> {data.node.timeToRead} mins</small>
      </div>
    </div>
    <Link to={`${data.node.frontmatter.path}`} ></Link>
  </div>;


const IndexPage = ({ data }) => {
 console.log(data);
  const { edges } = data.latest;
  //console.log(GatsbyDef);
  return (
    <Layout>
      <SEO title="TheLinuxTerminal - Linux Tutorials , Tips and Tricks on Ubuntu , RedHat, Centos , Fedora" />
      <Jumbotron className="text-center top-head">

        
        <Container>
          <h3>
            Hi , Welcome to <span class="badge badge-success"> TheLinuxTerminal </span> 
          </h3>
<p style={{color:'rgb(184, 194, 180)'}}>We are <span class="badge badge-success" >Spring Boot</span> Enthusiasts who shares Programming With Spring Boot and java to the Community ❤️  !!</p>
        <a href="/category/linux" style={{ margin:'1px'}} className="badge badge-warning">#linux </a>
        <a href="/category/ubuntu" style={{ margin:'1px'}} className="badge badge-warning"> #ubuntu</a>
        <a href="/category/centos7" style={{ margin:'1px'}} className="badge badge-warning"> #centos7</a>

        

        <div className="social-buttons">
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=https://thelinuxterminal.com`} className="facebook"></a>
                  <a href={`https://twitter.com/share?url=https://thelinuxterminal.com`}  className="twitter  "></a>
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=https://thelinuxterminal.com`} className="linkedin  "></a>
                 
                  <a href={`https://www.reddit.com/submit?url=https://thelinuxterminal.com`} className="reddit  "></a>
                </div>

<a className="btn btn-secondary" href="/write-for-us" >Write For Us</a>
        </Container>

      </Jumbotron>

      <div className="album py-5 bg-light text-center ">
      <h3> #latest-posts </h3>
        <Container >
        
          <Row>
            {edges.map((data,key) => {
              return (
                <Col key={key} md={4} >
                  {card(data.node.frontmatter.title, data.node.frontmatter.cover != null ? data.node.frontmatter.cover.childImageSharp.fluid.src : GatsbyDef, data)}
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>



      <Jumbotron className="text-center" style={{ padding: 0, margin: 0 }}>

        <h3>Never Miss any article from our blog</h3>
        <p>Subscribe to get regular updates</p>
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
  latest : allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, limit: 100) {
    edges {
      node {
        id
        excerpt(pruneLength: 75)
        frontmatter {
          category
          path
          title
          date(formatString: "DD MMM YY")
          cover {
              childImageSharp {
                fluid(
                  maxHeight:500
                  maxWidth: 900
                  quality: 90
                  traceSVG: { color: "#2B2B2F" }
                 
                ) {
                   srcWebp
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
        }
        timeToRead
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
          date(formatString: "DD MMM YY")
        }
      }
      edges {
        node {
          excerpt(pruneLength: 75)
          frontmatter {
            category
            path
            title
            date(formatString: "DD MMM YY")
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
          date(formatString: "DD MMM YY")
        }
      }
    }
   
  }
}
`;
