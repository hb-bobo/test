import Scence from './canvas/Scene';
import Circle from './canvas/Circle';
import BaseNode from './canvas/BaseNode';
let scence = new Scence('#container', {
    viewport: [window.innerWidth, window.innerHeight],
});
console.log(scence)

let circle = new BaseNode(new Circle());
circle.attr({
    x: 10,
    y: 10,
    color: '#900',
    r: 10
});
scence.append(circle);

circle.on('click', function(target){
    console.log(target)
});
