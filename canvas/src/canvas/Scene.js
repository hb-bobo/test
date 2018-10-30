import BaseNode from './BaseNode';
import * as utils from './utils';

function getContainer (container) {
    if (container instanceof HTMLElement) {
        return container;
    } else if (utils.isString(container)) {
        return document.querySelector(container);
    }
}


export default  class Scene extends BaseNode{
    /**
     * @param {string | HTMLElement} container 
     * @param {Object} opts 
     */
    constructor(container, opts) {
        const canvas = getContainer(container);
        const ctx = canvas.getContext("2d");
        super(ctx);
        this.canvas = canvas;
        this.ctx = ctx;
        this.type = 'Scence';
        this.resize();

        window.addEventListener('resize', this.resize.bind(this));
        // 给canvas加事件
        const events = ['click'];
        events.forEach(event => this.delegateEvent(event));

        this.canvas.addEventListener('DOMNodeRemovedFromDocument', () => {
            window.removeEventListener('resize', this.resize);
        });
    }

    /**
     * 委托事件
     * @param {string} event 
     */
    delegateEvent(event) {
        this.canvas.addEventListener(event, (e) => {
            const evtArgs = {
                originalEvent: e,
                type: event,
                x: e.offsetX,
                y: e.offsetY,
                stopDispatch() {
                    this.terminated = true;
                },
            };
            this.child.forEach(childNode => {
                childNode.dispatchEvent(evtArgs);
            });
        });
    }
    resize() {
        const canvas = this.canvas;
        const w = window.innerWidth;
        const h = window.innerHeight;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        canvas.width = w;
        canvas.height = h;
        this.render(this.ctx);
    }
}