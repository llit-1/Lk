import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import './HeaderMainPage.css';

interface HeaderMainPageProps {
  toggleDrawer: (open: boolean) => () => void;
}

const HeaderMainPage: React.FC<HeaderMainPageProps> = ({ toggleDrawer }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => setMenuOpen(!menuOpen);

  return (
    <header className='main_header'>
      <ul className='header_ul'>
        <li className='header_li' onClick={toggleDrawer(true)}>
          <MenuOutlinedIcon style={{ color: 'white' }} />
        </li>
        <li className='header_li_title' onClick={() => navigate("/Main/Tiles")}>
          Личный Кабинет
        </li>
        <li className='header_li' onClick={handleMenuToggle}>
          <img className='header_img' src='/avatar.webp' alt='Profile' />
        </li>
      </ul>

      {menuOpen && (
        <div className="account-menu">
          <div className="account-menu-item" onClick={handleMenuToggle}>
            <Link to="/Main/Profile" className="menu-link">
              <AccountCircleIcon className="menu-item-icon" />
              Профиль
            </Link>
          </div>
          <div className="account-menu-item" onClick={handleMenuToggle}>
            <Link to="/Login" className="menu-link">
              <ExitToAppIcon className="menu-item-icon" />
              Выйти
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderMainPage;
