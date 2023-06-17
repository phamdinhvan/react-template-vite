import React from 'react';
import { Helmet } from 'react-helmet';

const Head: React.FC<any> = ({ ...props }) => {
  return (
    <Helmet>
      <title>{props.title ? props.title + ' | ' : null} CRM Admin</title>
    </Helmet>
  );
};
export default Head;
