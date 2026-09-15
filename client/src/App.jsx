import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './pages/Home.jsx';
import Listings from './pages/Listings.jsx';
import ItemDetail from './pages/ItemDetail.jsx';
import Auth from './pages/Auth.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Swaps from './pages/Swaps.jsx';
import Chat from './pages/Chat.jsx';
import Profile from './pages/Profile.jsx';
import Admin from './pages/Admin.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

function Footer() {
  return <footer className="site-footer">
    <div className="container">
      <div className="row g-5 pb-5">
        <div className="col-lg-5"><Link className="footer-brand" to="/"><span className="brand-mark"><i className="bi bi-recycle" /></span><span><strong>ReWear</strong><small>Swap · Share · Sustain</small></span></Link><p className="footer-copy">A community-powered marketplace for giving good clothes a second life through simple, direct swaps.</p><div className="socials"><a href="#" aria-label="Instagram"><i className="bi bi-instagram" /></a><a href="#" aria-label="Facebook"><i className="bi bi-facebook" /></a><a href="#" aria-label="Pinterest"><i className="bi bi-pinterest" /></a></div></div>
        <div className="col-6 col-lg-2"><h6>Explore</h6><Link to="/listings">Browse clothes</Link><Link to="/register">Join ReWear</Link><Link to="/dashboard">List an item</Link><Link to="/swaps">My swaps</Link></div>
        <div className="col-6 col-lg-2"><h6>Platform</h6><Link to="/">How it works</Link><Link to="/profile">My profile</Link><Link to="/login">Sign in</Link><Link to="/register">Create account</Link></div>
        <div className="col-lg-3"><h6>Why ReWear?</h6><p>♻ Reduce textile waste</p><p>🤝 Exchange without buying</p><p>📍 Discover local opportunities</p><p>💚 Build a sustainable wardrobe</p></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} ReWear. Built for a more circular wardrobe.</span><span>React · Express · MongoDB</span></div>
    </div>
  </footer>;
}

function App() {
  return <AuthProvider><Navbar /><main><Routes><Route path="/" element={<Home />} /><Route path="/listings" element={<Listings />} /><Route path="/items/:id" element={<ItemDetail />} /><Route path="/login" element={<Auth />} /><Route path="/register" element={<Auth register />} /><Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /><Route path="/swaps" element={<ProtectedRoute><Swaps /></ProtectedRoute>} /><Route path="/chat/:swapId" element={<ProtectedRoute><Chat /></ProtectedRoute>} /><Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} /><Route path="/admin" element={<ProtectedRoute admin><Admin /></ProtectedRoute>} /><Route path="*" element={<div className="container py-5 text-center"><h2>Page not found</h2><Link to="/">Back home</Link></div>} /></Routes></main><Footer /></AuthProvider>;
}

export default function Root() { return <BrowserRouter><App /></BrowserRouter>; }
