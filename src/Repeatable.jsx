import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

class Repeatable extends PureComponent {
    static propTypes = {
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

        // The number of times the hold action will take place.
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
        repeatDelay: 500,
        repeatInterval: 32
    };

    repeatDelayTimer = null;
    repeatIntervalTimer = null;

    acquireTimer = () => {
        const repeatDelay = Math.max(Number(this.props.repeatDelay) || 0, 0);
        const repeatInterval = Math.max(Number(this.props.repeatInterval) || 0, 0);
        const repeatCount = Math.max(Number(this.props.repeatCount) || 0, 0);

        this.releaseTimer();

        let repeatAmount = 0;
        this.repeatDelayTimer = setTimeout(() => {
            if (typeof this.props.onHoldStart === 'function') {
                this.props.onHoldStart();
            }
            if (typeof this.props.onHold === 'function') {
                if (!repeatCount || (repeatAmount < repeatCount)) {
                    ++repeatAmount;
                    this.props.onHold();
                }
            }
            this.repeatIntervalTimer = setInterval(() => {
                if (this.repeatIntervalTimer && (typeof this.props.onHold === 'function')) {
                    if (!repeatCount || (repeatAmount < repeatCount)) {
                        ++repeatAmount;
                        this.props.onHold();
                    }
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
        this.releaseTimer();
    }
    render() {
        const {
            repeatDelay, // eslint-disable-line
            repeatInterval, // eslint-disable-line
            repeatCount, // eslint-disable-line
            onPress, // eslint-disable-line
            onHoldStart, // eslint-disable-line
            onHold, // eslint-disable-line
            onHoldEnd, // eslint-disable-line
            onRelease, // eslint-disable-line
            ...props
        } = this.props;

        const release = (event) => {
            if (typeof this.props.onRelease === 'function') {
                this.props.onRelease(event);
            }

            this.releaseTimer();

            setTimeout(() => {
                if (typeof this.props.onHoldEnd === 'function') {
                    this.props.onHoldEnd();
                }
            }, 0);
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
                onMouseDown={press}
                onTouchStart={press}
                onTouchCancel={release}
                onTouchEnd={release}
            />
        );
    }
}

export default Repeatable;
