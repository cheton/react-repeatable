```jsx
import 'react-bootstrap-buttons/dist/react-bootstrap-buttons.css';
import 'rc-slider/dist/rc-slider.css';
import cx from 'classnames';
import { Button } from 'react-bootstrap-buttons';
import Slider from 'rc-slider';
import Progress from '../components/Progress';

initialState = {
    repeatDelay: Repeatable.defaultProps.repeatDelay,
    repeatInterval: Repeatable.defaultProps.repeatInterval,
    repeatCount: 0,
    button1: {
        pressed: false,
        holding: false
    },
    button2: {
        pressed: false,
        holding: false
    },
    value: 0
};

const RepeatableButton = ({ onClick, ...props }) => (
    <Repeatable
        tag={Button}
        onHold={onClick}
        onRelease={onClick}
        {...props}
    />
);

<div>
    <div style={{ marginBottom: 12 }}>
        <label>
            Repeat delay: {state.repeatDelay} ms
        </label>
        <div>
            <Slider
                min={0}
                max={1000}
                step={10}
                value={state.repeatDelay}
                onChange={(value) => {
                    setState({ repeatDelay: value });
                }}
            />
        </div>
    </div>
    <div style={{ marginBottom: 24 }}>
        <label>
            Repeat interval: {state.repeatInterval} ms
        </label>
        <div>
            <Slider
                min={10}
                max={1000}
                step={10}
                value={state.repeatInterval}
                onChange={(value) => {
                    setState({ repeatInterval: value });
                }}
            />
        </div>
    </div>
    <div style={{ marginBottom: 24 }}>
        <label>
            Repeat count: {state.repeatCount || 'N/A'}
        </label>
        <div>
            <Slider
                min={0}
                max={100}
                step={1}
                value={state.repeatCount}
                onChange={(value) => {
                    setState({ repeatCount: value });
                }}
            />
        </div>
    </div>
    <div style={{ marginBottom: 8 }}>
        <Progress
            min={0}
            max={100}
            now={state.value}
            style={{ height: '1.5rem' }}
        />
    </div>
    <Repeatable
        tag={Button}
        btnStyle={cx({
            'default': !state.button1.pressed,
            'info': state.button1.pressed && !state.button1.holding,
            'primary': state.button1.pressed && state.button1.holding
        })}
        repeatDelay={Number(state.repeatDelay)}
        repeatInterval={Number(state.repeatInterval)}
        repeatCount={Number(state.repeatCount)}
        onPress={() => {
            console.log('[1] onPress');
            setState({
                button1: {
                    pressed: true,
                    holding: false
                }
            });
        }}
        onHoldStart={() => {
            console.log('[1] onHoldStart');
            setState({
                value: 0
            });
        }}
        onHold={() => {
            console.log('[1] onHold');
            setState(state => ({
                button1: {
                    pressed: true,
                    holding: true
                },
                value: Math.min(state.value + 1, 100)
            }));
        }}
        onHoldEnd={() => {
            console.log('[1] onHoldEnd');
            setState({
                value: 0
            });
        }}
        onRelease={() => {
            console.log('[1] onRelease');
            setState({
                button1: {
                    pressed: false,
                    holding: false
                }
            });
        }}
    >
        {!state.button1.pressed && 'Press Me (1x)'}
        {state.button1.pressed && !state.button1.holding && 'Pressing... (1x)'}
        {state.button1.pressed && state.button1.holding && 'Holding (1x)'}
    </Repeatable>
    <Repeatable
        tag={Button}
        btnStyle={cx({
            'default': !state.button2.pressed,
            'info': state.button2.pressed && !state.button2.holding,
            'primary': state.button2.pressed && state.button2.holding
        })}
        repeatDelay={Number(state.repeatDelay)}
        repeatInterval={Number(state.repeatInterval / 5)}
        repeatCount={Number(state.repeatCount)}
        onPress={() => {
            console.log('[2] onPress');
            setState({
                button2: {
                    pressed: true,
                    holding: false
                }
            });
        }}
        onHoldStart={() => {
            console.log('[2] onHoldStart');
            setState({
                value: 0
            });
        }}
        onHold={() => {
            console.log('[2] onHold');
            setState(state => ({
                button2: {
                    pressed: true,
                    holding: true
                },
                value: Math.min(state.value + 1, 100)
            }));
        }}
        onHoldEnd={() => {
            console.log('[2] onHoldEnd');
            setState({
                value: 0
            });
        }}
        onRelease={(event) => {
            console.log('[2] onRelease');
            setState({
                button2: {
                    pressed: false,
                    holding: false
                }
            });
        }}
    >
        {!state.button2.pressed && 'Press Me (5x)'}
        {state.button2.pressed && !state.button2.holding && 'Pressing... (5x)'}
        {state.button2.pressed && state.button2.holding && 'Holding (5x)'}
    </Repeatable>
</div>
```
