'use client';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PostCard from '@/components/PostCard';

function Feed(){
 const q=(useSearchParams().get('q')||'').toLowerCase(); const [posts,setPosts]=useState([]); const [users,setUsers]=useState({}); const [loading,setLoading]=useState(true); const [error,setError]=useState(false);
 useEffect(()=>{ Promise.all([fetch('https://jsonplaceholder.typicode.com/posts').then(r=>r.ok?r.json():Promise.reject()),fetch('https://jsonplaceholder.typicode.com/users').then(r=>r.ok?r.json():Promise.reject())]).then(([p,u])=>{setPosts(p);setUsers(Object.fromEntries(u.map(x=>[x.id,x.name])))}).catch(()=>setError(true)).finally(()=>setLoading(false)); },[]);
 const filtered=posts.filter(p=>!q||(p.title+' '+p.body+' '+(users[p.userId]||'')).toLowerCase().includes(q));
 if(loading)return <div className="loading"><div></div><div></div><div></div></div>;
 if(error)return <div className="empty"><h2>Couldn’t load stories</h2><p>Check your internet connection and refresh the page.</p></div>;
 return <><section className="hero"><div><span className="eyebrow">STARTER · READ & DISCOVER</span><h1>Ideas worth reading.</h1><p>A calm place for stories, opinions, and things you want to remember.</p></div><div className="hero-orbit">✦</div></section><div className="feed-head"><div><b>{q?`Results for “${q}”`:'For you'}</b><span>{q?`${filtered.length} stories`:'Fresh stories from the community'}</span></div><button className="filter">Latest⌄</button></div>{filtered.map(p=><PostCard key={p.id} post={p} author={users[p.userId]||'Unknown writer'}/>)}{!filtered.length&&<div className="empty"><h2>No stories found</h2><p>Try a different search.</p></div>}</>;
}
export default function Home(){return <Suspense fallback={<div className="loading"><div></div><div></div></div>}><Feed/></Suspense>}
