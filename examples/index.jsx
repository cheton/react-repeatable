import 'trendmicro-ui/dist/css/trendmicro-ui.css';
import '@trendmicro/react-buttons/dist/react-buttons.css';
import 'rc-slider/dist/rc-slider.css';
import { Button } from '@trendmicro/react-buttons';
import cx from 'classnames';
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Slider from 'rc-slider';
import Navbar from './Navbar';
import Section from './Section';
import Progress from './Progress';
import Repeatable from '../src';

class App extends PureComponent {
    state = {
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

    increaseValue = (key, incr = 1) => (event) => {
        if (this.state.value < 100) {
            this.setState(state => ({
                [key]: true,
                value: state.value + incr
            }));
        }
    };

    render() {
        const name = 'React Repeatable';
        const url = 'https://github.com/cheton/react-repeatable';
        const {
            button1,
            button2
        } = this.state;

        return (
            <div>
                <Navbar name={name} url={url} />
                <div className="container-fluid" style={{ padding: '20px 20px 0' }}>
                    <div className="row">
                        <div className="col-md-12">
                            <Section className="row-sm-5">
                                <div style={{ marginBottom: 12 }}>
                                    <label>
                                        Repeat delay: {this.state.repeatDelay} ms
                                    </label>
                                    <div>
                                        <Slider
                                            min={0}
                                            max={1000}
                                            step={10}
                                            value={this.state.repeatDelay}
                                            onChange={(value) => {
                                                this.setState({ repeatDelay: value });
                                            }}
                                        />
                                    </div>
                                </div>
                                <div style={{ marginBottom: 24 }}>
                                    <label>
                                        Repeat interval: {this.state.repeatInterval} ms
                                    </label>
                                    <div>
                                        <Slider
                                            min={10}
                                            max={1000}
                                            step={10}
                                            value={this.state.repeatInterval}
                                            onChange={(value) => {
                                                this.setState({ repeatInterval: value });
                                            }}
                                        />
                                    </div>
                                </div>
                                <div style={{ marginBottom: 24 }}>
                                    <label>
                                        Repeat count: {this.state.repeatCount || 'N/A'}
                                    </label>
                                    <div>
                                        <Slider
                                            min={0}
                                            max={100}
                                            step={1}
                                            value={this.state.repeatCount}
                                            onChange={(value) => {
                                                this.setState({ repeatCount: value });
                                            }}
                                        />
                                    </div>
                                </div>
                                <Progress
                                    min={0}
                                    max={100}
                                    now={this.state.value}
                                />
                                <Repeatable
                                    style={{ display: 'inline-block', marginLeft: 0 }}
                                    repeatDelay={Number(this.state.repeatDelay)}
                                    repeatInterval={Number(this.state.repeatInterval)}
                                    repeatCount={Number(this.state.repeatCount)}
                                    onPress={() => {
                                        console.log('[1] onPress');
                                        this.setState({
                                            button1: {
                                                pressed: true,
                                                holding: false
                                            }
                                        });
                                    }}
                                    onHoldStart={() => {
                                        console.log('[1] onHoldStart');
                                        this.setState({
                                            value: 0
                                        });
                                    }}
                                    onHold={() => {
                                        console.log('[1] onHold');
                                        this.setState(state => ({
                                            button1: {
                                                pressed: true,
                                                holding: true
                                            },
                                            value: Math.min(state.value + 1, 100)
                                        }));
                                    }}
                                    onHoldEnd={() => {
                                        console.log('[1] onHoldEnd');
                                        this.setState({
                                            value: 0
                                        });
                                    }}
                                    onRelease={() => {
                                        console.log('[1] onRelease');
                                        this.setState({
                                            button1: {
                                                pressed: false,
                                                holding: false
                                            }
                                        });
                                    }}
                                >
                                    <Button
                                        btnStyle={cx({
                                            'default': !button1.holding,
                                            'emphasis': button1.pressed && button1.holding
                                        })}
                                    >
                                        {!button1.pressed && 'Press Me (1x)'}
                                        {button1.pressed && !button1.holding && 'Pressing... (1x)'}
                                        {button1.pressed && button1.holding && 'Holding (1x)'}
                                    </Button>
                                </Repeatable>
                                <Repeatable
                                    style={{ display: 'inline-block', marginLeft: 8 }}
                                    repeatDelay={Number(this.state.repeatDelay)}
                                    repeatInterval={Number(this.state.repeatInterval / 5)}
                                    repeatCount={Number(this.state.repeatCount)}
                                    onPress={() => {
                                        console.log('[2] onPress');
                                        this.setState({
                                            button2: {
                                                pressed: true,
                                                holding: false
                                            }
                                        });
                                    }}
                                    onHoldStart={() => {
                                        console.log('[2] onHoldStart');
                                        this.setState({
                                            value: 0
                                        });
                                    }}
                                    onHold={() => {
                                        console.log('[2] onHold');
                                        this.setState(state => ({
                                            button2: {
                                                pressed: true,
                                                holding: true
                                            },
                                            value: Math.min(state.value + 1, 100)
                                        }));
                                    }}
                                    onHoldEnd={() => {
                                        console.log('[2] onHoldEnd');
                                        this.setState({
                                            value: 0
                                        });
                                    }}
                                    onRelease={(event) => {
                                        console.log('[2] onRelease');
                                        this.setState({
                                            button2: {
                                                pressed: false,
                                                holding: false
                                            }
                                        });
                                    }}
                                >
                                    <Button
                                        btnStyle={cx({
                                            'default': !button2.holding,
                                            'emphasis': button2.pressed && button2.holding
                                        })}
                                    >
                                        {!button2.pressed && 'Press Me (5x)'}
                                        {button2.pressed && !button2.holding && 'Pressing... (5x)'}
                                        {button2.pressed && button2.holding && 'Holding (5x)'}
                                    </Button>
                                </Repeatable>
                            </Section>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('container')
);
