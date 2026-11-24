import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import LevelUpModal from './LevelUpModal';
import GlobalToast from './GlobalToast';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`app-container ${sidebarOpen ? 'sidebar-mobile-open' : ''}`}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-content">
        <Topbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="page-scroll">
          <Outlet />
        </main>
      </div>
      {sidebarOpen && (
        <div className="mobile-backdrop" onClick={() => setSidebarOpen(false)}></div>
      )}
      <LevelUpModal />
      <GlobalToast />
    </div>
  );
};

export default Layout;
