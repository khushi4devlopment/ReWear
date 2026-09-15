import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import ListingCard from '../components/ListingCard.jsx';
import ValueCalculator from '../components/ValueCalculator.jsx';

const categories = [
  ['bi-stars', 'Trending', 'Fresh picks'],
  ['bi-handbag', 'Tops', 'Shirts & tees'],
  ['bi-vinyl', 'Dresses', 'Everyday styles'],
  ['bi-bag', 'Bottoms', 'Jeans & trousers'],
  ['bi-suit', 'Outerwear', 'Jackets & coats'],
  ['bi-gem', 'Accessories', 'Bags & more'],
];

export default function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api('/listings').then((x) => setItems((x.items || []).slice(0, 4))).catch(() => setItems([]));
  }, []);

  return (
    <>
      <section className="hero-modern">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="eyebrow"><i className="bi bi-leaf me-2" />Sustainable fashion marketplace</span>
              <h1>Give your clothes a <span>second life.</span></h1>
              <p className="hero-copy">Swap the pieces you no longer wear for something you'll love. No complicated pricing. Just people, clothes and better choices.</p>
              <div className="d-flex flex-wrap gap-3">
                <Link className="btn btn-brand btn-lg rounded-pill px-4" to="/listings">Explore swaps <i className="bi bi-arrow-right ms-2" /></Link>
                <Link className="btn btn-outline-light btn-lg rounded-pill px-4" to="/dashboard">List your item <i className="bi bi-plus-lg ms-2" /></Link>
              </div>
              <div className="hero-proof">
                <div><strong>♻</strong><span>Reuse more</span></div>
                <div><strong>🤝</strong><span>Swap directly</span></div>
                <div><strong>📍</strong><span>Meet locally</span></div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-visual">
                <img src="/images/rewear-hero.jpg" alt="Clothing rack with pre-loved clothes" />
                <div className="floating-card floating-card-one"><i className="bi bi-recycle" /><span><strong>Less waste</strong><small>One swap at a time</small></span></div>
                <div className="floating-card floating-card-two"><i className="bi bi-heart-fill" /><span><strong>Made to reuse</strong><small>Community powered</small></span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="category-strip">
        <div className="container">
          <div className="section-heading text-center">
            <span>DISCOVER</span><h2>Shop by category</h2><p>Find your next favourite piece or give an old one a new home.</p>
          </div>
          <div className="row g-3">
            {categories.map(([icon, title, sub]) => <div className="col-6 col-md-4 col-lg-2" key={title}>
              <Link className="category-card" to={`/listings?category=${encodeURIComponent(title === 'Trending' ? '' : title)}`}>
                <span className="category-icon"><i className={`bi ${icon}`} /></span><strong>{title}</strong><small>{sub}</small>
              </Link>
            </div>)}
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="section-row"><div><span className="mini-label">JUST ADDED</span><h2>Fresh from the community</h2><p>Real pieces ready for their next chapter.</p></div><Link className="text-link" to="/listings">View all listings <i className="bi bi-arrow-right" /></Link></div>
        <div className="row g-4">{items.map((i) => <div className="col-md-6 col-lg-3" key={i._id}><ListingCard item={i} /></div>)}</div>
        {!items.length && <div className="empty-state"><i className="bi bi-bag-heart" /><h5>New pieces are coming in</h5><p>Be the first to list something and start a swap.</p></div>}
      </section>

      <section className="how-section">
        <div className="container">
          <div className="section-heading text-center"><span>HOW IT WORKS</span><h2>Swap in three simple steps</h2><p>No checkout. No complicated selling. Just a better way to refresh your wardrobe.</p></div>
          <div className="row g-4 mt-2">
            {[
              ['01', 'List a piece', 'Upload a few photos and tell the community about your clothes.'],
              ['02', 'Find a match', 'Browse nearby listings and send a swap request for something you love.'],
              ['03', 'Make the swap', 'Chat, agree on the details and exchange locally or by courier.'],
            ].map(([num, title, text]) => <div className="col-md-4" key={num}><div className="step-card"><span>{num}</span><div className="step-line" /><h4>{title}</h4><p>{text}</p></div></div>)}
          </div>
        </div>
      </section>

      <section className="calculator-section">
        <div className="container"><div className="row align-items-center g-5"><div className="col-lg-6"><span className="mini-label">FAIRER SWAPS</span><h2>Know the estimated value before you negotiate.</h2><p>Use our simple swap-value calculator to compare brand, condition, category and age. It gives both sides a useful starting point for a fair exchange.</p><div className="check-list"><span><i className="bi bi-check-circle-fill" /> Brand-aware estimate</span><span><i className="bi bi-check-circle-fill" /> Condition adjustment</span><span><i className="bi bi-check-circle-fill" /> Category weighting</span></div></div><div className="col-lg-5 ms-auto"><ValueCalculator /></div></div></div>
      </section>

      <section className="impact-banner"><div className="container"><div className="row align-items-center g-4"><div className="col-lg-7"><span className="eyebrow eyebrow-dark"><i className="bi bi-flower1 me-2" />Small swaps. Bigger impact.</span><h2>Wear what you love, waste less.</h2><p>Every exchange keeps a wearable piece in circulation for longer and helps build a more thoughtful fashion community.</p></div><div className="col-lg-5"><div className="impact-stats"><div><strong>01</strong><span>swap instead of shop</span></div><div><strong>∞</strong><span>styles to discover</span></div><div><strong>0₹</strong><span>purchase required</span></div></div></div></div></div></section>
    </>
  );
}
