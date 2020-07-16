import React from "react";
import "./chart.less"
import { Chart } from "@antv/g2";

class Charts extends React.Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef()
        this.state = {
            data: [
                { item: '事例一', count: 40, percent: 0.4 },
                { item: '事例二', count: 21, percent: 0.21 },
                { item: '事例三', count: 17, percent: 0.17 },
                { item: '事例四', count: 13, percent: 0.13 },
                { item: '事例五', count: 9, percent: 0.09 },
            ]
        }
    }

    componentDidMount() {
        this.setChart()
    }

    setChart = () => {
        const { data } = this.state
        const chart = new Chart({
            container: 'c6',
            autoFit: true,
            width: 500,
            height: 200,
        });

        chart.data(data);
        chart.scale('percent', {
            formatter: (val) => {
                val = val * 100 + '%';
                return val;
            },
        });
        chart.coordinate('theta', {
            radius: 0.75,
            innerRadius: 0.6,
        });
        chart.tooltip({
            showTitle: false,
            showMarkers: false,
            itemTpl: '<li class="g2-tooltip-list-item"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>',
        });
// 辅助文本
        chart
            .interval()
            .adjust('stack')
            .position('percent')
            .color('item')
            .label('percent', (percent) => {
                return {
                    content: (data) => {
                        return `${data.item}: ${percent * 100}%`;
                    },
                };
            })
            .tooltip('item*percent', (item, percent) => {
                percent = percent * 100 + '%';
                return {
                    name: item,
                    value: percent,
                };
            });

        chart.on('interval:click', ev => {
            // 获取当前点击的对象
            const res = ev.data;
            if (res) {
                console.log(res.data)
            }
        });

        chart.interaction('element-active');
        chart.render();
    }

    render () {
        return (
            <div className={"chart"}>
                <div id="c6" ref={this.chartRef} />
            </div>
        )
    }
}

export default Charts;
