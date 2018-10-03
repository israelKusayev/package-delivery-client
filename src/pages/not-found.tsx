import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NotFound: React.SFC<{}> = () => {
  return (
    <h1 className="m-4 text-center">
      Page Not Found <FontAwesomeIcon icon={'sad-tear'} />
    </h1>
  );
};

export default NotFound;
