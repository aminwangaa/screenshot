import React from "react";
import "./chart.less"
import { Chart } from "@antv/g2";

class Charts extends React.Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef()
        this.state = {
            data: [
                { name: "同级部门A", num: 25, color: "#fe8140" },
                { name: "同级部门B", num: 40, color: "#ffa223" },
                { name: "同级部门C", num: 28.5, color: "#51e099" },
            ]
        }
    }

    componentDidMount() {
        this.setChart()
    }

    setChart = () => {
        const { data } = this.state
        const chart = new Chart({
            container: 'c4',
            width: 400,
            height: 200,
        });

        chart.data(data);
        chart.scale('num', {
            min: 0,
            max: 100,
            nice: true,
        });

        chart.tooltip({
            showMarkers: false
        });
        chart.interaction('active-region');

        chart.legend(false);

        chart
            .interval()
            .size(24)
            .color('color', (color) => color)
            .label("num*color", (num, color) => {
                return {
                    offset: 10,
                    style: {
                        fill: color
                    },
                    content: (data) => {
                        return `${data.num}%`
                    }
                }
            })
            .position('name*num');

        chart
            .annotation()
            .line({
                top: true,
                start: [-0.5, 31],
                end: [2.5, 31],
                style: {
                    stroke: '#f4a240',
                    lineWidth: 1,
                    lineDash: [3, 3],
                },
                text: {
                    position: 'center',
                    style: {
                        fill: '#f4a240',
                        fontSize: 12,
                        // fontWeight: 300,
                    },
                    content: '团队均值: 31',
                    offsetX: 16,
                    offsetY: 18,
                },
             });

        chart.render();
    }

    render () {
        return (
            <div className={"chart"}>
                <div id="c4" ref={this.chartRef} />
            </div>
        )
    }
}

export default Charts;
