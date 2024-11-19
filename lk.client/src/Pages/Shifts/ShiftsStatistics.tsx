interface ShiftsStatisticsProps {
  completedSheets: number
  cancelledSheets: number
  houseWorked: number
}

export const ShiftsStatistics : React.FC<ShiftsStatisticsProps> = ({completedSheets, cancelledSheets, houseWorked}) => {

  return (
    <div className="shiftWrapper_statistic">
      <div>
        <span className="shiftWrapper_statistic_label">Выполненные смены:</span>
        <span className="shiftWrapper_statistic_value">{completedSheets}</span>
      </div>
      <div>
        <span className="shiftWrapper_statistic_label">Отмененные смены:</span>
        <span className="shiftWrapper_statistic_value">{cancelledSheets}</span>
      </div>
      <div>
        <span className="shiftWrapper_statistic_label">Отработано часов:</span>
        <span className="shiftWrapper_statistic_value">{houseWorked}</span>
      </div>
    </div>
  );
}
  
  
  
  
  