import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const linkClass = ({ isActive }) => `nav-link ${isActive ? 'active' : ''}`;

  return (
    <nav className="navbar navbar-expand-lg rewear-navbar sticky-top">
      <div className="container py-2">
        <Link className="navbar-brand rewear-brand" to="/">
          <span className="brand-mark"><i className="bi bi-recycle" /></span>
          <span><strong>ReWear</strong><small>Swap · Share · Sustain</small></span>
        </Link>

        <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
          <i className="bi bi-list fs-2" />
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <div className="navbar-nav mx-auto nav-pills-custom">
            <NavLink className={linkClass} to="/">Home</NavLink>
            <NavLink className={linkClass} to="/listings">Browse Clothes</NavLink>
            {user && <NavLink className={linkClass} to="/dashboard">Dashboard</NavLink>}
            {user && <NavLink className={linkClass} to="/swaps">My Swaps</NavLink>}
            {user?.role === 'admin' && <NavLink className={linkClass} to="/admin">Admin</NavLink>}
          </div>

          <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
            <Link className="icon-btn d-none d-lg-inline-flex" to="/listings" title="Browse"><i className="bi bi-search" /></Link>
            {user ? (
              <>
                <Link className="profile-pill" to="/profile">
                  <span className="avatar"><i className="bi bi-person" /></span>
                  <span className="d-none d-xl-block">Hi, {user.name.split(' ')[0]}</span>
                </Link>
                <button className="btn btn-dark rounded-pill px-3" onClick={() => { logout(); nav('/login'); }}>Logout</button>
              </>
            ) : (
              <>
                <Link className="btn btn-outline-dark rounded-pill px-3" to="/login">Login</Link>
                <Link className="btn btn-brand rounded-pill px-3" to="/register">Join ReWear</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
