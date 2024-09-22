import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import css from './TrackerPage.module.css';
import React, { useEffect } from 'react';
import { selectUser } from '../../redux/auth/selectors.js';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const TrackerPage = () => {
  const selector = useSelector(selectUser);
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(selector.email);
    if (!selector.email) {
      navigate('/');
    }
  }, [selector, navigate]);
  return (
    <div className={css.container}>
      <WaterMainInfo />
      <WaterDetailedInfo />
    </div>
  );
};

export default TrackerPage;
