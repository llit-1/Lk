const DatePicker = ({ date, setDate }: { date: string; setDate: (date: string) => void }) => (
    <div className="shiftWrapper_pickDate">
      <div className="pickDate_month">
        <label>Месяц</label>
        <input type="month" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
    </div>
  );
  
  export default DatePicker;
  