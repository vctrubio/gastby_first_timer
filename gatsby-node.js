/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */

exports.createPages = async ({ actions }) => {
  const { createPage } = actions

  createPage({
    path: "/portfolio/test",
    component: require.resolve("./src/pages/contentful.js"),
    context: {
      slug: "test",
    },
    defer: true,
  })
}
