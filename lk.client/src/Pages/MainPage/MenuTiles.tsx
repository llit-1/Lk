import "./Tile.css"

const MenuTiles = () => {
  return (
    <div className='wrapper_tiles'>

        <div className='tile new'>
            <img src='/stats.gif' alt=""/>
            <p>Мои смены</p>
        </div>

        <div className='tile new'>
            <img src='/money.gif' alt=""/>
            <p>Моя зарплата</p>
        </div>

        <div className='tile'>
            <img src='/education.gif' alt=""/>
            <p>Центр обучения</p>
        </div>

        <div className='tile blocked'>
            <img src='/help.gif' alt=""/>
            <p>Помощь</p>
        </div>
    </div>
  )
}

export default MenuTiles