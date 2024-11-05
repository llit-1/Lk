import React, { useEffect, useState } from 'react';
import './Shifts.css';

const Shifts = () => {
  const [isTable, setIsTable] = useState<boolean>(false);
  const [widthWindow, setWidthWindow] = useState<number>(window.innerWidth);
  const array = [1, 2, 3, 4, 5, 31, 13, 6, 7, 18, 29, 10, 11, 12];

  useEffect(() => {
    const handleResize = () => {
      setWidthWindow(window.innerWidth);
      setIsTable(window.innerWidth >= 890);
    };
    
    // Устанавливаем первоначальное значение
    handleResize();

    // Добавляем слушатель событий
    window.addEventListener('resize', handleResize);

    // Удаляем слушатель при размонтировании компонента
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="shiftWrapper">
      <div className="shiftWrapper_statistic">
        <div>
          <span className="shiftWrapper_statistic_label">Выполненные смены:</span>
          <span className="shiftWrapper_statistic_value">197</span>
        </div>
        <div>
          <span className="shiftWrapper_statistic_label">Отмененные смены:</span>
          <span className="shiftWrapper_statistic_value">3</span>
        </div>
        <div>
          <span className="shiftWrapper_statistic_label">Сумма за выполненные смены (последние 30 дней):</span>
          <span className="shiftWrapper_statistic_value">17640 ₽</span>
        </div>
        <div>
          <span className="shiftWrapper_statistic_label">Сумма за выполненные смены (всего):</span>
          <span className="shiftWrapper_statistic_value">289 590 ₽</span>
        </div>
      </div>

      <div className="shiftWrapper_shiftList">
        {isTable ? (
          <div className="tableWrapper">
            <div className="tableWrapper_header">
              <div className="tableWrapper_header_title" style={{ width: '10%', textAlign: 'center' }}>Дата</div>
              <div className="tableWrapper_header_title" style={{ width: '25%', textAlign: 'center' }}>ТТ</div>
              <div className="tableWrapper_header_title" style={{ width: '20%', textAlign: 'center' }}>Должность</div>
              <div className="tableWrapper_header_title" style={{ width: '15%', textAlign: 'center' }}>Время</div>
              <div className="tableWrapper_header_title" style={{ width: '15%', textAlign: 'center' }}>Стоимость</div>
              <div className="tableWrapper_header_title" style={{ width: '15%', textAlign: 'center' }}>Статус</div>
            </div>
            {array.map((item, index) => (
              <div key={item} className={`tableWrapper_body ${index % 2 === 0 ? '' : 'tableWrapper_body_backgroudRed'}`}>
                <div style={{ width: '10%', textAlign: 'center' }}>05.11.2024</div>
                <div style={{ width: '25%', textAlign: 'center' }}>Тестовая точка</div>
                <div style={{ width: '20%', textAlign: 'center' }}>Вечерний продавец</div>
                <div style={{ width: '15%', textAlign: 'center' }}>08:00 - 17:00</div>
                <div style={{ width: '15%', textAlign: 'center' }}>1230 ₽</div>
                <div style={{ width: '15%', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div className={`tableWrapper_body_status ${index % 2 === 0 ? 'status_green' : 'status_red'}`}>
                    {index % 2 === 0 ? 'Выполнено' : 'Отменено'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          array.map((item) => (
                <div className="shiftList_Card" key={item}>
                <div className="shiftList_Card_title">
                    <span className="Card_title_bold">05.11.2024</span>
                    <span className="Card_title_status"> Выполнено </span>
                </div>

                <div className='shiftList_Card_detailsWrapper'>
                    <div className='Card_details'>
                        <span>Торговая точка: Тестовая точка</span>
                        <span>Время смены: 08:00 - 17:00</span>
                        <span>Должность: Вечерний продавец</span>
                    </div>

                <p className="Card_title_bold Card_details_p">1230 ₽</p>
                </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Shifts;
 