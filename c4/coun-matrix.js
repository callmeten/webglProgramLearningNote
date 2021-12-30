
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
        let radian = Math.PI * 90 / 180;
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

    return t
}()