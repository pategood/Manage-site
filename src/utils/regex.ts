
/**
 * @param len
 * @returns
 * @description 校验小数点后第n位
 */
export const validateNumber = (len: number) => ({
  pattern: new RegExp(`^([1-9]\\d*(\.[0-9]{1,${len}})?|0\.\\d{1,${len}})$`),
  patternMessage: `请输入小数点后不超过${len}位的数字`
});

/**
 * @description 只支持数字和字母
 */
export const validateNumberAndWord = {
  pattern: /^(\d|[a-zA-Z])+$/,
  patternMessage: "只支持数字、字母"
};


/**
 * @description 只支持数字，字母，-，_，#，*，/，&，+，?，.，(，)，@
 */
export const validateSkuCode = {
  pattern: /^(\d|[a-zA-Z]|\-|_|#|\*|\/|&|\+|\?|\.|\(|\)|@)+$/,
  patternMessage:  "只支持数字，字母，-，_，#，*，/，&，+，?，.，(，)，@"
};


/**
 * @description 支持中文、数字、字母、限制最长最短字符
 */
export const validateEnglishName = {
  // pattern: `/^[\u4e00-\u9fa5_a-zA-Z0-9_]{${min},${max}}$/`,
  pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5\s]+$/,
  patternMessage:  "SupportsNumbersLettersChineseAndSpaces_1429525704", dm: "支持数字、字母、中文和空格"
};


/**
 * 校验小数点后几位数字
 * @param v 入参值
 * @param len 校验到小数点后第几位
 * @returns boolean
 */
export const testNumber = (v: string, len: number) => {
  const regx = new RegExp(`^([1-9]\\d*(\.[0-9]{1,${len}})?|0\.\\d{1,${len}})$`);
  return regx.test(v);
};
