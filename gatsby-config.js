module.exports = {
  siteMetadata: {
    title: `TheLinuxTerminal - Blog Learn and Share Linux tips , tricks tutorials on different flavours`,
    description: `Learn Linux and advanced tips and tricks from system admin and devops users .  `,
    author: `@ltadmin`,
    keywords: `Learn Linux and advanced tips and tricks from system admin and devops users` ,
    siteUrl: `https://thelinuxterminal.com/`,
    favicon: 'static/icons/favicon.png'
  },

  plugins:[
    `gatsby-plugin-sitemap`,
    
    `gatsby-remark-embed-gist`,
    'gatsby-transformer-sharp',
   {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // replace "UA-XXXXXXXXX-X" with your own Tracking ID
        trackingId: "UA-112458862-1",
		header:true
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
     
        plugins: [
          {
            resolve: "gatsby-remark-embed-video",
            options: {
              width: 500,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              height: 400, // Optional: Overrides optional.ratio
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
              urlOverrides: [
                {
                  id: 'youtube',
                  embedURL: (videoId) => `https://www.youtube-nocookie.com/embed/${videoId}`,
                }
              ] //Optional: Override URL of a service provider, e.g to enable youtube-nocookie support
            }
          },
          
          {
            resolve: 'gatsby-remark-relative-images',
          },
          {
           
              resolve: `gatsby-remark-embed-gist`
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
            
              maxWidth: 590,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
          `gatsby-remark-prismjs`
          
        ],
      },
    },
`gatsby-plugin-react-helmet`,

{
  resolve: 'gatsby-source-filesystem',
  options: {
    name: 'posts',
    path: `${__dirname}/content/`,
  },
},
{
  resolve: `gatsby-plugin-disqus`,
  options: {
    shortname: `thelinuxterminal`
  }
},
{
  resolve: 'gatsby-plugin-manifest',
  options: {
    display: 'standalone',
    name: 'TheLinuxTerminal - Blog Learn and Share Linux tips , tricks tutorials on different flavours',
    icon: 'static/icons/favicon.png',
  },
},
{
  resolve:'gatsby-plugin-sharp',
  options: {
    // Available options and their defaults:
    base64Width: 20,
    forceBase64Format: ``, // valid formats: png,jpg,webp
    useMozJpeg: process.env.GATSBY_JPEG_ENCODER === `MOZJPEG`,
    stripMetadata: true,
    defaultQuality: 50,
    failOnError: true,
  }
}
  ]
}
