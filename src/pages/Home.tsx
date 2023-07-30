import UniconIcon from '@/components/UniconIcon';
import logo from '@/logo.svg';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Image from '@/assets/images/test.png';

const Home = () => {
  const { t } = useTranslation(['common']);
  return (
    <div className='tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-center tw-pt-[50px]'>
      <img src={logo} alt='Logo' className='tw-h-[150px]' />
      <ul className='tw-p-0 tw-text-lg tw-flex tw-flex-col tw-gap-4 tw-list-none tw-et-example'>
        <li>🚀 Vite</li>
        <li>🔥 React</li>
        <li>📖 TypeScript</li>
        <li>🔨 Eslint</li>
        <li>💅 Prettier</li>
        <UniconIcon name='search' />
        <LazyLoadImage src={Image} alt='#' />
      </ul>
      <p>{t('INSTALL')}</p>
    </div>
  );
};

export default Home;
