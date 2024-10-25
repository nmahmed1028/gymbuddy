import { useState, useRef } from 'react';
import { FaBars } from 'react-icons/fa';
import { linksLoggedIn, linksLoggedOut, social } from './data';
import { useAuth } from "../../hooks/AuthProvider";

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };
  const linkStyles = {
    height: showLinks
      ? `${linksRef.current.getBoundingClientRect().height}px`
      : '0px',
  };

  const user = useAuth();
  var links = (<ul></ul>);
  if (!user.token)
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
          <button className='nav-toggle' onClick={toggleLinks}>
            <FaBars />
          </button>
        </div>

        <div
          className='links-container'
          ref={linksContainerRef}
          style={linkStyles}
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
