import React, {Component} from 'react';

class App extends Component {
    render() {
        return (
            <div>
                <div className="page-header">
                        <span>PDP</span>
                </div>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;  