import React from 'react';
import { useDispatch } from 'react-redux';
import WaterForm from '../WaterForm/WaterForm';
import { createVolume, updateVolume } from '../../redux/water/operations'; // Убедитесь, что эти импорты корректны

const WaterModal = ({ onClose, operationType, editData }) => {
  const dispatch = useDispatch();

  const title = operationType === 'edit' ? 'Edit the entered amount of water' : 'Add water';

  const handleFormSubmit = async (data) => {
    try {
      // Определяем действие на основе типа операции
      const action = operationType === 'edit' ? updateVolume : createVolume;

      // Диспатчим действие с данными
      await dispatch(action(data)).unwrap();

      // Закрываем модальное окно после успешного добавления или обновления
      onClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>{title}</h2>
      <WaterForm
        mode={operationType}
        onClose={onClose}
        initialData={editData}
        onSubmit={handleFormSubmit} // Передаем handleFormSubmit в WaterForm
      />
    </div>
  );
};

export default WaterModal;
