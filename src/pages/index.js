import * as React from "react"
import { useState } from 'react';
import { graphql } from "gatsby";
import Seo from "../components/seo"
import "../components/layout_customs.css"
import { Card } from "../components/card"
import { Footer } from "../components/footer";
import { LogoBar } from "../components/logobar";
import { About } from "../components/about";
import { ContenfulCard } from "../components/contenfulCard";


const NavBar = ({ setActiveComponent, nodes }) => {
  let titlesOfPost = [];

  nodes.map(({ node }) => {
    titlesOfPost.push(node.titleOfPost)
  })

  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="navbar">
      <div onClick={() => setActiveComponent("banner")}>About</div>
      <div onClick={() => setActiveComponent("portfolio")}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
        Portfolio
      </div>
      {isHovered &&
        <div className="dropdown"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
          {titlesOfPost.map((item, index) => <div key={index}>{item}</div>)}
        </div>
      }
      <div onClick={() => setActiveComponent("about")}>Info</div>
    </div>
  )
}



const BottomUps = (data) => {
  return (
    <div className="bu">
      {/* <h1>Bottom ups</h1>
      <div className="d-flex justify-content-around">
        {data.map((item) => (
          <div key={item.id}>
            <GatsbyImage image={getImage(item.allPhotos[0])} alt={item.titleOfPost} />
            <p>{item.titleOfPost}</p>
          </div>
        ))}
      </div> */}
    </div>
  )
}

const PortfolioAll = ({ data }) => {
  const [contentfulTmp, setContentfulTmp] = useState(null);
  const posts = data.allContentfulAliciaContent.edges;

  const handleCardClick = (cardData) => {
    setContentfulTmp(cardData);
  };

  const PostView = ({ posts }) => {
    return (
      posts.map(({ node }) => (
        <div key={node.id} onClick={() => handleCardClick(node)}>
          <Card
            title={node.titleOfPost}
            description={node.descriptionOfPost.descriptionOfPost}
            coverUrl={node.allPhotos[0].file.url}
          />
        </div>
      ))
    );
  };

  return (
    <div className="portfolio-all">
      {contentfulTmp ? (
        <div className="d-flex flex-column">
          <ContenfulCard data={contentfulTmp} />
          <button onClick={() => setContentfulTmp(false)} style={{ border: '1px solid black' }}>
            back
          </button>
        </div>
      ) : (
        <PostView posts={posts} />
      )}
    </div>
  )
}


const IndexPage = ({ data }) => {
  const [activeComponent, setActiveComponent] = useState("banner");
  console.log('init_load: ', data)

  
  return (
    <div style={{ textAlign: 'center', width: '100vw' }}>
      <LogoBar setActiveComponent={setActiveComponent} />
      <NavBar setActiveComponent={setActiveComponent} nodes={data.allContentfulAliciaContent.edges} />
      {activeComponent === "banner" && <Banner />}
      {activeComponent === "portfolio" && <PortfolioAll data={data} />}
      {activeComponent === "info" && <About />}


      <BottomUps/>
      <Footer />
    </div>
  )
}

export const Head = () => <Seo title="Interiorismo" />

export default IndexPage

export const queryGL = graphql`
  query MyQuery {
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
            id
            file{
              url
            }
            gatsbyImageData
          }
        }
      }
    }
  }
`