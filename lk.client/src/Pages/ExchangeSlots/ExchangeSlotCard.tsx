import React from 'react'
import { ExchangeSlot } from "../../interfaces/ExchangeSlot";

interface ExchangeSlotCardProps {
    elem: ExchangeSlot;
    fn: (elem: ExchangeSlot) => void;
}

const ExchangeSlotCard: React.FC<ExchangeSlotCardProps> = ({ elem, fn }) => {
  return (

    elem.available === 1 ? (
        
        <div className='slot'>
            <div className='slot_title'>
                <p>ТТ: {elem.locations?.name || 'Неизвестно'}</p>
                <div className='slot_title_extra'> <img src="/star-orange.png" alt="Logo" /> </div>
            </div>
            <div className='slot_info'>Должность: {elem.jobTitles.name} </div>
            <div className='slot_info slot_info_date'>
                Дата и время смены: 
                <p>
                    {elem.begin ? elem.begin.split("T")[0] : 'Не указана'} 
                </p>
                в
                <p>
                    {elem.begin.split("T")[1].slice(0, 5)} - {elem.end.split("T")[1].slice(0, 5)}
                </p>
            </div>
            <div className='slot_info slot_bottom'>

                <div className='slot_price'>
                    <p>
                        {((new Date(elem.end).getTime() - new Date(elem.begin).getTime()) / (1000 * 60 * 60)) * 210} рублей/смена 
                    </p>
                </div>

                <div className='slot_button'>
                    <button onClick={() => fn(elem)}>Взять в работу</button>
                </div>
            </div>
        </div>
    ) : (
        <div className='slot disabled'>
            <div className='slot_title'>
                <p>ТТ: {elem.locations?.name || 'Неизвестно'}</p>
                <div className='slot_title_extra'> <img src="/star-orange.png" alt="Logo" /> </div>
            </div>
            <div className='slot_info'>Должность: {elem.jobTitles.name} </div>
            <div className='slot_info slot_info_date'>
                Дата и время смены: 
                <p>
                    {elem.begin ? elem.begin.split("T")[0] : 'Не указана'} 
                </p>
                в
                <p>
                    {elem.begin.split("T")[1].slice(0, 5)} - {elem.end.split("T")[1].slice(0, 5)}
                </p>
            </div>
            <div className='slot_info slot_bottom'>

                <div className='slot_price text-disabled'>
                    <p>
                        {((new Date(elem.end).getTime() - new Date(elem.begin).getTime()) / (1000 * 60 * 60)) * 210} рублей/смена 
                    </p>
                </div>

                <div className='slot_button'>
                    <button disabled onClick={() => fn(elem)}>Взять в работу</button>
                </div>
            </div>
        </div>
    )
 
  )
}

export default ExchangeSlotCard