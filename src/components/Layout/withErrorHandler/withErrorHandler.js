import React from 'react';

const withErrorHandler = (WrappedComponent) => {
    return (props) => {
        <WrappedComponent {...props} />
    }
}

export default withErrorHandler;
