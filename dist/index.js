"use strict";
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = function(target, all) {
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = function(to, from, except, desc) {
    if (from && (typeof from === "undefined" ? "undefined" : _type_of(from)) === "object" || typeof from === "function") {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            var _loop = function() {
                var key = _step.value;
                if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
                    get: function() {
                        return from[key];
                    },
                    enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
                });
            };
            for(var _iterator = __getOwnPropNames(from)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)_loop();
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
    return to;
};
var __toCommonJS = function(mod) {
    return __copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
};
// src/index.ts
var src_exports = {};
__export(src_exports, {
    Phase: function() {
        return Phase;
    },
    PhaseData: function() {
        return PhaseData;
    },
    Runner: function() {
        return Runner;
    }
});
module.exports = __toCommonJS(src_exports);
var PhaseData = function PhaseData(ctor, state, parent) {
    _class_call_check(this, PhaseData);
    this.ctor = ctor;
    this.state = state;
    this.parent = parent;
};
var Phase = /*#__PURE__*/ function() {
    function Phase(state, transition, parent) {
        var _this = this;
        _class_call_check(this, Phase);
        this._state = state;
        this._transition = function(newPhase) {
            transition(_this, newPhase);
        };
        this.parent = parent;
    }
    _create_class(Phase, [
        {
            key: "onEnter",
            value: function onEnter() {}
        },
        {
            key: "onExit",
            value: function onExit() {}
        },
        {
            key: "handleEvent",
            value: function handleEvent(event) {
                return false;
            }
        },
        {
            key: "state",
            get: function get() {
                return this._state;
            }
        }
    ]);
    return Phase;
}();
var Runner = /*#__PURE__*/ function() {
    function Runner(initialPhase) {
        var _this = this;
        _class_call_check(this, Runner);
        this._transition = function(caller, newPhase) {
            if (_this._isAncestor(caller, _this._currentPhase)) {
                _this._currentPhase.onExit();
                _this._currentPhase = new newPhase.ctor(newPhase.state, _this._transition, newPhase.parent);
                _this._currentPhase.onEnter();
            }
        };
        this._currentPhase = new initialPhase.ctor(initialPhase.state, this._transition, initialPhase.parent);
        this._currentPhase.onEnter();
    }
    _create_class(Runner, [
        {
            /** Returns true if 'a' and 'b' is the same or if 'a' is an ancestor of 'b'. */ key: "_isAncestor",
            value: function _isAncestor(a, b) {
                var isAncestor = false;
                var phase = b;
                while(!isAncestor && phase){
                    isAncestor = phase === a;
                    phase = b.parent;
                }
                return isAncestor;
            }
        },
        {
            key: "handleEvent",
            value: function handleEvent(event) {
                var phase = this._currentPhase;
                while(phase && !phase.handleEvent(event)){
                    phase = this._currentPhase.parent;
                }
            }
        }
    ]);
    return Runner;
}();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
    Phase: Phase,
    PhaseData: PhaseData,
    Runner: Runner
});
