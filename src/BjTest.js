import React from 'react'
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

export function BjTest() {
    const [value, setValue] = useState("10");
console.log(value)
    return (
    <div>
    <TimePicker
        label="Basic example"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    
    
      </div>
  )
}
