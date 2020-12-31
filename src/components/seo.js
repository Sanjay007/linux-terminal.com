/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang,  meta, image: metaImage, title ,article:article,author,publishedOn}) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
            keywords
          }
        }
      }
    `
  )

  let schemaOrgJSONLD = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      '@id': site.siteMetadata.siteUrl,
      url: site.siteMetadata.siteUrl,
      name: 'thelinuxterminal',
      alternateName: 'thelinuxterminal' || '',
    },
  ];
  if (article===true) {
    schemaOrgJSONLD = [
      {
        '@context': 'http://schema.org',
        '@type': 'BlogPosting',
        '@id': site.siteMetadata.siteUrl,
        url: site.siteMetadata.siteUrl,
        name: title,
        alternateName: title || '',
        headline: title,
        image: {
          '@type': 'ImageObject',
          url: metaImage.src,
        },
        description: site.siteMetadata.description,
        datePublished: publishedOn,
        // dateModified: buildTime,
        author: {
          '@type': 'Person',
          name: author,
        },
        publisher: {
        
        "@id": "https://frugalisminds.com/#organization",
          '@type': 'Organization',
          name: author,
          logo: {
            '@type': 'ImageObject',
            url: site.siteMetadata.siteUrl,
          },
        },
        isPartOf: site.siteMetadata.siteUrl,
        "inLanguage": "en-US",
        mainEntityOfPage: {
          '@type': 'WebSite',
          '@id': site.siteMetadata.siteUrl,
        },
      },
    ];
  }
//console.log(site);
  const metaDescription = description;
  //console.log('metad',title,metaDescription);
  const image =
  metaImage && metaImage.src
    ? `${site.siteMetadata.siteUrl}${metaImage.src}`
    : null;
    console.log(article);

  return (
    <Helmet>
 <Helmet
    htmlAttributes={{
      lang: "en"
    }}


    
    title={title===undefined?site.siteMetadata.title:title}
    meta={
      [{name:"dmca-site-verification",
    content:"V3hxSmdCbitRbFY2TVFWVHowWVlxSjUxUmIzbGVWMjhZY0F0VlozMGxmcz01"},
	{name:"google-site-verification",
    content:"ySmaF8_E9BKO7N9XQERCj7aE9LeRpMmUbmmfjzx8onY"},
	{name:"og:locale",content:"en_US"},
	{name:"og:url",content:site.siteMetadata.siteUrl},
	{name:"og:site_name",content:"theLinuxTerminal"},
	  {name:"og:title",content:title!=''?title:site.siteMetadata.title},
	    {name:"og:description",content:metaDescription!=''?metaDescription:site.siteMetadata.description},
  {itemprop:"name",content:title!=''?title:site.siteMetadata.title},
  {itemprop:"description",content:metaDescription!=''?metaDescription:site.siteMetadata.description},
        {
          name: "description",
          content:metaDescription!=''?metaDescription:site.siteMetadata.description
        },
        {
          name: "keywords",
          content: site.siteMetadata.keywords
        },
        {
          property: "og:title",
          content: title===undefined?site.siteMetadata.title:title
        },
        {
          property: "og:description",
            content:metaDescription!=''?metaDescription:site.siteMetadata.description
        },
        {
          name: "twitter:creator",
          content: site.siteMetadata.author
        },
        {
          name: "twitter:title",
          content: title===undefined?site.siteMetadata.title:title
        },
        {
          name: "twitter:description",
          content:metaDescription!=''?metaDescription:site.siteMetadata.description
        }
      ]
        .concat(
          metaImage
            ? [
                {
                  property: "og:image",
                  content: image
                },
                {
                  property: "og:image:width",
                  content: metaImage.width
                },
                {
                  property: "og:image:height",
                  content: metaImage.height
                },
                {
                  name: "twitter:card",
                  content: "summary_large_image"
                }
              ]
            : [
                {
                  name: "twitter:card",
                  content: "summary"
                }
              ]
        )
        .concat(meta)
    }
  />
<script type="application/ld+json">
          {JSON.stringify(schemaOrgJSONLD)}
        </script>
    </Helmet>
   
  
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
