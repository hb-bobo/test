

class BigInt{
    constructor(value) {
        this.value = value;
    }
    multi(BigInt) {
        let num1 = this.value;
        let num2 = BigInt.value;
        this.karatsuba(num1, num2);
    }

    multiLong(num1, num2) {
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
    karatsuba(num1, num2) {
        var halfN = Math.max(size1, size2);
        //递归终止条件
        if(halfN < 30) return this.multiLong(num1, num2);
    
        // 计算拆分长度
        var size1 = num1.length;
        var size2 = num2.length;
        halfN = Math.ceil(Math.max(size1, size2) / 2);
        /* 拆分为a, b, c, d */
        var a = num1.substring(0, size1 - halfN);
        var b = num1.substring(size1 - halfN);
        var c = num2.substring(0, size2 - halfN);
        var d = num2.substring(size2 - halfN);
    
        // 计算z2, z0, z1, 此处的乘法使用递归
        var ac = karatsuba(a, c);
        var bd = karatsuba(b, d);
        var adbc = karatsuba((a + b), (c + d));
    
        return (ac * Math.pow(10, (2*halfN)) + adbc * Math.pow(10, halfN) + bd);
    }
}

let bigInt1 = new BigInt('2131111111213213');
let bigInt2 = new BigInt('2432132131232143243243243');
let resultInt = bigInt1.multi(bigInt2);
