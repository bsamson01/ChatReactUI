import React from 'react';

class FooterComponent extends React.Component {
    render() {
        return (
            <footer className="fixed-bottom shadow-lg text-center py-2 px-4">
                <div className="text-white mb-3 mb-md-0">
                    Copyright © 2022. All rights reserved.
                </div>
            </footer>
        )
    }
}

export default FooterComponent;