
import Attr from './Attr';
import * as utils from './utils';

/**
 * 节点
 */
class BaseNode {
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
    append(node) {
        if (!(node instanceof BaseNode)) {
            throw Error(`Failed to execute 'append' on 'Node': parameter 1 is not of type 'Node'`);
        }
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


    render(drawingContext) {
        if (this._shape && this._shape.render) {
            this._shape.render(drawingContext, this._attr);
        }
        // 如果扩展此功能，待优化
        if (this._chid.length > 0) {
            let sortedChild = utils.sortOrderedChild(this._chid);
            sortedChild.forEach(function(childNode) {
                childNode.render(drawingContext, this._attr);
            });
        }
    }
}