import React from 'react';
import logo from "../images/gatsby-icon.png"
import Layout from '../components/layout';
import { Jumbotron, Container, Col, Row, Button, Form, Card } from 'react-bootstrap'
import { Link } from "gatsby"
import GatsbyDef from "../images/gatsby-astronaut.png";


const card = (title, path, data) =>
  <div class="card mb-4 shadow-sm post" style={{ borderRadius: "14px" }} >
   <div class="post-header">
   <img style={{ borderTopLeftRadius: "13px",objectFit:'fill',borderTopRightRadius: "13px" }}
      src={path}  height="150" />
   </div>
   
    <div class="card-body">
      <h2 className="card-title">{title}</h2>
      <h3 class="card-subtitle">{data.excerpt}.</h3>
      <div class="d-flex justify-content-between align-items-center">
        <small class="text-muted"> 20th march 1990</small>
        <small class="text-muted"> 9 mins Read</small>
      </div>
    </div>
    <Link to={`${data.frontmatter.path}`} ></Link>
  </div>;


// Tell Webpack this JS file uses this image
class Tag extends React.Component {


    render() {
const {  posts } = this.props.pageContext;

const uniqueposts = Array.from(new Set(posts.map(a => a.frontmatter.path)))
    .map(id => {
      return posts.find(a => a.frontmatter.path === id)
    });

        return <Layout>

        

        <div class="album py-5 bg-light text-center ">
        <Container >
        <Row>
            {uniqueposts.map((data) => {
              return (
                <Col md={4} >
                  {card(data.frontmatter.title, data.frontmatter.cover != null ? data.frontmatter.cover.childImageSharp.fixed.src : GatsbyDef, data)}
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
        </Layout>

    }
}

export default Tag;