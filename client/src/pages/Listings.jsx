import {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {api} from '../services/api.js';
import ListingCard from '../components/ListingCard.jsx';

const EMPTY = {search: '', category: '', size: '', condition: '', location: ''};

export default function Listings() {
  const [params, setParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  // seed the filter state from the URL so /listings?category=Tops actually filters
  const [filters, setFilters] = useState(() =>
    Object.fromEntries(Object.entries(EMPTY).map(([k, v]) => [k, params.get(k) || v]))
  );

  const load = async (f = filters) => {
    const active = Object.fromEntries(Object.entries(f).filter(([, v]) => v));
    setError('');
    try {
      const x = await api('/listings?' + new URLSearchParams(active));
      setItems(x.items);
    } catch (e) {
      setError(e.message);
      setItems([]);
    }
  };

  // re-run whenever the URL query changes (e.g. clicking a category on the home page)
  useEffect(() => {
    const next = Object.fromEntries(Object.entries(EMPTY).map(([k, v]) => [k, params.get(k) || v]));
    setFilters(next);
    load(next);
  }, [params.toString()]);

  const apply = () => {
    setParams(Object.fromEntries(Object.entries(filters).filter(([, v]) => v)), {replace: true});
  };

  const set = (k) => (e) => setFilters({...filters, [k]: e.target.value});

  return <div className="container py-4">
    <div className="d-flex justify-content-between align-items-center mb-3">
      <div><h2>Browse clothing</h2><p className="text-muted">Find a fair swap near you.</p></div>
    </div>
    <form className="filterbar row g-2 mb-4" onSubmit={(e) => {e.preventDefault(); apply();}}>
      <div className="col-lg-3"><input className="form-control" placeholder="Search clothes, brands…" value={filters.search} onChange={set('search')} /></div>
      <div className="col-md-3 col-lg-2"><select className="form-select" value={filters.category} onChange={set('category')}><option value="">Category</option>{['Dresses','Tops','Bottoms','Jackets','Ethnic Wear','Shoes','Accessories'].map(x => <option key={x}>{x}</option>)}</select></div>
      <div className="col-md-3 col-lg-2"><select className="form-select" value={filters.size} onChange={set('size')}><option value="">Size</option>{['XS','S','M','L','XL','28','30','32','9'].map(x => <option key={x}>{x}</option>)}</select></div>
      <div className="col-md-3 col-lg-2"><select className="form-select" value={filters.condition} onChange={set('condition')}><option value="">Condition</option>{['Like New','Excellent','Good','Fair'].map(x => <option key={x}>{x}</option>)}</select></div>
      <div className="col-md-6 col-lg-2"><input className="form-control" placeholder="Location" value={filters.location} onChange={set('location')} /></div>
      <div className="col-md-6 col-lg-1"><button className="btn btn-dark w-100" type="submit">Go</button></div>
    </form>
    {error && <div className="alert alert-danger">{error}</div>}
    <div className="row g-4">
      {items.map(i => <div className="col-sm-6 col-lg-4 col-xl-3" key={i._id}><ListingCard item={i} /></div>)}
      {!items.length && !error && <div className="text-center py-5 text-muted">No listings match these filters.</div>}
    </div>
  </div>;
}
