import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { CircularProgress } from "@mui/material";
import {dropSheet} from "../Requests"

interface ShiftsModalProps {
    open: boolean;
    handleClose: () => void;
    id: number;
    fetchData: () => void;
    fetchStatistic: () => void;
}

const ShiftsModal: React.FC<ShiftsModalProps> = ({ open, handleClose, id, fetchData, fetchStatistic}) => {

  const [isLoad, setIsLoad] = useState<boolean>(false)

  const cancelledSheets = () => {
    setIsLoad(true)
    dropSheetHandler()
  }

  const dropSheetHandler = async () => {
    const result = await dropSheet(id)

    if(result == 200 || result == 204)
    {
      fetchData()
      fetchStatistic()
      handleClose()
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
        <div className='shiftModalWrapper'>
          <div className="shiftWrapperModal">
            {!isLoad ? (
              <>
                <div className="shiftModalWrapper_title">
                  Отменить слот?
                </div>
              
                <div className="shiftModalWrapper_body">
                  Вы уверены, что хотите отменить слот? В случае отмены ваш рейтинг будет уменьшен
                </div>

                <div className="shiftModalWrapper_Buttons">
                  <button className='shiftModalWrapper_Buttons_cancelled' onClick={cancelledSheets}> Отменить слот </button>
                  <button className='shiftModalWrapper_Buttons_closeWindow' onClick={handleClose}> Закрыть окно </button>
                </div>
              </>
            ) : (
                <CircularProgress sx={{ color: "orange" }} size={66} />
            )}
          </div>
        </div>
    </Modal>
  )
}

export default ShiftsModal