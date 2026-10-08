'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useApp } from './Providers';

export default function Navbar() {
  const { user, logout } = useApp();
  const path = usePathname(); const router = useRouter(); const [q, setQ] = useState('');
  const search = (e) => { e.preventDefault(); const value=q.trim(); router.push(value ? `/?q=${encodeURIComponent(value)}` : '/'); };
  return <header className="topbar"><div className="top-inner">
    <Link href="/" className="brand"><span className="brand-mark">S</span><span>starter</span></Link>
    <form onSubmit={search} className="search"><span>⌕</span><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search stories" /></form>
    <nav className="navlinks"><Link className={path==='/'?'active':''} href="/">Home</Link><Link className={path==='/library'?'active':''} href="/library">Library</Link>{user ? <Link href="/profile" className="profile-chip"><span>{user.name?.[0]?.toUpperCase() || 'U'}</span><b>{user.name}</b></Link> : <><Link className={path==='/login'?'active':''} href="/login">Sign in</Link><Link className="join" href="/register">Get started</Link></>}</nav>
  </div></header>;
}
