// src/index.ts
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
var PhaseData = function PhaseData(ctor, state, parent) {
    "use strict";
    _class_call_check(this, PhaseData);
    this.ctor = ctor;
    this.state = state;
    this.parent = parent;
};
var Phase = /*#__PURE__*/ function() {
    "use strict";
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
    "use strict";
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
export { Phase, PhaseData, Runner };
