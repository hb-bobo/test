


export const isObject = function (data) {
    return Object.prototype.toString.call(data) === '[object Object]';
}

export const isString = function (data) {
    return typeof data === 'string';
}

export const sortOrderedChild = function (nodes, reversed = false) {
    return nodes.sort((a, b) => {
      if(reversed) [a, b] = [b, a];
      if(a.attr('zIndex') === b.attr('zIndex')) {
        return a.attr('zOrder') - b.attr('zOrder') ;
      }
      return a.attr('zIndex') === b.attr('zIndex');
    });
}


/**
 * ⚪的碰撞检测
 * @param {number} x 全局坐标x
 * @param {number} y 
 * @param {number} r 半径
 * @param {number} x1 全局坐标x
 * @param {number} y1
 * @return {boolean}
 */
export const isCollisionWithCircle = function (x, y, r, x1, y1) {
    let a = Math.abs(x1 - x);
    let b = Math.abs(y1 - y);
    if (Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)) <= r) {  
        return true;  
    }  
    return false;
}