/**
 * 去掉重复
 * @param {Array} value 数组值
 */
export function uniq(value) {
  let setValue = new Set(value);
  return Array.from(setValue);
}
