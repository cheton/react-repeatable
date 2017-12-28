import PropTypes from 'prop-types';
import React, { cloneElement, PureComponent } from 'react';

class Repeatable extends PureComponent {
    static propTypes = {
        // The time (in milliseconds) to wait before the action is being triggered.
        enterDelay: PropTypes.number,

        // The intervals (in milliseconds) on how often to trigger the action.
        intervalDelay: PropTypes.number,

        // Callback fired when the mousedown or touchstart event is triggered.
        onPress: PropTypes.func,

        // Callback fired when the mouseup, touchcancel, or touchend event is triggered.
        onRelease: PropTypes.func
    };

    enterTimer = null;
    intervalTimer = null;

    acquireTimer = (callback, ...args) => {
        const enterDelay = Number(this.props.enterDelay) || 500;
        const intervalDelay = Number(this.props.intervalDelay) || 50;

        this.releaseTimer();

        this.enterTimer = setTimeout(() => {
            this.intervalTimer = setInterval(() => {
                if (this.intervalTimer && (typeof callback === 'function')) {
                    callback(...args);
                }
            }, intervalDelay);
        }, enterDelay);
    };

    releaseTimer = () => {
        if (this.enterTimer) {
            clearTimeout(this.enterTimer);
            this.enterTimer = null;
        }
        if (this.intervalTimer) {
            clearInterval(this.intervalTimer);
            this.intervalTimer = null;
        }
    };

    componentWillUnmount() {
        this.releaseTimer();
    }
    render() {
        const { children } = this.props;

        const items = React.Children.map(children, child => {
            if (!React.isValidElement(child)) {
                return child;
            }

            const release = (event) => {
                this.releaseTimer();

                setTimeout(() => {
                    if (typeof this.props.onRelease === 'function') {
                        this.props.onRelease(event);
                    }
                }, 0);
            };
            const press = ((callback) => (event) => {
                event.persist();

                const releaseOnce = (event) => {
                    document.documentElement.removeEventListener('mouseup', releaseOnce);
                    release(event);
                };
                document.documentElement.addEventListener('mouseup', releaseOnce);

                if (typeof this.props.onPress === 'function') {
                    this.props.onPress(event);
                }

                this.acquireTimer(callback, event);
            })(child.props.onClick);

            return cloneElement(child, {
                onMouseDown: press,
                onMouseUp: release,
                onTouchStart: press,
                onTouchCancel: release,
                onTouchEnd: release
            });
        });

        return (
            <div>{items}</div>
        );
    }
}

export default Repeatable;
