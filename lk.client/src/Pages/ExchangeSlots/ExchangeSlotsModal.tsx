import React, { useEffect } from 'react';
import Modal from '@mui/material/Modal';
import { CircularProgress } from "@mui/material";
import { takeWorkingSlots } from "../Requests";
import { ExchangeSlot } from "../../interfaces/ExchangeSlot";

interface ExchangeSlotsModalProps {
  open: boolean;
  handleClose: () => void;
  selectedSlot: ExchangeSlot | null;
  loadingModal: boolean;
  setLoadingModal: React.Dispatch<React.SetStateAction<boolean>>;
  getData: () => void;
  isBooked: boolean | null;
  setIsBooked: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const ExchangeSlotsModal: React.FC<ExchangeSlotsModalProps> = ({ open, handleClose, selectedSlot, loadingModal, setLoadingModal, getData, isBooked, setIsBooked }) => {
  
  const confirmHandler = async (Id: number) => {
    setLoadingModal(true);
    const result = await takeWorkingSlots(Id);
    setLoadingModal(false);
    setIsBooked(result === 200);
    getData();
  };

  useEffect(() => {
    if (open) {
      setIsBooked(null); // Сбрасываем при каждом открытии модального окна
    }
  }, [open, setIsBooked]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className='ExchangeSlots_Modal'>
        {loadingModal ? (
          <div className='ExchangeSlots_Modal_Loader'>
            <CircularProgress sx={{ color: "orange" }} size={66} />
          </div>
        ) : isBooked === true ? (
          <div className='ExchangeSlots_Modal_Result'>
            <img src='/good.webp' alt="Success" />
            <p>Смена успешно забронирована!</p>
          </div>
        ) : isBooked === false ? (
          <div className='ExchangeSlots_Modal_Result'>
            <img src='/bad.webp' alt="Canceled" />
            <p>К сожалению, смена уже забронирована!</p>
          </div>
        ) : (
          <>
            <div className='ExchangeSlots_Modal_Header'> Подтвердите взятие смены </div>
            {selectedSlot ? (
              <div className='ExchangeSlots_Modal_Data'>
                <p>ТТ: {selectedSlot.locations.name}</p>
                <p>Должность: {selectedSlot.jobTitles.name}</p>
                <p>Дата: {selectedSlot.begin.split("T")[0]}</p>
                <p>Время: {selectedSlot.begin.split("T")[1].slice(0, 5)} - {selectedSlot.end.split("T")[1].slice(0, 5)}</p>
                <p className='ExchangeSlots_Modal_HandlerCost'>
                  Стоимость смены: <span className='ExchangeSlots_Modal_p'>{
                    ((new Date(selectedSlot.end).getTime() - new Date(selectedSlot.begin).getTime()) / (1000 * 60 * 60)) * 210
                  }</span> рублей
                </p>
              </div>
            ) : (
              <p>Загрузка...</p>
            )}
            <div className='ExchangeSlots_Modal_HandlerButton'>
              <button className='ExchangeSlots_Modal_ButtonOk' onClick={() => confirmHandler(selectedSlot?.id ?? 0)}>Подтвердить</button>
              <button className='ExchangeSlots_Modal_ButtonCancel' onClick={handleClose}>Отменить</button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ExchangeSlotsModal;
