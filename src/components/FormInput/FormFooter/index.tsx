import clsx from 'clsx';

interface Props {
  cancelBtnTitle?: string;
  confirmBtnTitle?: string;
  otherActionBtnTitle?: string;
  handleCancelAction: (...args: any[]) => void;
  handleSubmit?: (...args: any[]) => void;
  handleOtherAction?: (...args: any[]) => void;
}

const FormFooter = ({
  handleCancelAction,
  handleSubmit,
  cancelBtnTitle,
  confirmBtnTitle,
  otherActionBtnTitle,
  handleOtherAction,
}: Props) => {
  return (
    <div className='tw-flex-none tw-flex tw-px-[20px] tw-bg-white tw-justify-end tw-h-[78px] tw-w-full tw-p-4 tw-shadow-[6px_5px_21px_rgba(108,72,58,0.2)]'>
      <button type='reset' className='btn-cancel-style' onClick={handleCancelAction}>
        {cancelBtnTitle || 'Huỷ'}
      </button>
      <button
        type='submit'
        className={clsx('btn-confirm-style btn--shiny', {
          'tw-mr-8': Boolean(handleOtherAction),
        })}
        onClick={handleSubmit}
      >
        {confirmBtnTitle || 'Lưu'}
      </button>
      {handleOtherAction && (
        <button type='submit' className='btn-confirm-style btn--shiny' onClick={handleOtherAction}>
          {otherActionBtnTitle || 'Chỉnh sửa'}
        </button>
      )}
    </div>
  );
};

export default FormFooter;
