export const FormUIUtil = {
  renderFormItem,
};

function renderFormItem(label: string, value: React.ReactNode, requireIcon = false) {
  return (
    <div className='tw-w-full tw-flex tw-flex-col'>
      <div className='tw-mb-2 tw-et-text-label-16 tw-text-ink-80'>
        {label}
        {requireIcon && <sup className='tw-text-[#DC0A0A]'> *</sup>}
      </div>
      {value}
    </div>
  );
}
