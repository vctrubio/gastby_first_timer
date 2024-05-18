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

const NavBar = ({ activeComponent, setActiveComponent, nodes, searchTerm, setSearchTerm, setContentfulTmp, contentfulTmp }) => {
  const [isHovered, setIsHovered] = useState(false);
  let titlesOfPost = nodes.map(({ node }) => node.titleOfPost)

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
    if (event.target.value.length > 0) {
      setActiveComponent('portfolio')
    }
    if (contentfulTmp) setContentfulTmp(false)
  };


  const getCardbyItem = (item) => {
    let card = nodes.filter(({ node }) => node.titleOfPost === item);
    setContentfulTmp(card[0].node);
    setActiveComponent('portfolio')
  }

  const setPortfolioActive = () => {
    setActiveComponent('portfolio')
    setContentfulTmp(false)
  }

  return (
    <div className="navbar">
      <div onClick={() => setActiveComponent("banner")}>About</div>
      <div onClick={() => setPortfolioActive()}
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
          {titlesOfPost.map((item, index) =>
            <div key={index} onClick={() => getCardbyItem(item)}>
              {item}</div>)}
        </div>
      }
      {
        activeComponent.toLowerCase() === 'portfolio' && <div className="dropdown2">
          <input className='search-bar' value={searchTerm} onChange={handleSearchChange} placeholder="que buscas?"></input>
          <div className="ms-3">|||</div>
        </div>
      }

      <div onClick={() => setActiveComponent("about")}>Info</div>
    </div>
  )
}


const PortfolioAll = ({ data, searchTerm, setSearchTerm, setActiveComponen, contentfulTmp, setContentfulTmp }) => {
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


  const getTitleOpacity = () => {
    if (searchTerm.length > 0 || window.innerWidth < 768) {
      return "title-opacity";
    }
    return "";
  }


  const PostView = () => {

    return (
      filteredPosts.length > 0 ?
        filteredPosts.map(({ node }) => (
          <div key={node.id} onClick={() => handleCardClick(node)}>
            <Card
              title={<div className={getTitleOpacity()}>{node.titleOfPost}</div>}
              coverUrl={node.allPhotos[0].file.url}
            />
          </div>
        ))
        :
        <h2 style={{ padding: '12px' }}>No encontramos lo que buscas</h2>
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
  const [contentfulTmp, setContentfulTmp] = useState(null);

  console.log('init_load: ', data)

  return (
    <>
      <Seo title={'Interiorismo'} />

      <div style={{ textAlign: 'center', width: '100%', }}>
        <LogoBar setActiveComponent={setActiveComponent} />
        <NavBar activeComponent={activeComponent} setActiveComponent={setActiveComponent} nodes={edges} searchTerm={searchTerm} setSearchTerm={setSearchTerm} setContentfulTmp={setContentfulTmp} contentfulTmp={contentfulTmp} />
        {activeComponent === "banner" && <SlideSwiper nodes={edges} />}
        {activeComponent === "banner" && <Banner />}
        {activeComponent === "portfolio" && <PortfolioAll data={data} searchTerm={searchTerm} setSearchTerm={setSearchTerm} setActiveComponent={setActiveComponent} contentfulTmp={contentfulTmp} setContentfulTmp={setContentfulTmp} />}
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