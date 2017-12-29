import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

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

export default Progress;
