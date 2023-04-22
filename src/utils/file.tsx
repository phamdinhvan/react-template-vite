export const FileUtil = {
  openFileURL,
};

function openFileURL(url: string, urlName: string) {
  return (
    <a
      rel='noreferrer'
      href={url}
      target='_blank'
      className='tw-text-primary-light'
      download='digifarm'
    >
      {urlName}
    </a>
  );
}
