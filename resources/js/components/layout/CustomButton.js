import React from 'react';
import Button from '@mui/material/Button';

export default function Palette(props) {
  return (
      <Button 
        className="btnValid"
        variant="outlined"
      >
        {props.txt}
      </Button>
  );
}