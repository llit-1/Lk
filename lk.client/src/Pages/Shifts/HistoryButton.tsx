import { CircularProgress } from "@mui/material";

const HistoryButton = ({ isLoaded, onClick, color }: { isLoaded: boolean; onClick: () => void, color: string}) => (
  color == "#DEDEDE" ? (
    <div className="shiftList_buttonAdd_wrapper">
      <div className="shiftList_Card shiftList_Card_buttonAdd" style={{backgroundColor: color, color: "#676767"}} onClick={onClick}>
        {!isLoaded ? "Показать завершенные смены" : <CircularProgress sx={{ color: "#F47920" }} size={18} />}
      </div>
    </div>
  ) : (
    <div className="shiftList_buttonAdd_wrapper">
      <div className="shiftList_Card shiftList_Card_buttonAdd" style={{backgroundColor: color}} onClick={onClick}>
        {!isLoaded ? "Показать текущие смены" : <CircularProgress sx={{ color: "white" }} size={18} />}
      </div>
    </div>
  )
  
);

export default HistoryButton;
