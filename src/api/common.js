import { get } from "../utils/fetch";

/**
 * 获取省列表
 */
export function queryProvince() {
  return get("common/province/list");
}

/**
 * 根据省获取市列表
 * @param {*} provinceId 省id
 */
export function queryCity(provinceId) {
  return get("common/city/listByProvinceId", { provinceId });
}

/**
 * 根据市获取区域列表
 * @param {*} cityId 市id
 */
export function queryArea(cityId) {
  return get("common/area/listByCityId", { cityId });
}
