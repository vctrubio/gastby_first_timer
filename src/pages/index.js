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

const NavBar = ({ activeComponent, setActiveComponent, nodes, searchTerm, setSearchTerm, setContentfulTmp, contentfulTmp }) => {
  const [isHovered, setIsHovered] = useState(false);

  let titlesOfPost = nodes.map(({ node }) => {
    let originalTitle = node.title;
    let words = node.title.toLowerCase().split(' ');
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].substring(1);
    }
    let camelCaseTitle = words.join(' ');
    return { originalTitle, camelCaseTitle };
  });

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
    if (event.target.value.length > 0) {
      setActiveComponent('portfolio')
    }
    if (contentfulTmp) setContentfulTmp(false)
  };

  const getCardbyItem = (item) => {
    let card = nodes.filter(({ node }) => node.title === item);
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
      {isHovered &&
        <div className="dropdown"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsHovered(false)}
        >
          {titlesOfPost.map((item, index) =>
            <div key={index} onClick={() => getCardbyItem(item.originalTitle)}>
              {item.camelCaseTitle}</div>)}
        </div>
      }
      {
        (activeComponent === 'portfolio') && <div className="dropdown2">
          <div onClick={() => setContentfulTmp(false)} style={{ marginRight: '8px' }} >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z" />
              <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466" />
            </svg>
          </div>
          <input className='search-bar' value={searchTerm} onChange={handleSearchChange} placeholder="cual buscas?"></input>
          <div className="ms-3">|||</div>
        </div>
      }

      <div onClick={() => setActiveComponent("about")}>Info</div>
    </div>
  )
}


const PortfolioAll = ({ edges, searchTerm, setSearchTerm, contentfulTmp, setContentfulTmp }) => {
  const [filteredPosts, setFilteredPosts] = useState(edges);

  React.useEffect(() => {
    if (searchTerm.length > 0) {
      setFilteredPosts(edges.filter(({ node }) => node.title.toLowerCase().includes(searchTerm.toLowerCase())));
    } else {
      setFilteredPosts(edges);
    }
  }, [searchTerm, edges]);

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
              title={<div className={getTitleOpacity()}>{node.title}</div>}
              coverUrl={node.media[0].file.url}
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
        <div className="d-flex flex-column justify-content-center align-items-center">
          <ContenfulCard data={contentfulTmp} />
          <button className='back-btn' onClick={() => setContentfulTmp(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z" />
              <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466" />
            </svg>
          </button>
        </div>
      ) : (
        <PostView posts={filteredPosts} />
      )}
    </div>
  )
}

const getEdges = (data) => {
  return data.data.allContentfulAliciaInterior.edges
}

const IndexPage = ({ data }) => {
  const [activeComponent, setActiveComponent] = useState("banner");
  const edges = getEdges({ data })
  const [searchTerm, setSearchTerm] = useState('');
  const [contentfulTmp, setContentfulTmp] = useState(null);
  const imgs_url = data.allContentfulAliHome.nodes.flatMap(node =>
    node.fotos.map(foto => foto.file.url)
  );

  return (
    <>
      <Seo title={'Interiorismo'} />

      <div style={{ textAlign: 'center', width: '100%', }}>
        <LogoBar setActiveComponent={setActiveComponent} />
        <NavBar activeComponent={activeComponent} setActiveComponent={setActiveComponent} nodes={edges} searchTerm={searchTerm} setSearchTerm={setSearchTerm} setContentfulTmp={setContentfulTmp} contentfulTmp={contentfulTmp} />
        {activeComponent === "banner" && <SlideSwiper imgs_url={imgs_url} />}
        {activeComponent === "banner" && <Banner />}
        {activeComponent === "portfolio" && <PortfolioAll edges={edges} searchTerm={searchTerm} setSearchTerm={setSearchTerm} contentfulTmp={contentfulTmp} setContentfulTmp={setContentfulTmp} />}
        {activeComponent === "info" && <About />}

        {/* <Footer /> */}
      </div>
    </>
  )
}

export default IndexPage

export const queryGL = graphql`
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
  allContentfulAliHome {
    nodes {
      fotos {
        gatsbyImageData
        file {
          url
        }
      }
    }
  }
}
`