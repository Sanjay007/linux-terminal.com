import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { graphql, Link } from 'gatsby';
import { DiscussionEmbed } from "disqus-react"

import { Navbar, NavDropdown, Nav, Row, Container, Col } from 'react-bootstrap';
import '../templates/style.css';

import logo from "../images/gatsby-icon.png"
// Tell Webpack this JS file uses this image
class BlogTemplate extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {

    const { next, prev, suggestedPost } = this.props.pageContext;
    const { html, frontmatter, excerpt } = this.props.data.data;
    const { date, title, tags, category, path, description } = frontmatter
    const map1 = tags.map(x => x);

    const uniqueAddresses = Array.from(new Set(suggestedPost.map(a => a.frontmatter.path)))
      .map(id => {
        return suggestedPost.find(a => a.frontmatter.path === id)
      });

    let disqusConfig = {
      url: `${'https://thelinuxterminal.com' + path}`,
      identifier: frontmatter.path,
      title: title,
    }
    let disqusD = {
      'shortname': 'thelinuxterminal',
      'config': disqusConfig
    }

    const image = frontmatter.cover != null ? frontmatter.cover.childImageSharp.resize : null;
    //console.log(this.props, image);

    return <Layout>
      <SEO title={title} path={frontmatter.path} publishedOn={frontmatter.data} description={frontmatter.metadescription} image={image} article={frontmatter.article}></SEO>

      <Container fluid>

        <div className="mainWrapper" >


          <div className="article-content" itemscope="" itemtype="http://schema.org/BlogPosting">
            <header>
              <h1 itemprop="headline" className="text-center title-header">{title}</h1>
              <div className="text-center">
                {/* <button type="button" className="btn btn-outline-secondary author">Success</button> */}
                <img alt={'thelinuxterminal'} style={{ width: 50, height: 50 }} src="/frugalis.jpg" className=" rounded-circle" />
                <p>Author - Sanjay</p>

                <div className="social-buttons">
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=https://thelinuxterminal.com${path}`} className="facebook"></a>
                  <a href={`https://twitter.com/share?url=https://thelinuxterminal.com${path}`} className="twitter  "></a>
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=https://thelinuxterminal.com${path}`} className="linkedin  "></a>

                  <a href={`https://www.reddit.com/submit?url=https://thelinuxterminal.com${path}&title=${title}`} className="reddit  "></a>
                </div>

              </div>

            </header>
            <div itemprop="articleBody" dangerouslySetInnerHTML={{ __html: html }} />
            <div class="col-md-12 text-center">


              {map1 != undefined && map1.map((data, key) => {
                return (
                  <a href={`/category/${data}`} >

                    <span class={`blog-tag blog-tag-${data} blog-tag-lg`}>#{data}</span>
                  </a>
                );
              })}


            </div>
          </div>

          <aside className="article-aside" style={{ margin: '20px' }}>


            <div className="widget-nomedia-area" style={{}}>



              <ul class="list-group">
                <li class="list-group-item" style={{ backgroundColor: "#FFF" }}> <h6 className="text-center">Latest Tutorials</h6></li>
                {this.props.data.latest.edges.map((data, key) => {
                  return (
                    <li class="list-group-item"> <a href={data.node.frontmatter.path}>{data.node.frontmatter.title}</a> </li>


                  );
                })}

              </ul>


            </div>
          </aside>

        </div>
        <DiscussionEmbed {...disqusD} />
      </Container>

    </Layout>

  }
}

export default BlogTemplate;


export const pageQuery = graphql`
  query($path: String!) {
 data: markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date
        title
        tags
        category
        path
        article
        metadescription
        cover {
          childImageSharp {
            fluid(
              maxWidth: 1920
              quality: 90
              duotone: { highlight: "#386eee", shadow: "#2323be", opacity: 60 }
            ) {
              ...GatsbyImageSharpFluid_withWebp
            }
            resize(width: 1200, quality: 90) {
              src
              width
              height
            }
          }
        }
      }
    },
    latest:
    allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, limit: 12) {
    edges {
      node {
        id
        excerpt(pruneLength: 75)
        frontmatter {
          category
          path
          title
          metadescription
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
    }
  }`
