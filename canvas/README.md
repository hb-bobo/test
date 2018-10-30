

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



```js
// 大数相乘
class BigInt{
    constructor(value) {
        this.value = value;
    }
    multi(BigInt) {
        let num1 = this.value;
        let num2 = BigInt.value;
        let digits = new Array(num1.length + num2.length).fill(0);

        num1 = num1.split("").reverse();
        num2 = num2.split("").reverse();

        for (let i = 0; i < num1.length; i++) {
            for (let j = 0; j < num2.length; j++) {
                digits[i + j] += Number(num1[i]) * Number(num2[j]);
            }
        }

        // 进位
        for (let i = 0; i < digits.length - 1; i++) {
            digits[i + 1] += Math.floor(digits[i] / 10);
            digits[i] = digits[i] % 10;
        }

        while (digits.length > 0 && digits[digits.length - 1] === 0) {
            digits.pop();
        }
        return digits.length === 0 ? "0" : digits.reverse().join("");
    }
}

let bigInt1 = new BigInt('2131111111213213');
let bigInt2 = new BigInt('2432132131232143243243243');
let resultInt = bigInt1.multi(bigInt2);
console.log(resultInt)
```