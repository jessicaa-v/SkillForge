import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import LevelUpModal from './LevelUpModal';
import GlobalToast from './GlobalToast';

const Layout = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <main className="page-scroll">
          <Outlet />
        </main>
      </div>
      <LevelUpModal />
      <GlobalToast />
    </div>
  );
};

export default Layout;
