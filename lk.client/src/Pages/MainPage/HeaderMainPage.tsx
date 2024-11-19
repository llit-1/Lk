import React, { useEffect, useRef, useState } from 'react';
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
  const menuRef = useRef<HTMLDivElement | null>(null);
  const profileButtonRef = useRef<HTMLLIElement | null>(null);

  const handleMenuToggle = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className='main_header'>
      <ul className='header_ul'>
        <li className='header_li' onClick={toggleDrawer(true)}>
          <MenuOutlinedIcon style={{ color: 'white' }} />
        </li>
        <li className='header_li_title' onClick={() => navigate("/Main/Tiles")}>
          Личный Кабинет
        </li>
        <li
          className='header_li'
          id='profileButton'
          onClick={handleMenuToggle}
          ref={profileButtonRef} // Добавляем реф к кнопке профиля
        >
          <img className='header_img' src='/avatar.webp' alt='Profile' />
        </li>
      </ul>

      {menuOpen && (
        <div className="account-menu" ref={menuRef}>
          <div className="account-menu-item" onClick={() => setMenuOpen(false)}>
            <Link to="/Main/Profile" className="menu-link">
              <AccountCircleIcon className="menu-item-icon" />
              Профиль
            </Link>
          </div>
          <div className="account-menu-item" onClick={() => setMenuOpen(false)}>
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
