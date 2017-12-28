# react-repeatable [![build status](https://travis-ci.org/cheton/react-repeatable.svg?branch=master)](https://travis-ci.org/cheton/react-repeatable) [![Coverage Status](https://coveralls.io/repos/github/cheton/react-repeatable/badge.svg?branch=master)](https://coveralls.io/github/cheton/react-repeatable?branch=master)

[![NPM](https://nodei.co/npm/@trendmicro/react-repeatable.png?downloads=true&stars=true)](https://nodei.co/npm/@trendmicro/react-repeatable/)

A press and hold wrapper component that can trigger action multiple times while holding down a clickable element.

Demo: https://cheton.github.io/react-repeatable

## Installation

```
npm install --save react-repeatable
```

## Usage

```js
<Repeatable
    enterDelay={500}
    intervalDelay={50}
    onPress{(event) => {
        // Callback fired when the mousedown or touchstart event is triggered.
    }}
    onRelease={(event) => {
        // Callback fired when the mouseup, touchcancel, or touchend event is triggered.
    }}
>
    <button
        type="button"
        onClick={(event) => {
            // The click action will be triggered multiple times.
        }}
    >
        Press Me
    </button>
</Repeatable>
```

## API

### Properties

Name | Type | Default | Description
:--- | :--- | :------ | :----------
enterDelay | Number | 500 | The time (in milliseconds) to wait before the action is being triggered.
intervalDelay | Number | 50 | The intervals (in milliseconds) on how often to trigger the action.
onPress | Function | | Callback fired when the mousedown or touchstart event is triggered.
onRelease | Function | | Callback fired when the mouseup, touchcancel, or touchend event is triggered.

## License

MIT
