import chainedFunction from 'chained-function';
import PropTypes from 'prop-types';
import React from 'react';

class Repeatable extends React.Component {
    repeatDelayTimer = null

    repeatIntervalTimer = null

    repeatAmount = 0

    componentWillUnmount() {
        this.repeatAmount = 0;
        this.releaseTimer();
    }

    acquireTimer = () => {
        const repeatDelay = Math.max(Number(this.props.repeatDelay) || 0, 0);
        const repeatInterval = Math.max(Number(this.props.repeatInterval) || 0, 0);
        const repeatCount = Math.max(Number(this.props.repeatCount) || 0, 0);

        this.repeatAmount = 0;
        this.releaseTimer();

        this.repeatDelayTimer = setTimeout(() => {
            if (repeatCount > 0 && this.repeatAmount >= repeatCount) {
                return;
            }

            this.repeatAmount += 1;

            if (typeof this.props.onHoldStart === 'function') {
                this.props.onHoldStart();
            }
            if (typeof this.props.onHold === 'function') {
                this.props.onHold();
            }

            this.repeatIntervalTimer = setInterval(() => {
                if (repeatCount > 0 && this.repeatAmount >= repeatCount) {
                    return;
                }

                this.repeatAmount += 1;

                if (typeof this.props.onHold === 'function') {
                    this.props.onHold();
                }
            }, repeatInterval);
        }, repeatDelay);
    }

    releaseTimer = () => {
        if (this.repeatDelayTimer) {
            clearTimeout(this.repeatDelayTimer);
            this.repeatDelayTimer = null;
        }
        if (this.repeatIntervalTimer) {
            clearInterval(this.repeatIntervalTimer);
            this.repeatIntervalTimer = null;
        }
    }

    handleRelease = event => {
        if (this.props.disabled) {
            return;
        }

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
    }

    handlePress = event => {
        if (this.props.disabled) {
            return;
        }

        event.persist();

        const releaseOnce = event => {
            document.documentElement.removeEventListener('mouseup', releaseOnce);
            this.handleRelease(event);
        };
        document.documentElement.addEventListener('mouseup', releaseOnce);

        if (typeof this.props.onPress === 'function') {
            this.props.onPress(event);
        }

        this.acquireTimer();
    }

    render() {
        const {
            tag: Tag,
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

        const isMobile = window.navigator.userAgentData.mobile;
        const mobileEvents = {
            onTouchStart: chainedFunction(onTouchStart, this.handlePress),
            onTouchCancel: chainedFunction(onTouchCancel, this.handleRelease),
            onTouchEnd: chainedFunction(onTouchEnd, this.handleRelease),
        };

        const mouseEvents = {
            onMouseDown: chainedFunction(onMouseDown, this.handlePress),
            onMouseUp: chainedFunction(onTouchCancel, this.handleRelease),
        };

        const eventHandlers = isMobile ? mobileEvents : mouseEvents;

        return <Tag role="presentation" {...props} {...eventHandlers} />;
    }
}

Repeatable.defaultProps = {
    tag: 'div',
    disabled: false,
    repeatDelay: 500,
    repeatInterval: 32,
    repeatCount: 0,
};

Repeatable.propTypes = {
    // A custom element for this component.
    tag: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string,
        PropTypes.shape({ $$typeof: PropTypes.symbol, render: PropTypes.func }),
        PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.func,
                PropTypes.string,
                PropTypes.shape({
                    $$typeof: PropTypes.symbol,
                    render: PropTypes.func,
                }),
            ]),
        ),
    ]),

    // Set it to true to disable event actions.
    disabled: PropTypes.bool,

    // The time (in milliseconds) to wait before the first hold action is being triggered.
    repeatDelay: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    // The time interval (in milliseconds) on how often to trigger a hold action.
    repeatInterval: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    // The number of times the hold action will take place. A zero value will disable the repeat counter.
    repeatCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    // Callback fired when the mousedown or touchstart event is triggered.
    onPress: PropTypes.func,

    // Callback fired once before the first hold action.
    onHoldStart: PropTypes.func,

    // Callback fired mutiple times while holding down.
    onHold: PropTypes.func,

    // Callback fired once after the last hold action.
    onHoldEnd: PropTypes.func,

    // Callback fired when the mouseup, touchcancel, or touchend event is triggered.
    onRelease: PropTypes.func,

    onMouseDown: PropTypes.func,
    onTouchStart: PropTypes.func,
    onTouchCancel: PropTypes.func,
    onTouchEnd: PropTypes.func,
};

export default Repeatable;
