import React from "react";
import "./chart.less"
import { Chart } from "@antv/g2";

class Charts extends React.Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef()
        this.state = {
            data: [
                { date: "2020-05-01", num: 8, color: "#EF2015" },
                { date: "2020-05-08", num: 8, color: "#EF1E86" },
                { date: "2020-05-15", num: 6, color: "#9A31EF" },
                { date: "2020-05-22", num: 4, color: "#3429EF" },
                { date: "2020-05-31", num: 4, color: "#3CB9EF" }
            ]
        }
    }

    componentDidMount() {
        this.setChart()
    }

    setChart = () => {
        const { data } = this.state
        const chart = new Chart({
            container: 'c5',
            autoFit: true,
            width: 500,
            height: 200,
        });

        chart.data(data);
        const margin = 1 / data.length
        chart.scale({
            date: {
                range: [margin / 2, 1 - margin / 2],
            },
            num: {
                min: 0,
                max: 20,
                nice: true,
            },
        });

        // 坐标轴
        chart.axis('date', {
            label: {
                formatter: (text, item, index) => {
                    return data[index].date
                }
            },
        })
        chart.axis('num', {
            grid: {
                type: "line",
                lineStyle: {
                    stroke: 'red', // 网格线的颜色
                    lineWidth: 10, // 网格线的粗细
                    lineDash: [2, 2] // 网格线的虚线配置，第一个参数描述虚线的实部占多少像素，第二个参数描述虚线的虚部占多少像素
                },
            },
            label: {
                formatter: (text) => text
            }
        })
        chart.tooltip({
            showTitle: false
        })
        // 隐藏折线
        chart
            .line()
            .position('date*num')
            .tooltip(false)
            // .tooltip('date*num', (date, num) => {
            //     return {
            //         showTitle: false,
            //         showMarkers: true,
            //         name: date,
            //         value: num,
            //     }
            // })

        // chart
        //     .point()
        //     .position('date*num*color')
        //     .size(0)
        //     .shape('circle')
        //     .color("transparent")
        //     .tooltip('date*num', (date, num) => {
        //         return {
        //             showTitle: false,
        //             showMarkers: false,
        //             name: date,
        //             value: num
        //         }
        //     })

        chart.annotation().line({
            top: true,
            start: ['a', 80],
            end: ['e', 80],
            style: {
                stroke: '#f4a240',
                lineWidth: 1,
                lineDash: [3, 3],
            },
            text: {
                position: 'start',
                style: {
                    fill: '#f4a240',
                    fontSize: 12,
                    fontWeight: 500,
                },
                content: '团队均值: 80',
                offsetY: -5,
            },
        });

        chart.on('click', ev => {
            // 获取当前点击的对象
            const records = chart.getSnapRecords({x: ev.x, y: ev.y});
            if (records && records.length > 0) {
                // 被点击区域的数据
                const data = records[0]._origin;
                if (data) {
                    console.log(data)
                }
            }
        });

        chart.render();
    }

    render () {
        return (
            <div className={"chart"}>
                <div id="c5" ref={this.chartRef} />
            </div>
        )
    }
}

export default Charts;
