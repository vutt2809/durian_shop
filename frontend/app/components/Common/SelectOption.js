import React from 'react';
const SelectOption = ({ options, value, handleSelectChange }) => (
  <select value={value?.value || ''} onChange={e => handleSelectChange({ value: e.target.value }, e.target.value)}>
    {options && options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
  </select>
);
export default SelectOption; 