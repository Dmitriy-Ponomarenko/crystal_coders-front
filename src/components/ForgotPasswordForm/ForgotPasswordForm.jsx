import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { NavLink } from 'react-router-dom';
import css from './ForgotPasswordForm.module.css';
import Logo from '../Logo/Logo';
import toast from 'react-hot-toast';

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
});

const ForgotPasswordForm = () => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async data => {
    const { email } = data;
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch(
        'https://crystal-coders-back.onrender.com/auth/request-reset-email',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        setMessage('Reset password email was successfully sent!');
      } else {
        toast.error('Something wrong... Try again later');
      }

      reset();
    } catch (error) {
      setMessage('Something wrong... Try again later');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={css.infoContainer}>
      <div className={css.logo}>
        <Logo />
      </div>
      <div className={css.formContainer}>
        <form className={css.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <h1 className={css.title}>Reset Password</h1>

          <div className={css.inputBox}>
            <div className={css.group}>
              <label htmlFor="email" className={css.label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className={`${css.input} ${errors.email ? css.error : ''}`}
                {...register('email')}
              />
              {errors.email && (
                <p className={css.error}>{errors.email.message}</p>
              )}
            </div>
          </div>

          <button type="submit" className={css.resetBtn} disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send message'}
          </button>

          {message && <p className={css.message}>{message}</p>}

          <div className={css.offerCont}>
            <p className={css.signInOffer}>
              Remember your password?&nbsp;
              <NavLink className={css.signInLink} to="/signin">
                Sign in
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
