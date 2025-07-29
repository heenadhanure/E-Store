import React from 'react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#0a0a23', color: 'white', textAlign: 'center', padding: '10px 0' }}>
      <p>&copy; {new Date().getFullYear()} eStore. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
