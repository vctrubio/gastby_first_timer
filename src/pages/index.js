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
import { Banner } from "../components/banner";
import { SlideSwiper } from "../components/slideSwiper"
import { act } from "react";

const NavBar = ({ activeComponent, setActiveComponent, nodes, searchTerm, setSearchTerm }) => {
  let titlesOfPost = [];

  nodes.map(({ node }) => {
    titlesOfPost.push(node.titleOfPost)
  })

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

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
      {isHovered && activeComponent !== "portfolio" &&
        <div className="dropdown"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {titlesOfPost.map((item, index) => <div key={index}>{item}</div>)}
        </div>
      }
      {
        activeComponent.toLowerCase() === 'portfolio' && <div className="dropdown2">
          <div className="d-flex flex-row justify-content-end">
            <div className="me-3"> name1 </div>
            <div className="me-3"> name2 </div>
            <div className="m3-3"> name3 </div>
          </div>
          <div className="d-flex flex-row justify-content-end">
            <div className="ms-3">[back btn]</div>
            <input value={searchTerm} onChange={handleSearchChange} placeholder="Search"></input>
            <div className="ms-3">|||</div>
          </div>
        </div>
      }

      <div onClick={() => setActiveComponent("about")}>Info</div>
    </div>
  )
}


const PortfolioAll = ({ data, searchTerm, setSearchTerm }) => {
  const [contentfulTmp, setContentfulTmp] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState(data.allContentfulAliciaContent.edges);

  React.useEffect(() => {
    const posts = data.allContentfulAliciaContent.edges;

    if (searchTerm.length > 0) {
      setFilteredPosts(posts.filter(({ node }) => node.titleOfPost.toLowerCase().includes(searchTerm.toLowerCase())));
    } else {
      setFilteredPosts(posts);
    }
  }, [searchTerm, data]);

  const handleCardClick = (cardData) => {
    setSearchTerm('');
    setContentfulTmp(cardData);
  };

  const PostView = ({ posts }) => {
    return (
      filteredPosts.map(({ node }) => (
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
        <PostView posts={filteredPosts} />
      )}
    </div>
  )
}


const IndexPage = ({ data }) => {
  const [activeComponent, setActiveComponent] = useState("portfolio");
  const edges = data.allContentfulAliciaContent.edges
  const [searchTerm, setSearchTerm] = useState('');
  console.log('init_load: ', data)

  return (
    <>
      <Seo title={'Interiorismo'} />

      <div style={{ textAlign: 'center', width: '100%', }}>
        <LogoBar setActiveComponent={setActiveComponent} />
        <NavBar activeComponent={activeComponent} setActiveComponent={setActiveComponent} nodes={edges} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        {activeComponent === "banner" && <SlideSwiper nodes={edges} />}
        {activeComponent === "banner" && <Banner />}
        {activeComponent === "portfolio" && <PortfolioAll data={data} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
        {activeComponent === "info" && <About />}

        <Footer />
      </div>
    </>
  )
}

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