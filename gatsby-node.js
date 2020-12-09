const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const postTemplate = path.resolve('src/templates/blogTemplate.jsx');
    const tagPage = path.resolve('src/templates/category.jsx');
    const tagPosts = path.resolve('src/templates/tag.jsx');

    resolve(
      graphql(
        `
          query {
            allMarkdownRemark(
              sort: { order: ASC, fields: [frontmatter___date] }
            ) {
              edges {
                node {
                  excerpt
                  timeToRead
                  frontmatter {
                    path
                    title
                    tags
                    date(formatString: "d-MMM-yyyy")
                    category
                    metadescription
                    published
                    cover{
                      childImageSharp {
                        id
                        fixed {
                          base64
                          tracedSVG
                          aspectRatio
                          width
                          height
                          src
                          srcSet
                          srcWebp
                          srcSetWebp
                          originalName
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          return reject(result.errors);
        }

        const posts = result.data.allMarkdownRemark.edges;

        const postsByTag = {};
        // create tags page
        posts.forEach(({ node }) => {
          if (node.frontmatter.tags) {
          
            node.frontmatter.tags.forEach(tag => {
              if (!postsByTag[tag]) {
                postsByTag[tag] = [];
              }

              postsByTag[tag].push(node);
            });

            
          }


          if(node.frontmatter.category){
           // console.log(node.frontmatter.category,"lll");

            if (!postsByTag[node.frontmatter.category]) {
              postsByTag[node.frontmatter.category] = [];
            }

            postsByTag[node.frontmatter.category].push(node);
          }

        });
       
        const tags = Object.keys(postsByTag);
      ///  console.log(tags,"kkkkkkkkkkkkkkkkkk");
        // createPage({
        //   path: '/category',
        //   component: tagPage,
        //   context: {
        //     tags: tags,
        //   },
        // });

        //create tags
        tags.forEach(tagName => {
          const posts = postsByTag[tagName];

          createPage({
            path: `/category/${tagName}`,
            component: tagPosts,
            context: {
              posts,
              tagName,
            },
          });
        });

        //create posts
       // console.log(postsByTag,"dfdf");
        
        posts.forEach(({ node }, index) => {
          const path = node.frontmatter.path;
        let postList=[];

         if(node.frontmatter.category){
          const posts = postsByTag[node.frontmatter.category];
postList.push(...posts);      
         } 

        if(node.frontmatter.tags){
          let posttagWise=[];
          node.frontmatter.tags.forEach(tag => {
            const postsD = postsByTag[tag];
            
            if(postsD.length>0){
              // console.log(postsD,"LK");
              posttagWise.push(...postsD);
            }

          });
postList.push(...posttagWise);

        } 

// console.log(postList,"rrrrrrrrrr");


          const prev = index === 0 ? null : posts[index - 1].node;
          const next =
            index === posts.length - 1 ? null : posts[index + 1].node;
          createPage({
            path,
            component: postTemplate,
            context: {
              pathSlug: path,
              suggestedPost:postList,
              prev,
              next,
            },
          });
        });
      })
    );
  });
};

/* Allows named imports */
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });
};
