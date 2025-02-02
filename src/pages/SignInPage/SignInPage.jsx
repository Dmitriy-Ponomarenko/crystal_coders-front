import css from './SignInPage.module.css';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import SignInForm from '../../components/SignInForm/SignInForm';

import { motion } from 'framer-motion';

// import { useEffect } from 'react';
// import { useRestoreSession } from '../../redux/utils/returnTrackerPage.jsx';

const SignInPage = () => {
  // const restoreSession = useRestoreSession();

  // useEffect(() => {
  //   restoreSession();
  // }, [restoreSession]);

  return (
    <motion.div
      className={`${css.main} container`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <SignInForm />
      <div className={css.advantagesSection}>
        <AdvantagesSection />
      </div>
    </motion.div>
  );
};

export default SignInPage;
