import React, { useEffect, useRef, useState } from 'react';
import css from './WaterList.module.css';
import WaterItem from '../../components/WaterItem/WaterItem';
import Modal from '../../components/Modal/Modal';
import WaterModal from '../../components/WaterModal/WaterModal';
import DeleteWaterModal from '../../components/DeleteWaterModal/DeleteWaterModal';
import { useDispatch, useSelector } from 'react-redux';
import { selectWaterConsumption } from '../../redux/water/selectors';
import { format } from 'date-fns';
import { fetchWaterConsumptionForDay } from '../../redux/water/operations';
import { selectUser } from '../../redux/auth/selectors';

const WaterList = ({ selectedDate }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const volumes = useSelector(selectWaterConsumption);
  const date = format(selectedDate, 'yyyy-MM-dd');
  const listRef = useRef(null);

  useEffect(() => {
    dispatch(fetchWaterConsumptionForDay(date));
    toggleScrollbar();
  }, [volumes.day, selectedDate]);

  const handleOpenEditModal = (volume, time, id) => {
    setEditData({ volume, time, id });
    setModalOpen(true);
  };

  const handleOpenDeleteModal = id => {
    setDeleteId(id);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setDeleteId(null);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditData(null);
  };

  const handleOpenAddModal = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const toggleScrollbar = () => {
    if (listRef.current) {
      if (listRef.current.scrollHeight > listRef.current.clientHeight) {
        listRef.current.style.overflowY = 'auto';
      } else {
        listRef.current.style.overflowY = 'hidden';
      }
    }
  };

  return (
    <div>
      <ul ref={listRef} className={css.list}>
        {volumes?.day?.length === 0 || volumes?.day === null ? (
          <li>No water consumption data found.</li>
        ) : (
          volumes?.day?.map(({ _id, volume, time }) => (
            <li key={_id} className={css.item}>
              <WaterItem
                volume={volume}
                time={time}
                id={_id}
                onEdit={handleOpenEditModal}
                onDelete={() => handleOpenDeleteModal(_id)}
              />
            </li>
          ))
        )}
      </ul>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <WaterModal
            operationType={editData ? 'edit' : 'add'}
            onClose={handleCloseModal}
            editData={editData}
          />
        </Modal>
      )}
      {isDeleteModalOpen && (
        <Modal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
          <DeleteWaterModal
            modalIsOpen={isDeleteModalOpen}
            closeModal={handleCloseDeleteModal}
            waterId={deleteId}
          />
        </Modal>
      )}
    </div>
  );
};

export default WaterList;
