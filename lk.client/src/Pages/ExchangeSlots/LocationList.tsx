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

      <div className="ExchangeLocations_InputSearchContainer">
        
        <div className="ExchangeLocations_InputIcon">
          <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.7619 17.176C14.3146 18.3183 12.4869 19 10.5 19C5.80558 19 2 15.1944 2 10.5C2 5.80558 5.80558 2 10.5 2C15.1944 2 19 5.80558 19 10.5C19 12.4868 18.3183 14.3145 17.1761 15.7618L22.0032 20.5889L20.589 22.0031L15.7619 17.176ZM17 10.5C17 14.0899 14.0899 17 10.5 17C6.91015 17 4 14.0899 4 10.5C4 6.91015 6.91015 4 10.5 4C14.0899 4 17 6.91015 17 10.5Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>

        <div className="ExchangeLocations_InputField">
          <input
            type="text"
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Название точки"
            autoComplete="off"
          />
        </div>

      </div>

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
        <div className='ExchangeCards_emptyList'>
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 80 96">
            <path fill="#EEE" fillRule="nonzero" d="M68.734 27.838l4.3-5.047a1.19 1.19 0 0 0-.135-1.677l-4.111-3.507a1.196 1.196 0 0 0-.868-.282 1.2 1.2 0 0 0-.812.415l-4.31 5.055a39.762 39.762 0 0 0-18.723-6.929v-6.82h8.174a1.19 1.19 0 0 0 1.19-1.192V1.191A1.19 1.19 0 0 0 52.25 0H27.751a1.19 1.19 0 0 0-1.19 1.19v6.667c0 .658.532 1.19 1.19 1.19h8.173v6.821A39.766 39.766 0 0 0 17.2 22.797l-4.31-5.055a1.189 1.189 0 0 0-1.678-.133l-4.115 3.507a1.19 1.19 0 0 0-.132 1.677l4.3 5.047C4.294 35.037 0 44.848 0 55.664c0 22.09 17.909 40 40 40 22.09 0 40-17.91 40-40 0-10.816-4.294-20.627-11.266-27.826zm3.093 27.814H41.209a1.209 1.209 0 0 1-1.208-1.208V23.827c0-.668.54-1.209 1.208-1.209 17.549 0 31.824 14.278 31.824 31.827a1.208 1.208 0 0 1-1.206 1.207z"></path>
          </svg>

          <p className='emptyList_p'>Все смены забронированы</p>

          <p>Ожидайте поступление новых слотов</p>

        </div>
      )}
    </div>
  );
};

export default LocationList;
