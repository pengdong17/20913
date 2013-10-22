var cc = cc = cc || {};
function ClassManager() {
    return arguments.callee.name || arguments.callee.toString().match(/^function ([^(]+)/)[1]
}
ClassManager.id = 0 | 998 * Math.random();
ClassManager.compileSuper = function (a, b, c) {
    for (var d = a.toString(), e = d.indexOf("("), f = d.indexOf(")"), e = d.substring(e + 1, f), e = e.trim(), f = d.indexOf("{"), g = d.lastIndexOf("}"), d = d.substring(f + 1, g); -1 != d.indexOf("this._super");)var f = d.indexOf("this._super"), g = d.indexOf("(", f), h = d.indexOf(")", g), h = d.substring(g + 1, h), h = (h = h.trim()) ? "," : "", k = arguments.callee.ClassManager(), d = d.substring(0, f) + k + "[" + c + "]." + b + ".call(this" + h + d.substring(g + 1);
    return Function(e, d)
};
ClassManager.compileSuper.ClassManager = ClassManager;
ClassManager.getNewID = function () {
    return this.id++
};
(function () {
    var a = !1, b = /\b_super\b/, c = document.ccConfig && document.ccConfig.CLASS_RELEASE_MODE ? document.ccConfig.CLASS_RELEASE_MODE : null;
    c && console.log("release Mode");
    cc.Class = function () {
    };
    cc.Class.extend = function (d) {
        function e() {
            !a && this.ctor && this.ctor.apply(this, arguments)
        }

        var f = this.prototype;
        a = !0;
        var g = new this;
        a = !1;
        e.id = ClassManager.getNewID();
        ClassManager[e.id] = f;
        for (var h in d)g[h] = c && "function" == typeof d[h] && "function" == typeof f[h] && b.test(d[h]) ? ClassManager.compileSuper(d[h], h, e.id) : "function" == typeof d[h] && "function" == typeof f[h] && b.test(d[h]) ? function (a, b) {
            return function () {
                var c = this._super;
                this._super = f[a];
                var d = b.apply(this, arguments);
                this._super = c;
                return d
            }
        }(h, d[h]) : d[h];
        g.__pid = e.id;
        e.prototype = g;
        e.prototype.constructor = e;
        e.extend = arguments.callee;
        e.implement = function (a) {
            for (var b in a)g[b] = a[b]
        };
        return e
    }
})();
cc.inherits = function (a, b) {
    function c() {
    }

    c.prototype = b.prototype;
    a.superClass_ = b.prototype;
    a.prototype = new c;
    a.prototype.constructor = a
};
cc.base = function (a, b, c) {
    var d = arguments.callee.caller;
    if (d.superClass_)return ret = d.superClass_.constructor.apply(a, Array.prototype.slice.call(arguments, 1));
    for (var e = Array.prototype.slice.call(arguments, 2), f = !1, g = a.constructor; g; g = g.superClass_ && g.superClass_.constructor)if (g.prototype[b] === d)f = !0; else if (f)return g.prototype[b].apply(a, e);
    if (a[b] === d)return a.constructor.prototype[b].apply(a, e);
    throw Error("cc.base called from a method of one name to a method of a different name");
};
cc.clone = function (a) {
    var b = a instanceof Array ? [] : {}, c;
    for (c in a) {
        var d = a[c];
        b[c] = d instanceof Array ? cc.clone(d) : "object" == typeof d && !(d instanceof cc.Node) && !(d instanceof HTMLElement) ? cc.clone(d) : d
    }
    return b
};
cc.associateWithNative = function () {
};
cc.IS_SHOW_DEBUG_ON_PAGE = cc.IS_SHOW_DEBUG_ON_PAGE || !1;
cc._logToWebPage = function (a) {
    var b = document.getElementById("logInfoList");
    if (!b) {
        var c = document.createElement("Div");
        c.setAttribute("id", "logInfoDiv");
        cc.canvas.parentNode.appendChild(c);
        c.setAttribute("width", "300");
        c.setAttribute("height", cc.canvas.height);
        c.style.zIndex = "99999";
        c.style.position = "absolute";
        c.style.top = "0";
        c.style.left = "0";
        b = document.createElement("ul");
        c.appendChild(b);
        b.setAttribute("id", "logInfoList");
        b.style.height = "450px";
        b.style.color = "#fff";
        b.style.textAlign = "left";
        b.style.listStyle =
            "disc outside";
        b.style.fontSize = "12px";
        b.style.fontFamily = "arial";
        b.style.padding = "0 0 0 20px";
        b.style.margin = "0";
        b.style.textShadow = "0 0 3px #000";
        b.style.zIndex = "99998";
        b.style.position = "absolute";
        b.style.top = "0";
        b.style.left = "0";
        b.style.overflowY = "hidden";
        var d = document.createElement("Div");
        c.appendChild(d);
        d.style.width = "300px";
        d.style.height = cc.canvas.height + "px";
        d.style.opacity = "0.1";
        d.style.background = "#fff";
        d.style.border = "1px solid #dfdfdf";
        d.style.borderRadius = "8px"
    }
    c = document.createElement("li");
    c.innerHTML = a;
    0 == b.childNodes.length ? b.appendChild(c) : b.insertBefore(c, b.childNodes[0])
};
cc.log = function (a) {
    cc.IS_SHOW_DEBUG_ON_PAGE ? cc._logToWebPage(a) : console.log(a)
};
cc.MessageBox = function (a) {
    console.log(a)
};
cc.Assert = function (a, b) {
    "function" == typeof console.assert ? console.assert(a, b) : a || b && alert(b)
};
cc.initDebugSetting = function () {
    0 == cc.COCOS2D_DEBUG ? (cc.log = function () {
    }, cc.logINFO = function () {
    }, cc.logERROR = function () {
    }, cc.Assert = function () {
    }) : 1 == cc.COCOS2D_DEBUG ? (cc.logINFO = cc.log, cc.logERROR = function () {
    }) : 1 < cc.COCOS2D_DEBUG && (cc.logINFO = cc.log, cc.logERROR = cc.log)
};
cc.LANGUAGE_ENGLISH = 0;
cc.LANGUAGE_CHINESE = 1;
cc.LANGUAGE_FRENCH = 2;
cc.LANGUAGE_ITALIAN = 3;
cc.LANGUAGE_GERMAN = 4;
cc.LANGUAGE_SPANISH = 5;
cc.LANGUAGE_RUSSIAN = 6;
cc.timeval = cc.Class.extend({tv_sec: 0, tv_usec: 0});
cc.Time = {};
cc.Time.gettimeofdayCocos2d = function (a) {
    var a = a || new cc.timeval, b = Date.now();
    a.tv_usec = 1E3 * (b % 1E3);
    a.tv_sec = Math.floor(b / 1E3);
    return a
};
cc.Time.now = function () {
    return Date.now()
};
cc.Time.timersubCocos2d = function (a, b) {
    if (!c || !a || !b)return-1;
    if (a instanceof cc.timeval && b instanceof cc.timeval) {
        var c = new cc.timeval;
        c.tv_sec = b.tv_sec - a.tv_sec;
        c.tv_usec = b.tv_usec - a.tv_usec;
        b.tv_usec < a.tv_usec && (c.tv_usec += 1E6, c.tv_sec--);
        return c
    }
    if (!isNaN(a) && !isNaN(b))return b - a
};
cc.Browser = {};
(function () {
    cc.Browser.ua = navigator.userAgent.toLowerCase();
    cc.Browser.platform = navigator.platform.toLowerCase();
    cc.Browser.UA = cc.Browser.ua.match(/(opera|ie|firefox|chrome|version)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|$)/) || [null, "unknown", 0];
    cc.Browser.mode = "ie" == cc.Browser.UA[1] && document.documentMode;
    cc.Browser.type = "version" == cc.Browser.UA[1] ? cc.Browser.UA[3] : cc.Browser.UA[1];
    cc.Browser.isMobile = -1 != cc.Browser.ua.indexOf("mobile") || -1 != cc.Browser.ua.indexOf("android")
})();
cc.$ = function (a) {
    var b = this == cc ? document : this;
    if (a = a instanceof HTMLElement ? a : b.querySelector(a))a.find = a.find || cc.$, a.hasClass = a.hasClass || function (a) {
        return this.className.match(RegExp("(\\s|^)" + a + "(\\s|$)"))
    }, a.addClass = a.addClass || function (a) {
        this.hasClass(a) || (this.className && (this.className += " "), this.className += a);
        return this
    }, a.removeClass = a.removeClass || function (a) {
        this.hasClass(a) && (this.className = this.className.replace(a, ""));
        return this
    }, a.remove = a.remove || function () {
        this.parentNode &&
        this.parentNode.removeChild(this);
        return this
    }, a.appendTo = a.appendTo || function (a) {
        a.appendChild(this);
        return this
    }, a.prependTo = a.prependTo || function (a) {
        a.childNodes[0] ? a.insertBefore(this, a.childNodes[0]) : a.appendChild(this);
        return this
    }, a.transforms = a.transforms || function () {
        this.style[cc.$.trans] = cc.$.translate(this.position) + cc.$.rotate(this.rotation) + cc.$.scale(this.scale) + cc.$.skew(this.skew);
        return this
    }, a.position = a.position || {x: 0, y: 0}, a.rotation = a.rotation || 0, a.scale = a.scale || {x: 1, y: 1}, a.skew =
        a.skew || {x: 0, y: 0}, a.translates = function (a, b) {
        this.position.x = a;
        this.position.y = b;
        this.transforms();
        return this
    }, a.rotate = function (a) {
        this.rotation = a;
        this.transforms();
        return this
    }, a.resize = function (a, b) {
        this.scale.x = a;
        this.scale.y = b;
        this.transforms();
        return this
    }, a.setSkew = function (a, b) {
        this.skew.x = a;
        this.skew.y = b;
        this.transforms();
        return this
    };
    return a
};
switch (cc.Browser.type) {
    case "firefox":
        cc.$.pfx = "Moz";
        cc.$.hd = !0;
        break;
    case "chrome":
    case "safari":
        cc.$.pfx = "webkit";
        cc.$.hd = !0;
        break;
    case "opera":
        cc.$.pfx = "O";
        cc.$.hd = !1;
        break;
    case "ie":
        cc.$.pfx = "ms", cc.$.hd = !1
}
cc.$.trans = cc.$.pfx + "Transform";
cc.$.translate = cc.$.hd ? function (a) {
    return"translate3d(" + a.x + "px, " + a.y + "px, 0) "
} : function (a) {
    return"translate(" + a.x + "px, " + a.y + "px) "
};
cc.$.rotate = cc.$.hd ? function (a) {
    return"rotateZ(" + a + "deg) "
} : function (a) {
    return"rotate(" + a + "deg) "
};
cc.$.scale = function (a) {
    return"scale(" + a.x + ", " + a.y + ") "
};
cc.$.skew = function (a) {
    return"skewX(" + -a.x + "deg) skewY(" + a.y + "deg)"
};
cc.$new = function (a) {
    return cc.$(document.createElement(a))
};
cc.$.findpos = function (a) {
    var b = 0, c = 0;
    do b += a.offsetLeft, c += a.offsetTop; while (a = a.offsetParent);
    return{x: b, y: c}
};
cc.Point = function (a, b) {
    this.x = a || 0;
    this.y = b || 0
};
cc.PointMake = function (a, b) {
    return new cc.Point(a, b)
};
cc.p = function (a, b) {
    return{x: a, y: b}
};
cc._p = cc.p;
cc.PointZero = function () {
    return cc.p(0, 0)
};
Object.defineProperties(cc, {POINT_ZERO: {get: function () {
    return cc.p(0, 0)
}}, SIZE_ZERO: {get: function () {
    return cc.size(0, 0)
}}, RECT_ZERO: {get: function () {
    return cc.rect(0, 0, 0, 0)
}}});
cc.pointEqualToPoint = function (a, b) {
    return!a || !b ? !1 : a.x == b.x && a.y == b.y
};
cc.Point.CCPointEqualToPoint = cc.pointEqualToPoint;
cc.Size = function (a, b) {
    this.width = a || 0;
    this.height = b || 0
};
cc.SizeMake = function (a, b) {
    return cc.size(a, b)
};
cc.size = function (a, b) {
    return{width: a, height: b}
};
cc._size = cc.size;
cc.SizeZero = function () {
    return cc.size(0, 0)
};
cc.sizeEqualToSize = function (a, b) {
    return!a || !b ? !1 : a.width == b.width && a.height == b.height
};
cc.Size.CCSizeEqualToSize = cc.sizeEqualToSize;
cc.Rect = function (a, b, c, d) {
    switch (arguments.length) {
        case 0:
            this.origin = cc.p(0, 0);
            this.size = cc.size(0, 0);
            break;
        case 1:
            if (a)if (a instanceof cc.Rect)this.origin = cc.p(a.origin.x, a.origin.y), this.size = cc.size(a.size.width, a.size.height); else throw"unknown argument type"; else this.origin = cc.p(0, 0), this.size = cc.size(0, 0);
            break;
        case 2:
            this.origin = a ? cc.p(a.x, a.y) : cc.p(0, 0);
            this.size = b ? cc.size(b.width, b.height) : cc.size(0, 0);
            break;
        case 4:
            this.origin = cc.p(a || 0, b || 0);
            this.size = cc.size(c || 0, d || 0);
            break;
        default:
            throw"unknown argument type";
    }
};
cc.RectMake = function (a, b, c, d) {
    return cc.rect(a, b, c, d)
};
cc.rect = function (a, b, c, d) {
    return new cc.Rect(a, b, c, d)
};
cc._rect = cc.rect;
cc.RectZero = function () {
    return cc.rect(0, 0, 0, 0)
};
cc.rectEqualToRect = function (a, b) {
    return!a || !b ? !1 : cc.Point.CCPointEqualToPoint(a.origin, b.origin) && cc.Size.CCSizeEqualToSize(a.size, b.size)
};
cc.rectContainsRect = function (a, b) {
    return!a || !b || a.origin.x >= b.origin.x || a.origin.y >= b.origin.y || a.origin.x + a.size.width <= b.origin.x + b.size.width || a.origin.y + a.size.height <= b.origin.y + b.size.height ? !1 : !0
};
cc.rectGetMaxX = function (a) {
    return a.origin.x + a.size.width
};
cc.rectGetMidX = function (a) {
    return a.origin.x + a.size.width / 2
};
cc.rectGetMinX = function (a) {
    return a.origin.x
};
cc.rectGetMaxY = function (a) {
    return a.origin.y + a.size.height
};
cc.rectGetMidY = function (a) {
    return a.origin.y + a.size.height / 2
};
cc.rectGetMinY = function (a) {
    return a.origin.y
};
cc.rectContainsPoint = function (a, b) {
    var c = !1;
    b.x >= cc.Rect.CCRectGetMinX(a) && (b.x <= cc.Rect.CCRectGetMaxX(a) && b.y >= cc.Rect.CCRectGetMinY(a) && b.y <= cc.Rect.CCRectGetMaxY(a)) && (c = !0);
    return c
};
cc.rectIntersectsRect = function (a, b) {
    return!(cc.Rect.CCRectGetMaxX(a) < cc.Rect.CCRectGetMinX(b) || cc.Rect.CCRectGetMaxX(b) < cc.Rect.CCRectGetMinX(a) || cc.Rect.CCRectGetMaxY(a) < cc.Rect.CCRectGetMinY(b) || cc.Rect.CCRectGetMaxY(b) < cc.Rect.CCRectGetMinY(a))
};
cc.rectOverlapsRect = function (a, b) {
    return a.origin.x + a.size.width < b.origin.x || b.origin.x + b.size.width < a.origin.x || a.origin.y + a.size.height < b.origin.y || b.origin.y + b.size.height < a.origin.y ? !1 : !0
};
cc.rectUnion = function (a, b) {
    var c = cc.rect(0, 0, 0, 0);
    c.origin.x = Math.min(a.origin.x, b.origin.x);
    c.origin.y = Math.min(a.origin.y, b.origin.y);
    c.size.width = Math.max(a.origin.x + a.size.width, b.origin.x + b.size.width) - c.origin.x;
    c.size.height = Math.max(a.origin.y + a.size.height, b.origin.y + b.size.height) - c.origin.y;
    return c
};
cc.rectIntersection = function (a, b) {
    var c = cc.rect(Math.max(cc.Rect.CCRectGetMinX(a), cc.Rect.CCRectGetMinX(b)), Math.max(cc.Rect.CCRectGetMinY(a), cc.Rect.CCRectGetMinY(b)), 0, 0);
    c.size.width = Math.min(cc.Rect.CCRectGetMaxX(a), cc.Rect.CCRectGetMaxX(b)) - cc.Rect.CCRectGetMinX(c);
    c.size.height = Math.min(cc.Rect.CCRectGetMaxY(a), cc.Rect.CCRectGetMaxY(b)) - cc.Rect.CCRectGetMinY(c);
    return c
};
cc.Rect.prototype.getX = function () {
    return this.origin.x
};
cc.Rect.prototype.setX = function (a) {
    this.origin.x = a
};
cc.Rect.prototype.getY = function () {
    return this.origin.y
};
cc.Rect.prototype.setY = function (a) {
    this.origin.y = a
};
cc.Rect.prototype.getWidth = function () {
    return this.size.width
};
cc.Rect.prototype.setWidth = function (a) {
    this.size.width = a
};
cc.Rect.prototype.getHeight = function () {
    return this.size.height
};
cc.Rect.prototype.setHeight = function (a) {
    this.size.height = a
};
Object.defineProperties(cc.Rect.prototype, {x: {get: function () {
    return this.getX()
}, set: function (a) {
    this.setX(a)
}, enumerable: !0, configurable: !0}, y: {get: function () {
    return this.getY()
}, set: function (a) {
    this.setY(a)
}, enumerable: !0, configurable: !0}, width: {get: function () {
    return this.getWidth()
}, set: function (a) {
    this.setWidth(a)
}, enumerable: !0, configurable: !0}, height: {get: function () {
    return this.getHeight()
}, set: function (a) {
    this.setHeight(a)
}, enumerable: !0, configurable: !0}});
cc.Rect.CCRectEqualToRect = cc.rectEqualToRect;
cc.Rect.CCRectContainsRect = cc.rectContainsRect;
cc.Rect.CCRectGetMaxX = cc.rectGetMaxX;
cc.Rect.CCRectGetMidX = cc.rectGetMidX;
cc.Rect.CCRectGetMinX = cc.rectGetMinX;
cc.Rect.CCRectGetMaxY = cc.rectGetMaxY;
cc.Rect.CCRectGetMidY = cc.rectGetMidY;
cc.Rect.CCRectGetMinY = cc.rectGetMinY;
cc.Rect.CCRectContainsPoint = cc.rectContainsPoint;
cc.Rect.CCRectIntersectsRect = cc.rectIntersectsRect;
cc.Rect.CCRectUnion = cc.rectUnion;
cc.Rect.CCRectIntersection = cc.rectIntersection;
cc.Set = cc.Class.extend({ctor: function (a) {
    this._set = a ? [].concat(a._set) : []
}, copy: function () {
    return new cc.Set(this)
}, mutableCopy: function () {
    return this.copy()
}, count: function () {
    return this._set.length
}, addObject: function (a) {
    cc.ArrayContainsObject(this._set, a) || (this._set.push(a), this._set.sort(function (a, c) {
        return a - c
    }))
}, removeObject: function (a) {
    for (var b = 0, c = 0, d = 0; c < this._set.length; c++)this._set[c] != a && (this._set[d++] = this._set[c], b++);
    this._set.length = b
}, begin: function () {
    return this._set && 0 < this._set.length ?
        this._set[0] : null
}, end: function () {
    return this._set && 0 < this._set.length ? this._set[this._set.length - 1] : null
}, containsObject: function (a) {
    return cc.ArrayContainsObject(this._set, a)
}, anyObject: function () {
    return this._set && 0 < this._set.length ? this._set[0] : null
}, _set: null});
cc.NSMutableSet = cc.Set;
cc.splitWithForm = function (a, b) {
    if (a && 0 != a.length) {
        var c = a.indexOf("{"), d = a.indexOf("}");
        if (!(-1 == c || -1 == d) && !(c > d))if (c = a.substr(c + 1, d - c - 1), 0 != c.length) {
            var d = c.indexOf("{"), e = c.indexOf("}");
            -1 != d || -1 != e || (b = c.split(","))
        }
    }
    return b
};
cc.RectFromString = function (a) {
    var b = cc.RectZero();
    if (a) {
        var c = a.indexOf("{") + 1, d = a.lastIndexOf("}", a.length);
        -1 == c || -1 == d || (a = a.substring(c, d), c = a.indexOf("}"), -1 != c && (c = a.indexOf(",", c), -1 != c && (b = a.substr(0, c), a = a.substr(c + 1, a.length - c), c = cc.splitWithForm(b), b = cc.splitWithForm(a), a = parseFloat(c[0]), c = parseFloat(c[1]), d = parseFloat(b[0]), b = parseFloat(b[1]), b = cc.rect(a, c, d, b))))
    }
    return b
};
cc.PointFromString = function (a) {
    var b = cc.PointZero();
    try {
        if ("" == a)return b;
        var c = cc.splitWithForm(a), d = parseFloat(c[0]), e = parseFloat(c[1]), b = cc.p(d, e)
    } catch (f) {
    }
    return b
};
cc.SizeFromString = function (a) {
    var b = cc.SizeZero();
    try {
        if ("" == a)return b;
        var c = cc.splitWithForm(a), d = parseFloat(c[0]), e = parseFloat(c[1]), b = cc.size(d, e)
    } catch (f) {
    }
    return b
};
cc.Color3B = function (a, b, c) {
    switch (arguments.length) {
        case 0:
            this.b = this.g = this.r = 0;
            break;
        case 1:
            a && a instanceof cc.Color3B ? (this.r = 0 | a.r || 0, this.g = 0 | a.g || 0, this.b = 0 | a.b || 0) : this.b = this.g = this.r = 0;
            break;
        case 3:
            this.r = 0 | a || 0;
            this.g = 0 | b || 0;
            this.b = 0 | c || 0;
            break;
        default:
            throw"unknown argument type";
    }
};
cc.c3b = function (a, b, c) {
    return new cc.Color3B(a, b, c)
};
cc.integerToColor3B = function (a) {
    var a = a || 0, b = new cc.Color3B;
    b.r = a & 255;
    b.g = a >> 8 & 255;
    b.b = a >> 16 & 255;
    return b
};
cc.c3 = cc.c3b;
Object.defineProperties(cc, {WHITE: {get: function () {
    return cc.c3b(255, 255, 255)
}}, YELLOW: {get: function () {
    return cc.c3b(255, 255, 0)
}}, BLUE: {get: function () {
    return cc.c3b(0, 0, 255)
}}, GREEN: {get: function () {
    return cc.c3b(0, 255, 0)
}}, RED: {get: function () {
    return cc.c3b(255, 0, 0)
}}, MAGENTA: {get: function () {
    return cc.c3b(255, 0, 255)
}}, BLACK: {get: function () {
    return cc.c3b(0, 0, 0)
}}, ORANGE: {get: function () {
    return cc.c3b(255, 127, 0)
}}, GRAY: {get: function () {
    return cc.c3b(166, 166, 166)
}}});
cc.white = function () {
    return new cc.Color3B(255, 255, 255)
};
cc.yellow = function () {
    return new cc.Color3B(255, 255, 0)
};
cc.blue = function () {
    return new cc.Color3B(0, 0, 255)
};
cc.green = function () {
    return new cc.Color3B(0, 255, 0)
};
cc.red = function () {
    return new cc.Color3B(255, 0, 0)
};
cc.magenta = function () {
    return new cc.Color3B(255, 0, 255)
};
cc.black = function () {
    return new cc.Color3B(0, 0, 0)
};
cc.orange = function () {
    return new cc.Color3B(255, 127, 0)
};
cc.gray = function () {
    return new cc.Color3B(166, 166, 166)
};
cc.Color4B = function (a, b, c, d) {
    this.r = 0 | a;
    this.g = 0 | b;
    this.b = 0 | c;
    this.a = 0 | d
};
cc.c4b = function (a, b, c, d) {
    return new cc.Color4B(a, b, c, d)
};
cc.c4 = cc.c4b;
cc.Color4F = function (a, b, c, d) {
    this.r = a;
    this.g = b;
    this.b = c;
    this.a = d
};
cc.c4f = function (a, b, c, d) {
    return new cc.Color4F(a, b, c, d)
};
cc.c4FFromccc3B = function (a) {
    return new cc.Color4F(a.r / 255, a.g / 255, a.b / 255, 1)
};
cc.c4FFromccc4B = function (a) {
    return new cc.Color4F(a.r / 255, a.g / 255, a.b / 255, a.a / 255)
};
cc.c4FEqual = function (a, b) {
    return a.r == b.r && a.g == b.g && a.b == b.b && a.a == b.a
};
cc.Vertex2F = function (a, b) {
    this.x = a || 0;
    this.y = b || 0
};
cc.Vertex2 = function (a, b) {
    return new cc.Vertex2F(a, b)
};
cc.Vertex3F = function (a, b, c) {
    this.x = a || 0;
    this.y = b || 0;
    this.z = c || 0
};
cc.vertex3 = function (a, b, c) {
    return new cc.Vertex3F(a, b, c)
};
cc.Tex2F = function (a, b) {
    this.u = a || 0;
    this.v = b || 0
};
cc.tex2 = function (a, b) {
    return new cc.Tex2F(a, b)
};
cc.PointSprite = function (a, b, c) {
    this.pos = a || new cc.Vertex2F(0, 0);
    this.color = b || new cc.Color4B(0, 0, 0, 0);
    this.size = c || 0
};
cc.Quad2 = function (a, b, c, d) {
    this.tl = a || new cc.Vertex2F(0, 0);
    this.tr = b || new cc.Vertex2F(0, 0);
    this.bl = c || new cc.Vertex2F(0, 0);
    this.br = d || new cc.Vertex2F(0, 0)
};
cc.Quad3 = function (a, b, c, d) {
    this.bl = a || new cc.Vertex3F(0, 0, 0);
    this.br = b || new cc.Vertex3F(0, 0, 0);
    this.tl = c || new cc.Vertex3F(0, 0, 0);
    this.tr = d || new cc.Vertex3F(0, 0, 0)
};
cc.GridSize = function (a, b) {
    this.x = a;
    this.y = b
};
cc.g = function (a, b) {
    return new cc.GridSize(a, b)
};
cc.V2F_C4B_T2F = function (a, b, c) {
    this.vertices = a || new cc.Vertex2F(0, 0);
    this.colors = b || new cc.Color4B(0, 0, 0, 0);
    this.texCoords = c || new cc.Tex2F(0, 0)
};
cc.V2F_C4F_T2F = function (a, b, c) {
    this.vertices = a || new cc.Vertex2F(0, 0);
    this.colors = b || new cc.Color4F(0, 0, 0, 0);
    this.texCoords = c || new cc.Tex2F(0, 0)
};
cc.V3F_C4B_T2F = function (a, b, c) {
    this.vertices = a || new cc.Vertex3F(0, 0, 0);
    this.colors = b || new cc.Color4B(0, 0, 0, 0);
    this.texCoords = c || new cc.Tex2F(0, 0)
};
cc.V2F_C4B_T2F_Quad = function (a, b, c, d) {
    this.bl = a || new cc.V2F_C4B_T2F;
    this.br = b || new cc.V2F_C4B_T2F;
    this.tl = c || new cc.V2F_C4B_T2F;
    this.tr = d || new cc.V2F_C4B_T2F
};
cc.V2F_C4B_T2F_QuadZero = function () {
    return new cc.V2F_C4B_T2F_Quad(new cc.V2F_C4B_T2F(new cc.Vertex2F(0, 0), new cc.Color4B(0, 0, 0, 255), new cc.Tex2F(0, 0)), new cc.V2F_C4B_T2F(new cc.Vertex2F(0, 0), new cc.Color4B(0, 0, 0, 255), new cc.Tex2F(0, 0)), new cc.V2F_C4B_T2F(new cc.Vertex2F(0, 0), new cc.Color4B(0, 0, 0, 255), new cc.Tex2F(0, 0)), new cc.V2F_C4B_T2F(new cc.Vertex2F(0, 0), new cc.Color4B(0, 0, 0, 255), new cc.Tex2F(0, 0)))
};
cc.V3F_C4B_T2F_Quad = function (a, b, c, d) {
    this.tl = a || new cc.V3F_C4B_T2F;
    this.bl = b || new cc.V3F_C4B_T2F;
    this.tr = c || new cc.V3F_C4B_T2F;
    this.br = d || new cc.V3F_C4B_T2F
};
cc.V3F_C4B_T2F_QuadZero = function () {
    return new cc.V3F_C4B_T2F_Quad(new cc.V3F_C4B_T2F(new cc.Vertex3F(0, 0, 0), new cc.Color4B(0, 0, 0, 255), new cc.Tex2F(0, 0)), new cc.V3F_C4B_T2F(new cc.Vertex3F(0, 0, 0), new cc.Color4B(0, 0, 0, 255), new cc.Tex2F(0, 0)), new cc.V3F_C4B_T2F(new cc.Vertex3F(0, 0, 0), new cc.Color4B(0, 0, 0, 255), new cc.Tex2F(0, 0)), new cc.V3F_C4B_T2F(new cc.Vertex3F(0, 0, 0), new cc.Color4B(0, 0, 0, 255), new cc.Tex2F(0, 0)))
};
cc.V2F_C4F_T2F_Quad = function (a, b, c, d) {
    this.bl = a || new cc.V2F_C4F_T2F;
    this.br = b || new cc.V2F_C4F_T2F;
    this.tl = c || new cc.V2F_C4F_T2F;
    this.tr = d || new cc.V2F_C4F_T2F
};
cc.BlendFunc = function (a, b) {
    this.src = a;
    this.dst = b
};
cc.convertColor3BtoHexString = function (a) {
    var b = a.r.toString(16), c = a.g.toString(16), d = a.b.toString(16);
    return"#" + (16 > a.r ? "0" + b : b) + (16 > a.g ? "0" + c : c) + (16 > a.b ? "0" + d : d)
};
cc.convertHexNumToColor3B = function (a) {
    var b = a.substr(1).split(""), a = parseInt("0x" + b[0] + b[1]), c = parseInt("0x" + b[2] + b[3]), b = parseInt("0x" + b[4] + b[5]);
    return new cc.Color3B(a, c, b)
};
cc.TEXT_ALIGNMENT_LEFT = 0;
cc.TEXT_ALIGNMENT_CENTER = 1;
cc.TEXT_ALIGNMENT_RIGHT = 2;
cc.VERTICAL_TEXT_ALIGNMENT_TOP = 0;
cc.VERTICAL_TEXT_ALIGNMENT_CENTER = 1;
cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM = 2;
cc.AffineTransform = function (a, b, c, d, e, f) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.tx = e;
    this.ty = f
};
cc.__AffineTransformMake = function (a, b, c, d, e, f) {
    return new cc.AffineTransform(a, b, c, d, e, f)
};
cc.AffineTransformMake = function (a, b, c, d, e, f) {
    return new cc.AffineTransform(a, b, c, d, e, f)
};
cc.__PointApplyAffineTransform = function (a, b) {
    var c = cc.p(0, 0);
    c.x = b.a * a.x + b.c * a.y + b.tx;
    c.y = b.b * a.x + b.d * a.y + b.ty;
    return c
};
cc.PointApplyAffineTransform = function (a, b) {
    return cc.__PointApplyAffineTransform(a, b)
};
cc.__SizeApplyAffineTransform = function (a, b) {
    var c = cc.size(0, 0);
    c.width = b.a * a.width + b.c * a.height;
    c.height = b.b * a.width + b.d * a.height;
    return c
};
cc.SizeApplyAffineTransform = function (a, b) {
    return cc.__SizeApplyAffineTransform(a, b)
};
cc.AffineTransformMakeIdentity = function () {
    return cc.__AffineTransformMake(1, 0, 0, 1, 0, 0)
};
cc.AffineTransformIdentity = function () {
    return cc.AffineTransformMakeIdentity()
};
cc.RectApplyAffineTransform = function (a, b) {
    var c = cc.Rect.CCRectGetMinY(a), d = cc.Rect.CCRectGetMinX(a), e = cc.Rect.CCRectGetMaxX(a), f = cc.Rect.CCRectGetMaxY(a), g = cc.PointApplyAffineTransform(cc.p(d, c), b), c = cc.PointApplyAffineTransform(cc.p(e, c), b), d = cc.PointApplyAffineTransform(cc.p(d, f), b), h = cc.PointApplyAffineTransform(cc.p(e, f), b), e = Math.min(Math.min(g.x, c.x), Math.min(d.x, h.x)), f = Math.max(Math.max(g.x, c.x), Math.max(d.x, h.x)), k = Math.min(Math.min(g.y, c.y), Math.min(d.y, h.y)), g = Math.max(Math.max(g.y, c.y),
        Math.max(d.y, h.y));
    return cc.rect(e, k, f - e, g - k)
};
cc.AffineTransformTranslate = function (a, b, c) {
    return cc.__AffineTransformMake(a.a, a.b, a.c, a.d, a.tx + a.a * b + a.c * c, a.ty + a.b * b + a.d * c)
};
cc.AffineTransformScale = function (a, b, c) {
    return cc.__AffineTransformMake(a.a * b, a.b * b, a.c * c, a.d * c, a.tx, a.ty)
};
cc.AffineTransformRotate = function (a, b) {
    var c = Math.sin(b), d = Math.cos(b);
    return cc.__AffineTransformMake(a.a * d + a.c * c, a.b * d + a.d * c, a.c * d - a.a * c, a.d * d - a.b * c, a.tx, a.ty)
};
cc.AffineTransformConcat = function (a, b) {
    return cc.__AffineTransformMake(a.a * b.a + a.b * b.c, a.a * b.b + a.b * b.d, a.c * b.a + a.d * b.c, a.c * b.b + a.d * b.d, a.tx * b.a + a.ty * b.c + b.tx, a.tx * b.b + a.ty * b.d + b.ty)
};
cc.AffineTransformEqualToTransform = function (a, b) {
    return a.a == b.a && a.b == b.b && a.c == b.c && a.d == b.d && a.tx == b.tx && a.ty == b.ty
};
cc.AffineTransformInvert = function (a) {
    var b = 1 / (a.a * a.d - a.b * a.c);
    return cc.__AffineTransformMake(b * a.d, -b * a.b, -b * a.c, b * a.a, b * (a.c * a.ty - a.d * a.tx), b * (a.b * a.tx - a.a * a.ty))
};
cc.POINT_EPSILON = parseFloat("1.192092896e-07F");
cc.pNeg = function (a) {
    return cc.p(-a.x, -a.y)
};
cc.pAdd = function (a, b) {
    return cc.p(a.x + b.x, a.y + b.y)
};
cc.pSub = function (a, b) {
    return cc.p(a.x - b.x, a.y - b.y)
};
cc.pMult = function (a, b) {
    return cc.p(a.x * b, a.y * b)
};
cc.pMidpoint = function (a, b) {
    return cc.pMult(cc.pAdd(a, b), 0.5)
};
cc.pDot = function (a, b) {
    return a.x * b.x + a.y * b.y
};
cc.pCross = function (a, b) {
    return a.x * b.y - a.y * b.x
};
cc.pPerp = function (a) {
    return cc.p(-a.y, a.x)
};
cc.pRPerp = function (a) {
    return cc.p(a.y, -a.x)
};
cc.pProject = function (a, b) {
    return cc.pMult(b, cc.pDot(a, b) / cc.pDot(b, b))
};
cc.pRotate = function (a, b) {
    return cc.p(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x)
};
cc.pUnrotate = function (a, b) {
    return cc.p(a.x * b.x + a.y * b.y, a.y * b.x - a.x * b.y)
};
cc.pLengthSQ = function (a) {
    return cc.pDot(a, a)
};
cc.pLength = function (a) {
    return Math.sqrt(cc.pLengthSQ(a))
};
cc.pDistance = function (a, b) {
    return cc.pLength(cc.pSub(a, b))
};
cc.pNormalize = function (a) {
    return cc.pMult(a, 1 / cc.pLength(a))
};
cc.pForAngle = function (a) {
    return cc.p(Math.cos(a), Math.sin(a))
};
cc.pToAngle = function (a) {
    return Math.atan2(a.y, a.x)
};
cc.clampf = function (a, b, c) {
    if (b > c)var d = b, b = c, c = d;
    return a < b ? b : a < c ? a : c
};
cc.pClamp = function (a, b, c) {
    return cc.p(cc.clampf(a.x, b.x, c.x), cc.clampf(a.y, b.y, c.y))
};
cc.pFromSize = function (a) {
    return cc.p(a.width, a.height)
};
cc.pCompOp = function (a, b) {
    return cc.p(b(a.x), b(a.y))
};
cc.pLerp = function (a, b, c) {
    return cc.pAdd(cc.pMult(a, 1 - c), cc.pMult(b, c))
};
cc.pFuzzyEqual = function (a, b, c) {
    return a.x - c <= b.x && b.x <= a.x + c && a.y - c <= b.y && b.y <= a.y + c ? !0 : !1
};
cc.pCompMult = function (a, b) {
    return cc.p(a.x * b.x, a.y * b.y)
};
cc.pAngleSigned = function (a, b) {
    var c = cc.pNormalize(a), d = cc.pNormalize(b), c = Math.atan2(c.x * d.y - c.y * d.x, cc.pDot(c, d));
    return Math.abs(c) < cc.POINT_EPSILON ? 0 : c
};
cc.pAngle = function (a, b) {
    var c = Math.acos(cc.pDot(cc.pNormalize(a), cc.pNormalize(b)));
    return Math.abs(c) < cc.POINT_EPSILON ? 0 : c
};
cc.pRotateByAngle = function (a, b, c) {
    var a = cc.pSub(a, b), d = Math.cos(c), c = Math.sin(c), e = a.x;
    a.x = e * d - a.y * c + b.x;
    a.y = e * c + a.y * d + b.y;
    return a
};
cc.pLineIntersect = function (a, b, c, d, e) {
    if (a.x == b.x && a.y == b.y || c.x == d.x && c.y == d.y)return!1;
    var f = b.x - a.x, b = b.y - a.y, g = d.x - c.x, d = d.y - c.y, h = a.x - c.x, a = a.y - c.y, c = d * f - g * b;
    e.x = g * a - d * h;
    e.y = f * a - b * h;
    if (0 == c)return 0 == e.x || 0 == e.y ? !0 : !1;
    e.x /= c;
    e.y /= c;
    return!0
};
cc.pSegmentIntersect = function (a, b, c, d) {
    var e = cc.p(0, 0);
    return cc.pLineIntersect(a, b, c, d, e) && 0 <= e.x && 1 >= e.x && 0 <= e.y && 1 >= e.y ? !0 : !1
};
cc.pIntersectPoint = function (a, b, c, d) {
    var e = cc.p(0, 0);
    return cc.pLineIntersect(a, b, c, d, e) ? (c = cc.p(0, 0), c.x = a.x + e.x * (b.x - a.x), c.y = a.y + e.x * (b.y - a.y), c) : cc.PointZero()
};
cc.pSameAs = function (a, b) {
    return a.x && b.x ? a.x == b.x && a.y == b.y : !1
};
cc.NODE_TAG_INVALID = -1;
cc.NODE_ON_ENTER = null;
cc.NODE_ON_EXIT = null;
cc.saveContext = function () {
    cc.renderContextType == cc.CANVAS && cc.renderContext.save()
};
cc.restoreContext = function () {
    cc.renderContextType == cc.CANVAS && cc.renderContext.restore()
};
cc.s_globalOrderOfArrival = 1;
cc.Node = cc.Class.extend({_zOrder: 0, _vertexZ: 0, _rotation: 0, _scaleX: 1, _scaleY: 1, _position: cc.p(0, 0), _skewX: 0, _skewY: 0, _children: null, _camera: null, _grid: null, _visible: !0, _anchorPoint: cc.p(0, 0), _anchorPointInPoints: cc.p(0, 0), _contentSize: cc.SizeZero(), _running: !1, _parent: null, _ignoreAnchorPointForPosition: !1, _tag: cc.NODE_TAG_INVALID, _userData: null, _userObject: null, _transformDirty: !0, _inverseDirty: !0, _cacheDirty: !0, _transformGLDirty: null, _transform: null, _inverse: null, _reorderChildDirty: !1, _shaderProgram: null,
    _orderOfArrival: 0, _glServerState: null, _actionManager: null, _scheduler: null, _initializedNode: !1, ctor: function () {
        this._initNode()
    }, _initNode: function () {
        cc.NODE_TRANSFORM_USING_AFFINE_MATRIX && (this._transformGLDirty = !0);
        this._anchorPoint = cc.p(0, 0);
        this._anchorPointInPoints = cc.p(0, 0);
        this._contentSize = cc.size(0, 0);
        this._position = cc.p(0, 0);
        var a = cc.Director.getInstance();
        this._actionManager = a.getActionManager();
        this.getActionManager = function () {
            return this._actionManager
        };
        this._scheduler = a.getScheduler();
        this.getScheduler = function () {
            return this._scheduler
        };
        this._initializedNode = !0
    }, init: function () {
        !1 === this._initializedNode && this._initNode();
        return!0
    }, _arrayMakeObjectsPerformSelector: function (a, b) {
        if (a && 0 != a.length) {
            var c;
            switch (b) {
                case cc.Node.StateCallbackType.onEnter:
                    for (c = 0; c < a.length; c++)if (a[c])a[c].onEnter();
                    break;
                case cc.Node.StateCallbackType.onExit:
                    for (c = 0; c < a.length; c++)if (a[c])a[c].onExit();
                    break;
                case cc.Node.StateCallbackType.onEnterTransitionDidFinish:
                    for (c = 0; c < a.length; c++)if (a[c])a[c].onEnterTransitionDidFinish();
                    break;
                case cc.Node.StateCallbackType.cleanup:
                    for (c = 0; c < a.length; c++)a[c] && a[c].cleanup();
                    break;
                case cc.Node.StateCallbackType.updateTransform:
                    for (c = 0; c < a.length; c++)a[c] && a[c].updateTransform();
                    break;
                case cc.Node.StateCallbackType.onExitTransitionDidStart:
                    for (c = 0; c < a.length; c++)if (a[c])a[c].onExitTransitionDidStart();
                    break;
                case cc.Node.StateCallbackType.sortAllChildren:
                    for (c = 0; c < a.length; c++)a[c] && a[c].sortAllChildren();
                    break;
                default:
                    throw"Unknown callback function";
            }
        }
    }, _addDirtyRegionToDirector: function () {
    },
    _isInDirtyRegion: function () {
    }, setNodeDirty: function () {
        this._setNodeDirtyForCache();
        this._transformDirty = this._inverseDirty = !0;
        cc.NODE_TRANSFORM_USING_AFFINE_MATRIX && (this._transformGLDirty = !0)
    }, _setNodeDirtyForCache: function () {
        this._cacheDirty = !0;
        this._parent && this._parent._setNodeDirtyForCache()
    }, getSkewX: function () {
        return this._skewX
    }, setSkewX: function (a) {
        this._skewX = a;
        this.setNodeDirty()
    }, getSkewY: function () {
        return this._skewY
    }, setSkewY: function (a) {
        this._skewY = a;
        this.setNodeDirty()
    }, getZOrder: function () {
        return this._zOrder
    },
    _setZOrder: function (a) {
        this._zOrder = a
    }, setZOrder: function (a) {
        this._setZOrder(a);
        this._parent && this._parent.reorderChild(this, a)
    }, getVertexZ: function () {
        return this._vertexZ
    }, setVertexZ: function (a) {
        this._vertexZ = a
    }, getRotation: function () {
        return this._rotation
    }, _rotationRadians: 0, setRotation: function (a) {
        this._rotation != a && (this._rotation = a, this._rotationRadians = this._rotation * (Math.PI / 180), this.setNodeDirty())
    }, getScale: function () {
        cc.Assert(this._scaleX == this._scaleY, "cc.Node#scale. ScaleX != ScaleY. Don't know which one to return");
        return this._scaleX
    }, setScale: function (a, b) {
        this._scaleX = a;
        this._scaleY = b || a;
        this.setNodeDirty()
    }, getScaleX: function () {
        return this._scaleX
    }, setScaleX: function (a) {
        this._scaleX = a;
        this.setNodeDirty()
    }, getScaleY: function () {
        return this._scaleY
    }, setScaleY: function (a) {
        this._scaleY = a;
        this.setNodeDirty()
    }, setPosition: function (a, b) {
        2 == arguments.length ? this._position = new cc.Point(a, b) : 1 == arguments.length && (this._position = new cc.Point(a.x, a.y));
        this.setNodeDirty()
    }, _setPositionByValue: function (a, b) {
        2 == arguments.length ?
            (this._position.x = a, this._position.y = b) : 1 == arguments.length && (this._position.x = a.x, this._position.y = a.y);
        this.setNodeDirty()
    }, getPosition: function () {
        return cc.p(this._position.x, this._position.y)
    }, getPositionX: function () {
        return this._position.x
    }, setPositionX: function (a) {
        this._position.x = a;
        this.setNodeDirty()
    }, getPositionY: function () {
        return this._position.y
    }, setPositionY: function (a) {
        this._position.y = a;
        this.setNodeDirty()
    }, getChildrenCount: function () {
        return this._children ? this._children.length : 0
    }, getChildren: function () {
        this._children ||
        (this._children = []);
        return this._children
    }, getCamera: function () {
        this._camera || (this._camera = new cc.Camera);
        return this._camera
    }, getGrid: function () {
        return this._grid
    }, setGrid: function (a) {
        this._grid = a
    }, isVisible: function () {
        return this._visible
    }, setVisible: function (a) {
        this._visible = a;
        this.setNodeDirty()
    }, getAnchorPoint: function () {
        return cc.p(this._anchorPoint.x, this._anchorPoint.y)
    }, setAnchorPoint: function (a) {
        cc.Point.CCPointEqualToPoint(a, this._anchorPoint) || (this._anchorPoint = new cc.Point(a.x, a.y),
            this._anchorPointInPoints = new cc.Point(this._contentSize.width * this._anchorPoint.x, this._contentSize.height * this._anchorPoint.y), this.setNodeDirty())
    }, _setAnchorPointByValue: function (a) {
        cc.Point.CCPointEqualToPoint(a, this._anchorPoint) || (this._anchorPoint.x = a.x, this._anchorPoint.y = a.y, this._anchorPointInPoints.x = this._contentSize.width * this._anchorPoint.x, this._anchorPointInPoints.y = this._contentSize.height * this._anchorPoint.y, this.setNodeDirty())
    }, getAnchorPointInPoints: function () {
        return cc.p(this._anchorPointInPoints.x,
            this._anchorPointInPoints.y)
    }, getContentSize: function () {
        return cc.size(this._contentSize.width, this._contentSize.height)
    }, setContentSize: function (a) {
        cc.Size.CCSizeEqualToSize(a, this._contentSize) || (this._contentSize = new cc.Size(a.width, a.height), this._anchorPointInPoints = new cc.Point(this._contentSize.width * this._anchorPoint.x, this._contentSize.height * this._anchorPoint.y), this.setNodeDirty())
    }, _setContentSizeByValue: function (a) {
        cc.Size.CCSizeEqualToSize(a, this._contentSize) || (this._contentSize.width =
            a.width, this._contentSize.height = a.height, this._anchorPointInPoints.x = this._contentSize.width * this._anchorPoint.x, this._anchorPointInPoints.y = this._contentSize.height * this._anchorPoint.y, this.setNodeDirty())
    }, isRunning: function () {
        return this._running
    }, getParent: function () {
        return this._parent
    }, setParent: function (a) {
        this._parent = a
    }, isIgnoreAnchorPointForPosition: function () {
        return this._ignoreAnchorPointForPosition
    }, ignoreAnchorPointForPosition: function (a) {
        a != this._ignoreAnchorPointForPosition && (this._ignoreAnchorPointForPosition =
            a, this.setNodeDirty())
    }, getTag: function () {
        return this._tag
    }, setTag: function (a) {
        this._tag = a
    }, getUserData: function () {
        return this._userData
    }, setUserData: function (a) {
        this._userData = a
    }, getUserObject: function () {
        return this._userObject
    }, setUserObject: function (a) {
        this._userObject != a && (this._userObject = a)
    }, getShaderProgram: function () {
        return this._shaderProgram
    }, setShaderProgram: function (a) {
        this._shaderProgram != a && (this._shaderProgram = a)
    }, getOrderOfArrival: function () {
        return this._orderOfArrival
    }, setOrderOfArrival: function (a) {
        this._orderOfArrival =
            a
    }, getGLServerState: function () {
        return this._glServerState
    }, setGLServerState: function (a) {
        this._glServerState = a
    }, getActionManager: function () {
        this._actionManager || (this._actionManager = cc.Director.getInstance().getActionManager(), this.getActionManager = function () {
            return this._actionManager
        });
        return this._actionManager
    }, setActionManager: function (a) {
        this._actionManager != a && (this.stopAllActions(), this._shaderProgram = a)
    }, getScheduler: function () {
        this._scheduler || (this._scheduler = cc.Director.getInstance().getScheduler(),
            this.getScheduler = function () {
                return this._scheduler
            });
        return this._scheduler
    }, setScheduler: function (a) {
        this._scheduler != a && (this.unscheduleAllCallbacks(), this._scheduler = a)
    }, getBoundingBox: function () {
        var a = cc.rect(0, 0, this._contentSize.width, this._contentSize.height);
        return cc.RectApplyAffineTransform(a, this.nodeToParentTransform())
    }, getBoundingBoxToWorld: function () {
        var a = cc.rect(0, 0, this._contentSize.width, this._contentSize.height), a = cc.RectApplyAffineTransform(a, this.nodeToWorldTransform()), a = cc.rect(0 |
            a.origin.x - 4, 0 | a.origin.y - 4, 0 | a.size.width + 8, 0 | a.size.height + 8);
        if (!this._children)return a;
        for (var b = 0; b < this._children.length; b++) {
            var c = this._children[b];
            c && c._visible && (c = c.getBoundingBoxToWorld()) && (a = cc.Rect.CCRectUnion(a, c))
        }
        return a
    }, cleanup: function () {
        this.stopAllActions();
        this.unscheduleAllCallbacks();
        this._arrayMakeObjectsPerformSelector(this._children, cc.Node.StateCallbackType.cleanup)
    }, description: function () {
        return"<cc.Node | Tag =" + this._tag + ">"
    }, _childrenAlloc: function () {
        this._children =
            []
    }, getChildByTag: function (a) {
        cc.Assert(a != cc.NODE_TAG_INVALID, "Invalid tag");
        if (null != this._children)for (var b = 0; b < this._children.length; b++) {
            var c = this._children[b];
            if (c && c._tag == a)return c
        }
        return null
    }, addChild: function (a, b, c) {
        a === this ? console.warn("cc.Node.addChild: An Node can't be added as a child of itself.") : (cc.Assert(null != a, "Argument must be non-nil"), cc.Assert(null == a._parent, "child already added. It can't be added again"), b = null != b ? b : a.getZOrder(), c = null != c ? c : a.getTag(), a.setTag(c), this._children ||
            this._childrenAlloc(), this._insertChild(a, b), a.setParent(this), this._running && (a.onEnter(), a.onEnterTransitionDidFinish()))
    }, removeFromParent: function (a) {
        this._parent && this._parent.removeChild(this, a || !0)
    }, removeFromParentAndCleanup: function (a) {
        cc.log("removeFromParentAndCleanup is deprecated. Use removeFromParent instead");
        this.removeFromParent(a)
    }, removeChild: function (a, b) {
        null != this._children && (b = b || !0, -1 < this._children.indexOf(a) && this._detachChild(a, b), this.setNodeDirty())
    }, removeChildByTag: function (a, b) {
        cc.Assert(a != cc.NODE_TAG_INVALID, "Invalid tag");
        var c = this.getChildByTag(a);
        null == c ? cc.log("cocos2d: removeChildByTag: child not found!") : this.removeChild(c, b)
    }, removeAllChildrenWithCleanup: function (a) {
        cc.log("removeAllChildrenWithCleanup is deprecated. Use removeAllChildren instead");
        this.removeAllChildren(a)
    }, removeAllChildren: function (a) {
        if (null != this._children) {
            for (var a = a || !0, b = 0; b < this._children.length; b++) {
                var c = this._children[b];
                c && (this._running && (c.onExitTransitionDidStart(), c.onExit()),
                    a && c.cleanup(), c.setParent(null))
            }
            this._children.length = 0
        }
    }, _detachChild: function (a, b) {
        this._running && (a.onExitTransitionDidStart(), a.onExit());
        b && a.cleanup();
        a.setParent(null);
        cc.ArrayRemoveObject(this._children, a)
    }, _insertChild: function (a, b) {
        this._reorderChildDirty = !0;
        var c = this._children[this._children.length - 1];
        if (!c || c.getZOrder() <= b)this._children.push(a); else for (c = 0; c < this._children.length; c++) {
            var d = this._children[c];
            if (d && d.getZOrder() > b) {
                this._children = cc.ArrayAppendObjectToIndex(this._children,
                    a, c);
                break
            }
        }
        a._setZOrder(b)
    }, reorderChild: function (a, b) {
        cc.Assert(null != a, "Child must be non-nil");
        this._reorderChildDirty = !0;
        a.setOrderOfArrival(cc.s_globalOrderOfArrival++);
        a._setZOrder(b);
        this.setNodeDirty()
    }, sortAllChildren: function () {
        if (this._reorderChildDirty) {
            var a, b, c = this._children.length;
            for (a = 0; a < c; a++) {
                var d = this._children[a];
                for (b = a - 1; 0 <= b && (d._zOrder < this._children[b]._zOrder || d._zOrder == this._children[b]._zOrder && d._orderOfArrival < this._children[b]._orderOfArrival);)this._children[b +
                    1] = this._children[b], b -= 1;
                this._children[b + 1] = d
            }
            this._reorderChildDirty = !1
        }
    }, draw: function () {
    }, visit: function (a) {
        if (this._visible) {
            var a = a || cc.renderContext, b;
            a.save();
            this.transform(a);
            if (this._children && 0 < this._children.length) {
                this.sortAllChildren();
                for (b = 0; b < this._children.length; b++)if (this._children[b] && 0 > this._children[b]._zOrder)this._children[b].visit(a); else break;
                this.draw(a);
                if (this._children)for (; b < this._children.length; b++)this._children[b] && 0 <= this._children[b]._zOrder && this._children[b].visit(a)
            } else this.draw(a);
            this._orderOfArrival = 0;
            a.restore()
        }
    }, _visitForWebGL: function (a) {
        if (this._visible) {
            var b;
            a.save();
            this._grid && this._grid.isActive() && this._grid.beforeDraw();
            this.transform(a);
            if (this._children && 0 < this._children.length) {
                this.sortAllChildren();
                for (b = 0; b < this._children.length; b++)if (this._children[b] && 0 > this._children[b]._zOrder)this._children[b].visit(a); else break;
                this.draw(a);
                if (this._children)for (; b < this._children.length; b++)this._children[b] && 0 <= this._children[b]._zOrder && this._children[b].visit(a)
            } else this.draw(a);
            this._orderOfArrival = 0;
            this._grid && this._grid.isActive() && this._grid.afterDraw(this);
            a.restore()
        }
    }, transformAncestors: function () {
        null != this._parent && (this._parent.transformAncestors(), this._parent.transform())
    }, transform: function (a) {
        a = a || cc.renderContext;
        this._ignoreAnchorPointForPosition ? this._parent ? a.translate(0 | this._position.x - this._parent._anchorPointInPoints.x + this._anchorPointInPoints.x, -(0 | this._position.y - this._parent._anchorPointInPoints.y + this._anchorPointInPoints.y)) : a.translate(0 | this._position.x +
            this._anchorPointInPoints.x, -(0 | this._position.y + this._anchorPointInPoints.y)) : this._parent ? a.translate(0 | this._position.x - this._parent._anchorPointInPoints.x, -(0 | this._position.y - this._parent._anchorPointInPoints.y)) : a.translate(0 | this._position.x, -(0 | this._position.y));
        0 != this._rotation && a.rotate(this._rotationRadians);
        (1 != this._scaleX || 1 != this._scaleY) && a.scale(this._scaleX, this._scaleY);
        (0 != this._skewX || 0 != this._skewY) && a.transform(1, -Math.tan(cc.DEGREES_TO_RADIANS(this._skewY)), -Math.tan(cc.DEGREES_TO_RADIANS(this._skewX)),
            1, 0, 0)
    }, _transformForWebGL: function () {
        this.nodeToParentTransform()
    }, onEnter: function () {
        this._running = !0;
        this._arrayMakeObjectsPerformSelector(this._children, cc.Node.StateCallbackType.onEnter);
        this.resumeSchedulerAndActions()
    }, onEnterTransitionDidFinish: function () {
        this._arrayMakeObjectsPerformSelector(this._children, cc.Node.StateCallbackType.onEnterTransitionDidFinish)
    }, onExitTransitionDidStart: function () {
        this._arrayMakeObjectsPerformSelector(this._children, cc.Node.StateCallbackType.onExitTransitionDidStart)
    },
    onExit: function () {
        this._running = !1;
        this.pauseSchedulerAndActions();
        this._arrayMakeObjectsPerformSelector(this._children, cc.Node.StateCallbackType.onExit)
    }, runAction: function (a) {
        cc.Assert(null != a, "Argument must be non-nil");
        this.getActionManager().addAction(a, this, !this._running);
        return a
    }, stopAllActions: function () {
        this.getActionManager().removeAllActionsFromTarget(this)
    }, stopAction: function (a) {
        this.getActionManager().removeAction(a)
    }, stopActionByTag: function (a) {
        cc.Assert(a != cc.ACTION_TAG_INVALID,
            "Invalid tag");
        this.getActionManager().removeActionByTag(a, this)
    }, getActionByTag: function (a) {
        cc.Assert(a != cc.ACTION_TAG_INVALID, "Invalid tag");
        return this.getActionManager().getActionByTag(a, this)
    }, numberOfRunningActions: function () {
        return this.getActionManager().numberOfRunningActionsInTarget(this)
    }, scheduleUpdate: function () {
        this.scheduleUpdateWithPriority(0)
    }, scheduleUpdateWithPriority: function (a) {
        this.getScheduler().scheduleUpdateForTarget(this, a, !this._running)
    }, unscheduleUpdate: function () {
        this.getScheduler().unscheduleUpdateForTarget(this)
    },
    schedule: function (a, b, c, d) {
        b = b || 0;
        cc.Assert(a, "Argument must be non-nil");
        cc.Assert(0 <= b, "Argument must be positive");
        c = null == c ? cc.REPEAT_FOREVER : c;
        this.getScheduler().scheduleCallbackForTarget(this, a, b, c, d || 0, !this._running)
    }, scheduleOnce: function (a, b) {
        this.schedule(a, 0, 0, b)
    }, unschedule: function (a) {
        a && this.getScheduler().unscheduleCallbackForTarget(this, a)
    }, unscheduleAllCallbacks: function () {
        this.getScheduler().unscheduleAllCallbacksForTarget(this)
    }, resumeSchedulerAndActions: function () {
        this.getScheduler().resumeTarget(this);
        this.getActionManager().resumeTarget(this)
    }, pauseSchedulerAndActions: function () {
        this.getScheduler().pauseTarget(this);
        this.getActionManager().pauseTarget(this)
    }, nodeToParentTransform: function () {
        if (this._transformDirty) {
            var a = this._position.x, b = this._position.y;
            this._ignoreAnchorPointForPosition && (a += this._anchorPointInPoints.x, b += this._anchorPointInPoints.y);
            var c = 1, d = 0;
            this._rotation && (c = Math.cos(-this._rotationRadians), d = Math.sin(-this._rotationRadians));
            var e = this._skewX || this._skewY;
            !e && !cc.Point.CCPointEqualToPoint(this._anchorPointInPoints,
                cc.p(0, 0)) && (a += c * -this._anchorPointInPoints.x * this._scaleX + -d * -this._anchorPointInPoints.y * this._scaleY, b += d * -this._anchorPointInPoints.x * this._scaleX + c * -this._anchorPointInPoints.y * this._scaleY);
            this._transform = cc.AffineTransformMake(c * this._scaleX, d * this._scaleX, -d * this._scaleY, c * this._scaleY, a, b);
            e && (a = cc.AffineTransformMake(1, Math.tan(cc.DEGREES_TO_RADIANS(this._skewY)), Math.tan(cc.DEGREES_TO_RADIANS(this._skewX)), 1, 0, 0), this._transform = cc.AffineTransformConcat(a, this._transform), cc.Point.CCPointEqualToPoint(this._anchorPointInPoints,
                cc.p(0, 0)) || (this._transform = cc.AffineTransformTranslate(this._transform, -this._anchorPointInPoints.x, -this._anchorPointInPoints.y)));
            this._transformDirty = !1
        }
        return this._transform
    }, parentToNodeTransform: function () {
        this._inverseDirty && (this._inverse = cc.AffineTransformInvert(this.nodeToParentTransform()), this._inverseDirty = !1);
        return this._inverse
    }, nodeToWorldTransform: function () {
        for (var a = this.nodeToParentTransform(), b = this._parent; null != b; b = b.getParent())a = cc.AffineTransformConcat(a, b.nodeToParentTransform());
        return a
    }, worldToNodeTransform: function () {
        return cc.AffineTransformInvert(this.nodeToWorldTransform())
    }, convertToNodeSpace: function (a) {
        return cc.PointApplyAffineTransform(a, this.worldToNodeTransform())
    }, convertToWorldSpace: function (a) {
        return cc.PointApplyAffineTransform(a, this.nodeToWorldTransform())
    }, convertToNodeSpaceAR: function (a) {
        return cc.pSub(this.convertToNodeSpace(a), this._anchorPointInPoints)
    }, convertToWorldSpaceAR: function (a) {
        return this.convertToWorldSpace(cc.pAdd(a, this._anchorPointInPoints))
    },
    _convertToWindowSpace: function (a) {
        a = this.convertToWorldSpace(a);
        return cc.Director.getInstance().convertToUI(a)
    }, convertTouchToNodeSpace: function (a) {
        return this.convertToNodeSpace(a.getLocation())
    }, convertTouchToNodeSpaceAR: function (a) {
        a = a.getLocation();
        a = cc.Director.getInstance().convertToGL(a);
        return this.convertToNodeSpaceAR(a)
    }, update: function () {
    }, updateTransform: function () {
        this._arrayMakeObjectsPerformSelector(this._children, cc.Node.StateCallbackType.updateTransform)
    }, retain: function () {
    }, release: function () {
    }});
cc.Node.StateCallbackType = {onEnter: 1, onExit: 2, cleanup: 3, onEnterTransitionDidFinish: 4, updateTransform: 5, onExitTransitionDidStart: 6, sortAllChildren: 7};
cc.Node.create = function () {
    return new cc.Node
};
cc.DOM = {};
cc.DOMEditMode = !0;
cc.DOM.addMethods = function (a) {
    for (funcs in cc.DOM.methods)a[funcs] = cc.DOM.methods[funcs]
};
cc.DOM.methods = {setPosition: function (a, b) {
    2 == arguments.length ? (this._position.x = a, this._position.y = b) : this._position = a;
    this.dom.translates(this._position.x, -this._position.y)
}, setPositionY: function (a) {
    this._position.y = a;
    this.dom.translates(this._position.x, -this._position.y)
}, setPositionX: function (a) {
    this._position.x = a;
    this.dom.translates(this._position.x, -this._position.y)
}, setScale: function (a, b) {
    this._scaleX = a;
    this._scaleY = b || a;
    this.dom.resize(this._scaleX, this._scaleY)
}, setScaleX: function (a) {
    this._scaleX =
        a;
    this.dom.resize(this._scaleX, this._scaleY)
}, setScaleY: function (a) {
    this._scaleY = a;
    this.dom.resize(this._scaleX, this._scaleY)
}, setAnchorpoint: function (a) {
    this._anchorPoint = a;
    this._anchorPointInPoints = cc.p(this._contentSize.width * this._anchorPoint.x, this._contentSize.height * this._anchorPoint.y);
    this.dom.style[cc.$.pfx + "TransformOrigin"] = "" + this._anchorPointInPoints.x + "px " + this._anchorPointInPoints.y + "px";
    this.isIgnoreAnchorPointForPosition() ? (this.dom.style.marginLeft = 0, this.dom.style.marginBottom =
        0) : (this.dom.style.marginLeft = this.isToggler ? 0 : -this._anchorPointInPoints.x + "px", this.dom.style.marginBottom = -this._anchorPointInPoints.y + "px")
}, setContentSize: function (a) {
    cc.Size.CCSizeEqualToSize(a, this._contentSize) || (this._contentSize = a, this._anchorPointInPoints = cc.p(this._contentSize.width * this._anchorPoint.x, this._contentSize.height * this._anchorPoint.y), this.dom.width = a.width, this.dom.height = a.height, this.setAnchorpoint(this.getAnchorPoint()));
    this.canvas && (this.canvas.width = this._contentSize.width,
        this.canvas.height = this._contentSize.height);
    cc.DOMEditMode && !this.placeholder && (this.dom.style.width = this._contentSize.width + "px", this.dom.style.height = this._contentSize.height + "px", this.dom.addClass("CCDOMEdit"));
    this.redraw()
}, setRotation: function (a) {
    this._rotation != a && (this._rotation = a, this._rotationRadians = this._rotation * (Math.PI / 180), this.dom.rotate(a))
}, setSkewX: function (a) {
    this._skewX = a;
    this.dom.setSkew(this._skewX, this._skewY)
}, setSkewY: function (a) {
    this._skewY = a;
    this.dom.setSkew(this._skewX,
        this._skewY)
}, setVisible: function (a) {
    this._visible = a;
    this.dom && (this.dom.style.visibility = a ? "visible" : "hidden")
}, _setZOrder: function (a) {
    this._zOrder = a;
    this.dom && (this.dom.zIndex = a)
}, setParent: function (a) {
    this._parent = a;
    cc.DOM.parentDOM(this)
}, resumeSchedulerAndActions: function () {
    this.getScheduler().resumeTarget(this);
    this.getActionManager().resumeTarget(this);
    this.dom && !this.dom.parentNode && (this.getParent() ? cc.DOM.parentDOM(this) : this.dom.appendTo(cc.container));
    this.dom && (this.dom.style.visibility =
        "visible")
}, pauseSchedulerAndActions: function () {
    this.getScheduler().pauseTarget(this);
    this.getActionManager().pauseTarget(this);
    this.dom && (this.dom.style.visibility = "hidden")
}, cleanup: function () {
    this.stopAllActions();
    this.unscheduleAllSelectors();
    this._arrayMakeObjectsPerformSelector(this._children, cc.Node.StateCallbackType.cleanup);
    this.dom && this.dom.remove()
}, removeFromParentAndCleanup: function () {
    this.dom.remove()
}, setOpacity: function (a) {
    this._opacity = a;
    this.dom.style.opacity = a / 255
}, redraw: function () {
    if (this.isSprite) {
        var a =
            this._children;
        this._children = null;
        cc.Sprite.prototype.visit.call(this, this.ctx);
        this._children = a
    } else cc.Sprite.prototype.visit.call(this, this.ctx)
}};
cc.DOM.parentDOM = function (a) {
    var b = a.getParent();
    if (!b || !a.dom)return!1;
    b.dom || (cc.DOM.placeHolder(b), b.setParent = cc.DOM.methods.setParent);
    a.dom.appendTo(b.dom);
    b.getParent() ? cc.DOM.parentDOM(b) : b.isRunning() && b.dom.appendTo(cc.container)
};
cc.DOM.setTransform = function (a) {
    if (a.ctx)if (a.ctx.translate(a.getAnchorPointInPoints().x, a.getAnchorPointInPoints().y), a.isSprite) {
        var b = a._children;
        a._children = null;
        cc.Sprite.prototype.visit.call(a, a.ctx);
        a._children = b
    } else cc.Sprite.prototype.visit.call(a, a.ctx);
    a.dom && (a.dom.position.x = a.getPosition().x, a.dom.position.y = -a.getPosition().y, a.dom.rotation = a.getRotation(), a.dom.scale = {x: a.getScaleX(), y: a.getScaleY()}, a.dom.skew = {x: a.getSkewX(), y: a.getSkewY()}, a.setAnchorpoint && a.setAnchorpoint(a.getAnchorPoint()),
        a.dom.transforms(), a.dom.position.y = -a.getPosition().y, a.dom.rotation = a.getRotation(), a.dom.scale = {x: a.getScaleX(), y: a.getScaleY()}, a.dom.skew = {x: a.getSkewX(), y: a.getSkewY()}, a.setAnchorpoint && a.setAnchorpoint(a.getAnchorPoint()), a.dom.transforms())
};
cc.DOM.forSprite = function (a) {
    a.dom = cc.$new("div");
    a.canvas = cc.$new("canvas");
    a.canvas.width = a.getContentSize().width;
    a.canvas.height = a.getContentSize().height;
    cc.DOMEditMode && (a.dom.style.width = a.getContentSize().width + "px", a.dom.style.height = a.getContentSize().height + "px", a.dom.addClass("CCDOMEdit"));
    a.dom.style.position = "absolute";
    a.dom.style.bottom = 0;
    a.ctx = a.canvas.getContext("2d");
    a.dom.appendChild(a.canvas);
    a.getParent() && cc.DOM.parentDOM(a);
    a.isSprite = !0
};
cc.DOM.forMenuToggler = function (a) {
    a.dom = cc.$new("div");
    a.dom2 = cc.$new("div");
    a.dom.appendChild(a.dom2);
    for (var b = 0; b < a._subItems.length; b++)cc.DOM.convert(a._subItems[b]), a.dom2.appendChild(a._subItems[b].dom), a._subItems[b].setPosition(cc.p(0, 0));
    a.dom.style.marginLeft = 0;
    a.setSelectedIndex = function (a) {
        this._selectedIndex = a;
        for (var b = 0; b < this._subItems.length; b++)this._subItems[b].setVisible(!1);
        this._subItems[a].setVisible(!0)
    };
    a.setSelectedIndex(a.getSelectedIndex());
    a.dom2.addEventListener("click",
        function () {
            a.activate()
        });
    a.dom2.addEventListener("mousedown", function () {
        for (var b = 0; b < a._subItems.length; b++)a._subItems[b]._isEnabled = !0, a._subItems[b]._running = !0, a._subItems[b].selected(), a._subItems[b]._isEnabled = !1, a._subItems[b]._running = !1;
        a._subItems[a.getSelectedIndex()]._isEnabled = !0;
        a._subItems[a.getSelectedIndex()]._running = !0
    });
    a.dom2.addEventListener("mouseup", function () {
        for (var b = 0; b < a._subItems.length; b++)a._subItems[b]._isEnabled = !0, a._subItems[b].unselected(), a._subItems[b]._isEnabled = !1;
        a._subItems[a.getSelectedIndex()]._isEnabled = !0
    });
    a.dom2.addEventListener("mouseout", function () {
        if (a.mouseDown) {
            for (var b = 0; b < a._subItems.length; b++)a._subItems[b]._isEnabled = !0, a._subItems[b].unselected(), a._subItems[b]._isEnabled = !1;
            a._subItems[a.getSelectedIndex()]._isEnabled = !0;
            a.mouseDown = !1
        }
    });
    a.dom.style.position = "absolute";
    a.isToggler = !0
};
cc.DOM.forMenuItem = function (a) {
    a.dom = cc.$new("div");
    a.canvas = cc.$new("canvas");
    a.canvas.width = a.getContentSize().width;
    a.canvas.height = a.getContentSize().height;
    cc.DOMEditMode && (a.dom.style.width = a.getContentSize().width + "px", a.dom.style.height = a.getContentSize().height + "px", a.dom.addClass("CCDOMEdit"));
    a.dom.style.position = "absolute";
    a.dom.style.bottom = 0;
    a.ctx = a.canvas.getContext("2d");
    a.dom.appendChild(a.canvas);
    a.getParent() && cc.DOM.parentDOM(a);
    a._selector && (a.canvas.addEventListener("click",
        function () {
            a.activate()
        }), a.canvas.addEventListener("mousedown", function () {
        a.selected();
        a.ctx.save();
        a.ctx.setTransform(1, 0, 0, 1, 0, 0);
        a.ctx.clearRect(0, 0, a.canvas.width, a.canvas.height);
        a.ctx.restore();
        a.mouseDown = true;
        cc.Sprite.prototype.visit.call(a, a.ctx)
    }), a.canvas.addEventListener("mouseup", function () {
        a.unselected();
        a.ctx.save();
        a.ctx.setTransform(1, 0, 0, 1, 0, 0);
        a.ctx.clearRect(0, 0, a.canvas.width, a.canvas.height);
        a.ctx.restore();
        cc.Sprite.prototype.visit.call(a, a.ctx)
    }), a.canvas.addEventListener("mouseout",
        function () {
            if (a.mouseDown) {
                a.unselected();
                a.ctx.save();
                a.ctx.setTransform(1, 0, 0, 1, 0, 0);
                a.ctx.clearRect(0, 0, a.canvas.width, a.canvas.height);
                a.ctx.restore();
                cc.Sprite.prototype.visit.call(a, a.ctx);
                a.mouseDown = false
            }
        }))
};
cc.DOM.placeHolder = function (a) {
    a.dom = cc.$new("div");
    a.placeholder = !0;
    a.dom.style.position = "absolute";
    a.dom.style.bottom = 0;
    a.dom.style.width = (a.getContentSize().width || cc.Director.getInstance().getWinSize().width) + "px";
    a.dom.style.maxHeight = (a.getContentSize().height || cc.Director.getInstance().getWinSize().height) + "px";
    a.dom.style.margin = 0;
    cc.DOM.setTransform(a);
    a.dom.transforms();
    cc.DOM.addMethods(a)
};
cc.DOM.convert = function () {
    if (1 < arguments.length)return cc.DOM.convert(arguments);
    if (1 == arguments.length && !arguments[0].length)return cc.DOM.convert([arguments[0]]);
    for (var a = arguments[0], b = 0; b < a.length; b++)if (a[b]instanceof cc.Sprite ? a[b].dom || cc.DOM.forSprite(a[b]) : a[b]instanceof cc.MenuItemToggle ? a[b].dom || cc.DOM.forMenuToggler(a[b]) : a[b]instanceof cc.MenuItem ? a[b].dom || cc.DOM.forMenuItem(a[b]) : cc.log("DOM converter only supports sprite and menuitems yet"), cc.DOM.addMethods(a[b]), a[b].visit = function () {
    },
        a[b].transform = function () {
        }, cc.DOM.setTransform(a[b]), a[b].setVisible(a[b].isVisible()), cc.DOMEditMode) {
        if (!cc.DOM.tooltip) {
            var c = cc.$new("style");
            c.textContent = ".CCDOMEdit:hover{border: rgba(255,0,0,0.5) 2px dashed;left: -2px;} .CCDOMEdit #CCCloseButton{width:80px;height:15px;background: rgba(0,0,0,0.4);border:1px solid #aaaaaa;font-size: 9px;line-height:9px;color:#bbbbbb;} .CCTipWindow .CCTipMove{cursor:move;} .CCTipWindow .CCTipRotate{cursor:w-resize;} .CCTipWindow .CCTipScale{cursor:ne-resize;} .CCTipWindow .CCTipSkew{cursor:se-resize;} .CCTipWindow input{width:40px;background: rgba(0,0,0,0.5);color:white;border:none;border-bottom: 1px solid #fff;} div.CCTipWindow:hover{color:rgb(50,50,255);}";
            document.body.appendChild(c);
            cc.container.style.overflow = "visible";
            var d = cc.DOM.tooltip = cc.$new("div");
            d.mouseDown = !1;
            document.body.appendChild(d);
            d.addClass("CCTipWindow");
            d.style.width = "140px";
            d.style.height = "134px";
            d.style.background = "rgba(50,50,50,0.5)";
            d.style.border = "1px rgba(255,255,255,0.5) solid";
            d.style.borderRadius = "5px";
            d.style.color = "rgb(255,255,255)";
            d.style.boxShadow = "0 0 10px 1px rgba(0,0,0,0.5)";
            d.style.position = "absolute";
            d.style.display = "none";
            d.style.top = 0;
            d.style.left = "-150px";
            d.style[cc.$.pfx + "Transform"] = "translate3d(0,0,100px)";
            d.style[cc.$.pfx + "UserSelect"] = "none";
            d.innerHTML = '<table><tr><td><label class="CCTipMove">Move</label></td><td><input type="text" value="12" id="posx"/></td><td><input type="text" value="12" id="posy"/></td></tr><tr><td><label class="CCTipRotate">Rotate</label></td><td><input type="text" value="12" id="rot"/></td></tr><tr><td><label class="CCTipScale">Scale</label></td><td><input type="text" value="12" id="scalex"/></td><td><input type="text" value="12" id="scaley"/></td></tr><tr><td><label class="CCTipSkew">Skew</label></td><td><input type="text" value="12" id="skewx"/></td><td><input type="text" value="12" id="skewy"/></td></tr></table><button id="CCCloseButton">Close</button>';
            d.updateNumbers = function () {
                var a = cc.DOM.tooltip;
                a.target && (a.find("#posx").value = a.target._position.x, a.find("#posy").value = a.target._position.y, a.find("#rot").value = a.target._rotation, a.find("#scalex").value = a.target._scaleX, a.find("#scaley").value = a.target._scaleY, a.find("#skewx").value = a.target._skewX, a.find("#skewy").value = a.target._skewY)
            };
            d.find(".CCTipMove").addEventListener("mousedown", function (a) {
                d.mode = "move";
                d.initialpos = {x: a.clientX, y: a.clientY};
                d.mouseDown = !0
            });
            d.find(".CCTipRotate").addEventListener("mousedown",
                function (a) {
                    var b = cc.$.findpos(cc.canvas), b = {x: b.x, y: b.y + cc.canvas.height};
                    d.nodepos = d.target.getPosition();
                    d.nodepos = {x: b.x + d.nodepos.x, y: b.y - d.nodepos.y};
                    d.startPos = {x: a.x, y: a.y};
                    d.mode = "rot";
                    d.initialpos = {x: a.clientX, y: a.clientY};
                    d.mouseDown = !0;
                    var c = d.startPos.x, e = d.nodepos.y, b = d.startPos, j = d.nodepos, a = Math.sqrt(Math.pow(j.x - c, 2) + Math.pow(j.y - e, 2)), c = Math.sqrt(Math.pow(b.x - c, 2) + Math.pow(b.y - e, 2)), b = Math.sqrt(Math.pow(b.x - j.x, 2) + Math.pow(b.y - j.y, 2)), a = Math.acos((a * a + b * b - c * c) / (2 * a * b)) * (180 / cc.PI);
                    d.startAngle = a;
                    d.startRot = d.target.getRotation()
                });
            d.find(".CCTipScale").addEventListener("mousedown", function (a) {
                d.mode = "scale";
                d.initialpos = {x: a.clientX, y: a.clientY};
                d.mouseDown = !0
            });
            d.find(".CCTipSkew").addEventListener("mousedown", function (a) {
                d.mode = "skew";
                d.initialpos = {x: a.clientX, y: a.clientY};
                d.mouseDown = !0
            });
            document.body.addEventListener("mousemove", function (a) {
                if ("move" == d.mode) {
                    var b = a.clientX - d.initialpos.x, c = a.clientY - d.initialpos.y, e = d.target.getPosition();
                    d.target.setPosition(b + e.x,
                        -c + e.y);
                    d.initialpos = {x: a.clientX, y: a.clientY};
                    d.updateNumbers()
                } else if ("rot" == d.mode) {
                    var j = a.x, l = a.y, c = d.startPos, e = d.nodepos, b = Math.sqrt(Math.pow(e.x - j, 2) + Math.pow(e.y - l, 2)), j = Math.sqrt(Math.pow(c.x - j, 2) + Math.pow(c.y - l, 2)), c = Math.sqrt(Math.pow(c.x - e.x, 2) + Math.pow(c.y - e.y, 2)), b = Math.acos((b * b + c * c - j * j) / (2 * b * c)) * (180 / cc.PI);
                    a.y > d.startPos.y ? d.target.setRotation(-b + d.startRot) : d.target.setRotation(b + d.startRot);
                    d.updateNumbers()
                } else"scale" == d.mode ? (c = a.clientY - d.initialpos.y, b = a.clientX - d.initialpos.x,
                    e = d.target.getScaleX(), j = d.target.getScaleY(), d.target.setScale(e - b / 150, j + c / 150), d.initialpos = {x: a.clientX, y: a.clientY}, d.updateNumbers()) : "skew" == d.mode && (c = a.clientY - d.initialpos.y, b = a.clientX - d.initialpos.x, e = d.target.getSkewX(), j = d.target.getSkewY(), d.target.setSkewX(e - b / 4), d.target.setSkewY(j + c / 4), d.initialpos = {x: a.clientX, y: a.clientY}, d.updateNumbers())
            });
            d.find("#CCCloseButton").addEventListener("click", function () {
                d.mode = null;
                d.style.display = "none";
                d.mouseDown = !1
            });
            document.addEventListener("mouseup",
                function () {
                    d.mode = null;
                    d.mouseDown = !1
                })
        }
        a[b].dom.ccnode = a[b];
        var e = a[b];
        a[b].dom.addEventListener("mouseover", function () {
            cc.DOM.tooltip.mouseDown || (cc.$.findpos(this), cc.DOM.tooltip.style.display = "block", cc.DOM.tooltip.prependTo(this), cc.DOM.tooltip.target = e, this.style.zIndex = 999999, cc.DOM.tooltip.updateNumbers())
        });
        a[b].dom.addEventListener("mouseout", function () {
            this.style.zIndex = this.ccnode._zOrder
        })
    }
};
cc.INVALID_INDEX = 4294967295;
cc.PI = Math.PI;
cc.FLT_MAX = parseFloat("3.402823466e+38F");
cc.RAD = cc.PI / 180;
cc.DEG = 180 / cc.PI;
cc.UINT_MAX = 4294967295;
cc.SWAP = function (a, b, c) {
    if ("object" == typeof c && "undefined" != typeof c.x && "undefined" != typeof c.y) {
        var d = c[a];
        c[a] = c[b];
        c[b] = d
    } else cc.Assert(!1, "CC_SWAP is being modified from original macro, please check usage")
};
cc.lerp = function (a, b, c) {
    return a + (b - a) * c
};
cc.RANDOM_MINUS1_1 = function () {
    return 2 * (Math.random() - 0.5)
};
cc.RANDOM_0_1 = function () {
    return Math.random()
};
cc.DEGREES_TO_RADIANS = function (a) {
    return a * cc.RAD
};
cc.RADIANS_TO_DEGREES = function (a) {
    return a * cc.DEG
};
cc.REPEAT_FOREVER = Number.MAX_VALUE - 1;
cc.BLEND_SRC = cc.OPTIMIZE_BLEND_FUNC_FOR_PREMULTIPLIED_ALPHA ? 1 : 770;
cc.BLEND_DST = 771;
cc.NODE_DRAW_SETUP = function (a) {
    ccGLEnable(a._glServerState);
    cc.Assert(a.getShaderProgram(), "No shader program set for this node");
    a.getShaderProgram().use();
    a.getShaderProgram().setUniformForModelViewProjectionMatrix()
};
cc.ENABLE_DEFAULT_GL_STATES = function () {
};
cc.DISABLE_DEFAULT_GL_STATES = function () {
};
cc.INCREMENT_GL_DRAWS = function (a) {
    cc.g_NumberOfDraws += a
};
cc.FLT_EPSILON = 1.192092896E-7;
cc.CONTENT_SCALE_FACTOR = cc.IS_RETINA_DISPLAY_SUPPORTED ? function () {
    return cc.Director.getInstance().getContentScaleFactor()
} : function () {
    return 1
};
cc.POINT_POINTS_TO_PIXELS = function (a) {
    return cc.p(a.x * cc.CONTENT_SCALE_FACTOR(), a.y * cc.CONTENT_SCALE_FACTOR())
};
cc.SIZE_POINTS_TO_PIXELS = function (a) {
    return cc.size(a.width * cc.CONTENT_SCALE_FACTOR(), a.height * cc.CONTENT_SCALE_FACTOR())
};
cc.SIZE_PIXELS_TO_POINTS = function (a) {
    return cc.size(a.width / cc.CONTENT_SCALE_FACTOR(), a.height / cc.CONTENT_SCALE_FACTOR())
};
cc.POINT_PIXELS_TO_POINTS = function (a) {
    return cc.p(a.x / cc.CONTENT_SCALE_FACTOR(), a.y / cc.CONTENT_SCALE_FACTOR())
};
cc.RECT_PIXELS_TO_POINTS = cc.IS_RETINA_DISPLAY_SUPPORTED ? function (a) {
    return cc.rect(a.origin.x / cc.CONTENT_SCALE_FACTOR(), a.origin.y / cc.CONTENT_SCALE_FACTOR(), a.size.width / cc.CONTENT_SCALE_FACTOR(), a.size.height / cc.CONTENT_SCALE_FACTOR())
} : function (a) {
    return a
};
cc.RECT_POINTS_TO_PIXELS = cc.IS_RETINA_DISPLAY_SUPPORTED ? function (a) {
    return cc.rect(a.origin.x * cc.CONTENT_SCALE_FACTOR(), a.origin.y * cc.CONTENT_SCALE_FACTOR(), a.size.width * cc.CONTENT_SCALE_FACTOR(), a.size.height * cc.CONTENT_SCALE_FACTOR())
} : function (a) {
    return a
};
var gl = gl || {};
gl.NEAREST = 9728;
gl.LINEAR = 9729;
gl.REPEAT = 10497;
gl.CLAMP_TO_EDGE = 33071;
gl.CLAMP_TO_BORDER = 33069;
gl.LINEAR_MIPMAP_NEAREST = 9985;
gl.NEAREST_MIPMAP_NEAREST = 9984;
gl.ZERO = 0;
gl.ONE = 1;
gl.SRC_COLOR = 768;
gl.ONE_MINUS_SRC_COLOR = 769;
gl.SRC_ALPHA = 770;
gl.ONE_MINUS_SRC_ALPHA = 771;
gl.DST_ALPHA = 772;
gl.ONE_MINUS_DST_ALPHA = 773;
gl.DST_COLOR = 774;
gl.ONE_MINUS_DST_COLOR = 775;
gl.SRC_ALPHA_SATURATE = 776;
cc.SAX_NONE = 0;
cc.SAX_KEY = 1;
cc.SAX_DICT = 2;
cc.SAX_INT = 3;
cc.SAX_REAL = 4;
cc.SAX_STRING = 5;
cc.SAX_ARRAY = 6;
var Uint8Array = Uint8Array || Array;
if (/msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent)) {
    var IEBinaryToArray_ByteStr_Script = '<\!-- IEBinaryToArray_ByteStr --\>\r\nFunction IEBinaryToArray_ByteStr(Binary)\r\n   IEBinaryToArray_ByteStr = CStr(Binary)\r\nEnd Function\r\nFunction IEBinaryToArray_ByteStr_Last(Binary)\r\n   Dim lastIndex\r\n   lastIndex = LenB(Binary)\r\n   if lastIndex mod 2 Then\r\n       IEBinaryToArray_ByteStr_Last = Chr( AscB( MidB( Binary, lastIndex, 1 ) ) )\r\n   Else\r\n       IEBinaryToArray_ByteStr_Last = ""\r\n   End If\r\nEnd Function\r\n', myVBScript =
        document.createElement("script");
    myVBScript.type = "text/vbscript";
    myVBScript.textContent = IEBinaryToArray_ByteStr_Script;
    document.body.appendChild(myVBScript);
    cc._convertResponseBodyToText = function (a) {
        for (var b = {}, c = 0; 256 > c; c++)for (var d = 0; 256 > d; d++)b[String.fromCharCode(c + 256 * d)] = String.fromCharCode(c) + String.fromCharCode(d);
        c = IEBinaryToArray_ByteStr(a);
        a = IEBinaryToArray_ByteStr_Last(a);
        return c.replace(/[\s\S]/g, function (a) {
            return b[a]
        }) + a
    }
}
cc.FileUtils = cc.Class.extend({_fileDataCache: null, ctor: function () {
    this._fileDataCache = {}
}, getFileData: function (a) {
    return this._fileDataCache.hasOwnProperty(a) ? this._fileDataCache[a] : this._loadBinaryFileData(a)
}, _getXMLHttpRequest: function () {
    return window.XMLHttpRequest ? new window.XMLHttpRequest : new ActiveXObject("MSXML2.XMLHTTP")
}, preloadBinaryFileData: function (a) {
    var a = this.fullPathFromRelativePath(a), b = this, c = this._getXMLHttpRequest();
    c.open("GET", a, !0);
    /msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent) ?
        (c.setRequestHeader("Accept-Charset", "x-user-defined"), c.onreadystatechange = function () {
            if (4 == c.readyState) {
                if (200 == c.status) {
                    var d = cc._convertResponseBodyToText(c.responseBody);
                    d && (b._fileDataCache[a] = b._stringConvertToArray(d))
                }
                cc.Loader.getInstance().onResLoaded()
            }
        }) : (c.overrideMimeType && c.overrideMimeType("text/plain; charset=x-user-defined"), c.onload = function () {
        var d = c.responseText;
        d && (cc.Loader.getInstance().onResLoaded(), b._fileDataCache[a] = b._stringConvertToArray(d))
    });
    c.send(null)
}, _loadBinaryFileData: function (a) {
    var b =
        this._getXMLHttpRequest();
    b.open("GET", a, !1);
    var c = null;
    if (/msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent)) {
        b.setRequestHeader("Accept-Charset", "x-user-defined");
        b.send(null);
        if (200 != b.status)return null;
        cc._convertResponseBodyToText(b.responseBody) && (c = this._stringConvertToArray(b.responseText), this._fileDataCache[a] = c)
    } else {
        b.overrideMimeType && b.overrideMimeType("text/plain; charset=x-user-defined");
        b.send(null);
        if (200 != b.status)return null;
        c = this._stringConvertToArray(b.responseText);
        this._fileDataCache[a] = c
    }
    return c
}, _stringConvertToArray: function (a) {
    if (!a)return null;
    for (var b = new Uint8Array(a.length), c = 0; c < a.length; c++)b[c] = a.charCodeAt(c) & 255;
    return b
}, getFileDataFromZip: function () {
}, removeSuffixFromFile: function () {
}, popupNotify: !0, fullPathFromRelativePath: function (a) {
    return a
}, fullPathFromRelativeFile: function (a, b) {
    var c;
    if (a)return c = b.substring(0, b.lastIndexOf("/") + 1), c + a;
    c = b.substring(0, b.lastIndexOf("."));
    return c + ".png"
}, setResourcePath: function () {
}, dictionaryWithContentsOfFile: function (a) {
    return this.rootDict =
        cc.SAXParser.getInstance().parse(a)
}, dictionaryWithContentsOfFileThreadSafe: function (a) {
    return(new cc.DictMaker).dictionaryWithContentsOfFile(a)
}, getWriteablePath: function () {
}, setPopupNotify: function (a) {
    cc.popupNotify = a
}, isPopupNotify: function () {
    return cc.popupNotify
}});
cc.s_SharedFileUtils = null;
cc.FileUtils.getInstance = function () {
    null == cc.s_SharedFileUtils && (cc.s_SharedFileUtils = new cc.FileUtils);
    return cc.s_SharedFileUtils
};
cc.DictMaker = cc.Class.extend({rootDict: [], dictionaryWithContentsOfFile: function (a) {
    return this.rootDict = cc.SAXParser.getInstance().parse(a)
}});
cc.ENGINE_VERSION = "Cocos2d-html5-v2.1.0";
cc.FIX_ARTIFACTS_BY_STRECHING_TEXEL = 0;
cc.DIRECTOR_STATS_POSITION = cc.p(0, 0);
cc.DIRECTOR_FPS_INTERVAL = 0.5;
cc.COCOSNODE_RENDER_SUBPIXEL = 1;
cc.SPRITEBATCHNODE_RENDER_SUBPIXEL = 1;
cc.NODE_TRANSFORM_USING_AFFINE_MATRIX = 1;
cc.OPTIMIZE_BLEND_FUNC_FOR_PREMULTIPLIED_ALPHA = 1;
cc.TEXTURE_ATLAS_USE_TRIANGLE_STRIP = 0;
cc.TEXTURE_ATLAS_USE_VAO = 1;
cc.TEXTURE_NPOT_SUPPORT = 0;
cc.RETINA_DISPLAY_SUPPORT = 1;
cc.RETINA_DISPLAY_FILENAME_SUFFIX = "-hd";
cc.SPRITE_DEBUG_DRAW = 0;
cc.SPRITEBATCHNODE_DEBUG_DRAW = 0;
cc.LABELBMFONT_DEBUG_DRAW = 0;
cc.LABELATLAS_DEBUG_DRAW = 0;
cc.IS_RETINA_DISPLAY_SUPPORTED = 1;
cc.DEFAULT_ENGINE = cc.ENGINE_VERSION + "-canvas";
cc.config = {os: navigator.appVersion, platform: "browser", engine: "cocos2d-html5/canvas", arch: "web", version: cc.ENGINE_VERSION, debug: !1};
cc.dumpConfig = function () {
    for (i in cc.config)cc.log(i + " = " + cc.config[i])
};
cc = cc = cc || {};
cc.TEXTURE_2D_PIXEL_FORMAT_AUTOMATIC = 0;
cc.TEXTURE_2D_PIXEL_FORMAT_RGBA8888 = 1;
cc.TEXTURE_2D_PIXEL_FORMAT_RGB888 = 2;
cc.TEXTURE_2D_PIXEL_FORMAT_RGB565 = 3;
cc.TEXTURE_2D_PIXEL_FORMAT_A8 = 4;
cc.TEXTURE_2D_PIXEL_FORMAT_I8 = 5;
cc.TEXTURE_2D_PIXEL_FORMAT_AI88 = 6;
cc.TEXTURE_2D_PIXEL_FORMAT_RGBA4444 = 7;
cc.TEXTURE_2D_PIXEL_FORMAT_RGB5A1 = 8;
cc.TEXTURE_2D_PIXEL_FORMAT_PVRTC4 = 9;
cc.TEXTURE_2D_PIXEL_FORMAT_PVRTC2 = 10;
cc.TEXTURE_2D_PIXEL_FORMAT_DEFAULT = cc.TEXTURE_2D_PIXEL_FORMAT_RGBA8888;
cc.TEXTURE_2D_PIXEL_FORMAT_AUTOMATIC = cc.TEXTURE_2D_PIXEL_FORMAT_AUTOMATIC;
cc.TEXTURE_2D_PIXEL_FORMAT_RGBA8888 = cc.TEXTURE_2D_PIXEL_FORMAT_RGBA8888;
cc.TEXTURE_2D_PIXEL_FORMAT_RGB888 = cc.TEXTURE_2D_PIXEL_FORMAT_RGB888;
cc.TEXTURE_2D_PIXEL_FORMAT_RGB565 = cc.TEXTURE_2D_PIXEL_FORMAT_RGB565;
cc.TEXTURE_2D_PIXEL_FORMAT_A8 = cc.TEXTURE_2D_PIXEL_FORMAT_A8;
cc.TEXTURE_2D_PIXEL_FORMAT_RGBA4444 = cc.TEXTURE_2D_PIXEL_FORMAT_RGBA4444;
cc.TEXTURE_2D_PIXEL_FORMAT_RGB5A1 = cc.TEXTURE_2D_PIXEL_FORMAT_RGB5A1;
cc.TEXTURE_2D_PIXEL_FORMAT_DEFAULT = cc.TEXTURE_2D_PIXEL_FORMAT_DEFAULT;
cc.g_defaultAlphaPixelFormat = cc.TEXTURE_2D_PIXEL_FORMAT_DEFAULT;
cc.PVRHaveAlphaPremultiplied_ = !1;
function _ccTexParams(a, b, c, d) {
    this.minFilter = a;
    this.magFilter = b;
    this.wrapS = c;
    this.wrapT = d
}
cc.Texture2D = cc.Class.extend({_pVRHaveAlphaPremultiplied: null, _pixelFormat: null, _pixelsWide: null, _pixelsHigh: null, _name: null, _contentSize: null, _maxS: null, _maxT: null, _hasPremultipliedAlpha: null, ctor: function () {
    cc.SUPPORT_PVRTC && (this.initWithPVRTCData = function (a, b, c, d, e, f) {
        if (!cc.Configuration.getInstance().isSupportsPVRTC())return cc.log("cocos2d: WARNING: PVRTC images is not supported."), !1;
        this.setAntiAliasTexParameters();
        new cc.GLsizei;
        this._contentSize = cc.size(e, e);
        this._pixelsHigh = this._pixelsWide =
            e;
        this._maxT = this._maxS = 1;
        this._hasPremultipliedAlpha = cc.PVRHaveAlphaPremultiplied_;
        this._pixelFormat = f;
        return!0
    })
}, getPixelFormat: function () {
    return this._pixelFormat
}, getPixelsWide: function () {
    return this._pixelsWide
}, getPixelsHigh: function () {
    return this._pixelsHigh
}, getName: function () {
    return this._name
}, getContentSizeInPixels: function () {
    var a = cc.size(0, 0);
    a.width = this._contentSize.width / cc.CONTENT_SCALE_FACTOR();
    a.height = this._contentSize.height / cc.CONTENT_SCALE_FACTOR();
    return a
}, getMaxS: function () {
    return this._maxS
},
    setMaxS: function (a) {
        this._maxS = a
    }, getMaxT: function () {
        return this._maxT
    }, setMaxT: function (a) {
        this._maxT = a
    }, getHasPremultipliedAlpha: function () {
        return this._hasPremultipliedAlpha
    }, description: function () {
        return"<cc.Texture2D | Name = " + this._name + " | Dimensions = " + this._pixelsWide + " x " + this._pixelsHigh + " | Coordinates = (" + this._maxS + ", " + this._maxT + ")>"
    }, releaseData: function (a) {
        cc.free(a)
    }, keepData: function (a) {
        return a
    }, initWithData: function (a, b, c, d) {
        this.setAntiAliasTexParameters();
        switch (a) {
            case cc.TEXTURE_2D_PIXEL_FORMAT_RGBA8888:
                break;
            case cc.TEXTURE_2D_PIXEL_FORMAT_RGB888:
                break;
            case cc.TEXTURE_2D_PIXEL_FORMAT_RGBA4444:
                break;
            case cc.TEXTURE_2D_PIXEL_FORMAT_RGB5A1:
                break;
            case cc.TEXTURE_2D_PIXEL_FORMAT_RGB565:
                break;
            case cc.TEXTURE_2D_PIXEL_FORMAT_AI88:
                break;
            case cc.TEXTURE_2D_PIXEL_FORMAT_A8:
                break;
            default:
                cc.Assert(0, "NSInternalInconsistencyException")
        }
        this._contentSize = d;
        this._pixelsWide = b;
        this._pixelsHigh = c;
        this._pixelFormat = a;
        this._maxS = d.width / b;
        this._maxT = d.height / c;
        this._hasPremultipliedAlpha = !1;
        return!0
    }, drawAtPoint: function () {
    },
    drawInRect: function () {
    }, initWithImage: function (a) {
        var b, c;
        if (null == a)return cc.log("cocos2d: cc.Texture2D. Can't create Texture. UIImage is nil"), !1;
        var d = cc.Configuration.getInstance();
        cc.TEXTURE_NPOT_SUPPORT ? d.isSupportsNPOT() && (b = a.getWidth(), c = a.getHeight()) : (b = cc.NextPOT(a.getWidth()), c = cc.NextPOT(a.getHeight()));
        d = d.getMaxTextureSize();
        return c > d || b > d ? (cc.log("cocos2d: WARNING: Image (%u x %u) is bigger than the supported %u x %u", b, c, d, d), null) : this._initPremultipliedATextureWithImage(a, b,
            c)
    }, initWithString: function (a, b, c, d, e) {
        3 == arguments.length && (d = arguments[1], e = arguments[2], b = cc.size(0, 0), c = cc.TEXT_ALIGNMENT_CENTER);
        cc.ENABLE_CACHE_TEXTTURE_DATA && cc.VolatileTexture.addStringTexture(this, a, b, c, d, e);
        var f = new cc.Image;
        eAlign = new cc.Image.ETextAlign;
        eAlign = cc.TEXT_ALIGNMENT_CENTER == c ? cc.Image.ALIGN_CENTER : cc.TEXT_ALIGNMENT_LEFT == c ? cc.Image.ALIGN_LEFT : cc.Image.ALIGN_RIGHT;
        return!f.initWithString(a, b.width, b.height, eAlign, d, e) ? !1 : this.initWithImage(f)
    }, initWithPVRFile: function (a) {
        var b =
            !1, c = new cc.TexturePVR;
        (b = c.initWithContentsOfFile(a)) ? (c.setRetainName(!0), this._name = c.getName(), this._maxT = this._maxS = 1, this._pixelsWide = c.getWidth(), this._pixelsHigh = c.getHeight(), this._contentSize = cc.size(this._pixelsWide, this._pixelsHigh), this._hasPremultipliedAlpha = cc.PVRHaveAlphaPremultiplied_, this._pixelFormat = c.getFormat(), this.setAntiAliasTexParameters()) : cc.log("cocos2d: Couldn't load PVR image %s", a);
        return b
    }, setTexParameters: function (a) {
        cc.Assert(this._pixelsWide == cc.NextPOT(this._pixelsWide) &&
            this._pixelsHigh == cc.NextPOT(this._pixelsHigh) || a.wrapS == gl.CLAMP_TO_EDGE && a.wrapT == gl.CLAMP_TO_EDGE, "gl.CLAMP_TO_EDGE should be used in NPOT textures")
    }, setAntiAliasTexParameters: function () {
        this.setTexParameters([gl.LINEAR, gl.LINEAR, gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE])
    }, setAliasTexParameters: function () {
        this.setTexParameters([gl.NEAREST, gl.NEAREST, gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE])
    }, generateMipmap: function () {
        cc.Assert(this._pixelsWide == cc.NextPOT(this._pixelsWide) && this._pixelsHigh == cc.NextPOT(this._pixelsHigh),
            "Mimpap texture only works in POT textures")
    }, bitsPerPixelForFormat: function () {
        var a = 0;
        switch (this._pixelFormat) {
            case cc.TEXTURE_2D_PIXEL_FORMAT_RGBA8888:
                a = 32;
                break;
            case cc.TEXTURE_2D_PIXEL_FORMAT_RGB565:
                a = 16;
                break;
            case cc.TEXTURE_2D_PIXEL_FORMAT_A8:
                a = 8;
                break;
            case cc.TEXTURE_2D_PIXEL_FORMAT_RGBA4444:
                a = 16;
                break;
            case cc.TEXTURE_2D_PIXEL_FORMAT_RGB5A1:
                a = 16;
                break;
            case cc.TEXTURE_2D_PIXEL_FORMAT_PVRTC4:
                a = 4;
                break;
            case cc.TEXTURE_2D_PIXEL_FORMAT_PVRTC2:
                a = 2;
                break;
            case cc.TEXTURE_2D_PIXEL_FORMAT_I8:
                a = 8;
                break;
            case cc.TEXTURE_2D_PIXEL_FORMAT_AI88:
                a = 16;
                break;
            case cc.TEXTURE_2D_PIXEL_FORMAT_RGB888:
                a = 24;
                break;
            default:
                a = -1, cc.Assert(!1, "illegal pixel format"), cc.log("bitsPerPixelForFormat: %d, cannot give useful result", this._pixelFormat)
        }
        return a
    }, _initPremultipliedATextureWithImage: function (a, b, c) {
        var d = null, e = null, f = null, g;
        g = cc.size(0, 0);
        var h = new cc.Texture2DPixelFormat, h = new cc.size_t;
        g = a.hasAlpha();
        h = a.getBitsPerComponent();
        g ? h = cc.g_defaultAlphaPixelFormat : 8 <= h ? h = cc.TEXTURE_2D_PIXEL_FORMAT_RGB888 : (cc.log("cocos2d: cc.Texture2D: Using RGB565 texture since image has no alpha"),
            h = cc.TEXTURE_2D_PIXEL_FORMAT_RGB565);
        g = cc.size(a.getWidth(), a.getHeight());
        switch (h) {
            case cc.TEXTURE_2D_PIXEL_FORMAT_RGBA8888:
            case cc.TEXTURE_2D_PIXEL_FORMAT_RGBA4444:
            case cc.TEXTURE_2D_PIXEL_FORMAT_RGB5A1:
            case cc.TEXTURE_2D_PIXEL_FORMAT_RGB565:
            case cc.TEXTURE_2D_PIXEL_FORMAT_A8:
                e = a.getData();
                cc.Assert(null != e, "null image data.");
                if (a.getWidth() == b && a.getHeight() == c)d = new (4 * c * b), cc.memcpy(d, e, 4 * c * b); else for (var f = d = new (4 * c * b), k = a.getHeight(), j = 0; j < k; ++j)cc.memcpy(f + 4 * b * j, e + 4 * a.getWidth() * j, 4 * a.getWidth());
                break;
            case cc.TEXTURE_2D_PIXEL_FORMAT_RGB888:
                e = a.getData();
                cc.Assert(null != e, "null image data.");
                if (a.getWidth() == b && a.getHeight() == c)d = new (3 * c * b), cc.memcpy(d, e, 3 * c * b); else {
                    f = d = new (3 * c * b);
                    k = a.getHeight();
                    for (j = 0; j < k; ++j)cc.memcpy(f + 3 * b * j, e + 3 * a.getWidth() * j, 3 * a.getWidth())
                }
                break;
            default:
                cc.Assert(0, "Invalid pixel format")
        }
        if (h == cc.TEXTURE_2D_PIXEL_FORMAT_RGB565) {
            e = new (2 * c * b);
            f = d;
            k = b * c;
            for (j = 0; j < k; ++j, ++f);
            delete d;
            d = e
        } else if (h == cc.TEXTURE_2D_PIXEL_FORMAT_RGBA4444) {
            e = new (2 * c * b);
            f = d;
            k = b * c;
            for (j =
                     0; j < k; ++j, ++f);
            delete d;
            d = e
        } else if (h == cc.TEXTURE_2D_PIXEL_FORMAT_RGB5A1) {
            e = new (2 * c * b);
            f = d;
            k = b * c;
            for (j = 0; j < k; ++j, ++f);
            delete d;
            d = e
        } else h == cc.TEXTURE_2D_PIXEL_FORMAT_A8 && (h = cc.TEXTURE_2D_PIXEL_FORMAT_RGBA8888);
        d && (this.initWithData(d, h, b, c, g), this._hasPremultipliedAlpha = a.isPremultipliedAlpha(), delete d);
        return!0
    }});
cc.Texture2D.setDefaultAlphaPixelFormat = function (a) {
    cc.g_defaultAlphaPixelFormat = a
};
cc.Texture2D.defaultAlphaPixelFormat = function () {
    return cc.g_defaultAlphaPixelFormat
};
cc.Texture2D.PVRImagesHavePremultipliedAlpha = function (a) {
    cc.PVRHaveAlphaPremultiplied_ = a
};
cc.g_sharedTextureCache = null;
cc.loadImage = function (a) {
    if (cc.computeImageFormatType(a) == cc.FMT_UNKNOWN)cc.log("unsupported format" + a); else {
        var b = new Image;
        b.src = a;
        b.onLoad = function () {
            cc.TextureCache.getInstance().cacheImage(a, b)
        }
    }
};
cc.computeImageFormatType = function (a) {
    return 0 < a.toLowerCase().indexOf(".jpg") || 0 < a.toLowerCase().indexOf(".jpeg") ? cc.FMT_JPG : 0 < a.indexOf(".png") || 0 < a.indexOf(".PNG") ? cc.FMT_PNG : cc.FMT_UNKNOWN
};
cc.TextureCache = cc.Class.extend({textures: {}, _textureColorsCache: {}, _textureKeySeq: 1E3, ctor: function () {
    cc.Assert(null == cc.g_sharedTextureCache, "Attempted to allocate a second instance of a singleton.");
    this._textureKeySeq += 0 | 1E3 * Math.random()
}, addImageAsync: function (a, b, c) {
    cc.Assert(null != a, "TextureCache: path MUST not be null");
    var a = cc.FileUtils.getInstance().fullPathFromRelativePath(a), d = this.textures[a.toString()];
    if (d)this._addImageAsyncCallBack(b, c); else {
        var d = new Image, e = this;
        d.addEventListener("load",
            function () {
                e._addImageAsyncCallBack(b, c)
            });
        d.src = a;
        this.textures[a.toString()] = d
    }
    if (cc.renderContextType == cc.CANVAS)return this.textures[a.toString()]
}, _addImageAsyncCallBack: function (a, b) {
    if (a && "string" == typeof b)a[b](); else a && "function" == typeof b && b.call(a)
}, addPVRTCImage: function () {
    cc.Assert(0, "TextureCache:addPVRTCImage does not support")
}, description: function () {
    return"<TextureCache | Number of textures = " + this.textures.length + ">"
}, addImage: function (a) {
    cc.Assert(null != a, "TextureCache: path MUST not be null");
    var a = cc.FileUtils.getInstance().fullPathFromRelativePath(a), b = this.textures[a.toString()];
    if (b)cc.Loader.getInstance().onResLoaded(); else b = new Image, b.addEventListener("load", function () {
        cc.Loader.getInstance().onResLoaded()
    }), b.addEventListener("error", function () {
        cc.Loader.getInstance().onResLoadingErr(a)
    }), b.src = a, this.textures[a.toString()] = b;
    if (cc.renderContextType == cc.CANVAS)return this.textures[a.toString()]
}, cacheImage: function (a, b) {
    this.textures[a.toString()] || (this.textures[a.toString()] =
        b)
}, addUIImage: function (a, b) {
    cc.Assert(null != a, "TextureCache: image MUST not be nulll");
    var c = null;
    if (b && this.textures.hasOwnProperty(b) && (c = this.textures[b]))return c;
    c = new cc.Texture2D;
    c.initWithImage(a);
    null != b && null != c ? this.textures[b] = c : cc.log("cocos2d: Couldn't add UIImage in TextureCache");
    return c
}, textureForKey: function (a) {
    return this.textures.hasOwnProperty(a) ? this.textures[a] : null
}, getKeyByTexture: function (a) {
    for (var b in this.textures)if (this.textures[b] == a)return b;
    return null
}, _generalTextureKey: function () {
    this._textureKeySeq++;
    return"_textureKey_" + this._textureKeySeq
}, getTextureColors: function (a) {
    var b = this.getKeyByTexture(a);
    b || (b = a instanceof HTMLImageElement ? a.src : this._generalTextureKey());
    this._textureColorsCache.hasOwnProperty(b) || (this._textureColorsCache[b] = cc.generateTextureCacheForColor(a));
    return this._textureColorsCache[b]
}, removeAllTextures: function () {
    this.textures = {}
}, removeTexture: function (a) {
    if (a)for (var b in this.textures)if (this.textures[b] == a) {
        delete this.textures[b];
        break
    }
}, removeTextureForKey: function (a) {
    null !=
        a && this.textures[a] && delete this.textures[a]
}, dumpCachedTextureInfo: function () {
    var a = 0, b = 0, c;
    for (c in this.textures) {
        var d = this.textures[c], e = d.bitsPerPixelForFormat(), f = d.getPixelsWide() * d.getPixelsHigh() * e / 8, b = b + f;
        a++;
        cc.log("cocos2d: '" + d.toString() + "' id=" + d.getName() + " " + d.getPixelsWide() + " x " + d.getPixelsHigh() + " @ " + e + " bpp => " + f / 1024 + " KB")
    }
    cc.log("cocos2d: TextureCache dumpDebugInfo: " + a + " textures, for " + b / 1024 + " KB (" + (b / 1048576).toFixed(2) + " MB)")
}, addPVRImage: function (a) {
    cc.Assert(null !=
        a, "TextureCache: file image MUST not be null");
    a = cc.FileUtils.getInstance().fullPathFromRelativePath(a);
    if (null != this.textures[a])return this.textures[a];
    var b = new cc.Texture2D;
    b.initWithPVRFile(a) ? this.textures[a] = b : cc.log("cocos2d: Couldn't add PVRImage:" + a + " in TextureCache");
    return b
}});
cc.TextureCache.getInstance = function () {
    cc.g_sharedTextureCache || (cc.g_sharedTextureCache = new cc.TextureCache);
    return cc.g_sharedTextureCache
};
cc.TextureCache.purgeSharedTextureCache = function () {
    cc.g_sharedTextureCache = null
};
cc.TextureAtlas = cc.Class.extend({_indices: [], _buffersVBO: [0, 1], _dirty: !1, _capacity: 0, _texture: null, _quads: [], getTotalQuads: function () {
    return this._quads.length
}, getCapacity: function () {
    return this._capacity
}, getTexture: function () {
    return this._texture
}, setTexture: function (a) {
    this._texture = a
}, getQuads: function () {
    return this._quads
}, setQuads: function (a) {
    this._quads = a
}, description: function () {
    return"<CCTextureAtlas | totalQuads =" + this._totalQuads + ">"
}, _initIndices: function () {
    if (0 != this._capacity)for (var a =
        0; a < this._capacity; a++)this._indices[6 * a + 0] = 4 * a + 0, this._indices[6 * a + 1] = 4 * a + 0, this._indices[6 * a + 2] = 4 * a + 2, this._indices[6 * a + 3] = 4 * a + 1, this._indices[6 * a + 4] = 4 * a + 3, this._indices[6 * a + 5] = 4 * a + 3
}, initWithFile: function (a, b) {
    var c = cc.TextureCache.getInstance().addImage(a);
    if (c)return this.initWithTexture(c, b);
    cc.log("cocos2d: Could not open file: " + a);
    return null
}, initWithTexture: function (a, b) {
    cc.Assert(null != a, "TextureAtlas.initWithTexture():texture should not be null");
    this._capacity = b;
    this._texture = a;
    cc.Assert(0 ==
        this._quads.length && 0 == this._indices.length, "TextureAtlas.initWithTexture():_quads and _indices should not be null");
    this._quads = [];
    this._indices = [];
    if ((!this._quads || !this._indices) && 0 < this._capacity)return!1;
    this._dirty = !0;
    this._initIndices();
    return!0
}, updateQuad: function (a, b) {
    this._quads[b] = a;
    this._dirty = !0
}, insertQuad: function (a, b) {
    this._quads = cc.ArrayAppendObjectToIndex(this._quads, a, b);
    this._dirty = !0
}, insertQuadFromIndex: function (a, b) {
    if (a != b) {
        var c = this._quads[a];
        cc.ArrayRemoveObjectAtIndex(this._quads,
            a);
        this._quads = a > b ? cc.ArrayAppendObjectToIndex(this._quads, c, b) : cc.ArrayAppendObjectToIndex(this._quads, c, b - 1);
        this._dirty = !0
    }
}, removeQuadAtIndex: function (a) {
    cc.ArrayRemoveObjectAtIndex(this._quads, a);
    this._dirty = !0
}, removeAllQuads: function () {
    this._quads.length = 0
}, resizeCapacity: function (a) {
    if (a == this._capacity)return!0;
    this._totalQuads = Math.min(this._totalQuads, a);
    this._capacity = a;
    return!0
}, drawNumberOfQuads: function () {
}, drawQuads: function () {
    this.drawNumberOfQuads(this._quads.length, 0)
}});
cc.TextureAtlas.create = function (a, b) {
    var c = new cc.TextureAtlas;
    return c && c.initWithFile(a, b) ? c : null
};
cc.TextureAtlas.createWithTexture = function (a, b) {
    var c = new cc.TextureAtlas;
    return c && c.initWithTexture(a, b) ? c : null
};
cc.IMAGE_FORMAT_JPEG = 0;
cc.IMAGE_FORMAT_PNG = 1;
cc.IMAGE_FORMAT_RAWDATA = 2;
cc.NextPOT = function (a) {
    a -= 1;
    a |= a >> 1;
    a |= a >> 2;
    a |= a >> 4;
    a |= a >> 8;
    return(a | a >> 16) + 1
};
cc.RenderTexture = cc.Node.extend({canvas: null, context: null, _fBO: 0, _depthRenderBuffer: 0, _oldFBO: 0, _texture: null, _uITextureImage: null, _pixelFormat: cc.TEXTURE_2D_PIXEL_FORMAT_RGBA8888, _sprite: null, ctor: function () {
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    this.setAnchorPoint(cc.p(0, 0))
}, getSprite: function () {
    return this._sprite
}, setSprite: function (a) {
    this._sprite = a
}, getCanvas: function () {
    return this.canvas
}, setContentSize: function (a) {
    a && (this._super(a), this.canvas.width =
        1.5 * a.width, this.canvas.height = 1.5 * a.height, this.context.translate(0, this.canvas.height))
}, initWithWidthAndHeight: function (a, b, c, d) {
    if (cc.renderContextType == cc.CANVAS)this.canvas.width = a || 10, this.canvas.height = b || 10, this.context.translate(0, this.canvas.height), this._sprite = cc.Sprite.createWithTexture(this.canvas); else {
        cc.Assert(this._pixelFormat != cc.TEXTURE_2D_PIXEL_FORMAT_A8, "only RGB and RGBA formats are valid for a render texture");
        try {
            a *= cc.CONTENT_SCALE_FACTOR();
            b *= cc.CONTENT_SCALE_FACTOR();
            glGetIntegerv(gl.FRAMEBUFFER_BINDING, this._oldFBO);
            var e = 0, f = 0;
            cc.Configuration.getInstance().supportsNPOT() ? (e = a, f = b) : (e = cc.NextPOT(a), f = cc.NextPOT(b));
            for (var g = [], h = 0; h < 4 * e * f; h++)g[h] = 0;
            this._pixelFormat = c;
            this._texture = new cc.Texture2D;
            if (!this._texture)return!1;
            this._texture.initWithData(g, this._pixelFormat, e, f, cc.size(a, b));
            glGetIntegerv(GL_RENDERBUFFER_BINDING, void 0);
            glGenFramebuffers(1, this._fBO);
            glBindFramebuffer(GL_FRAMEBUFFER, this._fBO);
            glFramebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0,
                GL_TEXTURE_2D, this._texture.getName(), 0);
            0 != this._depthRenderBuffer && (glGenRenderbuffers(1, this._depthRenderBuffer), glBindRenderbuffer(GL_RENDERBUFFER, this._depthRenderBuffer), glRenderbufferStorage(GL_RENDERBUFFER, d, e, f), glFramebufferRenderbuffer(GL_FRAMEBUFFER, GL_DEPTH_ATTACHMENT, GL_RENDERBUFFER, this._depthRenderBuffer), d == gl.DEPTH24_STENCIL8 && glFramebufferRenderbuffer(GL_FRAMEBUFFER, GL_STENCIL_ATTACHMENT, GL_RENDERBUFFER, this._depthRenderBuffer));
            cc.Assert(glCheckFramebufferStatus(GL_FRAMEBUFFER) ==
                GL_FRAMEBUFFER_COMPLETE, "Could not attach texture to framebuffer");
            this._texture.setAliasTexParameters();
            this._sprite = cc.Sprite.createWithTexture(this._texture);
            this._sprite.setScaleY(-1);
            this.addChild(this._sprite);
            this._sprite.setBlendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
            glBindRenderbuffer(GL_RENDERBUFFER, void 0);
            glBindFramebuffer(GL_FRAMEBUFFER, this._oldFBO)
        } catch (k) {
            return!1
        }
    }
    return!0
}, begin: function () {
    kmGLPushMatrix();
    var a = this._texture.getContentSizeInPixels(), b = cc.Director.getInstance().getWinSizeInPixels(),
        c = b.width / a.width, b = b.height / a.height;
    glViewport(0, 0, a.width, a.height);
    kmMat4OrthographicProjection(void 0, -1 / c, 1 / c, -1 / b, 1 / b, -1, 1);
    kmGLMultMatrix(void 0);
    glGetIntegerv(gl.FRAMEBUFFER_BINDING, this._oldFBO);
    glBindFramebuffer(gl.FRAMEBUFFER, this._fBO)
}, beginWithClear: function (a, b, c, d, e, f) {
    var g;
    switch (arguments.length) {
        case 4:
            this.begin();
            g = [0, 0, 0, 0];
            glGetFloatv(GL_COLOR_CLEAR_VALUE, g);
            glClearColor(a, b, c, d);
            glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
            glClearColor(g[0], g[1], g[2], g[3]);
            break;
        case 5:
            this.begin();
            g = [0, 0, 0, 0];
            glGetFloatv(GL_COLOR_CLEAR_VALUE, g);
            glGetFloatv(GL_DEPTH_CLEAR_VALUE, void 0);
            glClearColor(a, b, c, d);
            glClearDepth(e);
            glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
            glClearColor(g[0], g[1], g[2], g[3]);
            glClearDepth(void 0);
            break;
        case 6:
            this.begin();
            g = [0, 0, 0, 0];
            glGetFloatv(GL_COLOR_CLEAR_VALUE, g);
            glGetFloatv(GL_DEPTH_CLEAR_VALUE, void 0);
            glGetIntegerv(GL_STENCIL_CLEAR_VALUE, void 0);
            glClearColor(a, b, c, d);
            glClearDepth(e);
            glClearStencil(f);
            glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT | GL_STENCIL_BUFFER_BIT);
            glClearColor(g[0], g[1], g[2], g[3]);
            glClearDepth(void 0);
            glClearStencil(void 0);
            break;
        default:
            throw"unknown arguments";
    }
}, end: function () {
    glBindFramebuffer(GL_FRAMEBUFFER, this._oldFBO);
    kmGLPopMatrix();
    var a = cc.Director.getInstance(), b = a.getWinSizeInPixels();
    glViewport(0, 0, b.width * cc.CONTENT_SCALE_FACTOR(), b.height * cc.CONTENT_SCALE_FACTOR());
    a.getProjection() == cc.DIRECTOR_PROJECTION_3D && 1 != cc.CONTENT_SCALE_FACTOR() && glViewport(-b.width / 2, -b.height / 2, b.width * cc.CONTENT_SCALE_FACTOR(), b.height * cc.CONTENT_SCALE_FACTOR());
    a.setProjection(a.getProjection())
}, clear: function (a, b, c, d) {
    cc.renderContextType == cc.CANVAS ? a ? this.context.clearRect(a.origin.x, a.origin.y, a.size.width, a.size.height) : this.context.clearRect(0, 0, this.canvas.width, -this.canvas.height) : (this.beginWithClear(a, b, c, d), this.end())
}, clearDepth: function () {
    this.begin();
    glGetFloatv(GL_DEPTH_CLEAR_VALUE, void 0);
    glClearDepth(depthValue);
    glClear(GL_DEPTH_BUFFER_BIT);
    glClearDepth(void 0);
    this.end()
}, clearStencil: function (a) {
    glGetIntegerv(GL_STENCIL_CLEAR_VALUE,
        void 0);
    glClearStencil(a);
    glClear(GL_STENCIL_BUFFER_BIT);
    glClearStencil(void 0)
}, newCCImage: function () {
    cc.Assert(this._pixelFormat == cc.TEXTURE_2D_PIXEL_FORMAT_RGBA8888, "only RGBA8888 can be saved as image");
    if (!this._texture)return null;
    var a = this._texture.getContentSizeInPixels(), b = a.width, a = a.height, c = null, d = null, e = new cc.Image;
    try {
        c = [];
        c.length = 4 * b * a;
        if (!c)return e;
        d = [];
        d.length = 4 * b * a;
        if (!d)return e;
        this.begin();
        glPixelStorei(GL_PACK_ALIGNMENT, 1);
        glReadPixels(0, 0, b, a, GL_RGBA, GL_UNSIGNED_BYTE, d);
        this.end();
        for (var f = 0; f < a; ++f)this._memcpy(c, 4 * f * b, d, 4 * (a - f - 1) * b, 4 * b);
        e.initWithImageData(c, 4 * b * a, cc.FMT_RAWDATA, b, a, 8)
    } catch (g) {
    }
    return e
}, _memcpy: function (a, b, c, d, e) {
    for (var f = 0; f < e; f++)a[b + f] = c[d + f]
}, saveToFile: function (a, b) {
    b || (a = cc.FileUtils.getInstance().getWriteablePath() + a);
    b = b || cc.IMAGE_FORMAT_JPEG;
    cc.Assert(b == cc.IMAGE_FORMAT_JPEG || b == cc.IMAGE_FORMAT_PNG, "the image can only be saved as JPG or PNG format");
    var c = this.newCCImage();
    return c ? c.saveToFile(a, !0) : !1
}, listenToBackground: function () {
    if (cc.ENABLE_CACHE_TEXTURE_DATA)if (cc.SAFE_DELETE(this.pITextureImage),
        this.pITextureImage = this.newCCImage()) {
        var a = this._texture.getContentSizeInPixels();
        VolatileTexture.addDataTexture(this._texture, this.pITextureImage.getData(), cc.TEXTURE_2D_PIXEL_FORMAT_RGBA8888, a)
    } else cc.log("Cache rendertexture failed!")
}});
cc.RenderTexture.create = function (a, b, c, d) {
    var c = c || cc.TEXTURE_2D_PIXEL_FORMAT_RGBA8888, d = d || 0, e = new cc.RenderTexture;
    return e && e.initWithWidthAndHeight(a, b, c, d) ? e : null
};
cc.PROGRESS_TIMER_TYPE_RADIAL = 0;
cc.PROGRESS_TIMER_TYPE_BAR = 1;
cc.PROGRESS_TEXTURE_COORDS_COUNT = 4;
cc.PROGRESS_TEXTURE_COORDS = 75;
cc.ProgressTimer = cc.Node.extend({RGBAProtocol: !0, _type: null, _percentage: 0, _sprite: null, _vertexDataCount: 0, _vertexData: null, _midPoint: cc.PointZero(), _barChangeRate: cc.PointZero(), _reverseDirection: !1, ctor: function () {
    this._type = cc.PROGRESS_TIMER_TYPE_RADIAL;
    this._percentage = 0;
    this._midPoint = cc.p(0, 0);
    this._barChangeRate = cc.p(0, 0);
    this._reverseDirection = !1
}, getMidpoint: function () {
    return this._midPoint
}, setMidpoint: function (a) {
    this._midPoint = cc.pClamp(a, cc.PointZero(), cc.p(1, 1))
}, getBarChangeRate: function () {
    return this._barChangeRate
},
    setBarChangeRate: function (a) {
        this._barChangeRate = cc.pClamp(a, cc.PointZero(), cc.p(1, 1))
    }, getType: function () {
        return this._type
    }, getPercentage: function () {
        return this._percentage
    }, getSprite: function () {
        return this._sprite
    }, initWithSprite: function (a) {
        this.setPercentage(0);
        this._vertexData = null;
        this._vertexDataCount = 0;
        this.setAnchorPoint(cc.p(0.5, 0.5));
        this._type = cc.PROGRESS_TIMER_TYPE_RADIAL;
        this._reverseDirection = !1;
        this.setMidpoint(cc.p(0.5, 0.5));
        this.setBarChangeRate(cc.p(1, 1));
        this.setSprite(a);
        return!0
    },
    setPercentage: function (a) {
        this._percentage != a && (this._percentage = cc.clampf(a, 0, 100), this._updateProgress())
    }, setSprite: function (a) {
        this._sprite != a && (this._sprite = a, this.setContentSize(this._sprite.getContentSize()), this._vertexData && (this._vertexData = null, this._vertexDataCount = 0))
    }, setType: function (a) {
        a != this._type && (this._vertexData && (this._vertexData = null, this._vertexDataCount = 0), this._type = a)
    }, setColor: function (a) {
        this._sprite.setColor(a);
        this._updateColor()
    }, getColor: function () {
        return this._sprite.getColor()
    },
    getOpacity: function () {
        return this._sprite.getOpacity()
    }, setOpacity: function (a) {
        this._sprite.setOpacity(a);
        this._updateColor()
    }, setOpacityModifyRGB: function () {
    }, isOpacityModifyRGB: function () {
        return!1
    }, isReverseDirection: function () {
        return this._reverseDirection
    }, setReverseDirection: function (a) {
        this._reverseDirection != a && (this._reverseDirection = a, this._vertexData = null, this._vertexDataCount = 0)
    }, draw: function (a) {
        if (cc.renderContextType == cc.CANVAS) {
            a = a || cc.renderContext;
            a.globalAlpha = this._sprite._opacity /
                255;
            var b;
            b = b = 0;
            this._sprite._flipX && (b = cc.p(this._sprite._contentSize.width / 2, this._sprite._contentSize.height / 2), b = 0 | b.x - this._sprite._anchorPointInPoints.x, a.translate(b, 0), a.scale(-1, 1));
            this._sprite._flipY && (b = cc.p(this._sprite._contentSize.width / 2, this._sprite._contentSize.height / 2), b = -(0 | b.y - this._sprite._anchorPointInPoints.y), a.translate(0, b), a.scale(1, -1));
            this._type == cc.PROGRESS_TIMER_TYPE_BAR ? (b = cc.p(-this._sprite._anchorPointInPoints.x + this._sprite._offsetPosition.x + this._drawPosition.x,
                -this._sprite._anchorPointInPoints.y + this._sprite._offsetPosition.y + this._drawPosition.y), this._sprite._texture instanceof HTMLImageElement ? 0 != this._originSize.width && 0 != this._originSize.height && a.drawImage(this._sprite._texture, this._sprite._rect.origin.x + this._origin.x, this._sprite._rect.origin.y + this._origin.y, this._originSize.width, this._originSize.height, b.x, -(b.y + this._drawSize.height), this._originSize.width, this._originSize.height) : this._sprite._texture instanceof HTMLCanvasElement && 0 != this._originSize.width &&
                0 != this._originSize.height && a.drawImage(this._sprite._texture, this._origin.x, this._origin.y, this._originSize.width, this._originSize.height, b.x, -(b.y + this._drawSize.height), this._originSize.width, this._originSize.height)) : (a.beginPath(), a.arc(this._origin.x, this._origin.y, this._radius, Math.PI / 180 * this._startAngle, Math.PI / 180 * this._endAngle, !1), a.lineTo(this._origin.x, this._origin.y), a.clip(), a.closePath(), b = this._sprite._offsetPosition, b = cc.p(0 | -this._sprite._anchorPointInPoints.x + b.x, 0 | -this._sprite._anchorPointInPoints.y +
                b.y), this._sprite._texture instanceof HTMLImageElement ? a.drawImage(this._sprite._texture, this._sprite._rect.origin.x, this._sprite._rect.origin.y, this._sprite._rect.size.width, this._sprite._rect.size.height, b.x, -(b.y + this._sprite._rect.size.height), this._sprite._rect.size.width, this._sprite._rect.size.height) : this._sprite._texture instanceof HTMLCanvasElement && a.drawImage(this._sprite._texture, 0, 0, this._sprite._rect.size.width, this._sprite._rect.size.height, b.x, -(b.y + this._sprite._rect.size.height),
                this._sprite._rect.size.width, this._sprite._rect.size.height))
        } else if (!this._vertexData || !this._sprite)return;
        cc.INCREMENT_GL_DRAWS(1)
    }, _textureCoordFromAlphaPoint: function (a) {
        var b = new cc.Tex2F(0, 0);
        if (!this._sprite)return b;
        var c = this._sprite.getQuad(), b = cc.p(c.bl.texCoords.u, c.bl.texCoords.v), c = cc.p(c.tr.texCoords.u, c.tr.texCoords.v);
        if (this._sprite.isTextureRectRotated()) {
            var d = a.x;
            a.x = a.y;
            a.y = d
        }
        return new cc.Tex2F(b.x * (1 - a.x) + c.x * a.x, b.y * (1 - a.y) + c.y * a.y)
    }, _vertexFromAlphaPoint: function (a) {
        var b =
            new cc.Tex2F(0, 0);
        if (!this._sprite)return b;
        var c = this._sprite.getQuad(), d = cc.p(c.bl.vertices.x, c.bl.vertices.y), c = cc.p(c.tr.vertices.x, c.tr.vertices.y);
        b.x = d.x * (1 - a.x) + c.x * a.x;
        b.y = d.y * (1 - a.y) + c.y * a.y;
        return b
    }, _origin: cc.PointZero(), _originSize: cc.SizeZero(), _drawSize: cc.SizeZero(), _drawPosition: cc.PointZero(), _startAngle: 270, _endAngle: 270, _radius: 0, _updateProgress: function () {
        if (cc.renderContextType == cc.CANVAS) {
            var a = this._sprite.getContentSize(), b = this._sprite.getTextureRect().size;
            if (this._type ==
                cc.PROGRESS_TIMER_TYPE_RADIAL)this._origin = cc.p(-(a.width * (0.5 - this._midPoint.x)), -(a.height * (0.5 - this._midPoint.y))), this._radius = Math.round(Math.sqrt(a.width * a.width + a.height * a.height)), this._reverseDirection ? this._startAngle = 270 - 3.6 * this._percentage : this._endAngle = 270 + 3.6 * this._percentage; else {
                this._origin = cc.p(0, 0);
                this._drawPosition = cc.p(0, 0);
                var c = this._percentage / 100, d = cc.p(a.width * this._midPoint.x, a.height * this._midPoint.y), e = cc.p(b.width * this._midPoint.x, b.height * this._midPoint.y), f = cc.size(a.width *
                    (1 - this._barChangeRate.x), a.height * (1 - this._barChangeRate.y)), g = cc.size((a.width - f.width) * c, (a.height - f.height) * c);
                this._drawSize = cc.size(f.width + g.width, f.height + g.height);
                f = cc.size(b.width * (1 - this._barChangeRate.x), b.height * (1 - this._barChangeRate.y));
                g = cc.size((b.width - f.width) * c, (b.height - f.height) * c);
                this._originSize = cc.size(f.width + g.width, f.height + g.height);
                f = d.x * c;
                g = e.x * c;
                a.width == this._drawSize.width ? (this._origin.x = 0, this._drawPosition.x = 0) : (this._origin.x = e.x - g, this._drawPosition.x = d.x -
                    f);
                f = (b.height - e.y) * c;
                a.height == this._drawSize.height ? (this._origin.y = 0, this._drawPosition.y = 0) : (this._origin.y = b.height - e.y - f, this._drawPosition.y = d.y - d.y * c)
            }
        } else switch (this._type) {
            case cc.PROGRESS_TIMER_TYPE_RADIAL:
                this._updateRadial();
                break;
            case cc.PROGRESS_TIMER_TYPE_BAR:
                this._updateBar()
        }
    }, _updateBar: function () {
        if (this._sprite) {
            var a = this._percentage / 100, b = cc.pMult(cc.p(1 - this._barChangeRate.x + a * this._barChangeRate.x, 1 - this._barChangeRate.y + a * this._barChangeRate.y), 0.5), a = cc.pSub(this._midPoint,
                b), b = cc.pAdd(this._midPoint, b);
            0 > a.x && (b.x += -a.x, a.x = 0);
            1 < b.x && (a.x -= b.x - 1, b.x = 1);
            0 > a.y && (b.y += -a.y, a.y = 0);
            1 < b.y && (a.y -= b.y - 1, b.y = 1);
            if (this._reverseDirection) {
                if (!this._vertexData) {
                    this._vertexData = 8;
                    this._vertexData = [];
                    for (i = 0; i < this._vertexDataCount; i++)this._vertexData[i] = new cc.V2F_C4B_T2F;
                    cc.Assert(this._vertexData, "cc.ProgressTimer. Not enough memory");
                    this._vertexData[0].texCoords = this._textureCoordFromAlphaPoint(cc.p(0, 1));
                    this._vertexData[0].vertices = this._vertexFromAlphaPoint(cc.p(0, 1));
                    this._vertexData[1].texCoords = this._textureCoordFromAlphaPoint(cc.p(0, 0));
                    this._vertexData[1].vertices = this._vertexFromAlphaPoint(cc.p(0, 0));
                    this._vertexData[6].texCoords = this._textureCoordFromAlphaPoint(cc.p(1, 1));
                    this._vertexData[6].vertices = this._vertexFromAlphaPoint(cc.p(1, 1));
                    this._vertexData[7].texCoords = this._textureCoordFromAlphaPoint(cc.p(1, 0));
                    this._vertexData[7].vertices = this._vertexFromAlphaPoint(cc.p(1, 0))
                }
                this._vertexData[2].texCoords = this._textureCoordFromAlphaPoint(cc.p(a.x, b.y));
                this._vertexData[2].vertices = this._vertexFromAlphaPoint(cc.p(a.x, b.y));
                this._vertexData[3].texCoords = this._textureCoordFromAlphaPoint(cc.p(a.x, a.y));
                this._vertexData[3].vertices = this._vertexFromAlphaPoint(cc.p(a.x, a.y));
                this._vertexData[4].texCoords = this._textureCoordFromAlphaPoint(cc.p(b.x, b.y));
                this._vertexData[4].vertices = this._vertexFromAlphaPoint(cc.p(b.x, b.y));
                this._vertexData[5].texCoords = this._textureCoordFromAlphaPoint(cc.p(b.x, a.y));
                this._vertexData[5].vertices = this._vertexFromAlphaPoint(cc.p(b.x,
                    a.y))
            } else {
                if (!this._vertexData) {
                    this._vertexDataCount = 4;
                    this._vertexData = [];
                    for (i = 0; i < this._vertexDataCount; i++)this._vertexData[i] = new cc.V2F_C4B_T2F;
                    cc.Assert(this._vertexData, "cc.ProgressTimer. Not enough memory")
                }
                this._vertexData[0].texCoords = this._textureCoordFromAlphaPoint(cc.p(a.x, b.y));
                this._vertexData[0].vertices = this._vertexFromAlphaPoint(cc.p(a.x, b.y));
                this._vertexData[1].texCoords = this._textureCoordFromAlphaPoint(cc.p(a.x, a.y));
                this._vertexData[1].vertices = this._vertexFromAlphaPoint(cc.p(a.x,
                    a.y));
                this._vertexData[2].texCoords = this._textureCoordFromAlphaPoint(cc.p(b.x, b.y));
                this._vertexData[2].vertices = this._vertexFromAlphaPoint(cc.p(b.x, b.y));
                this._vertexData[3].texCoords = this._textureCoordFromAlphaPoint(cc.p(b.x, a.y));
                this._vertexData[3].vertices = this._vertexFromAlphaPoint(cc.p(b.x, a.y))
            }
            this._updateColor()
        }
    }, _updateRadial: function () {
        if (this._sprite) {
            var a;
            a = this._percentage / 100;
            var b = 2 * cc.PI * (this._reverseDirection ? a : 1 - a), c = cc.p(this._midPoint.x, 1), d = cc.pRotateByAngle(c, this._midPoint,
                b), b = 0, e = cc.PointZero;
            if (0 == a)e = c, b = 0; else if (1 == a)e = c, b = 4; else {
                e = cc.FLT_MAX;
                for (a = 0; a <= cc.PROGRESS_TEXTURE_COORDS_COUNT; ++a) {
                    var f = (a + (cc.PROGRESS_TEXTURE_COORDS_COUNT - 1)) % cc.PROGRESS_TEXTURE_COORDS_COUNT, g = this._boundaryTexCoord(a % cc.PROGRESS_TEXTURE_COORDS_COUNT), f = this._boundaryTexCoord(f);
                    0 == a ? f = cc.pLerp(g, f, 1 - this._midPoint.x) : 4 == a && (g = cc.pLerp(g, f, 1 - this._midPoint.x));
                    var h = cc.p(0, 0);
                    if (cc.pLineIntersect(g, f, this._midPoint, d, h) && (!(0 == a || 4 == a) || 0 <= h.width && 1 >= h.width) && 0 <= h.height && 0 < e)e = 0,
                        b = a
                }
                e = cc.pAdd(this._midPoint, cc.pMult(cc.pSub(d, this._midPoint), e))
            }
            d = !0;
            this._vertexDataCount != b + 3 && (d = !1, this._vertexData = null, this._vertexDataCount = 0);
            if (!this._vertexData) {
                this._vertexDataCount = b + 3;
                this._vertexData = [];
                for (a = 0; a < this._vertexDataCount; a++)this._vertexData[a] = new cc.V2F_C4B_T2F;
                cc.Assert(this._vertexData, "cc.ProgressTimer. Not enough memory")
            }
            this._updateColor();
            if (!d) {
                this._vertexData[0].texCoords = this._textureCoordFromAlphaPoint(this._midPoint);
                this._vertexData[0].vertices = this._vertexFromAlphaPoint(this._midPoint);
                this._vertexData[1].texCoords = this._textureCoordFromAlphaPoint(c);
                this._vertexData[1].vertices = this._vertexFromAlphaPoint(c);
                for (a = 0; a < b; ++a)c = this._boundaryTexCoord(a), this._vertexData[a + 2].texCoords = this._textureCoordFromAlphaPoint(c), this._vertexData[a + 2].vertices = this._vertexFromAlphaPoint(c)
            }
            this._vertexData[this._vertexDataCount - 1].texCoords = this._textureCoordFromAlphaPoint(e);
            this._vertexData[this._vertexDataCount - 1].vertices = this._vertexFromAlphaPoint(e)
        }
    }, _updateColor: function () {
        if (this._sprite &&
            this._vertexData)for (var a = this._sprite.getQuad().tl.colors, b = 0; b < this._vertexDataCount; ++b)this._vertexData[b].colors = a
    }, _boundaryTexCoord: function (a) {
        return a < cc.PROGRESS_TEXTURE_COORDS_COUNT ? this._reverseDirection ? cc.p(cc.PROGRESS_TEXTURE_COORDS >> 7 - (a << 1) & 1, cc.PROGRESS_TEXTURE_COORDS >> 7 - ((a << 1) + 1) & 1) : cc.p(cc.PROGRESS_TEXTURE_COORDS >> (a << 1) + 1 & 1, cc.PROGRESS_TEXTURE_COORDS >> (a << 1) & 1) : cc.PointZero()
    }});
cc.ProgressTimer.create = function (a) {
    var b = new cc.ProgressTimer;
    return b.initWithSprite(a) ? b : null
};
cc.ACTION_TAG_INVALID = -1;
cc.Action = cc.Class.extend({_originalTarget: null, _target: null, _tag: cc.ACTION_TAG_INVALID, description: function () {
    return"<cc.Action | Tag = " + this._tag + ">"
}, copyWithZone: function () {
    return this.copy()
}, copy: function () {
    return cc.clone(this)
}, isDone: function () {
    return!0
}, startWithTarget: function (a) {
    this._target = this._originalTarget = a
}, stop: function () {
    this._target = null
}, step: function () {
    cc.log("[Action step]. override me")
}, update: function () {
    cc.log("[Action update]. override me")
}, getTarget: function () {
    return this._target
},
    setTarget: function (a) {
        this._target = a
    }, getOriginalTarget: function () {
        return this._originalTarget
    }, setOriginalTarget: function (a) {
        this._originalTarget = a
    }, getTag: function () {
        return this._tag
    }, setTag: function (a) {
        this._tag = a
    }, retain: function () {
    }, release: function () {
    }});
cc.Action.create = function () {
    return new cc.Action
};
cc.FiniteTimeAction = cc.Action.extend({_duration: 0, getDuration: function () {
    return this._duration
}, setDuration: function (a) {
    this._duration = a
}, reverse: function () {
    cc.log("cocos2d: FiniteTimeAction#reverse: Implement me");
    return null
}});
cc.Speed = cc.Action.extend({_speed: 0, _innerAction: null, getSpeed: function () {
    return this._speed
}, setSpeed: function (a) {
    this._speed = a
}, initWithAction: function (a, b) {
    cc.Assert(null != a, "");
    this._innerAction = a;
    this._speed = b;
    return!0
}, startWithTarget: function (a) {
    cc.Action.prototype.startWithTarget.call(this, a);
    this._innerAction.startWithTarget(a)
}, stop: function () {
    this._innerAction.stop();
    cc.Action.prototype.stop.call(this)
}, step: function (a) {
    this._innerAction.step(a * this._speed)
}, isDone: function () {
    return this._innerAction.isDone()
},
    reverse: function () {
        return cc.Speed.create(this._innerAction.reverse(), this._speed)
    }, setInnerAction: function (a) {
        this._innerAction != a && (this._innerAction = a)
    }, getInnerAction: function () {
        return this._innerAction
    }});
cc.Speed.create = function (a, b) {
    var c = new cc.Speed;
    return c && c.initWithAction(a, b) ? c : null
};
cc.Follow = cc.Action.extend({isBoundarySet: function () {
    return this._boundarySet
}, setBoudarySet: function (a) {
    this._boundarySet = a
}, initWithTarget: function (a, b) {
    cc.Assert(null != a, "");
    b = b || cc.RectZero();
    this._followedNode = a;
    this._boundarySet = !cc.Rect.CCRectEqualToRect(b, cc.RectZero());
    this._boundaryFullyCovered = !1;
    var c = cc.Director.getInstance().getWinSize();
    this._fullScreenSize = cc.p(c.width, c.height);
    this._halfScreenSize = cc.pMult(this._fullScreenSize, 0.5);
    if (this._boundarySet && (this.leftBoundary = -(b.origin.x +
        b.size.width - this._fullScreenSize.x), this.rightBoundary = -b.origin.x, this.topBoundary = -b.origin.y, this.bottomBoundary = -(b.origin.y + b.size.height - this._fullScreenSize.y), this.rightBoundary < this.leftBoundary && (this.rightBoundary = this.leftBoundary = (this.leftBoundary + this.rightBoundary) / 2), this.topBoundary < this.bottomBoundary && (this.topBoundary = this.bottomBoundary = (this.topBoundary + this.bottomBoundary) / 2), this.topBoundary == this.bottomBoundary && this.leftBoundary == this.rightBoundary))this._boundaryFullyCovered = !0;
    return!0
}, step: function () {
    if (this._boundarySet) {
        if (!this._boundaryFullyCovered) {
            var a = cc.pSub(this._halfScreenSize, this._followedNode.getPosition());
            this._target.setPosition(cc.p(cc.clampf(a.x, this.leftBoundary, this.rightBoundary), cc.clampf(a.y, this.bottomBoundary, this.topBoundary)))
        }
    } else this._target.setPosition(cc.pSub(this._halfScreenSize, this._followedNode.getPosition()))
}, isDone: function () {
    return!this._followedNode.isRunning()
}, stop: function () {
    this._target = null;
    cc.Action.prototype.stop.call(this)
},
    _followedNode: null, _boundarySet: !1, _boundaryFullyCovered: !1, _halfScreenSize: null, _fullScreenSize: null, leftBoundary: 0, rightBoundary: 0, topBoundary: 0, bottomBoundary: 0});
cc.Follow.create = function (a, b) {
    var b = b || new cc.RectZero, c = new cc.Follow;
    return null != b && c && c.initWithTarget(a, b) || c && c.initWithTarget(a) ? c : null
};
cc.ActionInterval = cc.FiniteTimeAction.extend({_elapsed: 0, _firstTick: !1, getElapsed: function () {
    return this._elapsed
}, initWithDuration: function (a) {
    this._duration = 0 == a ? cc.FLT_EPSILON : a;
    this._elapsed = 0;
    return this._firstTick = !0
}, isDone: function () {
    return this._elapsed >= this._duration
}, step: function (a) {
    this._firstTick ? (this._firstTick = !1, this._elapsed = 0) : this._elapsed += a;
    a = this._elapsed / (1.192092896E-7 < this._duration ? this._duration : 1.192092896E-7);
    a = 1 > a ? a : 1;
    this.update(0 < a ? a : 0)
}, startWithTarget: function (a) {
    cc.Action.prototype.startWithTarget.call(this,
        a);
    this._elapsed = 0;
    this._firstTick = !0
}, reverse: function () {
    cc.Assert(!1, "cc.IntervalAction: reverse not implemented.");
    return null
}, setAmplitudeRate: function () {
    cc.Assert(0, "Actioninterval setAmplitudeRate")
}, getAmplitudeRate: function () {
    cc.Assert(0, "Actioninterval getAmplitudeRate");
    return 0
}});
cc.ActionInterval.create = function (a) {
    var b = new cc.ActionInterval;
    b.initWithDuration(a);
    return b
};
cc.Sequence = cc.ActionInterval.extend({_actions: null, _split: null, _last: 0, ctor: function () {
    this._actions = []
}, initOneTwo: function (a, b) {
    cc.Assert(null != a, "Sequence.initOneTwo");
    cc.Assert(null != b, "Sequence.initOneTwo");
    a.getDuration();
    b.getDuration();
    this.initWithDuration(a.getDuration() + b.getDuration());
    this._actions[0] = a;
    this._actions[1] = b;
    return!0
}, startWithTarget: function (a) {
    cc.ActionInterval.prototype.startWithTarget.call(this, a);
    this._split = this._actions[0].getDuration() / this._duration;
    this._last = -1
}, stop: function () {
    -1 != this._last && this._actions[this._last].stop();
    cc.Action.prototype.stop.call(this)
}, update: function (a) {
    var b = 0;
    if (a < this._split)a = this._split ? a / this._split : 1; else if (b = 1, a = 1 == this._split ? 1 : (a - this._split) / (1 - this._split), -1 == this._last && (this._actions[0].startWithTarget(this._target), this._actions[0].update(1), this._actions[0].stop()), !this._last)this._actions[0].update(1), this._actions[0].stop();
    this._last == b && this._actions[b].isDone() || (this._last != b && this._actions[b].startWithTarget(this._target),
        this._actions[b].update(a), this._last = b)
}, reverse: function () {
    return cc.Sequence._actionOneTwo(this._actions[1].reverse(), this._actions[0].reverse())
}, copy: function () {
    return cc.Sequence._actionOneTwo(this._actions[0].copy(), this._actions[1].copy())
}});
cc.Sequence.create = function (a) {
    for (var b = a instanceof Array ? a : arguments, c = b[0], d = 1; d < b.length; d++)b[d] && (c = cc.Sequence._actionOneTwo(c, b[d]));
    return c
};
cc.Sequence._actionOneTwo = function (a, b) {
    var c = new cc.Sequence;
    c.initOneTwo(a, b);
    return c
};
cc.Repeat = cc.ActionInterval.extend({_times: 0, _total: 0, _nextDt: 0, _actionInstant: !1, _innerAction: null, initWithAction: function (a, b) {
    return this.initWithDuration(a.getDuration() * b) ? (this._times = b, this._innerAction = a, a instanceof cc.ActionInstant && (this._times -= 1), this._total = 0, !0) : !1
}, startWithTarget: function (a) {
    this._total = 0;
    this._nextDt = this._innerAction.getDuration() / this._duration;
    cc.ActionInterval.prototype.startWithTarget.call(this, a);
    this._innerAction.startWithTarget(a)
}, stop: function () {
    this._innerAction.stop();
    cc.Action.prototype.stop.call(this)
}, update: function (a) {
    if (a >= this._nextDt) {
        for (; a > this._nextDt && this._total < this._times;)this._innerAction.update(1), this._total++, this._innerAction.stop(), this._innerAction.startWithTarget(this._target), this._nextDt += this._innerAction.getDuration() / this._duration;
        1 <= a && this._total < this._times && this._total++;
        this._actionInstant && (this._total == this._times ? (this._innerAction.update(1), this._innerAction.stop()) : this._innerAction.update(a - (this._nextDt - this._innerAction.getDuration() /
            this._duration)))
    } else this._innerAction.update(a * this._times % 1)
}, isDone: function () {
    return this._total == this._times
}, reverse: function () {
    return cc.Repeat.create(this._innerAction.reverse(), this._times)
}, setInnerAction: function (a) {
    this._innerAction != a && (this._innerAction = a)
}, getInnerAction: function () {
    return this._innerAction
}});
cc.Repeat.create = function (a, b) {
    var c = new cc.Repeat;
    c.initWithAction(a, b);
    return c
};
cc.RepeatForever = cc.ActionInterval.extend({_innerAction: null, initWithAction: function (a) {
    cc.Assert(null != a, "");
    this._innerAction = a;
    return!0
}, startWithTarget: function (a) {
    cc.ActionInterval.prototype.startWithTarget.call(this, a);
    this._innerAction.startWithTarget(a)
}, step: function (a) {
    this._innerAction.step(a);
    this._innerAction.isDone() && (this._innerAction.startWithTarget(this._target), this._innerAction.step(this._innerAction.getElapsed() - this._innerAction.getDuration()))
}, isDone: function () {
    return!1
}, reverse: function () {
    return cc.RepeatForever.create(this._innerAction.reverse())
},
    setInnerAction: function (a) {
        this._innerAction != a && (this._innerAction = a)
    }, getInnerAction: function () {
        return this._innerAction
    }});
cc.RepeatForever.create = function (a) {
    var b = new cc.RepeatForever;
    return b && b.initWithAction(a) ? b : null
};
cc.Spawn = cc.ActionInterval.extend({initOneTwo: function (a, b) {
    cc.Assert(null != a, "no action1");
    cc.Assert(null != b, "no action2");
    var c = !1, d = a.getDuration(), e = b.getDuration();
    this.initWithDuration(Math.max(d, e)) && (this._one = a, this._two = b, d > e ? this._two = cc.Sequence._actionOneTwo(b, cc.DelayTime.create(d - e)) : d < e && (this._one = cc.Sequence._actionOneTwo(a, cc.DelayTime.create(e - d))), c = !0);
    return c
}, startWithTarget: function (a) {
    cc.ActionInterval.prototype.startWithTarget.call(this, a);
    this._one.startWithTarget(a);
    this._two.startWithTarget(a)
}, stop: function () {
    this._one.stop();
    this._two.stop();
    cc.Action.prototype.stop.call(this)
}, update: function (a) {
    this._one && this._one.update(a);
    this._two && this._two.update(a)
}, reverse: function () {
    return cc.Spawn._actionOneTwo(this._one.reverse(), this._two.reverse())
}, _one: null, _two: null});
cc.Spawn.create = function (a) {
    for (var b = a instanceof Array ? a : arguments, c = b[0], d = 1; d < b.length; d++)null != b[d] && (c = this._actionOneTwo(c, b[d]));
    return c
};
cc.Spawn._actionOneTwo = function (a, b) {
    var c = new cc.Spawn;
    c.initOneTwo(a, b);
    return c
};
cc.RotateTo = cc.ActionInterval.extend({_dstAngle: 0, _startAngle: 0, _diffAngle: 0, initWithDuration: function (a, b) {
    return cc.ActionInterval.prototype.initWithDuration.call(this, a) ? (this._dstAngle = b || 0, !0) : !1
}, startWithTarget: function (a) {
    cc.ActionInterval.prototype.startWithTarget.call(this, a);
    this._startAngle = a.getRotation();
    this._startAngle %= 360;
    this._diffAngle = this._dstAngle - this._startAngle;
    180 < this._diffAngle && (this._diffAngle -= 360);
    -180 > this._diffAngle && (this._diffAngle += 360)
}, reverse: function () {
    cc.Assert(0,
        "RotateTo reverse not implemented")
}, update: function (a) {
    this._target && this._target.setRotation(this._startAngle + this._diffAngle * a)
}});
cc.RotateTo.create = function (a, b) {
    var c = new cc.RotateTo;
    c.initWithDuration(a, b);
    return c
};
cc.RotateBy = cc.ActionInterval.extend({_angle: 0, _startAngle: 0, initWithDuration: function (a, b) {
    return cc.ActionInterval.prototype.initWithDuration.call(this, a) ? (this._angle = b, !0) : !1
}, startWithTarget: function (a) {
    cc.ActionInterval.prototype.startWithTarget.call(this, a);
    this._startAngle = a.getRotation()
}, update: function (a) {
    this._target && this._target.setRotation(this._startAngle + this._angle * a)
}, reverse: function () {
    return cc.RotateBy.create(this._duration, -this._angle)
}});
cc.RotateBy.create = function (a, b) {
    var c = new cc.RotateBy;
    c.initWithDuration(a, b);
    return c
};
cc.MoveTo = cc.ActionInterval.extend({initWithDuration: function (a, b) {
    return cc.ActionInterval.prototype.initWithDuration.call(this, a) ? (this._endPosition = b, !0) : !1
}, startWithTarget: function (a) {
    cc.ActionInterval.prototype.startWithTarget.call(this, a);
    this._startPosition = a.getPosition();
    this._delta = cc.pSub(this._endPosition, this._startPosition)
}, update: function (a) {
    this._target && this._target.setPosition(cc.p(this._startPosition.x + this._delta.x * a, this._startPosition.y + this._delta.y * a))
}, reverse: function () {
    cc.Assert(0,
        "moveto reverse is not implemented")
}, _endPosition: cc.p(0, 0), _startPosition: cc.p(0, 0), _delta: cc.p(0, 0)});
cc.MoveTo.create = function (a, b) {
    var c = new cc.MoveTo;
    c.initWithDuration(a, b);
    return c
};
cc.MoveBy = cc.MoveTo.extend({initWithDuration: function (a, b) {
    return cc.MoveTo.prototype.initWithDuration.call(this, a, b) ? (this._delta = b, !0) : !1
}, startWithTarget: function (a) {
    var b = this._delta;
    cc.MoveTo.prototype.startWithTarget.call(this, a);
    this._delta = b
}, reverse: function () {
    return cc.MoveBy.create(this._duration, cc.p(-this._delta.x, -this._delta.y))
}});
cc.MoveBy.create = function (a, b) {
    var c = new cc.MoveBy;
    c.initWithDuration(a, b);
    return c
};
cc.SkewTo = cc.ActionInterval.extend({initWithDuration: function (a, b, c) {
    var d = !1;
    cc.ActionInterval.prototype.initWithDuration.call(this, a) && (this._endSkewX = b, this._endSkewY = c, d = !0);
    return d
}, startWithTarget: function (a) {
    cc.ActionInterval.prototype.startWithTarget.call(this, a);
    this._startSkewX = a.getSkewX();
    this._startSkewX = 0 < this._startSkewX ? this._startSkewX % 180 : this._startSkewX % -180;
    this._deltaX = this._endSkewX - this._startSkewX;
    180 < this._deltaX && (this._deltaX -= 360);
    -180 > this._deltaX && (this._deltaX += 360);
    this._startSkewY = a.getSkewY();
    this._startSkewY = 0 < this._startSkewY ? this._startSkewY % 360 : this._startSkewY % -360;
    this._deltaY = this._endSkewY - this._startSkewY;
    180 < this._deltaY && (this._deltaY -= 360);
    -180 > this._deltaY && (this._deltaY += 360)
}, update: function (a) {
    this._target.setSkewX(this._startSkewX + this._deltaX * a);
    this._target.setSkewY(this._startSkewY + this._deltaY * a)
}, _skewX: 0, _skewY: 0, _startSkewX: 0, _startSkewY: 0, _endSkewX: 0, _endSkewY: 0, _deltaX: 0, _deltaY: 0});
cc.SkewTo.create = function (a, b, c) {
    var d = new cc.SkewTo;
    d && d.initWithDuration(a, b, c);
    return d
};
cc.SkewBy = cc.SkewTo.extend({initWithDuration: function (a, b, c) {
    var d = !1;
    cc.SkewTo.prototype.initWithDuration.call(this, a, b, c) && (this._skewX = b, this._skewY = c, d = !0);
    return d
}, startWithTarget: function (a) {
    cc.SkewTo.prototype.startWithTarget.call(this, a);
    this._deltaX = this._skewX;
    this._deltaY = this._skewY;
    this._endSkewX = this._startSkewX + this._deltaX;
    this._endSkewY = this._startSkewY + this._deltaY
}, reverse: function () {
    return cc.SkewBy.create(this._duration, -this._skewX, -this._skewY)
}});
cc.SkewBy.create = function (a, b, c) {
    var d = new cc.SkewBy;
    d && d.initWithDuration(a, b, c);
    return d
};
cc.JumpBy = cc.ActionInterval.extend({initWithDuration: function (a, b, c, d) {
    return cc.ActionInterval.prototype.initWithDuration.call(this, a) ? (this._delta = b, this._height = c, this._jumps = d, !0) : !1
}, startWithTarget: function (a) {
    cc.ActionInterval.prototype.startWithTarget.call(this, a);
    this._startPosition = a.getPosition()
}, update: function (a) {
    if (this._target) {
        var b = a * this._jumps % 1, b = 4 * this._height * b * (1 - b), b = b + this._delta.y * a;
        this._target.setPosition(cc.p(this._startPosition.x + this._delta.x * a, this._startPosition.y +
            b))
    }
}, reverse: function () {
    return cc.JumpBy.create(this._duration, cc.p(-this._delta.x, -this._delta.y), this._height, this._jumps)
}, _startPosition: cc.p(0, 0), _delta: cc.p(0, 0), _height: 0, _jumps: 0});
cc.JumpBy.create = function (a, b, c, d) {
    var e = new cc.JumpBy;
    e.initWithDuration(a, b, c, d);
    return e
};
cc.JumpTo = cc.JumpBy.extend({startWithTarget: function (a) {
    cc.JumpBy.prototype.startWithTarget.call(this, a);
    this._delta = cc.p(this._delta.x - this._startPosition.x, this._delta.y - this._startPosition.y)
}});
cc.JumpTo.create = function (a, b, c, d) {
    var e = new cc.JumpTo;
    e.initWithDuration(a, b, c, d);
    return e
};
cc.bezierat = function (a, b, c, d, e) {
    return Math.pow(1 - e, 3) * a + 3 * e * Math.pow(1 - e, 2) * b + 3 * Math.pow(e, 2) * (1 - e) * c + Math.pow(e, 3) * d
};
cc.BezierBy = cc.ActionInterval.extend({initWithDuration: function (a, b) {
    return cc.ActionInterval.prototype.initWithDuration.call(this, a) ? (this._config = b, !0) : !1
}, startWithTarget: function (a) {
    cc.ActionInterval.prototype.startWithTarget.call(this, a);
    this._startPosition = a.getPosition()
}, update: function (a) {
    if (this._target) {
        var b = this._config[0].y, c = this._config[1].y, d = this._config[2].y, e = cc.bezierat(0, this._config[0].x, this._config[1].x, this._config[2].x, a), a = cc.bezierat(0, b, c, d, a);
        this._target.setPosition(cc.pAdd(this._startPosition,
            cc.p(e, a)))
    }
}, reverse: function () {
    var a = [cc.pAdd(this._config[1], cc.pNeg(this._config[2])), cc.pAdd(this._config[0], cc.pNeg(this._config[2])), cc.pNeg(this._config[2])];
    return cc.BezierBy.create(this._duration, a)
}, ctor: function () {
    this._config = [];
    this._startPosition = cc.p(0, 0)
}});
cc.BezierBy.create = function (a, b) {
    var c = new cc.BezierBy;
    c.initWithDuration(a, b);
    return c
};
cc.BezierTo = cc.BezierBy.extend({_toConfig: null, initWithDuration: function (a, b) {
    return cc.BezierBy.prototype.initWithDuration.call(this, a, b) ? (this._toConfig = [], this._toConfig[0] = cc.p(b[0].x, b[0].y), this._toConfig[1] = cc.p(b[1].x, b[1].y), this._toConfig[2] = cc.p(b[2].x, b[2].y), !0) : !1
}, startWithTarget: function (a) {
    cc.BezierBy.prototype.startWithTarget.call(this, a);
    this._config[0] = cc.pSub(this._toConfig[0], this._startPosition);
    this._config[1] = cc.pSub(this._toConfig[1], this._startPosition);
    this._config[2] =
        cc.pSub(this._toConfig[2], this._startPosition)
}});
cc.BezierTo.create = function (a, b) {
    var c = new cc.BezierTo;
    c.initWithDuration(a, b);
    return c
};
cc.ScaleTo = cc.ActionInterval.extend({initWithDuration: function (a, b, c) {
    return cc.ActionInterval.prototype.initWithDuration.call(this, a) ? (this._endScaleX = b, this._endScaleY = null != c ? c : b, !0) : !1
}, startWithTarget: function (a) {
    cc.ActionInterval.prototype.startWithTarget.call(this, a);
    this._startScaleX = a.getScaleX();
    this._startScaleY = a.getScaleY();
    this._deltaX = this._endScaleX - this._startScaleX;
    this._deltaY = this._endScaleY - this._startScaleY
}, update: function (a) {
    this._target && this._target.setScale(this._startScaleX +
        this._deltaX * a, this._startScaleY + this._deltaY * a)
}, _scaleX: 1, _scaleY: 1, _startScaleX: 1, _startScaleY: 1, _endScaleX: 0, _endScaleY: 0, _deltaX: 0, _deltaY: 0});
cc.ScaleTo.create = function (a, b, c) {
    var d = new cc.ScaleTo;
    c ? d.initWithDuration(a, b, c) : d.initWithDuration(a, b);
    return d
};
cc.ScaleBy = cc.ScaleTo.extend({startWithTarget: function (a) {
    cc.ScaleTo.prototype.startWithTarget.call(this, a);
    this._deltaX = this._startScaleX * this._endScaleX - this._startScaleX;
    this._deltaY = this._startScaleY * this._endScaleY - this._startScaleY
}, reverse: function () {
    return cc.ScaleBy.create(this._duration, 1 / this._endScaleX, 1 / this._endScaleY)
}});
cc.ScaleBy.create = function (a, b, c) {
    var d = new cc.ScaleBy;
    3 == arguments.length ? d.initWithDuration(a, b, c) : d.initWithDuration(a, b);
    return d
};
cc.Blink = cc.ActionInterval.extend({initWithDuration: function (a, b) {
    return cc.ActionInterval.prototype.initWithDuration.call(this, a) ? (this._times = b, !0) : !1
}, update: function (a) {
    if (this._target && !this.isDone()) {
        var b = 1 / this._times;
        this._target.setVisible(a % b > b / 2 ? !0 : !1)
    }
}, startWithTarget: function (a) {
    this._super(a);
    this._originalState = a.isVisible()
}, stop: function () {
    this._target.setVisible(this._originalState);
    this._super()
}, reverse: function () {
    return cc.Blink.create(this._duration, this._times)
}, _times: 0,
    _originalState: !1});
cc.Blink.create = function (a, b) {
    var c = new cc.Blink;
    c.initWithDuration(a, b);
    return c
};
cc.FadeIn = cc.ActionInterval.extend({update: function (a) {
    this._target.setOpacity(255 * a)
}, reverse: function () {
    return cc.FadeOut.create(this._duration)
}});
cc.FadeIn.create = function (a) {
    var b = new cc.FadeIn;
    b.initWithDuration(a);
    return b
};
cc.FadeOut = cc.ActionInterval.extend({update: function (a) {
    this._target.setOpacity(255 * (1 - a))
}, reverse: function () {
    return cc.FadeIn.create(this._duration)
}});
cc.FadeOut.create = function (a) {
    var b = new cc.FadeOut;
    b.initWithDuration(a);
    return b
};
cc.FadeTo = cc.ActionInterval.extend({initWithDuration: function (a, b) {
    return cc.ActionInterval.prototype.initWithDuration.call(this, a) ? (this._toOpacity = b, !0) : !1
}, update: function (a) {
    this._target.setOpacity(this._fromOpacity + (this._toOpacity - this._fromOpacity) * a)
}, startWithTarget: function (a) {
    cc.ActionInterval.prototype.startWithTarget.call(this, a);
    this._fromOpacity = a.getOpacity()
}, _toOpacity: "", _fromOpacity: ""});
cc.FadeTo.create = function (a, b) {
    var c = new cc.FadeTo;
    c.initWithDuration(a, b);
    return c
};
cc.TintTo = cc.ActionInterval.extend({initWithDuration: function (a, b, c, d) {
    return cc.ActionInterval.prototype.initWithDuration.call(this, a) ? (this._to = cc.c3b(b, c, d), !0) : !1
}, startWithTarget: function (a) {
    cc.ActionInterval.prototype.startWithTarget.call(this, a);
    this._from = this._target.getColor()
}, update: function (a) {
    this._target.setColor(cc.c3b(this._from.r + (this._to.r - this._from.r) * a, this._from.g + (this._to.g - this._from.g) * a, this._from.b + (this._to.b - this._from.b) * a))
}, _to: new cc.Color3B, _from: new cc.Color3B});
cc.TintTo.create = function (a, b, c, d) {
    var e = new cc.TintTo;
    e.initWithDuration(a, b, c, d);
    return e
};
cc.TintBy = cc.ActionInterval.extend({initWithDuration: function (a, b, c, d) {
    return cc.ActionInterval.prototype.initWithDuration.call(this, a) ? (this._deltaR = b, this._deltaG = c, this._deltaB = d, !0) : !1
}, startWithTarget: function (a) {
    cc.ActionInterval.prototype.startWithTarget.call(this, a);
    a.RGBAProtocol && (a = a.getColor(), this._fromR = a.r, this._fromG = a.g, this._fromB = a.b)
}, update: function (a) {
    this._target.RGBAProtocol && this._target.setColor(cc.c3b(this._fromR + this._deltaR * a, this._fromG + this._deltaG * a, this._fromB + this._deltaB *
        a))
}, reverse: function () {
    return cc.TintBy.create(this._duration, -this._deltaR, -this._deltaG, -this._deltaB)
}, _deltaR: 0, _deltaG: 0, _deltaB: 0, _fromR: 0, _fromG: 0, _fromB: 0});
cc.TintBy.create = function (a, b, c, d) {
    var e = new cc.TintBy;
    e.initWithDuration(a, b, c, d);
    return e
};
cc.DelayTime = cc.ActionInterval.extend({update: function () {
}, reverse: function () {
    return cc.DelayTime.create(this._duration)
}});
cc.DelayTime.create = function (a) {
    var b = new cc.DelayTime;
    b.initWithDuration(a);
    return b
};
cc.ReverseTime = cc.ActionInterval.extend({initWithAction: function (a) {
    cc.Assert(null != a, "");
    cc.Assert(a != this._other, "");
    return cc.ActionInterval.prototype.initWithDuration.call(this, a.getDuration()) ? (this._other = a, !0) : !1
}, startWithTarget: function (a) {
    cc.ActionInterval.prototype.startWithTarget.call(this, a);
    this._other.startWithTarget(a)
}, update: function (a) {
    this._other && this._other.update(1 - a)
}, reverse: function () {
    return this._other.copy()
}, stop: function () {
    this._other.stop();
    cc.Action.prototype.stop.call(this)
},
    _other: null});
cc.ReverseTime.create = function (a) {
    var b = new cc.ReverseTime;
    b.initWithAction(a);
    return b
};
cc.Animate = cc.ActionInterval.extend({_animation: null, _nextFrame: 0, _origFrame: null, _executedLoops: 0, _splitTimes: null, getAnimation: function () {
    return this._animation
}, setAnimation: function (a) {
    this._animation = a
}, initWithAnimation: function (a) {
    cc.Assert(null != a, "Animate: argument Animation must be non-NULL");
    var b = a.getDuration();
    if (this.initWithDuration(b * a.getLoops())) {
        this._nextFrame = 0;
        this.setAnimation(a);
        this._origFrame = null;
        this._executedLoops = 0;
        this._splitTimes = [];
        var c = 0, d = b / a.getTotalDelayUnits(),
            a = a.getFrames();
        cc.ArrayVerifyType(a, cc.AnimationFrame);
        for (var e = 0; e < a.length; e++) {
            var f = c * d / b, c = c + a[e].getDelayUnits();
            this._splitTimes.push(f)
        }
        return!0
    }
    return!1
}, startWithTarget: function (a) {
    cc.ActionInterval.prototype.startWithTarget.call(this, a);
    this._animation.getRestoreOriginalFrame() && (this._origFrame = a.displayFrame());
    this._executedLoops = this._nextFrame = 0
}, update: function (a) {
    1 > a && (a *= this._animation.getLoops(), (0 | a) > this._executedLoops && (this._nextFrame = 0, this._executedLoops++), a %= 1);
    for (var b =
        this._animation.getFrames(), c = b.length, d = this._nextFrame; d < c; d++)if (this._splitTimes[d] <= a) {
        this._target.setDisplayFrame(b[d].getSpriteFrame());
        this._nextFrame = d + 1;
        break
    }
}, reverse: function () {
    var a = this._animation.getFrames(), b = [];
    cc.ArrayVerifyType(a, cc.AnimationFrame);
    if (0 < a.length)for (var c = a.length - 1; 0 <= c; c--) {
        var d = a[c];
        if (!d)break;
        b.push(d.copy())
    }
    a = cc.Animation.createWithAnimationFrames(b, this._animation.getDelayPerUnit(), this._animation.getLoops());
    a.setRestoreOriginalFrame(this._animation.getRestoreOriginalFrame());
    return cc.Animate.create(a)
}, stop: function () {
    this._animation.getRestoreOriginalFrame() && this._target && this._target.setDisplayFrame(this._origFrame);
    cc.Action.prototype.stop.call(this)
}});
cc.Animate.create = function (a) {
    var b = new cc.Animate;
    b.initWithAnimation(a);
    return b
};
cc.TargetedAction = cc.ActionInterval.extend({_action: null, _forcedTarget: null, initWithTarget: function (a, b) {
    return this.initWithDuration(b.getDuration()) ? (this._forcedTarget = a, this._action = b, !0) : !1
}, startWithTarget: function () {
    cc.ActionInterval.prototype.startWithTarget.call(this, this._forcedTarget);
    this._action.startWithTarget(this._forcedTarget)
}, stop: function () {
    this._action.stop()
}, update: function (a) {
    this._action.update(a)
}, getForcedTarget: function () {
    return this._forcedTarget
}, setForcedTarget: function (a) {
    this._forcedTarget !=
        a && (this._forcedTarget = a)
}});
cc.TargetedAction.create = function (a, b) {
    var c = new cc.TargetedAction;
    c.initWithTarget(a, b);
    return c
};
cc.HashElement = cc.Class.extend({actions: null, target: null, actionIndex: 0, currentAction: null, currentActionSalvaged: !1, paused: !1, hh: null, ctor: function () {
    this.actions = []
}});
cc.ActionManager = cc.Class.extend({_targets: null, _currentTarget: null, _currentTargetSalvaged: !1, _searchElementByTarget: function (a, b) {
    for (var c = 0; c < a.length; c++)if (b == a[c].target)return a[c];
    return null
}, ctor: function () {
    this._targets = []
}, addAction: function (a, b, c) {
    cc.Assert(null != a, "no action");
    cc.Assert(null != b, "");
    var d = this._searchElementByTarget(this._targets, b);
    d || (d = new cc.HashElement, d.paused = c, d.target = b, this._targets.push(d));
    this._actionAllocWithHashElement(d);
    cc.Assert(-1 == d.actions.indexOf(a),
        "ActionManager.addAction(),");
    d.actions.push(a);
    a.startWithTarget(b)
}, removeAllActions: function () {
    for (var a = 0; a < this._targets.length; a++) {
        var b = this._targets[a];
        b && this.removeAllActionsFromTarget(b.target)
    }
}, removeAllActionsFromTarget: function (a) {
    if (null != a && (a = this._searchElementByTarget(this._targets, a)))a.currentAction in a.actions && !a.currentActionSalvaged && (a.currentActionSalvaged = !0), a.actions = [], this._currentTarget == a ? this._currentTargetSalvaged = !0 : this._deleteHashElement(a)
}, removeAction: function (a) {
    if (null !=
        a) {
        var b = this._searchElementByTarget(this._targets, a.getOriginalTarget());
        if (b)for (var c = 0; c < b.actions.length; c++) {
            if (b.actions[c] == a) {
                b.actions.splice(c, 1);
                break
            }
        } else cc.log("cocos2d: removeAction: Target not found")
    }
}, removeActionByTag: function (a, b) {
    cc.Assert(a != cc.ACTION_TAG_INVALID, "");
    cc.Assert(null != b, "");
    var c = this._searchElementByTarget(this._targets, b);
    if (c)for (var d = c.actions.length, e = 0; e < d; ++e) {
        var f = c.actions[e];
        if (f && f.getTag() == a && f.getOriginalTarget() == b) {
            this._removeActionAtIndex(e,
                c);
            break
        }
    }
}, getActionByTag: function (a, b) {
    cc.Assert(a != cc.ACTION_TAG_INVALID, "");
    var c = this._searchElementByTarget(this._targets, b);
    if (c && null != c.actions)for (var d = 0; d < c.actions.length; ++d) {
        var e = c.actions[d];
        if (e && e.getTag() == a)return e
    }
    return null
}, numberOfRunningActionsInTarget: function (a) {
    return(a = this._searchElementByTarget(this._targets, a)) ? a.actions ? a.actions.length : 0 : 0
}, pauseTarget: function (a) {
    if (a = this._searchElementByTarget(this._targets, a))a.paused = !0
}, resumeTarget: function (a) {
    if (a = this._searchElementByTarget(this._targets,
        a))a.paused = !1
}, pauseAllRunningActions: function () {
    for (var a = [], b = 0; b < this._targets.length; b++) {
        var c = this._targets[b];
        c && !c.paused && (c.paused = !0, a.push(c.target))
    }
    return a
}, resumeTargets: function (a) {
    if (a)for (var b = 0; b < a.length; b++)a[b] && this.resumeTarget(a[b])
}, purgeSharedManager: function () {
    cc.Director.getInstance().getScheduler().unscheduleUpdateForTarget(this)
}, _removeActionAtIndex: function (a, b) {
    b.actions[a] == b.currentAction && !b.currentActionSalvaged && (b.currentActionSalvaged = !0);
    cc.ArrayRemoveObjectAtIndex(b.actions,
        a);
    b.actionIndex >= a && b.actionIndex--;
    0 == b.actions.length && (this._currentTarget == b ? this._currentTargetSalvaged = !0 : this._deleteHashElement(b))
}, _deleteHashElement: function (a) {
    cc.ArrayRemoveObject(this._targets, a);
    a && (a.actions = null, a.target = null)
}, _actionAllocWithHashElement: function (a) {
    null == a.actions && (a.actions = [])
}, update: function (a) {
    for (var b = 0; b < this._targets.length; b++) {
        this._currentTarget = this._targets[b];
        this._currentTargetSalvaged = !1;
        if (!this._currentTarget.paused)for (this._currentTarget.actionIndex =
                                                 0; this._currentTarget.actionIndex < this._currentTarget.actions.length; this._currentTarget.actionIndex++)if (this._currentTarget.currentAction = this._currentTarget.actions[this._currentTarget.actionIndex], this._currentTarget.currentAction) {
            this._currentTarget.currentActionSalvaged = !1;
            this._currentTarget.currentAction.step(a);
            if (this._currentTarget.currentActionSalvaged)this._currentTarget.currentAction = null; else if (this._currentTarget.currentAction.isDone()) {
                this._currentTarget.currentAction.stop();
                var c =
                    this._currentTarget.currentAction;
                this._currentTarget.currentAction = null;
                this.removeAction(c)
            }
            this._currentTarget.currentAction = null
        }
        this._currentTargetSalvaged && 0 == this._currentTarget.actions.length && this._deleteHashElement(this._currentTarget)
    }
}});
cc.ActionInstant = cc.FiniteTimeAction.extend({isDone: function () {
    return!0
}, step: function () {
    this.update(1)
}, update: function () {
}});
cc.Show = cc.ActionInstant.extend({update: function () {
    this._target.setVisible(!0)
}, reverse: function () {
    return cc.Hide.create.call(this)
}});
cc.Show.create = function () {
    return new cc.Show
};
cc.Hide = cc.ActionInstant.extend({update: function () {
    this._target.setVisible(!1)
}, reverse: function () {
    return cc.Show.create.call(this)
}});
cc.Hide.create = function () {
    return new cc.Hide
};
cc.ToggleVisibility = cc.ActionInstant.extend({update: function () {
    this._target.setVisible(!this._target.isVisible())
}, reverse: function () {
    return new cc.ToggleVisibility
}});
cc.ToggleVisibility.create = function () {
    return new cc.ToggleVisibility
};
cc.FlipX = cc.ActionInstant.extend({initWithFlipX: function (a) {
    this._flipX = a;
    return!0
}, update: function () {
    this._target.setFlipX(this._flipX)
}, reverse: function () {
    return cc.FlipX.create(!this._flipX)
}, _flipX: !1});
cc.FlipX.create = function (a) {
    var b = new cc.FlipX;
    return b.initWithFlipX(a) ? b : null
};
cc.FlipY = cc.ActionInstant.extend({initWithFlipY: function (a) {
    this._flipY = a;
    return!0
}, update: function () {
    this._target.setFlipY(this._flipY)
}, reverse: function () {
    return cc.FlipY.create(!this._flipY)
}, _flipY: !1});
cc.FlipY.create = function (a) {
    var b = new cc.FlipY;
    return b.initWithFlipY(a) ? b : null
};
cc.Place = cc.ActionInstant.extend({initWithPosition: function (a) {
    this._position = a;
    return!0
}, update: function () {
    this._target.setPosition(this._position)
}});
cc.Place.create = function (a) {
    var b = new cc.Place;
    b.initWithPosition(a);
    return b
};
cc.CallFunc = cc.ActionInstant.extend({initWithTarget: function (a, b, c) {
    this._data = c || null;
    this._callFunc = a || null;
    this._selectorTarget = b || null;
    return!0
}, execute: function () {
    null != this._callFunc && this._callFunc.call(this._selectorTarget, this._target, this._data)
}, update: function () {
    this.execute()
}, getTargetCallback: function () {
    return this._selectorTarget
}, setTargetCallback: function (a) {
    a != this._selectorTarget && (this._selectorTarget && (this._selectorTarget = null), this._selectorTarget = a)
}, copy: function () {
    var a =
        new cc.CallFunc;
    a.initWithTarget(this._callFunc, this._selectorTarget, this._data);
    return a
}, _selectorTarget: null, _callFunc: null});
cc.CallFunc.create = function (a, b, c) {
    var d = new cc.CallFunc;
    return d && d.initWithTarget(a, b, c) ? (d._callFunc = a, d) : null
};
cc.ProgressTo = cc.ActionInterval.extend({_to: 0, _from: 0, initWithDuration: function (a, b) {
    return this._super(a) ? (this._to = b, !0) : !1
}, copyWithZone: function (a) {
    var b = null;
    a && a._copyObject ? b = a._copyObject : (b = new cc.ProgressTo, a = new cc.Zone(b));
    this._super(a);
    b.initWithDuration(this._duration, this._to);
    return b
}, startWithTarget: function (a) {
    this._super(a);
    this._from = a.getPercentage();
    100 == this._from && (this._from = 0)
}, update: function (a) {
    this._target instanceof cc.ProgressTimer && this._target.setPercentage(this._from +
        (this._to - this._from) * a)
}});
cc.ProgressTo.create = function (a, b) {
    var c = new cc.ProgressTo;
    c.initWithDuration(a, b);
    return c
};
cc.ProgressFromTo = cc.ActionInterval.extend({_to: 0, _from: 0, initWithDuration: function (a, b, c) {
    return this._super(a) ? (this._to = c, this._from = b, !0) : !1
}, copyWithZone: function (a) {
    var b = null;
    a && a._copyObject ? b = a._copyObject : (b = new cc.ProgressFromTo, a = new cc.Zone(b));
    this._super(a);
    b.initWithDuration(this._duration, this._from, this._to);
    return b
}, reverse: function () {
    return cc.ProgressFromTo.create(this._duration, this._to, this._from)
}, startWithTarget: function (a) {
    this._super(a)
}, update: function (a) {
    this._target instanceof
        cc.ProgressTimer && this._target.setPercentage(this._from + (this._to - this._from) * a)
}});
cc.ProgressFromTo.create = function (a, b, c) {
    var d = new cc.ProgressFromTo;
    d.initWithDuration(a, b, c);
    return d
};
cc = cc = cc || {};
cc.ActionCamera = cc.ActionInterval.extend({centerXOrig: 0, centerYOrig: 0, centerZOrig: 0, eyeXOrig: 0, eyeYOrig: 0, eyeZOrig: 0, upXOrig: 0, upYOrig: 0, upZOrig: 0, startWithTarget: function (a) {
    this._super(a);
    a = a.getCamera();
    a.getCenterXYZ(this.centerXOrig, this.centerYOrig, this.centerZOrig);
    a.getEyeXYZ(this.eyeXOrig, this.eyeYOrig, this.eyeZOrig);
    a.getUpXYZ(this.upXOrig, this.upYOrig, this.upZOrig)
}, reverse: function () {
    return cc.ReverseTime.create(this)
}});
cc.OrbitCamera = cc.ActionCamera.extend({radius: 0, deltaRadius: 0, angleZ: 0, deltaAngleZ: 0, angleX: 0, deltaAngleX: 0, radZ: 0, radDeltaZ: 0, radX: 0, radDeltaX: 0, initWithDuration: function (a, b, c, d, e, f, g) {
    return this._super(a) ? (this.radius = b, this.deltaRadius = c, this.angleZ = d, this.deltaAngleZ = e, this.angleX = f, this.deltaAngleX = g, this.radDeltaZ = cc.DEGREES_TO_RADIANS(e), this.radDeltaX = cc.DEGREES_TO_RADIANS(g), !0) : !1
}, sphericalRadius: function () {
    var a, b;
    a = this._target.getCamera();
    a.getEyeXYZ(void 0, void 0, void 0);
    a.getCenterXYZ(void 0,
        void 0, void 0);
    a = Math.sqrt(Math.pow(NaN, 2) + Math.pow(NaN, 2) + Math.pow(NaN, 2));
    b = Math.sqrt(Math.pow(NaN, 2) + Math.pow(NaN, 2));
    0 == b && (b = cc.FLT_EPSILON);
    0 == a && (a = cc.FLT_EPSILON);
    Math.acos(NaN / a);
    Math.asin(NaN / b);
    cc.Camera.getZEye()
}, copyWithZone: function (a) {
    var b = null;
    a && a.copyObject ? b = a.copyObject : (b = new cc.OrbitCamera, a = new cc.Zone(b));
    cc.ActionInterval.copyWithZone(a);
    b.initWithDuration(this._duration, this.radius, this.deltaRadius, this.angleZ, this.deltaAngleZ, this.angleX, this.deltaAngleX);
    return b
}, startWithTarget: function (a) {
    this._super(a);
    this.sphericalRadius(void 0, void 0, void 0);
    isNaN(this.radius) && (this.radius = void 0);
    isNaN(this.angleZ) && (this.angleZ = cc.RADIANS_TO_DEGREES(void 0));
    isNaN(this.angleX) && (this.angleX = cc.RADIANS_TO_DEGREES(void 0));
    this.radZ = cc.DEGREES_TO_RADIANS(this.angleZ);
    this.radX = cc.DEGREES_TO_RADIANS(this.angleX)
}, update: function (a) {
    var b = (this.radius + this.deltaRadius * a) * cc.Camera.getZEye(), c = this.radZ + this.radDeltaZ * a, d = this.radX + this.radDeltaX * a, a = Math.sin(c) * Math.cos(d) * b + this.centerXOrig, d = Math.sin(c) * Math.sin(d) *
        b + this.centerYOrig, b = Math.cos(c) * b + this.centerZOrig;
    this._target.getCamera().setEyeXYZ(a, d, b)
}});
cc.OrbitCamera.create = function (a, b, c, d, e, f, g) {
    var h = new cc.OrbitCamera;
    return h.initWithDuration(a, b, c, d, e, f, g) ? h : null
};
cc.ActionEase = cc.ActionInterval.extend({initWithAction: function (a) {
    cc.Assert(null != a, "");
    return this.initWithDuration(a.getDuration()) ? (this._other = a, !0) : !1
}, startWithTarget: function (a) {
    cc.ActionInterval.prototype.startWithTarget.call(this, a);
    this._other.startWithTarget(this._target)
}, stop: function () {
    this._other.stop();
    this._super()
}, update: function (a) {
    this._other.update(a)
}, reverse: function () {
    return cc.ActionEase.create(this._other.reverse())
}, _other: null});
cc.ActionEase.create = function (a) {
    var b = new cc.ActionEase;
    b && b.initWithAction(a);
    return b
};
cc.EaseRateAction = cc.ActionEase.extend({setRate: function (a) {
    this._rate = a
}, getRate: function () {
    return this._rate
}, initWithAction: function (a, b) {
    return this._super(a) ? (this._rate = b, !0) : !1
}, reverse: function () {
    return cc.EaseRateAction.create(this._other.reverse(), 1 / this._rate)
}, _rate: null});
cc.EaseRateAction.create = function (a, b) {
    var c = new cc.EaseRateAction;
    c && c.initWithAction(a, b);
    return c
};
cc.EaseIn = cc.EaseRateAction.extend({update: function (a) {
    this._other.update(Math.pow(a, this._rate))
}, reverse: function () {
    return cc.EaseIn.create(this._other.reverse(), 1 / this._rate)
}});
cc.EaseIn.create = function (a, b) {
    var c = new cc.EaseIn;
    c && c.initWithAction(a, b);
    return c
};
cc.EaseOut = cc.EaseRateAction.extend({update: function (a) {
    this._other.update(Math.pow(a, 1 / this._rate))
}, reverse: function () {
    return cc.EaseOut.create(this._other.reverse(), 1 / this._rate)
}});
cc.EaseOut.create = function (a, b) {
    var c = new cc.EaseOut;
    c && c.initWithAction(a, b);
    return c
};
cc.EaseInOut = cc.EaseRateAction.extend({update: function (a) {
    a *= 2;
    1 > a ? this._other.update(0.5 * Math.pow(a, this._rate)) : this._other.update(1 - 0.5 * Math.pow(2 - a, this._rate))
}, reverse: function () {
    return cc.EaseInOut.create(this._other.reverse(), this._rate)
}});
cc.EaseInOut.create = function (a, b) {
    var c = new cc.EaseInOut;
    c && c.initWithAction(a, b);
    return c
};
cc.EaseExponentialIn = cc.ActionEase.extend({update: function (a) {
    this._other.update(0 == a ? 0 : Math.pow(2, 10 * (a - 1)) - 0.001)
}, reverse: function () {
    return cc.EaseExponentialOut.create(this._other.reverse())
}});
cc.EaseExponentialIn.create = function (a) {
    var b = new cc.EaseExponentialIn;
    b && b.initWithAction(a);
    return b
};
cc.EaseExponentialOut = cc.ActionEase.extend({update: function (a) {
    this._other.update(1 == a ? 1 : -Math.pow(2, -10 * a) + 1)
}, reverse: function () {
    return cc.EaseExponentialIn.create(this._other.reverse())
}});
cc.EaseExponentialOut.create = function (a) {
    var b = new cc.EaseExponentialOut;
    b && b.initWithAction(a);
    return b
};
cc.EaseExponentialInOut = cc.ActionEase.extend({update: function (a) {
    a /= 0.5;
    a = 1 > a ? 0.5 * Math.pow(2, 10 * (a - 1)) : 0.5 * (-Math.pow(2, -10 * (a - 1)) + 2);
    this._other.update(a)
}, reverse: function () {
    return cc.EaseExponentialInOut.create(this._other.reverse())
}});
cc.EaseExponentialInOut.create = function (a) {
    var b = new cc.EaseExponentialInOut;
    b && b.initWithAction(a);
    return b
};
cc.EaseSineIn = cc.ActionEase.extend({update: function (a) {
    this._other.update(-1 * Math.cos(a * Math.PI / 2) + 1)
}, reverse: function () {
    return cc.EaseSineOut.create(this._other.reverse())
}});
cc.EaseSineIn.create = function (a) {
    var b = new cc.EaseSineIn;
    b && b.initWithAction(a);
    return b
};
cc.EaseSineOut = cc.ActionEase.extend({update: function (a) {
    this._other.update(Math.sin(a * Math.PI / 2))
}, reverse: function () {
    return cc.EaseSineIn.create(this._other.reverse())
}});
cc.EaseSineOut.create = function (a) {
    var b = new cc.EaseSineOut;
    b && b.initWithAction(a);
    return b
};
cc.EaseSineInOut = cc.ActionEase.extend({update: function (a) {
    this._other.update(-0.5 * (Math.cos(Math.PI * a) - 1))
}, reverse: function () {
    return cc.EaseSineInOut.create(this._other.reverse())
}});
cc.EaseSineInOut.create = function (a) {
    var b = new cc.EaseSineInOut;
    b && b.initWithAction(a);
    return b
};
cc.EaseElastic = cc.ActionEase.extend({getPeriod: function () {
    return this._period
}, setPeriod: function (a) {
    this._period = a
}, initWithAction: function (a, b) {
    this._super(a);
    this._period = null == b ? 3 : b;
    return!0
}, reverse: function () {
    cc.Assert(0, "Override me");
    return null
}, _period: null});
cc.EaseElastic.create = function (a, b) {
    var c = new cc.EaseElastic;
    c && (null == b ? c.initWithAction(a) : c.initWithAction(a, b));
    return c
};
cc.EaseElasticIn = cc.EaseElastic.extend({update: function (a) {
    var b = 0;
    0 == a || 1 == a ? b = a : (b = this._period / 4, a -= 1, b = -Math.pow(2, 10 * a) * Math.sin(2 * (a - b) * Math.PI / this._period));
    this._other.update(b)
}, reverse: function () {
    return cc.EaseElasticOut.create(this._other.reverse(), this._period)
}});
cc.EaseElasticIn.create = function (a, b) {
    var c = new cc.EaseElasticIn;
    c && (null == b ? c.initWithAction(a) : c.initWithAction(a, b));
    return c
};
cc.EaseElasticOut = cc.EaseElastic.extend({update: function (a) {
    var b = 0;
    0 == a || 1 == a ? b = a : (b = this._period / 4, b = Math.pow(2, -10 * a) * Math.sin(2 * (a - b) * Math.PI / this._period) + 1);
    this._other.update(b)
}, reverse: function () {
    return cc.EaseElasticIn.create(this._other.reverse(), this._period)
}});
cc.EaseElasticOut.create = function (a, b) {
    var c = new cc.EaseElasticOut;
    c && (null == b ? c.initWithAction(a) : c.initWithAction(a, b));
    return c
};
cc.EaseElasticInOut = cc.EaseElastic.extend({update: function (a) {
    var b = 0;
    0 == a || 1 == a ? b = a : (this._period || (this._period = 0.3 * 1.5), b = this._period / 4, a = 2 * a - 1, b = 0 > a ? -0.5 * Math.pow(2, 10 * a) * Math.sin(2 * (a - b) * Math.PI / this._period) : 0.5 * Math.pow(2, -10 * a) * Math.sin(2 * (a - b) * Math.PI / this._period) + 1);
    this._other.update(b)
}, reverse: function () {
    return cc.EaseInOut.create(this._other.reverse(), this._period)
}});
cc.EaseElasticInOut.create = function (a, b) {
    var c = new cc.EaseElasticInOut;
    c && (null == b ? c.initWithAction(a) : c.initWithAction(a, b));
    return c
};
cc.EaseBounce = cc.ActionEase.extend({bounceTime: function (a) {
    if (a < 1 / 2.75)return 7.5625 * a * a;
    if (a < 2 / 2.75)return a -= 1.5 / 2.75, 7.5625 * a * a + 0.75;
    if (a < 2.5 / 2.75)return a -= 2.25 / 2.75, 7.5625 * a * a + 0.9375;
    a -= 2.625 / 2.75;
    return 7.5625 * a * a + 0.984375
}, reverse: function () {
    return cc.EaseBounce.create(this._other.reverse())
}});
cc.EaseBounce.create = function (a) {
    var b = new cc.EaseBounce;
    b && b.initWithAction(a);
    return b
};
cc.EaseBounceIn = cc.EaseBounce.extend({update: function (a) {
    this._other.update(1 - this.bounceTime(1 - a))
}, reverse: function () {
    return cc.EaseBounceOut.create(this._other.reverse())
}});
cc.EaseBounceIn.create = function (a) {
    var b = new cc.EaseBounceIn;
    b && b.initWithAction(a);
    return b
};
cc.EaseBounceOut = cc.EaseBounce.extend({update: function (a) {
    this._other.update(this.bounceTime(a))
}, reverse: function () {
    return cc.EaseBounceIn.create(this._other.reverse())
}});
cc.EaseBounceOut.create = function (a) {
    var b = new cc.EaseBounceOut;
    b && b.initWithAction(a);
    return b
};
cc.EaseBounceInOut = cc.EaseBounce.extend({update: function (a) {
    var b = 0, b = 0.5 > a ? 0.5 * (1 - this.bounceTime(1 - 2 * a)) : 0.5 * this.bounceTime(2 * a - 1) + 0.5;
    this._other.update(b)
}, reverse: function () {
    return cc.EaseBounceInOut.create(this._other.reverse())
}});
cc.EaseBounceInOut.create = function (a) {
    var b = new cc.EaseBounceInOut;
    b && b.initWithAction(a);
    return b
};
cc.EaseBackIn = cc.ActionEase.extend({update: function (a) {
    this._other.update(a * a * (2.70158 * a - 1.70158))
}, reverse: function () {
    return cc.EaseBackOut.create(this._other.reverse())
}});
cc.EaseBackIn.create = function (a) {
    var b = new cc.EaseBackIn;
    b && b.initWithAction(a);
    return b
};
cc.EaseBackOut = cc.ActionEase.extend({update: function (a) {
    a -= 1;
    this._other.update(a * a * (2.70158 * a + 1.70158) + 1)
}, reverse: function () {
    return cc.EaseBackIn.create(this._other.reverse())
}});
cc.EaseBackOut.create = function (a) {
    var b = new cc.EaseBackOut;
    b && b.initWithAction(a);
    return b
};
cc.EaseBackInOut = cc.ActionEase.extend({update: function (a) {
    a *= 2;
    1 > a ? this._other.update(a * a * (3.5949095 * a - 2.5949095) / 2) : (a -= 2, this._other.update(a * a * (3.5949095 * a + 2.5949095) / 2 + 1))
}, reverse: function () {
    return cc.EaseBackInOut.create(this._other.reverse())
}});
cc.EaseBackInOut.create = function (a) {
    var b = new cc.EaseBackInOut;
    b && b.initWithAction(a);
    return b
};
cc.Scene = cc.Node.extend({ctor: function () {
    this._super()
}, init: function () {
    this._super();
    this._ignoreAnchorPointForPosition = !0;
    this.setAnchorPoint(cc.p(0.5, 0.5));
    this.setContentSize(cc.Director.getInstance().getWinSize());
    return!0
}});
cc.Scene.create = function () {
    var a = new cc.Scene;
    a.init();
    return a
};
cc.TOUCH_ALL_AT_ONCE = 0;
cc.TOUCH_ONE_BY_ONE = 1;
cc.Layer = cc.Node.extend({_isTouchEnabled: !1, _isAccelerometerEnabled: !1, _isKeyboardEnabled: !1, _touchPriority: 0, _touchMode: cc.TOUCH_ALL_AT_ONCE, _isMouseEnabled: !1, _mousePriority: 0, ctor: function () {
    this._super()
}, _initLayer: function () {
    this.setAnchorPoint(cc.p(0.5, 0.5));
    this._ignoreAnchorPointForPosition = !0;
    this.setContentSize(cc.Director.getInstance().getWinSize());
    this._isMouseEnabled = this._isAccelerometerEnabled = this._isTouchEnabled = !1;
    this._touchMode = cc.TOUCH_ALL_AT_ONCE;
    this._touchPriority = 0
}, init: function () {
    this._super();
    this._initLayer();
    return!0
}, registerWithTouchDispatcher: function () {
    this._touchMode === cc.TOUCH_ALL_AT_ONCE ? cc.Director.getInstance().getTouchDispatcher().addStandardDelegate(this, this._touchPriority) : cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, this._touchPriority, !0)
}, isMouseEnabled: function () {
    return this._isMouseEnabled
}, setMouseEnabled: function (a) {
    this._isMouseEnabled != a && (this._isMouseEnabled = a, this._running && (a ? cc.Director.getInstance().getMouseDispatcher().addMouseDelegate(this,
        this._mousePriority) : cc.Director.getInstance().getMouseDispatcher().removeMouseDelegate(this)))
}, setMousePriority: function (a) {
    this._mousePriority != a && (this._mousePriority = a, this._isMouseEnabled && (this.setMouseEnabled(!1), this.setMouseEnabled(!0)))
}, getMousePriority: function () {
    return this._mousePriority
}, isTouchEnabled: function () {
    return this._isTouchEnabled
}, setTouchEnabled: function (a) {
    this._isTouchEnabled != a && (this._isTouchEnabled = a, this._running && (a ? this.registerWithTouchDispatcher() : cc.Director.getInstance().getTouchDispatcher().removeDelegate(this)))
},
    getTouchPriority: function () {
        return this._touchPriority
    }, setTouchPriority: function (a) {
        this._touchPriority != a && (this._touchPriority = a, this._isTouchEnabled && (this.setTouchEnabled(!1), this.setTouchEnabled(!0)))
    }, getTouchMode: function () {
        return this._touchMode
    }, setTouchMode: function (a) {
        this._touchMode != a && (this._touchMode = a, this._isTouchEnabled && (this.setTouchEnabled(!1), this.setTouchEnabled(!0)))
    }, isAccelerometerEnabled: function () {
        return this._isAccelerometerEnabled
    }, setAccelerometerEnabled: function (a) {
        if (a !=
            this._isAccelerometerEnabled && (this._isAccelerometerEnabled = a, this._running)) {
            var b = cc.Director.getInstance();
            a ? b.getAccelerometer().setDelegate(this) : b.getAccelerometer().setDelegate(null)
        }
    }, isKeyboardEnabled: function () {
        return this._isKeyboardEnabled
    }, setKeyboardEnabled: function (a) {
        if (a != this._isKeyboardEnabled && (this._isKeyboardEnabled = a, this._running)) {
            var b = cc.Director.getInstance();
            a ? b.getKeyboardDispatcher().addDelegate(this) : b.getKeyboardDispatcher().removeDelegate(this)
        }
    }, onEnter: function () {
        var a =
            cc.Director.getInstance();
        this._isTouchEnabled && this.registerWithTouchDispatcher();
        this._super();
        this._isKeyboardEnabled && a.getKeyboardDispatcher().addDelegate(this);
        this._isMouseEnabled && a.getMouseDispatcher().addMouseDelegate(this, this._mousePriority)
    }, onExit: function () {
        var a = cc.Director.getInstance();
        this._isTouchEnabled && a.getTouchDispatcher().removeDelegate(this);
        this._isKeyboardEnabled && a.getKeyboardDispatcher().removeDelegate(this);
        this._isMouseEnabled && a.getMouseDispatcher().removeMouseDelegate(this);
        this._super()
    }, onEnterTransitionDidFinish: function () {
        this._super()
    }, onTouchBegan: function () {
        cc.Assert(!1, "Layer#onTouchBegan override me");
        return!0
    }, onTouchMoved: function () {
    }, onTouchEnded: function () {
    }, onTouchCancelled: function () {
    }, onTouchesBegan: function () {
    }, onTouchesMoved: function () {
    }, onTouchesEnded: function () {
    }, onTouchesCancelled: function () {
    }, didAccelerate: function () {
    }, onMouseDown: function () {
        return!1
    }, onMouseDragged: function () {
        return!1
    }, onMouseMoved: function () {
        return!1
    }, onMouseUp: function () {
        return!1
    },
    onRightMouseDown: function () {
        return!1
    }, onRightMouseDragged: function () {
        return!1
    }, onRightMouseUp: function () {
        return!1
    }, onOtherMouseDown: function () {
        return!1
    }, onOtherMouseDragged: function () {
        return!1
    }, onOtherMouseUp: function () {
        return!1
    }, onScrollWheel: function () {
        return!1
    }, onMouseEntered: function () {
        return!1
    }, onMouseExited: function () {
        return!1
    }});
cc.Layer.create = function () {
    var a = new cc.Layer;
    return a && a.init() ? a : null
};
cc.LayerColor = cc.Layer.extend({RGBAProtocol: !0, _squareVertices: [], _squareColors: [], _opacity: 0, _color: new cc.Color3B(255, 255, 255), _blendFunc: new cc.BlendFunc(cc.BLEND_SRC, cc.BLEND_DST), _layerColorStr: null, ctor: function () {
    this._squareVertices = [new cc.Vertex2F(0, 0), new cc.Vertex2F(0, 0), new cc.Vertex2F(0, 0), new cc.Vertex2F(0, 0)];
    this._squareColors = [new cc.Color4F(0, 0, 0, 1), new cc.Color4F(0, 0, 0, 1), new cc.Color4F(0, 0, 0, 1), new cc.Color4F(0, 0, 0, 1)];
    this._color = new cc.Color4B(0, 0, 0, 0);
    this._opacity = 255;
    this._super();
    this._layerColorStr = this._getLayerColorString()
}, _getLayerColorString: function () {
    return"rgba(" + (0 | this._color.r) + "," + (0 | this._color.g) + "," + (0 | this._color.b) + "," + (this.getOpacity() / 255).toFixed(5) + ")"
}, getOpacity: function () {
    return this._opacity
}, setOpacity: function (a) {
    this._opacity = a;
    this._updateColor();
    this.setNodeDirty()
}, getColor: function () {
    return this._color
}, setColor: function (a) {
    this._color = a;
    this._updateColor();
    this.setNodeDirty()
}, getBlendFunc: function () {
    return this._blendFunc
}, _isLighterMode: !1,
    setBlendFunc: function (a, b) {
        this._isLighterMode = (this._blendFunc = 1 == arguments.length ? a : {src: a, dst: b}) && 1 == this._blendFunc.src && 771 == this._blendFunc.dst
    }, init: function (a, b, c) {
        this._initLayer();
        var d = cc.Director.getInstance().getWinSize(), a = a || new cc.Color4B(0, 0, 0, 255), b = b || d.width, c = c || d.height;
        this._blendFunc.src = cc.BLEND_SRC;
        this._blendFunc.dst = cc.BLEND_DST;
        this._color = new cc.Color3B(a.r, a.g, a.b);
        this._opacity = a.a;
        for (a = 0; a < this._squareVertices.length; a++)this._squareVertices[a].x = 0, this._squareVertices[a].y =
            0;
        this.setContentSize(cc.size(b, c));
        this._updateColor();
        return!0
    }, setContentSize: function (a) {
        this._squareVertices[1].x = a.width;
        this._squareVertices[2].y = a.height;
        this._squareVertices[3].x = a.width;
        this._squareVertices[3].y = a.height;
        this._super(a)
    }, changeWidthAndHeight: function (a, b) {
        this.setContentSize(cc.size(a, b))
    }, changeWidth: function (a) {
        this.setContentSize(cc.size(a, this._contentSize.height))
    }, changeHeight: function (a) {
        this.setContentSize(cc.size(this._contentSize.width, a))
    }, _updateColor: function () {
        for (var a =
            0; 4 > a; a++)this._squareColors[a].r = this._color.r / 255, this._squareColors[a].g = this._color.g / 255, this._squareColors[a].b = this._color.b / 255, this._squareColors[a].a = this._opacity / 255
    }, setOpacityModifyRGB: function () {
    }, isOpacityModifyRGB: function () {
        return!1
    }, draw: function (a) {
        var a = a || cc.renderContext, b = this.getContentSize().width, c = this.getContentSize().height, d = this.getAnchorPointInPoints();
        a.fillStyle = "rgba(" + (0 | this._color.r) + "," + (0 | this._color.g) + "," + (0 | this._color.b) + "," + this.getOpacity() / 255 + ")";
        a.fillRect(-d.x,
            d.y, b, -c);
        cc.INCREMENT_GL_DRAWS(1)
    }, _drawForWebGL: function () {
    }});
cc.LayerColor.create = function (a, b, c) {
    var d = new cc.LayerColor;
    switch (arguments.length) {
        case 0:
            d.init();
            break;
        case 1:
            d.init(a);
            break;
        case 3:
            d.init(a, b, c);
            break;
        default:
            d.init()
    }
    return d
};
cc.LayerGradient = cc.LayerColor.extend({_startColor: null, _endColor: null, _startOpacity: null, _endOpacity: null, _alongVector: null, _compressedInterpolation: !1, _gradientStartPoint: null, _gradientEndPoint: null, ctor: function () {
    this._super();
    this._color = new cc.Color3B(0, 0, 0);
    this._startColor = new cc.Color3B(0, 0, 0);
    this._endColor = new cc.Color3B(0, 0, 0);
    this._alongVector = cc.p(0, -1);
    this._endOpacity = this._startOpacity = 255;
    this._gradientStartPoint = cc.p(0, 0);
    this._gradientEndPoint = cc.p(0, 0)
}, getStartColor: function () {
    return this._color
},
    setStartColor: function (a) {
        this.setColor(a)
    }, setEndColor: function (a) {
        this._endColor = a;
        this._updateColor()
    }, getEndColor: function () {
        return this._endColor
    }, setStartOpacity: function (a) {
        this._startOpacity = a;
        this._updateColor()
    }, getStartOpacity: function () {
        return this._startOpacity
    }, setEndOpacity: function (a) {
        this._endOpacity = a;
        this._updateColor()
    }, getEndOpacity: function () {
        return this._endOpacity
    }, setVector: function (a) {
        this._alongVector = a;
        this._updateColor()
    }, getVector: function () {
        return this._alongVector
    },
    isCompressedInterpolation: function () {
        return this._compressedInterpolation
    }, setCompressedInterpolation: function (a) {
        this._compressedInterpolation = a;
        this._updateColor()
    }, init: function (a, b, c) {
        var d = arguments.length;
        if (0 == d)return this._super();
        2 == d && (c = cc.p(0, -1));
        this._startColor.r = a.r;
        this._startColor.g = a.g;
        this._startColor.b = a.b;
        this._startOpacity = a.a;
        this._endColor.r = b.r;
        this._endColor.g = b.g;
        this._endColor.b = b.b;
        this._endOpacity = b.a;
        this._alongVector = c;
        this._compressedInterpolation = !0;
        this._super(cc.c4b(a.r,
            a.g, a.b, 255));
        return!0
    }, _updateColor: function () {
        if (cc.renderContextType === cc.CANVAS) {
            var a = this.getContentSize().width / 2, b = this.getContentSize().height / 2, c = this.getAnchorPointInPoints(), d = a - c.x, c = b - c.y;
            this._gradientStartPoint = cc.p(a * -this._alongVector.x + d, b * this._alongVector.y - c);
            this._gradientEndPoint = cc.p(a * this._alongVector.x + d, b * -this._alongVector.y - c)
        } else this._super(), b = cc.pLength(this._alongVector), 0 != b && (a = Math.sqrt(2), b = cc.p(this._alongVector.x / b, this._alongVector.y / b), this._compressedInterpolation &&
            (d = 1 / (Math.abs(b.x) + Math.abs(b.y)), b = cc.pMult(b, d * a)), c = this._opacity / 255, d = new cc.Color4F(this._color.r / 255, this._color.g / 255, this._color.b / 255, this._startOpacity * c / 255), c = new cc.Color4F(this._endColor.r / 255, this._endColor.g / 255, this._endColor.b / 255, this._endOpacity * c / 255), this._squareColors[0].r = c.r + (d.r - c.r) * ((a + b.x + b.y) / (2 * a)), this._squareColors[0].g = c.g + (d.g - c.g) * ((a + b.x + b.y) / (2 * a)), this._squareColors[0].b = c.b + (d.b - c.b) * ((a + b.x + b.y) / (2 * a)), this._squareColors[0].a = c.a + (d.a - c.a) * ((a + b.x + b.y) / (2 *
            a)), this._squareColors[1].r = c.r + (d.r - c.r) * ((a - b.x + b.y) / (2 * a)), this._squareColors[1].g = c.g + (d.g - c.g) * ((a - b.x + b.y) / (2 * a)), this._squareColors[1].b = c.b + (d.b - c.b) * ((a - b.x + b.y) / (2 * a)), this._squareColors[1].a = c.a + (d.a - c.a) * ((a - b.x + b.y) / (2 * a)), this._squareColors[2].r = c.r + (d.r - c.r) * ((a + b.x - b.y) / (2 * a)), this._squareColors[2].g = c.g + (d.g - c.g) * ((a + b.x - b.y) / (2 * a)), this._squareColors[2].b = c.b + (d.b - c.b) * ((a + b.x - b.y) / (2 * a)), this._squareColors[2].a = c.a + (d.a - c.a) * ((a + b.x - b.y) / (2 * a)), this._squareColors[3].r = c.r + (d.r -
            c.r) * ((a - b.x - b.y) / (2 * a)), this._squareColors[3].g = c.g + (d.g - c.g) * ((a - b.x - b.y) / (2 * a)), this._squareColors[3].b = c.b + (d.b - c.b) * ((a - b.x - b.y) / (2 * a)), this._squareColors[3].a = c.a + (d.a - c.a) * ((a - b.x - b.y) / (2 * a)))
    }, draw: function (a) {
        a = a || cc.renderContext;
        if (cc.renderContextType == cc.CANVAS) {
            this._isLighterMode && (a.globalCompositeOperation = "lighter");
            a.save();
            var b = this.getContentSize().width, c = this.getContentSize().height, d = this.getAnchorPointInPoints(), e = a.createLinearGradient(this._gradientStartPoint.x, this._gradientStartPoint.y,
                this._gradientEndPoint.x, this._gradientEndPoint.y);
            e.addColorStop(0, "rgba(" + Math.round(this._color.r) + "," + Math.round(this._color.g) + "," + Math.round(this._color.b) + "," + (this._startOpacity / 255).toFixed(4) + ")");
            e.addColorStop(1, "rgba(" + Math.round(this._endColor.r) + "," + Math.round(this._endColor.g) + "," + Math.round(this._endColor.b) + "," + (this._endOpacity / 255).toFixed(4) + ")");
            a.fillStyle = e;
            a.fillRect(-d.x, d.y, b, -c);
            0 != this._rotation && a.rotate(this._rotationRadians);
            a.restore()
        }
    }});
cc.LayerGradient.create = function (a, b, c) {
    var d = new cc.LayerGradient;
    switch (arguments.length) {
        case 2:
            if (d && d.init(a, b))return d;
            break;
        case 3:
            if (d && d.init(a, b, c))return d;
            break;
        case 0:
            if (d && d.init())return d;
            break;
        default:
            throw"Arguments error ";
    }
    return null
};
cc.LayerMultiplex = cc.Layer.extend({_enabledLayer: 0, _layers: null, ctor: function () {
    this._super()
}, initWithLayer: function (a) {
    this._layers = [];
    this._layers.push(a);
    this._enabledLayer = 0;
    this.addChild(a);
    return!0
}, initWithLayers: function (a) {
    this._layers = a;
    this._enabledLayer = 0;
    this.addChild(this._layers[this._enabledLayer]);
    return!0
}, switchTo: function (a) {
    cc.Assert(a < this._layers.length, "Invalid index in MultiplexLayer switchTo message");
    this.removeChild(this._layers[this._enabledLayer], !0);
    this._enabledLayer =
        a;
    this.addChild(this._layers[a])
}, switchToAndReleaseMe: function (a) {
    cc.Assert(a < this._layers.count(), "Invalid index in MultiplexLayer switchTo message");
    this.removeChild(this._layers[this._enabledLayer], !0);
    this._layers[this._enabledLayer] = null;
    this._enabledLayer = a;
    this.addChild(this._layers[a])
}, addLayer: function (a) {
    cc.Assert(this._layers, "cc.Layer addLayer");
    this._layers.push(a)
}});
cc.LayerMultiplex.create = function () {
    var a = new cc.LayerMultiplex;
    return a.initWithLayers(arguments) ? a : null
};
cc.LazyLayer = cc.Node.extend({_layerCanvas: null, _layerContext: null, _isNeedUpdate: !1, _canvasZOrder: -10, _layerId: "", ctor: function () {
    this._super();
    this.setAnchorPoint(cc.p(0, 0));
    this._setupHtml()
}, setLayerZOrder: function (a) {
    if (0 <= a)throw"LazyLayer zOrder must Less than Zero.Because LazyLayer is a background Layer!";
    this._canvasZOrder = a;
    this._layerCanvas.style.zIndex = this._canvasZOrder
}, getLayerZOrder: function () {
    return this._canvasZOrder
}, _setupHtml: function () {
    this._layerCanvas = document.createElement("canvas");
    this._layerCanvas.width = cc.canvas.width;
    this._layerCanvas.height = cc.canvas.height;
    this._layerId = "lazyCanvas" + Date.now();
    this._layerCanvas.id = this._layerId;
    this._layerCanvas.style.zIndex = this._canvasZOrder;
    this._layerCanvas.style.position = "absolute";
    this._layerCanvas.style.top = "0";
    this._layerCanvas.style.left = "0";
    this._layerContext = this._layerCanvas.getContext("2d");
    this._layerContext.fillStyle = "rgba(0,0,0,1)";
    this._layerContext.translate(0, this._layerCanvas.height);
    cc.container.appendChild(this._layerCanvas);
    var a = this;
    window.addEventListener("resize", function () {
        a.adjustSizeForCanvas()
    })
}, adjustSizeForCanvas: function () {
    this._isNeedUpdate = !0;
    this._layerCanvas.width = cc.canvas.width;
    this._layerCanvas.height = cc.canvas.height;
    var a = cc.canvas.width / cc.originalCanvasSize.width, b = cc.canvas.height / cc.originalCanvasSize.height;
    a > b && (a = b);
    this._layerContext.translate(0, this._layerCanvas.height);
    this._layerContext.scale(a, a)
}, getLayerCanvas: function () {
    return this._layerCanvas
}, addChild: function (a, b, c) {
    this._isNeedUpdate = !0;
    this._super(a, b, c)
}, removeChild: function (a, b) {
    this._isNeedUpdate = !0;
    this._super(a, b)
}, visit: function () {
    if (this._visible && this._isNeedUpdate) {
        this._isNeedUpdate = !1;
        var a = this._layerContext;
        a.save();
        a.clearRect(0, 0, this._layerCanvas.width, -this._layerCanvas.height);
        if (this._children && 0 < this._children.length) {
            this.sortAllChildren();
            for (var b = 0; b < this._children.length; b++)this._children[b].visit(a)
        }
        a.restore()
    }
}, onExit: function () {
    this._super();
    this._layerCanvas.parentNode && this._layerCanvas.parentNode.removeChild(this._layerCanvas)
},
    _setNodeDirtyForCache: function () {
        this._isNeedUpdate = this._cacheDirty = !0
    }});
cc.SCENE_FADE = 4208917214;
cc.TransitionEaseScene = cc.Class.extend({easeActionWithAction: function () {
}});
cc.TRANSITION_ORIENTATION_LEFT_OVER = 0;
cc.TRANSITION_ORIENTATION_RIGHT_OVER = 1;
cc.TRANSITION_ORIENTATION_UP_OVER = 0;
cc.TRANSITION_ORIENTATION_DOWN_OVER = 1;
cc.TransitionScene = cc.Scene.extend({_inScene: null, _outScene: null, _duration: null, _isInSceneOnTop: !1, _isSendCleanupToScene: !1, _setNewScene: function () {
    this.unschedule(this._setNewScene);
    var a = cc.Director.getInstance();
    this._isSendCleanupToScene = a.isSendCleanupToScene();
    a.replaceScene(this._inScene);
    a.getTouchDispatcher().setDispatchEvents(!0);
    this._outScene.setVisible(!0)
}, _sceneOrder: function () {
    this._isInSceneOnTop = !0
}, draw: function () {
    this._super();
    this._isInSceneOnTop ? (this._outScene.visit(), this._inScene.visit()) :
        (this._inScene.visit(), this._outScene.visit())
}, onEnter: function () {
    this._super();
    this._inScene.onEnter()
}, onExit: function () {
    this._super();
    this._outScene.onExit();
    this._inScene.onEnterTransitionDidFinish()
}, cleanup: function () {
    this._super();
    this._isSendCleanupToScene && this._outScene.cleanup()
}, initWithDuration: function (a, b) {
    cc.Assert(null != b, "CCTransitionScene.initWithDuration() Argument scene must be non-nil");
    return this.init() ? (this._duration = a, this.setAnchorPoint(cc.p(0, 0)), this.setPosition(cc.p(0,
        0)), this._inScene = b, this._outScene = cc.Director.getInstance().getRunningScene(), this._outScene || (this._outScene = cc.Scene.create(), this._outScene.init()), cc.Assert(this._inScene != this._outScene, "CCTransitionScene.initWithDuration() Incoming scene must be different from the outgoing scene"), cc.Director.getInstance().getTouchDispatcher().setDispatchEvents(!1), this._sceneOrder(), !0) : !1
}, finish: function () {
    this._inScene.setVisible(!0);
    this._inScene.setPosition(cc.p(0, 0));
    this._inScene.setScale(1);
    this._inScene.setRotation(0);
    this._inScene.getCamera().restore();
    this._outScene.setVisible(!1);
    this._outScene.setPosition(cc.p(0, 0));
    this._outScene.setScale(1);
    this._outScene.setRotation(0);
    this._outScene.getCamera().restore();
    this.schedule(this._setNewScene, 0)
}, hideOutShowIn: function () {
    this._inScene.setVisible(!0);
    this._outScene.setVisible(!1)
}});
cc.TransitionScene.create = function (a, b) {
    var c = new cc.TransitionScene;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionSceneOriented = cc.TransitionScene.extend({_orientation: 0, initWithDuration: function (a, b, c) {
    this._super(a, b) && (this._orientation = c);
    return!0
}});
cc.TransitionSceneOriented.create = function (a, b, c) {
    var d = new cc.TransitionSceneOriented;
    d.initWithDuration(a, b, c);
    return d
};
cc.TransitionRotoZoom = cc.TransitionScene.extend({ctor: function () {
}, onEnter: function () {
    this._super();
    this._inScene.setScale(0.001);
    this._outScene.setScale(1);
    this._inScene.setAnchorPoint(cc.p(0.5, 0.5));
    this._outScene.setAnchorPoint(cc.p(0.5, 0.5));
    var a = cc.Sequence.create(cc.Spawn.create(cc.ScaleBy.create(this._duration / 2, 0.001), cc.RotateBy.create(this._duration / 2, 720)), cc.DelayTime.create(this._duration / 2));
    this._outScene.runAction(a);
    this._inScene.runAction(cc.Sequence.create(a.reverse(), cc.CallFunc.create(this.finish,
        this)))
}});
cc.TransitionRotoZoom.create = function (a, b) {
    var c = new cc.TransitionRotoZoom;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionJumpZoom = cc.TransitionScene.extend({onEnter: function () {
    this._super();
    var a = cc.Director.getInstance().getWinSize();
    this._inScene.setScale(0.5);
    this._inScene.setPosition(cc.p(a.width, 0));
    this._inScene.setAnchorPoint(cc.p(0.5, 0.5));
    this._outScene.setAnchorPoint(cc.p(0.5, 0.5));
    var b = cc.JumpBy.create(this._duration / 4, cc.p(-a.width, 0), a.width / 4, 2), c = cc.ScaleTo.create(this._duration / 4, 1), a = cc.ScaleTo.create(this._duration / 4, 0.5), a = cc.Sequence.create(a, b), b = cc.Sequence.create(b, c), c = cc.DelayTime.create(this._duration /
        2);
    this._outScene.runAction(a);
    this._inScene.runAction(cc.Sequence.create(c, b, cc.CallFunc.create(this.finish, this)))
}});
cc.TransitionJumpZoom.create = function (a, b) {
    var c = new cc.TransitionJumpZoom;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionMoveInL = cc.TransitionScene.extend({onEnter: function () {
    this._super();
    this.initScenes();
    var a = this.action();
    this._inScene.runAction(cc.Sequence.create(this.easeActionWithAction(a), cc.CallFunc.create(this.finish, this), null))
}, initScenes: function () {
    this._inScene.setPosition(cc.p(-cc.Director.getInstance().getWinSize().width, 0))
}, action: function () {
    return cc.MoveTo.create(this._duration, cc.p(0, 0))
}, easeActionWithAction: function (a) {
    return cc.EaseOut.create(a, 2)
}});
cc.TransitionMoveInL.create = function (a, b) {
    var c = new cc.TransitionMoveInL;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionMoveInR = cc.TransitionMoveInL.extend({initScenes: function () {
    var a = cc.Director.getInstance().getWinSize();
    this._inScene.setPosition(cc.p(a.width, 0))
}});
cc.TransitionMoveInR.create = function (a, b) {
    var c = new cc.TransitionMoveInR;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionMoveInT = cc.TransitionMoveInL.extend({initScenes: function () {
    var a = cc.Director.getInstance().getWinSize();
    this._inScene.setPosition(cc.p(a.height, 0))
}});
cc.TransitionMoveInT.create = function (a, b) {
    var c = new cc.TransitionMoveInT;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionMoveInB = cc.TransitionMoveInL.extend({initScenes: function () {
    var a = cc.Director.getInstance().getWinSize();
    this._inScene.setPosition(cc.p(0, -a.height))
}});
cc.TransitionMoveInB.create = function (a, b) {
    var c = new cc.TransitionMoveInB;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.ADJUST_FACTOR = 0.5;
cc.TransitionSlideInL = cc.TransitionScene.extend({_sceneOrder: function () {
    this._isInSceneOnTop = !1
}, ctor: function () {
}, onEnter: function () {
    this._super();
    this.initScenes();
    var a = this.action(), b = this.action(), a = this.easeActionWithAction(a), b = cc.Sequence.create(this.easeActionWithAction(b), cc.CallFunc.create(this.finish, this), null);
    this._inScene.runAction(a);
    this._outScene.runAction(b)
}, initScenes: function () {
    var a = cc.Director.getInstance().getWinSize();
    this._inScene.setPosition(cc.p(-(a.width - cc.ADJUST_FACTOR),
        0))
}, action: function () {
    var a = cc.Director.getInstance().getWinSize();
    return cc.MoveBy.create(this._duration, cc.p(a.width - cc.ADJUST_FACTOR, 0))
}, easeActionWithAction: function (a) {
    return cc.EaseOut.create(a, 2)
}});
cc.TransitionSlideInL.create = function (a, b) {
    var c = new cc.TransitionSlideInL;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionSlideInR = cc.TransitionSlideInL.extend({_sceneOrder: function () {
    this._isInSceneOnTop = !0
}, initScenes: function () {
    var a = cc.Director.getInstance().getWinSize();
    this._inScene.setPosition(cc.p(a.width - cc.ADJUST_FACTOR, 0))
}, action: function () {
    var a = cc.Director.getInstance().getWinSize();
    return cc.MoveBy.create(this._duration, cc.p(-(a.width - cc.ADJUST_FACTOR), 0))
}});
cc.TransitionSlideInR.create = function (a, b) {
    var c = new cc.TransitionSlideInR;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionSlideInB = cc.TransitionSlideInL.extend({_sceneOrder: function () {
    this._isInSceneOnTop = !1
}, initScenes: function () {
    var a = cc.Director.getInstance().getWinSize();
    this._inScene.setPosition(cc.p(0, a.height - cc.ADJUST_FACTOR))
}, action: function () {
    var a = cc.Director.getInstance().getWinSize();
    return cc.MoveBy.create(this._duration, cc.p(0, -(a.height - cc.ADJUST_FACTOR)))
}});
cc.TransitionSlideInB.create = function (a, b) {
    var c = new cc.TransitionSlideInB;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionSlideInT = cc.TransitionSlideInL.extend({_sceneOrder: function () {
    this._isInSceneOnTop = !0
}, initScenes: function () {
    var a = cc.Director.getInstance().getWinSize();
    this._inScene.setPosition(cc.p(0, -(a.height - cc.ADJUST_FACTOR)))
}, action: function () {
    var a = cc.Director.getInstance().getWinSize();
    return cc.MoveBy.create(this._duration, cc.p(0, a.height - cc.ADJUST_FACTOR))
}});
cc.TransitionSlideInT.create = function (a, b) {
    var c = new cc.TransitionSlideInT;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionShrinkGrow = cc.TransitionScene.extend({onEnter: function () {
    this._super();
    this._inScene.setScale(0.001);
    this._outScene.setScale(1);
    this._inScene.setAnchorPoint(cc.p(2 / 3, 0.5));
    this._outScene.setAnchorPoint(cc.p(1 / 3, 0.5));
    var a = cc.ScaleTo.create(this._duration, 0.01);
    this._inScene.runAction(this.easeActionWithAction(cc.ScaleTo.create(this._duration, 1)));
    this._outScene.runAction(cc.Sequence.create(this.easeActionWithAction(a), cc.CallFunc.create(this.finish, this)))
}, easeActionWithAction: function (a) {
    return cc.EaseOut.create(a,
        2)
}});
cc.TransitionShrinkGrow.create = function (a, b) {
    var c = new cc.TransitionShrinkGrow;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionFlipX = cc.TransitionSceneOriented.extend({onEnter: function () {
    this._super();
    var a, b;
    this._inScene.setVisible(!1);
    var c;
    this._orientation == cc.TRANSITION_ORIENTATION_RIGHT_OVER ? (a = 90, c = 270, b = 90) : (a = -90, c = 90, b = -90);
    a = cc.Sequence.create(cc.DelayTime.create(this._duration / 2), cc.Show.create(), cc.OrbitCamera.create(this._duration / 2, 1, 0, c, a, 0, 0), cc.CallFunc.create(this.finish, this));
    b = cc.Sequence.create(cc.OrbitCamera.create(this._duration / 2, 1, 0, 0, b, 0, 0), cc.Hide.create(), cc.DelayTime.create(this._duration /
        2));
    this._inScene.runAction(a);
    this._outScene.runAction(b)
}});
cc.TransitionFlipX.create = function (a, b, c) {
    null == c && (c = cc.TRANSITION_ORIENTATION_RIGHT_OVER);
    var d = new cc.TransitionFlipX;
    d.initWithDuration(a, b, c);
    return d
};
cc.TransitionFlipY = cc.TransitionSceneOriented.extend({onEnter: function () {
    this._super();
    var a, b;
    this._inScene.setVisible(!1);
    var c;
    this._orientation == cc.TRANSITION_ORIENTATION_UP_OVER ? (a = 90, c = 270, b = 90) : (a = -90, c = 90, b = -90);
    a = cc.Sequence.create(cc.DelayTime.create(this._duration / 2), cc.Show.create(), cc.OrbitCamera.create(this._duration / 2, 1, 0, c, a, 90, 0), cc.CallFunc.create(this.finish, this));
    b = cc.Sequence.create(cc.OrbitCamera.create(this._duration / 2, 1, 0, 0, b, 90, 0), cc.Hide.create(), cc.DelayTime.create(this._duration /
        2));
    this._inScene.runAction(a);
    this._outScene.runAction(b)
}});
cc.TransitionFlipY.create = function (a, b, c) {
    null == c && (c = cc.TRANSITION_ORIENTATION_UP_OVER);
    var d = new cc.TransitionFlipY;
    d.initWithDuration(a, b, c);
    return d
};
cc.TransitionFlipAngular = cc.TransitionSceneOriented.extend({onEnter: function () {
    this._super();
    var a, b;
    this._inScene.setVisible(!1);
    var c;
    this._orientation == cc.TRANSITION_ORIENTATION_RIGHT_OVER ? (a = 90, c = 270, b = 90) : (a = -90, c = 90, b = -90);
    a = cc.Sequence.create(cc.DelayTime.create(this._duration / 2), cc.Show.create(), cc.OrbitCamera.create(this._duration / 2, 1, 0, c, a, -45, 0), cc.CallFunc.create(this.finish, this));
    b = cc.Sequence.create(cc.OrbitCamera.create(this._duration / 2, 1, 0, 0, b, 45, 0), cc.Hide.create(), cc.DelayTime.create(this._duration /
        2));
    this._inScene.runAction(a);
    this._outScene.runAction(b)
}});
cc.TransitionFlipAngular.create = function (a, b, c) {
    null == c && (c = cc.TRANSITION_ORIENTATION_RIGHT_OVER);
    var d = new cc.TransitionFlipAngular;
    d.initWithDuration(a, b, c);
    return d
};
cc.TransitionZoomFlipX = cc.TransitionSceneOriented.extend({onEnter: function () {
    this._super();
    var a, b;
    this._inScene.setVisible(!1);
    var c;
    this._orientation == cc.TRANSITION_ORIENTATION_RIGHT_OVER ? (a = 90, c = 270, b = 90) : (a = -90, c = 90, b = -90);
    a = cc.Sequence.create(cc.DelayTime.create(this._duration / 2), cc.Spawn.create(cc.OrbitCamera.create(this._duration / 2, 1, 0, c, a, 0, 0), cc.ScaleTo.create(this._duration / 2, 1), cc.Show.create()), cc.CallFunc.create(this.finish, this));
    b = cc.Sequence.create(cc.Spawn.create(cc.OrbitCamera.create(this._duration /
        2, 1, 0, 0, b, 0, 0), cc.ScaleTo.create(this._duration / 2, 0.5)), cc.Hide.create(), cc.DelayTime.create(this._duration / 2));
    this._inScene.setScale(0.5);
    this._inScene.runAction(a);
    this._outScene.runAction(b)
}});
cc.TransitionZoomFlipX.create = function (a, b, c) {
    null == c && (c = cc.TRANSITION_ORIENTATION_RIGHT_OVER);
    var d = new cc.TransitionZoomFlipX;
    d.initWithDuration(a, b, c);
    return d
};
cc.TransitionZoomFlipY = cc.TransitionSceneOriented.extend({onEnter: function () {
    this._super();
    var a, b;
    this._inScene.setVisible(!1);
    var c;
    this._orientation == cc.TRANSITION_ORIENTATION_UP_OVER ? (a = 90, c = 270, b = 90) : (a = -90, c = 90, b = -90);
    a = cc.Sequence.create(cc.DelayTime.create(this._duration / 2), cc.Spawn.create(cc.OrbitCamera.create(this._duration / 2, 1, 0, c, a, 90, 0), cc.ScaleTo.create(this._duration / 2, 1), cc.Show.create()), cc.CallFunc.create(this.finish, this));
    b = cc.Sequence.create(cc.Spawn.create(cc.OrbitCamera.create(this._duration /
        2, 1, 0, 0, b, 90, 0), cc.ScaleTo.create(this._duration / 2, 0.5)), cc.Hide.create(), cc.DelayTime.create(this._duration / 2));
    this._inScene.setScale(0.5);
    this._inScene.runAction(a);
    this._outScene.runAction(b)
}});
cc.TransitionZoomFlipY.create = function (a, b, c) {
    null == c && (c = cc.TRANSITION_ORIENTATION_UP_OVER);
    var d = new cc.TransitionZoomFlipY;
    d.initWithDuration(a, b, c);
    return d
};
cc.TransitionZoomFlipAngular = cc.TransitionSceneOriented.extend({onEnter: function () {
    this._super();
    var a, b;
    this._inScene.setVisible(!1);
    var c;
    this._orientation == cc.TRANSITION_ORIENTATION_RIGHT_OVER ? (a = 90, c = 270, b = 90) : (a = -90, c = 90, b = -90);
    a = cc.Sequence.create(cc.DelayTime.create(this._duration / 2), cc.Spawn.create(cc.OrbitCamera.create(this._duration / 2, 1, 0, c, a, -45, 0), cc.ScaleTo.create(this._duration / 2, 1), cc.Show.create()), cc.Show.create(), cc.CallFunc.create(this.finish, this));
    b = cc.Sequence.create(cc.Spawn.create(cc.OrbitCamera.create(this._duration /
        2, 1, 0, 0, b, 45, 0), cc.ScaleTo.create(this._duration / 2, 0.5)), cc.Hide.create(), cc.DelayTime.create(this._duration / 2));
    this._inScene.setScale(0.5);
    this._inScene.runAction(a);
    this._outScene.runAction(b)
}});
cc.TransitionZoomFlipAngular.create = function (a, b, c) {
    null == c && (c = cc.TRANSITION_ORIENTATION_RIGHT_OVER);
    var d = new cc.TransitionZoomFlipAngular;
    d.initWithDuration(a, b, c);
    return d
};
cc.TransitionFade = cc.TransitionScene.extend({_color: new cc.Color3B, ctor: function () {
}, onEnter: function () {
    this._super();
    var a = cc.LayerColor.create(this._color);
    this._inScene.setVisible(!1);
    this.addChild(a, 2, cc.SCENE_FADE);
    var a = this.getChildByTag(cc.SCENE_FADE), b = cc.Sequence.create(cc.FadeIn.create(this._duration / 2), cc.CallFunc.create(this.hideOutShowIn, this), cc.FadeOut.create(this._duration / 2), cc.CallFunc.create(this.finish, this));
    a.runAction(b)
}, onExit: function () {
    this._super();
    this.removeChildByTag(cc.SCENE_FADE,
        !1)
}, initWithDuration: function (a, b, c) {
    if ("undefined" == c || null == c)c = cc.black();
    this._super(a, b) && (this._color.r = c.r, this._color.g = c.g, this._color.b = c.b, this._color.a = 0);
    return!0
}});
cc.TransitionFade.create = function (a, b, c) {
    var d = new cc.TransitionFade;
    d.initWithDuration(a, b, c);
    return d
};
cc.TransitionCrossFade = cc.TransitionScene.extend({onEnter: function () {
    this._super();
    var a = new cc.Color4B(0, 0, 0, 0), b = cc.Director.getInstance().getWinSize(), a = cc.LayerColor.create(a), c = cc.RenderTexture.create(b.width, b.height);
    if (null != c) {
        c.getSprite().setAnchorPoint(cc.p(0.5, 0.5));
        c.setPosition(cc.p(b.width / 2, b.height / 2));
        c.setAnchorPoint(cc.p(0.5, 0.5));
        c.begin();
        this._inScene.visit();
        c.end();
        var d = cc.RenderTexture.create(b.width, b.height);
        d.getSprite().setAnchorPoint(cc.p(0.5, 0.5));
        d.setPosition(cc.p(b.width /
            2, b.height / 2));
        d.setAnchorPoint(cc.p(0.5, 0.5));
        d.begin();
        this._outScene.visit();
        d.end();
        c.getSprite().setBlendFunc(gl.ONE, gl.ONE);
        d.getSprite().setBlendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        a.addChild(c);
        a.addChild(d);
        c.getSprite().setOpacity(255);
        d.getSprite().setOpacity(255);
        b = cc.Sequence.create(cc.FadeTo.create(this._duration, 0), cc.CallFunc.create(this.hideOutShowIn, this), cc.CallFunc.create(this.finish, this));
        d.getSprite().runAction(b);
        this.addChild(a, 2, cc.SCENE_FADE)
    }
}, onExit: function () {
    this.removeChildByTag(cc.SCENE_FADE,
        !1);
    this._super()
}, draw: function () {
}});
cc.TransitionCrossFade.create = function (a, b) {
    var c = new cc.TransitionCrossFade;
    c.initWithDuration(a, b);
    return c
};
cc.TransitionTurnOffTiles = cc.TransitionScene.extend({_sceneOrder: function () {
    this._isInSceneOnTop = !1
}, onEnter: function () {
    this._super();
    var a = cc.Director.getInstance().getWinSize(), a = this.easeActionWithAction(cc.TurnOffTiles.create(cc.g(12 * (a.width / a.height), 12), this._duration));
    this._outScene.runAction(cc.Sequence.create(a, cc.CallFunc.create(this.finish, this), cc.StopGrid.create()))
}, easeActionWithAction: function (a) {
    return a
}});
cc.TransitionTurnOffTiles.create = function (a, b) {
    var c = new cc.TransitionTurnOffTiles;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionSplitCols = cc.TransitionScene.extend({onEnter: function () {
    this._super();
    this._inScene.setVisible(!1);
    var a = this.action(), a = cc.Sequence.create(a, cc.CallFunc.create(this.hideOutShowIn, this), a.reverse());
    this.runAction(cc.Sequence.create(this.easeActionWithAction(a), cc.CallFunc.create(this.finish, this), cc.StopGrid.create()))
}, easeActionWithAction: function (a) {
    return cc.EaseInOut.create(a, 3)
}, action: function () {
    return cc.SplitCols.create(3, this._duration / 2)
}});
cc.TransitionSplitCols.create = function (a, b) {
    var c = new cc.TransitionSplitCols;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionSplitRows = cc.TransitionSplitCols.extend({action: function () {
    return cc.SplitRows.actionWithRows(3, this._duration / 2)
}});
cc.TransitionSplitRows.create = function (a, b) {
    var c = new cc.TransitionSplitRows;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionFadeTR = cc.TransitionScene.extend({_sceneOrder: function () {
    this._isInSceneOnTop = !1
}, onEnter: function () {
    this._super();
    var a = cc.Director.getInstance().getWinSize(), a = this.actionWithSize(cc.g(12 * (a.width / a.height), 12));
    this._outScene.runAction(cc.Sequence.create(this.easeActionWithAction(a), cc.CallFunc.create(this.finish, this), cc.StopGrid.create()))
}, easeActionWithAction: function (a) {
    return a
}, actionWithSize: function (a) {
    return cc.FadeOutTRTiles.create(a, this._duration)
}});
cc.TransitionFadeTR.create = function (a, b) {
    var c = new cc.TransitionFadeTR;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionFadeBL = cc.TransitionFadeTR.extend({actionWithSize: function (a) {
    return cc.FadeOutBLTiles.create(a, this._duration)
}});
cc.TransitionFadeBL.create = function (a, b) {
    var c = new cc.TransitionFadeBL;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionFadeUp = cc.TransitionFadeTR.extend({actionWithSize: function (a) {
    return cc.FadeOutUpTiles.create(a, this._duration)
}});
cc.TransitionFadeUp.create = function (a, b) {
    var c = new cc.TransitionFadeUp;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionFadeDown = cc.TransitionFadeTR.extend({actionWithSize: function (a) {
    return cc.FadeOutDownTiles.create(a, this._duration)
}});
cc.TransitionFadeDown.create = function (a, b) {
    var c = new cc.TransitionFadeDown;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.SCENE_RADIAL = 49153;
cc.TransitionProgress = cc.TransitionScene.extend({_to: 0, _from: 0, _sceneToBeModified: null, onEnter: function () {
    this._super();
    this._setupTransition();
    var a = cc.Director.getInstance().getWinSize(), b = cc.RenderTexture.create(a.width, a.height);
    b.getSprite().setAnchorPoint(cc.p(0.5, 0.5));
    b.setPosition(cc.p(a.width / 2, a.height / 2));
    b.setAnchorPoint(cc.p(0.5, 0.5));
    cc.renderContextType == cc.CANVAS ? (b.clear(), this._sceneToBeModified.visit(b.context)) : (b.clear(0, 0, 0, 1), b.begin(), this._sceneToBeModified.visit(), b.end());
    this._sceneToBeModified == this._outScene && this.hideOutShowIn();
    a = this._progressTimerNodeWithRenderTexture(b);
    b = cc.Sequence.create(cc.ProgressFromTo.create(this._duration, this._from, this._to), cc.CallFunc.create(this.finish, this));
    a.runAction(b);
    this.addChild(a, 2, cc.SCENE_RADIAL)
}, onExit: function () {
    this.removeChildByTag(cc.SCENE_RADIAL, !1);
    this._super()
}, _setupTransition: function () {
    this._sceneToBeModified = this._outScene;
    this._from = 100;
    this._to = 0
}, _progressTimerNodeWithRenderTexture: function () {
    cc.Assert(!1,
        "override me - abstract class");
    return null
}, _sceneOrder: function () {
    this._isInSceneOnTop = !1
}});
cc.TransitionProgress.create = function (a, b) {
    var c = new cc.TransitionProgress;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionProgressRadialCCW = cc.TransitionProgress.extend({_progressTimerNodeWithRenderTexture: function (a) {
    var b = cc.Director.getInstance().getWinSize(), a = cc.ProgressTimer.create(a.getSprite());
    cc.renderContextType == cc.WEBGL && a.getSprite().setFlipY(!0);
    a.setType(cc.PROGRESS_TIMER_TYPE_RADIAL);
    a.setReverseDirection(!1);
    a.setPercentage(100);
    a.setPosition(cc.p(b.width / 2, b.height / 2));
    a.setAnchorPoint(cc.p(0.5, 0.5));
    return a
}});
cc.TransitionProgressRadialCCW.create = function (a, b) {
    var c = new cc.TransitionProgressRadialCCW;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionProgressRadialCW = cc.TransitionProgress.extend({_progressTimerNodeWithRenderTexture: function (a) {
    var b = cc.Director.getInstance().getWinSize(), a = cc.ProgressTimer.create(a.getSprite());
    cc.renderContextType == cc.WEBGL && a.getSprite().setFlipY(!0);
    a.setType(cc.PROGRESS_TIMER_TYPE_RADIAL);
    a.setReverseDirection(!0);
    a.setPercentage(100);
    a.setPosition(cc.p(b.width / 2, b.height / 2));
    a.setAnchorPoint(cc.p(0.5, 0.5));
    return a
}});
cc.TransitionProgressRadialCW.create = function (a, b) {
    var c = new cc.TransitionProgressRadialCW;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionProgressHorizontal = cc.TransitionProgress.extend({_progressTimerNodeWithRenderTexture: function (a) {
    var b = cc.Director.getInstance().getWinSize(), a = cc.ProgressTimer.create(a.getSprite());
    cc.renderContextType == cc.WEBGL && a.getSprite().setFlipY(!0);
    a.setType(cc.PROGRESS_TIMER_TYPE_BAR);
    a.setMidpoint(cc.p(1, 0));
    a.setBarChangeRate(cc.p(1, 0));
    a.setPercentage(100);
    a.setPosition(cc.p(b.width / 2, b.height / 2));
    a.setAnchorPoint(cc.p(0.5, 0.5));
    return a
}});
cc.TransitionProgressHorizontal.create = function (a, b) {
    var c = new cc.TransitionProgressHorizontal;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionProgressVertical = cc.TransitionProgress.extend({_progressTimerNodeWithRenderTexture: function (a) {
    var b = cc.Director.getInstance().getWinSize(), a = cc.ProgressTimer.create(a.getSprite());
    cc.renderContextType == cc.WEBGL && a.getSprite().setFlipY(!0);
    a.setType(cc.PROGRESS_TIMER_TYPE_BAR);
    a.setMidpoint(cc.p(0, 0));
    a.setBarChangeRate(cc.p(0, 1));
    a.setPercentage(100);
    a.setPosition(cc.p(b.width / 2, b.height / 2));
    a.setAnchorPoint(cc.p(0.5, 0.5));
    return a
}});
cc.TransitionProgressVertical.create = function (a, b) {
    var c = new cc.TransitionProgressVertical;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionProgressInOut = cc.TransitionProgress.extend({_progressTimerNodeWithRenderTexture: function (a) {
    var b = cc.Director.getInstance().getWinSize(), a = cc.ProgressTimer.create(a.getSprite());
    cc.renderContextType == cc.WEBGL && a.getSprite().setFlipY(!0);
    a.setType(cc.PROGRESS_TIMER_TYPE_BAR);
    a.setMidpoint(cc.p(0.5, 0.5));
    a.setBarChangeRate(cc.p(1, 1));
    a.setPercentage(0);
    a.setPosition(cc.p(b.width / 2, b.height / 2));
    a.setAnchorPoint(cc.p(0.5, 0.5));
    return a
}, _sceneOrder: function () {
    this._isInSceneOnTop = !1
}, _setupTransition: function () {
    this._sceneToBeModified =
        this._inScene;
    this._from = 0;
    this._to = 100
}});
cc.TransitionProgressInOut.create = function (a, b) {
    var c = new cc.TransitionProgressInOut;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionProgressOutIn = cc.TransitionProgress.extend({_progressTimerNodeWithRenderTexture: function (a) {
    var b = cc.Director.getInstance().getWinSize(), a = cc.ProgressTimer.create(a.getSprite());
    cc.renderContextType == cc.WEBGL && a.getSprite().setFlipY(!0);
    a.setType(cc.PROGRESS_TIMER_TYPE_BAR);
    a.setMidpoint(cc.p(0.5, 0.5));
    a.setBarChangeRate(cc.p(1, 1));
    a.setPercentage(100);
    a.setPosition(cc.p(b.width / 2, b.height / 2));
    a.setAnchorPoint(cc.p(0.5, 0.5));
    return a
}});
cc.TransitionProgressOutIn.create = function (a, b) {
    var c = new cc.TransitionProgressOutIn;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionPageTurn = cc.TransitionScene.extend({_back: !0, initWithDuration: function (a, b, c) {
    this._back = c;
    this._super(a, b);
    return!0
}, actionWithSize: function (a) {
    return this._back ? cc.ReverseTime.create(this._super(a, this._duration)) : this._super(a, this._duration)
}, onEnter: function () {
    this._super();
    var a = cc.Director.getInstance().getWinSize(), b;
    a.width > a.height ? (a = 16, b = 12) : (a = 12, b = 16);
    a = this.actionWithSize(cc.g(a, b));
    this._back ? (this._inScene.setVisible(!1), this._inScene.runAction(cc.Sequence.create(cc.Show.create(),
        a, cc.CallFunc.create(cc.TransitionScene.finish, this), cc.StopGrid.create()))) : this._outScene.runAction(cc.Sequence.create(a, cc.CallFunc.create(cc.TransitionScene.finish, this), cc.StopGrid.create()))
}, _sceneOrder: function () {
    this.isInSceneOnTop = this._back
}});
cc.TransitionPageTurn.create = function (a, b, c) {
    var d = new cc.TransitionPageTurn;
    d.initWithDuration(a, b, c);
    return d
};
cc.SPRITE_INDEX_NOT_INITIALIZED = "0xffffffff";
cc.generateTextureCacheForColor = function (a) {
    var b = a.width, c = a.height, d = [], e = document.createElement("canvas");
    e.width = b;
    e.height = c;
    var f = e.getContext("2d");
    f.drawImage(a, 0, 0);
    e = document.createElement("canvas");
    e.width = b;
    e.height = c;
    for (var e = e.getContext("2d"), f = f.getImageData(0, 0, b, c).data, g = 0; 3 > g; g++) {
        var h = document.createElement("canvas");
        h.width = b;
        h.height = c;
        var k = h.getContext("2d");
        e.drawImage(a, 0, 0);
        for (var j = e.getImageData(0, 0, b, c), l = j.data, m = 0; m < f.length; m += 4)l[m] = 0 === g ? f[m] : 0, l[m + 1] = 1 === g ?
            f[m + 1] : 0, l[m + 2] = 2 === g ? f[m + 2] : 0, l[m + 3] = f[m + 3];
        k.putImageData(j, 0, 0);
        d.push(h)
    }
    return d
};
cc.generateTintImage2 = function (a, b, c) {
    c || (c = cc.rect(0, 0, a.width, a.height));
    var b = b instanceof cc.Color4F ? cc.c4b(255 * b.r, 255 * b.g, 255 * b.b, 255 * b.a) : cc.c4b(b.r, b.g, b.b, 50), d = document.createElement("canvas"), e = d.getContext("2d");
    d.width != c.size.width && (d.width = c.size.width);
    d.height != c.size.height && (d.height = c.size.height);
    e.save();
    e.drawImage(a, c.origin.x, c.origin.y, c.size.width, c.size.height, 0, 0, c.size.width, c.size.height);
    e.globalCompositeOperation = "source-in";
    e.globalAlpha = b.a / 255;
    e.fillStyle = "rgb(" +
        b.r + "," + b.g + "," + b.b + ")";
    e.fillRect(0, 0, c.size.width, c.size.height);
    e.restore();
    return d
};
cc.generateTintImage = function (a, b, c, d, e) {
    d || (d = cc.rect(0, 0, a.width, a.height));
    a = c instanceof cc.Color4F ? cc.c3b(255 * c.r, 255 * c.g, 255 * c.b) : c;
    e = e || document.createElement("canvas");
    e.width = d.size.width;
    e.height = d.size.height;
    c = e.getContext("2d");
    c.globalCompositeOperation = "lighter";
    0 < a.r && (c.globalAlpha = a.r / 255, c.drawImage(b[0], d.origin.x, d.origin.y, d.size.width, d.size.height, 0, 0, d.size.width, d.size.height));
    0 < a.g && (c.globalAlpha = a.g / 255, c.drawImage(b[1], d.origin.x, d.origin.y, d.size.width, d.size.height,
        0, 0, d.size.width, d.size.height));
    0 < a.b && (c.globalAlpha = a.b / 255, c.drawImage(b[2], d.origin.x, d.origin.y, d.size.width, d.size.height, 0, 0, d.size.width, d.size.height));
    return e
};
cc.cutRotateImageToCanvas = function (a, b) {
    if (!a)return null;
    if (!b)return a;
    var c = document.createElement("canvas");
    c.width = b.size.width;
    c.height = b.size.height;
    var d = c.getContext("2d");
    d.translate(c.width / 2, c.height / 2);
    d.rotate(-1.5707963267948966);
    d.drawImage(a, b.origin.x, b.origin.y, b.size.height, b.size.width, -b.size.height / 2, -b.size.width / 2, b.size.height, b.size.width);
    (new Image).src = c.toDataURL();
    return c
};
cc.TransformValues = function (a, b, c, d, e, f) {
    this.pos = a;
    this.scale = b;
    this.rotation = c;
    this.skew = d;
    this.ap = e;
    this.visible = f
};
cc.RENDER_IN_SUBPIXEL = function (a) {
    return cc.SPRITEBATCHNODE_RENDER_SUBPIXEL ? a : parseInt(a)
};
cc.Sprite = cc.Node.extend({RGBAProtocol: !0, _textureAtlas: null, _atlasIndex: 0, _batchNode: null, _dirty: null, _recursiveDirty: null, _hasChildren: null, _shouldBeHidden: !1, _transformToBatch: null, _blendFunc: {src: cc.BLEND_SRC, dst: cc.BLEND_DST}, _texture: null, _originalTexture: null, _color: null, _rect: cc.rect(0, 0, 0, 0), _rectRotated: null, _offsetPosition: cc.p(0, 0), _unflippedOffsetPositionFromCenter: cc.PointZero(), _quad: cc.V3F_C4B_T2F_QuadZero(), colorUnmodified: null, _opacityModifyRGB: null, _flipX: null, _flipY: null, _opacity: 255,
    ctor: function (a) {
        this._super();
        this._shouldBeHidden = !1;
        this._offsetPosition = cc.p(0, 0);
        this._unflippedOffsetPositionFromCenter = cc.p(0, 0);
        this._color = cc.white();
        if (a)if ("string" == typeof a)this.initWithSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame(a)); else if ("object" == typeof a)if (a instanceof cc.SpriteFrame)this.initWithSpriteFrame(a); else if (a instanceof cc.SpriteBatchNode) {
            if (1 < arguments.length) {
                var b = arguments[1];
                b instanceof cc.Rect && this.initWithBatchNode(a, b)
            }
        } else a instanceof
            HTMLImageElement || a instanceof HTMLCanvasElement ? this.initWithTexture(a) : a instanceof cc.Texture2D && this.initWithTexture(a)
    }, isDirty: function () {
        return this._dirty
    }, setDirty: function (a) {
        this._dirty = a
    }, getQuad: function () {
        return this._quad
    }, isTextureRectRotated: function () {
        return this._rectRotated
    }, getAtlasIndex: function () {
        return this._atlasIndex
    }, setAtlasIndex: function (a) {
        this._atlasIndex = a
    }, getTextureRect: function () {
        return cc.rect(this._rect.origin.x, this._rect.origin.y, this._rect.size.width, this._rect.size.height)
    },
    getTextureAtlas: function () {
        return this._textureAtlas
    }, setTextureAtlas: function (a) {
        this._textureAtlas = a
    }, getSpriteBatchNode: function () {
        return this._batchNode
    }, setSpriteBatchNode: function (a) {
        this._batchNode = a
    }, getOffsetPosition: function () {
        return cc.p(this._offsetPosition.x, this._offsetPosition.y)
    }, getBlendFunc: function () {
        return this._blendFunc
    }, _isLighterMode: !1, setBlendFunc: function (a, b) {
        this._isLighterMode = (this._blendFunc = 1 == arguments.length ? a : {src: a, dst: b}) && this._blendFunc.src == gl.SRC_ALPHA && this._blendFunc.dst ==
            gl.ONE
    }, init: function () {
        this._super();
        this._dirty = this._recursiveDirty = !1;
        this._opacityModifyRGB = !0;
        this._opacity = 255;
        this._color = cc.white();
        this._colorUnmodified = cc.white();
        this._blendFunc.src = cc.BLEND_SRC;
        this._blendFunc.dst = cc.BLEND_DST;
        this.setTexture(null);
        this._flipX = this._flipY = !1;
        this.setAnchorPoint(cc.p(0.5, 0.5));
        this._offsetPosition = cc.PointZero();
        this._hasChildren = !1;
        var a = new cc.Color4B(255, 255, 255, 255);
        this._quad.bl.colors = a;
        this._quad.br.colors = a;
        this._quad.tl.colors = a;
        this._quad.tr.colors =
            a;
        this.setTextureRect(cc.RectZero(), !1, cc.SizeZero());
        return!0
    }, initWithTexture: function (a, b, c) {
        if (0 == arguments.length)throw"Sprite.initWithTexture(): Argument must be non-nil ";
        c = c || !1;
        this._batchNode = null;
        this._recursiveDirty = !1;
        this.setDirty(!1);
        this._opacityModifyRGB = !0;
        this._opacity = 255;
        this._color = cc.white();
        this._colorUnmodified = cc.white();
        this._blendFunc.src = cc.BLEND_SRC;
        this._blendFunc.dst = cc.BLEND_DST;
        this._flipX = this._flipY = !1;
        this.setAnchorPoint(cc.p(0.5, 0.5));
        this._offsetPosition = cc.p(0,
            0);
        this._hasChildren = !1;
        var d = new cc.Color4B(255, 255, 255, 255);
        this._quad.bl.colors = d;
        this._quad.br.colors = d;
        this._quad.tl.colors = d;
        this._quad.tr.colors = d;
        if (!b)if (b = cc.rect(0, 0, 0, 0), a instanceof cc.Texture2D)b.size = a.getContentSize(); else if (a instanceof HTMLImageElement || a instanceof HTMLCanvasElement)b.size = cc.size(a.width, a.height);
        cc.renderContextType == cc.CANVAS && (this._originalTexture = a);
        this.setTexture(a);
        this.setTextureRect(b, c, b.size);
        this.setBatchNode(null);
        return!0
    }, initWithFile: function (a, b) {
        cc.Assert(null != a, "Sprite#initWithFile():Invalid filename for sprite");
        var c = this, d = cc.TextureCache.getInstance().textureForKey(a);
        if (d) {
            if (d) {
                if (!b)if (b = cc.rect(0, 0, 0, 0), d instanceof cc.Texture2D)b.size = d.getContentSize(); else if (d instanceof HTMLImageElement || d instanceof HTMLCanvasElement)b.size = cc.size(d.width, d.height);
                return this.initWithTexture(d, b)
            }
        } else {
            this._visible = !1;
            var e = new Image;
            e.addEventListener("load", function () {
                b || (b = cc.rect(0, 0, e.width, e.height));
                c.initWithTexture(e, b);
                cc.TextureCache.getInstance().cacheImage(a,
                    e);
                c._visible = !0
            });
            e.addEventListener("error", function () {
                cc.log("load failure:" + a)
            });
            e.src = a;
            return!0
        }
        return!1
    }, initWithSpriteFrame: function (a) {
        cc.Assert(null != a, "");
        var b = this.initWithTexture(a.getTexture(), a.getRect());
        this.setDisplayFrame(a);
        return b
    }, initWithSpriteFrameName: function (a) {
        cc.Assert(null != a, "");
        return this.initWithSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame(a))
    }, useBatchNode: function (a) {
        this._textureAtlas = a.getTextureAtlas();
        this._batchNode = a
    }, setTextureRect: function (a, b, c) {
        this._rectRotated = b || !1;
        c = c || a.size;
        this.setContentSize(c);
        this.setVertexRect(a);
        this._setTextureCoords(a);
        a = this._unflippedOffsetPositionFromCenter;
        this._offsetPosition.x = a.x + (this._contentSize.width - this._rect.size.width) / 2;
        this._offsetPosition.y = a.y + (this._contentSize.height - this._rect.size.height) / 2;
        if (this._batchNode)this._dirty = !0; else {
            var a = 0 + this._offsetPosition.x, b = 0 + this._offsetPosition.y, c = a + this._rect.size.width, d = b + this._rect.size.height;
            this._quad.bl.vertices = cc.vertex3(a, b, 0);
            this._quad.br.vertices = cc.vertex3(c, b, 0);
            this._quad.tl.vertices = cc.vertex3(a, d, 0);
            this._quad.tr.vertices = cc.vertex3(c, d, 0)
        }
    }, setVertexRect: function (a) {
        this._rect = a
    }, _setTextureCoords: function (a) {
        if (cc.renderContextType == cc.WEBGL) {
            var a = cc.RECT_POINTS_TO_PIXELS(a), b = this._batchNode ? this._textureAtlas.getTexture() : this._texture;
            if (b) {
                var c = b.getPixelsWide(), d = b.getPixelsHigh(), e;
                this._rectRotated ? (cc.FIX_ARTIFACTS_BY_STRECHING_TEXEL ? (b = (2 * a.origin.x + 1) / (2 * c), c = b + (2 * a.size.height - 2) / (2 * c), e = (2 * a.origin.y +
                    1) / (2 * d), a = e + (2 * a.size.width - 2) / (2 * d)) : (b = a.origin.x / c, c = (a.origin.x + a.size.height) / c, e = a.origin.y / d, a = (a.origin.y + a.size.width) / d), this._flipX && cc.SWAP(e, a), this._flipY && cc.SWAP(b, c), this._quad.bl.texCoords.u = b, this._quad.bl.texCoords.v = e, this._quad.br.texCoords.u = b, this._quad.br.texCoords.v = a, this._quad.tl.texCoords.u = c, this._quad.tl.texCoords.v = e, this._quad.tr.texCoords.u = c, this._quad.tr.texCoords.v = a) : (cc.FIX_ARTIFACTS_BY_STRECHING_TEXEL ? (b = (2 * a.origin.x + 1) / (2 * c), c = b + (2 * a.size.width - 2) / (2 * c),
                    e = (2 * a.origin.y + 1) / (2 * d), a = e + (2 * a.size.height - 2) / (2 * d)) : (b = a.origin.x / c, c = (a.origin.x + a.size.width) / c, e = a.origin.y / d, a = (a.origin.y + a.size.height) / d), this._flipX && cc.SWAP(b, c), this._flipY && cc.SWAP(e, a), this._quad.bl.texCoords.u = b, this._quad.bl.texCoords.v = a, this._quad.br.texCoords.u = c, this._quad.br.texCoords.v = a, this._quad.tl.texCoords.u = b, this._quad.tl.texCoords.v = e, this._quad.tr.texCoords.u = c, this._quad.tr.texCoords.v = e)
            }
        }
    }, updateTransform: function () {
        cc.Assert(this._batchNode, "updateTransform is only valid when cc.Sprite is being rendered using an cc.SpriteBatchNode");
        if (this.isDirty()) {
            if (!this._visible || this._parent && this._parent != this._batchNode && this._parent._shouldBeHidden)this._quad.br.vertices = this._quad.tl.vertices = this._quad.tr.vertices = this._quad.bl.vertices = cc.vertex3(0, 0, 0), this._shouldBeHidden = !0; else {
                this._shouldBeHidden = !1;
                !this._parent || this._parent == this._batchNode ? this._transformToBatch = this.nodeToParentTransform() : (cc.Assert(this._parent instanceof cc.Sprite, "Logic error in CCSprite. Parent must be a CCSprite"), this._transformToBatch = cc.AffineTransformConcat(this.nodeToParentTransform(),
                    this._parent._transformToBatch));
                var a = this._rect.size, b = this._offsetPosition.x, c = this._offsetPosition.y, d = b + a.width, e = c + a.height, a = this._transformToBatch.tx, f = this._transformToBatch.ty, g = this._transformToBatch.a, h = this._transformToBatch.b, k = this._transformToBatch.d, j = -this._transformToBatch.c, l = b * h + c * k + f, m = d * g - c * j + a, n = d * h + c * k + f, o = d * g - e * j + a, d = d * h + e * k + f, p = b * g - e * j + a, e = b * h + e * k + f;
                this._quad.bl.vertices = cc.vertex3(cc.RENDER_IN_SUBPIXEL(b * g - c * j + a), cc.RENDER_IN_SUBPIXEL(l), this._vertexZ);
                this._quad.br.vertices =
                    cc.vertex3(cc.RENDER_IN_SUBPIXEL(m), cc.RENDER_IN_SUBPIXEL(n), this._vertexZ);
                this._quad.tl.vertices = cc.vertex3(cc.RENDER_IN_SUBPIXEL(p), cc.RENDER_IN_SUBPIXEL(e), this._vertexZ);
                this._quad.tr.vertices = cc.vertex3(cc.RENDER_IN_SUBPIXEL(o), cc.RENDER_IN_SUBPIXEL(d), this._vertexZ)
            }
            this._textureAtlas.updateQuad(this._quad, this._atlasIndex);
            this._recursiveDirty = !1;
            this.setDirty(!1)
        }
        this._hasChildren && this._arrayMakeObjectsPerformSelector(this._children, cc.Node.StateCallbackType.updateTransform);
        cc.SPRITE_DEBUG_DRAW &&
        (b = [cc.p(this._quad.bl.vertices.x, this._quad.bl.vertices.y), cc.p(this._quad.br.vertices.x, this._quad.br.vertices.y), cc.p(this._quad.tr.vertices.x, this._quad.tr.vertices.y), cc.p(this._quad.tl.vertices.x, this._quad.tl.vertices.y)], cc.drawingUtil.drawPoly(b, 4, !0))
    }, _getTransformValues: function (a) {
        a.pos = this._position;
        a.scale.x = this._scaleX;
        a.scale.y = this._scaleY;
        a.rotation = this._rotation;
        a.skew.x = this._skewX;
        a.skew.y = this._skewY;
        a.ap = this._anchorPointInPoints;
        a.visible = this._visible;
        return a
    }, draw: function (a) {
        a =
            a || cc.renderContext;
        this._isLighterMode && (a.globalCompositeOperation = "lighter");
        a.globalAlpha = this._opacity / 255;
        var b = 0, c = 0;
        this._flipX && (b = 0 | this._contentSize.width / 2 - this._anchorPointInPoints.x, a.translate(b, 0), a.scale(-1, 1));
        this._flipY && (c = -(0 | this._contentSize.height / 2 - this._anchorPointInPoints.y), a.translate(0, c), a.scale(1, -1));
        b = 0 | -this._anchorPointInPoints.x - b + this._offsetPosition.x;
        c = 0 | -this._anchorPointInPoints.y + c + this._offsetPosition.y;
        this._texture ? this._texture instanceof HTMLImageElement ?
            0 == this._contentSize.width && 0 == this._contentSize.height ? (this.setContentSize(cc.size(this._texture.width, this._texture.height)), this._rect.size.width = this._texture.width, this._rect.size.height = this._texture.height, a.drawImage(this._texture, b, -(c + this._texture.height))) : a.drawImage(this._texture, this._rect.origin.x, this._rect.origin.y, this._rect.size.width, this._rect.size.height, b, -(c + this._rect.size.height), this._rect.size.width, this._rect.size.height) : 0 == this._contentSize.width && 0 == this._contentSize.height ?
            (this.setContentSize(cc.size(this._texture.width, this._texture.height)), this._rect.size.width = this._texture.width, this._rect.size.height = this._texture.height, a.drawImage(this._texture, b, -(c + this._texture.height))) : a.drawImage(this._texture, 0, 0, this._rect.size.width, this._rect.size.height, b, -(c + this._rect.size.height), this._rect.size.width, this._rect.size.height) : (a.fillStyle = "rgba(" + this._color.r + "," + this._color.g + "," + this._color.b + ",1)", a.fillRect(b, c, this._contentSize.width, this._contentSize.height));
        1 == cc.SPRITE_DEBUG_DRAW ? (a.strokeStyle = "rgba(0,255,0,1)", a = [cc.p(b, c), cc.p(b + this._rect.size.width, c), cc.p(b + this._rect.size.width, c + this._rect.size.height), cc.p(b, c + this._rect.size.height)], cc.drawingUtil.drawPoly(a, 4, !0)) : 2 == cc.SPRITE_DEBUG_DRAW && (a.strokeStyle = "rgba(0,255,0,1)", a = this._rect.size, c = this.getOffsetPosition(), a = [cc.p(c.x, c.y), cc.p(c.x + a.width, c.y), cc.p(c.x + a.width, c.y + a.height), cc.p(c.x, c.y + a.height)], cc.drawingUtil.drawPoly(a, 4, !0));
        cc.g_NumberOfDraws++
    }, _drawForWebGL: function () {
        cc.Assert(!this._batchNode,
            "If cc.Sprite is being rendered by cc.SpriteBatchNode, cc.Sprite#draw SHOULD NOT be called");
        cc.NODE_DRAW_SETUP(this);
        if (1 == cc.SPRITE_DEBUG_DRAW) {
            var a = [cc.p(this._quad.tl.vertices.x, this._quad.tl.vertices.y), cc.p(this._quad.bl.vertices.x, this._quad.bl.vertices.y), cc.p(this._quad.br.vertices.x, this._quad.br.vertices.y), cc.p(this._quad.tr.vertices.x, this._quad.tr.vertices.y)];
            cc.drawingUtil.drawPoly(a, 4, !0)
        } else if (2 == cc.SPRITE_DEBUG_DRAW) {
            var a = this.getTextureRect().size, b = this.getOffsetPosition(),
                a = [cc.p(b.x, b.y), cc.p(b.x + a.width, b.y), cc.p(b.x + a.width, b.y + a.height), cc.p(b.x, b.y + a.height)];
            cc.drawingUtil.drawPoly(a, 4, !0)
        }
        cc.g_NumberOfDraws++
    }, addChild: function (a, b, c) {
        switch (arguments.length) {
            case 1:
                this._super(a);
                break;
            case 2:
                this._super(a, b);
                break;
            case 3:
                cc.Assert(null != a, "Argument must be non-NULL");
                cc.renderContextType == cc.WEBGL && this._batchNode && (cc.Assert(a instanceof cc.Sprite, "cc.Sprite only supports cc.Sprites as children when using cc.SpriteBatchNode"), cc.Assert(a.getTexture().getName() ==
                    this._textureAtlas.getTexture().getName(), ""), this._batchNode.appendChild(a), this._reorderChildDirty || this._setReorderChildDirtyRecursively());
                this._super(a, b, c);
                this._hasChildren = !0;
                break;
            default:
                throw"Sprite.addChild():Argument must be non-nil ";
        }
    }, sortAllChildren: function () {
        if (this._reorderChildDirty) {
            for (var a, b = null, c = 1; c < this._children.length; c++) {
                b = this._children[c];
                for (a = c - 1; 0 <= a && (b.getZOrder() < this._children[a].getZOrder() || b.getZOrder() == this._children[a].getZOrder() && b.getOrderOfArrival() <
                    this._children[a].getOrderOfArrival());)this._children[a + 1] = this._children[a], a -= 1;
                this._children[a + 1] = b
            }
            this._batchNode && this._arrayMakeObjectsPerformSelector(this._children, cc.Node.StateCallbackType.sortAllChildren);
            this._reorderChildDirty = !1
        }
    }, reorderChild: function (a, b) {
        cc.Assert(null != a, "child is null");
        cc.Assert(-1 < this._children.indexOf(a), "this child is not in children list");
        b != a.getZOrder() && (this._batchNode && this._reorderChildDirty && (this._setReorderChildDirtyRecursively(), this._batchNode.reorderBatch(!0)),
            this._super(a, b))
    }, removeChild: function (a, b) {
        this._batchNode && this._batchNode.removeSpriteFromAtlas(a);
        this._super(a, b)
    }, removeAllChildren: function (a) {
        if (this._batchNode && null != this._children)for (var b = 0; b < this._children.length; b++)this._children[b]instanceof cc.Sprite && this._batchNode.removeSpriteFromAtlas(this._children[b]);
        this._super(a);
        this._hasChildren = !1
    }, setDirtyRecursively: function (a) {
        this._recursiveDirty = a;
        this.setDirty(a);
        if (null != this._children)for (a = 0; a < this._children.length; a++)this._children[a]instanceof
            cc.Sprite && this._children[a].setDirtyRecursively(!0)
    }, SET_DIRTY_RECURSIVELY: function () {
        this._batchNode && !this._recursiveDirty && (this._dirty = this._recursiveDirty = !0, this._hasChildren && this.setDirtyRecursively(!0))
    }, setPosition: function (a) {
        2 <= arguments.length ? cc.Node.prototype.setPosition.call(this, a, arguments[1]) : cc.Node.prototype.setPosition.call(this, a);
        this.SET_DIRTY_RECURSIVELY()
    }, setRotation: function (a) {
        cc.Node.prototype.setRotation.call(this, a);
        this.SET_DIRTY_RECURSIVELY()
    }, setSkewX: function (a) {
        cc.Node.prototype.setSkewX.call(this,
            a);
        this.SET_DIRTY_RECURSIVELY()
    }, setSkewY: function (a) {
        cc.Node.prototype.setSkewY.call(this, a);
        this.SET_DIRTY_RECURSIVELY()
    }, setScaleX: function (a) {
        cc.Node.prototype.setScaleX.call(this, a);
        this.SET_DIRTY_RECURSIVELY()
    }, setScaleY: function (a) {
        cc.Node.prototype.setScaleY.call(this, a);
        this.SET_DIRTY_RECURSIVELY()
    }, setScale: function (a, b) {
        cc.Node.prototype.setScale.call(this, a, b);
        this.SET_DIRTY_RECURSIVELY()
    }, setVertexZ: function (a) {
        cc.Node.prototype.setVertexZ.call(this, a);
        this.SET_DIRTY_RECURSIVELY()
    }, setAnchorPoint: function (a) {
        cc.Node.prototype.setAnchorPoint.call(this,
            a);
        this.SET_DIRTY_RECURSIVELY()
    }, setVisible: function (a) {
        cc.Node.prototype.setVisible.call(this, a);
        this.SET_DIRTY_RECURSIVELY()
    }, ignoreAnchorPointForPosition: function (a) {
        cc.Assert(!this._batchNode, "ignoreAnchorPointForPosition is invalid in cc.Sprite");
        this._super(a)
    }, setFlipX: function (a) {
        this._flipX != a && (this._flipX = a, this.setTextureRect(this._rect, this._rectRotated, this._contentSize), this.setNodeDirty())
    }, setFlipY: function (a) {
        this._flipY != a && (this._flipY = a, this.setNodeDirty())
    }, isFlippedX: function () {
        return this._flipX
    },
    isFlippedY: function () {
        return this._flipY
    }, updateColor: function () {
        var a = new cc.Color4B(this._color.r, this._color.g, this._color.b, this._opacity);
        this._quad.bl.colors = a;
        this._quad.br.colors = a;
        this._quad.tl.colors = a;
        this._quad.tr.colors = a;
        this._batchNode && (this._atlasIndex != cc.SPRITE_INDEX_NOT_INITIALIZED ? this._textureAtlas.updateQuad(this._quad, this._atlasIndex) : this._dirty = !0)
    }, getOpacity: function () {
        return this._opacity
    }, setOpacity: function (a) {
        this._opacity = a;
        this.setNodeDirty()
    }, getColor: function () {
        return this._opacityModifyRGB ?
            new cc.Color3B(this._colorUnmodified) : new cc.Color3B(this._color)
    }, setColor: function (a) {
        this._color.r == a.r && this._color.g == a.g && this._color.b == a.b || (this._color = this._colorUnmodified = new cc.Color3B(a.r, a.g, a.b), this._changeTextureColor(), this.updateColor(), this.setNodeDirty())
    }, _changeTextureColor: function () {
        if (this.getTexture() && cc.renderContextType === cc.CANVAS) {
            var a = cc.TextureCache.getInstance().getTextureColors(this._originalTexture);
            a && (this._texture instanceof HTMLCanvasElement && !this._rectRotated ?
                cc.generateTintImage(this.getTexture(), a, this._color, this.getTextureRect(), this._texture) : this.setTexture(cc.generateTintImage(this.getTexture(), a, this._color, this.getTextureRect())))
        }
    }, setOpacityModifyRGB: function (a) {
        var b = this._color;
        this._opacityModifyRGB = a;
        this._color = b
    }, isOpacityModifyRGB: function () {
        return this._opacityModifyRGB
    }, setDisplayFrame: function (a) {
        this.setNodeDirty();
        this._unflippedOffsetPositionFromCenter = a.getOffset();
        var b = a.getTexture();
        b != this._texture && this.setTexture(b);
        if (this._rectRotated =
            a.isRotated())this._originalTexture = b;
        this.setTextureRect(a.getRect(), this._rectRotated, a.getOriginalSize());
        (255 !== this._color.r || 255 !== this._color.g || 255 !== this._color.b) && this._changeTextureColor()
    }, setDisplayFrameWithAnimationName: function (a, b) {
        cc.Assert(a, "cc.Sprite#setDisplayFrameWithAnimationName. animationName must not be null");
        var c = cc.AnimationCache.getInstance().getAnimation(a);
        cc.Assert(c, "cc.Sprite#setDisplayFrameWithAnimationName: Frame not found");
        c = c.getFrames()[b];
        cc.Assert(c, "cc.Sprite#setDisplayFrame. Invalid frame");
        this.setDisplayFrame(c.getSpriteFrame())
    }, isFrameDisplayed: function (a) {
        return cc.renderContextType == cc.CANVAS ? a.getTexture() != this._texture ? !1 : cc.Rect.CCRectEqualToRect(a.getRect(), this._rect) : cc.Rect.CCRectEqualToRect(a.getRect(), this._rect) && a.getTexture().getName() == this._texture.getName() && cc.Point.CCPointEqualToPoint(a.getOffset(), this._unflippedOffsetPositionFromCenter)
    }, displayFrame: function () {
        return cc.renderContextType == cc.CANVAS ? cc.SpriteFrame._frameWithTextureForCanvas(this._texture, cc.RECT_POINTS_TO_PIXELS(this._rect),
            this._rectRotated, this._unflippedOffsetPositionFromCenter, cc.SIZE_POINTS_TO_PIXELS(this._contentSize)) : cc.SpriteFrame.createWithTexture(this._texture, cc.RECT_POINTS_TO_PIXELS(this._rect), this._rectRotated, this._unflippedOffsetPositionFromCenter, cc.SIZE_POINTS_TO_PIXELS(this._contentSize))
    }, getBatchNode: function () {
        return this._batchNode
    }, setBatchNode: function (a) {
        if (this._batchNode = a)this._transformToBatch = cc.AffineTransformIdentity(), this.setTextureAtlas(this._batchNode.getTextureAtlas()); else {
            this._atlasIndex =
                cc.SPRITE_INDEX_NOT_INITIALIZED;
            this.setTextureAtlas(null);
            this._recursiveDirty = !1;
            this.setDirty(!1);
            var a = this._offsetPosition.x, b = this._offsetPosition.y, c = a + this._rect.size.width, d = b + this._rect.size.height;
            this._quad.bl.vertices = cc.vertex3(a, b, 0);
            this._quad.br.vertices = cc.vertex3(c, b, 0);
            this._quad.tl.vertices = cc.vertex3(a, d, 0);
            this._quad.tr.vertices = cc.vertex3(c, d, 0)
        }
    }, _updateBlendFunc: function () {
        cc.renderContextType == cc.WEBGL && (cc.Assert(!this._batchNode, "cc.Sprite: _updateBlendFunc doesn't work when the sprite is rendered using a cc.SpriteSheet"),
            !this._texture || !this._texture.hasPremultipliedAlpha() ? (this._blendFunc.src = gl.SRC_ALPHA, this._blendFunc.dst = gl.ONE_MINUS_SRC_ALPHA, this.setOpacityModifyRGB(!1)) : (this._blendFunc.src = cc.BLEND_SRC, this._blendFunc.dst = cc.BLEND_DST, this.setOpacityModifyRGB(!0)))
    }, _setReorderChildDirtyRecursively: function () {
        if (!this._reorderChildDirty) {
            this._reorderChildDirty = !0;
            for (var a = this._parent; a && a != this._batchNode;)a._setReorderChildDirtyRecursively(), a = a.getParent()
        }
    }, setTexture: function (a) {
        cc.Assert(!a || a instanceof
            cc.Texture2D || a instanceof HTMLImageElement || a instanceof HTMLCanvasElement, "setTexture expects a CCTexture2D. Invalid argument");
        if (cc.renderContextType != cc.CANVAS)cc.Assert(!this._batchNode, "cc.Sprite: Batched sprites should use the same texture as the batchnode"), !this._batchNode && this._texture != a && (this._texture = a, this._updateBlendFunc()); else if (this._texture != a)if (a instanceof HTMLImageElement) {
            if (!this._rect || cc.rectEqualToRect(this._rect, cc.RectZero()))this._rect = cc.rect(0, 0, a.width, a.height);
            this._originalTexture = this._texture = a
        } else this._texture = a, this._updateBlendFunc()
    }, getTexture: function () {
        return this._texture
    }});
cc.Sprite.createWithTexture = function (a, b, c) {
    var d = arguments.length, e = new cc.Sprite;
    switch (d) {
        case 1:
            return e && e.initWithTexture(a) ? e : null;
        case 2:
            return e && e.initWithTexture(a, b) ? e : null;
        case 3:
            return cc.Assert(0, ""), null;
        default:
            throw"Sprite.createWithTexture(): Argument must be non-nil ";
    }
};
cc.Sprite.create = function (a, b) {
    var c = arguments.length, d = new cc.Sprite;
    return 0 === c ? d.init() ? d : null : 2 > c ? d && d.initWithFile(a) ? d : null : d && d.initWithFile(a, b) ? d : null
};
cc.Sprite.createWithSpriteFrameName = function (a) {
    var b = null;
    if ("string" == typeof a) {
        if (b = cc.SpriteFrameCache.getInstance().getSpriteFrame(a), !b)return cc.log("Invalid spriteFrameName: " + a), null
    } else return cc.log("Invalid argument. Expecting string."), null;
    return(a = new cc.Sprite) && a.initWithSpriteFrame(b) ? a : null
};
cc.Sprite.createWithSpriteFrame = function (a) {
    var b = new cc.Sprite;
    return b && b.initWithSpriteFrame(a) ? b : null
};
cc.DEFAULT_SPRITE_BATCH_CAPACITY = 29;
cc.SpriteBatchNode = cc.Node.extend({_textureAtlas: new cc.TextureAtlas, _blendFunc: new cc.BlendFunc(0, 0), _descendants: [], _renderTexture: null, _isUseCache: !1, _originalTexture: null, ctor: function (a) {
    this._super();
    a && this.init(a, cc.DEFAULT_SPRITE_BATCH_CAPACITY);
    this._renderTexture = cc.RenderTexture.create(cc.canvas.width, cc.canvas.height);
    this.setContentSize(cc.size(cc.canvas.width, cc.canvas.height))
}, setContentSize: function (a) {
    a && (this._super(a), this._renderTexture.setContentSize(a))
}, _updateBlendFunc: function () {
    this._textureAtlas.getTexture().hasPremultipliedAlpha() ||
    (this._blendFunc.src = gl.SRC_ALPHA, this._blendFunc.dst = gl.ONE_MINUS_SRC_ALPHA)
}, _updateAtlasIndex: function (a, b) {
    var c = 0, d = a.getChildren();
    d && (c = d.length);
    var e = 0;
    if (0 == c)e = a.getAtlasIndex(), a.setAtlasIndex(b), a.setOrderOfArrival(0), e != b && this._swap(e, b), b++; else {
        e = !0;
        0 <= d[0].getZOrder() && (e = a.getAtlasIndex(), a.setAtlasIndex(b), a.setOrderOfArrival(0), e != b && this._swap(e, b), b++, e = !1);
        for (c = 0; c < d.length; c++) {
            var f = d[c];
            e && 0 <= f.getZOrder() && (e = a.getAtlasIndex(), a.setAtlasIndex(b), a.setOrderOfArrival(0),
                e != b && this._swap(e, b), b++, e = !1);
            this._updateAtlasIndex(f, b)
        }
        e && (e = a.getAtlasIndex(), a.setAtlasIndex(b), a.setOrderOfArrival(0), e != b && this._swap(e, b), b++)
    }
    return b
}, _swap: function (a, b) {
    var c = this._textureAtlas.getQuads(), d = this._descendants[a], e = c[a];
    this._descendants[b].setAtlasIndex(a);
    this._descendants[a] = this._descendants[b];
    c[a] = c[b];
    this._descendants[b] = d;
    c[b] = e
}, addQuadFromSprite: function (a, b) {
    cc.Assert(null != a, "SpriteBatchNode.addQuadFromSprite():Argument must be non-nil");
    cc.Assert(a instanceof
        cc.Sprite, "cc.SpriteBatchNode only supports cc.Sprites as children");
    a.setBatchNode(this);
    a.setAtlasIndex(b);
    this._textureAtlas.insertQuad(a.getQuad(), b);
    a.setDirty(!0);
    a.updateTransform();
    cc.renderContextType == cc.CANVAS && (this._children = cc.ArrayAppendObjectToIndex(this._children, a, b))
}, addSpriteWithoutQuad: function (a, b, c) {
    cc.Assert(null != a, "SpriteBatchNode.addQuadFromSprite():Argument must be non-nil");
    cc.Assert(a instanceof cc.Sprite, "cc.SpriteBatchNode only supports cc.Sprites as children");
    a.setAtlasIndex(b);
    var d = 0;
    if (this._descendants && 0 < this._descendants.length)for (var e = null, f = 0; f < this._descendants.length; f++)(e = this._descendants[f]) && e.getAtlasIndex() >= b && ++d;
    this._descendants = cc.ArrayAppendObjectToIndex(this._descendants, a, d);
    this.addChild(a, b, c);
    this.reorderBatch(!1);
    return this
}, getTextureAtlas: function () {
    return this._textureAtlas
}, setTextureAtlas: function (a) {
    a != this._textureAtlas && (this._textureAtlas = a)
}, getDescendants: function () {
    return this._descendants
}, initWithTexture: function (a, b) {
    this._children =
        [];
    this._descendants = [];
    this._blendFunc.src = cc.BLEND_SRC;
    this._blendFunc.dst = cc.BLEND_DST;
    this._textureAtlas = new cc.TextureAtlas;
    b = b || cc.DEFAULT_SPRITE_BATCH_CAPACITY;
    this._textureAtlas.initWithTexture(a, b);
    cc.renderContextType == cc.CANVAS && (this._originalTexture = a);
    cc.renderContextType == cc.WEBGL && this._updateBlendFunc();
    return!0
}, setNodeDirty: function () {
    this._setNodeDirtyForCache();
    this._transformDirty = this._inverseDirty = !0;
    cc.NODE_TRANSFORM_USING_AFFINE_MATRIX && (this._transformGLDirty = !0)
}, _setNodeDirtyForCache: function () {
    this._cacheDirty = !0
}, init: function (a, b) {
    var c = cc.TextureCache.getInstance().textureForKey(a);
    c || (c = cc.TextureCache.getInstance().addImage(a));
    return this.initWithTexture(c, b)
}, increaseAtlasCapacity: function () {
    var a = 4 * (this._textureAtlas.getCapacity() + 1) / 3;
    cc.log("cocos2d: CCSpriteBatchNode: resizing TextureAtlas capacity from " + this._textureAtlas.getCapacity() + " to [" + a + "].");
    this._textureAtlas.resizeCapacity(a) || (cc.log("cocos2d: WARNING: Not enough memory to resize the atlas"), cc.Assert(!1, "Not enough memory to resize the atla"))
},
    removeChildAtIndex: function (a, b) {
        this.removeChild(this._children[a], b)
    }, insertChild: function (a, b) {
        a.setBatchNode(this);
        a.setAtlasIndex(b);
        a.setDirty(!0);
        this._textureAtlas.getTotalQuads() == this._textureAtlas.getCapacity() && this.increaseAtlasCapacity();
        this._textureAtlas.insertQuad(a.getQuad(), b);
        this._descendants = cc.ArrayAppendObjectToIndex(this._descendants, a, b);
        var c = b + 1;
        if (this._descendants && 0 < this._descendants.length)for (; c < this._descendants.length; c++)this._descendants[c].setAtlasIndex(this._descendants[c].getAtlasIndex() +
            1);
        var d = a.getChildren();
        if (d && 0 < d.length)for (c = 0; c < d.length; c++)if (d[c]) {
            var e = this.atlasIndexForChild(d[c], d[c].getZOrder());
            this.insertChild(d[c], e)
        }
    }, appendChild: function (a) {
        this._reorderChildDirty = !0;
        a.setBatchNode(this);
        a.setDirty(!0);
        this._textureAtlas.getTotalQuads() == this._textureAtlas.getCapacity() && this.increaseAtlasCapacity();
        cc.ArrayAppendObject(this._descendants, a);
        var b = this._descendants.length - 1;
        a.setAtlasIndex(b);
        this._textureAtlas.insertQuad(a.getQuad(), b);
        a = a.getChildren();
        for (b =
                 0; b < a.length; b++)this.appendChild(a[b])
    }, removeSpriteFromAtlas: function (a) {
        this._textureAtlas.removeQuadAtIndex(a.getAtlasIndex());
        a.setBatchNode(null);
        var b = cc.ArrayGetIndexOfObject(this._descendants, a);
        if (-1 != b) {
            cc.ArrayRemoveObjectAtIndex(this._descendants, b);
            for (var c = this._descendants.length; b < c; ++b) {
                var d = this._descendants[b];
                d.setAtlasIndex(d.getAtlasIndex() - 1)
            }
        }
        if ((a = a.getChildren()) && 0 < a.length)for (b = 0; b < a.length; b++)a[b] && this.removeSpriteFromAtlas(a[b])
    }, rebuildIndexInOrder: function (a, b) {
        var c = a.getChildren();
        if (c && 0 < c.length)for (var d = 0; d < c.length; d++) {
            var e = c[d];
            e && 0 > e.getZOrder() && (b = this.rebuildIndexInOrder(e, b))
        }
        a.isEqual(this) || (a.setAtlasIndex(b), b++);
        if (c && 0 < c.length)for (d = 0; d < c.length; d++)(e = c[d]) && 0 <= e.getZOrder() && (b = this.rebuildIndexInOrder(e, b));
        return b
    }, highestAtlasIndexInChild: function (a) {
        var b = a.getChildren();
        return!b || 0 == b.length ? a.getAtlasIndex() : this.highestAtlasIndexInChild(b.pop())
    }, lowestAtlasIndexInChild: function (a) {
        var b = a.getChildren();
        return!b || 0 == b.length ?
            a.getAtlasIndex() : this.lowestAtlasIndexInChild(b.pop())
    }, atlasIndexForChild: function (a, b) {
        var c = a.getParent().getChildren(), d = cc.ArrayGetIndexOfObject(c, a), e = a.getParent() == this, f = null;
        0 < d && d < cc.UINT_MAX && (f = c[d - 1]);
        if (e)return 0 == d ? 0 : this.highestAtlasIndexInChild(f) + 1;
        if (0 == d)return c = a.getParent(), 0 > b ? c.getAtlasIndex() : c.getAtlasIndex() + 1;
        if (0 > f.getZOrder() && 0 > b || 0 <= f.getZOrder() && 0 <= b)return this.highestAtlasIndexInChild(f) + 1;
        c = a.getParent();
        return c.getAtlasIndex() + 1
    }, reorderBatch: function (a) {
        this._reorderChildDirty =
            a
    }, getTexture: function () {
        return this._textureAtlas.getTexture()
    }, setTexture: function (a) {
        this._textureAtlas.setTexture(a);
        for (var b = 0; b < this._children.length; b++)this._children[b].setTexture(a)
    }, setBlendFunc: function (a, b) {
        this._blendFunc = 1 == arguments.length ? a : {src: a, dst: b}
    }, getBlendFunc: function () {
        return this._blendFunc
    }, visit: function (a) {
        if (cc.renderContextType == cc.CANVAS) {
            var b = a || cc.renderContext;
            if (this._visible) {
                b.save();
                this.transform(a);
                var c;
                if (this._isUseCache) {
                    if (this._cacheDirty) {
                        this._renderTexture.clear();
                        this._renderTexture.context.save();
                        this._renderTexture.context.translate(this._anchorPointInPoints.x, -this._anchorPointInPoints.y);
                        if (this._children) {
                            this.sortAllChildren();
                            for (c = 0; c < this._children.length; c++)this._children[c] && this._children[c].visit(this._renderTexture.context)
                        }
                        this._renderTexture.context.restore();
                        this._cacheDirty = !1
                    }
                    this.draw(a)
                } else if (this._children) {
                    this.sortAllChildren();
                    for (c = 0; c < this._children.length; c++)this._children[c] && this._children[c].visit(b)
                }
                b.restore()
            }
        } else this._visible &&
        (this._grid && this._grid.isActive() && (this._grid.beforeDraw(), this.transformAncestors()), this.sortAllChildren(), this.transform(), this.draw(), this._grid && this._grid.isActive() && this._grid.afterDraw(this), this.setOrderOfArrival(0))
    }, addChild: function (a, b, c) {
        switch (arguments.length) {
            case 1:
                this._super(a);
                break;
            case 2:
                this._super(a, b);
                break;
            case 3:
                cc.Assert(null != a, "SpriteBatchNode.addChild():child should not be null");
                cc.Assert(a instanceof cc.Sprite, "cc.SpriteBatchNode only supports cc.Sprites as children");
                cc.renderContextType != cc.CANVAS && cc.Assert(a.getTexture().getName() == this._textureAtlas.getTexture().getName(), "SpriteBatchNode.addChild():check cc.Sprite is using the same texture id");
                this._super(a, b, c);
                this.appendChild(a);
                break;
            case 4:
                arguments[3] && this._super(a, b, c);
                break;
            default:
                throw"Argument must be non-nil ";
        }
        this.setNodeDirty()
    }, reorderChild: function (a, b) {
        cc.Assert(null != a, "SpriteBatchNode.addChild():the child should not be null");
        cc.Assert(-1 < this._children.indexOf(a), "SpriteBatchNode.addChild():Child doesn't belong to Sprite");
        b != a.getZOrder() && (this._super(a, b), this.setNodeDirty())
    }, removeChild: function (a, b) {
        null != a && (cc.Assert(-1 < this._children.indexOf(a), "SpriteBatchNode.addChild():sprite batch node should contain the child"), this.removeSpriteFromAtlas(a), this._super(a, b))
    }, removeAllChildren: function (a) {
        var b;
        if (this._descendants && 0 < this._descendants.length)for (b = 0; b < this._descendants.length; b++)this._descendants[b] && this._descendants[b].setBatchNode(null);
        this._super(a);
        this._descendants = [];
        this._textureAtlas.removeAllQuads()
    },
    sortAllChildren: function () {
        if (this._reorderChildDirty) {
            for (var a = 0, b = 0, c = this._children.length, a = 1; a < c; a++) {
                for (var d = this._children[a], b = a - 1; 0 <= b && (d.getZOrder() < this._children[b].getZOrder() || d.getZOrder() == this._children[b].getZOrder() && d.getOrderOfArrival() < this._children[b].getOrderOfArrival());)this._children[b + 1] = this._children[b], b--;
                this._children[b + 1] = d
            }
            if (0 < this._children.length && (this._arrayMakeObjectsPerformSelector(this._children, cc.Node.StateCallbackType.sortAllChildren), b = 0, cc.renderContextType ==
                cc.WEBGL))for (a = 0; a < this._children.length; a++)b = this._updateAtlasIndex(this._children[a], b);
            this._reorderChildDirty = !1
        }
    }, draw: function (a) {
        this._super();
        if (cc.renderContextType == cc.CANVAS) {
            var a = a || cc.renderContext, b = cc.p(0 | -this._anchorPointInPoints.x, 0 | -this._anchorPointInPoints.y);
            this._renderTexture && a.drawImage(this._renderTexture.getCanvas(), b.x, -(b.y + this._renderTexture.getCanvas().height))
        } else 0 != this._textureAtlas.getTotalQuads() && (this._arrayMakeObjectsPerformSelector(this._children, cc.Node.StateCallbackType.updateTransform),
            this._textureAtlas.drawQuads())
    }});
cc.SpriteBatchNode.create = function (a, b) {
    b || (b = cc.DEFAULT_SPRITE_BATCH_CAPACITY);
    var c = new cc.SpriteBatchNode;
    c.init(a, b);
    return c
};
cc.SpriteBatchNode.createWithTexture = function (a, b) {
    b || (b = cc.DEFAULT_SPRITE_BATCH_CAPACITY);
    var c = new cc.SpriteBatchNode;
    c.initWithTexture(a, b);
    return c
};
cc.AnimationFrame = cc.Class.extend({_spriteFrame: null, _delayPerUnit: 0, _userInfo: null, ctor: function () {
    this._delayPerUnit = 0
}, copyWithZone: function () {
    return cc.clone(this)
}, copy: function () {
    var a = new cc.AnimationFrame;
    a.initWithSpriteFrame(this._spriteFrame, this._delayPerUnit, this._userInfo);
    return a
}, initWithSpriteFrame: function (a, b, c) {
    this.setSpriteFrame(a);
    this.setDelayUnits(b);
    this.setUserInfo(c);
    return!0
}, getSpriteFrame: function () {
    return this._spriteFrame
}, setSpriteFrame: function (a) {
    this._spriteFrame =
        a
}, getDelayUnits: function () {
    return this._delayPerUnit
}, setDelayUnits: function (a) {
    this._delayPerUnit = a
}, getUserInfo: function () {
    return this._userInfo
}, setUserInfo: function (a) {
    this._userInfo = a
}});
cc.Animation = cc.Class.extend({_frames: null, _loops: 0, _restoreOriginalFrame: !1, _duration: 0, _delayPerUnit: 0, _totalDelayUnits: 0, ctor: function () {
    this._frames = []
}, getFrames: function () {
    return this._frames
}, setFrames: function (a) {
    this._frames = a
}, addSpriteFrame: function (a) {
    var b = new cc.AnimationFrame;
    b.initWithSpriteFrame(a, 1, null);
    this._frames.push(b);
    this._totalDelayUnits++
}, addSpriteFrameWithFile: function (a) {
    var a = cc.TextureCache.getInstance().addImage(a), b = cc.RectZero();
    b.size = a instanceof HTMLImageElement ||
        a instanceof HTMLCanvasElement ? cc.size(a.width, a.height) : a.getContentSize();
    this.addSpriteFrame(cc.SpriteFrame.createWithTexture(a, b))
}, addSpriteFrameWithTexture: function (a, b) {
    this.addSpriteFrame(cc.SpriteFrame.createWithTexture(a, b))
}, initWithAnimationFrames: function (a, b, c) {
    cc.ArrayVerifyType(a, cc.AnimationFrame);
    this._delayPerUnit = b;
    this._loops = c;
    this.setFrames([]);
    for (b = 0; b < a.length; b++)c = a[b], this._frames.push(c), this._totalDelayUnits += c.getDelayUnits();
    return!0
}, copyWithZone: function () {
    var a =
        new cc.Animation;
    a.initWithAnimationFrames(this._frames, this._delayPerUnit, this._loops);
    a.setRestoreOriginalFrame(this._restoreOriginalFrame);
    return a
}, copy: function () {
    return this.copyWithZone(null)
}, getLoops: function () {
    return this._loops
}, setLoops: function (a) {
    this._loops = a
}, setRestoreOriginalFrame: function (a) {
    this._restoreOriginalFrame = a
}, getRestoreOriginalFrame: function () {
    return this._restoreOriginalFrame
}, getDuration: function () {
    return this._totalDelayUnits * this._delayPerUnit
}, getDelayPerUnit: function () {
    return this._delayPerUnit
},
    setDelayPerUnit: function (a) {
        this._delayPerUnit = a
    }, getTotalDelayUnits: function () {
        return this._totalDelayUnits
    }, initWithSpriteFrames: function (a, b) {
        cc.ArrayVerifyType(a, cc.SpriteFrame);
        this._loops = 1;
        this._delayPerUnit = b || 0;
        this.setFrames([]);
        if (a)for (var c = 0; c < a.length; c++) {
            var d = a[c], e = new cc.AnimationFrame;
            e.initWithSpriteFrame(d, 1, null);
            this._frames.push(e);
            this._totalDelayUnits++
        }
        return!0
    }});
cc.Animation.create = function (a, b, c) {
    var d = arguments.length, e = new cc.Animation;
    0 == d ? e.initWithSpriteFrames(null, 0) : 2 == d ? e.initWithSpriteFrames(a, b || 0) : 3 == d && e.initWithAnimationFrames(a, b, c);
    return e
};
cc.Animation.createWithAnimationFrames = function (a, b, c) {
    var d = new cc.Animation;
    d.initWithAnimationFrames(a, b, c);
    return d
};
cc.SpriteFrame = cc.Class.extend({_offset: null, _originalSize: null, _rectInPixels: null, _rotated: null, _rect: null, _offsetInPixels: null, _originalSizeInPixels: null, _texture: null, _textureFilename: "", ctor: function () {
    this._offset = cc.p(0, 0);
    this._offsetInPixels = cc.p(0, 0);
    this._originalSize = cc.size(0, 0);
    this._rectInPixels = cc.rect(0, 0, 0, 0);
    this._rect = cc.rect(0, 0, 0, 0);
    this._originalSizeInPixels = cc.size(0, 0);
    this._textureFilename = ""
}, getRectInPixels: function () {
    return this._rectInPixels
}, setRectInPixels: function (a) {
    this._rectInPixels =
        a;
    this._rect = cc.RECT_PIXELS_TO_POINTS(a)
}, isRotated: function () {
    return this._rotated
}, setRotated: function (a) {
    this._rotated = a
}, getRect: function () {
    return this._rect
}, setRect: function (a) {
    this._rect = a;
    this._rectInPixels = cc.RECT_POINTS_TO_PIXELS(this._rect)
}, getOffsetInPixels: function () {
    return cc.p(this._offsetInPixels.x, this._offsetInPixels.y)
}, setOffsetInPixels: function (a) {
    this._offsetInPixels = a;
    this._offset = cc.POINT_PIXELS_TO_POINTS(this._offsetInPixels)
}, getOriginalSizeInPixels: function () {
    return this._originalSizeInPixels
},
    setOriginalSizeInPixels: function (a) {
        this._originalSizeInPixels = a
    }, getOriginalSize: function () {
        return cc.size(this._originalSize.width, this._originalSize.height)
    }, setOriginalSize: function (a) {
        this._originalSize = a
    }, getTexture: function () {
        return this._texture ? this._texture : "" !== this._textureFilename ? cc.TextureCache.getInstance().addImage(this._textureFilename) : null
    }, setTexture: function (a) {
        this._texture != a && (this._texture = a)
    }, getOffset: function () {
        return cc.p(this._offset.x, this._offset.y)
    }, setOffset: function (a) {
        this._offset =
            a
    }, copyWithZone: function () {
        var a = new cc.SpriteFrame;
        a.initWithTextureFilename(this._textureFilename, this._rectInPixels, this._rotated, this._offsetInPixels, this._originalSizeInPixels);
        a.setTexture(this._texture);
        return a
    }, initWithTexture: function (a, b, c, d, e) {
        switch (arguments.length) {
            case 2:
                var f = cc.RECT_POINTS_TO_PIXELS(b);
                return this.initWithTexture(a, f, !1, cc.PointZero(), f.size);
            case 5:
                return this._texture = a, this._rectInPixels = b, this._rect = cc.RECT_PIXELS_TO_POINTS(b), this._offsetInPixels = d, this._offset =
                    cc.POINT_PIXELS_TO_POINTS(this._offsetInPixels), this._originalSizeInPixels = e, this._originalSize = cc.SIZE_PIXELS_TO_POINTS(this._originalSizeInPixels), this._rotated = c, !0;
            default:
                throw"Argument must be non-nil ";
        }
    }, initWithTextureFilename: function (a, b, c, d, e) {
        b = cc.RECT_POINTS_TO_PIXELS(b);
        d = d || cc.size(0, 0);
        e = e || b.size;
        this._texture = null;
        this._textureFilename = a;
        this._rectInPixels = b;
        this._rect = cc.RECT_PIXELS_TO_POINTS(b);
        this._rotated = c || !1;
        this._offsetInPixels = d;
        this._offset = cc.POINT_PIXELS_TO_POINTS(d);
        this._originalSizeInPixels = e;
        this._originalSize = cc.SIZE_PIXELS_TO_POINTS(e);
        return!0
    }});
cc.SpriteFrame.create = function (a, b, c, d, e) {
    var f = new cc.SpriteFrame;
    switch (arguments.length) {
        case 2:
            f.initWithTextureFilename(a, b);
            break;
        case 5:
            f.initWithTextureFilename(a, b, c, d, e);
            break;
        default:
            throw"Argument must be non-nil ";
    }
    return f
};
cc.SpriteFrame.createWithTexture = function (a, b, c, d, e) {
    var f = arguments.length, g = new cc.SpriteFrame;
    switch (f) {
        case 2:
            g.initWithTexture(a, b);
            break;
        case 5:
            g.initWithTexture(a, b, c, d, e);
            break;
        default:
            throw"Argument must be non-nil ";
    }
    return g
};
cc.SpriteFrame._frameWithTextureForCanvas = function (a, b, c, d, e) {
    var f = new cc.SpriteFrame;
    f._texture = a;
    f._rectInPixels = b;
    f._rect = cc.RECT_PIXELS_TO_POINTS(b);
    f._offsetInPixels = d;
    f._offset = cc.POINT_PIXELS_TO_POINTS(f._offsetInPixels);
    f._originalSizeInPixels = e;
    f._originalSize = cc.SIZE_PIXELS_TO_POINTS(f._originalSizeInPixels);
    f._rotated = c;
    return f
};
cc.AnimationCache = cc.Class.extend({addAnimation: function (a, b) {
    this._animations[b] = a
}, removeAnimation: function (a) {
    a && this._animations.hasOwnProperty(a) && delete this._animations[a]
}, getAnimation: function (a) {
    return this._animations.hasOwnProperty(a) ? this._animations[a] : null
}, addAnimationsWithDictionary: function (a) {
    var b = a.animations;
    if (b) {
        var c = 1;
        if (a = a.properties)for (var c = null != a.format ? parseInt(a.format) : c, a = a.spritesheets, d = 0; d < a.length; d++)cc.SpriteFrameCache.getInstance().addSpriteFrames(a[d]);
        switch (c) {
            case 1:
                this._parseVersion1(b);
                break;
            case 2:
                this._parseVersion2(b);
                break;
            default:
                cc.Assert(!1, "Invalid animation format")
        }
    } else cc.log("cocos2d: cc.AnimationCache: No animations were found in provided dictionary.")
}, addAnimations: function (a) {
    cc.Assert(a, "Invalid texture file name");
    a = cc.FileUtils.getInstance().fullPathFromRelativePath(a);
    a = cc.FileUtils.getInstance().dictionaryWithContentsOfFileThreadSafe(a);
    cc.Assert(a, "cc.AnimationCache: File could not be found");
    this.addAnimationsWithDictionary(a)
},
    _parseVersion1: function (a) {
        var b = cc.SpriteFrameCache.getInstance(), c;
        for (c in a) {
            var d = a[c], e = d.frames, d = parseFloat(d.delay) || 0, f = null;
            if (e) {
                for (var f = [], g = 0; g < e.length; g++) {
                    var h = b.getSpriteFrame(e[g]);
                    if (h) {
                        var k = new cc.AnimationFrame;
                        k.initWithSpriteFrame(h, 1, null);
                        f.push(k)
                    } else cc.log("cocos2d: cc.AnimationCache: Animation '" + c + "' refers to frame '" + e[g] + "' which is not currently in the cc.SpriteFrameCache. This frame will not be added to the animation.")
                }
                0 === f.length ? cc.log("cocos2d: cc.AnimationCache: None of the frames for animation '" +
                    c + "' were found in the cc.SpriteFrameCache. Animation is not being added to the Animation Cache.") : (f.length != e.length && cc.log("cocos2d: cc.AnimationCache: An animation in your dictionary refers to a frame which is not in the cc.SpriteFrameCache. Some or all of the frames for the animation '" + c + "' may be missing."), f = cc.Animation.createWithAnimationFrames(f, d, 1), cc.AnimationCache.getInstance().addAnimation(f, c))
            } else cc.log("cocos2d: cc.AnimationCache: Animation '" + c + "' found in dictionary without any frames - cannot add to animation cache.")
        }
    },
    _parseVersion2: function (a) {
        var b = cc.SpriteFrameCache.getInstance(), c;
        for (c in a) {
            var d = a[c], e = parseInt(d.loops) || 1, f = d.restoreOriginalFrame && !0 == d.restoreOriginalFrame ? !0 : !1, g = d.frames;
            if (g) {
                for (var h = [], k = 0; k < g.length; k++) {
                    var j = g[k], l = j.spriteframe, m = b.getSpriteFrame(l);
                    if (m) {
                        var l = parseFloat(j.delayUnits) || 0, j = j.notification, n = new cc.AnimationFrame;
                        n.initWithSpriteFrame(m, l, j);
                        h.push(n)
                    } else cc.log("cocos2d: cc.AnimationCache: Animation '" + c + "' refers to frame '" + l + "' which is not currently in the cc.SpriteFrameCache. This frame will not be added to the animation.")
                }
                d =
                    parseFloat(d.delayPerUnit) || 0;
                g = new cc.Animation;
                g.initWithAnimationFrames(h, d, e);
                g.setRestoreOriginalFrame(f);
                cc.AnimationCache.getInstance().addAnimation(g, c)
            } else cc.log("cocos2d: CCAnimationCache: Animation '" + c + "' found in dictionary without any frames - cannot add to animation cache.")
        }
    }, init: function () {
        this._animations = {};
        return!0
    }, _animations: null});
cc.AnimationCache.purgeSharedAnimationCache = function () {
    cc.s_sharedAnimationCache && (cc.s_sharedAnimationCache._animations = null, cc.s_sharedAnimationCache = null)
};
cc.AnimationCache.getInstance = function () {
    null === cc.s_sharedAnimationCache && (cc.s_sharedAnimationCache = new cc.AnimationCache, cc.s_sharedAnimationCache.init());
    return cc.s_sharedAnimationCache
};
cc.s_sharedAnimationCache = null;
cc.LabelTTF = cc.Sprite.extend({_dimensions: cc.SizeZero(), _hAlignment: cc.TEXT_ALIGNMENT_CENTER, _vAlignment: cc.VERTICAL_TEXT_ALIGNMENT_TOP, _fontName: "Arial", _fontSize: 0, _string: "", _fontStyleStr: null, _colorStyleStr: null, ctor: function () {
    this._super();
    this._opacityModifyRGB = !1;
    this._colorStyleStr = this._fontStyleStr = "";
    this._opacity = 255;
    this._color = cc.white();
    this._setColorStyleStr()
}, init: function (a) {
    return a ? this._super() : this.initWithString([" ", this._fontName, this._fontSize])
}, description: function () {
    return"<cc.LabelTTF | FontName =" +
        this._fontName + " FontSize = " + this._fontSize.toFixed(1) + ">"
}, setColor: function (a) {
    this._color.r == a.r && this._color.g == a.g && this._color.b == a.b || (this._color = this._colorUnmodified = new cc.Color3B(a.r, a.g, a.b), this._setColorStyleStr(), this.setNodeDirty())
}, setOpacity: function (a) {
    this._opacity !== a && (this._opacity = a, this._setColorStyleStr(), this.setNodeDirty())
}, _setColorStyleStr: function () {
    this._colorStyleStr = "rgba(" + this._color.r + "," + this._color.g + "," + this._color.b + ", " + this._opacity / 255 + ")"
}, setString: function (a) {
    this._string !=
        a && (this._string = a + "", 0 < this._string.length && this._updateTTF())
}, getString: function () {
    return this._string
}, getHorizontalAlignment: function () {
    return this._hAlignment
}, setHorizontalAlignment: function (a) {
    a != this._hAlignment && (this._hAlignment = a, 0 < this._string.length && this._updateTTF())
}, getVerticalAlignment: function () {
    return this._vAlignment
}, setVerticalAlignment: function (a) {
    a != this._vAlignment && (this._vAlignment = a, 0 < this._string.length && this._updateTTF())
}, getDimensions: function () {
    return this._dimensions
},
    setDimensions: function (a) {
        if (a.width != this._dimensions.width || a.height != this._dimensions.height)this._dimensions = a, 0 < this._string.length && this._updateTTF()
    }, getFontSize: function () {
        return this._fontSize
    }, setFontSize: function (a) {
        this._fontSize != a && (this._fontSize = a, 0 < this._string.length && this._updateTTF())
    }, getFontName: function () {
        return this._fontName
    }, setFontName: function (a) {
        this._fontName != a && (this._fontName = new String(a), 0 < this._string.length && this._updateTTF())
    }, initWithString: function (a) {
        var b =
            new String(a[0]), c, d, e, f;
        cc.Assert(null != b, "cc.LabelTTF.initWithString() label is null");
        6 == a.length ? (c = a[1], d = a[2], e = a[3], f = a[4], a = a[5]) : 5 == a.length ? (c = a[1], d = a[2], e = a[3], f = a[4], a = cc.VERTICAL_TEXT_ALIGNMENT_TOP) : (c = a[1], d = a[2], e = cc.size(0, a[2]), f = cc.TEXT_ALIGNMENT_LEFT, a = cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM);
        return this.init(!0) ? (this._dimensions = cc.size(e.width, e.height), this._fontName = c, this._hAlignment = f, this._vAlignment = a, this._fontSize = d * cc.CONTENT_SCALE_FACTOR(), this.setString(b), this._fontStyleStr =
            this._fontSize + "px '" + this._fontName + "'", this._updateTTF(), !0) : !1
    }, draw: function (a) {
        if (cc.renderContextType == cc.CANVAS) {
            a = a || cc.renderContext;
            this._flipX && a.scale(-1, 1);
            this._flipY && a.scale(1, -1);
            a.fillStyle = this._colorStyleStr;
            a.font != this._fontStyleStr && (a.font = this._fontStyleStr);
            if ((this._contentSize.width > this._dimensions.width || -1 < this._string.indexOf("\n")) && 0 !== this._dimensions.width)a.textBaseline = cc.LabelTTF._textBaseline[this._vAlignment], a.textAlign = cc.LabelTTF._textAlign[this._hAlignment],
                this._wrapText(a, this._string, -this._dimensions.width * this._anchorPoint.x, this._dimensions.height * this._anchorPoint.y, this._dimensions.width, this._dimensions.height, 1.2 * this._fontSize); else if (0 == this._dimensions.width)a.textBaseline = "bottom", a.textAlign = "left", -1 < this._string.indexOf("\n") ? this._multiLineText(a) : a.fillText(this._string, -this._contentSize.width * this._anchorPoint.x, this._contentSize.height * this._anchorPoint.y); else {
                a.textBaseline = cc.LabelTTF._textBaseline[this._vAlignment];
                a.textAlign =
                    cc.LabelTTF._textAlign[this._hAlignment];
                var b = 0, c = 0;
                this._hAlignment == cc.TEXT_ALIGNMENT_RIGHT && (b = this._dimensions.width);
                this._hAlignment == cc.TEXT_ALIGNMENT_CENTER && (b = this._dimensions.width / 2);
                this._vAlignment == cc.VERTICAL_TEXT_ALIGNMENT_TOP && (c = -this._dimensions.height);
                this._vAlignment == cc.VERTICAL_TEXT_ALIGNMENT_CENTER && (c = -this._dimensions.height / 2);
                a.fillText(this._string, -this._dimensions.width * this._anchorPoint.x + b, this._dimensions.height * this._anchorPoint.y + c)
            }
            cc.INCREMENT_GL_DRAWS(1)
        }
    },
    _multiLineText: function (a) {
        for (var b = 1.2 * this._fontSize, c = this._string.split("\n"), d = c.length, e = [], f = 0, g = 0; g < d; g++)e[g] = a.measureText(c[g]).width, e[g] > f && (f = e[g]);
        for (var h = cc.p(f / 2, d * b / 2), g = 0; g < d; g++) {
            var k = -e[g] / 2;
            this._hAlignment == cc.TEXT_ALIGNMENT_RIGHT && (k = h.x - f);
            this._hAlignment == cc.TEXT_ALIGNMENT_CENTER && (k = f - e[g]);
            a.fillText(c[g], k, g * b - h.y + b / 2)
        }
    }, _wrapText: function (a, b, c, d, e, f, g) {
        var h = this._lineCount() - 1, k = 0, j = 0;
        this._hAlignment === cc.TEXT_ALIGNMENT_RIGHT && (k = e);
        this._hAlignment === cc.TEXT_ALIGNMENT_CENTER &&
        (k = e / 2);
        this._vAlignment === cc.VERTICAL_TEXT_ALIGNMENT_TOP && (j = -f);
        this._vAlignment === cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM && (j = -g * h);
        this._vAlignment === cc.VERTICAL_TEXT_ALIGNMENT_CENTER && (j = -f / 2 - g * h / 2);
        b = b.split("\n");
        for (f = 0; f < b.length; f++)for (var h = f * g, l = b[f].split(" "), m = "", n = 0; n < l.length; n++) {
            var o = m + l[n] + " ";
            a.measureText(o).width - a.measureText(" ").width >= e ? (a.fillText(m, c + k, d + j + h), d += g, m = l[n] + " ") : m = o;
            n == l.length - 1 && a.fillText(m, c + k, d + j + h)
        }
    }, _lineCount: function () {
        if (0 == this._dimensions.width)return 1;
        var a = cc.renderContext, b = this._string.split(" "), c = "", d = 0;
        cc.renderContext.save();
        for (var e = 0; e < b.length; e++)c = c + b[e] + " ", a.measureText(c).width - a.measureText(" ").width >= this._dimensions.width && (d++, c = b[e] + " "), e == b.length - 1 && d++;
        cc.renderContext.restore();
        return d
    }, _updateTTF: function () {
        cc.renderContext.save();
        this._fontStyleStr = this._fontSize + "px '" + this._fontName + "'";
        cc.renderContext.font = this._fontStyleStr;
        var a = cc.renderContext.measureText(this._string);
        this.setContentSize(cc.size(a.width, this._fontSize));
        cc.renderContext.restore();
        this.setNodeDirty()
    }});
cc.LabelTTF._textAlign = ["left", "center", "right"];
cc.LabelTTF._textBaseline = ["top", "middle", "bottom"];
cc.LabelTTF.create = function () {
    var a = new cc.LabelTTF;
    return a.initWithString(arguments) ? a : null
};
cc.LabelTTF.node = function () {
    return cc.LabelTTF.create()
};
cc.Touch = cc.Class.extend({_point: null, _prevPoint: cc.PointZero(), _id: 0, ctor: function (a, b, c) {
    this._point = cc.p(a || 0, b || 0);
    this._id = c || 0
}, getLocation: function () {
    return this._point
}, getPreviousLocation: function () {
    return this._prevPoint
}, getDelta: function () {
    return cc.pSub(this._point, this._prevPoint)
}, getID: function () {
    return this._id
}, getId: function () {
    return this._id
}, setTouchInfo: function (a, b, c) {
    this._prevPoint = this._point;
    this._point = cc.p(b || 0, c || 0);
    this._id = a
}, _setPrevPoint: function (a, b) {
    this._prevPoint =
        cc.p(a || 0, b || 0)
}});
cc.TouchDelegate = cc.Class.extend({_eventTypeFuncMap: null, onTouchBegan: function () {
    return!1
}, onTouchMoved: function () {
}, onTouchEnded: function () {
}, onTouchCancelled: function () {
}, onTouchesBegan: function () {
}, onTouchesMoved: function () {
}, onTouchesEnded: function () {
}, onTouchesCancelled: function () {
}, touchDelegateRetain: function () {
}, touchDelegateRelease: function () {
}});
cc.TargetedTouchDelegate = cc.TouchDelegate.extend({onTouchBegan: function () {
    return!1
}, onTouchMoved: function () {
}, onTouchEnded: function () {
}, onTouchCancelled: function () {
}});
cc.StandardTouchDelegate = cc.TouchDelegate.extend({onTouchesBegan: function () {
}, onTouchesMoved: function () {
}, onTouchesEnded: function () {
}, onTouchesCancelled: function () {
}});
cc.TouchHandler = cc.Class.extend({_delegate: null, _priority: 0, _enabledSelectors: 0, getDelegate: function () {
    return this._delegate
}, setDelegate: function (a) {
    this._delegate = a
}, getPriority: function () {
    return this._priority
}, setPriority: function (a) {
    this._priority = a
}, getEnabledSelectors: function () {
    return this._enabledSelectors
}, setEnalbedSelectors: function (a) {
    this._enabledSelectors = a
}, initWithDelegate: function (a, b) {
    cc.Assert(null != a, "TouchHandler.initWithDelegate():touch delegate should not be null");
    this._delegate =
        a;
    this._priority = b;
    this._enabledSelectors = 0;
    return!0
}});
cc.TouchHandler.handlerWithDelegate = function (a, b) {
    var c = new cc.TouchHandler;
    c && c.initWithDelegate(a, b);
    return c
};
cc.StandardTouchHandler = cc.TouchHandler.extend({initWithDelegate: function (a, b) {
    return this._super(a, b) ? !0 : !1
}});
cc.StandardTouchHandler.handlerWithDelegate = function (a, b) {
    var c = new cc.StandardTouchHandler;
    c && c.initWithDelegate(a, b);
    return c
};
cc.TargetedTouchHandler = cc.TouchHandler.extend({_swallowsTouches: !1, _claimedTouches: null, isSwallowsTouches: function () {
    return this._swallowsTouches
}, setSwallowsTouches: function (a) {
    this._swallowsTouches = a
}, getClaimedTouches: function () {
    return this._claimedTouches
}, initWithDelegate: function (a, b, c) {
    return this._super(a, b) ? (this._claimedTouches = [], this._swallowsTouches = c, !0) : !1
}});
cc.TargetedTouchHandler.handlerWithDelegate = function (a, b, c) {
    var d = new cc.TargetedTouchHandler;
    d && d.initWithDelegate(a, b, c);
    return d
};
cc.TouchSelectorBeganBit = 1;
cc.TouchSelectorMovedBit = 2;
cc.TouchSelectorEndedBit = 4;
cc.TouchSelectorCancelledBit = 8;
cc.TouchSelectorAllBits = cc.TouchSelectorBeganBit | cc.TouchSelectorMovedBit | cc.TouchSelectorEndedBit | cc.TouchSelectorCancelledBit;
cc.TOUCH_BEGAN = 0;
cc.TOUCH_MOVED = 1;
cc.TOUCH_ENDED = 2;
cc.TOUCH_CANCELLED = 3;
cc.TouchMax = 4;
cc.less = function (a, b) {
    return a.getPriority() > b.getPriority()
};
cc.TouchHandlerHelperData = function (a) {
    this.type = a
};
cc.TouchDispatcher = cc.Class.extend({_mousePressed: !1, _targetedHandlers: null, _standardHandlers: null, _locked: !1, _toAdd: !1, _toRemove: !1, _handlersToAdd: null, _handlersToRemove: null, _toQuit: !1, _dispatchEvents: !1, _handlerHelperData: [new cc.TouchHandlerHelperData(cc.TOUCH_BEGAN), new cc.TouchHandlerHelperData(cc.TOUCH_MOVED), new cc.TouchHandlerHelperData(cc.TOUCH_ENDED), new cc.TouchHandlerHelperData(cc.TOUCH_CANCELLED)], init: function () {
    this._dispatchEvents = !0;
    this._targetedHandlers = [];
    this._standardHandlers =
        [];
    this._handlersToAdd = [];
    this._handlersToRemove = [];
    this._mousePressed = this._locked = this._toQuit = this._toAdd = this._toRemove = !1;
    cc.TouchDispatcher.registerHtmlElementEvent(cc.canvas);
    return!0
}, _setMousePressed: function (a) {
    this._mousePressed = a
}, _getMousePressed: function () {
    return this._mousePressed
}, isDispatchEvents: function () {
    return this._dispatchEvents
}, setDispatchEvents: function (a) {
    this._dispatchEvents = a
}, addStandardDelegate: function (a, b) {
    var c = cc.StandardTouchHandler.handlerWithDelegate(a, b);
    this._locked ?
        -1 != this._handlersToRemove.indexOf(a) ? cc.ArrayRemoveObject(this._handlersToRemove, a) : (this._handlersToAdd.push(c), this._toAdd = !0) : this._standardHandlers = this.forceAddHandler(c, this._standardHandlers)
}, addTargetedDelegate: function (a, b, c) {
    b = cc.TargetedTouchHandler.handlerWithDelegate(a, b, c);
    this._locked ? -1 != this._handlersToRemove.indexOf(a) ? cc.ArrayRemoveObject(this._handlersToRemove, a) : (this._handlersToAdd.push(b), this._toAdd = !0) : this._targetedHandlers = this.forceAddHandler(b, this._targetedHandlers)
},
    forceAddHandler: function (a, b) {
        for (var c = 0, d = 0; d < b.length; d++) {
            var e = b[d];
            if (e && (e.getPriority() < a.getPriority() && ++c, e.getDelegate() == a.getDelegate()))return cc.Assert(0, "TouchDispatcher.forceAddHandler()"), b
        }
        return cc.ArrayAppendObjectToIndex(b, a, c)
    }, forceRemoveAllDelegates: function () {
        this._standardHandlers.length = 0;
        this._targetedHandlers.length = 0
    }, removeDelegate: function (a) {
        if (null != a)if (this._locked) {
            var b = this.findHandler(this._handlersToAdd, a);
            b ? cc.ArrayRemoveObject(this._handlersToAdd, b) : (this._handlersToRemove.push(a),
                this._toRemove = !0)
        } else this.forceRemoveDelegate(a)
    }, removeAllDelegates: function () {
        this._locked ? this._toQuit = !0 : this.forceRemoveAllDelegates()
    }, setPriority: function (a, b) {
        cc.Assert(null != b, "TouchDispatcher.setPriority():Arguments is null");
        var c = this.findHandler(b);
        cc.Assert(null != c, "TouchDispatcher.setPriority():Cant find TouchHandler");
        c.getPriority() != a && (c.setPriority(a), this.rearrangeHandlers(this._targetedHandlers), this.rearrangeHandlers(this._standardHandlers))
    }, touches: function (a, b, c) {
        cc.Assert(0 <=
            c && 4 > c, "TouchDispatcher.touches()");
        this._locked = !0;
        var d = this._targetedHandlers.length, e = this._standardHandlers.length, f = d && e, g = f ? a.slice() : a, h = this._handlerHelperData[c];
        if (0 < d)for (var k = 0; k < a.length; k++)for (var d = a[k], j, l = 0; l < this._targetedHandlers.length; l++) {
            j = this._targetedHandlers[l];
            if (!j)break;
            var m = !1;
            if (c == cc.TOUCH_BEGAN)j.getDelegate().onTouchBegan && (m = j.getDelegate().onTouchBegan(d, b)) && j.getClaimedTouches().push(d); else if (0 < j.getClaimedTouches().length)switch (m = !0, h.type) {
                case cc.TOUCH_MOVED:
                    if (cc.Browser.isMobile) {
                        if (j.getDelegate().onTouchMoved)j.getDelegate().onTouchMoved(d,
                            b)
                    } else if (this._mousePressed && j.getDelegate().onTouchMoved)j.getDelegate().onTouchMoved(d, b);
                    break;
                case cc.TOUCH_ENDED:
                    if (j.getDelegate().onTouchEnded)j.getDelegate().onTouchEnded(d, b);
                    j.getClaimedTouches().length = 0;
                    break;
                case cc.TOUCH_CANCELLED:
                    if (j.getDelegate().onTouchCancelled)j.getDelegate().onTouchCancelled(d, b);
                    j.getClaimedTouches().length = 0
            }
            if (m && j.isSwallowsTouches()) {
                f && cc.ArrayRemoveObject(g, d);
                break
            }
        }
        if (0 < e)for (k = 0; k < this._standardHandlers.length; k++) {
            j = this._standardHandlers[k];
            if (!j)break;
            switch (h.type) {
                case cc.TOUCH_BEGAN:
                    if (0 < g.length && j.getDelegate().onTouchesBegan)j.getDelegate().onTouchesBegan(g, b);
                    break;
                case cc.TOUCH_MOVED:
                    if (0 < g.length)if (cc.Browser.isMobile) {
                        if (j.getDelegate().onTouchesMoved)j.getDelegate().onTouchesMoved(g, b)
                    } else if (this._mousePressed && j.getDelegate().onTouchesMoved)j.getDelegate().onTouchesMoved(g, b);
                    break;
                case cc.TOUCH_ENDED:
                    if (j.getDelegate().onTouchesEnded)j.getDelegate().onTouchesEnded(g, b);
                    break;
                case cc.TOUCH_CANCELLED:
                    if (j.getDelegate().onTouchesCancelled)j.getDelegate().onTouchesCancelled(g,
                        b)
            }
        }
        this._locked = !1;
        if (this._toRemove) {
            this._toRemove = !1;
            for (k = 0; k < this._handlersToRemove.length; k++)this.forceRemoveDelegate(this._handlersToRemove[k]);
            this._handlersToRemove.length = 0
        }
        if (this._toAdd) {
            this._toAdd = !1;
            for (k = 0; k < this._handlersToAdd.length; k++) {
                j = this._handlersToAdd[k];
                if (!j)break;
                j instanceof cc.TargetedTouchHandler ? this._targetedHandlers = this.forceAddHandler(j, this._targetedHandlers) : this._standardHandlers = this.forceAddHandler(j, this._standardHandlers)
            }
            this._handlersToAdd.length = 0
        }
        this._toQuit &&
        (this._toQuit = !1, this.forceRemoveAllDelegates())
    }, touchesBegan: function (a, b) {
        this._dispatchEvents && this.touches(a, b, cc.TOUCH_BEGAN)
    }, touchesMoved: function (a, b) {
        this._dispatchEvents && this.touches(a, b, cc.TOUCH_MOVED)
    }, touchesEnded: function (a, b) {
        this._dispatchEvents && this.touches(a, b, cc.TOUCH_ENDED)
    }, touchesCancelled: function (a, b) {
        this._dispatchEvents && this.touches(a, b, cc.TOUCH_CANCELLED)
    }, findHandler: function (a, b) {
        switch (arguments.length) {
            case 1:
                for (var b = arguments[0], c = 0; c < this._targetedHandlers.length; c++)if (this._targetedHandlers[c].getDelegate() ==
                    b)return this._targetedHandlers[c];
                for (c = 0; c < this._standardHandlers.length; c++)if (this._standardHandlers[c].getDelegate() == b)return this._standardHandlers[c];
                return null;
            case 2:
                cc.Assert(null != a && null != b, "TouchDispatcher.findHandler():Arguments is null");
                for (c = 0; c < a.length; c++)if (a[c].getDelegate() == b)return a[c];
                return null;
            default:
                throw"Argument must be non-nil ";
        }
    }, forceRemoveDelegate: function (a) {
        for (var b, c = 0; c < this._standardHandlers.length; c++)if ((b = this._standardHandlers[c]) && b.getDelegate() ==
            a) {
            cc.ArrayRemoveObject(this._standardHandlers, b);
            break
        }
        for (c = 0; c < this._targetedHandlers.length; c++)if ((b = this._targetedHandlers[c]) && b.getDelegate() == a) {
            cc.ArrayRemoveObject(this._targetedHandlers, b);
            break
        }
    }, rearrangeHandlers: function (a) {
        a.sort(cc.less)
    }});
cc.TouchDispatcher.preTouchPoint = cc.p(0, 0);
cc.TouchDispatcher.isRegisterEvent = !1;
cc.getHTMLElementPosition = function (a) {
    for (var b = null, b = a instanceof HTMLCanvasElement ? {left: 0, top: 0, width: a.width, height: a.height} : {left: 0, top: 0, width: parseInt(a.style.width), height: parseInt(a.style.height)}; null != a;)b.left += a.offsetLeft, b.top += a.offsetTop, a = a.offsetParent;
    return b
};
cc.ProcessMouseupEvent = function (a, b) {
    var c = cc.getHTMLElementPosition(a), d = b.pageY, e = (b.pageX - c.left) / cc.Director.getInstance().getContentScaleFactor(), d = (c.height - (d - c.top)) / cc.Director.getInstance().getContentScaleFactor(), c = new cc.Touch(e, d);
    c._setPrevPoint(cc.TouchDispatcher.preTouchPoint.x, cc.TouchDispatcher.preTouchPoint.y);
    cc.TouchDispatcher.preTouchPoint.x = e;
    cc.TouchDispatcher.preTouchPoint.y = d;
    e = [];
    e.push(c);
    cc.Director.getInstance().getTouchDispatcher().touchesEnded(e, null)
};
cc.TouchDispatcher.registerHtmlElementEvent = function (a) {
    cc.TouchDispatcher.isRegisterEvent || (cc.Browser.isMobile ? (a.addEventListener("touchstart", function (b) {
        if (b.touches) {
            var c = [], d = cc.getHTMLElementPosition(a);
            d.left -= document.body.scrollLeft;
            d.top -= document.body.scrollTop;
            for (var e = 0; e < b.touches.length; e++) {
                var f = b.touches[e].pageX, g = b.touches[e].pageY;
                b.touches[e] && (f = b.touches[e].clientX, g = b.touches[e].clientY);
                var f = (f - d.left) / cc.Director.getInstance().getContentScaleFactor(), g = (d.height - (g -
                    d.top)) / cc.Director.getInstance().getContentScaleFactor(), h = null, h = b.touches[e].hasOwnProperty("identifier") ? new cc.Touch(f, g, b.touches[e].identifier) : new cc.Touch(f, g);
                h._setPrevPoint(cc.TouchDispatcher.preTouchPoint.x, cc.TouchDispatcher.preTouchPoint.y);
                cc.TouchDispatcher.preTouchPoint.x = f;
                cc.TouchDispatcher.preTouchPoint.y = g;
                c.push(h)
            }
            cc.Director.getInstance().getTouchDispatcher().touchesBegan(c, null);
            b.stopPropagation();
            b.preventDefault()
        }
    }, !1), a.addEventListener("touchmove", function (b) {
        if (b.touches) {
            var c =
                [], d = cc.getHTMLElementPosition(a);
            d.left -= document.body.scrollLeft;
            d.top -= document.body.scrollTop;
            for (var e = 0; e < b.touches.length; e++) {
                var f = b.touches[e].pageX, g = b.touches[e].pageY;
                b.touches[e] && (f = b.touches[e].clientX, g = b.touches[e].clientY);
                var f = (f - d.left) / cc.Director.getInstance().getContentScaleFactor(), g = (d.height - (g - d.top)) / cc.Director.getInstance().getContentScaleFactor(), h = null, h = b.touches[e].hasOwnProperty("identifier") ? new cc.Touch(f, g, b.touches[e].identifier) : new cc.Touch(f, g);
                h._setPrevPoint(cc.TouchDispatcher.preTouchPoint.x,
                    cc.TouchDispatcher.preTouchPoint.y);
                cc.TouchDispatcher.preTouchPoint.x = f;
                cc.TouchDispatcher.preTouchPoint.y = g;
                c.push(h)
            }
            cc.Director.getInstance().getTouchDispatcher().touchesMoved(c, null);
            b.stopPropagation();
            b.preventDefault()
        }
    }, !1), a.addEventListener("touchend", function (b) {
        if (b.touches) {
            var c = [], d = cc.getHTMLElementPosition(a);
            d.left -= document.body.scrollLeft;
            d.top -= document.body.scrollTop;
            var e = b.touches;
            if (!e || 0 == e.length)e = b.changedTouches;
            for (var f = 0; f < e.length; f++) {
                var g = e[f].pageX, h = e[f].pageY;
                e[f] && (g = e[f].clientX, h = e[f].clientY);
                var g = (g - d.left) / cc.Director.getInstance().getContentScaleFactor(), h = (d.height - (h - d.top)) / cc.Director.getInstance().getContentScaleFactor(), k = null, k = e[f].hasOwnProperty("identifier") ? new cc.Touch(g, h, e[f].identifier) : new cc.Touch(g, h);
                k._setPrevPoint(cc.TouchDispatcher.preTouchPoint.x, cc.TouchDispatcher.preTouchPoint.y);
                cc.TouchDispatcher.preTouchPoint.x = g;
                cc.TouchDispatcher.preTouchPoint.y = h;
                c.push(k)
            }
            cc.Director.getInstance().getTouchDispatcher().touchesEnded(c,
                null);
            b.stopPropagation();
            b.preventDefault()
        }
    }, !1), a.addEventListener("touchcancel", function (b) {
        if (b.touches) {
            var c = [], d = cc.getHTMLElementPosition(a);
            d.left -= document.body.scrollLeft;
            d.top -= document.body.scrollTop;
            for (var e = 0; e < b.touches.length; e++) {
                var f = b.touches[e].pageX, g = b.touches[e].pageY;
                b.touches[e] && (f = b.touches[e].clientX, g = b.touches[e].clientY);
                var f = (f - d.left) / cc.Director.getInstance().getContentScaleFactor(), g = (d.height - (g - d.top)) / cc.Director.getInstance().getContentScaleFactor(), h = null,
                    h = b.touches[e].hasOwnProperty("identifier") ? new cc.Touch(f, g, b.touches[e].identifier) : new cc.Touch(f, g);
                h._setPrevPoint(cc.TouchDispatcher.preTouchPoint.x, cc.TouchDispatcher.preTouchPoint.y);
                cc.TouchDispatcher.preTouchPoint.x = f;
                cc.TouchDispatcher.preTouchPoint.y = g;
                c.push(h)
            }
            cc.Director.getInstance().getTouchDispatcher().touchesCancelled(c, null);
            b.stopPropagation();
            b.preventDefault()
        }
    }, !1)) : (window.addEventListener("mousedown", function () {
        cc.Director.getInstance().getTouchDispatcher()._setMousePressed(!0)
    }),
        window.addEventListener("mouseup", function (b) {
            cc.Director.getInstance().getTouchDispatcher()._setMousePressed(!1);
            var c = cc.getHTMLElementPosition(a), d = b.pageX, b = b.pageY;
            cc.rectContainsPoint(new cc.Rect(c.left, c.top, c.width, c.height), cc.p(d, b)) || (d = (d - c.left) / cc.Director.getInstance().getContentScaleFactor(), b = (c.height - (b - c.top)) / cc.Director.getInstance().getContentScaleFactor(), c = new cc.Touch(d, b), c._setPrevPoint(cc.TouchDispatcher.preTouchPoint.x, cc.TouchDispatcher.preTouchPoint.y), cc.TouchDispatcher.preTouchPoint.x =
                d, cc.TouchDispatcher.preTouchPoint.y = b, d = [], d.push(c), cc.Director.getInstance().getTouchDispatcher().touchesEnded(d, null))
        }), a.addEventListener("mousedown", function (b) {
        var c = cc.getHTMLElementPosition(a), d = b.pageY, b = (b.pageX - c.left) / cc.Director.getInstance().getContentScaleFactor(), d = (c.height - (d - c.top)) / cc.Director.getInstance().getContentScaleFactor(), c = new cc.Touch(b, d);
        c._setPrevPoint(cc.TouchDispatcher.preTouchPoint.x, cc.TouchDispatcher.preTouchPoint.y);
        cc.TouchDispatcher.preTouchPoint.x = b;
        cc.TouchDispatcher.preTouchPoint.y =
            d;
        b = [];
        b.push(c);
        cc.Director.getInstance().getTouchDispatcher().touchesBegan(b, null)
    }), a.addEventListener("mouseup", function (b) {
        cc.ProcessMouseupEvent(a, b)
    }), a.addEventListener("mousemove", function (b) {
        var c = cc.getHTMLElementPosition(a), d = b.pageY, b = (b.pageX - c.left) / cc.Director.getInstance().getContentScaleFactor(), d = (c.height - (d - c.top)) / cc.Director.getInstance().getContentScaleFactor(), c = new cc.Touch(b, d);
        c._setPrevPoint(cc.TouchDispatcher.preTouchPoint.x, cc.TouchDispatcher.preTouchPoint.y);
        cc.TouchDispatcher.preTouchPoint.x =
            b;
        cc.TouchDispatcher.preTouchPoint.y = d;
        b = [];
        b.push(c);
        cc.Director.getInstance().getTouchDispatcher().touchesMoved(b, null)
    })), cc.TouchDispatcher.isRegisterEvent = !0)
};
cc.g_NumberOfDraws = 0;
cc.DIRECTOR_PROJECTION_2D = 0;
cc.DIRECTOR_PROJECTION_3D = 1;
cc.DIRECTOR_PROJECTION_CUSTOM = 3;
cc.DIRECTOR_PROJECTION_DEFAULT = cc.DIRECTOR_PROJECTION_3D;
cc.DEVICE_ORIENTATION_PORTRAIT = 0;
cc.DEVICE_ORIENTATION_LANDSCAPE_LEFT = 1;
cc.DEVICE_ORIENTATION_PORTRAIT_UPSIDE_DOWN = 2;
cc.DEVICE_ORIENTATION_LANDSCAPE_RIGHT = 3;
cc.DEVICE_MAX_ORIENTATIONS = 2;
cc.Director = cc.Class.extend({_isContentScaleSupported: !1, _landscape: !1, _nextDeltaTimeZero: !1, _paused: !1, _purgeDirecotorInNextLoop: !1, _sendCleanupToScene: !1, _animationInterval: 0, _oldAnimationInterval: 0, _projection: 0, _accumDt: 0, _contentScaleFactor: 1, _displayStats: !1, _deltaTime: 0, _frameRate: 0, _FPSLabel: null, _SPFLabel: null, _drawsLabel: null, _winSizeInPixels: null, _winSizeInPoints: null, _lastUpdate: null, _nextScene: null, _notificationNode: null, _openGLView: null, _scenesStack: null, _projectionDelegate: null, _runningScene: null,
    _frames: 0, _totalFrames: 0, _secondsPerFrame: 0, _dirtyRegion: null, _scheduler: null, _actionManager: null, _touchDispatcher: null, _keyboardDispatcher: null, _accelerometer: null, _mouseDispatcher: null, _watcherFun: null, _watcherSender: null, _currTimeValue: null, _isBlur: !1, ctor: function () {
        this._currTimeValue = new cc.timeval;
        this._lastUpdate = new cc.timeval;
        if (!cc.isAddedHiddenEvent) {
            var a = this;
            window.addEventListener("focus", function () {
                a._lastUpdate = cc.Time.gettimeofdayCocos2d(a._lastUpdate)
            }, !1)
        }
    }, _resetLastUpdate: function () {
        this._lastUpdate =
            cc.Time.gettimeofdayCocos2d(this._lastUpdate)
    }, init: function () {
        this._notificationNode = this._nextScene = this._runningScene = null;
        this._oldAnimationInterval = this._animationInterval = 1 / cc.defaultFPS;
        this._scenesStack = [];
        this._projection = cc.DIRECTOR_PROJECTION_DEFAULT;
        this._projectionDelegate = null;
        this._frameRate = this._accumDt = 0;
        this._displayStats = !1;
        this._totalFrames = this._frames = 0;
        this._lastUpdate = new cc.timeval;
        this._purgeDirecotorInNextLoop = this._paused = !1;
        this._winSizeInPixels = this._winSizeInPoints =
            cc.size(cc.canvas.width, cc.canvas.height);
        this._openGLView = null;
        this._contentScaleFactor = 1;
        this._isContentScaleSupported = !1;
        this._watcherSender = this._watcherFun = null;
        this._scheduler = new cc.Scheduler;
        this._actionManager = new cc.ActionManager;
        this._scheduler.scheduleUpdateForTarget(this._actionManager, cc.PRIORITY_SYSTEM, !1);
        this._touchDispatcher = new cc.TouchDispatcher;
        this._touchDispatcher.init();
        return!0
    }, calculateDeltaTime: function () {
        var a = cc.Time.gettimeofdayCocos2d(this._currTimeValue);
        a ? (this._nextDeltaTimeZero ?
            (this._deltaTime = 0, this._nextDeltaTimeZero = !1) : (this._deltaTime = a.tv_sec - this._lastUpdate.tv_sec + (a.tv_usec - this._lastUpdate.tv_usec) / 1E6, this._deltaTime = Math.max(0, this._deltaTime)), cc.DEBUG && 0.2 < this._deltaTime && (this._deltaTime = 1 / 60), this._lastUpdate.tv_sec = a.tv_sec, this._lastUpdate.tv_usec = a.tv_usec) : (cc.log("error in gettimeofday"), this._deltaTime = 0)
    }, convertToGL: function (a) {
        return cc.p(a.x, this._winSizeInPoints.height - a.y)
    }, convertToUI: function (a) {
        return cc.p(a.x, this._winSizeInPoints.height -
            a.y)
    }, drawScene: function () {
        this.calculateDeltaTime();
        this._paused || this._scheduler.update(this._deltaTime);
        cc.renderContext.clearRect(0, 0, cc.canvas.width, -cc.canvas.height);
        this._nextScene && this.setNextScene();
        this._runningScene && this._runningScene.visit();
        this._notificationNode && this._notificationNode.visit();
        this._displayStats && this._showStats();
        this._watcherFun && this._watcherSender && this._watcherFun.call(this._watcherSender);
        this._totalFrames++;
        this._openGLView && this._openGLView.swapBuffers();
        this._displayStats && this._calculateMPF()
    }, addRegionToDirtyRegion: function (a) {
        a && (this._dirtyRegion = this._dirtyRegion ? cc.Rect.CCRectUnion(this._dirtyRegion, cc.rect(a.origin.x, a.origin.y, a.size.width, a.size.height)) : cc.rect(a.origin.x, a.origin.y, a.size.width, a.size.height))
    }, rectIsInDirtyRegion: function (a) {
        return!a || !this._fullRect ? !1 : cc.Rect.CCRectIntersectsRect(this._fullRect, a)
    }, enableRetinaDisplay: function (a) {
        if (a && 2 == this._contentScaleFactor)return!0;
        if (!a && 1 == this._contentScaleFactor || !this._openGLView.canSetContentScaleFactor() ||
            1 == this._openGLView.getMainScreenScale())return!1;
        this.setContentScaleFactor(a ? 2 : 1);
        this._createStatsLabel();
        return!0
    }, end: function () {
        this._purgeDirecotorInNextLoop = !0
    }, getContentScaleFactor: function () {
        return this._contentScaleFactor
    }, getNotificationNode: function () {
        return this._notificationNode
    }, getWinSize: function () {
        return this._winSizeInPoints
    }, getWinSizeInPixels: function () {
        return this._winSizeInPixels
    }, getZEye: function () {
        return this._winSizeInPixels.height / 1.1566 / cc.CONTENT_SCALE_FACTOR()
    }, pause: function () {
        this._paused ||
        (this._oldAnimationInterval = this._animationInterval, this.setAnimationInterval(0.25), this._paused = !0)
    }, popScene: function () {
        cc.Assert(null != this._runningScene, "running scene should not null");
        this._scenesStack.pop();
        var a = this._scenesStack.length;
        0 == a ? this.end() : (this._sendCleanupToScene = !0, this._nextScene = this._scenesStack[a - 1])
    }, purgeCachedData: function () {
        cc.LabelBMFont.purgeCachedData()
    }, purgeDirector: function () {
        this._touchDispatcher.removeAllDelegates();
        this._runningScene && (this._runningScene.onExit(),
            this._runningScene.cleanup());
        this._nextScene = this._runningScene = null;
        this._scenesStack = [];
        this.stopAnimation();
        cc.LabelBMFont.purgeCachedData();
        cc.AnimationCache.purgeSharedAnimationCache();
        cc.SpriteFrameCache.purgeSharedSpriteFrameCache();
        cc.TextureCache.purgeSharedTextureCache();
        this._openGLView.end();
        this._openGLView = null
    }, pushScene: function (a) {
        cc.Assert(a, "the scene should not null");
        this._sendCleanupToScene = !1;
        this._scenesStack.push(a);
        this._nextScene = a
    }, replaceScene: function (a) {
        cc.Assert(null !=
            a, "the scene should not be null");
        var b = this._scenesStack.length;
        this._sendCleanupToScene = !0;
        this._nextScene = this._scenesStack[b - 1] = a
    }, reshapeProjection: function () {
        this._openGLView && (this._winSizeInPoints = this._openGLView.getSize(), this._winSizeInPixels = cc.size(this._winSizeInPoints.width * this._contentScaleFactor, this._winSizeInPoints.height * this._contentScaleFactor), this.setProjection(this._projection))
    }, resume: function () {
        this._paused && (this.setAnimationInterval(this._oldAnimationInterval), (this._lastUpdate =
            cc.Time.gettimeofdayCocos2d()) || cc.log("cocos2d: Director: Error in gettimeofday"), this._paused = !1, this._deltaTime = 0)
    }, runWithScene: function (a) {
        cc.Assert(null != a, "running scene should not be null");
        cc.Assert(null == this._runningScene, "_runningScene should be null");
        this.pushScene(a);
        this.startAnimation()
    }, setAlphaBlending: function () {
    }, setContentScaleFactor: function (a) {
        a != this._contentScaleFactor && (this._contentScaleFactor = a, this._winSizeInPixels = cc.size(this._winSizeInPoints.width * a, this._winSizeInPoints.height *
            a), this._openGLView && this.updateContentScaleFactor(), this.setProjection(this._projection))
    }, setDepthTest: function () {
    }, setGLDefaultValues: function () {
        cc.Assert(this._openGLView, "opengl view should not be null");
        this.setAlphaBlending(!0);
        this.setDepthTest(!0);
        this.setProjection(this._projection)
    }, setNextDeltaTimeZero: function (a) {
        this._nextDeltaTimeZero = a
    }, setNextScene: function () {
        var a = this._runningScene ? this._runningScene instanceof cc.TransitionScene : !1;
        if (!(this._nextScene && this._nextScene instanceof
            cc.TransitionScene)) {
            if (this._runningScene)this._runningScene.onExit();
            this._sendCleanupToScene && this._runningScene && this._runningScene.cleanup()
        }
        this._runningScene = this._nextScene;
        this._nextScene = null;
        !a && null != this._runningScene && (this._runningScene.onEnter(), this._runningScene.onEnterTransitionDidFinish())
    }, setNotificationNode: function (a) {
        this._notificationNode = a
    }, setOpenGLView: function (a) {
        cc.Assert(a, "opengl view should not be null");
        this._openGLView != a && (delete this._openGLView, this._openGLView =
            a, this._winSizeInPoints = this._openGLView.getSize(), this._winSizeInPixels = cc.size(this._winSizeInPoints.width * this._contentScaleFactor, this._winSizeInPoints.height * this._contentScaleFactor), this._createStatsLabel(), this._openGLView && this.setGLDefaultValues(), 1 != this._contentScaleFactor && this.updateContentScaleFactor(), this._openGLView.setTouchDelegate(this._touchDispatcher), this._touchDispatcher.setDispatchEvents(!0))
    }, setProjection: function (a) {
        var b = this._winSizeInPoints;
        this._openGLView && this._openGLView.setViewPortInPoints(0,
            0, b.width, b.height);
        switch (a) {
            case cc.DIRECTOR_PROJECTION_2D:
                break;
            case cc.DIRECTOR_PROJECTION_3D:
                break;
            case cc.DIRECTOR_PROJECTION_CUSTOM:
                this._projectionDelegate && this._projectionDelegate.updateProjection();
                break;
            default:
                cc.log("cocos2d: Director: unrecognized projection")
        }
        this._projection = a
    }, _showStats: function () {
        this._frames++;
        this._accumDt += this._deltaTime;
        this._displayStats && (this._FPSLabel && this._SPFLabel && this._drawsLabel ? (this._accumDt > cc.DIRECTOR_FPS_INTERVAL && (this._SPFLabel.setString(this._secondsPerFrame.toFixed(3)),
            this._frameRate = this._frames / this._accumDt, this._accumDt = this._frames = 0, this._FPSLabel.setString(this._frameRate.toFixed(1)), this._drawsLabel.setString((0 | cc.g_NumberOfDraws).toString())), this._FPSLabel.visit(), this._SPFLabel.visit(), this._drawsLabel.visit()) : this._createStatsLabel());
        cc.g_NumberOfDraws = 0
    }, updateContentScaleFactor: function () {
        this._openGLView.canSetContentScaleFactor() ? (this._openGLView.setContentScaleFactor(this._contentScaleFactor), this._isContentScaleSupported = !0) : cc.log("cocos2d: setContentScaleFactor:'is not supported on this device")
    },
    isSendCleanupToScene: function () {
        return this._sendCleanupToScene
    }, getRunningScene: function () {
        return this._runningScene
    }, getAnimationInterval: function () {
        return this._animationInterval
    }, isDisplayStats: function () {
        return this._displayStats
    }, setDisplayStats: function (a) {
        this._displayStats = a
    }, getSecondsPerFrame: function () {
        return this._secondsPerFrame
    }, getOpenGLView: function () {
        return this._openGLView
    }, isNextDeltaTimeZero: function () {
        return this._nextDeltaTimeZero
    }, isPaused: function () {
        return this._paused
    }, getTotalFrames: function () {
        return this._totalFrames
    },
    getProjection: function () {
        return this._projection
    }, popToRootScene: function () {
        cc.Assert(null != this._runningScene, "A running Scene is needed");
        var a = this._scenesStack.length;
        if (1 == a)this._scenesStack.pop(), this.end(); else {
            for (; 1 < a;) {
                var b = this._scenesStack.pop();
                if (b.isRunning())b.onExit();
                b.cleanup();
                a--
            }
            this._nextScene = this._scenesStack[this._scenesStack.length - 1];
            this._sendCleanupToScene = !1
        }
    }, setWatcherCallbackFun: function (a, b) {
        this._watcherFun = b;
        this._watcherSender = a
    }, getScheduler: function () {
        return this._scheduler
    },
    setScheduler: function (a) {
        this._scheduler != a && (this._scheduler = a)
    }, getActionManager: function () {
        return this._actionManager
    }, setActionManager: function (a) {
        this._actionManager != a && (this._actionManager = a)
    }, getTouchDispatcher: function () {
        return this._touchDispatcher
    }, setTouchDispatcher: function (a) {
        this._touchDispatcher != a && (this._touchDispatcher = a)
    }, getKeyboardDispatcher: function () {
        return this._keyboardDispatcher
    }, setKeyboardDispatcher: function (a) {
        this._keyboardDispatcher = a
    }, getAccelerometer: function () {
        return this._accelerometer
    },
    setAccelerometer: function (a) {
        this._accelerometer != a && (this._accelerometer = a)
    }, getMouseDispatcher: function () {
        return this._mouseDispatcher
    }, setMouseDispatcher: function (a) {
        this._mouseDispatcher != a && (this._mouseDispatcher = a)
    }, _createStatsLabel: function () {
        this._FPSLabel = cc.LabelTTF.create("00.0", "Arial", 18, cc.size(60, 16), cc.TEXT_ALIGNMENT_RIGHT);
        this._SPFLabel = cc.LabelTTF.create("0.000", "Arial", 18, cc.size(60, 16), cc.TEXT_ALIGNMENT_RIGHT);
        this._drawsLabel = cc.LabelTTF.create("000", "Arial", 18, cc.size(60, 16),
            cc.TEXT_ALIGNMENT_RIGHT);
        this._drawsLabel.setPosition(cc.pAdd(cc.p(20, 48), cc.DIRECTOR_STATS_POSITION));
        this._SPFLabel.setPosition(cc.pAdd(cc.p(20, 30), cc.DIRECTOR_STATS_POSITION));
        this._FPSLabel.setPosition(cc.pAdd(cc.p(20, 10), cc.DIRECTOR_STATS_POSITION))
    }, _calculateMPF: function () {
        var a = cc.Time.gettimeofdayCocos2d();
        this._secondsPerFrame = a.tv_sec - this._lastUpdate.tv_sec + (a.tv_usec - this._lastUpdate.tv_usec) / 1E6
    }});
cc.DisplayLinkDirector = cc.Director.extend({invalid: !1, startAnimation: function () {
    this._lastUpdate = cc.Time.gettimeofdayCocos2d();
    this.invalid = !1;
    cc.Application.sharedApplication().setAnimationInterval(this._animationInterval)
}, mainLoop: function () {
    this._purgeDirecotorInNextLoop ? (this._purgeDirecotorInNextLoop = !1, this.purgeDirector()) : this.invalid || this.drawScene()
}, stopAnimation: function () {
    this.invalid = !0
}, setAnimationInterval: function (a) {
    this._animationInterval = a;
    this.invalid || (this.stopAnimation(),
        this.startAnimation())
}});
cc.s_SharedDirector = null;
cc.firstUseDirector = !0;
cc.Director.getInstance = function () {
    cc.firstUseDirector && (cc.firstUseDirector = !1, cc.s_SharedDirector = new cc.DisplayLinkDirector, cc.s_SharedDirector.init());
    return cc.s_SharedDirector
};
cc.firstRun = !0;
cc.defaultFPS = 60;
cc = cc = cc || {};
cc.Camera = cc.Class.extend({_eyeX: null, _eyeY: null, _eyeZ: null, _centerX: null, _centerY: null, _centerZ: null, _upX: null, _upY: null, _upZ: null, _dirty: null, ctor: function () {
    this.restore()
}, description: function () {
    return"<CCCamera | center =(" + this._centerX + "," + this._centerY + "," + this._centerZ + ")>"
}, setDirty: function (a) {
    this._dirty = a
}, getDirty: function () {
    return this._dirty
}, restore: function () {
    this._eyeX = this._eyeY = 0;
    this._eyeZ = cc.Camera.getZEye();
    this._upX = this._centerX = this._centerY = this._centerZ = 0;
    this._upY = 1;
    this._upZ = 0;
    this._dirty = !1
}, locate: function () {
}, setEyeXYZ: function (a, b, c) {
    this._eyeX = a * cc.CONTENT_SCALE_FACTOR;
    this._eyeY = b * cc.CONTENT_SCALE_FACTOR;
    this._eyeZ = c * cc.CONTENT_SCALE_FACTOR;
    this._dirty = !0
}, setCenterXYZ: function (a, b, c) {
    this._centerX = a * cc.CONTENT_SCALE_FACTOR;
    this._centerY = b * cc.CONTENT_SCALE_FACTOR;
    this._centerZ = c * cc.CONTENT_SCALE_FACTOR;
    this._dirty = !0
}, setUpXYZ: function (a, b, c) {
    this._upX = a;
    this._upY = b;
    this._upZ = c;
    this._dirty = !0
}, getEyeXYZ: function () {
}, getCenterXYZ: function () {
}, getUpXYZ: function () {
},
    _DISALLOW_COPY_AND_ASSIGN: function () {
    }});
cc.Camera.getZEye = function () {
    return cc.FLT_EPSILON
};
cc.PRIORITY_SYSTEM = -2147483648;
cc.PRIORITY_NON_SYSTEM = cc.PRIORITY_SYSTEM + 1;
cc.ArrayVerifyType = function (a, b) {
    if (a && 0 < a.length)for (var c = 0; c < a.length; c++)if (!(a[c]instanceof b))return cc.log("element type is wrong!"), !1;
    return!0
};
cc.ArrayRemoveObjectAtIndex = function (a, b) {
    a.splice(b, 1)
};
cc.ArrayRemoveObject = function (a, b) {
    for (var c = 0; c < a.length; c++)a[c] == b && a.splice(c, 1)
};
cc.ArrayRemoveArray = function (a, b) {
    for (var c = 0; c < b.length; c++)cc.ArrayRemoveObject(a, b[c])
};
cc.ArrayGetIndexOfValue = function (a, b) {
    for (var c = 0; c < a.length; c++)if (a[c] == b)return c;
    return-1
};
cc.ArrayAppendObject = function (a, b) {
    a.push(b)
};
cc.ArrayAppendObjectToIndex = function (a, b, c) {
    var d = a.slice(0, c), a = a.slice(c);
    d.push(b);
    return a = d.concat(a)
};
cc.ArrayGetIndexOfObject = function (a, b) {
    for (var c = 0; c < a.length; c++)if (a[c] == b)return c;
    return-1
};
cc.ArrayContainsObject = function (a, b) {
    return-1 != cc.ArrayGetIndexOfObject(a, b)
};
cc.HASH_FIND_INT = function (a, b) {
    if (null == a)return null;
    for (var c = 0; c < a.length; c++)if (a[c].target === b)return a[c];
    return null
};
cc.ListEntry = function (a, b, c, d, e, f) {
    this.prev = a;
    this.next = b;
    this.target = c;
    this.priority = d;
    this.paused = e;
    this.markedForDeletion = f
};
cc.HashUpdateEntry = function (a, b, c, d) {
    this.list = a;
    this.entry = b;
    this.target = c;
    this.hh = d
};
cc.HashSelectorEntry = function (a, b, c, d, e, f, g) {
    this.timers = a;
    this.target = b;
    this.timerIndex = c;
    this.currentTimer = d;
    this.currentTimerSalvaged = e;
    this.paused = f;
    this.hh = g
};
cc.Timer = cc.Class.extend({_interval: 0, _selector: "", _target: null, _elapsed: 0, _runForever: !1, _useDelay: !1, _timesExecuted: 0, _repeat: 0, _delay: 0, ctor: function () {
}, getInterval: function () {
    return this._interval
}, initWithTarget: function (a, b, c, d, e) {
    try {
        return this._target = a, this._selector = b, this._elapsed = -1, this._interval = c || 0, this._delay = e || 0, this._useDelay = 0 < this._delay, this._repeat = null == d ? cc.REPEAT_FOREVER : d, this._runForever = this._repeat == cc.REPEAT_FOREVER, !0
    } catch (f) {
        return!1
    }
}, update: function (a) {
    if (-1 ==
        this._elapsed)this._timesExecuted = this._elapsed = 0; else if (this._runForever && !this._useDelay) {
        if (this._elapsed += a, this._elapsed >= this._interval) {
            if (this._selector)if ("string" == typeof this._selector)this._target[this._selector](this._elapsed); else this._selector.call(this._target, this._elapsed);
            this._elapsed = 0
        }
    } else {
        this._elapsed += a;
        if (this._useDelay) {
            if (this._elapsed >= this._delay) {
                if (this._target && this._selector)if ("string" == typeof this._selector)this._target[this._selector](this._elapsed); else this._selector.call(this._target,
                    this._elapsed);
                this._elapsed -= this._delay;
                this._timesExecuted += 1;
                this._useDelay = !1
            }
        } else if (this._elapsed >= this._interval) {
            if (this._target && this._selector)if ("string" == typeof this._selector)this._target[this._selector](this._elapsed); else this._selector.call(this._target, this._elapsed);
            this._elapsed = 0;
            this._timesExecuted += 1
        }
        this._timesExecuted > this._repeat && cc.Director.getInstance().getScheduler().unscheduleCallbackForTarget(this._target, this._selector)
    }
}});
cc.Timer.timerWithTarget = function (a, b, c) {
    if (2 > arguments)throw Error("timerWithTarget'argument can't is null");
    var d = new cc.Timer;
    2 == arguments.length ? d.initWithTarget(a, b, 0, cc.REPEAT_FOREVER, 0) : d.initWithTarget(a, b, c, cc.REPEAT_FOREVER, 0);
    return d
};
cc._sharedScheduler = null;
cc.Scheduler = cc.Class.extend({_timeScale: 1, _updatesNegList: null, _updates0List: null, _updatesPosList: null, _hashForUpdates: null, _hashForSelectors: null, _currentTarget: null, _currentTargetSalvaged: !1, _updateHashLocked: !1, ctor: function () {
    this._timeScale = 1;
    this._updatesNegList = [];
    this._updates0List = [];
    this._updatesPosList = [];
    this._hashForUpdates = [];
    this._hashForSelectors = [];
    this._currentTarget = null;
    this._updateHashLocked = this._currentTargetSalvaged = !1
}, _removeHashElement: function (a) {
    a.Timer = null;
    a.target =
        null;
    cc.ArrayRemoveObject(this._hashForSelectors, a)
}, _findElementFromArray: function (a, b) {
    for (var c = 0; c < a.length; c++)if (a[c].target == b)return a[c];
    return null
}, _removeUpdateFromHash: function (a) {
    if (a = this._findElementFromArray(this._hashForUpdates, a.target))cc.ArrayRemoveObject(a.list, a.entry), a.entry = null, a.target = null, cc.ArrayRemoveObject(this._hashForUpdates, a)
}, _priorityIn: function (a, b, c, d) {
    d = new cc.ListEntry(null, null, b, c, d, !1);
    if (a) {
        for (var e = !1, f = 0; f < a.length; f++)if (c < a[f].priority) {
            a = cc.ArrayAppendObjectToIndex(a,
                d, f);
            e = !0;
            break
        }
        e || a.push(d)
    } else a = [], a.push(d);
    this._hashForUpdates.push(new cc.HashUpdateEntry(a, d, b, null));
    return a
}, _appendIn: function (a, b, c) {
    c = new cc.ListEntry(null, null, b, 0, c, !1);
    a.push(c);
    this._hashForUpdates.push(new cc.HashUpdateEntry(a, c, b, null))
}, setTimeScale: function (a) {
    this._timeScale = a
}, getTimeScale: function () {
    return this._timeScale
}, update: function (a) {
    this._updateHashLocked = !0;
    1 != this._timeScale && (a *= this._timeScale);
    var b, c;
    for (c = 0; c < this._updatesNegList.length; c++)b = this._updatesNegList[c],
        !b.paused && !b.markedForDeletion && b.target.update(a);
    for (c = 0; c < this._updates0List.length; c++)b = this._updates0List[c], !b.paused && !b.markedForDeletion && b.target.update(a);
    for (c = 0; c < this._updatesPosList.length; c++)b = this._updatesPosList[c], !b.paused && !b.markedForDeletion && b.target.update(a);
    for (c = 0; c < this._hashForSelectors.length; c++) {
        b = this._currentTarget = this._hashForSelectors[c];
        this._currentTargetSalvaged = !1;
        if (!this._currentTarget.paused)for (b.timerIndex = 0; b.timerIndex < b.timers.length; b.timerIndex++)b.currentTimer =
            b.timers[b.timerIndex], b.currentTimerSalvaged = !1, b.currentTimer.update(a), b.currentTimer = null;
        this._currentTargetSalvaged && 0 == this._currentTarget.timers.length && this._removeHashElement(this._currentTarget)
    }
    for (c = 0; c < this._updatesNegList.length; c++)this._updatesNegList[c].markedForDeletion && this._removeUpdateFromHash(this._updatesNegList[c]);
    for (c = 0; c < this._updates0List.length; c++)this._updates0List[c].markedForDeletion && this._removeUpdateFromHash(this._updates0List[c]);
    for (c = 0; c < this._updatesPosList.length; c++)this._updatesPosList[c].markedForDeletion &&
    this._removeUpdateFromHash(this._updatesPosList[c]);
    this._updateHashLocked = !1;
    this._currentTarget = null
}, scheduleCallbackForTarget: function (a, b, c, d, e, f) {
    cc.Assert(b, "scheduler.scheduleCallbackForTarget() Argument callback_fn must be non-NULL");
    cc.Assert(a, "scheduler.scheduleCallbackForTarget() Argument target must be non-NULL");
    var c = c || 0, d = null == d ? cc.REPEAT_FOREVER : d, e = e || 0, f = f || !1, g = cc.HASH_FIND_INT(this._hashForSelectors, a);
    g ? cc.Assert(g.paused == f, "Sheduler.scheduleCallbackForTarget()") : (g = new cc.HashSelectorEntry(null,
        a, 0, null, null, f, null), this._hashForSelectors.push(g));
    if (null == g.timers)g.timers = []; else for (var h = 0; h < g.timers.length; h++)if (f = g.timers[h], b == f._selector) {
        cc.log("CCSheduler#scheduleCallback. Callback already scheduled. Updating interval from:" + f.getInterval().toFixed(4) + " to " + c.toFixed(4));
        f._interval = c;
        return
    }
    f = new cc.Timer;
    f.initWithTarget(a, b, c, d, e);
    g.timers.push(f)
}, scheduleUpdateForTarget: function (a, b, c) {
    var d = cc.HASH_FIND_INT(this._hashForUpdates, a);
    d ? (1 <= cc.COCOS2D_DEBUG && cc.Assert(d.entry.markedForDeletion,
        ""), d.entry.markedForDeletion = !1) : 0 == b ? this._appendIn(this._updates0List, a, c) : 0 > b ? this._updatesNegList = this._priorityIn(this._updatesNegList, a, b, c) : this._updatesPosList = this._priorityIn(this._updatesPosList, a, b, c)
}, unscheduleCallbackForTarget: function (a, b) {
    if (!(null == a || null == b)) {
        var c = cc.HASH_FIND_INT(this._hashForSelectors, a);
        if (null != c)for (var d = 0; d < c.timers.length; d++) {
            var e = c.timers[d];
            if (b == e._selector) {
                e == c.currentTimer && !c.currentTimerSalvaged && (c.currentTimerSalvaged = !0);
                cc.ArrayRemoveObjectAtIndex(c.timers,
                    d);
                c.timerIndex >= d && c.timerIndex--;
                0 == c.timers.length && (this._currentTarget == c ? this._currentTargetSalvaged = !0 : this._removeHashElement(c));
                break
            }
        }
    }
}, unscheduleUpdateForTarget: function (a) {
    null != a && (a = cc.HASH_FIND_INT(this._hashForUpdates, a), null != a && (this._updateHashLocked ? a.entry.markedForDeletion = !0 : this._removeUpdateFromHash(a.entry)))
}, unscheduleAllCallbacksForTarget: function (a) {
    if (null != a) {
        var b = cc.HASH_FIND_INT(this._hashForSelectors, a);
        b && (!b.currentTimerSalvaged && cc.ArrayContainsObject(b.timers,
            b.currentTimer) && (b.currentTimerSalvaged = !0), b.timers.length = 0, this._currentTarget == b ? this._currentTargetSalvaged = !0 : this._removeHashElement(b));
        this.unscheduleUpdateForTarget(a)
    }
}, unscheduleAllCallbacks: function () {
    this.unscheduleAllCallbacksWithMinPriority(cc.PRIORITY_SYSTEM)
}, unscheduleAllCallbacksWithMinPriority: function (a) {
    var b;
    for (b = 0; b < this._hashForSelectors.length; b++)this.unscheduleAllCallbacksForTarget(this._hashForSelectors[b].target);
    if (0 > a)for (b = 0; b < this._updatesNegList.length; b++)this.unscheduleUpdateForTarget(this._updatesNegList[b].target);
    if (0 >= a)for (b = 0; b < this._updates0List.length; b++)this.unscheduleUpdateForTarget(this._updates0List[b].target);
    for (b = 0; b < this._updatesPosList.length; b++)this._updatesPosList[b].priority >= a && this.unscheduleUpdateForTarget(this._updatesPosList[b].target)
}, pauseAllTargets: function () {
    return this.pauseAllTargetsWithMinPriority(cc.PRIORITY_SYSTEM)
}, pauseAllTargetsWithMinPriority: function (a) {
    var b = [], c, d;
    for (c = 0; c < this._hashForSelectors.length; c++)if (d = this._hashForSelectors[c])d.paused = !0, b.push(d.target);
    if (0 > a)for (c = 0; c < this._updatesNegList.length; c++)if (d = this._updatesNegList[c])d.paused = !0, b.push(d.target);
    if (0 >= a)for (c = 0; c < this._updates0List.length; c++)if (d = this._updates0List[c])d.paused = !0, b.push(d.target);
    for (c = 0; c < this._updatesPosList.length; c++)if (d = this._updatesPosList[c])d.paused = !0, b.push(d.target);
    return b
}, resumeTargets: function (a) {
    if (a)for (var b = 0; b < a.length; b++)this.resumeTarget(a[b])
}, pauseTarget: function (a) {
    cc.Assert(null != a, "Scheduler.pauseTarget():entry must be non nil");
    var b =
        cc.HASH_FIND_INT(this._hashForSelectors, a);
    b && (b.paused = !0);
    if (a = cc.HASH_FIND_INT(this._hashForUpdates, a))cc.Assert(null != a.entry, "Scheduler.pauseTarget():entry must be non nil"), a.entry.paused = !0
}, resumeTarget: function (a) {
    cc.Assert(null != a, "");
    var b = cc.HASH_FIND_INT(this._hashForSelectors, a);
    b && (b.paused = !1);
    if (a = cc.HASH_FIND_INT(this._hashForUpdates, a))cc.Assert(null != a.entry, "Scheduler.resumeTarget():entry must be non nil"), a.entry.paused = !1
}, isTargetPaused: function (a) {
    cc.Assert(null != a, "Scheduler.isTargetPaused():target must be non nil");
    return(a = cc.HASH_FIND_INT(this._hashForSelectors, a)) ? a.paused : !1
}});
cc.Loader = cc.Class.extend({resourceCount: 0, loadedResourceCount: 0, timer: 0, isLoadedComplete: function () {
    var a = cc.Loader.getInstance();
    a.loadedResourceCount == a.resourceCount ? a.onload ? a.timer = setTimeout(a.onload, 16) : cc.Assert(0, "cocos2d:no load callback defined") : (a.onloading ? a.timer = setTimeout(a.onloading, 16) : cc.LoaderScene.getInstance().draw(), a.timer = setTimeout(a.isLoadedComplete, 16))
}, onResLoadingErr: function (a) {
    cc.log("cocos2d:Failed loading resource: " + a)
}, onResLoaded: function () {
    this.loadedResourceCount++
},
    getProgressBar: function () {
        var a = this.loadedResourceCount / this.resourceCount;
        return 0 | 100 * a
    }, onload: void 0, onerror: void 0, onloading: void 0, _registerFaceFont: function (a) {
        var b = a.srcArr;
        if (a.srcArr && 0 < b.length) {
            var c = document.createElement("style");
            c.type = "text/css";
            document.body.appendChild(c);
            for (var a = "@font-face { font-family:" + a.fontName + "; src:", d = 0; d < b.length; d++)a += "url('" + encodeURI(b[d].src) + "') format('" + b[d].type + "')", a += d == b.length - 1 ? ";" : ",";
            c.textContent += a + "};"
        }
        cc.Loader.getInstance().onResLoaded()
    },
    preload: function (a) {
        var b = cc.TextureCache.getInstance(), c = cc.AudioEngine.getInstance(), d = cc.SAXParser.getInstance(), e = cc.FileUtils.getInstance();
        this.loadedResourceCount = 0;
        this.resourceCount = a.length;
        for (var f = 0; f < a.length; f++)switch (a[f].type) {
            case "image":
                b.addImage(a[f].src);
                break;
            case "sound":
                c.preloadSound(a[f].src);
                break;
            case "plist":
            case "tmx":
            case "fnt":
                d.preloadPlist(a[f].src);
                break;
            case "tga":
                break;
            case "ccbi":
            case "binary":
                e.preloadBinaryFileData(a[f].src);
                break;
            case "face-font":
                this._registerFaceFont(a[f]);
                break;
            default:
                throw"cocos2d:unknow type : " + a[f].type;
        }
        this.isLoadedComplete()
    }});
cc.Loader.getInstance = function () {
    this._instance || (this._instance = new cc.Loader);
    return this._instance
};
cc.Loader._instance = null;
cc.LoaderScene = cc.Class.extend({_logo: new Image, ctor: function () {
    this._logo.src = s_companyLogo;
    this._logo.width = 160;
    this._logo.height = 200
}, draw: function () {
    var a = (cc.canvas.width - this._logo.width) / 2, b = (cc.canvas.height - this._logo.height) / 2;
    cc.renderContext.clearRect(0, -cc.canvas.height, cc.canvas.width, cc.canvas.height);
    cc.renderContext.fillStyle = "#202020";
    cc.renderContext.fillRect(0, -cc.canvas.height, cc.canvas.width, cc.canvas.height);
    cc.drawingUtil.drawImage(this._logo, cc.p(a, b));
    cc.renderContext.fillStyle =
        "#b2b4b3";
    cc.renderContext.font = "Bold 12px Verdana";
    cc.renderContext.textAlign = "left";
    cc.drawingUtil.fillText("Loading " + cc.Loader.getInstance().getProgressBar() + "%", a + 30, b - 15)
}});
cc.LoaderScene.getInstance = function () {
    this._instance || (this._instance = new cc.LoaderScene);
    return this._instance
};
cc.LoaderScene._instance = null;
cc.DrawingPrimitive = cc.Class.extend({_renderContext: null, setRenderContext: function (a) {
    this._renderContext = a
}, getRenderContext: function () {
    return this._renderContext
}, ctor: function (a) {
    this._renderContext = a
}, drawPoint: function () {
    cc.log("DrawingPrimitive.drawPoint() not implement!")
}, drawPoints: function () {
    cc.log("DrawingPrimitive.drawPoints() not implement!")
}, drawLine: function () {
    cc.log("DrawingPrimitive.drawLine() not implement!")
}, drawPoly: function () {
    cc.log("DrawingPrimitive.drawPoly() not implement!")
},
    drawCircle: function (a, b, c, d, e) {
        if (!("undefined" == d || 0 == d)) {
            for (var f = 2 * Math.PI / d, g = [], h = 0; h <= d; h++) {
                var k = h * f, j = b * Math.cos(k + c) + a.x, k = b * Math.sin(k + c) + a.y, j = cc.p(j * cc.CONTENT_SCALE_FACTOR(), k * cc.CONTENT_SCALE_FACTOR());
                g.push(j)
            }
            e && (a = cc.p(a.x * cc.CONTENT_SCALE_FACTOR(), a.y * cc.CONTENT_SCALE_FACTOR()), g.push(a));
            this.drawPoly(g, d + 2, !0, !1)
        }
    }, drawQuadBezier: function () {
        cc.log("DrawingPrimitive.drawQuadBezier() not implement!")
    }, drawCubicBezier: function () {
        cc.log("DrawingPrimitive.drawCubicBezier() not implement!")
    },
    drawCatmullRom: function () {
        cc.log("DrawingPrimitive.drawCardinalSpline() not implement!")
    }, drawCardinalSpline: function () {
        cc.log("DrawingPrimitive.drawCardinalSpline() not implement!")
    }});
cc.DrawingPrimitiveCanvas = cc.DrawingPrimitive.extend({drawPoint: function (a, b) {
    b || (b = 1);
    var c = cc.p(a.x * cc.CONTENT_SCALE_FACTOR(), a.y * cc.CONTENT_SCALE_FACTOR());
    this._renderContext.beginPath();
    this._renderContext.arc(c.x, -c.y, b * cc.CONTENT_SCALE_FACTOR(), 0, 2 * Math.PI, !1);
    this._renderContext.closePath();
    this._renderContext.fill()
}, drawPoints: function (a, b, c) {
    if (null != a) {
        c || (c = 1);
        this._renderContext.beginPath();
        for (b = 0; b < a.length; b++)this._renderContext.arc(a[b].x * cc.CONTENT_SCALE_FACTOR(), -a[b].y * cc.CONTENT_SCALE_FACTOR(),
            c * cc.CONTENT_SCALE_FACTOR(), 0, 2 * Math.PI, !1);
        this._renderContext.closePath();
        this._renderContext.fill()
    }
}, drawLine: function (a, b) {
    this._renderContext.beginPath();
    this._renderContext.moveTo(a.x * cc.CONTENT_SCALE_FACTOR(), -a.y * cc.CONTENT_SCALE_FACTOR());
    this._renderContext.lineTo(b.x * cc.CONTENT_SCALE_FACTOR(), -b.y * cc.CONTENT_SCALE_FACTOR());
    this._renderContext.closePath();
    this._renderContext.stroke()
}, drawPoly: function (a, b, c, d) {
    "undefined" == d && (d = !1);
    if (null != a) {
        if (3 > a.length)throw Error("Polygon's point must greater than 2");
        b = a[0];
        this._renderContext.beginPath();
        this._renderContext.moveTo(b.x * cc.CONTENT_SCALE_FACTOR(), -b.y * cc.CONTENT_SCALE_FACTOR());
        for (b = 1; b < a.length; b++)this._renderContext.lineTo(a[b].x * cc.CONTENT_SCALE_FACTOR(), -a[b].y * cc.CONTENT_SCALE_FACTOR());
        c && this._renderContext.closePath();
        d ? this._renderContext.fill() : this._renderContext.stroke()
    }
}, drawCircle: function (a, b, c, d, e) {
    this._renderContext.beginPath();
    this._renderContext.arc(0 | a.x, 0 | -a.y, b, -c, -(c - 2 * Math.PI), !1);
    e && this._renderContext.lineTo(0 | a.x,
        0 | -a.y);
    this._renderContext.stroke()
}, drawQuadBezier: function (a, b, c, d) {
    for (var e = [], f = 0, g = 0; g < d; g++) {
        var h = Math.pow(1 - f, 2) * a.x + 2 * (1 - f) * f * b.x + f * f * c.x, k = Math.pow(1 - f, 2) * a.y + 2 * (1 - f) * f * b.y + f * f * c.y;
        e.push(cc.p(h * cc.CONTENT_SCALE_FACTOR(), k * cc.CONTENT_SCALE_FACTOR()));
        f += 1 / d
    }
    e.push(cc.p(c.x * cc.CONTENT_SCALE_FACTOR(), c.y * cc.CONTENT_SCALE_FACTOR()));
    this.drawPoly(e, d + 1, !1, !1)
}, drawCubicBezier: function (a, b, c, d, e) {
    for (var f = [], g = 0, h = 0; h < e; h++) {
        var k = Math.pow(1 - g, 3) * a.x + 3 * Math.pow(1 - g, 2) * g * b.x + 3 * (1 - g) * g * g * c.x +
            g * g * g * d.x, j = Math.pow(1 - g, 3) * a.y + 3 * Math.pow(1 - g, 2) * g * b.y + 3 * (1 - g) * g * g * c.y + g * g * g * d.y;
        f.push(cc.p(k * cc.CONTENT_SCALE_FACTOR(), j * cc.CONTENT_SCALE_FACTOR()));
        g += 1 / e
    }
    f.push(cc.p(d.x * cc.CONTENT_SCALE_FACTOR(), d.y * cc.CONTENT_SCALE_FACTOR()));
    this.drawPoly(f, e + 1, !1, !1)
}, drawCatmullRom: function (a, b) {
    this.drawCardinalSpline(a, 0.5, b)
}, drawCardinalSpline: function (a, b, c) {
    cc.renderContext.strokeStyle = "rgba(255,255,255,1)";
    for (var d = [], e, f, g = 1 / a.length, h = 0; h < c + 1; h++)f = h / c, 1 == f ? (e = a.length - 1, f = 1) : (e = 0 | f / g, f = (f - g * e) /
        g), e = cc.CardinalSplineAt(cc.getControlPointAt(a, e - 1), cc.getControlPointAt(a, e - 0), cc.getControlPointAt(a, e + 1), cc.getControlPointAt(a, e + 2), b, f), d.push(e);
    this.drawPoly(d, c + 1, !1, !1)
}, drawImage: function (a, b, c, d, e) {
    switch (arguments.length) {
        case 2:
            this._renderContext.drawImage(a, b.x, -(b.y + a.height));
            break;
        case 3:
            this._renderContext.drawImage(a, b.x, -(b.y + c.height), c.width, c.height);
            break;
        case 5:
            this._renderContext.drawImage(a, b.x, b.y, c.width, c.height, d.x, -(d.y + e.height), e.width, e.height);
            break;
        default:
            throw Error("Argument must be non-nil");
    }
}, drawStar: function (a, b, c) {
    a = a || this._renderContext;
    c instanceof cc.Color4F && (c = new cc.Color3B(0 | 255 * c.r, 0 | 255 * c.g, 0 | 255 * c.b));
    c = "rgba(" + c.r + "," + c.g + "," + c.b;
    a.fillStyle = c + ",1)";
    var d = b / 10;
    a.beginPath();
    a.moveTo(-b, b);
    a.lineTo(0, d);
    a.lineTo(b, b);
    a.lineTo(d, 0);
    a.lineTo(b, -b);
    a.lineTo(0, -d);
    a.lineTo(-b, -b);
    a.lineTo(-d, 0);
    a.lineTo(-b, b);
    a.closePath();
    a.fill();
    var e = a.createRadialGradient(0, 0, d, 0, 0, b);
    e.addColorStop(0, c + ", 1)");
    e.addColorStop(0.3, c + ", 0.8)");
    e.addColorStop(1, c + ", 0.0)");
    a.fillStyle = e;
    a.beginPath();
    a.arc(0, 0, b - d, 0, cc.PI2, !1);
    a.closePath();
    a.fill()
}, drawColorBall: function (a, b, c) {
    a = a || this._renderContext;
    c instanceof cc.Color4F && (c = new cc.Color3B(0 | 255 * c.r, 0 | 255 * c.g, 0 | 255 * c.b));
    var c = "rgba(" + c.r + "," + c.g + "," + c.b, d = a.createRadialGradient(0, 0, b / 10, 0, 0, b);
    d.addColorStop(0, c + ", 1)");
    d.addColorStop(0.3, c + ", 0.8)");
    d.addColorStop(0.6, c + ", 0.4)");
    d.addColorStop(1, c + ", 0.0)");
    a.fillStyle = d;
    a.beginPath();
    a.arc(0, 0, b, 0, cc.PI2, !1);
    a.closePath();
    a.fill()
}, fillText: function (a, b, c) {
    this._renderContext.fillText(a,
        b, -c)
}});
cc.PI2 = 2 * Math.PI;
cc.ORIENTATION_PORTRAIT = 0;
cc.ORIENTATION_PORTRAIT_UPSIDE_DOWN = 1;
cc.ORIENTATION_LANDSCAPE_LEFT = 2;
cc.ORIENTATION_LANDSCAPE_RIGHT = 3;
cc.CANVAS = 0;
cc.WEBGL = 1;
cc.drawingUtil = null;
cc.renderContext = null;
cc.canvas = null;
cc.gameDiv = null;
cc.renderContextType = cc.CANVAS;
cc.originalCanvasSize = cc.size(0, 0);
window.requestAnimFrame = function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame
}();
window.console || (window.console = {}, window.console.log = function () {
}, window.console.assert = function () {
});
cc.isAddedHiddenEvent = !1;
cc.setup = function (a, b, c) {
    function d() {
        document[e] || cc.Director.getInstance()._resetLastUpdate()
    }

    a = cc.$(a) || cc.$("#" + a);
    if (a.tagName == "CANVAS") {
        b = b || a.width;
        c = c || a.height;
        cc.container = cc.$new("DIV");
        cc.canvas = a;
        cc.canvas.parentNode.insertBefore(cc.container, cc.canvas);
        cc.canvas.appendTo(cc.container);
        cc.container.style.width = (b || 480) + "px";
        cc.container.style.height = (c || 320) + "px";
        cc.container.setAttribute("id", "Cocos2dGameContainer");
        cc.canvas.setAttribute("width", b || 480);
        cc.canvas.setAttribute("height",
            c || 320)
    } else {
        a.tagName != "DIV" && cc.log("Warning: target element is not a DIV or CANVAS");
        b = b || parseInt(a.style.width);
        c = c || parseInt(a.style.height);
        cc.canvas = cc.$new("CANVAS");
        cc.canvas.addClass("gameCanvas");
        cc.canvas.setAttribute("width", b || 480);
        cc.canvas.setAttribute("height", c || 320);
        cc.container = a;
        a.appendChild(cc.canvas);
        cc.container.style.width = (b || 480) + "px";
        cc.container.style.height = (c || 320) + "px"
    }
    cc.container.style.position = "relative";
    cc.container.style.overflow = "hidden";
    cc.container.top = "100%";
    cc.renderContext = cc.canvas.getContext("2d");
    cc.renderContextType = cc.CANVAS;
    if (cc.renderContextType == cc.CANVAS) {
        cc.renderContext.translate(0, cc.canvas.height);
        cc.drawingUtil = new cc.DrawingPrimitiveCanvas(cc.renderContext)
    }
    cc.originalCanvasSize = cc.size(cc.canvas.width, cc.canvas.height);
    cc.log(cc.ENGINE_VERSION);
    cc.setContextMenuEnable(false);
    var e, f;
    if (typeof document.hidden !== "undefined") {
        e = "hidden";
        f = "visibilitychange"
    } else if (typeof document.mozHidden !== "undefined") {
        e = "mozHidden";
        f = "mozvisibilitychange"
    } else if (typeof document.msHidden !==
        "undefined") {
        e = "msHidden";
        f = "msvisibilitychange"
    } else if (typeof document.webkitHidden !== "undefined") {
        e = "webkitHidden";
        f = "webkitvisibilitychange"
    }
    if (typeof document.addEventListener === "undefined" || typeof e === "undefined")cc.isAddedHiddenEvent = false; else {
        cc.isAddedHiddenEvent = true;
        document.addEventListener(f, d, false)
    }
};
cc._isContextMenuEnable = !1;
cc.setContextMenuEnable = function (a) {
    cc._isContextMenuEnable = a;
    cc.canvas.oncontextmenu = cc._isContextMenuEnable ? function () {
    } : function () {
        event.returnValue = false
    }
};
cc.Application = cc.Class.extend({ctor: function () {
    this._animationInterval = 0;
    cc.Assert(!cc._sharedApplication, "CCApplication ctor");
    cc._sharedApplication = this
}, setAnimationInterval: function (a) {
    this._animationInterval = a
}, statusBarFrame: function (a) {
    a && cc.rect(0, 0, 0, 0)
}, run: function () {
    if (!this.applicationDidFinishLaunching())return 0;
    if (window.requestAnimFrame && this._animationInterval == 1 / 60) {
        var a = function () {
            cc.Director.getInstance().mainLoop();
            window.requestAnimFrame(a)
        };
        cc.log(window.requestAnimFrame);
        window.requestAnimFrame(a)
    } else {
        a = function () {
            cc.Director.getInstance().mainLoop()
        };
        setInterval(a, this._animationInterval * 1E3)
    }
}, _animationInterval: null});
cc.Application.sharedApplication = function () {
    cc.Assert(cc._sharedApplication, "sharedApplication");
    return cc._sharedApplication
};
cc.Application.getCurrentLanguage = function () {
    var a = cc.LANGUAGE_ENGLISH, b = navigator.language, b = b.toLowerCase();
    switch (b) {
        case "zh-cn":
            a = cc.LANGUAGE_CHINESE;
            break;
        case "fr":
            a = cc.LANGUAGE_FRENCH;
            break;
        case "it":
            a = cc.LANGUAGE_ITALIAN;
            break;
        case "de":
            a = cc.LANGUAGE_GERMAN;
            break;
        case "es":
            a = cc.LANGUAGE_SPANISH;
            break;
        case "ru":
            a = cc.LANGUAGE_RUSSIAN
    }
    return a
};
cc._sharedApplication = null;
cc.SAXParser = cc.Class.extend({xmlDoc: null, parser: null, xmlList: [], plist: [], parse: function (a) {
    a = this.getList(a);
    window.DOMParser ? (this.parser = new DOMParser, this.xmlDoc = this.parser.parseFromString(a, "text/xml")) : (this.xmlDoc = new ActiveXObject("Microsoft.XMLDOM"), this.xmlDoc.async = "false", this.xmlDoc.loadXML(a));
    null == this.xmlDoc && cc.log("cocos2d:xml " + this.xmlDoc + " not found!");
    a = this.xmlDoc.documentElement;
    if ("plist" != a.tagName)throw"cocos2d:Not a plist file";
    for (var b = null, c = 0, d = a.childNodes.length; c <
        d && !(b = a.childNodes[c], 1 == b.nodeType); c++);
    return this.plist = this._parseNode(b)
}, tmxParse: function (a) {
    a = this.getList(a);
    window.DOMParser ? (this.parser = new DOMParser, this.xmlDoc = this.parser.parseFromString(a, "text/xml")) : (this.xmlDoc = new ActiveXObject("Microsoft.XMLDOM"), this.xmlDoc.async = "false", this.xmlDoc.loadXML(a));
    null == this.xmlDoc && cc.log("cocos2d:xml " + this.xmlDoc + " not found!");
    return this.xmlDoc
}, _parseNode: function (a) {
    var b = null;
    switch (a.tagName) {
        case "dict":
            b = this._parseDict(a);
            break;
        case "array":
            b =
                this._parseArray(a);
            break;
        case "string":
            if (1 == a.childNodes.length)b = a.firstChild.nodeValue; else for (var b = "", c = 0; c < a.childNodes.length; c++)b += a.childNodes[c].nodeValue;
            break;
        case "false":
            b = !1;
            break;
        case "true":
            b = !0;
            break;
        case "real":
            b = parseFloat(a.firstChild.nodeValue);
            break;
        case "integer":
            b = parseInt(a.firstChild.nodeValue, 10)
    }
    return b
}, _parseArray: function (a) {
    for (var b = [], c = 0, d = a.childNodes.length; c < d; c++) {
        var e = a.childNodes[c];
        1 == e.nodeType && b.push(this._parseNode(e))
    }
    return b
}, _parseDict: function (a) {
    for (var b =
    {}, c = null, d = 0, e = a.childNodes.length; d < e; d++) {
        var f = a.childNodes[d];
        1 == f.nodeType && ("key" == f.tagName ? c = f.firstChild.nodeValue : b[c] = this._parseNode(f))
    }
    return b
}, preloadPlist: function (a) {
    a = cc.FileUtils.getInstance().fullPathFromRelativePath(a);
    if (window.XMLHttpRequest) {
        var b = new XMLHttpRequest;
        b.overrideMimeType && b.overrideMimeType("text/xml")
    } else b = new ActiveXObject("Microsoft.XMLHTTP");
    if (null != b) {
        var c = this;
        b.onreadystatechange = function () {
            4 == b.readyState && (b.responseText ? (cc.Loader.getInstance().onResLoaded(),
                c.xmlList[a] = b.responseText, b = null) : cc.Assert("cocos2d:There was a problem retrieving the xml data:" + b.statusText))
        };
        b.open("GET", a, !0);
        b.send(null)
    } else cc.Assert("cocos2d:Your browser does not support XMLHTTP.")
}, getName: function (a) {
    var b = a.lastIndexOf("/", a.length) + 1, c = a.lastIndexOf(".", a.length);
    return a.substring(b, c)
}, getExt: function (a) {
    var b = a.lastIndexOf(".", a.length) + 1;
    return a.substring(b, a.length)
}, getList: function (a) {
    return null != this.xmlList ? this.xmlList[a] : null
}});
cc.SAXParser.getInstance = function () {
    this._instance || (this._instance = new cc.SAXParser);
    return this._instance
};
cc.SAXParser._instance = null;
cc.AppController = cc.Class.extend({didFinishLaunchingWithOptions: function () {
    cc.Application.sharedApplication().run();
    return!0
}, applicationWillResignActive: function () {
    cc.Director.getInstance().pause()
}, applicationDidBecomeActive: function () {
    cc.Director.getInstance().resume()
}, applicationDidEnterBackground: function () {
    cc.Application.sharedApplication().applicationDidEnterBackground()
}, applicationWillEnterForeground: function () {
    cc.Application.sharedApplication().applicationWillEnterForeground()
}, applicationWillTerminate: function () {
}});
cc.AppController.shareAppController = function () {
    null == cc.sharedAppController && (cc.sharedAppController = new cc.AppController);
    cc.Assert(cc.sharedAppController, "shareAppController");
    return cc.sharedAppController
};
cc.sharedAppController = null;
cc.ITEM_SIZE = 32;
cc._fontSize = cc.ITEM_SIZE;
cc._fontName = "Arial";
cc._fontNameRelease = !1;
cc.CURRENT_ITEM = 3233828865;
cc.ZOOM_ACTION_TAG = 3233828866;
cc.NORMAL_TAG = 8801;
cc.SELECTED_TAG = 8802;
cc.DISABLE_TAG = 8803;
cc.MenuItem = cc.Node.extend({_listener: null, _selector: null, _isSelected: !1, _isEnabled: !1, isSelected: function () {
    return this._isSelected
}, setTarget: function (a, b) {
    this._listener = b;
    this._selector = a
}, isEnabled: function () {
    return this._isEnabled
}, setEnabled: function (a) {
    this._isEnabled = a
}, initWithCallback: function (a, b) {
    this.setAnchorPoint(cc.p(0.5, 0.5));
    this._listener = b;
    this._selector = a;
    this._isEnabled = !0;
    this._isSelected = !1;
    return!0
}, rect: function () {
    return cc.rect(this._position.x - this._contentSize.width *
        this._anchorPoint.x, this._position.y - this._contentSize.height * this._anchorPoint.y, this._contentSize.width, this._contentSize.height)
}, selected: function () {
    this._isSelected = !0
}, unselected: function () {
    this._isSelected = !1
}, setCallback: function (a, b) {
    this._listener = b;
    this._selector = a
}, activate: function () {
    if (this._isEnabled)if (this._listener && "string" == typeof this._selector)this._listener[this._selector](this); else this._listener && "function" == typeof this._selector ? this._selector.call(this._listener, this) :
        this._selector(this)
}});
cc.MenuItem.create = function (a, b) {
    var c = new cc.MenuItem;
    c.initWithCallback(b, a);
    return c
};
cc.MenuItemLabel = cc.MenuItem.extend({RGBAProtocol: !0, _disabledColor: new cc.Color3B, getDisabledColor: function () {
    return this._disabledColor
}, setDisabledColor: function (a) {
    this._disabledColor = a
}, _label: null, getLabel: function () {
    return this._label
}, setLabel: function (a) {
    a && (this.addChild(a), a.setAnchorPoint(cc.p(0, 0)), this.setContentSize(a.getContentSize()));
    this._label && this.removeChild(this._label, !0);
    this._label = a
}, _orginalScale: 0, setEnabled: function (a) {
    this._isEnabled != a && (a ? this._label.setColor(this._colorBackup) :
        (this._colorBackup = this._label.getColor(), this._label.setColor(this._disabledColor)));
    this._super(a)
}, setOpacity: function (a) {
    this._label.setOpacity(a)
}, getOpacity: function () {
    return this._label.getOpacity()
}, setColor: function (a) {
    this._label.setColor(a)
}, getColor: function () {
    return this._label.getColor()
}, setOpacityModifyRGB: function () {
}, isOpacityModifyRGB: function () {
}, initWithLabel: function (a, b, c) {
    this.initWithCallback(b, c);
    this._originalScale = 1;
    this._colorBackup = cc.white();
    this._disabledColor = cc.c3b(126,
        126, 126);
    this.setLabel(a);
    return!0
}, setString: function (a) {
    this._label.setString(a);
    this.setContentSize(this._label.getContentSize())
}, activate: function () {
    this._isEnabled && (this.stopAllActions(), this.setScale(this._originalScale), this._super())
}, selected: function () {
    if (this._isEnabled) {
        this._super();
        var a = this.getActionByTag(cc.ZOOM_ACTION_TAG);
        a ? this.stopAction(a) : this._originalScale = this.getScale();
        a = cc.ScaleTo.create(0.1, 1.2 * this._originalScale);
        a.setTag(cc.ZOOM_ACTION_TAG);
        this.runAction(a)
    }
}, unselected: function () {
    if (this._isEnabled) {
        this._super();
        this.stopActionByTag(cc.ZOOM_ACTION_TAG);
        var a = cc.ScaleTo.create(0.1, this._originalScale);
        a.setTag(cc.ZOOM_ACTION_TAG);
        this.runAction(a)
    }
}});
cc.MenuItemLabel.create = function (a, b, c) {
    var d = new cc.MenuItemLabel;
    d.initWithLabel(a, b, c);
    return d
};
cc.MenuItemAtlasFont = cc.MenuItemLabel.extend({initWithString: function (a, b, c, d, e, f, g) {
    cc.Assert(null != a && 0 != a.length, "value length must be greater than 0");
    var h = new cc.LabelAtlas;
    h.initWithString(a, b, c, d, e);
    this.initWithLabel(h, f, g);
    return!0
}});
cc.MenuItemAtlasFont.create = function (a, b, c, d, e, f, g) {
    var h = new cc.MenuItemAtlasFont;
    h.initWithString(a, b, c, d, e, f, g);
    return h
};
cc.MenuItemFont = cc.MenuItemLabel.extend({initWithString: function (a, b, c) {
    cc.Assert(null != a && 0 != a.length, "Value length must be greater than 0");
    this._fontName = cc._fontName;
    this._fontSize = cc._fontSize;
    this.initWithLabel(cc.LabelTTF.create(a, this._fontName, this._fontSize), b, c);
    return!0
}, setFontSize: function (a) {
    this._fontSize = a;
    this._recreateLabel()
}, fontSize: function () {
    return this._fontSize
}, setFontName: function (a) {
    this._fontName = a;
    this._recreateLabel()
}, fontName: function () {
    return this._fontName
}, _recreateLabel: function () {
    this.setLabel(cc.LabelTTF.create(this._label.getString(),
        this._fontName, this._fontSize))
}, _fontSize: 0, _fontName: ""});
cc.MenuItemFont.setFontSize = function (a) {
    cc._fontSize = a
};
cc.MenuItemFont.fontSize = function () {
    return cc._fontSize
};
cc.MenuItemFont.setFontName = function (a) {
    cc._fontNameRelease && (cc._fontName = "");
    cc._fontName = a;
    cc._fontNameRelease = !0
};
cc.MenuItemFont.fontName = function () {
    return cc._fontName
};
cc.MenuItemFont.create = function (a, b, c) {
    var d = new cc.MenuItemFont;
    d.initWithString(a, b, c);
    return d
};
cc.MenuItemSprite = cc.MenuItem.extend({RGBAProtocol: !0, _normalImage: null, getNormalImage: function () {
    return this._normalImage
}, setNormalImage: function (a) {
    this._normalImage != a && (a && (this.addChild(a, 0, cc.NORMAL_TAG), a.setAnchorPoint(cc.p(0, 0))), this._normalImage && this.removeChild(this._normalImage, !0), this._normalImage = a, this.setContentSize(this._normalImage.getContentSize()), this._updateImagesVisibility())
}, _selectedImage: null, getSelectedImage: function () {
    return this._selectedImage
}, setSelectedImage: function (a) {
    this._selectedImage !=
        a && (a && (this.addChild(a, 0, cc.SELECTED_TAG), a.setAnchorPoint(cc.p(0, 0))), this._selectedImage && this.removeChild(this._selectedImage, !0), this._selectedImage = a, this._updateImagesVisibility())
}, _disabledImage: null, getDisabledImage: function () {
    return this._disabledImage
}, setDisabledImage: function (a) {
    this._disabledImage != a && (a && (this.addChild(a, 0, cc.DISABLE_TAG), a.setAnchorPoint(cc.p(0, 0))), this._disabledImage && this.removeChild(this._disabledImage, !0), this._disabledImage = a, this._updateImagesVisibility())
},
    initWithNormalSprite: function (a, b, c, d, e) {
        this.initWithCallback(d, e);
        this.setNormalImage(a);
        this.setSelectedImage(b);
        this.setDisabledImage(c);
        this._normalImage && this.setContentSize(this._normalImage.getContentSize());
        return!0
    }, setColor: function (a) {
        this._normalImage.setColor(a);
        this._selectedImage && this._selectedImage.setColor(a);
        this._disabledImage && this._disabledImage.setColor(a)
    }, getColor: function () {
        return this._normalImage.getColor()
    }, setOpacity: function (a) {
        this._normalImage.setOpacity(a);
        this._selectedImage &&
        this._selectedImage.setOpacity(a);
        this._disabledImage && this._disabledImage.setOpacity(a)
    }, getOpacity: function () {
        return this._normalImage.getOpacity()
    }, selected: function () {
        this._super();
        this._normalImage && (this._disabledImage && this._disabledImage.setVisible(!1), this._selectedImage ? (this._normalImage.setVisible(!1), this._selectedImage.setVisible(!0)) : this._normalImage.setVisible(!0))
    }, unselected: function () {
        this._super();
        this._normalImage && (this._normalImage.setVisible(!0), this._selectedImage && this._selectedImage.setVisible(!1),
            this._disabledImage && this._disabledImage.setVisible(!1))
    }, setEnabled: function (a) {
        this._isEnabled != a && (this._super(a), this._updateImagesVisibility())
    }, setOpacityModifyRGB: function () {
    }, isOpacityModifyRGB: function () {
        return!1
    }, _updateImagesVisibility: function () {
        this._isEnabled ? (this._normalImage && this._normalImage.setVisible(!0), this._selectedImage && this._selectedImage.setVisible(!1), this._disabledImage && this._disabledImage.setVisible(!1)) : this._disabledImage ? (this._normalImage && this._normalImage.setVisible(!1),
            this._selectedImage && this._selectedImage.setVisible(!1), this._disabledImage && this._disabledImage.setVisible(!0)) : (this._normalImage && this._normalImage.setVisible(!0), this._selectedImage && this._selectedImage.setVisible(!1), this._disabledImage && this._disabledImage.setVisible(!1))
    }});
cc.MenuItemSprite.create = function (a, b, c, d, e) {
    var f = arguments.length, a = arguments[0], b = arguments[1], g, h, k, j = new cc.MenuItemSprite;
    5 == f ? (g = arguments[2], k = arguments[3], h = arguments[4]) : 4 == f && "function" === typeof arguments[3] ? (g = arguments[2], k = arguments[3]) : 4 == f && "function" === typeof arguments[2] ? (h = arguments[3], k = arguments[2]) : 2 >= f && (g = arguments[2]);
    j.initWithNormalSprite(a, b, g, k, h);
    return j
};
cc.MenuItemImage = cc.MenuItemSprite.extend({setNormalSpriteFrame: function (a) {
    this.setNormalImage(cc.Sprite.createWithSpriteFrame(a))
}, setSelectedSpriteFrame: function (a) {
    this.setSelectedImage(cc.Sprite.createWithSpriteFrame(a))
}, setDisabledSpriteFrame: function (a) {
    this.setDisabledImage(cc.Sprite.createWithSpriteFrame(a))
}, initWithNormalImage: function (a, b, c, d, e) {
    var f = null, g = null, h = null;
    a && (f = cc.Sprite.create(a));
    b && (g = cc.Sprite.create(b));
    c && (h = cc.Sprite.create(c));
    return this.initWithNormalSprite(f,
        g, h, d, e)
}});
cc.MenuItemImage.create = function (a, b, c, d, e) {
    if (0 == arguments.length)return cc.MenuItemImage.create(null, null, null, null, null);
    if (3 == arguments.length)return cc.MenuItemImage.create(a, b, null, c, null);
    if (4 == arguments.length)return cc.MenuItemImage.create(a, b, null, c, d);
    var f = new cc.MenuItemImage;
    return f.initWithNormalImage(a, b, c, d, e) ? f : null
};
cc.MenuItemToggle = cc.MenuItem.extend({RGBAProtocol: !0, _opacity: 0, getOpacity: function () {
    return this._opacity
}, setOpacity: function (a) {
    this._opacity = a;
    if (this._subItems && 0 < this._subItems.length)for (var b = 0; b < this._subItems.length; b++)this._subItems[b].setOpacity(a)
}, _color: new cc.Color3B, getColor: function () {
    return this._color
}, setColor: function (a) {
    this._color = a;
    if (this._subItems && 0 < this._subItems.length)for (var b = 0; b < this._subItems.length; b++)this._subItems[b].setColor(a)
}, _selectedIndex: 0, getSelectedIndex: function () {
    return this._selectedIndex
},
    setSelectedIndex: function (a) {
        if (a != this._selectedIndex) {
            this._selectedIndex = a;
            (a = this.getChildByTag(cc.CURRENT_ITEM)) && a.removeFromParent(!1);
            a = this._subItems[this._selectedIndex];
            this.addChild(a, 0, cc.CURRENT_ITEM);
            var b = a.getContentSize();
            this.setContentSize(b);
            a.setPosition(cc.p(b.width / 2, b.height / 2))
        }
    }, _subItems: [], getSubItems: function () {
        return this._subItems
    }, setSubItems: function (a) {
        this._subItems = a
    }, initWithItems: function (a) {
        var b = a.length;
        "function" === typeof a[a.length - 2] ? (this.initWithCallback(a[a.length -
            2], a[a.length - 1]), b -= 2) : "function" === typeof a[a.length - 1] ? (this.initWithCallback(a[a.length - 1], null), b -= 1) : this.initWithCallback(null, null);
        this._subItems = [];
        for (var c = 0; c < b; c++)a[c] && this._subItems.push(a[c]);
        this._selectedIndex = cc.UINT_MAX;
        this.setSelectedIndex(0);
        return!0
    }, addSubItem: function (a) {
        this._subItems.push(a)
    }, activate: function () {
        this._isEnabled && this.setSelectedIndex((this._selectedIndex + 1) % this._subItems.length);
        this._super()
    }, selected: function () {
        this._super();
        this._subItems[this._selectedIndex].selected()
    },
    unselected: function () {
        this._super();
        this._subItems[this._selectedIndex].unselected()
    }, setEnabled: function (a) {
        if (this._isEnabled == a && (this._super(a), this._subItems && 0 < this._subItems.length))for (var b = 0; b < this._subItems.length; b++)this._subItems[b].setEnabled(a)
    }, selectedItem: function () {
        return this._subItems[this._selectedIndex]
    }, setOpacityModifyRGB: function () {
    }, isOpacityModifyRGB: function () {
        return!1
    }, onEnter: function () {
        this._super();
        this.setSelectedIndex(this._selectedIndex)
    }});
cc.MenuItemToggle.create = function () {
    var a = new cc.MenuItemToggle;
    a.initWithItems(arguments);
    return a
};
cc.MENU_STATE_WAITING = 0;
cc.MENU_STATE_TRACKING_TOUCH = 1;
cc.MENU_HANDLER_PRIORITY = -128;
cc.DEFAULT_PADDING = 5;
cc.Menu = cc.Layer.extend({RGBAProtocol: !0, _color: new cc.Color3B, getColor: function () {
    return this._color
}, setColor: function (a) {
    this._color = a;
    if (this._children && 0 < this._children.length)for (a = 0; a < this._children.length; a++)this._children[a].setColor(this._color)
}, _opacity: 0, getOpacity: function () {
    return this._opacity
}, setOpacity: function (a) {
    this._opacity = a;
    if (this._children && 0 < this._children.length)for (a = 0; a < this._children.length; a++)this._children[a].setOpacity(this._opacity)
}, _enabled: !1, isEnabled: function () {
    return this._enabled
},
    setEnabled: function (a) {
        this._enabled = a
    }, _selectedItem: null, initWithItems: function (a) {
        var b = [];
        if (a)for (var c = 0; c < a.length; c++)a[c] && b.push(a[c]);
        return this.initWithArray(b)
    }, initWithArray: function (a) {
        if (this.init()) {
            this.setTouchEnabled(!0);
            this._enabled = !0;
            var b = cc.Director.getInstance().getWinSize();
            this.ignoreAnchorPointForPosition(!0);
            this.setAnchorPoint(cc.p(0.5, 0.5));
            this.setContentSize(b);
            this.setPosition(cc.p(b.width / 2, b.height / 2));
            if (a)for (b = 0; b < a.length; b++)this.addChild(a[b], b);
            this._selectedItem =
                null;
            this._state = cc.MENU_STATE_WAITING;
            return!0
        }
        return!1
    }, addChild: function (a, b, c) {
        cc.Assert(a instanceof cc.MenuItem, "Menu only supports MenuItem objects as children");
        this._super(a, b, c)
    }, alignItemsVertically: function () {
        this.alignItemsVerticallyWithPadding(cc.DEFAULT_PADDING)
    }, alignItemsVerticallyWithPadding: function (a) {
        var b = -a;
        if (this._children && 0 < this._children.length)for (var c = 0; c < this._children.length; c++)b += this._children[c].getContentSize().height * this._children[c].getScaleY() + a;
        b /= 2;
        if (this._children &&
            0 < this._children.length)for (c = 0; c < this._children.length; c++)this._children[c].setPosition(cc.p(0, b - this._children[c].getContentSize().height * this._children[c].getScaleY() / 2)), b -= this._children[c].getContentSize().height * this._children[c].getScaleY() + a
    }, alignItemsHorizontally: function () {
        this.alignItemsHorizontallyWithPadding(cc.DEFAULT_PADDING)
    }, alignItemsHorizontallyWithPadding: function (a) {
        var b = -a;
        if (this._children && 0 < this._children.length)for (var c = 0; c < this._children.length; c++)b += this._children[c].getContentSize().width *
            this._children[c].getScaleX() + a;
        b = -b / 2;
        if (this._children && 0 < this._children.length)for (c = 0; c < this._children.length; c++)this._children[c].setPosition(cc.p(b + this._children[c].getContentSize().width * this._children[c].getScaleX() / 2, 0)), b += this._children[c].getContentSize().width * this._children[c].getScaleX() + a
    }, alignItemsInColumns: function () {
        for (var a = [], b = 0; b < arguments.length; b++)a.push(arguments[b]);
        var c = -5, d = 0, e = 0, f = 0, g;
        if (this._children && 0 < this._children.length)for (b = 0; b < this._children.length; b++) {
            cc.Assert(d <
                a.length, "");
            g = a[d];
            cc.Assert(g, "");
            var h = this._children[b].getContentSize().height, e = e >= h || isNaN(h) ? e : h;
            ++f;
            f >= g && (c += e + 5, e = f = 0, ++d)
        }
        cc.Assert(!f, "");
        var k = cc.Director.getInstance().getWinSize(), j = g = e = d = 0, l = 0, c = c / 2;
        if (this._children && 0 < this._children.length)for (b = 0; b < this._children.length; b++) {
            var m = this._children[b];
            0 == g && (g = a[d], l = j = k.width / (1 + g));
            h = m.getContentSize().height;
            e = e >= h || isNaN(h) ? e : h;
            m.setPosition(cc.p(l - k.width / 2, c - m.getContentSize().height / 2));
            l += j;
            ++f;
            f >= g && (c -= e + 5, e = g = f = 0, ++d)
        }
    },
    alignItemsInRows: function () {
        for (var a = [], b = 0; b < arguments.length; b++)a.push(arguments[b]);
        var c = [], d = [], e = -10, f = -5, g = 0, h = 0, k = 0, j;
        if (this._children && 0 < this._children.length)for (b = 0; b < this._children.length; b++) {
            var l = this._children[b];
            cc.Assert(g < a.size(), "");
            j = a[g];
            cc.Assert(j, "");
            var m = l.getContentSize().width, h = h >= m || isNaN(m) ? h : m, f = f + (l.getContentSize().height + 5);
            ++k;
            k >= j && (c.push(h), d.push(f), e += h + 10, h = k = 0, f = -5, ++g)
        }
        cc.Assert(!k, "");
        f = cc.Director.getInstance().getWinSize();
        j = h = g = 0;
        var e = -e / 2, n = 0;
        if (this._children && 0 < this._children.length)for (b = 0; b < this._children.length; b++)if (l = this._children[b], 0 == j && (j = a[g], n = d[g]), m = l.getContentSize().width, h = h >= m || isNaN(m) ? h : m, l.setPosition(cc.p(e + c[g] / 2, n - f.height / 2)), n -= l.getContentSize().height + 10, ++k, k >= j)e += h + 5, h = j = k = 0, ++g
    }, registerWithTouchDispatcher: function () {
        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, cc.MENU_HANDLER_PRIORITY, !0)
    }, onTouchBegan: function (a) {
        if (this._state != cc.MENU_STATE_WAITING || !this._visible || !this._enabled)return!1;
        for (var b = this._parent; null != b; b = b.getParent())if (!b.isVisible())return!1;
        return(this._selectedItem = this._itemForTouch(a)) ? (this._state = cc.MENU_STATE_TRACKING_TOUCH, this._selectedItem.selected(), !0) : !1
    }, onTouchEnded: function () {
        cc.Assert(this._state == cc.MENU_STATE_TRACKING_TOUCH, "[Menu onTouchEnded] -- invalid state");
        this._selectedItem && (this._selectedItem.unselected(), this._selectedItem.activate());
        this._state = cc.MENU_STATE_WAITING
    }, onTouchCancelled: function () {
        cc.Assert(this._state == cc.MENU_STATE_TRACKING_TOUCH,
            "[Menu onTouchCancelled] -- invalid state");
        this._selectedItem && this._selectedItem.unselected();
        this._state = cc.MENU_STATE_WAITING
    }, onTouchMoved: function (a) {
        cc.Assert(this._state == cc.MENU_STATE_TRACKING_TOUCH, "[Menu onTouchMoved] -- invalid state");
        a = this._itemForTouch(a);
        a != this._selectedItem && (this._selectedItem && this._selectedItem.unselected(), (this._selectedItem = a) && this._selectedItem.selected())
    }, onExit: function () {
        this._state == cc.MENU_STATE_TRACKING_TOUCH && (this._selectedItem.unselected(), this._state =
            cc.MENU_STATE_WAITING, this._selectedItem = null);
        this._super()
    }, setOpacityModifyRGB: function () {
    }, isOpacityModifyRGB: function () {
        return!1
    }, _itemForTouch: function (a) {
        a = a.getLocation();
        if (this._children && 0 < this._children.length)for (var b = 0; b < this._children.length; b++)if (this._children[b].isVisible() && this._children[b].isEnabled()) {
            var c = this._children[b].convertToNodeSpace(a), d = this._children[b].rect();
            d.origin = cc.p(0, 0);
            if (cc.Rect.CCRectContainsPoint(d, c))return this._children[b]
        }
        return null
    }, _state: -1,
    setHandlerPriority: function (a) {
        cc.Director.getInstance().getTouchDispatcher().setPriority(a, this)
    }});
cc.Menu.create = function () {
    var a = new cc.Menu;
    if (0 == arguments.length)a.initWithItems(null, null); else if (1 == arguments.length && arguments[0]instanceof Array)return a.initWithArray(arguments[0]), a;
    a.initWithItems(arguments);
    return a
};
cc = cc || {};
cc.AudioEngine = cc.Class.extend({_supportedFormat: [], _soundEnable: !1, _effectList: {}, _muiscList: {}, _soundList: {}, _isMusicPlaying: !1, _playingMusic: null, _effectsVolume: 1, _maxAudioInstance: 10, _capabilities: {mp3: !1, ogg: !1, wav: !1}, ctor: function () {
    this._supportedFormat = [];
    var a = document.createElement("audio");
    a.canPlayType && (this._capabilities.mp3 = "no" != a.canPlayType("audio/mpeg") && "" != a.canPlayType("audio/mpeg"), this._capabilities.ogg = "no" != a.canPlayType('audio/ogg; codecs="vorbis"') && "" != a.canPlayType('audio/ogg; codecs="vorbis"'), this._capabilities.wav =
        "no" != a.canPlayType('audio/wav; codecs="1"') && "" != a.canPlayType('audio/wav; codecs="1"'), this._soundEnable = this._capabilities.mp3 || this._capabilities.ogg || this._capabilities.wav)
}, init: function () {
    this._getSupportedAudioFormat();
    return this._soundEnable
}, preloadSound: function (a) {
    if (this._soundEnable) {
        var b = this._getExtFromFullPath(a), c = this._getPathWithoutExt(a);
        this._checkAudioFormatSupported(b) && !this._soundList.hasOwnProperty(c) && (a = new Audio(a), a.preload = "auto", a.addEventListener("canplaythrough",
            function (a) {
                this.removeEventListener("canplaythrough", arguments.callee, !1)
            }, !1), a.addEventListener("error", function (a) {
            this.removeEventListener("error", arguments.callee, !1);
            cc.Loader.getInstance().onResLoadingErr()
        }, !1), this._soundList[c] = !0, a.load())
    }
    cc.Loader.getInstance().onResLoaded()
}, playMusic: function (a, b) {
    var c = this._getPathWithoutExt(a), d = this._supportedFormat[0];
    this._muiscList.hasOwnProperty(this._playingMusic) && this._muiscList[this._playingMusic].pause();
    this._playingMusic = c;
    this._muiscList.hasOwnProperty(this._playingMusic) ?
        c = this._muiscList[this._playingMusic] : (c = new Audio(c + "." + d), c.preload = "auto", this._muiscList[this._playingMusic] = c, c.addEventListener("playing", function () {
        cc.AudioEngine._instance._isMusicPlaying = !0
    }, !1), c.addEventListener("pause", function () {
        cc.AudioEngine._instance._isMusicPlaying = !1
    }, !1));
    c.loop = b || !1;
    c.play()
}, stopMusic: function (a) {
    if (this._muiscList.hasOwnProperty(this._playingMusic)) {
        var b = this._muiscList[this._playingMusic];
        b.pause();
        b.currentTime = b.duration;
        a && delete this._muiscList[this._playingMusic]
    }
},
    pauseMusic: function () {
        this._muiscList.hasOwnProperty(this._playingMusic) && this._muiscList[this._playingMusic].pause()
    }, resumeMusic: function () {
        this._muiscList.hasOwnProperty(this._playingMusic) && this._muiscList[this._playingMusic].play()
    }, rewindMusic: function () {
        this._muiscList.hasOwnProperty(this._playingMusic) && (this._muiscList[this._playingMusic].currentTime = 0, this._muiscList[this._playingMusic].play())
    }, willPlayMusic: function () {
        return!1
    }, isMusicPlaying: function () {
        return this._isMusicPlaying
    }, getMusicVolume: function () {
        return this._muiscList.hasOwnProperty(this._playingMusic) ?
            this._muiscList[this._playingMusic].volume : 0
    }, setMusicVolume: function (a) {
        this._muiscList.hasOwnProperty(this._playingMusic) && (this._muiscList[this._playingMusic].volume = 1 < a ? 1 : 0 > a ? 0 : a)
    }, playEffect: function (a, b) {
        var c = this._getPathWithoutExt(a), d = this._supportedFormat[0], e = this._getEffectList(c), f;
        if (0 < e.length)for (var g = 0; g < e.length; g++)if (e[g].ended) {
            f = e[g];
            f.currentTime = 0;
            break
        }
        if (!f) {
            if (e.length >= this._maxAudioInstance)return cc.log("Error: " + a + " greater than " + this._maxAudioInstance), c;
            f = new Audio(c +
                "." + d);
            e.push(f)
        }
        b && (f.loop = b);
        f.play();
        return c
    }, getEffectsVolume: function () {
        return this._effectsVolume
    }, setEffectsVolume: function (a) {
        this._effectsVolume = 1 < a ? 1 : 0 > a ? 0 : a;
        var b, c;
        for (c in this._effectList)if (a = this._effectList[c], 0 < a.length)for (var d = 0; d < a.length; d++)b = a[d], b.volume = this._effectsVolume
    }, pauseEffect: function (a) {
        a = this._getPathWithoutExt(a);
        if (this._effectList.hasOwnProperty(a))for (var a = this._effectList[a], b, c = a.length - 1; 0 <= c; c--)b = a[c], b.ended || b.pause()
    }, pauseAllEffects: function () {
        var a,
            b, c;
        for (c in this._effectList) {
            a = this._effectList[c];
            for (var d = 0; d < a.length; d++)b = a[d], b.ended || b.pause()
        }
    }, resumeEffect: function (a) {
        var b, a = this._getPathWithoutExt(a);
        if (this._effectList.hasOwnProperty(a) && (a = this._effectList[a], 0 < a.length))for (var c = 0; c < a.length; c++)b = a[c], b.ended || b.play()
    }, resumeAllEffects: function () {
        var a, b, c;
        for (c in this._effectList)if (a = this._effectList[c], 0 < a.length)for (var d = 0; d < a.length; d++)b = a[d], b.ended || b.play()
    }, stopEffect: function (a) {
        var b, a = this._getPathWithoutExt(a);
        if (this._effectList.hasOwnProperty(a) && (a = this._effectList[a], 0 < a.length))for (var c = 0; c < a.length; c++)b = a[c], b.ended || (b.loop = !1, b.currentTime = b.duration)
    }, stopAllEffects: function () {
        var a, b, c;
        for (c in this._effectList) {
            a = this._effectList[c];
            for (var d = 0; d < a.length; d++)b = a[d], b.ended || (b.loop = !1, b.currentTime = b.duration)
        }
    }, unloadEffect: function (a) {
        var b = this._getPathWithoutExt(a);
        this._effectList.hasOwnProperty(b) && (this.stopEffect(a), delete this._effectList[b])
    }, end: function () {
        this.stopMusic();
        this.stopAllEffects()
    },
    _getEffectList: function (a) {
        this._effectList.hasOwnProperty(a) || (this._effectList[a] = []);
        return this._effectList[a]
    }, _getPathWithoutExt: function (a) {
        var b = a.lastIndexOf(".");
        return-1 != b ? a.substring(0, b) : a
    }, _getExtFromFullPath: function (a) {
        var b = a.lastIndexOf(".");
        return-1 != b ? a.substring(b + 1, a.length) : -1
    }, _checkAudioFormatSupported: function (a) {
        for (var b, c = 0; c < this._supportedFormat.length; c++)if (b = this._supportedFormat[c], b == a)return!0;
        return!1
    }, _getSupportedAudioFormat: function () {
        this._soundEnable && (this._capabilities.mp3 &&
            this._supportedFormat.push("mp3"), this._capabilities.ogg && this._supportedFormat.push("ogg"), this._capabilities.wav && this._supportedFormat.push("wav"))
    }});
cc.AudioEngine._instance = null;
cc.AudioEngine.getInstance = function () {
    this._instance || (this._instance = new cc.AudioEngine, this._instance.init());
    return this._instance
};
var dirResoure = "20913/images/", s_Background = dirResoure + "background.jpg", s_basc = dirResoure + "basc.png", s_basc_2 = dirResoure + "basc_2.png", s_startLayer = dirResoure + "start-layer.jpg", s_gameIcon = dirResoure + "gameIcon.png", s_companyLogo = dirResoure + "companyLogo.png", s_s0 = dirResoure + "s1.png", s_s1 = dirResoure + "s2.png", s_s2 = dirResoure + "s3.png", s_gameWin = dirResoure + "game-win.png", s_point = dirResoure + "point.png", s_startbglayer = dirResoure + "startbg-layer.jpg", s_startbglayer_2 = dirResoure + "startbg-layer_2.jpg", s_hand =
        dirResoure + "hand.png", s_hook = dirResoure + "hook.png", s_pic_0_1 = dirResoure + "pic_0_1.png", s_pic_0_2 = dirResoure + "pic_0_2.png", s_pic_1_1 = dirResoure + "pic_1_1.png", s_pic_1_2 = dirResoure + "pic_1_2.png", s_pic_2_1 = dirResoure + "pic_2_1.png", s_pic_2_2 = dirResoure + "pic_2_2.png", s_pic_3_1 = dirResoure + "pic_3_1.png", s_pic_3_2 = dirResoure + "pic_3_2.png", s_pic_4_1 = dirResoure + "pic_4_1_1.png", s_pic_4_2 = dirResoure + "pic_4_1_2.png", s_pic_5_1 = dirResoure + "pic_4_2_1.png", s_pic_5_2 = dirResoure + "pic_4_2_2.png", s_pic_6_1 = dirResoure + "pic_5_1.png",
    s_pic_6_2 = dirResoure + "pic_5_2.png", s_pic_7_1 = dirResoure + "pic_6_1.png", s_pic_7_2 = dirResoure + "pic_6_2.png", s_pic_man_1 = dirResoure + "pic_man_1.png", s_pic_man_2 = dirResoure + "pic_man_2.png", s_btn_GetFish = dirResoure + "btn_GetFish.png", s_time = dirResoure + "time.png", s_overLayerbg = dirResoure + "overLayerbg.jpg", s_popo = dirResoure + "popo.png", s_pp = dirResoure + "pp.png", s_ss = dirResoure + "ss.png", s_swimmain = dirResoure + "swimmain.png", s_gk = dirResoure + "gk.png", s_box = dirResoure + "box.png", s_ss0 = dirResoure + "ss1.png", s_ss1 = dirResoure +
        "ss2.png", s_bg = dirResoure + "bg.wav", s_bg = dirResoure + "bg.ogg", s_bg = dirResoure + "bg.mp3", g_ressources = [
        {type: "image", src: s_Background},
        {type: "image", src: s_basc},
        {type: "image", src: s_basc_2},
        {type: "image", src: s_startLayer},
        {type: "image", src: s_hand},
        {type: "image", src: s_gameIcon},
        {type: "image", src: s_companyLogo},
        {type: "image", src: s_s0},
        {type: "image", src: s_s1},
        {type: "image", src: s_s2},
        {type: "image", src: s_gameWin},
        {type: "image", src: s_point},
        {type: "image", src: s_startbglayer},
        {type: "image", src: s_startbglayer_2},
        {type: "image", src: s_hook},
        {type: "image", src: s_pic_0_1},
        {type: "image", src: s_pic_0_2},
        {type: "image", src: s_pic_1_1},
        {type: "image", src: s_pic_1_2},
        {type: "image", src: s_pic_2_1},
        {type: "image", src: s_pic_2_2},
        {type: "image", src: s_pic_3_1},
        {type: "image", src: s_pic_3_2},
        {type: "image", src: s_pic_4_1},
        {type: "image", src: s_pic_4_2},
        {type: "image", src: s_pic_5_1},
        {type: "image", src: s_pic_5_2},
        {type: "image", src: s_pic_6_1},
        {type: "image", src: s_pic_6_2},
        {type: "image", src: s_pic_7_1},
        {type: "image", src: s_pic_7_2},
        {type: "image",
            src: s_pic_man_1},
        {type: "image", src: s_pic_man_2},
        {type: "image", src: s_btn_GetFish},
        {type: "image", src: s_time},
        {type: "image", src: s_overLayerbg},
        {type: "image", src: s_popo},
        {type: "image", src: s_pp},
        {type: "image", src: s_ss},
        {type: "image", src: s_swimmain},
        {type: "image", src: s_box},
        {type: "image", src: s_ss0},
        {type: "image", src: s_ss1},
        {type: "sound", src: s_bg}
    ];
var dlog = function (a) {
    document.getElementById("dlog").innerHTML = a
}, pathName = location.pathname, pageName = pathName.substring(pathName.indexOf("20913"), pathName.lenght), GAMESIZE = cc.SizeMake(0, 0), topOffset = 42, overgameStatus = !1, showboxLayerMargin = cc.SizeMake(0, 42), fontsizeS1 = 20, fontsizeS2 = 20, score = 0, overBoxLayermargin = cc.SizeMake(11, 60), fishRodSit = cc.SizeMake(160, 260), fishHookBox = cc.SizeMake(15, 17), menuTopTag = 4, gameRuleTag = 5, menuGetFishTag = 6, overLayerTag = 7, hookState = 0, getSpendMax = 4, fishLineBox = cc.SizeMake(0,
    60), level = 1, levelint = 0, goodsConfigArray = {f0: {pic: "s_pic_0_", rSize: cc.SizeMake(22, 18), speed: 30, speedRandom: 10, getSpend: 50, score: 25}, f1: {pic: "s_pic_1_", rSize: cc.SizeMake(36, 34), speed: 40, speedRandom: 15, getSpend: 25, score: 50}, f2: {pic: "s_pic_2_", rSize: cc.SizeMake(66, 33), speed: 90, speedRandom: 20, getSpend: 18, score: 75}, f3: {pic: "s_pic_3_", rSize: cc.SizeMake(40, 32), speed: 10, speedRandom: 10, getSpend: 15, score: 100}, f4: {pic: "s_pic_4_", rSize: cc.SizeMake(30, 37), speed: 15, speedRandom: 5, getSpend: 50, score: 1}, f5: {pic: "s_pic_5_",
    rSize: cc.SizeMake(15, 19), speed: 15, speedRandom: 5, getSpend: 50, score: 1}, f6: {pic: "s_pic_6_", rSize: cc.SizeMake(79, 37), speed: 50, speedRandom: 10, getSpend: 35, score: 80}, f7: {pic: "s_pic_7_", rSize: cc.SizeMake(79, 37), speed: 60, speedRandom: 10, getSpend: 40, score: 150}}, levelWin = 3, levelTimeArray = [60, 60, 60], levelConfigArray = {lv1: {f0: 0.3, f1: 0.2, f2: 0.15, f3: 0.1, f4: 0.125, f5: 0.125, f6: 0, f7: 0}, lv2: {f0: 0.25, f1: 0.2, f2: 0.15, f3: 0.1, f4: 0.1, f5: 0.1, f6: 0.1, f7: 0}, lv3: {f0: 0.2, f1: 0.2, f2: 0.15, f3: 0.1, f4: 0.075, f5: 0.075, f6: 0.1, f7: 0.1}}, fishNo =
    2, fishCreateTime = 6, NSpeed = 250, addSpeed = 80, minSpeed = 0.01, firstFishNo = 6, myLayer = cc.Layer.extend({useTimeLabeling: 0, _gameStart: !1, _gameFinished: !1, updataState: !0, _runingTime: 0, levelcount: 0, scoreLabel: null, scoreArray: null, tagfishArray: null, init: function () {
    this._super();
    GAMESIZE = cc.Director.getInstance().getWinSize();
    hookState = 0;
    this._gameFinished = this._gameStart = !1;
    this.updataState = !0;
    this.levelcount = level - levelint;
    this.scoreArray = {};
    this.tagfishArray = [];
    this.tagfishArray = [];
    this.scorefishArray = [];
    this.scorefishArray =
        [];
    this.trashArray = [];
    this.trashArray = [];
    var a = this._d_addImage(s_startbglayer, cc.rect(0, 0, 320, 360));
    a.setAnchorPoint(cc.p(0, 1));
    a.setPosition(cc.p(0, 2 * GAMESIZE.height));
    this.addChild(a, 3);
    a = this._d_addImage(s_Background, cc.rect(0, 0, 320, 318));
    a.setAnchorPoint(cc.p(0, 1));
    a.setPosition(cc.p(0, GAMESIZE.height - 42));
    this.addChild(a);
    a = this._d_addImage(s_basc, cc.rect(0, 0, 320, 42));
    a.setAnchorPoint(cc.p(0, 1));
    a.setPosition(cc.p(0, GAMESIZE.height));
    this.addChild(a);
    a = cc.Menu.create();
    a.setPosition(cc.p(0,
        0));
    this.addChild(a);
    a.setTag(menuTopTag);
    a.setEnabled(!1);
    var b = this._d_addImage(s_basc, cc.rect(133, 43, 132, 37)), c = this._d_addImage(s_basc, cc.rect(133, 43, 132, 37)), b = cc.MenuItemSprite.create(b, c, this.restartGame, this);
    b.setAnchorPoint(cc.p(0, 1));
    b.setPosition(cc.p(13, GAMESIZE.height));
    a.addChild(b);
    "20913.html" == pageName ? (b = this._d_addImage(s_basc, cc.rect(133, 81, 131, 37)), c = this._d_addImage(s_basc, cc.rect(133, 81, 131, 37))) : (b = this._d_addImage(s_basc_2, cc.rect(0, 0, 131, 37)), c = this._d_addImage(s_basc_2,
        cc.rect(0, 0, 131, 37)));
    b = cc.MenuItemSprite.create(b, c, this.addAttention, this);
    b.setAnchorPoint(cc.p(0, 1));
    b.setPosition(cc.p(176, GAMESIZE.height));
    a.addChild(b);
    this.showboxLayer = cc.Layer.create();
    this.showboxLayer.setAnchorPoint(0, 1);
    this.showboxLayer.setPosition(cc.p(showboxLayerMargin.width, GAMESIZE.height - showboxLayerMargin.height));
    this.addChild(this.showboxLayer);
    a = cc.LabelTTF.create(this.levelcount + "/" + levelWin, "Arial", fontsizeS1, cc.size(40, 18), cc.TEXT_ALIGNMENT_CENTER);
    a.setAnchorPoint(cc.p(0,
        1));
    a.setPosition(cc.p(0, -12));
    a.setColor(new cc.Color3B(0, 113, 228));
    this.showboxLayer.addChild(a);
    a = this._d_addImage(s_basc, cc.rect(33, 122, 49, 23));
    a.setAnchorPoint(cc.p(0, 1));
    a.setPosition(cc.p(50, -12));
    this.showboxLayer.addChild(a);
    this.scoreLabel = cc.LabelTTF.create(score, "Arial", fontsizeS1, cc.size(120, 18), cc.TEXT_ALIGNMENT_Left);
    this.scoreLabel.setAnchorPoint(cc.p(0, 1));
    this.scoreLabel.setPosition(cc.p(92, -12));
    this.scoreLabel.setColor(new cc.Color3B(0, 113, 228));
    this.showboxLayer.addChild(this.scoreLabel);
    a = this._d_addImage(s_basc, cc.rect(0, 122, 20, 20));
    a.setAnchorPoint(cc.p(0, 1));
    a.setPosition(cc.p(197, -12));
    this.showboxLayer.addChild(a);
    a = this._d_addImage(s_time, cc.rect(0, 0, 82, 14));
    a.setAnchorPoint(cc.p(0, 1));
    a.setPosition(cc.p(219, -15));
    this.showboxLayer.addChild(a);
    this.timebglen = this._d_addImage(s_time, cc.rect(0, 14, 75, 14));
    this.timebglen.setAnchorPoint(cc.p(0, 1));
    this.timebglen.setPosition(cc.p(221, -15));
    this.showboxLayer.addChild(this.timebglen);
    this.useTimeLabeling = cc.LabelTTF.create(levelTimeArray[this.levelcount -
        1], "Arial", fontsizeS1, cc.size(55, 14), cc.TEXT_ALIGNMENT_CENTER);
    this.useTimeLabeling.setAnchorPoint(cc.p(0, 1));
    this.useTimeLabeling.setPosition(cc.p(0, 360));
    this.useTimeLabeling.setColor(new cc.Color3B(0, 113, 228));
    a = cc.Menu.create();
    a.setPosition(cc.p(0, 0));
    this.addChild(a, 2);
    a.setTag(menuGetFishTag);
    a.setEnabled(!1);
    b = this._d_addImage(s_btn_GetFish, cc.rect(0, 0, 50, 30));
    c = this.handFun(1);
    b = cc.MenuItemSprite.create(b, c, this.GetFishFun, this);
    b.setAnchorPoint(cc.p(0, 1));
    b.setPosition(cc.p(10, 41));
    a.addChild(b);
    b = this._d_addImage(s_btn_GetFish, cc.rect(0, 0, 50, 30));
    c = this.handFun(0);
    b = cc.MenuItemSprite.create(b, c, this.GetFishFun, this);
    b.setAnchorPoint(cc.p(0, 1));
    b.setPosition(cc.p(GAMESIZE.width - 60, 41));
    a.addChild(b);
    a = this._d_addImage(s_pic_man_1, cc.rect(0, 0, 50, 50));
    a.setAnchorPoint(0, 1);
    a.setPosition(121, 210);
    this.addChild(a);
    this.createAnimation("s_pic_man_", cc.SizeMake(50, 50), 0.1, 3, 1, a);
    this.addFishFun(0, firstFishNo);
    1 == this.levelcount ? (a = this._d_addImage(s_startLayer), a.setAnchorPoint(cc.p(0, 1)), a.setPosition(cc.p(0,
        GAMESIZE.height)), this.addChild(a, 2, gameRuleTag), this.addfishRodFun()) : (this.addfishRodFun(), this.scheduleOnce(function () {
        this.gameStartInit()
    }, 0.1));
    return!0
}, onTouchBegan: function () {
    null != this.getChildByTag(gameRuleTag) && this.removeChildByTag(gameRuleTag);
    if (1 == this.levelcount && !this._gameStart && !this._gameFinished)return this._gameStart = !0, this.gameStartInit(), cc.AudioEngine.getInstance().playEffect(s_bg, !0), !1;
    if (!0 == overgameStatus)switch (overgameStatus = !1, overStatus) {
        case 3:
            this.overLayerFun(3)
    }
},
    gameStartInit: function () {
        this._gameStart = !0;
        this.getChildByTag(menuTopTag).setEnabled(!0);
        this.splaygoFun();
        this.scheduleOnce(function () {
            this.sobjgo.spriteS.removeFromParent(!0);
            this.schedule(this.timeRecord, 1);
            this.getChildByTag(menuGetFishTag).setEnabled(!0)
        }, 1.5)
    }, sobj: null, splayFun: function () {
        var a = 2;
        this.sobj = {};
        this.schedule(function () {
            this.sobj.spriteS && this.sobj.spriteS.removeFromParent(!0);
            var b = cc.Sprite.createWithTexture(cc.TextureCache.getInstance().addImage(eval("s_s" + a)));
            b.setAnchorPoint(0,
                1);
            b.setPosition(cc.p(GAMESIZE.width / 2 - 25, GAMESIZE.height / 2 - 45));
            this.addChild(b, 2);
            this.sobj = {spriteS: b};
            a--
        }, 1, 2)
    }, sobjgo: null, splaygoFun: function () {
        var a = 1;
        this.sobjgo = {};
        this.schedule(function () {
            this.sobjgo.spriteS && this.sobjgo.spriteS.removeFromParent(!0);
            var b = cc.Sprite.createWithTexture(cc.TextureCache.getInstance().addImage(eval("s_ss" + a)));
            b.setAnchorPoint(0, 1);
            b.setPosition(cc.p(0, GAMESIZE.height / 2 - 45));
            this.addChild(b, 2);
            this.sobjgo = {spriteS: b};
            a--
        }, 0.5, 1)
    }, timeRecord: function (a) {
        this._runingTime +=
            a;
        this.runingTimeInt = parseInt(100 * this._runingTime / 100);
        0 < levelTimeArray[this.levelcount - 1] - this.runingTimeInt && this.timebglen.setScale((levelTimeArray[this.levelcount - 1] - this.runingTimeInt) / levelTimeArray[this.levelcount - 1], 1);
        0 == levelTimeArray[this.levelcount - 1] - this.runingTimeInt && this.updataState && (this.updataState = !1, this.getChildByTag(menuGetFishTag).setEnabled(!1), null != this.handL && this.handL.removeFromParent(!0), null != this.handR && this.handR.removeFromParent(!0), this.unschedule(this.timeRecord),
            this.timebglen.removeFromParent(!0), null != this.sobj.spriteS && this.sobj.spriteS.removeFromParent(!0), this.submitFun());
        if (0 == this.runingTimeInt % fishCreateTime && 0 != this.runingTimeInt && this.runingTimeInt != levelTimeArray[this.levelcount - 1]) {
            this.addFishFun(0, fishNo);
            for (a = 0; a < this.tagfishArray.length; a++)if ("f6" == this.tagfishArray[a].type || "f7" == this.tagfishArray[a].type) {
                this.addFishFun(1, fishNo);
                break
            }
        }
        4 == levelTimeArray[this.levelcount - 1] - this.runingTimeInt && this.splayFun()
    }, runingTimeInt: 0, update: function () {
        return!0
    },
    submitFun: function () {
        this.sloadFun();
        level < levelWin ? this.levelUp() : this.winGame()
    }, sloadLayer: null, sloadFun: function () {
        this.sloadLayer = cc.Layer.create();
        this.addChild(this.sloadLayer);
        var a = 2;
        this.sobj = {};
        this.schedule(function () {
            var b = cc.Sprite.createWithTexture(cc.TextureCache.getInstance().addImage(s_point));
            b.setAnchorPoint(0, 1);
            b.setPosition(cc.p(GAMESIZE.width / 2 + 10 - 25 * a, GAMESIZE.height / 2));
            this.sloadLayer.addChild(b, 2);
            a--
        }, 0.6, 2)
    }, gameEndClearFun: function () {
        this.fishRodLayer.removeFromParent(!0);
        for (var a = 0; a < this.tagfishArray.length; a++)this.tagfishArray[a].Fish.removeFromParent(!0)
    }, levelUp: function () {
        overStatus = 2;
        this.scheduleOnce(function () {
            null != this.sloadLayer && this.sloadLayer.removeFromParent(!0);
            this.overLayerFun(2);
            cc.AudioEngine.getInstance().stopEffect(s_bg)
        }, 2)
    }, levelUpFun: function () {
        this.cleanup();
        level++;
        var a = new myLayerScene;
        cc.Director.getInstance().replaceScene(a);
        cc.AudioEngine.getInstance().playEffect(s_bg, !0)
    }, winGame: function () {
        overStatus = 3;
        this.scheduleOnce(function () {
            null !=
                this.sloadLayer && this.sloadLayer.removeFromParent(!0);
            this.winLayer = cc.Layer.create();
            this.winLayer.setAnchorPoint(cc.p(0, 1));
            this.winLayer.setPosition(cc.p(0, GAMESIZE.height - 2));
            this.addChild(this.winLayer, 3);
            this.winLayer.setTag(gameRuleTag);
            var a = this._d_addImage(s_gameWin);
            a.setAnchorPoint(cc.p(0, 1));
            a.setPosition(cc.p(0, 0));
            this.winLayer.addChild(a);
            overgameStatus = !0;
            cc.AudioEngine.getInstance().stopEffect(s_bg)
        }, 2)
    }, overLayerFun: function (a) {
        this.overLayer = cc.Layer.create();
        this.overLayer.setTag(overLayerTag);
        this.addChild(this.overLayer, 2);
        var b = this._d_addImage(s_overLayerbg, cc.rect(0, 0, 320, 318));
        b.setAnchorPoint(0, 1);
        b.setPosition(0, 0);
        this.overLayer.addChild(b);
        b = cc.Menu.create();
        b.setPosition(cc.p(0, 0));
        this.overLayer.addChild(b, 2);
        if (2 == a) {
            var a = this._d_addImage(s_basc, cc.rect(0, 81, 132, 37)), c = this._d_addImage(s_basc, cc.rect(0, 81, 132, 37)), a = cc.MenuItemSprite.create(a, c, this.levelUpFun, this);
            a.setAnchorPoint(cc.p(0, 1));
            a.setPosition(cc.p(175, 37));
            b.addChild(a)
        }
        a = this._d_addImage(s_basc, cc.rect(133,
            43, 132, 37));
        c = this._d_addImage(s_basc, cc.rect(133, 43, 132, 37));
        a = cc.MenuItemSprite.create(a, c, this.restartGame, this);
        a.setAnchorPoint(cc.p(0, 1));
        a.setPosition(cc.p(15, 37));
        var c = this._d_addImage(s_basc, cc.rect(0, 43, 132, 37)), d = this._d_addImage(s_basc, cc.rect(0, 43, 132, 37)), c = cc.MenuItemSprite.create(c, d, this.challenge, this);
        c.setAnchorPoint(cc.p(0, 1));
        c.setPosition(cc.p(13, GAMESIZE.height));
        if ("20913.html" == pageName)var d = this._d_addImage(s_basc, cc.rect(133, 81, 131, 37)), e = this._d_addImage(s_basc, cc.rect(133,
            81, 131, 37)); else d = this._d_addImage(s_basc_2, cc.rect(0, 0, 131, 37)), e = this._d_addImage(s_basc_2, cc.rect(0, 0, 131, 37));
        d = cc.MenuItemSprite.create(d, e, this.addAttention, this);
        d.setAnchorPoint(cc.p(0, 1));
        d.setPosition(cc.p(176, GAMESIZE.height));
        this.levelcount == levelWin && (b.addChild(a), null != this.getChildByTag(menuTopTag) && this.removeChildByTag(menuTopTag), b = cc.Menu.create(c, d), b.setPosition(cc.p(0, 0)), this.addChild(b), b.setTag(menuTopTag), b.setEnabled(!0));
        b = cc.LabelTTF.create(score, "Arial", fontsizeS1,
            cc.size(200, 18), cc.TEXT_ALIGNMENT_LEFT);
        b.setAnchorPoint(cc.p(0, 1));
        b.setPosition(cc.p(172, 80));
        this.overLayer.addChild(b);
        b = cc.SizeMake(148, 51);
        a = cc.SizeMake(45, b.height / 2 - 2);
        c = cc.SizeMake(32, 3);
        for (d = 0; d < this.scorefishArray.length; d++) {
            var e = parseInt(d % 2), f = parseInt(d / 2), e = e * b.width + a.width, g = f * b.height + a.height, f = e + c.width, h = g + c.height, k = this.scorefishArray[d], j = goodsConfigArray[k].pic;
            scoreType = void 0 == this.scoreArray[k] ? 0 : this.scoreArray[k].score;
            k = this._d_addImage(eval(j + 1));
            k.setPosition(cc.p(e +
                overBoxLayermargin.width, GAMESIZE.height - overBoxLayermargin.height - g));
            this.overLayer.addChild(k);
            e = cc.LabelTTF.create("+ " + scoreType, "Arial", fontsizeS2, cc.size(55, 14), cc.TEXT_ALIGNMENT_LEFT);
            e.setAnchorPoint(0, 1);
            e.setPosition(cc.p(f + overBoxLayermargin.width, GAMESIZE.height - overBoxLayermargin.height - h));
            this.overLayer.addChild(e)
        }
        "undefined" != typeof game_center && game_center.submit_score(score)
    }, restartGame: function () {
        score = 0;
        this.cleanup();
        this._runingTime = 0;
        level = levelint + 1;
        var a = new gameStartScene;
        cc.Director.getInstance().replaceScene(a);
        cc.AudioEngine.getInstance().stopEffect(s_bg)
    }, _d_addImage: function (a, b) {
        return cc.Sprite.createWithTexture(cc.TextureCache.getInstance().addImage(a), b)
    }, onEnter: function () {
        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, 0, !0);
        this._touchEnabled = !0;
        this._super()
    }, onExit: function () {
        cc.Director.getInstance().getTouchDispatcher().removeDelegate(this);
        this._touchEnabled = !1;
        this._super()
    }, challenge: function () {
        cc.log(document.URL.substring(0,
            document.URL.search("20913.html")) + s_gameIcon);
        var a = null;
        "20913.html" == pageName ? a = "20913.html" : a = "20913_1.html";
        if ("undefined" != typeof WeixinJSBridge) {
            var b = "\u9493\u9c7c\u4e4b\u5c9b\u6e38\u620f\u6211\u83b7\u5f97" + score + "\u5206\uff0c\u5feb\u6765\u6311\u6218\u5427\uff01", c = document.URL.substring(0, document.URL.search(a)) + s_gameIcon;
            WeixinJSBridge.invoke("shareTimeline", {title: b, link: document.URL, desc: b, img_url: c})
        }
        cc.log("challenge is runing!" + a)
    }, addAttention: function () {
        var a = null;
        "20913.html" ==
            pageName ? a = "ixyx4399" : a = "ixyx4399";
        "undefined" != typeof WeixinJSBridge && WeixinJSBridge.invoke("addContact", {webtype: "1", username: a}, function (a) {
            "add_contact:ok" == a.err_msg && "undefined" != typeof game_center && game_center.submit_follow_success()
        });
        cc.log("attention is runing!" + a)
    }, createAnimation: function (a, b, c, d, e, f) {
        var g = [], h = new cc.AnimationFrame, k = cc.SpriteFrame.create(eval(a + 1), cc.rect(0, 0, b.width, b.height), !1, cc.p(0, 0), cc.Size(0, 0));
        h.initWithSpriteFrame(k, c);
        k = new cc.AnimationFrame;
        a = cc.SpriteFrame.create(eval(a +
            2), cc.rect(0, 0, b.width, b.height), !1, cc.p(0, 0), cc.Size(0, 0));
        k.initWithSpriteFrame(a, c);
        g.push(h, k);
        c = cc.RepeatForever.create(cc.Animate.create(cc.Animation.create(g, d, e)));
        f.runAction(c)
    }, createFishFun: function (a, b, c) {
        c = this._d_addImage(eval(c + 1));
        c.setPosition(cc.p(a, b));
        return c
    }, FishswimFun: function (a, b, c, d, e) {
        var f = cc.FlipX.create(!0), g = cc.SkewTo.create(0, 1, 0);
        cc.ScaleTo.create(0, -1, 1);
        var h = cc.MoveTo.create(d, cc.p(GAMESIZE.width - b.width / 2, c)), k = cc.FlipX.create(!1), j = cc.SkewTo.create(0, 0, 0);
        cc.ScaleTo.create(0,
            1, 1);
        b = cc.MoveTo.create(d, cc.p(b.width / 2, c));
        a = 0 == a ? cc.Sequence.create(f, g, h, k, j, b) : cc.Sequence.create(b, f, g, h, k, j);
        a = cc.RepeatForever.create(a);
        e.runAction(a);
        return a
    }, scorefishArray: null, trashArray: null, createOneFishFun: function (a) {
        var b = levelConfigArray["lv" + this.levelcount];
        if (0 == a)var c = Math.random();
        if (1 == a) {
            var d = 0, c = 0, e;
            for (e in b) {
                if ("f4" == e)break;
                d += b[e]
            }
            c = d + 2 * b.f4;
            c = Math.random() * (c - d) + d
        }
        e = "f0";
        var d = 0, f = d + b.f0;
        if (c > d && c < f) {
            var g = goodsConfigArray.f0;
            e = "f0"
        }
        d = f;
        f = d + b.f1;
        c > d && c < f && (g = goodsConfigArray.f1,
            e = "f1");
        d = f;
        f = d + b.f2;
        if (c > d && c < f) {
            for (var h = !0, d = 0; d < this.tagfishArray.length; d++)if ("f2" == this.tagfishArray[d].type) {
                g = goodsConfigArray.f0;
                e = "f0";
                h = !1;
                break
            }
            !0 == h && (g = goodsConfigArray.f2, e = "f2")
        }
        d = f;
        f = d + b.f3;
        c > d && c < f && (g = goodsConfigArray.f3, e = "f3");
        d = f;
        f = d + b.f4;
        c > d && c < f && (g = goodsConfigArray.f4, e = "f4");
        d = f;
        f = d + b.f5;
        c > d && c < f && (g = goodsConfigArray.f5, e = "f5");
        d = f;
        f = d + b.f6;
        c > d && c < f && (g = goodsConfigArray.f6, e = "f6");
        d = f;
        f = d + b.f7;
        c > d && c < f && (g = goodsConfigArray.f7, e = "f7");
        var d = Math.random() * g.speedRandom, b =
            g.speed + d, k = this.sToTFun(b, 320), c = g.pic, j = g.rSize, l = parseInt(2 * Math.random()), g = 0 == l ? 0 : GAMESIZE.width, m = 160 * Math.random() + 40;
        if (1 == a) {
            for (var n = [], d = 0; d < this.tagfishArray.length; d++)if ("f6" == this.tagfishArray[d].type || "f7" == this.tagfishArray[d].type) {
                var g = this.tagfishArray[d].Fish, o = g.getBoundingBox(), g = g.getSkewX();
                n.push([o, g])
            }
            o = parseInt(Math.random() * n.length);
            g = n[o][0].x;
            m = n[o][0].y
        }
        var p = null, q = this.createFishFun(g, m, c);
        this.addChild(q);
        this.createAnimation(c, j, 0.1, 3, 1, q);
        if (1 == a) {
            m -= 20;
            20 >
                m && (m = 20);
            1 == n[o][1] ? (l = 0, n = this.sToTFun(b, g), n = cc.MoveTo.create(n, cc.p(j.width / 2, m))) : (l = 1, n = this.sToTFun(b, 320 - g), n = cc.MoveTo.create(n, cc.p(GAMESIZE.width - j.width / 2, m)));
            q.runAction(n);
            var r = this;
            n.stop = function () {
                p = r.FishswimFun(l, j, m, k, q, a)
            }
        } else p = this.FishswimFun(l, j, m, k, q, a);
        n = {type: e, Fish: q, seq: p};
        this.tagfishArray.push(n);
        ("f4" == e || "f5" == e) && this.trashArray.push(n);
        if (0 != this.scorefishArray.length) {
            n = !0;
            for (d = 0; d < this.scorefishArray.length; d++)this.scorefishArray[d] == e && (n = !1);
            n && this.scorefishArray.push(e)
        } else this.scorefishArray.push(e);
        return p
    }, addFishFun: function (a, b) {
        for (var c = 0; c < b; c++)this.createOneFishFun(a)
    }, toAngle: function (a) {
        return 180 * a / Math.PI
    }, toRadian: function (a) {
        return a * Math.PI / 180
    }, fishRodLayer: null, fishLine: null, anA: 0, anA_c: 0, addfishRodFun: function () {
        this.fishRodLayer = cc.LayerColor.create(cc.c4b(255, 255, 255, 255), 2, 0);
        this.fishRodLayer.setPosition(cc.p(fishRodSit.width + 10, fishRodSit.height));
        this.fishRodLayer.setAnchorPoint(cc.p(0, 1));
        this.addChild(this.fishRodLayer, 1);
        var a = fishRodSit.width, b = fishRodSit.height;
        this.anA = this.toAngle(Math.atan(a / (fishLineBox.height + fishHookBox.height)));
        this.anA_c = this.toAngle(Math.atan(a / b));
        this.fishHook = this._d_addImage(s_hook, cc.rect(0, 0, fishHookBox.width, fishHookBox.height));
        this.fishHook.setPosition(cc.p(0, -8));
        this.fishRodLayer.addChild(this.fishHook);
        this.fishRodRotateFun(this.anA, this.fishRodLayer)
    }, seqRodRepeatAction: null, fishRodRotateFun: function (a, b) {
        this.fishRodLayer.setRotation(this.anA);
        var c = cc.RotateTo.create(1, a), d = cc.RotateTo.create(1, -a), c = cc.Sequence.create(d,
            c);
        this.seqRodRepeatAction = cc.RepeatForever.create(c);
        d = this.sToTFun(NSpeed, fishLineBox.height);
        c = cc.MoveTo.create(d, cc.p(fishRodSit.width + 10, fishRodSit.height - fishLineBox.height));
        d = cc.ActionInterval.create(d);
        Spawn_RodInit = cc.Spawn.create(c, d);
        this.fishRodLayer.runAction(Spawn_RodInit);
        var e = this;
        d.update = function () {
            var a = e.fishRodLayer.getPositionY();
            e.fishRodLayer.changeHeight(fishRodSit.height - a)
        };
        d.stop = function () {
            b.runAction(e.seqRodRepeatAction)
        }
    }, fishObjSprite: null, fishObjW: 0, fishObjH: 0,
    fishLineCurH_lc: 0, anACur: 0, hitFish: null, swimmWidth: 0, getSwimmainFun: function (a, b) {
        var c = this.fishHook.getBoundingBoxToWorld();
        c.width = 13;
        c.height = 6;
        c.x = c.x + c.width - 3;
        c.y = c.y + c.height + 0;
        var d = this.hitFish.type, e = this.hitFish.Fish;
        e.getBoundingBox();
        var f = e.getSkewX(), d = goodsConfigArray[d];
        e.removeFromParent(!0);
        var g = this._d_addImage(s_swimmain, cc.rect(0, 0, 79, 37));
        g.setPosition(cc.p(c.x, c.y - d.rSize.width / 2 + c.height));
        this.addChild(g);
        e = this._d_addImage(a, b);
        this.addChild(e);
        this.hitFish.Fish = e;
        this.swimmWidth =
            b.width;
        lax = this.swimmWidth / 2 * Math.sin(this.toRadian(this.anACur));
        lby = this.swimmWidth / 2 * Math.cos(this.toRadian(this.anACur));
        var h = this.fishHook.getBoundingBoxToWorld().x + 12 - lax + 3, k = this.fishHook.getBoundingBoxToWorld().y + 13 - lby + 3;
        e.setPosition(cc.p(h, k));
        h = g.getBoundingBox();
        if (1 == f) {
            var k = cc.FlipY.create(!0), j = cc.FlipX.create(!0);
            e.setRotation(-90 + this.anACur)
        } else k = cc.FlipY.create(!0), j = cc.FlipX.create(!1), e.setRotation(90 + this.anACur);
        e = cc.Spawn.create(k, j);
        d = this.sToTFun(d.getSpend, h.height +
            37);
        h = cc.MoveTo.create(d, cc.p(c.x, -37));
        c = cc.ActionInterval.create(d);
        d = cc.Spawn.create(h, c);
        e = cc.Sequence.create(e, d);
        g.runAction(e);
        e.stop = function () {
            g.removeFromParent(!0)
        };
        var l = this;
        c.update = function (a) {
            var b = g.getBoundingBox(), c = 1 == f ? b.x + 68 : b.x + 10, b = b.y + 20;
            popoTime = (210 - b) / 100;
            if (Math.random() > a && 0.8 < Math.random()) {
                var d = l._d_addImage(s_popo);
                d.setPosition(cc.p(c, b));
                l.addChild(d);
                a = cc.MoveTo.create(popoTime, cc.p(c - 20 + 40 * Math.random(), Math.random() * (210 - b) + b));
                c = cc.ScaleTo.create(popoTime, 3,
                    3);
                a = cc.Spawn.create(c, a);
                c = cc.CallFunc.create(function () {
                    d.removeFromParent(!0)
                });
                a = cc.Sequence.create(a, c);
                d.runAction(a)
            }
        }
    }, hitAllBackSpeed: 0, hitAllL: 0, checkFish: function () {
        if (!(0 >= this.tagfishArray.length)) {
            var a = this.fishHook.getBoundingBoxToWorld();
            a.width = fishHookBox.width;
            a.height = 9;
            a.x = a.x + a.width - 3;
            a.y = a.y + a.height + 0;
            for (var b = 0; b < this.tagfishArray.length; b++) {
                this.hitFish = this.tagfishArray[b];
                var c = this.hitFish.type, d = this.hitFish.Fish, e = this.hitFish.seq, f = d.getBoundingBox(), g = d.getSkewX(),
                    h = goodsConfigArray[c];
                if ("f3" != c && "f7" != c) {
                    var k = goodsConfigArray[c], j = k.rSize.height;
                    f.x += k.rSize.width / 2;
                    f.y += j / 2
                }
                k = 0;
                if ("f3" == c) {
                    var k = 1, l = cc.rect(0, 0, 12, 12);
                    1 == g ? (l.x = f.x + 13, f.x += 28) : (l.x = f.x + 27, f.x += 10);
                    f.width = 16;
                    f.height = 15;
                    l.y = f.y + 17;
                    f.y += 23
                }
                "f7" == c && (k = 1, l = cc.rect(0, 0, 24, 12), 1 == g ? (l.x = f.x + 34, f.x += 59) : (l.x = f.x + 45, f.x += 22), f.width = 18, f.height = 18, l.y = f.y + 24, f.y += 27);
                if (1 == k && cc.rectIntersectsRect(a, l) && !0 != cc.rectIntersectsRect(a, f)) {
                    this.fishRodLayer.stopAction(this.Spawn_RodGo);
                    this.ssY = l.y;
                    this.ssX = l.x;
                    c = [0, 0, 15, -10, -15];
                    d = [0, 10, 15, 5, 15];
                    for (b = 0; b < c.length; b++)this.ssFun(0.3, c[b], d[b]);
                    a = this.fishRodLayer.getPositionY();
                    b = NSpeed;
                    a = fishRodSit.height - a;
                    b = this.sToTFun(b, a);
                    this.GetbackFun(b);
                    return!1
                }
                if (cc.rectIntersectsRect(a, f)) {
                    this.handPlayFun();
                    this.tagfishArray.splice(b, 1);
                    hookState = 2;
                    this.fishRodLayer.stopAction(this.Spawn_RodGo);
                    a = this.fishRodLayer.getPositionY();
                    b = h.getSpend;
                    a = fishRodSit.height - a;
                    this.hitAllBackSpeed = b = this.sToTFun(b, a);
                    this.hitAllL = a;
                    d.stopAction(e);
                    lax = h.rSize.width /
                        2 * Math.sin(this.toRadian(this.anACur));
                    lby = h.rSize.width / 2 * Math.cos(this.toRadian(this.anACur));
                    if ("f6" == c || "f7" == c)lax = this.swimmWidth / 2 * Math.sin(this.toRadian(this.anACur)), lby = this.swimmWidth / 2 * Math.cos(this.toRadian(this.anACur));
                    e = this.fishHook.getBoundingBoxToWorld().x + 12 - lax + 3;
                    h = this.fishHook.getBoundingBoxToWorld().y + 13 - lby + 3;
                    d.setPosition(cc.p(e, h));
                    "f6" == c || "f7" == c ? ("f7" == c ? (c = s_gk, d = cc.rect(0, 0, 32, 17)) : (c = s_pp, d = cc.rect(0, 0, 34, 15)), this.getSwimmainFun(c, d)) : 1 == g ? d.setRotation(-90 + this.anACur) :
                        d.setRotation(90 + this.anACur);
                    this.GetbackFun(b);
                    return!1
                }
            }
        }
    }, Spawn_RodGo: null, handFun: function (a) {
        var b = cc.Layer.create(), c = this._d_addImage(s_hand, cc.rect(0, 0, 75, 66));
        1 == a ? (c.setPosition(cc.p(6, 1)), c.setScale(-1, 1)) : c.setPosition(-6, 1);
        a = this._d_addImage(s_btn_GetFish, cc.rect(0, 30, 50, 30));
        b.addChild(c, 3);
        b.addChild(a);
        b.setPosition(25, 16);
        return b
    }, handPlayObjFun: function (a) {
        var b = this._d_addImage(s_hand, cc.rect(0, 0, 75, 66));
        1 == a ? (b.setScale(-1, 1), b.setPosition(0, 27)) : b.setPosition(279, 28);
        return b
    },
    handL: null, handR: null, handPlayFun: function () {
        this.handL = this.handFun(1);
        this.handL.setPosition(35, 27);
        this.addChild(this.handL, 3);
        this.handR = this.handFun(0);
        this.handR.setPosition(285, 27);
        this.addChild(this.handR, 3);
        var a = cc.DelayTime.create(0.1), b = cc.Show.create(), c = cc.Hide.create(), d = cc.Show.create(), e = cc.Hide.create();
        this.handL.runAction(c);
        var f = this;
        c.stop = function () {
            var c = cc.Sequence.create(a, b);
            f.handL.runAction(c)
        };
        b.stop = function () {
            var b = cc.Sequence.create(a, c);
            f.handL.runAction(b)
        };
        this.handR.runAction(d);
        e.stop = function () {
            var b = cc.Sequence.create(a, d);
            f.handR.runAction(b)
        };
        d.stop = function () {
            var b = cc.Sequence.create(a, e);
            f.handR.runAction(b)
        }
    }, GetFishFun: function () {
        var a = this;
        switch (hookState) {
            case 0:
                this.fishRodLayer.stopAllActions();
                hookState = 1;
                this.anACur = this.fishRodLayer.getRotation();
                this.anACur <= this.anA_c && this.anACur >= -this.anA_c && (this.fishLineCurH_lc = Math.abs(fishRodSit.height / Math.cos(this.toRadian(this.anACur))) - fishHookBox.height);
                if (this.anACur >= this.anA_c && this.anACur <= this.anA) {
                    var b =
                        fishRodSit.width;
                    this.fishLineCurH_lc = Math.abs(b / Math.sin(this.toRadian(this.anACur))) - fishHookBox.height + 10
                }
                this.anACur >= -this.anA && this.anACur <= -this.anA_c && (b = fishRodSit.width, this.fishLineCurH_lc = Math.abs(b / Math.sin(this.toRadian(this.anACur))) - fishHookBox.height - 10);
                var c = this.sToTFun(NSpeed, this.fishLineCurH_lc), b = cc.MoveTo.create(c, cc.p(fishRodSit.width + 10, fishRodSit.height - this.fishLineCurH_lc)), c = cc.ActionInterval.create(c);
                this.Spawn_RodGo = cc.Spawn.create(b, c);
                this.fishRodLayer.runAction(this.Spawn_RodGo);
                a = this;
                c.update = function () {
                    var b = a.fishRodLayer.getPositionY();
                    a.fishRodLayer.changeHeight(fishRodSit.height - b);
                    a.checkFish()
                };
                c.stop = function () {
                    var b = a.sToTFun(NSpeed, a.fishLineCurH_lc);
                    a.GetbackFun(b)
                };
                break;
            case 2:
                b = this.hitFish.Fish, b.getBoundingBox(), b.getSkewX(), this.fishRodLayer.stopAction(this.Spawn_RodBack), b = this.hitAllBackSpeed, c = a.fishRodLayer.getPositionY(), b = (fishRodSit.height - c - addSpeed) * b / this.hitAllL, 0 > b && (b = minSpeed), a.GetbackFun(b)
        }
    }, Spawn_RodBack: null, GetbackFun: function (a) {
        var b =
            cc.MoveTo.create(a, cc.p(fishRodSit.width + 10, fishRodSit.height)), a = cc.ActionInterval.create(a);
        this.Spawn_RodBack = cc.Spawn.create(b, a);
        this.fishRodLayer.runAction(this.Spawn_RodBack);
        var c = this;
        if (2 == hookState) {
            var d = this.hitFish.type, e = this.hitFish.Fish;
            e.getBoundingBox();
            e.getSkewX();
            var f = goodsConfigArray[d]
        }
        a.update = function () {
            var a = c.fishRodLayer.getPositionY();
            c.fishRodLayer.changeHeight(fishRodSit.height - a);
            if (2 == hookState) {
                a = c.fishHook.getBoundingBoxToWorld();
                a.width = 13;
                a.height = 6;
                a.x = a.x +
                    a.width - 3;
                a.y = a.y + a.height + 0;
                lax = f.rSize.width / 2 * Math.sin(c.toRadian(c.anACur));
                lby = f.rSize.width / 2 * Math.cos(c.toRadian(c.anACur));
                if ("f6" == d || "f7" == d)lax = c.swimmWidth / 2 * Math.sin(c.toRadian(c.anACur)), lby = c.swimmWidth / 2 * Math.cos(c.toRadian(c.anACur));
                var a = c.fishHook.getBoundingBoxToWorld().x + 12 - lax + 3, b = c.fishHook.getBoundingBoxToWorld().y + 13 - lby + 3;
                e.setPosition(cc.p(a, b))
            }
        };
        a.stop = function () {
            2 == hookState && c.GetbackEndFun();
            c.GetbackfishRodFun();
            hookState = 0
        }
    }, hitTrashFun: function () {
        if (!(0 >= this.trashArray.length)) {
            var a =
                this.fishHook.getBoundingBoxToWorld();
            a.width = 13;
            a.height = 6;
            a.x = a.x + a.width - 3;
            a.y = a.y + a.height + 0;
            var b = this.hitFish.type, c = this.hitFish.Fish, d = c.getBoundingBox();
            c.getSkewX();
            var e = goodsConfigArray[b];
            if (!("f4" == b || "f5" == b)) {
                lax = e.rSize.width / 2 * Math.sin(this.toRadian(this.anACur));
                lby = e.rSize.width / 2 * Math.cos(this.toRadian(this.anACur));
                if ("f6" == b || "f7" == b)lax = this.swimmWidth / 2 * Math.sin(this.toRadian(game.anACur)), lby = this.swimmWidth / 2 * Math.cos(this.toRadian(game.anACur));
                this.fishHook.getBoundingBoxToWorld();
                this.fishHook.getBoundingBoxToWorld();
                for (b = 0; b < this.trashArray.length; b++)e = this.trashArray[b].Fish.getBoundingBox(), cc.rectIntersectsRect(a, e) && (hookState = 1, e = this.sToTFun(NSpeed, d.height + 37), e = cc.MoveTo.create(e, cc.p(a.x, -37)), e = cc.Sequence.create(e), c.runAction(e), e.stop = function () {
                    c.removeFromParent(!0)
                })
            }
        }
    }, GetbackEndFun: function () {
        null != this.handL && (this.handL.stopAllActions(), this.handL.removeFromParent(!0));
        null != this.handR && (this.handR.stopAllActions(), this.handR.removeFromParent(!0));
        var a =
            this.hitFish.type, b = this.hitFish.Fish;
        b.getBoundingBox();
        b.getSkewX();
        var c = goodsConfigArray[a];
        b.removeFromParent(!0);
        b = c.score;
        score += b;
        this.scoreLabel.setString(score);
        void 0 == this.scoreArray[a] ? this.scoreArray[a] = {score: b} : (c = this.scoreArray[a].score, this.scoreArray[a].score = c + b);
        null != d && d.removeFromParent(!0);
        var d = cc.LabelTTF.create("+  " + b + "\u5206", "Arial", 16, cc.size(320, 18), cc.TEXT_ALIGNMENT_LEFT);
        d.setAnchorPoint(cc.p(0, 1));
        d.setPosition(cc.p(186, 262));
        d.setColor(new cc.Color3B(255, 65, 0));
        this.addChild(d);
        this.scheduleOnce(function () {
            d != null && d.removeFromParent(true)
        }, 0.5)
    }, GetbackfishRodFun: function () {
        this.fishRodRotateFun(this.anA, this.fishRodLayer)
    }, ppX: 0, ppY: 0, popoFun: function (a, b, c) {
        var d = this._d_addImage(s_popo);
        this.addChild(d);
        d.setPosition(cc.p(b, c));
        b = cc.MoveTo.create(a, cc.p(b, 210));
        a = cc.ScaleTo.create(a, 2, 2);
        a = cc.Spawn.create(a, b);
        b = cc.CallFunc.create(function () {
            d.removeFromParent(!0)
        });
        a = cc.Sequence.create(a, b);
        d.runAction(a)
    }, ssX: 0, ssY: 0, ssFun: function (a, b, c) {
        var d = this._d_addImage(s_ss);
        this.addChild(d);
        d.setPosition(cc.p(this.ssX, this.ssY));
        b = cc.MoveTo.create(a, cc.p(this.ssX + b, this.ssY + c));
        a = cc.ScaleTo.create(a, 1, 1);
        a = cc.Spawn.create(a, b);
        b = cc.CallFunc.create(function () {
            d.removeFromParent(!0)
        });
        a = cc.Sequence.create(a, b);
        d.runAction(a)
    }, sToTFun: function (a, b) {
        return b / a
    }}), myLayerScene = cc.Scene.extend({onEnter: function () {
    this._super();
    var a = new myLayer;
    a.init();
    this.addChild(a)
}});
var durationTime = 0.7, startlayer = cc.Layer.extend({startgamelayer: null, init: function () {
    this._super();
    GAMESIZE = cc.Director.getInstance().getWinSize();
    this.startgamelayer = cc.Layer.create();
    this.addChild(this.startgamelayer);
    var a = cc.Menu.create();
    this.startgamelayer.addChild(a, 3);
    a.setPosition(cc.p(0, 0));
    var b = cc.Sprite.createWithTexture(cc.TextureCache.getInstance().addImage(s_startbglayer));
    b.setAnchorPoint(cc.p(0, 0));
    this.startgamelayer.addChild(b);
    var b = this._d_addImage(s_startbglayer, cc.rect(100,
        283, 130, 42)), c = this._d_addImage(s_startbglayer, cc.rect(100, 283, 130, 42)), b = cc.MenuItemSprite.create(b, c, this.changeScene, this);
    b.setAnchorPoint(cc.p(0, 1));
    b.setPosition(cc.p(100, GAMESIZE.height - 283));
    a.addChild(b, 5);
    "20913.html" == pageName ? (b = this._d_addImage(s_startbglayer, cc.rect(62, 142, 198, 53)), c = this._d_addImage(s_startbglayer, cc.rect(62, 142, 198, 53))) : (b = this._d_addImage(s_startbglayer_2, cc.rect(0, 0, 198, 53)), c = this._d_addImage(s_startbglayer_2, cc.rect(0, 0, 198, 53)));
    b = cc.MenuItemSprite.create(b,
        c, this.attentionUs, this);
    b.setAnchorPoint(cc.p(0, 1));
    b.setPosition(cc.p(62, GAMESIZE.height - 142));
    a.addChild(b, 5);
    b = this._d_addImage(s_startbglayer, cc.rect(70, 213, 202, 55));
    c = this._d_addImage(s_startbglayer, cc.rect(70, 213, 202, 55));
    b = cc.MenuItemSprite.create(b, c, this.moreGameFun, this);
    b.setAnchorPoint(cc.p(0, 1));
    b.setPosition(cc.p(70, GAMESIZE.height - 213));
    a.addChild(b, 5)
}, _d_addImage: function (a, b) {
    return cc.Sprite.createWithTexture(cc.TextureCache.getInstance().addImage(a), b)
}, moreGameFun: function () {
    window.location.href =
        "http://news.4399.com/weixin/4399/"
}, changeScene: function () {
    cc.log("the change scene is clicked");
    var a = new myLayerScene;
    cc.Director.getInstance().replaceScene(cc.TransitionMoveInB.create(durationTime, a))
}, attentionUs: function () {
    var a = null;
    "20913.html" == pageName ? a = "ixyx4399" : a = "ixyx4399";
    cc.log("attention is runing now!" + a);
    "undefined" != typeof WeixinJSBridge && WeixinJSBridge.invoke("addContact", {webtype: "1", username: a}, function (a) {
        "add_contact:ok" == a.err_msg && "undefined" != typeof game_center &&
        game_center.submit_follow_success()
    })
}, intoMore: function () {
    cc.log("get more is runing!")
}}), gameStartScene = cc.Scene.extend({onEnter: function () {
    this._super();
    var a = new startlayer;
    this.addChild(a);
    a.init()
}});
var cocos2dApp = cc.Application.extend({config: document.ccConfig, ctor: function (a) {
    this._super();
    this.startScene = a;
    cc.COCOS2D_DEBUG = this.config.COCOS2D_DEBUG;
    cc.initDebugSetting();
    cc.setup(this.config.tag);
    cc.Loader.getInstance().onloading = function () {
        cc.LoaderScene.getInstance().draw()
    };
    cc.Loader.getInstance().onload = function () {
        cc.AppController.shareAppController().didFinishLaunchingWithOptions()
    };
    cc.Loader.getInstance().preload(g_ressources)
}, applicationDidFinishLaunching: function () {
    var a = cc.Director.getInstance();
    a.setAnimationInterval(1 / this.config.frameRate);
    a.runWithScene(new this.startScene);
    return!0
}}), myApp = new cocos2dApp(gameStartScene);