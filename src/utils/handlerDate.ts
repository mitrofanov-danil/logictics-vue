export const convertStringToDate = (dateString: string) => {
  return dateString.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
};

export const convertToYYYYMMDD = (date: Date) => {
  return date.toISOString().split('T')[0];
};

export const addDaysToDate = (date: Date, time: string) => {
  const newDate = new Date(date.setDate(date.getDate() + parseInt(time)));
  const result = convertToYYYYMMDD(newDate);
  return result;
};
