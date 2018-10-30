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
        super();
        this.container = getContainer(container);
        this.ctx = this.container.getContext("2d");
        this.viewport = opts.viewport;
        this.updateViewport();

        window.addEventListener('resize', this.resize);

        const events = ['click'];
        events.forEach(event => this.delegateEvent(event));
        this.container.addEventListener('DOMNodeRemovedFromDocument', () => {
            window.removeEventListener('resize', his.resize);
        });
    }
    /**
     * 委托事件
     * @param {string} event 
     */
    delegateEvent(event) {
        this.container.addEventListener(event, (e) => {
            const evtArgs = {
                originalEvent: e,
                type: event,
                stopDispatch() {
                    this.terminated = true;
                },
            };
            this.dispatchEvent(evtArgs);
        });
    }
    resize() {
        
    }
    
    // clearCanvas() {
    //     this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    // }
    updateViewport() {
        const [width, height] = this.viewport;
        const canvas = this.container;
        const w = container.clientWidth;
        const h = container.clientHeight;
        canvas.width = w;
        canvas.height = h;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        console.log(w)
        // canvas.style.width = `${width}px`;
        // canvas.style.height = `${height}px`;
        return;
        const dpr = window.devicePixelRatio || 1;
        const ratio = this.ctx.webkitBackingStorePixelRatio || this.ctx.backingStorePixelRatio;
        const r = dpr / ratio;
        if (dpr !== ratio) {
            const w = this.ctx.width;
            const h = this.ctx.height;
            canvas.width = w * r;
            canvas.height = h * r;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            canvas.scale(r, r);
        }
    }
}