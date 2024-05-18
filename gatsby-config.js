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
    title: `Alicia Agosti`,
    description: `Interiosismo de lujo en Madrid. Proyectos de interiorismo en España. Diseño de interiores en Madrid.`,
    author: `Alicia Agosti`,
    siteUrl: `https://66433dbdf947a70008cb5616--aliciaagosti.netlify.app/`,
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
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Alicia Agosti Interiorismo Madrid Lujo España`,
        short_name: `Alicia Agosti Interiorismo`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#319197`, // Specify your theme color here   // https://css-tricks.com/meta-theme-color-and-trickery/
        display: `minimal-ui`,
        icon: `src/images/aliagostiinteriorismo.png`
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
