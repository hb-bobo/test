
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
        this.child = [];
        // scene时
        if (shape instanceof CanvasRenderingContext2D) {
            this.ctx = shape;
        }
    }

    attr(props, value) {
        // get
        if (utils.isString(props) && value === undefined) {
            return this._attr.attr(props, value);
        }
        //set
        this._attr.attr(props, value);

        if (this.ctx) {
            this.render();
        }
        return;
    }
    append(node, ctx) {
        if (!(node instanceof BaseNode)) {
            throw Error(`Failed to execute 'append' on 'Node': parameter 1 is not of type 'Node'`);
        }
        node.parent = node;
        node.ctx = ctx || this.ctx;
        node.attr('zOrder', ++zOrder);
        this.child.push(node);
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
        let hanlders = this._evnetHanlders[evtArgs.type];

        if (Array.isArray(this.child) && this.child.length > 0) {
            this.child.forEach(childNode => {
                childNode.dispatchEvent(evtArgs);
            });
        }
        if (Array.isArray(hanlders)) {
            hanlders.forEach(fn => {
                const isCollisionWithCircle = utils.isCollisionWithCircle(
                    this.attr('x'),
                    this.attr('y'),
                    this.attr('r'),
                    evtArgs.x,
                    evtArgs.y
                );
                if (isCollisionWithCircle) {
                    evtArgs.target = this;
                    fn(evtArgs);
                }
            });
        }
        
    }
    render(ctx = this.ctx ) {
        if (this._shape && this._shape.render) {
            this._shape.render(ctx, this._attr);
        }
        // 如果扩展此功能，待优化
        if (this.child.length > 0) {
            let sortedChild = utils.sortOrderedChild(this.child);
            sortedChild.forEach((childNode) => {
                childNode.render(ctx, this._attr);
            });
        }
    }
}