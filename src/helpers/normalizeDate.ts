export const normalizeDate = (date: string) => {
  const newDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  const formattedDate = new Intl.DateTimeFormat('ua', options).format(newDate);

  return formattedDate;
}