import React from 'react';

export const DEFAULT_SIZE: [number, number] = [28, 28];

export type IconModel = {
  color?: string;
  size: number[]; // mang kich thuoc x,y (width, height)
  viewBox: number[]; // mang kich thuoc x,y (width, height)
  className?: string;
  textColor?: string;
  style?: React.CSSProperties;
  options?: {
    color: string;
    backgroundColor: string;
  };
  onClick?: () => void;
  children?: React.ReactNode;
};
