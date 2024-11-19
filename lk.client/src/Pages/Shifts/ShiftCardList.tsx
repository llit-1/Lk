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
  const navigate = useNavigate();

  const cancelSheets = (id : number | null) => {
    if(id != null)
    {
      setModalOpen(true)
    }
  }

  return (
    <>
      {data.length > 0 ? (
        data.map((item) => (
          <React.Fragment key={item.id != null ? item.id : item.guid}>
            <div className="shiftList_Card">
              <div className="shiftList_Card_title">
                      <span className="Card_title_bold">{item.date}</span>
                      {item.status != null ? (
                        item.status == 1 ? (
                          <div className='Card_title_cancel'>
                            <span className="Card_title_status" style={{ backgroundColor: statuses[item.status]?.color }}>{statuses[item.status]?.label}</span>
                            <span className='title_status_cancelled' onClick={() => cancelSheets(item.id)}> <CloseIcon sx={{}}/> </span>
                          </div>
                        ) : (
                          <span className="Card_title_status" style={{ backgroundColor: statuses[item.status]?.color }}> {statuses[item.status]?.label} </span>
                        )
                      ) : (
                        <span className="Card_title_status" style={{ backgroundColor: "green" }}>
                          Выполнена
                        </span> 
                      )}
                      
                    </div>
                    <div className="shiftList_Card_detailsWrapper">
                      <div className="Card_details">
                        <span><LocationOnIcon /> {item.locationName} </span>
                        <span><AccessTimeIcon /> {`${item.beginTime}`} - {`${item.endTime}`}</span>
                        <span><ConstructionIcon /> {item.jobTitleName} </span>
                      </div>
                      <p className="Card_title_bold Card_details_p">  {(((+item.endTime.split(".")[0] - +item.beginTime.split(".")[0]) * 60) + (+item.endTime.split(".")[1] - +item.beginTime.split(".")[1])) / 60 * 210 } Р</p>
                    </div>
            </div>
            { item.id != null && <ShiftsModal fetchData={fetchData} fetchStatistic={fetchStatistic} id={item.id} open={modalOpen} handleClose={() => setModalOpen(false)} />}
          </React.Fragment>
        ))
      ) : (
        <div className='shift_noData'> 
          <span>На данный момент у вас нет ни одной активной смены, возьмите ее тут:</span>
          <button onClick={() => navigate("/Main/Exchange")}> Биржа смен </button>
        </div>
      )}
      


    </>
  ) 
}
  
export default ShiftCardList;