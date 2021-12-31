
var Matrix4 = function () {
    function t() {
        this._elements = null;
    }

    Object.defineProperty(t, "elements", {
        get: function () {
            return this._elements;
        },

        set: function (value) {
            this._elements = value
        },
        configurable: true,
        enumerable: true
    })

    t.prototype.setRotate = function (angle, xAxle, yAxle, zAxle) {
        let radian = Math.PI * angle / 180;
        let sinB = Math.sin(radian);
        let cosB = Math.cos(radian);

        /** 绕X轴旋转 */
        if (xAxle == 1) {
            this.elements = new Float32Array([
                1.0, 0.0, 0.0, 0.0,
                0.0, cosB, sinB, 0.0,
                0.0, -sinB, cosB, 0.0,
                0.0, 0.0, 0.0, 1.0,
            ])
        }
        /** 绕Y轴旋转 */
        else if (yAxle == 1) {
            this.elements = new Float32Array([
                cosB, 0.0, -sinB, 0.0,
                0.0, 1.0, 0.0, 0.0,
                sinB, 0.0, cosB, 0.0,
                0.0, 0.0, 0.0, 1.0,
            ])
        }
        /** 绕Z轴旋转 */
        else if (zAxle == 1) {
            this.elements = new Float32Array([
                cosB, sinB, 0.0, 0.0,
                -sinB, cosB, 0.0, 0.0,
                0.0, 0.0, 1.0, 0.0,
                0.0, 0.0, 0.0, 1.0,
            ])
        }
    }

    /** 矩阵平移 */
    t.prototype.setTranslate = function (x, y, z) {
        this.elements = new Float32Array([
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            x, y, y, 1.0,
        ])
    }

    /** 矩阵缩放 */
    t.prototype.setScale = function (x, y, z) {
        this.elements = new Float32Array([
            x,   0.0, 0.0, 0.0,
            0.0, y  , 0.0, 0.0,
            0.0, 0.0, z  , 0.0,
            0.0, 0.0, 0.0, 1.0,
        ])
    }

    /** 单位矩阵 */
    t.prototype.setIdentity = function () {
        this.elements = new Float32Array([
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0,
        ])
    }

    t.prototype.translate = function(x, y, z) {
        let originMatrix = this.elements;
        this.setTranslate(x, y, z);
        this.elements = this.matrixMulti(this.elements, originMatrix);
    }

    
    t.prototype.rotate = function(angle, x, y, z) {
        let originMatrix = this.elements;
        this.setRotate(angle, x, y, z);
        this.elements = this.matrixMulti(this.elements, originMatrix);
    }

    
    t.prototype.scale = function(x, y, z) {
        let originMatrix = this.elements;
        this.setScale(x, y, z);
        this.elements = this.matrixMulti(this.elements, originMatrix);
    }

    /** 矩阵相乘 matrix1 * matrix2 */
    t.prototype.matrixMulti = function(matrix1, matrix2) {
        let result = [];
        for (let i = 0; i < matrix1.length; i+=4) {
            for (let j = 0; j < 4; j++) {
                let value1 = matrix1[i] * matrix2[j];
                let value2 = matrix1[i+1] * matrix2[j+4];
                let value3 = matrix1[i+2] * matrix2[j+8];
                let value4 = matrix1[i+3] * matrix2[j+12];
                result[i+j] = value1 + value2 + value3 + value4;
            }
        }

        return new Float32Array(result);
    }

    return t
}()