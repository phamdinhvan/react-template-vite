import logo from '@/logo.svg';
import { useTranslation } from 'react-i18next';

const Hello = () => {
  const { t } = useTranslation(['common']);
  return (
    <div className='tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-center tw-pt-[50px]'>
      <img src={logo} alt='Logo' className='tw-h-[150px]' />
      <ul className='tw-p-0 tw-text-lg tw-flex tw-flex-col tw-gap-4 tw-list-none'>
        <li>🚀 Vite</li>
        <li>🔥 React</li>
        <li>📖 TypeScript</li>
        <li>🔨 Eslint</li>
        <li>💅 Prettier</li>
      </ul>
      <p>{t('INSTALL')}</p>
    </div>
  );
};

export default Hello;
