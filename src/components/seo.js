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

function SEO({ description, lang,  meta, image: metaImage, title ,article,author}) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
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
      name: 'FrugalisMinds',
      alternateName: 'FrugalisMinds' || '',
    },
  ];
  if (article) {
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
          url: image.src,
        },
        description: description,
        // datePublished: buildTime,
        // dateModified: buildTime,
        author: {
          '@type': 'Person',
          name: author,
        },
        publisher: {
          '@type': 'Organization',
          name: author,
          logo: {
            '@type': 'ImageObject',
            url: site.siteMetadata.siteUrl,
          },
        },
        isPartOf: site.siteMetadata.siteUrl,
        mainEntityOfPage: {
          '@type': 'WebSite',
          '@id': site.siteMetadata.siteUrl,
        },
      },
    ];
  }

  const metaDescription = description;
  const image =
  metaImage && metaImage.src
    ? `${site.siteMetadata.siteUrl}${metaImage.src}`
    : null;
  return (
    <Helmet
    htmlAttributes={{
      lang: "en"
    }}
  
    title={title}
    meta={
      [{name:"dmca-site-verification",
    content:"RHRyRHNhOU0rT1JNUWE1ekEyTjZuQmd3Z0RqVVNhU0cvSmtUVURSZzBSYz01"},
	{name:"google-site-verification",
    content:"L8UVkbbswj01oMo7x73Vybqt-cax8XcDBwDg8QVGrms"},
        {
          name: "description",
          content: metaDescription
        },
        {
          name: "keywords",
          content: site.siteMetadata.keywords
        },
        {
          property: "og:title",
          content: title
        },
        {
          property: "og:description",
          content: metaDescription
        },
        {
          name: "twitter:creator",
          content: site.siteMetadata.author
        },
        {
          name: "twitter:title",
          content: title
        },
        {
          name: "twitter:description",
          content: metaDescription
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
