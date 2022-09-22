export const lowerCase = (params) => params.toLowerCase();

export const encrypt = (params) => window.btoa(params);

export const decrypt = (params) => window.atob(params);

export const not = (params) => !params;

export const ternary = (bool, truth, faulty) => (bool ? truth : faulty);

export const equal = (obj1, obj2 = 0) => obj1 === obj2;

export const notEqual = (obj1, obj2 = 0) => obj1 !== obj2;

export const head = (obj) => obj && obj[0];

export const last = (obj) => obj[length(obj) - 1];

export const length = (obj) => obj?.length;

export const getPath = window.location.pathname;

export const include = (arr, con) => arr.includes(con);

export const unique = (value, index, self) => self.indexOf(value) === index;

export const reload = () => window.location.reload();

export const replace = (str, val, newVal) => str.replaceAll(val, newVal);

export const values = (object) => (object ? Object.values(object) : []);

export const entries = (object) => (object ? Object.entries(object) : []);

export const keys = (object) => (object ? Object.keys(object) : []);

export const isEmpty = (value) => (value !== undefined ? value : "");

export const isEmptyString = (value) => value === "";
