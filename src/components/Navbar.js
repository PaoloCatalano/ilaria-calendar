import React, { useState, useRef, useEffect } from 'react';
import { ImMenu4 } from 'react-icons/im';


const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);


  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;

    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = '0px';
    }
  }, [showLinks]);


  return (
    <nav className="navbar">
      <div className="nav-center">
        <div className="nav-header">
          <div
            onClick={() => {
              setShowLinks(false);
            }}
          ></div>
          <div className="title-navbar">ilaria serena</div>
          <button className="nav-toggle" onClick={toggleLinks}>
            <ImMenu4 className={`icona-menu ${showLinks && 'icone-active'}`} />
          </button>
        </div>
        <div className="links-container" ref={linksContainerRef}>
          <div
            ref={linksRef}
            onClick={() => {
              setShowLinks(false);
            }}
          >
            <ul className="links">
              <li>
                <a
                  href="https://ilariaserena.netlify.app/"
                  alt="ilaria serena home"
                >
                  Home
                </a>
              </li>
              <li className="double-link ">
                <a
                  className="moving-link"
                  href="https://ilariaserena.netlify.app/come-funziona-una-seduta/"
                  alt="come-funziona-una-seduta"
                >
                  come funziona una seduta
                </a>
                <a
                  className="moving-link2"
                  href="https://ilariaserena.netlify.app/en/how-does-a-session-work/"
                  alt="how does a session work"
                >
                  how does a session work
                </a>
              </li>
              <li className="double-link-price">
                <a
                  href="https://ilariaserena.netlify.app/prezzi/"
                  alt="ilaria serena prezzi"
                >
                  Prezzi 
                </a>
                |
                <a
                  href="https://ilariaserena.netlify.app/en/prices/"
                  alt="ilaria serena prices"
                >
                  Prices
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
