
import Attr from './Attr';
import * as utils from './utils';

let zOrder = 0;
/**
 * 节点
 */
export default class BaseNode {
    /**
     * 
     * @param {Shape} shape 
     * @param {Attr} attr 
     */
    constructor(shape, attr) {
        this._evnetHanlders = {};
        this._shape = shape;
        this._attr = attr || new Attr(attr);
        this._chid = [];
    }

    attr(prop, value) {
        return this._attr.attr(prop, value);
    }
    append(node, drawingContext) {
        if (!(node instanceof BaseNode)) {
            throw Error(`Failed to execute 'append' on 'Node': parameter 1 is not of type 'Node'`);
        }
        node.ctx = drawingContext || this.drawingContext;
        node.attr('zOrder', ++zOrder);
        this._chid.push(node);
        this.render();
    }
    removeChild() {
        // 待扩展
    }
    /**
     * @param {string} eventType 
     * @param {Function} hanlder 
     */
    on(eventType, hanlder) {
        if (this._evnetHanlders[eventType] === undefined) {
            this._evnetHanlders[eventType] = [];
        }
        this._evnetHanlders[eventType].push(hanlder);
    }

    /**
     * @param {string} eventType 
     * @param {Function} hanlder 
     */
    off(eventType, hanlder) {
        let hanlders = this._evnetHanlders[eventType];
        if (Array.isArray(hanlders)) {
            return;
        }
        let index = hanlders.indexOf(hanlder);
        if (index === -1) {
            return;
        }
        hanlders.splice(index, 1);
    }

    /**
     * 分发事件
     * @param {string} eventType 
     */
    dispatchEvent(evtArgs) {
        console.log(11, this)
        let hanlders = this._evnetHanlders[evtArgs.type];

        if (Array.isArray(hanlders)) {
            hanlders.forEach(fn => {
                fn(evtArgs);
            });
        }
        if (Array.isArray(this._chid) && this._chid.length > 0) {
            this._chid.forEach(childNode => {
                childNode.dispatchEvent(evtArgs);
            });
        }
    }
    render(ctx = this.ctx ) {
        if (this._shape && this._shape.render) {
            this._shape.render(ctx, this._attr);
        }
        // 如果扩展此功能，待优化
        if (this._chid.length > 0) {
            let sortedChild = utils.sortOrderedChild(this._chid);
            sortedChild.forEach((childNode) => {
                childNode.render(ctx, this._attr);
            });
        }
    }
}