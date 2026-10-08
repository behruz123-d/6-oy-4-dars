import './globals.css';
import Navbar from '@/components/Navbar';
import { Providers } from '@/components/Providers';

export const metadata = { title: 'Starter — Stories for curious minds', description: 'A clean Medium-inspired starter.' };

export default function RootLayout({ children }) {
  return <html lang="uz"><body><Providers><Navbar /><main className="shell">{children}</main></Providers></body></html>;
}
