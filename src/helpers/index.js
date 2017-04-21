// create params for url
export const createUrlParams = obj => (
  Object.keys(obj).map( key => {
  	if(obj[key] && `${obj[key]}`.length > 0) {
  		return `${key}=${encodeURI(obj[key])}`;
  	}
  }).filter( str => str !== undefined ).join('&')
);
