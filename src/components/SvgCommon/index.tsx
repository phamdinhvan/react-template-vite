import { IconModel } from '@/models';
import React from 'react';

const SvgCommon: React.FC<IconModel> = (props) => {
  return (
    <svg
      width={props.size[0]}
      height={props.size[1]}
      viewBox={`0 0 ${props.viewBox[0]} ${props.viewBox[1]}`}
      className={props.className}
      style={props.style}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      {props.children}
    </svg>
  );
};

export default SvgCommon;
