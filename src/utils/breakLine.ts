/**
 * 将输入框换行输入值转成数组
 * @param value 入参
 * @returns 数组
 */

 const breakLine = (value:string) => (value && value.length ? value.split(/[\s\n\t\r]+/) : []);

 export default breakLine;