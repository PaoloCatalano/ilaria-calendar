import { parse } from 'date-fns';

const DATE_FORMAT = 'MM/dd/yyyy';
// const DATE_FORMAT = 'dd/MM/yyyy';//da cambiare

export const parseEventDate = (date: string) => parse(date, DATE_FORMAT, 0);
