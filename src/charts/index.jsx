import React from 'react';
import { Button } from "antd"
import Chart1 from "./components/chart1"
import Chart2 from "./components/chart2"
import Chart3 from "./components/chart3"
import Chart4 from "./components/chart4"
import Chart5 from "./components/chart5"
import Chart6 from "./components/chart6"


class Charts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cTitle: "单位: 小时",
            data: { date: "b", num: 120, name: "我" },
            averageNum: 75
        }
    }

    change = () => {
        const { cTitle } = this.state
        const flag = cTitle === "单位: 个"
        const title = flag ? "单位: 小时" : "单位: 个"
        const data = flag ?
            { date: "b", num: 120, name: "我" } :
            { date: "b", num: 55, name: "你" }
        const averageNum = flag ? 75 : 55
        this.setState({
            cTitle: title,
            data: data,
            averageNum: averageNum,
        })
    }

    render () {
        const { cTitle, data, averageNum } = this.state
        // 组件通过key值变化可以触发更新
        return (
            <div className={"chartBox"}>
                <Chart1 />
                <Chart2 />
                <Chart3
                    cTitle={cTitle}
                    data={data}
                    key={data.num}
                    averageNum={averageNum}
                />
                <Chart4 />
                <Chart5 />
                <Chart6 />

                <Button onClick={this.change}>切换</Button>
            </div>
        )
    }
}

export default Charts;
