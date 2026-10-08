'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from './Providers';

export default function PostCard({ post, author }) {
  const { user, lists, togglePost } = useApp(); const router=useRouter(); const [open,setOpen]=useState(false);
  const saved=lists.some(l=>l.posts.some(p=>p.id===post.id)); const mins=Math.max(1,Math.ceil(post.body.split(' ').length/38));
  const save=()=>{ if(!user) return router.push('/login'); if(lists.length===1) togglePost(lists[0].id,post); else setOpen(!open); };
  return <article className="post-card"><div className="post-content"><div className="author"><span className="avatar">{author?.[0]}</span><span>{author}</span><span className="dot">·</span><span>6 min read</span></div><h2>{post.title}</h2><p>{post.body}</p><div className="post-meta"><span>#{post.userId} · Oct {post.id}</span><div className="save-wrap"><button className={saved?'save saved':'save'} onClick={save}>{saved?'✓ Saved':'＋ Save'}</button>{open&&<div className="save-menu">{lists.map(l=><label key={l.id}><input type="checkbox" checked={l.posts.some(p=>p.id===post.id)} onChange={()=>togglePost(l.id,post)}/>{l.name}</label>)}</div>}</div></div></div><div className="cover"><img src={`https://picsum.photos/seed/starter${post.id}/300/200`} alt=""/></div></article>;
}
