import React, { useState } from 'react';
import { Image } from 'cloudinary-react';
import css from './UserBar.module.css';
import UserBarPopover from '../../components/UserBarPopover/UserBarPopover';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors.js';

const UserBar = () => {
  const user = useSelector(selectUser);
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(prevActiveState => !prevActiveState);
  };

  return (
    <div className={`${css.userBar} userBar`}>
      <button type="button" className={css.userBtn} onClick={handleToggle}>
        <span className={css.userBtnName}>{user.name}</span>
        <Image
          className={css.avatarImage}
          cloudName="dwyxffoux"
          publicId="nvtxl4guwbr4a3atayvr"
          crop="scale"
          radius="max"
        />
        {isActive ? (
          <IoIosArrowUp className={css.arrowIcon} />
        ) : (
          <IoIosArrowDown className={css.arrowIcon} />
        )}
      </button>

      {isActive ? <UserBarPopover /> : <></>}
    </div>
  );
};

export default UserBar;
