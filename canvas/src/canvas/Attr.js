
import * as utils from './utils';

function getDefaultAttr() {
    return {
        x: 0,
        y: 0,
        zIndex: 0,
        zOrder: 0,
    }
}

export default class Attr{
    constructor(attr) {
        this._attr = getDefaultAttr();
        if (utils.isObject(attr)) {
            Object.assign(this._attr, attr);
        }
    }

    /**
     * @param {string | Object} prop 
     * @param {any} value 
     */
    attr(props, value) {
        if (utils.isObject(props)) {
            Object.keys(props).forEach((prop) => {
                this.attr(prop, props[prop]);
            });
        }
        if (utils.isString(props)) {
            if (value === undefined) {
                return this.getAttr(props);
            }
            return this.setAttr(props, value);
        }
    }

    /**
     * @param {string} attrType 
     */
    getAttr(attrType) {
        return this._attr[attrType];
    }
    /**
     * @param {string} attrType 
     * @param {any} value 
     */
    setAttr(attrType, value) {
        this._attr[attrType] = value;
    }
}