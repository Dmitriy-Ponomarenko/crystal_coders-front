import React, { useEffect } from 'react';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import AddWaterBtn from '../../components/AddWaterBtn/AddWaterBtn';
import css from './TrackerPage.module.css';
import { useTour } from '@reactour/tour';
import { steps } from '../../components/steps';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';

// import { useRestoreHome } from '../../redux/utils/returnHomePage.jsx';

const TrackerPage = () => {
  const { setIsOpen, setSteps } = useTour();

  // const restoreHome = useRestoreHome();

  // useEffect(() => {
  //   restoreHome();
  // }, [restoreHome]);

  return (
    <div className={css.container}>
      <WaterMainInfo />
      <WaterDetailedInfo />
    </div>
  );
};

export default TrackerPage;
