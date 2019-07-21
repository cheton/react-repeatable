import PropTypes from 'prop-types';
import React from 'react';

const Progress = ({ min = 0, max = 100, now = 0, style, ...props }) => (
    <div
        {...props}
        style={{
            display: 'flex',
            height: '1rem',
            overflow: 'hidden',
            fontSize: '.75rem',
            backgroundColor: '#e9ecef',
            borderRadius: '.25rem',
            ...style,
        }}
    >
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                color: '#fff',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                backgroundColor: '#007bff',
                transition: 'width .6s ease',
                width: `${now}%`
            }}
            role="progressbar"
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
