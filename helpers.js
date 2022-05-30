export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);
export const getRow = (cellId) => cellId.substr(1, 1);
export const getColumn = (cellId) => cellId.substr(0, 1);