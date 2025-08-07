import { Drawer } from '@mui/material';
import { Link } from 'react-router-dom';

import styles from "./Menu.module.css"

interface MenuProps {
    isOpen: boolean
    toggleDrawer: (open: boolean) => () => void;
}

const Menu : React.FC<MenuProps> = ({isOpen, toggleDrawer}) => {
    return (
        <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>

          <div className={styles['menu_wrapper']}>
            <Link to="/Main/Tiles" className={styles['menu_list']}>Главная</Link>
            <Link to="/Main/Shifts" className={styles['menu_list']}>Мои слоты</Link>
            <Link to="/Main/Exchange" className={styles['menu_list']}>Биржа слотов</Link>
            {/* <Link to="/Main/Salary" className={styles['menu_list']}>Моя зарплата</Link> */}
            <div className={`${styles.menu_list} ${styles.item_blocked}`}>Мои выплаты</div>
            <div className={`${styles.menu_list} ${styles.item_blocked}`}>Центр обучения</div>
            {/* <Link to="/Main/Training" className={styles['menu_list']}>Центр обучения</Link> */}
            {/*<Link to="/Main/SalaryLevel" className={styles['menu_list']}>Уровень дохода</Link> */}
            <div className={`${styles.menu_list} ${styles.item_blocked}`}>Помощь</div>
            {/* <Link to="/Main/Help" className={styles['menu_list']}>Помощь</Link> */}
          </div>

        </Drawer>
      );
}

export default Menu