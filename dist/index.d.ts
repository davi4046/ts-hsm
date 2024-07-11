interface Constructor<T> {
    new (...args: any[]): T;
}
declare class PhaseData<TEvent, TState> {
    ctor: Constructor<Phase<TEvent, TState>>;
    state: TState;
    parent?: Phase<TEvent, any> | undefined;
    constructor(ctor: Constructor<Phase<TEvent, TState>>, state: TState, parent?: Phase<TEvent, any> | undefined);
}
declare abstract class Phase<TEvent, TState> {
    protected _state: TState;
    protected _transition: (newPhase: PhaseData<TEvent, any>) => void;
    readonly parent?: Phase<TEvent, any>;
    constructor(state: TState, transition: (caller: Phase<TEvent, any>, newPhase: PhaseData<TEvent, any>) => void, parent?: Phase<TEvent, any>);
    onEnter(): void;
    onExit(): void;
    handleEvent(event: TEvent): boolean;
    get state(): Readonly<TState>;
}
declare class Runner<TEvent> {
    private _currentPhase;
    constructor(initialPhase: PhaseData<TEvent, any>);
    private _transition;
    /** Returns true if 'a' and 'b' is the same or if 'a' is an ancestor of 'b'. */
    private _isAncestor;
    handleEvent(event: TEvent): void;
}

export { Phase, PhaseData, Runner };
