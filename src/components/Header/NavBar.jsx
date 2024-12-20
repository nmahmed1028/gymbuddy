import { useState, useRef, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { linksLoggedIn, linksLoggedOut, social } from './data';
import { useAuth } from "../../hooks/AuthProvider";

/* This module implements the functionality and UI for the Navigation bar that
  Appears at the top of the gym buddy application.
  There are several set's of links as denoted in data.jsx
  When logged out, the module shows the logged out links, when logged in the module shows logged in links
  */

const Navbar = () => { 
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);

  // Dynamic height calculation for mobile
  useEffect(() => {
    const calcHeight = () => {
      const linksHeight = linksRef.current.getBoundingClientRect().height;
      if (showLinks) {
        linksContainerRef.current.style.height = `${linksHeight}px`;
      } else {
        linksContainerRef.current.style.height = '0px';
      }
    };
    
    calcHeight();
    window.addEventListener('resize', calcHeight);
    return () => window.removeEventListener('resize', calcHeight);
  }, [showLinks]);

  const user = useAuth().curUser;
  var links = (<ul></ul>);
  if (!user) /* Determines which links to use, if user is invalid the logged out links will show */
  {
    links = (<ul className='links' ref={linksRef}>
        {linksLoggedOut.map((link) => {
        const { id, url, text } = link;
        return (
            <li key={id}>
            <a href={url}>{text}</a>
            </li>
        );
        })}
    </ul>);
  }
  else
  {
    links = (<ul className='links' ref={linksRef}>
        {linksLoggedIn.map((link) => {
        const { id, url, text } = link;
        return (
            <li key={id}>
            <a href={url}>{text}</a>
            </li>
        );
        })}
    </ul>);
  }

  return (
    <>
    <nav>
      <div className='nav-center'>
        <div className='nav-header'>
          <h4>GymBuddy</h4>
          <button className='nav-toggle' onClick={() => setShowLinks(!showLinks)}>
            <FaBars />
          </button>
        </div>

        <div
          className={`links-container ${showLinks ? 'show' : ''}`}
          ref={linksContainerRef}
        >
          {links}
        </div>
        {/* social icons
        <ul className='social-icons'>
          {social.map((socialIcon) => {
            const { id, url, icon } = socialIcon;
            return (
              <li key={id}>
                <a href={url}>{icon}</a>
              </li>
            );
          })}
        </ul> */}
      </div>
    </nav>
    <br/>
    </>
  );
};

export default Navbar;
