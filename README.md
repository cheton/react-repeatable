# react-repeatable [![build status](https://travis-ci.org/cheton/react-repeatable.svg?branch=master)](https://travis-ci.org/cheton/react-repeatable) [![Coverage Status](https://coveralls.io/repos/github/cheton/react-repeatable/badge.svg?branch=master)](https://coveralls.io/github/cheton/react-repeatable?branch=master)

[![NPM](https://nodei.co/npm/react-repeatable.png?downloads=true&stars=true)](https://nodei.co/npm/react-repeatable/)

A press and hold wrapper component that can trigger hold action multiple times while holding down.

Demo: https://cheton.github.io/react-repeatable

## Installation

```
npm install --save react-repeatable
```

## Usage

```js
<Repeatable
    style={{ display: 'inline-block' }}
    repeatDelay={500}
    repeatInterval={32}
    onPress{(event) => {
        // Callback fired when the mousedown or touchstart event is triggered.
    }}
    onHoldStart={() => {
        // Callback fired once before the first hold action.
    }}
    onHold={() => {
        // Callback fired mutiple times while holding down.
    }}
    onHoldEnd={() => {
        // Callback fired once after the last hold action.
    }}
    onRelease={(event) => {
        // Callback fired when the mouseup, touchcancel, or touchend event is triggered.
    }}
>
    <button type="button">
        Press Me
    </button>
</Repeatable>
```

## API

### Sequence of Events

#### Hold action is occurred
onPress -> onHoldStart -> onHold (once or more) -> onHoldEnd -> onRelease

#### Hold action is not occurred
onPress -> onRelease

### Properties

Name | Type | Default | Description
:--- | :--- | :------ | :----------
componentClass | element | 'div' | A custom element for this component.
disabled | Boolean | false | Set it to true to disable event actions.
repeatDelay | Number | 500 | The time (in milliseconds) to wait before the first hold action is being triggered.
repeatInterval | Number | 32 | The time interval (in milliseconds) on how often to trigger a hold action.
repeatCount | Number | 0 | The number of times the hold action will take place. A zero value will disable the repeat counter.
onPress | Function(event) | | Callback fired when the mousedown or touchstart event is triggered.
onHoldStart | Function() | | Callback fired once before the first hold action.
onHold | Function() | | Callback fired mutiple times while holding down.
onHoldEnd | Function() | | Callback fired once after the last hold action.
onRelease | Function(event) | | Callback fired when the mouseup, touchcancel, or touchend event is triggered.

## License

MIT
