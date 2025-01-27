import React, { useState } from 'react';
import css from './UserBarPopover.module.css';
import { TbSettings } from 'react-icons/tb';
import { LuLogOut } from 'react-icons/lu';
import Modal from '../../components/Modal/Modal';
import UserSettingsModal from '../../components/UserSettingsModal/UserSettingsModal';
import LogOutModal from '../../components/LogOutModal/LogOutModal';

const UserBarPopover = () => {
  const [modalType, setModalType] = useState(null);

  const handleOpenModal = type => {
    setModalType(type);
  };

  const handleCloseModal = () => {
    setModalType(null);
  };

  return (
    <div className={css.popoverBlock}>
      <button
        type="button"
        className={`${css.popoverBtn}`}
        onClick={() => handleOpenModal('settings')}
      >
        <TbSettings className={css.settingsIcon} />
        Settings
      </button>

      <button
        type="button"
        className={`${css.popoverBtn}`}
        onClick={() => handleOpenModal('logout')}
      >
        <LuLogOut />
        Log out
      </button>

      {modalType === 'settings' && (
        <Modal isOpen={true} onClose={handleCloseModal}>
          <UserSettingsModal />
        </Modal>
      )}

      {modalType === 'logout' && (
        <Modal isOpen={true} onClose={handleCloseModal}>
          <LogOutModal closeModal={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
};

export default UserBarPopover;
