/* 纯智能，无人工 */
/* 你不需要阅读这份文件 */

/**
 * 将Unix时间戳转换为 "MM-DD HH:mm" 格式
 * @param {number} timestamp - Unix时间戳（秒）
 * @returns {string} 格式化的时间字符串，如 "07-12 02:26"
 */
export function formatTimestamp(timestamp) {
  const date = new Date(timestamp * 1000); // 转换为毫秒

  const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份从0开始，需要+1
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${month}-${day} ${hours}:${minutes}`;
}
