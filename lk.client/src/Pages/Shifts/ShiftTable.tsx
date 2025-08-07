import React, {useState} from 'react';
import {FutureSlots} from "../../interfaces/FutureSlots"
import {statuses} from "../Objects"
import CloseIcon from '@mui/icons-material/Close';
import ShiftsModal from "./ShiftsModal";
import { useNavigate } from 'react-router-dom';

interface ShiftTableProps {
  data: FutureSlots[];
  fetchData: () => void;
  fetchStatistic: () => void;
}

const ShiftTable: React.FC<ShiftTableProps> = ({data, fetchData, fetchStatistic}) => {

  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const navigate = useNavigate();

  const cancelSheets = (id : number | null) => {
    if(id != null)
    {
      setModalOpen(true)
    }
  }

  return (
    data.length > 0 ? (
      <div className="tableWrapper">

        <div className="tableWrapper_header">
          <div className="tableWrapper_header_title" style={{ width: '10%', textAlign: 'center', fontWeight: 800 }}>Дата</div>
          <div className="tableWrapper_header_title" style={{ width: '25%', textAlign: 'center', fontWeight: 800 }}>Место предоставления услуги</div>
          <div className="tableWrapper_header_title" style={{ width: '20%', textAlign: 'center', fontWeight: 800 }}>Предоставляемая услуга</div>
          <div className="tableWrapper_header_title" style={{ width: '15%', textAlign: 'center', fontWeight: 800 }}>Время</div>
          <div className="tableWrapper_header_title" style={{ width: '15%', textAlign: 'center', fontWeight: 800 }}>Стоимость</div>
          <div className="tableWrapper_header_title" style={{ width: '15%', textAlign: 'center', fontWeight: 800 }}>Статус</div>
        </div>

        {data.map((item) => (
          <React.Fragment key={item.id != null ? item.id : item.guid}>
            <div className={`tableWrapper_body ${item.status === 2 || item.status === 3 ? 'tableWrapper_body_backgroudRed' : "" }`}>
              <div style={{ width: '10%', textAlign: 'center' }}>{item.date}</div>
              <div style={{ width: '25%', textAlign: 'center' }}>{item.locationName}</div>
              <div style={{ width: '20%', textAlign: 'center' }}>{item.jobTitleName}</div>
              <div style={{ width: '15%', textAlign: 'center' }}>{`${item.beginTime}`} - {`${item.endTime}`}</div>
              <div style={{ width: '15%', textAlign: 'center' }}>
                {
                  (() => {
                    let endTimeHours = item.endTime === "00.00" ? 24 : +item.endTime.split(".")[0];
                    
                    const endTimeMinutes = +item.endTime.split(".")[1];
                    const beginTimeHours = +item.beginTime.split(".")[0];
                    const beginTimeMinutes = +item.beginTime.split(".")[1];
                    if(endTimeHours < beginTimeHours)
                    {
                      endTimeHours = +endTimeHours + 24;
                    }
                    const totalMinutes = ((endTimeHours - beginTimeHours) * 60) + (endTimeMinutes - beginTimeMinutes);
                    const totalHours = totalMinutes / 60;
                
                    return totalHours * 210;
                  })()
                } Р
              </div>
              <div style={{ width: '15%', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {item.status != null ? (
                  item.status == 1 ? (
                    <div className={`tableWrapper_body_status`}>
                    <span className={`tableWrapper_body_status_title`} style={{ backgroundColor: statuses[item.status].color }}>{statuses[item.status]?.label}</span>
                    <span className='tableWrapper_body_status_button' onClick={() => cancelSheets(item.id)}> <CloseIcon /> </span>
                    </div>
                  ) : (
                    <div className={`tableWrapper_body_status`}>
                    <span className="Card_title_status" style={{ backgroundColor: statuses[item.status].color }}> {statuses[item.status]?.label} </span>
                    </div>
                  )
                
                  ) : (
                    (() => {
                      const dateParts = item.date.split('.'); // Разделяем строку по точке
                      const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`; // Формат YYYY-MM-DD
                      const date = new Date(formattedDate); // Создаем объект Date
                      return date >= new Date() ? (
                        <div className="tableWrapper_body_status" style={{ backgroundColor: "#CBD915" }}>
                          Ожидается
                        </div>
                      ) : (
                        <div className={`tableWrapper_body_status`} style={{ backgroundColor: "green" }}>
                          Выполнено
                        </div>
                      );
                    })()
                  )
                }
              </div>
            </div>
            {item.id != null && <ShiftsModal fetchData={fetchData} fetchStatistic={fetchStatistic} id={item.id} open={modalOpen} handleClose={() => setModalOpen(false)} />}
          </React.Fragment>
        ))}
      </div>
    ) : (
      <div className='shift_noData'> 
        <span>На данный момент у вас нет ни одного активного слота, возьмите его тут:</span>
        <button onClick={() => navigate("/Main/Exchange")}> Биржа слотов </button>
      </div>
    )
  )
}

export default ShiftTable;
