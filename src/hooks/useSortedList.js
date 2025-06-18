import { useState } from 'react';

export const useSortedList = (list, initialField = 'name') => {
  const [field, setField] = useState(initialField);
  const sorted = [...list].sort((a, b) => a[field].localeCompare(b[field]));
  return [sorted, setField];
};