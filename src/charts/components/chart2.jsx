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
                { date: "昨天", num: 8 },
                { date: "今天", num: 10 }
            ]
        }
    }

    componentDidMount() {
        this.setChart()
    }

    setChart = () => {
        const { data } = this.state
        const chart = new Chart({
            container: 'c2',
            width: 300,
            height: 200,
        });

        chart.data(data);
        chart.scale('num', {
            min: 0,
            nice: true,
        });

        chart.tooltip({
            showMarkers: false
        });
        chart.interaction('active-region');

        chart
            .interval()
            .size(36)
            .label("num", {
                offset: -10
            })
            .position('date*num');

        chart.render();
    }

    render () {
        return (
            <div className={"chart"}>
                <CTitle />
                <div id="c2" ref={this.chartRef} />
            </div>
        )
    }
}

export default Charts;
