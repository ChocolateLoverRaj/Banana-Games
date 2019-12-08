//I call it: the "rational" number!

namespace MyNumber {
    export function isNatural(number: number): boolean {
        if (number > 0 && Math.floor(number) == number) {
            return true;
        }
        else {
            return false;
        }
    }

    export function isWhole(number: number): boolean {
        if (number >= 0 && Math.floor(number) == number) {
            return true;
        }
        else {
            return false;
        }
    }

    export function isInteger(number: number): boolean {
        if (Math.floor(number) == number) {
            return true;
        }
        else {
            return false;
        }
    }

    export class Exists {
        isZero: boolean;
        _value: number;

        constructor(isZero: boolean) {
            this.isZero = isZero;
        }

        add(number: Exists): void {
            if (this.isZero && !number.isZero) {
                this.isZero = false;
            }
        }

        set value(number: false | number) {
            this.isZero = number ? true : false;
            this._value = number ? 1 : 0;
        }

        get value(): false | number {
            return this.isZero ? 0 : 1;
        };
    }

    export class Whole extends Exists {
        _value: number;
        valid: boolean;

        constructor(number: number) {
            if (isWhole(number)) {
                if (number == 0) {
                    super(true);
                }
                else {
                    super(false);
                }
                this._value = number;
                this.valid = true;
            }
            else {
                super(false);
                this.valid = false;
            }
        }

        set value(number: false | number) {
            if (number == 0) {
                this.isZero = true;
            }
            if (number && isWhole(number)) {
                this._value = number;
                this.valid = true;
            }
            else {
                this.valid = false;
            }
        }

        get value(): false | number {
            if (this.valid) {
                return this._value
            }
            else if (this.isZero) {
                return 0;
            }
            else {
                return false;
            }
        };
    }

    export class Integer extends Whole {
        isNegative: boolean;

        constructor(number: number) {
            if (isInteger(number)) {
                super(number);
                this._value = Math.abs(number);
                this.isNegative = number < 0;
                this.valid = true;
            }
            else {
                super(number);
                this.valid = false;
            }
        }

        set value(number: false | number) {
            if (number == 0) {
                this.isZero = true;
            }
            if (number && isInteger(number)) {
                if (number > 0) {
                    this._value = number;
                    this.valid = true;
                }
                else {
                    this._value = Math.abs(number);
                    this.valid = true;
                    this.isNegative = true;
                }
            }
            else {
                this.valid = false;
            }
        }

        get value() {
            if (this.valid) {
                if (this.isZero) {
                    return 0;
                }
                else if (this.isNegative) {
                    return 0 - this._value;
                }
                else {
                    return this._value;
                }
            }
            else {
                return false;
            }
        }
    }

    export function toInteger(number: Exists | Whole | Integer): Integer | false {
        if ("isNegative" in number) {
            return number;
        }
        else if ("valid" in number) {
            if (typeof (number.value) == 'number') {
                return new Integer(number.value);
            }
            else {
                return false;
            }
        }
        else {
            if (typeof (number.value) == 'number') {
                return new Integer(number.value);
            }
            else {
                return false;
            }
        }
    }
}

namespace MyMath {
    export function add(num1: MyNumber.Integer, num2: MyNumber.Integer): MyNumber.Integer {
        
    }
}
 
let test: MyNumber.Exists = new MyNumber.Exists(false);
let add: MyNumber.Exists = new MyNumber.Exists(false);
let newTest = MyNumber.toInteger(test);
if (newTest) {
    console.log(newTest.value);
}
export {
    MyNumber
};