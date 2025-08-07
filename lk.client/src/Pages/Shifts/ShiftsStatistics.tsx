interface ShiftsStatisticsProps {
  completedSheets: number
  cancelledSheets: number
  houseWorked: number
}

export const ShiftsStatistics : React.FC<ShiftsStatisticsProps> = ({completedSheets, cancelledSheets, houseWorked}) => {

    console.log(houseWorked)

  return (
    <div className="shiftWrapper_statistic">
      <div>
        <span className="shiftWrapper_statistic_label">Выполненные слоты:</span>
        <span className="shiftWrapper_statistic_value">{completedSheets}</span>
      </div>
      <div>
        <span className="shiftWrapper_statistic_label">Отмененные слоты:</span>
        <span className="shiftWrapper_statistic_value">{cancelledSheets}</span>
      </div>
      {/*<div>*/}
      {/*  <span className="shiftWrapper_statistic_label">Часов в исполнении:</span>*/}
      {/*  <span className="shiftWrapper_statistic_value">{houseWorked}</span>*/}
      {/*</div>*/}
    </div>
  );
}
  
  
  
  
  