'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext(null);
const starterLists = [{ id: 'read-later', name: 'Read later', posts: [] }];

export function Providers({ children }) {
  const [user, setUser] = useState(null);
  const [lists, setLists] = useState(starterLists);
  useEffect(() => {
    try {
      const saved = localStorage.getItem('starter-user');
      const savedLists = localStorage.getItem('starter-lists');
      if (saved) setUser(JSON.parse(saved));
      if (savedLists) setLists(JSON.parse(savedLists));
    } catch {}
  }, []);
  useEffect(() => localStorage.setItem('starter-lists', JSON.stringify(lists)), [lists]);
  const login = (u) => { setUser(u); localStorage.setItem('starter-user', JSON.stringify(u)); };
  const logout = () => { setUser(null); localStorage.removeItem('starter-user'); };
  const addList = (name) => setLists((x) => [...x, { id: crypto.randomUUID(), name, posts: [] }]);
  const togglePost = (listId, post) => setLists((x) => x.map((l) => l.id !== listId ? l : ({ ...l, posts: l.posts.some(p => p.id === post.id) ? l.posts.filter(p => p.id !== post.id) : [...l.posts, post] })));
  return <AppContext.Provider value={{ user, login, logout, lists, addList, togglePost }}>{children}</AppContext.Provider>;
}
export const useApp = () => useContext(AppContext);
