import 'trendmicro-ui/dist/css/trendmicro-ui.css';
import '@trendmicro/react-buttons/dist/react-buttons.css';
import 'rc-slider/dist/rc-slider.css';
import { Button } from '@trendmicro/react-buttons';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Slider from 'rc-slider';
import Navbar from './Navbar';
import Section from './Section';
import Repeatable from '../src';

const Progress = ({ min = 0, max = 100, now = 0, className, style, ...props }) => (
    <div
        {...props}
        className={cx('progress', className)}
        style={{
            ...style,
            margin: '12px 0',
            fontSize: 20,
            lineHeight: '2rem'
        }}
    >
        <div
            className="progress-bar bg-info"
            style={{
                height: '2rem',
                lineHeight: '2rem',
                width: `${now}%`
            }}
            role="progressbar"
            aria-valuenow={now}
            aria-valuemin={min}
            aria-valuemax={max}
        >
            {now}%
        </div>
    </div>
);

Progress.propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    now: PropTypes.number
};

class App extends PureComponent {
    state = {
        enterDelay: 500,
        intervalDelay: 50,
        pressing1: false,
        pressing2: false,
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

    resetValue = () => {
        this.setState({
            pressing1: false,
            pressing2: false,
            value: 0
        });
    };

    render() {
        const name = 'React Repeatable';
        const url = 'https://github.com/trendmicro-frontend/react-repeatable';

        return (
            <div>
                <Navbar name={name} url={url} />
                <div className="container-fluid" style={{ padding: '20px 20px 0' }}>
                    <div className="row">
                        <div className="col-md-12">
                            <Section className="row-sm-4">
                                <div style={{ marginBottom: 12 }}>
                                    <label>
                                        Enter delay: {this.state.enterDelay} ms
                                    </label>
                                    <div>
                                        <Slider
                                            min={0}
                                            max={2000}
                                            step={10}
                                            value={this.state.enterDelay}
                                            onChange={(value) => {
                                                this.setState({ enterDelay: value });
                                            }}
                                        />
                                    </div>
                                </div>
                                <div style={{ marginBottom: 24 }}>
                                    <label>
                                        Interval delay: {this.state.intervalDelay} ms
                                    </label>
                                    <div>
                                        <Slider
                                            min={10}
                                            max={1000}
                                            step={10}
                                            value={this.state.intervalDelay}
                                            onChange={(value) => {
                                                this.setState({ intervalDelay: value });
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
                                    enterDelay={Number(this.state.enterDelay) || 500}
                                    intervalDelay={Number(this.state.intervalDelay) || 50}
                                    onRelease={this.resetValue}
                                >
                                    <Button
                                        btnStyle={this.state.pressing1 ? 'danger' : 'primary'}
                                        onClick={this.increaseValue('pressing1', 1)}
                                    >
                                        {this.state.pressing1 ? 'Pressing... (1x)' : 'Press Me (1x)'}
                                    </Button>
                                    <Button
                                        btnStyle={this.state.pressing2 ? 'danger' : 'primary'}
                                        onClick={this.increaseValue('pressing2', 5)}
                                    >
                                        {this.state.pressing2 ? 'Pressing... (5x)' : 'Press Me (5x)'}
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
