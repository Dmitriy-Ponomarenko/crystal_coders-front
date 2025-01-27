import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import './Modal.module.css';
import { RxCross2 } from 'react-icons/rx';
import { t } from 'i18next';

const Modal = ({ isOpen, onClose, children, size }) => {
  const [modalWidth, setModalWidth] = useState(size || '343px');

  useEffect(() => {
    if (size) return;

    const updateModalSize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1440) {
        setModalWidth('920px');
      } else if (screenWidth >= 768) {
        setModalWidth('768px');
      } else {
        setModalWidth('375px');
      }
    };

    updateModalSize();
    window.addEventListener('resize', updateModalSize);
    return () => window.removeEventListener('resize', updateModalSize);
  }, [size]);

  useEffect(() => {
    const handleEsc = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalBackdropStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(47, 47, 47, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    zIndex: 1000,
    // overflowY: 'auto',
    paddingTop: '64px',
  };

  const modalContentStyle = {
    background: 'var(--white)',
    padding: '40px',
    borderRadius: '15px',
    position: 'relative',
    maxWidth: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
  };

  const modalCloseButtonStyle = {
    position: 'sticky',
    top: '0',
    left: '100%',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    width: '28px',
    height: '28px',
    transition: 'background-color var(--animation), color var(--animation)',
  };

  // const scrollContainerStyle = {
  //   borderRadius: '30px',
  //   background: 'var(--Background, #F0EFF4)',
  //   position: 'absolute',
  //   right: '16px',
  //   top: '266px',
  //   width: '16px',
  //   height: 'calc(100% - 266px)',
  //   overflowY: 'auto',
  //   scrollbarWidth: 'thin',
  // };

  return ReactDOM.createPortal(
    <div style={modalBackdropStyle} onClick={handleBackdropClick}>
      <div style={modalContentStyle}>
        <button style={modalCloseButtonStyle} onClick={onClose}>
          <RxCross2 size={28} color="black" />
        </button>
        {/* <div style={scrollContainerStyle}> */}
        <div>{children}</div>
        {/* </div> */}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
