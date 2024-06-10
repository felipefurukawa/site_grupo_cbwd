import React from 'react';
import { LinearProgress } from '@material-ui/core';

function ProgressBar({ progress }) {
  return <LinearProgress variant="determinate" value={progress} />;
}

export default ProgressBar;
