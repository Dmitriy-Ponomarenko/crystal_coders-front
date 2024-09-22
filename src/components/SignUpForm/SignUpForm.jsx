import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import Logo from 'components/Logo/Logo';
import css from './SignUpForm.module.css';
import { signUp } from '../../redux/auth/operations';
// import GoogleBtnSignUp from 'components/GoogleBtnSignUp/GoogleBtnSignUp';
import GoogleBtn from 'components/GoogleBtn/GoogleBtn';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';


export const validationSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('Email is required')
    .email('Invalid email format'),
  password: yup
    .string()
    .trim()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Repeat password is required'),
});

const SignUpForm = () => {
  const dispatch = useDispatch();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [repeatPasswordVisible, setRepeatPasswordVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async data => {
    const { email, password } = data;

    try {
      const response = signUp({
        email,
        password,
      });

      if (response.status === 201) {

        toast.success('Registration successful! Please check your email to verify your account!');
        setTimeout(()=>{
          navigate('/tracker')
        }, 2000);

      console.log(response.data);
    }} catch (err) {
      if(err.response && err.response.status === 409){
        toast.error('User with this email already exists!')
      }else{
        toast.error('Registration failed. Please try again.')
      }
      console.log(err.message);
    }
  };

      await dispatch(response).unwrap();
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className={css.SignUpContainer}>
      <div className={css.logo}>
        <Logo />
      </div>
      <form className={css.SignUpForm} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={css.SignText}>Sign Up</h2>
        <div className={css.inputDiv}>
          <label>Email</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                placeholder="Enter your email"
                className={`${css.input} ${errors.email ? css.inputError : ''}`}
              />
            )}
          />
          {errors.email && <p className={css.error}>{errors.email.message}</p>}
        </div>

        <div className={css.inputDiv}>
          <label>Password</label>
          <div className={css.wrapPass}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className={`${css.input} ${
                    errors.password ? css.inputError : ''
                  }`}
                />
              )}
            />
            <button
              type="button"
              className={css.toggle}
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          {errors.password && (
            <p className={css.error}>{errors.password.message}</p>
          )}
        </div>

        <div className={css.inputDiv}>
          <label>Repeat password</label>
          <div className={css.wrapPass}>
            <Controller
              name="repeatPassword"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type={repeatPasswordVisible ? 'text' : 'password'}
                  placeholder="Repeat password"
                  className={`${css.input} ${
                    errors.repeatPassword ? css.inputError : ''
                  }`}
                />
              )}
            />
            <button
              type="button"
              className={css.toggle}
              onClick={() => setRepeatPasswordVisible(!repeatPasswordVisible)}
            >
              {repeatPasswordVisible ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          {errors.repeatPassword && (
            <p className={css.error}>{errors.repeatPassword.message}</p>
          )}
        </div>
        <button type="submit" className={css.btn}>
          Sign Up
        </button>
        <p className={css.text}>
          Already have account?{' '}
          <Link to="/signin" className={css.linkText}>
            Sign In
          </Link>
        </p>
        <p className={css.text}>or</p>
        <GoogleBtn />
      </form>
    </div>
  );
};
export default SignUpForm;
