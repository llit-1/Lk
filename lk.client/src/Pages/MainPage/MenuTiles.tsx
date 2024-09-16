import "./Tile.css";
import { Link } from 'react-router-dom';

const MenuTiles = () => {
  return (
    <div className='wrapper_tiles'>
      <Link to="/Main/Shifts" className='tile new'> {/* Ссылка на страницу смен */}
        <img src='/stats.gif' alt=""/>
        <p>Мои смены</p>
      </Link>

      <Link to="/Main/Salary" className='tile new'> {/* Ссылка на страницу зарплаты */}
        <img src='/money.gif' alt=""/>
        <p>Моя зарплата</p>
      </Link>

      <Link to="/Main/Training" className='tile blocked'> {/* Ссылка на страницу обучения */}
        <img src='/education.gif' alt=""/>
        <p>Центр обучения</p>
      </Link>

      <Link to="/Main/Help" className='tile'> {/* Ссылка на страницу помощи */}
        <img src='/help.gif' alt=""/>
        <p>Помощь</p>
      </Link>


      <div className="helpWithJobs">
        i
      </div>

    </div>
  )
}

export default MenuTiles;
