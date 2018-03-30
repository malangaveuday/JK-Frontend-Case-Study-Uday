import React from 'react';

const Loading = () => {
    return (
        <div className="row">
            <div className="col-md-12 text-center">
                <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default Loading;