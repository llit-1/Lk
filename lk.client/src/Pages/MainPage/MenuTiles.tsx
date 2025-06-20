import "./Tile.css";
import { Link } from 'react-router-dom';

const MenuTiles = () => {
  return (
    
    <div className='wrapper_tiles'>
      <Link to="/Main/Shifts" className='tile new'> {/* Ссылка на страницу смен */}
        <img src='/stats.webp' alt=""/>
        <p>Мои смены</p>
      </Link>

      <Link to="/Main/Exchange" className='tile new'> {/* Ссылка на страницу смен */}
        <img src='/exchange.webp' alt=""/>
        <p>Биржа смен</p>
      </Link>

      <Link to="/Main/Salary" className='tile blocked' onClick={(event) => event.preventDefault()}> {/* Ссылка на страницу зарплаты */}
        <img src='/money.webp' alt=""/>
        <p>Моя зарплата</p>
      </Link>

      <Link to="/Main/Training" className='tile blocked' onClick={(event) => event.preventDefault()}> {/* Ссылка на страницу обучения */}
        <img src='/education.webp' alt=""/>
        <p>Центр обучения</p>
      </Link>

      <Link to="/Main/SalaryLevel" className='tile new'> {/* Ссылка на страницу обучения */}
        <img src='/morale.webp' alt=""/>
        <p>Уровень дохода</p>
      </Link>

      <Link to="/Main/Help" className='tile blocked' onClick={(event) => event.preventDefault()}> {/* Ссылка на страницу помощи */}
        <img src='/help.webp' alt=""/>
        <p>Помощь</p>
      </Link>

    </div>
  )
}

export default MenuTiles;
