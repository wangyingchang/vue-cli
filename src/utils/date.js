/**
 * 时间格式转换 
 * @param {Date} timestamp new date
 * @returns {Date} 2019-01-08
 */
export function unix2CurrentTime(timestamp) {
    return new Date(timestamp).toLocaleString()
}
export function unix2CurrentDate(timestamp) {
    let str = new Date(timestamp);
    let year = str.getFullYear();
    let month = str.getMonth() + 1;
    if (month < 10) {
        month = '0' + (str.getMonth() + 1);
    }
    let day = str.getDate();
    if (day < 10) {
        day = '0' + (str.getDate());
    }
    return year + '-' + month + '-' + day;
}
