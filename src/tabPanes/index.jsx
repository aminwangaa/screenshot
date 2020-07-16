import React, { useEffect, useState, useRef } from 'react';
import classNames from "classnames"
import { cloneDeep } from 'lodash';
import { Checkbox, Popover } from "antd"
import moment from "moment"
import SearchHead from "./components/searchHead";
import TabContent from "./components/tabContent";
import "./index.less"

const TabsBox = (props) => {
    const {
        searchList,
        title,
        initDataSource,
        tabChange,
        type,
        initColumns,
        panes,
        rowClick,
        onRow,
        sortStatus,
        onSort,
        dateChange,
        date,
        getData,
        current,
        total,
        pageSize,
        pageChange,
        isProject,
        noSort
    } = props;

    return (
        <div className="listModule">
            <SearchHead
                list={searchList}
                title={title}
                type={type}
                onSort={onSort}
                sortStatus={sortStatus}
                dateChange={dateChange}
                searchDate={date}
                isProject={isProject}
                noSort={noSort}
            />
            <TabContent
                initDataSource={initDataSource}
                tabChange={tabChange}
                type={type}
                initColumns={initColumns}
                panes={panes}
                rowClick={rowClick}
                onRow={onRow}
                getData={getData}
                current={current}
                total={total}
                pageSize={pageSize}
                pageChange={pageChange}
            />
        </div>
    )
}

export default TabsBox
