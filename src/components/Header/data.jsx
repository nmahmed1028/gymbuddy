import { FaBehance, FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';
export const linksLoggedIn = [
  {
    id: 1,
    url: '/nutrition',
    text: 'nutrition',
  },
  {
    id: 2,
    url: '/workout',
    text: 'workout',
  },
  {
    id: 3,
    url: '/social',
    text: 'social',
  },
  {
    id: 4,
    url: '/profile',
    text: 'profile',
  },
  {
    id: 5,
    url: '/logout',
    text: 'logout',
  },
];

export const linksLoggedOut = [
  {
    id: 1,
    url: '/register',
    text: 'register',
  },
  {
    id: 2,
    url: '/login',
    text: 'login',
  },
];

export const social = [
  {
    id: 1,
    url: 'https://www.twitter.com',
    icon: <FaFacebook />,
  },
  {
    id: 2,
    url: 'https://www.twitter.com',
    icon: <FaTwitter />,
  },
  {
    id: 3,
    url: 'https://www.twitter.com',
    icon: <FaLinkedin />,
  },
  {
    id: 4,
    url: 'https://www.twitter.com',
    icon: <FaBehance />,
  },
];
