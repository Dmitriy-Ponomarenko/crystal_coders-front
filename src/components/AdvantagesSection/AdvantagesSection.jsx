import { CloudinaryContext, Image } from 'cloudinary-react';
import css from './AdvantagesSection.module.css';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const imageIds = {
  customer1: {
    nonRetina: 'tmbodlkkjpdiqirehfp6',
    retina: 'yj4j2yfgjtmur5lvrzka',
  },
  customer2: {
    nonRetina: 'gn4nssaqqugodu3pnzi2',
    retina: 'jqj6k2vbrnbuqhtgblpr',
  },
  customer3: {
    nonRetina: 'og5jodgwvckh5kxgalyq',
    retina: 'dluks7qhsvduivuaaxrp',
  },
};

const AdvantatgesSection = () => {
  const [userCount, setUserCount] = useState(0);
  const [sectionVisible, setSectionVisible] = useState(false);
  const [customersVisible, setCustomersVisible] = useState(false);
  const [benefitsVisible, setBenefitsVisible] = useState(false);
  const [isRetina, setIsRetina] = useState(false);

  const getImageUrl = (baseId, isRetina) => {
    return isRetina ? imageIds[baseId].retina : imageIds[baseId].nonRetina;
  };

  const fetchUserCount = async () => {
    try {
      const response = await fetch(
        'https://crystal-coders-back.onrender.com/count',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error('Fauled to fetch user count');
      }

      const data = await response.json();
      setUserCount(data.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load user count. Please try again later.');
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      '(min-resolution: 192dpi), (-webkit-min-device-pixel-ratio: 2)'
    );
    setIsRetina(mediaQuery.matches);
  }, []);

  useEffect(() => {
    fetchUserCount();

    const sectionTimer = setTimeout(() => {
      setSectionVisible(true);
    }, 500);

    const customersTimer = setTimeout(() => {
      setCustomersVisible(true);
    }, 1000);

    const benefitsTimer = setTimeout(() => {
      setBenefitsVisible(true);
    }, 1300);

    return () => {
      clearTimeout(sectionTimer);
      clearTimeout(customersTimer);
      clearTimeout(benefitsTimer);
    };
  }, []);

  return (
    <CloudinaryContext cloudName="dwyxffoux">
      <div
        className={`${css.advantages} ${
          sectionVisible ? css['advantages-visible'] : ''
        }`}
      >
        <div
          className={`${css.customersContainer} ${
            customersVisible ? css['customers-visible'] : ''
          }`}
        >
          <ul className={css.customersList}>
            <li
              className={`${css.customersImg} ${
                customersVisible ? css['customersImg-visible'] : ''
              }`}
            >
              <Image
                publicId={getImageUrl('customer1', isRetina)}
                alt="customer1"
              />
            </li>
            <li
              className={`${css.customersImg} ${
                customersVisible ? css['customersImg-visible'] : ''
              }`}
            >
              <Image
                publicId={getImageUrl('customer2', isRetina)}
                alt="customer2"
              />
            </li>
            <li
              className={`${css.customersImg} ${
                customersVisible ? css['customersImg-visible'] : ''
              }`}
            >
              <Image
                publicId={getImageUrl('customer3', isRetina)}
                alt="customer3"
              />
            </li>
          </ul>

          <p
            className={`${css.customersText} ${
              customersVisible ? css['customersText-visible'] : ''
            }`}
          >
            Our <span className={css.happy}> {userCount}</span> happy customers
          </p>
        </div>

        <div
          className={`${css.benefits} ${
            benefitsVisible ? css['benefits-visible'] : ''
          }`}
        >
          <div
            className={`${css.habitContainer} ${
              benefitsVisible ? css['habitContainer-visible'] : ''
            }`}
          >
            <div
              className={`${css.circle} ${
                benefitsVisible ? css['circle-visible'] : ''
              }`}
            ></div>
            <p className={css.habitText}>Habit drive</p>
          </div>
          <div
            className={`${css.statistics} ${
              benefitsVisible ? css['statistics-visible'] : ''
            }`}
          >
            <p className={css.statisticsText}>View statistics</p>
          </div>
          <div
            className={`${css.setting} ${
              benefitsVisible ? css['setting-visible'] : ''
            }`}
          >
            <p className={css.settingText}>Personal rate setting</p>
          </div>
        </div>
      </div>
    </CloudinaryContext>
  );
};

export default AdvantatgesSection;
