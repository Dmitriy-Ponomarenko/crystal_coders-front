import React, { useEffect } from 'react';
import Calendar from '../../components/Calendar/Calendar';
import CalendarPagination from '../../components/CalendarPagination/CalendarPagination';
import { addMonths, subMonths } from 'date-fns';
import css from './MonthInfo.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchRemainingWaterPercentage,
  fetchWaterConsumptionForMonth,
} from '../../redux/water/operations';

const MonthInfo = ({ selectedDate, setSelectedDate }) => {
  const dispatch = useDispatch();
  // !! Check how to get data about percentage of the water
  const {waterConsumption, loading, error, remainingPercentage} = useSelector(state => state.water);
  useEffect(() => {
    if (selectedDate) {
      const month = selectedDate.getMonth() + 1;
      dispatch(fetchWaterConsumptionForMonth(month));
      dispatch(fetchRemainingWaterPercentage({date: selectedDate.toISOString().split('T')[0]}))
    }
  }, [selectedDate, dispatch]);

  // !! Check the part above

  const nextMonth = () => {
    setSelectedDate(prevDate => addMonths(prevDate, 1));
  };

  const previousMonth = () => {
    setSelectedDate(prevDate => subMonths(prevDate, 1));
  };

  return (
    <div className={`${css.monthlyInfo} monthlyInfo`}>
      <div className={css.monthWrapper}>
        <p className={css.monthName}>Month</p>
        <CalendarPagination
          selectedDate={selectedDate}
          previousMonth={previousMonth}
          nextMonth={nextMonth}
        />
      </div>
      <Calendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        waterData={{waterConsumption, remainingPercentage}}
      />
    </div>
  );
};

export default MonthInfo;
