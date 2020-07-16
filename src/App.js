import React, { useRef, useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import "./index.less"
import Screenshot from "./screenshot"
import Charts from "./charts/index"
import Demo from "./demo"
import TabShowDemo from "./tabPanes/tabShowDemo";


const App = (props) => {


    return (
        <div className={"app"}>
            {/*<Screenshot />*/}
            {/*<Charts />*/}
            {/*<Demo />*/}
            <TabShowDemo />
        </div>
    )
}

export default App;
