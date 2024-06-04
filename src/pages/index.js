import React, { useState, useEffect, useRef } from 'react';
import { graphql } from "gatsby";
import Seo from "../components/seo"
import "../components/layout_customs.css"
import { LogoBar } from "../components/logobar";
import { Info } from "../components/info";
import { Banner } from "../components/banner";
import { SlideSwiper } from "../components/slideSwiper"
import DrowDownSvg from '../svgs/dropdown.svg';
import { PortfolioAll } from '../components/porfolio';

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
          style={{
            borderRadius: '20px',
            backrgoundColor: '#F7F1EE',
            width: '75%',
            border: 'none',
            textAlign: 'center',
            marginTop: '10px',
            marginBottom: '10px',
            opacity: '0.8',
            backgroundColor: '#F7F1EE',
            border: '1px solid grey',
          }}
        />
        {(filteredTitles.length > 0 ? filteredTitles : titlesOfPost).map((title, index) => (
          <div key={index} onClick={() => getCardbyItem(title)}>
            {title.camelCaseTitle}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="navbar">
      <div onClick={() => setActiveComponent("banner")}>About</div>
      <div
        style={{ alignItems: 'center', position: 'relative', marginLeft: '25px' }}>
        <div onClick={() => setPortfolioActive()}
        >
          Portfolio
        </div>
        <div
          style={{
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
          <img src={DrowDownSvg} alt="^" />
        </div>
        {dropdownOpen && (<DropDownLinks />)}
      </div>
      <div onClick={() => setActiveComponent("info")}>Contact</div>
    </div>
  )
}

const IndexPage = ({ data }) => {
  const [activeComponent, setActiveComponent] = useState("portfolio");
  const [contentfulTmp, setContentfulTmp] = useState(null);

  const edges = data.allContentfulAliciaInterior.edges
  const imgs_url = data.allContentfulAliHome.nodes.flatMap(node =>
    node.fotos.map(foto => foto.file.url)
  );

  return (
    <div style={{ textAlign: 'center', width: '100%', margin: '0 !important', overflow: 'hidden' }}>
      <LogoBar setActiveComponent={setActiveComponent} />
      <NavBar setActiveComponent={setActiveComponent} setContentfulTmp={setContentfulTmp} nodes={edges} />
      {activeComponent === "banner" && <SlideSwiper imgs_url={imgs_url} />}
      {activeComponent === "banner" && <Banner />}
      {activeComponent === "portfolio" && <PortfolioAll edges={edges} contentfulTmp={contentfulTmp} setContentfulTmp={setContentfulTmp} />}
      {activeComponent === "info" && <Info />}
    </div>
  )
}

export const Head = () => <Seo title="Interiorismo" />
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