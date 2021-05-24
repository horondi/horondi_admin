export const setMapImageHandler = (target, setMapFn, values, valuesKey) => {
  if (target.files && target.files[0]) {
    setMapFn({
      name: target.files[0].name,
      imageUrl: URL.createObjectURL(target.files[0])
    });
  }
  [values[valuesKey]] = target.files;
};

export const setInputsContactHandler = (schedule, address) => {
  return [
    { label: schedule, name: 'schedule' },
    { label: address, name: 'address' }
  ];
};
