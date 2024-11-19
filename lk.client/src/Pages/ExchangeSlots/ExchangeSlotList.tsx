// ExchangeSlotList.tsx
import React from 'react';
import { ExchangeSlot } from "../../interfaces/ExchangeSlot";
import ExchangeSlotCard from "./ExchangeSlotCard";
import ExchangeSlotCardLoading from "./ExchangeSlotCardLoading";

interface ExchangeSlotListProps {
  loading: boolean;
  exchangeSlot: ExchangeSlot[];
  onSlotClick: (slot: ExchangeSlot) => void;
}

const ExchangeSlotList: React.FC<ExchangeSlotListProps> = ({ loading, exchangeSlot, onSlotClick }) => {
  return (
    <div className="ExchangeCards">
      {loading ? (
        [...Array(4)].map((_, i) => (
          <ExchangeSlotCardLoading key={i} index={i} />
        ))
      ) : (
        exchangeSlot.length !== 0 ? (
          exchangeSlot.map((elem) => (
            <ExchangeSlotCard fn={onSlotClick} key={elem.id} elem={elem} />
          ))
        ) : (
        <div className='ExchangeCards_emptyList'>
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 80 96">
            <path fill="#EEE" fillRule="nonzero" d="M68.734 27.838l4.3-5.047a1.19 1.19 0 0 0-.135-1.677l-4.111-3.507a1.196 1.196 0 0 0-.868-.282 1.2 1.2 0 0 0-.812.415l-4.31 5.055a39.762 39.762 0 0 0-18.723-6.929v-6.82h8.174a1.19 1.19 0 0 0 1.19-1.192V1.191A1.19 1.19 0 0 0 52.25 0H27.751a1.19 1.19 0 0 0-1.19 1.19v6.667c0 .658.532 1.19 1.19 1.19h8.173v6.821A39.766 39.766 0 0 0 17.2 22.797l-4.31-5.055a1.189 1.189 0 0 0-1.678-.133l-4.115 3.507a1.19 1.19 0 0 0-.132 1.677l4.3 5.047C4.294 35.037 0 44.848 0 55.664c0 22.09 17.909 40 40 40 22.09 0 40-17.91 40-40 0-10.816-4.294-20.627-11.266-27.826zm3.093 27.814H41.209a1.209 1.209 0 0 1-1.208-1.208V23.827c0-.668.54-1.209 1.208-1.209 17.549 0 31.824 14.278 31.824 31.827a1.208 1.208 0 0 1-1.206 1.207z"></path>
          </svg>

          <p className='emptyList_p'>Все смены забронированы</p>

          <p>Ожидайте поступление новых слотов</p>

        </div>)
      )}
    </div>
  );
};

export default ExchangeSlotList;
