import React, { useState, useEffect, useRef } from 'react';
import { graphql } from "gatsby";
import Seo from "../components/seo"
import "../components/layout_customs.css"
import { Card } from "../components/card"
import { LogoBar } from "../components/logobar";
import { Info } from "../components/info";
import { ContenfulCard } from "../components/contenfulCard";
import { Banner } from "../components/banner";
import { SlideSwiper } from "../components/slideSwiper"
import DrowDownSvg from '../svgs/dropdown.svg';

/* todo
style maybe all white and black like she said
*/

const NavBar = ({ setActiveComponent, nodes, setContentfulTmp }) => {
  const dropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
  
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const DropDownLinks = () => {
    const [searchTerm, setSearchTerm] = useState('');

    let titlesOfPost = nodes.map(({ node }) => {
      let originalTitle = node.title;
      let words = node.title.toLowerCase().split(' ');
      for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].substring(1);
      }
      let camelCaseTitle = words.join(' ');
      return { originalTitle, camelCaseTitle };
    });

    const filteredTitles = titlesOfPost.filter(title =>
      title.camelCaseTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="dropdown2" ref={dropdownRef}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}
        />
        {(filteredTitles.length > 0 ? filteredTitles : titlesOfPost).map((title, index) => (
          <div key={index} onClick={() => getCardbyItem(title)}>
            {title.camelCaseTitle}
          </div>
        ))}
      </div>
    )
  }

  const getCardbyItem = (item) => {
    setDropdownOpen(false)
    let card = nodes.filter(({ node }) => node.title === item.originalTitle);
    setContentfulTmp(card[0].node);
    setActiveComponent('portfolio')
  }

  const setPortfolioActive = () => {
    setActiveComponent('portfolio')
    setContentfulTmp(false)
  }

  const openDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  }

  return (
    <div className="navbar">
      <div onClick={() => setActiveComponent("banner")}>About</div>
      <div className="d-flex flex-row"
        style={{ alignItems: 'center', position: 'relative' }}>
        <div onClick={() => setPortfolioActive()}
        >
          Portfolio
        </div>
        <div
          style={{
            marginLeft: '10px',
            cursor: 'pointer',
            width: '25px',
            paddingTop: '20px',
            alignItems: 'center',

          }}
          onClick={(event) => {
            event.stopPropagation();
            openDropdown();
          }}
        >
          <img src={DrowDownSvg} alt="whatsapp" />
        </div>
        {dropdownOpen && (<DropDownLinks />)}
      </div>
      <div onClick={() => setActiveComponent("info")}>Info</div>
    </div>
  )
}

const PortfolioAll = ({ edges, contentfulTmp, setContentfulTmp }) => {
  const handleCardClick = (cardData) => {
    setContentfulTmp(cardData);
  };

  const getTitleOpacity = () => {
    if (window.innerWidth < 768) {
      return "title-opacity";
    }
    return "";
  }

  const PostView = () => {
    return (
      edges.length > 0 ?
        edges.map(({ node }) => (
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
        <PostView />
      )}
    </div>
  )
}

const getEdges = (data) => {
  return data.data.allContentfulAliciaInterior.edges
}

const IndexPage = ({ data }) => {
  const [activeComponent, setActiveComponent] = useState("info");
  const edges = getEdges({ data })
  const [contentfulTmp, setContentfulTmp] = useState(null);
  const imgs_url = data.allContentfulAliHome.nodes.flatMap(node =>
    node.fotos.map(foto => foto.file.url)
  );

  return (
    <>
      <Seo title={'Interiorismo'} />
      <div style={{ textAlign: 'center', width: '100%', }}>
        <LogoBar setActiveComponent={setActiveComponent} />
        <NavBar setActiveComponent={setActiveComponent} setContentfulTmp={setContentfulTmp} nodes={edges} />
        {activeComponent === "banner" && <SlideSwiper imgs_url={imgs_url} />}
        {activeComponent === "banner" && <Banner />}
        {activeComponent === "portfolio" && <PortfolioAll edges={edges} contentfulTmp={contentfulTmp} setContentfulTmp={setContentfulTmp} />}
        {activeComponent === "info" && <Info />}
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