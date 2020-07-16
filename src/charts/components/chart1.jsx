import React from "react";
import "./chart.less"
import { Chart } from "@antv/g2";
import CTitle from "./CTitle";

class Charts extends React.Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef()
        this.state = {
            data: [
                { name: "已处理", month: "昨天", num: 8 },
                { name: "已处理", month: "今天", num: 11 },
                { name: "未处理", month: "昨天", num: 2 },
                { name: "未处理", month: "今天", num: 1 },
            ]
        }
    }

    componentDidMount() {
        this.setChart()
    }

    setChart = () => {
        const { data } = this.state
        const chart = new Chart({
            container: "c1",
            autoFit: true,
            width: 300,
            height: 200,
        });
        chart.clear()
        chart.data(data);

        chart.scale("num", {
            min: 0,
            nice: true,
        });
        chart.tooltip({
            showMarkers: false,
            shared: true,
        });

        chart
            .interval()
            .position("month*num")
            .color("name")
            .label("num", {
                offset: -10,
            })
            .adjust([
                {
                    type: "dodge",
                    marginRatio: 0,
                },
            ]);

        chart.interaction("active-region");

        chart.render();
    }

    render () {
        return (
            <div className={"chart"}>
                <CTitle />
                <div id="c1" ref={this.chartRef} />
            </div>
        )
    }
}

export default Charts;
