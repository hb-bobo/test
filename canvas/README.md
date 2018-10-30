

```js
let index = 1;

// 声明一个场景
const scence = new Scence('#container');


function random (m, n){
    return Math.floor(Math.random() * (m - n) + n);
}
const shape = new Circle();

for(let i = 0; i < 500; i++) {
    // 创建一个元素
    const circle = new BaseNode(shape);
    circle.attr({
        x: random(0, window.innerWidth),
        y: random(0, window.innerHeight),
        color: '#808efd',
        r: random(10, 30)
    });
    // 加事件
    circle.on('click', function(ev){
        const target = ev.target;
        scence.child.forEach(chid => {
            chid.attr({
                color: '#808efd'
            });
        });

        target.attr({
            zIndex: ++index,
            color: '#0b23da'
        });
    });
    // 添加到场景中
    scence.append(circle);
}

```