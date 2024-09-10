import { Drawer, List, ListItem, ListItemText, ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';


interface MenuProps {
    isOpen: boolean
    toggleDrawer: (open: boolean) => () => void;
}

const Menu : React.FC<MenuProps> = ({isOpen, toggleDrawer}) => {
    return (
        <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
          <List className='menu' sx={{ padding: "0px" }}>
            <ListItem sx={{ height: "60px", borderBottom: "1px solid #D3D2D2"}}>
              <ListItemButton component={Link} to="/Main/Tiles">
                <ListItemText primary="Главная" />
              </ListItemButton>
            </ListItem>
    
            <ListItem sx={{ height: "60px", borderBottom: "1px solid #D3D2D2" }}>
              <ListItemButton component={Link} to="/Main/Shifts">
                <ListItemText primary="Мои смены"/>
              </ListItemButton>
            </ListItem>
    
            <ListItem sx={{ height: "60px", borderBottom: "1px solid #D3D2D2" }}>
              <ListItemButton component={Link} to="/Main/Salary">
                <ListItemText primary="Моя зарплата" />
              </ListItemButton>
            </ListItem>
    
            <ListItem sx={{ height: "60px", borderBottom: "1px solid #D3D2D2" }}>
              <ListItemButton component={Link} to="/Main/Training">
                <ListItemText primary="Центр обучения" />
              </ListItemButton>
            </ListItem>
    
            <ListItem sx={{ height: "60px", borderBottom: "1px solid #D3D2D2" }}>
              <ListItemButton component={Link} to="/Main/Help">
                <ListItemText primary="Помощь" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      );
}

export default Menu