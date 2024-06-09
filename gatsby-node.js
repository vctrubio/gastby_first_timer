/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

const { graphql } = require('gatsby')

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
  query MyQuery {
    allContentfulAliciaInterior {
      edges {
        node {
          media {
            file {
              url
            }
            gatsbyImageData
          }
          credits
          description {
            description
          }
          url
          title
        }
      }
    }
  }
  `)

  if (result.errors) {
    console.log('error: please check exports.createPage, ', result.errors)
    throw new Error(result.errors)
  }


  result.data?.allContentfulAliciaInterior.edges.forEach(({ node }) => {
    // console.log('url:::: ', node.url)
    createPage({
      path: `/${node.url}`,
      component: require.resolve("./src/pages/contentful.js"),
      context: {
        url: node.url,
      },
      defer: true,
    })
  })
}