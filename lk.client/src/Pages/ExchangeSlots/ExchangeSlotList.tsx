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
          <p className='nullSlots'>К сожалению, доступных слотов сейчас нет :(</p>
        )
      )}
    </div>
  );
};

export default ExchangeSlotList;
