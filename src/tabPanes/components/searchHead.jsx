import React, { useEffect, useState, useRef } from 'react';
import classNames from "classnames"
import { cloneDeep } from 'lodash';
import { Checkbox, Popover, Select } from "antd"
import moment from "moment"
import "./searchHead.less"

const { Option } = Select

const SearchHead = (props) => {
    const {
        title = '我的待办',
        list,
        onSort,
        sortStatus = true,
        dateChange,
        searchDate,
        isProject,
        noSort,
        type
    } = props;
    const dateRef = useRef({
        startDate: searchDate.startDate || moment(new Date()).format('YYYY-MM-DD'),
        endDate: searchDate.endDate || moment(new Date()).format('YYYY-MM-DD'),
    });

    const [date, setDate] = useState(dateRef.current);

    const changeDate = (sDate, eDate) => {
        dateRef.current.startDate = sDate;
        dateRef.current.endDate = eDate;
        setDate({ ...dateRef.current });
        dateChange({
            startDate: sDate,
            endDate: eDate
        })
    };

    const [sort, setSortStatus] = useState(sortStatus)
    const [sortHover, setSortHover] = useState(false)

    useEffect(() => {
        setSortStatus(sortStatus)
        setSortHover(false)
    }, [sortStatus])

    useEffect(() => {
        setDate(searchDate)
    }, [searchDate])

    const sortClick = () => {
        setSortStatus(!sort)
        onSort(!sort)
    }
    return (
        <div className={'listHead'}>
            <div className={'listTitle'}>{title}</div>
            <div className={'headSearch'}>
                {list &&
                list.length > 0 &&
                list.map((item, index) => {
                    return (
                        <Select
                            key={index}
                            className={'listSelect'}
                            onChange={val => item.onChange(val, index)}
                            value={item.value}>
                            {item.options &&
                            item.options.length > 0 &&
                            item.options.map((i, t) => (
                                <Option key={i.value} value={i.value}>
                                    {i.label}
                                </Option>
                            ))}
                        </Select>
                    );
                })
                }
            </div>
        </div>
    );
}

export default SearchHead
