const timeToString = (num, unit) => {
  return num + (num === 1 ? ` ${unit} ago` : ` ${unit}s ago`);
};

const convertMS = (milliseconds) => {
  let years, months, days, hours, minutes, seconds;
  seconds = Math.floor(milliseconds / 1000);
  minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  days = Math.floor(hours / 24);
  hours = hours % 24;
  months = Math.floor(days / 30);
  days = days % 30;
  years = Math.floor(months / 12);
  months = months % 12;

  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
  };
};

export const dateToString = (date) => {
  if (date === 'A few seconds ago...') {
    return 'A few seconds ago...';
  }
  date = new Date(date);
  const now = new Date();
  const { years, months, days, hours, minutes, seconds } = convertMS(
    now - date
  );

  let time = timeToString(seconds, 'second');

  if (years - 1970 > 0) {
    time = timeToString(years - 1970, 'year');
  } else if (months > 0) {
    time = timeToString(months, 'month');
  } else if (days > 0) {
    time = timeToString(days, 'day');
  } else if (hours > 0) {
    time = timeToString(hours, 'hour');
  } else if (minutes > 0) {
    time = timeToString(minutes, 'minute');
  }

  return time;
};
