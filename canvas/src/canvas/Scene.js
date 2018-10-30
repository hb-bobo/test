import BaseNode from './BaseNode';
import * as utils from './utils';

function getContainer (container) {
    if (container instanceof HTMLElement) {
        return container;
    } else if (utils.isString(container)) {
        return document.querySelector(container);
    }
}


class Scene extends BaseNode{
    /**
     * @param {string | HTMLElement} container 
     * @param {Object} opts 
     */
    constructor(container, opts) {
        super();
        this.container = getContainer(container);
        this.drawingContext = this.container.getContext("2d");
    }
}