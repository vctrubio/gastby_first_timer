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
    query {
      allContentfulAliciaContent {
        edges {
          node {
            id
            slug
            titleOfPost
            descriptionOfPost {
              descriptionOfPost
            }
            allPhotos {
              file {
                url
              }
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    console.log('error: pelase check exports.createPage, ', result.errors)
    throw new Error(result.errors)
  }

  result.data?.allContentfulAliciaContent.edges.forEach(({ node }) => {
    console.log('slug:::: ', node.slug)
    createPage({
      path: `/${node.slug}`,
      component: require.resolve("./src/pages/contentful.js"),
      context: {
        slug: node.slug,
      },
      defer: true,
    })
  }
  )
}
