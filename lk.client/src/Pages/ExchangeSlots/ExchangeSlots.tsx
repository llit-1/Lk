import { useState, useEffect } from 'react';
import { getWorkingSlots } from "../Requests";
import { ExchangeSlot } from "../../interfaces/ExchangeSlot";
import ExchangeSlotsModal from './ExchangeSlotsModal';
import ExchangeHeader from './ExchangeHeader';
import LocationList from './LocationList';
import ExchangeSlotList from './ExchangeSlotList';
import "./ExchangeSlots.css";

const ExchangeSlots = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [exchangeSlot, setExchangeSlot] = useState<ExchangeSlot[]>([]);
  const [stockExchangeSlot, setStockExchangeSlot] = useState<ExchangeSlot[]>([]);
  const [buttonText, setButtonText] = useState<boolean>(true);
  const [viewLocation, setViewLocation] = useState<boolean>(false);
  const [buttonActionSaveLocation, setButtonActionSaveLocation] = useState<boolean>(false);
  const [pickedLocation, setPickedLocation] = useState<string[]>([]);
  const [uniqueLocations, setUniqueLocations] = useState<ExchangeSlot[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedSlot, setSelectedSlot] = useState<ExchangeSlot | null>(null);
  const [loadingModal, setLoadingModal] = useState<boolean>(false);
  const [isBooked, setIsBooked] = useState<boolean | null>(null);
  const [selectFilter, setSelectFilter] = useState<string>("0");

  const resetBookingStatus = () => setIsBooked(null);

  const handleOpen = () => {
    setOpen(true);
    resetBookingStatus();
  };

  const handleClose = () => {
    setOpen(false);
    resetBookingStatus();
  };

  const getData = async () => {
    const data = await getWorkingSlots();
    const sortedData = data.sort((a, b) => (a.locations.name > b.locations.name ? 1 : -1));
    setStockExchangeSlot(sortedData);
    setExchangeSlot(sortedData);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleTakeSlot = (elem: ExchangeSlot) => {
    setSelectedSlot(elem);
    handleOpen();
  };

  const getTTList = () => {
    if (buttonActionSaveLocation) {
      setLoading(true);
      setViewLocation(false);
      setButtonText(true);
      setExchangeSlot(
        pickedLocation.length === 0
          ? stockExchangeSlot
          : stockExchangeSlot.filter(x => pickedLocation.includes(x.locations.guid))
      );
      setButtonActionSaveLocation(false);
      setLoading(false);
    } else {
      setUniqueLocations(Array.from(new Map(stockExchangeSlot.map((item) => [item.locations.guid, item])).values()));
      setViewLocation(true);
      setButtonText(false);
      setButtonActionSaveLocation(true);
    }
  };

  const handleLocationChange = (guid: string) => {
    setPickedLocation((prev) =>
      prev.includes(guid) ? prev.filter((id) => id !== guid) : [...prev, guid]
    );
  };

  return (
    <div className='ExchangeWrapper'>
      <ExchangeHeader 
        buttonText={buttonText} 
        onButtonClick={getTTList} 
        selectFilter={selectFilter} 
        onFilterChange={setSelectFilter} 
      />

      {viewLocation ? (
        <LocationList 
          uniqueLocations={uniqueLocations} 
          pickedLocation={pickedLocation} 
          onLocationChange={handleLocationChange} 
          onSearchChange={(search) => setUniqueLocations(
            stockExchangeSlot.filter(x => x.locations.name.toLowerCase().includes(search.toLowerCase()))
          )}
        />
      ) : (
        <ExchangeSlotList 
          loading={loading} 
          exchangeSlot={exchangeSlot} 
          onSlotClick={handleTakeSlot} 
        />
      )}

      <ExchangeSlotsModal
        open={open}
        handleClose={handleClose}
        selectedSlot={selectedSlot}
        loadingModal={loadingModal}
        setLoadingModal={setLoadingModal}
        getData={getData}
        isBooked={isBooked}
        setIsBooked={setIsBooked}
      />
    </div>
  );
};

export default ExchangeSlots;
