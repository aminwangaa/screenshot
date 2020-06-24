import React from 'react';
import 'antd/dist/antd.css';
import "./index.less"
import Screenshot from "./screenshot"


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render () {
        return (
            <div className={"app"}>
                <Screenshot />
            </div>
        )
    }
}

export default App;
