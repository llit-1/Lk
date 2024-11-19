import { useEffect, useState } from 'react';
import './Shifts.css';
// import ShiftsModal from "./ShiftsModal";
import {ShiftsStatistics} from "./ShiftsStatistics";
import ShiftTable from "./ShiftTable";
import ShiftCardList from "./ShiftCardList";
import HistoryButton from "./HistoryButton";
import { getFutureUserSheets, getPastUserSheets, getStatistic } from "../Requests";
import { FutureSlots } from "../../interfaces/FutureSlots";

const Shifts = () => {
  
  const [isTable, setIsTable] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [widthWindow, setWidthWindow] = useState<number>(window.innerWidth);
  const [array, setArray] = useState<FutureSlots[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [date, setDate] = useState<string>(new Date().toISOString().substring(0, 7));

  const [buttonColor, setButtonColor] = useState<string>("#DEDEDE")

  const [completedSheets, setCompletedSheets] = useState<number>(0)
  const [cancelledSheets, setCancelledSheets] = useState<number>(0)
  const [houseWorked, setHouseWorked] = useState<number>(0)

  const fetchPastSlots = async (selectedDate: string) => {
    setIsLoaded(true);
    try {
      const year = selectedDate.split("-")[0];
      const month = selectedDate.split("-")[1];
      const dataPast = await getPastUserSheets(year, month);
      if (typeof dataPast === "number") {
        console.error("Ошибка при получении данных:", dataPast);
      } else {
        setArray([...dataPast]);
      }
    } finally {
      setIsLoaded(false);
      setButtonColor("#F47920")
    }
  };

  const fetchData = async () => {
    setArray([]);
    setButtonColor("#DEDEDE")
    const dataFuture = await getFutureUserSheets();
    if (typeof dataFuture === "number") {
      console.error("Ошибка при получении данных:", dataFuture);
    } else if (dataFuture.length > 0) {
      setArray(dataFuture);
    } 
  };

  const fetchStatistic = async () => {
    const year = date.split("-")[0];
    const month = date.split("-")[1];

    const result = await getStatistic(year, month)
    
    if(typeof result !== "number")
    {
      setCompletedSheets(result.completedSheets)
      setCancelledSheets(result.cancelledSheets)
      setHouseWorked(result.houseWorked)
    }
  }

  const onClickHandler = () => {
    if(buttonColor === "#DEDEDE")
    {
      fetchPastSlots(date)
    } else {
      fetchData()
    }
  }

  useEffect(() => {
    fetchData();
    fetchStatistic();

      const handleResize = () => {
      console.log(widthWindow)
      setWidthWindow(window.innerWidth);
      setIsTable(window.innerWidth >= 1200);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  useEffect(() => {
    fetchStatistic();
  }, [date])

  const dateChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setDate(newDate);
  
    const currentMonth = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`;

    if (newDate === currentMonth) {
      fetchData();
    } else {
      setArray([]);
      fetchPastSlots(newDate);
    }
  };
  

  return (
    <div className="shiftWrapper">
      <ShiftsStatistics completedSheets={completedSheets} cancelledSheets={cancelledSheets} houseWorked={houseWorked} />

      <div className="pickDate_month">
        <input type="month" value={date} onChange={(e) => dateChanger(e)} />
      </div>

      <HistoryButton isLoaded={isLoaded} color={buttonColor} onClick={() => onClickHandler()} />

      <div className="shiftWrapper_shiftList">
        {isTable ? <ShiftTable data={array} fetchData={fetchData} fetchStatistic={fetchStatistic} /> : <ShiftCardList data={array} fetchData={fetchData} fetchStatistic={fetchStatistic} />}
      </div>
      
      {/* <ShiftsModal open={modalOpen} handleClose={() => setModalOpen(false)} date={date} setDate={setDate}/> */}
    </div>
  );
};

export default Shifts;
