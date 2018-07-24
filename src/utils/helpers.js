import moment from 'moment';

export const randomizer = () => Math.floor((1 + Math.random()) * 0x100000000000).toString(16);

export const getInitialName = (name, defaultVal = 'NA') => {
  if (!name) return '';
  if (name === '') return defaultVal;
  const split = name.split(' ');
  const initialName = split[0][0] + (split[1] ? split[1][0] : '');
  return initialName.toUpperCase();
};

export const dateFormatter = (date, { isUTC = false } = {}) => {
  if (!date) return '';
  if (isUTC) {
    date = new moment(date).utc();
  } else {
    date = new moment(date).local();
  }
  return date.format('DD-MM-YYYY')
};

export const dateFormateName = (date, { isUTC = false } = {}) => {
  if (!date) return '';
  if (isUTC) {
    date = new moment(date).utc();
  } else {
    date = new moment(date).local();
  }
  return date.format('DD MMM YYYY')
};

export const formatTimeFromDate = (date, separator = ':', { isUTC = false } = {}) => {
  if (isUTC) {
    date = new moment(date).utc();
  } else {
    date = new moment(date).local();
  }
  let hours = String(date.hour())
  hours = hours.length <= 1 ? `0${hours}` : hours
  let minutes = String(date.minute())
  minutes = minutes.length <= 1 ? `0${minutes}` : minutes
  return hours + separator + minutes
}

export const formatDateTime = (date, { isUTC = false } = {}) => {
  return dateFormateName(date, { isUTC }) + ' ' + formatTimeFromDate(date, ':', { isUTC })
}

// result is like result from lodash
export const result = (obj, prop, defaultVal = null) => {
  if (obj.hasOwnProperty(prop)) {
    return obj[prop];
  }
  return defaultVal;
};

export const capitalize = (text) => {
  if (!text || text.trim() === '') {
    return ''
  }
  return text[0].toUpperCase() + text.slice(1).toLowerCase()
}

export const debounce = (func, wait, immediate) => {
	let timeout;
	return function() {
		let context = this, args = arguments;
		let later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		let callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

export const sliceString = (str, length, postFix = '...') => {
  if (str.length >  length) {
    return str.substring(0, length) + postFix
  } else {
    return str
  }
}
