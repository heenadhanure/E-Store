import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginModal from './components/auth/LoginModal';
// import './styles/App.css';

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <Router>
      <Header openLoginModal={() => setShowLoginModal(true)} />
      <main style={{ minHeight: '80vh' }}>
        <AppRoutes openLoginModal={()=> setShowLoginModal(true)} />
      </main>
      <Footer />
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </Router>
  );
}

export default App;
