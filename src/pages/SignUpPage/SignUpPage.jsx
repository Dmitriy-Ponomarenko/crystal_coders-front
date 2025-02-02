import AdvantatgesSection from '../../components/AdvantagesSection/AdvantagesSection';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import css from './SignUpPage.module.css';
import { motion } from 'framer-motion';

// import { useEffect } from 'react';
// import { useRestoreSession } from '../../redux/utils/returnTrackerPage.jsx';

const SignUpPage = () => {
  // const restoreSession = useRestoreSession();

  // useEffect(() => {
  //   restoreSession();
  // }, [restoreSession]);

  return (
    <motion.div
      className={`${css.SignUpPageContainer} container`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <SignUpForm />
      <div className={css.advantages}>
        <AdvantatgesSection />
      </div>
    </motion.div>
  );
};

export default SignUpPage;
