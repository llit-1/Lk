import React from 'react';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import EditLocationIcon from '@mui/icons-material/EditLocation';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

interface ExchangeHeaderProps {
  buttonText: boolean;
  onButtonClick: () => void;
  selectFilter: string;
  onFilterChange: (value: string) => void;
}

const ExchangeHeader: React.FC<ExchangeHeaderProps> = ({ buttonText, onButtonClick, selectFilter, onFilterChange }) => {
  const filterChangeHandler = (e: string) => {
    onFilterChange(e);
  };

  return (
    <div className="ExchangeHeader">
      <button className='ExchangeHeader_Button' onClick={onButtonClick}> 
        {buttonText ? <EditLocationIcon /> : <ArrowBackIosIcon sx={{paddingLeft: "5px"}}/>} 
      </button>

      {buttonText &&
        <Select
          sx={{height: "50px"}}
          className='ExchangeHeader_SelectFilters'
          id="filter-select"
          value={selectFilter}
          variant="standard"
          onChange={(e) => filterChangeHandler(e.target.value)}
        >
          <MenuItem value="0">По стоимости</MenuItem>
          <MenuItem value="1">По дате</MenuItem>
        </Select>
      }

    </div>
  );
};

export default ExchangeHeader;


