import React from 'react';
import css from './CalendarItem.module.css';

const CalendarItem = ({ day, handleDayClick, waterPercentage, isSelected }) => {
  const getButtonStyle = () => {
    if (isSelected) {
      return {
        backgroundColor: 'var(--dark-blue)',
        color: 'var(--light-green)',
      };
    } else if (waterPercentage === 0) {
      return { backgroundColor: '#fff' };
    } else if (waterPercentage < 100) {
      return { backgroundColor: 'rgba(50, 63, 71, 0.20)' };
    } else {
      return { backgroundColor: '#fff' };
    }
  };

  return (
    <div className={css.itemContainer}>
      <button
        style={getButtonStyle()}
        onClick={() => handleDayClick(day)}
        className={css.btnDay}
      >
        {day}
      </button>
      <p className={css.waterPercentage}>{waterPercentage}%</p>
    </div>
  );
};

export default CalendarItem;
