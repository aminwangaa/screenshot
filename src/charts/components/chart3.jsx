import React, { useState, useEffect, useRef } from "react";
import "./chart.less"
import { Chart } from "@antv/g2";
import { cloneDeep } from "lodash"
import PropTypes from 'prop-types';

const Charts = (props) => {
    const {
        width,
        height,
        max,
        content,
        contentColor,
        dataColor,
        cTitle,
        data,
        averageNum
    } = props
    const initData = [
        { date: "a", num: 0 },
        { date: "b", num: 0 },
        { date: "c", num: 0 }
    ]
    const [cData, setData] = useState(initData)
    const [chart, setChartBox] = useState(null)
    const chartRef = useRef()

    useEffect(() => {
        (async () => {
            const chartBox = new Chart({
                container: 'c3',
                autoFit: true,
                width: width,
                height: height,
                title: true
            })
            await setChartBox(chartBox)
            const newData = cloneDeep(cData)
            newData.splice(1,1, data)
            await setData(() => newData)
        })()
    }, [])

    useEffect(() => {
        (async () => {
            const newData = cloneDeep(cData)
            newData.splice(1,1, data)
            await setData(() => newData)
            if (data && chart) setChart()
        })()
    }, [chart, data])

    const setChart = () => {
        const margin = 1 / 3
        chart.clear()
        chart.data(cData);
        chart.scale({
            date: {
                range: [margin / 2, 1 - margin / 2],
            },
            num: {
                range: [0, 1 - margin / 2],
                min: 0,
                max: max,
                nice: true,
            },
        });

        chart.tooltip(false);

        // 坐标轴
        chart.axis('date', {
            label: {
                // 返回空字符串 隐藏横坐标文字内容
                formatter: (text) => ""
            }
        })
        chart.axis('num', {
            title: {
                text: cTitle,
                autoRotate: false,
                position: "end",
                offset: -10,
                textStyle: {
                    textAlign: 'start', // 文本对齐方向，可取值为： start middle end
                    fontSize: '12', // 文本大小
                    fontWeight: 'bold', // 文本粗细
                    textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
                },
            },
            label: {
                formatter: (text) => text
            }
        })
        // 隐藏折线
        chart.line().style({
            stroke: "transparent"
        }).position('date*num');
        // 隐藏点
        chart
            .point()
            .size(2)
            .position('date*num')
            .label("name", (val) => {
                // 关联文字 设置样式
                if (val) {
                    return {
                        content: val,
                        offsetX: 12,
                        offsetY: 12,
                        style: {
                            fill: dataColor,
                            fontSize: 12,
                        },
                    }
                }
            })
            .style("num*name", ((val, name) => {
                // 只显示有名字的那个点 其他点隐藏
                if (name) {
                    return {
                        stroke: dataColor,
                        fill: dataColor
                    }
                }
                return {
                    stroke: "transparent",
                    lineWidth: 0
                }
            }))

        chart.annotation().line({
            top: true,
            start: [-0.5, averageNum],
            end: [2.5, averageNum],
            style: {
                stroke: contentColor,
                lineWidth: 1,
                lineDash: [3, 3],
            },
            text: {
                position: 'start',
                style: {
                    fill: contentColor,
                    fontSize: 12,
                    fontWeight: 500,
                },
                content: content,
                offsetY: -5,
            },
        });

        chart.render();
    }

    return (
        <div className={"chart"}>
            <div id="c3" ref={chartRef} />
        </div>
    )
}
Charts.defaultProps = {
    max: 150,
    data: { date: "c", num: 60, name: "我" },
    width: 300,
    height: 200,
    dataColor: "#fe8140", // 文字 点颜色
    contentColor: "#f4a240", // 横线颜色
    cTitle: "单位: 小时", // 纵坐标轴标题
    content: "团队均值: 75",// 均值说明
    averageNum: 75,// 均值说明
}

Charts.propTypes = {
    max: PropTypes.number,
    data: PropTypes.object.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    dataColor: PropTypes.string,
    contentColor: PropTypes.string,
    cTitle: PropTypes.string,
    content: PropTypes.string,
    averageNum: PropTypes.number,
}

export default Charts;
