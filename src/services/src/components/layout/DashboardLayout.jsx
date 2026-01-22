import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PenTool, MessageSquare, History, Settings, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SidebarItem = ({ icon: Icon, label, path, active }) => (
  <Link to={path}>
    <div className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      active ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    }`}>
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </div>
  </Link>
);

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isOpen ? 260 : 0 }}
        className="bg-secondary text-white relative z-20 shadow-xl overflow-hidden"
      >
        <div className="p-6">
          <h1 className="text-xl font-bold tracking-tight text-accent">BRAND.OS</h1>
        </div>
        <nav className="px-4 space-y-2">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" path="/" active={location.pathname === '/'} />
          <SidebarItem icon={PenTool} label="Brand Profile" path="/profile" active={location.pathname === '/profile'} />
          <SidebarItem icon={MessageSquare} label="AI Assistant" path="/ai" active={location.pathname === '/ai'} />
          <SidebarItem icon={History} label="History" path="/history" active={location.pathname === '/history'} />
          <SidebarItem icon={Settings} label="Settings" path="/settings" active={location.pathname === '/settings'} />
        </nav>
        <div className="absolute bottom-8 w-full px-4">
          <button className="flex items-center space-x-3 text-slate-400 hover:text-red-400 transition-colors px-4 py-3">
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-border flex items-center justify-between px-8">
          <button onClick={() => setIsOpen(!isOpen)} className="text-slate-500 hover:text-primary">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">JD</div>
            <span className="text-sm font-semibold text-slate-700">John Doe</span>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
