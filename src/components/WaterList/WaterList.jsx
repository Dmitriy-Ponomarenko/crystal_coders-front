import React, { useEffect, useState } from 'react';
import css from './WaterList.module.css';
import WaterItem from '../../components/WaterItem/WaterItem';
import Modal from '../../components/Modal/Modal';
import WaterModal from '../../components/WaterModal/WaterModal';
import DeleteWaterModal from '../../components/DeleteWaterModal/DeleteWaterModal';
import axios from 'axios';

const WaterList = ({ userId }) => {
  const [waterData, setWaterData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchWaterData = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      const response = await axios.get('https://crystal-coders-back.onrender.com/water', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const fetchedData = response.data.data.data || [];
      setWaterData(fetchedData);
    } catch (error) {
      console.error('Error fetching water consumption data:', error.response ? error.response.data : error);
    }
  };

  useEffect(() => {
    fetchWaterData();
  }, [userId]);

  const handleOpenEditModal = (volume, time) => {
    setEditData({ volume, time });
    setModalOpen(true);
  };

  const handleOpenDeleteModal = (id) => {
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

  return (
    <div>
      <ul className={css.list}>
        {waterData.length === 0 ? (
          <li>No water consumption data found.</li>
        ) : (
          waterData.map(({ _id, volume, time }) => (
            <li key={_id} className={css.item}>
              <WaterItem volume={volume} time={time} onEdit={handleOpenEditModal} onDelete={() => handleOpenDeleteModal(_id)} />
            </li>
          ))
        )}
      </ul>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <WaterModal operationType="edit" onClose={handleCloseModal} editData={editData} />
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
