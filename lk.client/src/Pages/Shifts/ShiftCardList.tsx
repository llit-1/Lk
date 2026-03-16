import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ConstructionIcon from '@mui/icons-material/Construction';
import {FutureSlots} from "../../interfaces/FutureSlots"
import {statuses} from "../Objects"
import CloseIcon from '@mui/icons-material/Close';
import ShiftsModal from "./ShiftsModal";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ShiftCardListProps {
  data: FutureSlots[];
  fetchData: () => void;
  fetchStatistic: () => void;
}

const ShiftCardList : React.FC<ShiftCardListProps> = ({data, fetchData, fetchStatistic}) => {

  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const navigate = useNavigate();

  const cancelSheets = (id : number | null) => {
    if (id !== null && id !== undefined) {
      setSelectedId(id)
      setModalOpen(true)
    }
  }

  const parseDateFromDot = (dateStr: string) => {
    const parts = dateStr.split('.').map(Number);
    const [d, m, y] = parts;
    if (!d || !m || !y) return null;
    return new Date(y, m - 1, d);
  }

  const isDateInFutureOrToday = (dateStr: string) => {
    const date = parseDateFromDot(dateStr);
    if (!date) return false;
    const today = new Date();
    today.setHours(0,0,0,0);
    date.setHours(0,0,0,0);
    return date >= today;
  }


  return (
    <>
      {data.length > 0 ? (
        data.map((item) => (
          <React.Fragment key={`${item.id ?? item.guid}`}>
            <div className="shiftList_Card">
              <div className="shiftList_Card_title">
                <span className="Card_title_bold">{item.date}</span>
                {item.status !== null && item.status !== undefined ? (
                  item.status === 1 ? (
                    <div className='Card_title_cancel'>
                      <span className="Card_title_status" style={{ backgroundColor: statuses[item.status]?.color }}>
                        {statuses[item.status]?.label}
                      </span>
                      <span className='title_status_cancelled' onClick={() => cancelSheets(item.id)}>
                        <CloseIcon sx={{}} />
                      </span>
                    </div>
                  ) : (
                    <span className="Card_title_status" style={{ backgroundColor: statuses[item.status]?.color }}>
                      {statuses[item.status]?.label}
                    </span>
                  )
                ) : (
                  isDateInFutureOrToday(item.date) ? (
                    <span className="Card_title_status" style={{ backgroundColor: "#CBD915" }}>
                      Ожидается
                    </span>
                  ) : (
                    <span className="Card_title_status" style={{ backgroundColor: "green" }}>
                      Выполнена
                    </span>
                  )
                )}
              </div>
              <div className="shiftList_Card_detailsWrapper">
                <div className="Card_details">
                  <span><LocationOnIcon /> {item.locationName} </span>
                  <span><AccessTimeIcon /> {`${item.beginTime}`} - {`${item.endTime}`}</span>
                  <span><ConstructionIcon /> {item.jobTitleName} </span>
                </div>
                <p className="Card_title_bold Card_details_p">
                  {item.totalSalary != null ? (
                    item.totalSalary?.toLocaleString('ru-RU') + " Р"
                  ) : "В обработке"}
                </p>
              </div>
            </div>
          </React.Fragment>
        ))
      ) : (
        <div className='shift_noData'>
          <span>На данный момент у вас нет ни одного активного слота, возьмите его тут:</span>
          <button onClick={() => navigate("/Main/Exchange")}>Биржа слотов</button>
        </div>
      )}

      {selectedId !== null && (
        <ShiftsModal
          fetchData={fetchData}
          fetchStatistic={fetchStatistic}
          id={selectedId}
          open={modalOpen}
          handleClose={() => { setModalOpen(false); setSelectedId(null); }}
        />
      )}
    </>
  )
}

export default ShiftCardList;