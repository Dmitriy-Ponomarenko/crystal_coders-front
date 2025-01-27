import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CSS from './UserSettingsForm.module.css';
import UserSettingsDailyNormaInfo from '../UserSettingsDailyNormaInfo/UserSettingsDailyNormaInfo';
import { Image } from 'cloudinary-react';
import { FiUpload } from 'react-icons/fi';
import { userSchema, validateInput } from './userSettingsFormValidation';
import { yupResolver } from '@hookform/resolvers/yup';

import { useDispatch, useSelector } from 'react-redux';
import { updateUsersSettings } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';
// import { Toast } from 'react-hot-toast';

const UserSettingsForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
    mode: 'onChange',
    defaultValues: {
      gender: user?.gender === 'male' ? 'male' : 'female',
      name: user?.name || 'User',
      email: user?.email || '',
      weight: user?.weight || 0,
      time: user?.sportActiveTime || 0,
      liters: user?.dailyWater || 2,
    },
  });

  const isVerified = user?.isVerified;
  const [gender, setGender] = useState(watch('gender'));

  // Update gender state when the value changes
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'gender') {
        setGender(value.gender);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // Handling avatar upload
  const uploadToCloudinary = event => {
    const file = event.target.files[0];
    if (file) {
      // Assuming that you will use a Cloudinary upload method, integrate it here
      console.log('File selected for upload:', file);
      // Example:
      // cloudinary.v2.uploader.upload(file, { upload_preset: "my_preset" }, (error, result) => {
      //   console.log(result, error);
      // });
    }
  };

  // Validate input value on blur
  const validateInputValue = async evt => {
    const key = evt.target.name;
    const value = evt.target.value;
    try {
      await validateInput(key, value);
      console.log('Valid value:', value);
    } catch (err) {
      console.error('Validation error:', err.message);
    }
  };

  // Calculate recommended water intake
  const calculateLiters = () => {
    const weight = watch('weight');
    const time = watch('time');

    if (weight && time) {
      let volume =
        gender === 'female'
          ? weight * 0.03 + time * 0.4
          : weight * 0.04 + time * 0.6;
      return volume.toFixed(1);
    }
    return '0.0';
  };

  return (
    <div className={CSS.formContainer}>
      <form
        className={CSS.settingsForm}
        onSubmit={handleSubmit(data => {
          console.log(data);
          const { time, liters, email, ...body } = data;
          dispatch(
            updateUsersSettings({
              ...body,
              sportActiveTime: time,
              dailyWater: liters,
            })
          );
        })}
      >
        <div className={CSS.avatarBlock}>
          <Image
            className={`${CSS.avatarImage} avatarImage`}
            cloudName="dwyxffoux"
            publicId="nvtxl4guwbr4a3atayvr"
            crop="scale"
          />
          <label htmlFor="avatar" className={CSS.uploadTitle}>
            <FiUpload className={CSS.uploadIcon} />
            Upload a photo
            <input
              className={CSS.uploadTitleInput}
              type="file"
              name="avatar"
              id="avatar"
              accept="image/png, image/jpeg"
              onChange={uploadToCloudinary}
            />
          </label>
        </div>

        <div className={CSS.genderBlockWrapper}>
          <span className={CSS.boldInputLabel}>Your gender identity</span>
          <span className={CSS.radioBtnWrapper}>
            <label htmlFor="female" className={CSS.radioLabel}>
              <input
                className={CSS.radioBtn}
                type="radio"
                id="female"
                value="female"
                {...register('gender')}
              />
              <span className={CSS.customRadioBtn}></span>
              Woman
            </label>

            <label htmlFor="male" className={CSS.radioLabel}>
              <input
                className={CSS.radioBtn}
                type="radio"
                id="male"
                value="male"
                {...register('gender')}
              />
              <span className={CSS.customRadioBtn}></span>
              Man
            </label>
          </span>
        </div>

        <div className={CSS.desktopBlock}>
          <div className={CSS.leftDesktopBlock}>
            <label htmlFor="name" className={CSS.boldInputLabel}>
              Your name
              <input
                className={errors.name ? CSS.errorInput : CSS.textInput}
                type="input"
                {...register('name')}
                onBlur={validateInputValue}
              />
              {errors.name && (
                <p className={CSS.errorMessage}>{errors.name.message}</p>
              )}
            </label>

            <label
              htmlFor="email"
              className={`${CSS.boldInputLabel} ${CSS.marginLabel}`}
            >
              Email{' '}
              {!isVerified && (
                <span className={CSS.warninIcon} title="Email not verified!">
                  ⚠️ Email not verified!
                </span>
              )}
              <input
                className={errors.email ? CSS.errorInput : CSS.textInput}
                type="input"
                {...register('email')}
                onBlur={validateInputValue}
              />
              {errors.email && (
                <p className={CSS.errorMessage}>{errors.email.message}</p>
              )}
            </label>

            <UserSettingsDailyNormaInfo />
          </div>

          <div className={CSS.rightDesktopBlock}>
            <label htmlFor="weight" className={`${CSS.inputLabel} weight`}>
              Your weight in kilograms:
              <input
                className={errors.weight ? CSS.errorInput : CSS.textInput}
                type="input"
                {...register('weight')}
                onBlur={validateInputValue}
              />
              {errors.weight && (
                <p className={CSS.errorMessage}>{errors.weight.message}</p>
              )}
            </label>

            <label
              htmlFor="time"
              className={`${CSS.inputLabel} ${CSS.marginLabel}  sportTime`}
            >
              The time of active participation in sports:
              <input
                className={errors.time ? CSS.errorInput : CSS.textInput}
                type="input"
                {...register('time')}
                onBlur={validateInputValue}
              />
              {errors.time && (
                <p className={CSS.errorMessage}>{errors.time.message}</p>
              )}
            </label>

            <span className={`${CSS.waterPerDayTitle} waterPerDayTitle`}>
              The required amount of water in liters per day:
              <span className={CSS.litersPerDay}> {calculateLiters()} L</span>
            </span>

            <label
              form="liters"
              className={`${CSS.boldInputLabel} ${CSS.marginLabel} waterToDrink`}
            >
              Write down how much water you will drink:
              <input
                className={CSS.textInput}
                type="input"
                {...register('liters')}
                onBlur={validateInputValue}
              />
              {errors.liters && (
                <p className={CSS.errorMessage}>{errors.liters.message}</p>
              )}
            </label>
          </div>
        </div>
        <input
          className={`${CSS.submitBtn} submitBtn`}
          type="submit"
          value="Save"
        />
      </form>
    </div>
  );
};

export default UserSettingsForm;
