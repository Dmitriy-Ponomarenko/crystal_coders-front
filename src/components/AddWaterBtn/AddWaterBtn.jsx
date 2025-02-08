import React from 'react';
import css from './AddWaterBtn.module.css';
import { GoPlus } from 'react-icons/go';
import { useDispatch } from 'react-redux';

const AddWaterBtn = ({ variant, onClick }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(deleteVolume(waterId))
      .unwrap()
      .then(() => {
        toast.success('Successfully deleted!');
        closeModal();
      })
      .catch(error => {
        toast.error('Error deleting entry!');
      });
  };

  const styleBtn =
    variant === 'primary'
      ? `${css.addWaterBtnMainInfo} addWaterBtnMainInfo` // added a global class here for the tour
      : `${css.addWaterBtnDetailedInfo} addWaterBtnDetailedInfo`; // added a global class for the tour

  const styleIcon =
    variant === 'primary' ? css.iconPrimaryBtn : css.iconSecondaryBtn;

  return (
    <button type="button" className={styleBtn} onClick={onClick}>
      <div className={styleIcon}>
        <GoPlus size={19} />
      </div>
      Add water
    </button>
  );
};

export default AddWaterBtn;
