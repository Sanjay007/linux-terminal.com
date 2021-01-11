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

function SEO({ description, lang,  path:metaPath, image: metaImage, title ,article:article,author,publishedOn}) {
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
      "inLanguage": "en-US",
      alternateName: 'thelinuxterminal' || '',
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://thelinuxterminal.com/?s={search_term_string}",
        "query-input": "required name=search_term_string"
    }

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
        description: description,
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
        isPartOf: {
          "@id":"https://frugalisminds.com/#website"
        },
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
  console.log('path',metaPath);

  //console.log('metad',title,metaDescription);
  const image =
  metaImage && metaImage.src
    ? `${site.siteMetadata.siteUrl}${metaImage.src}`
    : null;
   

  return (
    <Helmet>
      <meta charset="UTF-8"></meta>
      <meta lang="en-US" />
    <meta name="msvalidate.01" content="62316D528D17570F658E6792301DA432" />
    <meta name="google-site-verification" content="ZekwwRGV5v0GzeMeBvLF-PMi0Y4by8iODJSuvdr3nYM" />
      <meta name="robots" content="index, follow" />
      <title>{title===undefined?site.siteMetadata.title:title}</title>
      <link rel="canonical" href={`${site.siteMetadata.siteUrl}${metaPath!=undefined?metaPath:''}`}/>

      <meta name="dmca-site-verification" content="V3hxSmdCbitRbFY2TVFWVHowWVlxSjUxUmIzbGVWMjhZY0F0VlozMGxmcz01" />
      <meta name="description" content={metaDescription!='' || metaDescription!=undefined ?metaDescription:site.siteMetadata.description} />
      <meta name="keywords" content={site.siteMetadata.keywords} />
      <meta name="og:locale" content="" />
      <meta name="og:url" content={site.siteMetadata.siteUrl} />
      <meta name="og:site_name" content="thelinuxTerminal" />
      <meta name="og:title" content={title!=''?title:site.siteMetadata.title} />
      <meta name="og:description" content={metaDescription!=''?metaDescription:site.siteMetadata.description} />
      <meta name="og:image" content={image} />
      <meta name="twitter.title"  content={title!=''?title:site.siteMetadata.title} />
      <meta name="twitter.description"  content={metaDescription!=''?metaDescription:site.siteMetadata.description} />
      <meta name="twitter:creator" content="thelinuxt" />
      <meta itemprop="name" content={title!=''?title:site.siteMetadata.title} />
      <meta itemprop="description" content={metaDescription!=''?metaDescription:site.siteMetadata.description} />
     
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
