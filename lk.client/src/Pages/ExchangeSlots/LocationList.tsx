import React from 'react';
import { ExchangeSlot } from "../../interfaces/ExchangeSlot";

interface LocationListProps {
  uniqueLocations: ExchangeSlot[];
  pickedLocation: string[];
  onLocationChange: (guid: string) => void;
  onSearchChange: (search: string) => void;
}

const LocationList: React.FC<LocationListProps> = ({ uniqueLocations, pickedLocation, onLocationChange, onSearchChange }) => {
  return (
    <div className='ExchangeLocations'>
      <input 
        className='ExchangeLocations_InputSearch' 
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder='Введите название точки'
      />
      {uniqueLocations.length !== 0 ? (
        uniqueLocations.map((elem) => (
          <div key={elem.id} className='ExchangeLocations_Card'> 
            <label htmlFor={elem.locations.guid}>{elem.locations.name}</label>
            <input 
              id={elem.locations.guid} 
              type='checkbox' 
              onChange={() => onLocationChange(elem.locations.guid)} 
              checked={pickedLocation.includes(elem.locations.guid)}
            />
          </div>
        ))
      ) : (
        <p className='nullSlots'>К сожалению, доступных слотов сейчас нет :(</p>
      )}
    </div>
  );
};

export default LocationList;
