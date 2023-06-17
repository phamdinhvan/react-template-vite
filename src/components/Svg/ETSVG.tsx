import React from 'react';
import SVG from 'react-inlinesvg';

type Props = {
  className?: string;
  style?: React.CSSProperties;
  path: string;
  svgClassName?: string;
};

const ETSVG: React.FC<Props> = ({ className = '', path, svgClassName = '', style = {} }) => {
  return (
    <span className={`svg-icon ${className}`} style={style}>
      <SVG
        src={path}
        className={svgClassName}
        width={style.width ?? 25}
        height={style.height ?? 25}
        style={style}
      />
    </span>
  );
};

export { ETSVG };
