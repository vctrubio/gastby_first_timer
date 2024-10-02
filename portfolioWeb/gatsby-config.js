/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Alicia Agosti Interiorismo`,
    description: `Somos un estudio de arquitectura de interiores y decoración, con base en Madrid, nos especializamos en diseñar espacios que no solo cumplen con las necesidades, sino que también reflejan la personalidad única de cada cliente.`,
    author: `Alicia Agosti`,
    siteUrl: `https://aliciaagosti.com`,
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Alicia Agosti Interiorismo`,
        short_name: `Alicia Agosti`,
        start_url: `/`,
        background_color: `#F7F1EE`,
        theme_color: `#F7F1EE`,
        display: `minimal-ui`,
        icon: `src/images/alilogo.png`
      },
    },
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: process.env.SPACE_ID,
        accessToken: process.env.ACCESS_TOKEN,

      },
    }
  ],
}
