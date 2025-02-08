import React, { useMemo, useState } from 'react';
import { getDaysInMonth } from 'date-fns';
import CalendarItem from '../../components/CalendarItem/CalendarItem';
import css from './Calendar.module.css';

const Calendar = ({ selectedDate, setSelectedDate, waterData = [] }) => {
  const [selectedDay, setSelectedDay] = useState(null); // State for selected day

  const daysInMonth = getDaysInMonth(selectedDate);

  const getWaterPercentageForDay = day => {
    const date = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      day
    );
    const dateString = date.toISOString().split('T')[0];

    const waterEntry = waterData.find(entry => entry.date === dateString);
    return waterEntry ? waterEntry.consumedPercentage || 0 : 0;
  };

  const handleDayClick = day => {
    setSelectedDay(day);
    const date = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      day
    );
    setSelectedDate(date);
  };

  const daysArray = useMemo(
    () => Array.from({ length: daysInMonth }, (_, index) => index + 1),
    [daysInMonth]
  );

  return (
    <ul className={css.listDays}>
      {daysArray.map(day => (
        <li key={day}>
          <CalendarItem
            day={day}
            waterPercentage={getWaterPercentageForDay(day)}
            handleDayClick={handleDayClick}
            isSelected={selectedDay === day}
          />
        </li>
      ))}
    </ul>
  );
};

export default Calendar;
