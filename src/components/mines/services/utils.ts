export const formatDate = (date: Date) => {
  let dateString = date.toISOString();
  dateString = dateString.slice(0, dateString.length - 1) + "+00:00";
  console.log(dateString);
  return dateString;
}
