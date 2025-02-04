import AddWaterBtn from '../../components/AddWaterBtn/AddWaterBtn';
import ChooseDate from '../../components/ChooseDate/ChooseDate';
import WaterList from '../../components/WaterList/WaterList';
import css from './DailyInfo.module.css';
import React, { useState } from 'react';
import ModalSmall from '../../components/ModalSmall/ModalSmall';
import WaterModal from '../../components/WaterModal/WaterModal';

const DailyInfo = ({ selectedDate }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={`${css.dailyInfo} dailyInfo`}>
      <div className={css.wrapper}>
        <ChooseDate selectedDate={selectedDate} />
        <AddWaterBtn variant="secondary" onClick={handleOpenModal} />
      </div>
      <WaterList selectedDate={selectedDate} />

      {isModalOpen && (
        <ModalSmall isOpen={isModalOpen} onClose={handleCloseModal}>
          <WaterModal operationType="add" onClose={handleCloseModal} />
        </ModalSmall>
      )}
    </div>
  );
};

export default DailyInfo;
