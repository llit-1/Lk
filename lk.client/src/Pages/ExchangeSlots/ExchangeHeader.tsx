import React from 'react';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

interface ExchangeHeaderProps {
  buttonText: string;
  onButtonClick: () => void;
  selectFilter: string;
  onFilterChange: (value: string) => void;
}

const ExchangeHeader: React.FC<ExchangeHeaderProps> = ({ buttonText, onButtonClick, selectFilter, onFilterChange }) => {

  const filterChangeHandler = (e: string) => {
    onFilterChange(e)
  }


  return (
    <div className="ExchangeHeader">
      <button className='ExchangeHeader_Button' onClick={onButtonClick}> 
        {buttonText} 
      </button>
      <Select
        className='ExchangeHeader_SelectFilters'
        id="filter-select"
        value={selectFilter}
        onChange={(e) => filterChangeHandler(e.target.value)}
      >
        <MenuItem value="0">По стоимости</MenuItem>
        <MenuItem value="1">По дате</MenuItem>
      </Select>
    </div>
  );
};

export default ExchangeHeader;
