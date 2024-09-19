import Modal from '../Modal/Modal';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import css from './LogOutModal.module.css';

const LogOutModal = ({ modalIsOpen, closeModal }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logOut());
  };

  const colorBtnClass = clsx(css.btn, css.colorBtn);

  const transparentBtnClass = clsx(css.btn, css.transparentBtn);

  return (
    <Modal modalIsOpen={modalIsOpen} closeModal={closeModal}>
      <div className={css.modalBox}>
        <h3 className={css.modalTitle}>Log out</h3>
        <p className={css.modalText}>Do you really want to leave?</p>
        <div className={css.btnBox}>
          <button className={colorBtnClass} onClick={handleClick}>
            Log out
          </button>
          <button className={transparentBtnClass} onClick={() => closeModal()}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LogOutModal;