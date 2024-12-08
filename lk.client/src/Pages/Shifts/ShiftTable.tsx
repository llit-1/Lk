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
          <div className="tableWrapper_header_title" style={{ width: '25%', textAlign: 'center', fontWeight: 800 }}>ТТ</div>
          <div className="tableWrapper_header_title" style={{ width: '20%', textAlign: 'center', fontWeight: 800 }}>Должность</div>
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
              <div style={{ width: '15%', textAlign: 'center' }}>{(((+item.endTime.split(".")[0] - +item.beginTime.split(".")[0]) * 60) + (+item.endTime.split(".")[1] - +item.beginTime.split(".")[1])) / 60 * 210 } Р</div>
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
                  <div className={`tableWrapper_body_status`} style={{ backgroundColor: "green" }}>
                    Выполнено
                  </div>
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
        <span>На данный момент у вас нет ни одной активной смены, возьмите ее тут:</span>
        <button onClick={() => navigate("/Main/Exchange")}> Биржа смен </button>
      </div>
    )
  )
}

export default ShiftTable;
