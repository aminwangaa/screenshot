import React from "react";
import "./chart.less"

const CTitle = () => {

    return (
        <div className={"chartTitle"}>
            <div className={"chartTitleL"}>任务工时统计</div>
            <div className={"chartTitleR"}>
                <span className={"titleT"}>昨天</span>
                &nbsp;---&nbsp;
                <span className={"titleT"}>今天</span>
            </div>
        </div>
    )
}

export default CTitle
