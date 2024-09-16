import React from 'react'
import "./HeaderMainPage.css"
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { MenuItem, Divider, Menu} from '@mui/material/';
import { Link, useNavigate } from 'react-router-dom';


interface HeaderMainPageProps {
  toggleDrawer: (open: boolean) => () => void;
}

const HeaderMainPage : React.FC<HeaderMainPageProps> = ({toggleDrawer}) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className='main_header'>
      <ul className='header_ul'>
        <li className='header_li' onClick={toggleDrawer(true)}> <MenuOutlinedIcon sx={{color: "white"}}/> </li>  
        <li className='header_li_title' onClick={() => navigate("/Main/Tiles")}> Личный Кабинет </li>
        <li className='header_li' 
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          aria-expanded={open ? 'true' : undefined}
        >
          <img className='header_img' src='/avatar.gif'></img>       
        </li>  
      </ul>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        sx={{ width: '300px', maxWidth: '100%', padding: '10px' }} // Увеличьте ширину и добавьте отступы
      >
        <Divider />

        <MenuItem 
          component={Link} 
          to="/Profile" 
          onClick={handleClose} 
          sx={{ fontSize: '18px', padding: '12px 16px' }}
        > 
          <p className='subMenu_text'>Профиль</p>
        </MenuItem>

        <MenuItem 
         component={Link} 
         to="/Login" 
         onClick={handleClose} 
         sx={{ fontSize: '18px', padding: '12px 16px' }}
        > 
          <p className='subMenu_text'>Выйти</p>
        </MenuItem>
        
      </Menu>


    </header>



  )
}

export default HeaderMainPage