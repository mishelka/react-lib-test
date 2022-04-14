export const formatDate = (date: Date) => {
  let dateString = date.toISOString();
  dateString = dateString.slice(0, dateString.length - 1) + "+00:00";
  console.log(dateString);
  return dateString;
}

export const stringEquals = (str1: string|null, str2: string|null) => {
  return (str1 != null && str2 != null) ?
    str1.localeCompare(str2) === 0 : true;
}
