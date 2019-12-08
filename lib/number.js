"use strict";
//I call it: the "rational" number!
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var MyNumber;
(function (MyNumber) {
    function isNatural(number) {
        if (number > 0 && Math.floor(number) == number) {
            return true;
        }
        else {
            return false;
        }
    }
    MyNumber.isNatural = isNatural;
    function isWhole(number) {
        if (number >= 0 && Math.floor(number) == number) {
            return true;
        }
        else {
            return false;
        }
    }
    MyNumber.isWhole = isWhole;
    function isInteger(number) {
        if (Math.floor(number) == number) {
            return true;
        }
        else {
            return false;
        }
    }
    MyNumber.isInteger = isInteger;
    var Exists = /** @class */ (function () {
        function Exists(isZero) {
            this.isZero = isZero;
        }
        Exists.prototype.add = function (number) {
            if (this.isZero && !number.isZero) {
                this.isZero = false;
            }
        };
        Object.defineProperty(Exists.prototype, "value", {
            get: function () {
                return this.isZero ? 0 : 1;
            },
            set: function (number) {
                this.isZero = number ? true : false;
                this._value = number ? 1 : 0;
            },
            enumerable: true,
            configurable: true
        });
        ;
        return Exists;
    }());
    MyNumber.Exists = Exists;
    var Whole = /** @class */ (function (_super) {
        __extends(Whole, _super);
        function Whole(number) {
            var _this = this;
            if (isWhole(number)) {
                if (number == 0) {
                    _this = _super.call(this, true) || this;
                }
                else {
                    _this = _super.call(this, false) || this;
                }
                _this._value = number;
                _this.valid = true;
            }
            else {
                _this = _super.call(this, false) || this;
                _this.valid = false;
            }
            return _this;
        }
        Object.defineProperty(Whole.prototype, "value", {
            get: function () {
                if (this.valid) {
                    return this._value;
                }
                else if (this.isZero) {
                    return 0;
                }
                else {
                    return false;
                }
            },
            set: function (number) {
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
            },
            enumerable: true,
            configurable: true
        });
        ;
        return Whole;
    }(Exists));
    MyNumber.Whole = Whole;
    var Integer = /** @class */ (function (_super) {
        __extends(Integer, _super);
        function Integer(number) {
            var _this = this;
            if (isInteger(number)) {
                _this = _super.call(this, number) || this;
                _this._value = Math.abs(number);
                _this.isNegative = number < 0;
                _this.valid = true;
            }
            else {
                _this = _super.call(this, number) || this;
                _this.valid = false;
            }
            return _this;
        }
        Object.defineProperty(Integer.prototype, "value", {
            get: function () {
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
            },
            set: function (number) {
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
            },
            enumerable: true,
            configurable: true
        });
        return Integer;
    }(Whole));
    MyNumber.Integer = Integer;
    function toInteger(number) {
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
    MyNumber.toInteger = toInteger;
})(MyNumber || (MyNumber = {}));
exports.MyNumber = MyNumber;
var test = new MyNumber.Exists(false);
var add = new MyNumber.Exists(false);
var newTest = MyNumber.toInteger(test);
if (newTest) {
    console.log(newTest.value);
}
//# sourceMappingURL=number.js.map