import React from 'react'
import { ExchangeSlot } from "../../interfaces/ExchangeSlot";

interface ExchangeSlotCardProps {
    elem: ExchangeSlot;
    fn: (elem: ExchangeSlot) => void;
}

const ExchangeSlotCard: React.FC<ExchangeSlotCardProps> = ({ elem, fn }) => {

    // const [hours, setHour] = useState<string>("")

    function getHours(begin: string, end: string): string {
        let result = "";
    
        const [hourBegin, minutesBegin] = begin.split(":").map(Number);
        const [hourEnd, minutesEnd] = end.split(":").map(Number);
    
        // Проверяем, если end находится в следующем дне
        if (hourEnd < hourBegin || (hourEnd === hourBegin && minutesEnd < minutesBegin)) {
            // Добавляем 24 часа к hourEnd
            result = ((((hourEnd + 24) - hourBegin) * 60 + (minutesEnd - minutesBegin)) / 60).toString();
        } else {
            result = (((hourEnd - hourBegin) * 60 + (minutesEnd - minutesBegin)) / 60).toString();
        }
    
        // Добавляем правильные окончания для часов
        switch (result.at(-1)) {
            case "1":
                {
                    result += " час";
                    break;
                }
            case "2":
            case "3":
            case "4":
                {
                    if (result.length > 1) {
                        result += " часов";
                    } else {
                        result += " часа";
                    }
                    break;
                }
            default:
                {
                    result += " часов";
                    break;
                }
        }
    
        return result;
    }

  return (

    elem.available === 1 ? (
        
        <div className='slot'>
            <div className='slot_title'>
                <p>ТТ: {elem.locations?.name || 'Неизвестно'}</p>
                <div className='slot_title_extra'> <img src="/star-orange.png" alt="Logo" /> </div>
            </div>
            <div className='slot_info'>Предоставляемая услуга: {elem.jobTitles.name} </div>
            <div className='slot_info slot_info_date'>
                Дата и время слота: 
                <p>
                    {
                        elem.begin ? 
                        elem.begin.split("T")[0].split("-")[2] + "-" + elem.begin.split("T")[0].split("-")[1] + "-" + elem.begin.split("T")[0].split("-")[0] :
                        'Не указана'
                    }
                </p>
                в
                <p>
                    {elem.begin.split("T")[1].slice(0, 5)} - {elem.end.split("T")[1].slice(0, 5)}
                    
                    {" (~" + getHours(elem.begin.split("T")[1].slice(0, 5), elem.end.split("T")[1].slice(0, 5)) + ")"}
                </p>
            </div>
            <div className='slot_info slot_bottom'>

                <div className='slot_price'>
                    <p>
                    ~ {parseFloat(getHours(elem.begin?.split("T")[1].slice(0, 5) || '00:00', elem.end?.split("T")[1].slice(0, 5) || '00:00')) * 210} рублей/слот
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
                  <div className='slot_info'>Предоставляемая услуга: {elem.jobTitles.name} </div>
            <div className='slot_info slot_info_date'>
                Дата и время слота:
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
                        {((new Date(elem.end).getTime() - new Date(elem.begin).getTime()) / (1000 * 60 * 60)) * 210} рублей/слот 
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