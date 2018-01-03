import chainedFunction from 'chained-function';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

class Repeatable extends PureComponent {
    static propTypes = {
        // Set it to true to disable event actions.
        disabled: PropTypes.bool,

        // The time (in milliseconds) to wait before the first hold action is being triggered.
        repeatDelay: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),

        // The time interval (in milliseconds) on how often to trigger a hold action.
        repeatInterval: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),

        // The number of times the hold action will take place. A zero value will disable the repeat counter.
        repeatCount: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),

        // Callback fired when the mousedown or touchstart event is triggered.
        onPress: PropTypes.func,

        // Callback fired once before the first hold action.
        onHoldStart: PropTypes.func,

        // Callback fired mutiple times while holding down.
        onHold: PropTypes.func,

        // Callback fired once after the last hold action.
        onHoldEnd: PropTypes.func,

        // Callback fired when the mouseup, touchcancel, or touchend event is triggered.
        onRelease: PropTypes.func
    };
    static defaultProps = {
        disabled: false,
        repeatDelay: 500,
        repeatInterval: 32,
        repeatCount: 0
    };

    repeatDelayTimer = null;
    repeatIntervalTimer = null;
    repeatAmount = 0;

    acquireTimer = () => {
        const repeatDelay = Math.max(Number(this.props.repeatDelay) || 0, 0);
        const repeatInterval = Math.max(Number(this.props.repeatInterval) || 0, 0);
        const repeatCount = Math.max(Number(this.props.repeatCount) || 0, 0);

        this.repeatAmount = 0;
        this.releaseTimer();

        this.repeatDelayTimer = setTimeout(() => {
            if ((repeatCount > 0) && (this.repeatAmount >= repeatCount)) {
                return;
            }

            this.repeatAmount++;

            if (typeof this.props.onHoldStart === 'function') {
                this.props.onHoldStart();
            }
            if (typeof this.props.onHold === 'function') {
                this.props.onHold();
            }

            this.repeatIntervalTimer = setInterval(() => {
                if ((repeatCount > 0) && (this.repeatAmount >= repeatCount)) {
                    return;
                }

                this.repeatAmount++;

                if (typeof this.props.onHold === 'function') {
                    this.props.onHold();
                }
            }, repeatInterval);
        }, repeatDelay);
    };

    releaseTimer = () => {
        if (this.repeatDelayTimer) {
            clearTimeout(this.repeatDelayTimer);
            this.repeatDelayTimer = null;
        }
        if (this.repeatIntervalTimer) {
            clearInterval(this.repeatIntervalTimer);
            this.repeatIntervalTimer = null;
        }
    };

    componentWillUnmount() {
        this.repeatAmount = 0;
        this.releaseTimer();
    }
    render() {
        const {
            disabled,
            repeatDelay, // eslint-disable-line
            repeatInterval, // eslint-disable-line
            repeatCount, // eslint-disable-line
            onPress, // eslint-disable-line
            onHoldStart, // eslint-disable-line
            onHold, // eslint-disable-line
            onHoldEnd, // eslint-disable-line
            onRelease, // eslint-disable-line
            onMouseDown,
            onTouchStart,
            onTouchCancel,
            onTouchEnd,
            ...props
        } = this.props;

        const release = (event) => {
            if (this.repeatAmount > 0) {
                if (typeof this.props.onHoldEnd === 'function') {
                    this.props.onHoldEnd();
                }
            }

            this.repeatAmount = 0;
            this.releaseTimer();

            if (typeof this.props.onRelease === 'function') {
                this.props.onRelease(event);
            }
        };

        const press = (event) => {
            event.persist();

            const releaseOnce = (event) => {
                document.documentElement.removeEventListener('mouseup', releaseOnce);
                release(event);
            };
            document.documentElement.addEventListener('mouseup', releaseOnce);

            if (typeof this.props.onPress === 'function') {
                this.props.onPress(event);
            }

            this.acquireTimer();
        };

        return (
            <div
                role="presentation"
                {...props}
                onMouseDown={chainedFunction(
                    onMouseDown,
                    (event) => {
                        if (disabled) {
                            return;
                        }
                        press(event);
                    }
                )}
                onTouchStart={chainedFunction(
                    onTouchStart,
                    (event) => {
                        if (disabled) {
                            return;
                        }
                        press(event);
                    }
                )}
                onTouchCancel={chainedFunction(
                    onTouchCancel,
                    (event) => {
                        if (disabled) {
                            return;
                        }
                        release(event);
                    }
                )}
                onTouchEnd={chainedFunction(
                    onTouchEnd,
                    (event) => {
                        if (disabled) {
                            return;
                        }
                        release(event);
                    }
                )}
            />
        );
    }
}

export default Repeatable;
