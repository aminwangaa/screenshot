import React, { useEffect, useState, useRef } from 'react';
import classNames from "classnames"
import { cloneDeep } from 'lodash';
import { Table, Tabs, Select } from "antd"
import moment from "moment"
import "./tabContent.less"

const { Option } = Select
const { TabPane } = Tabs

const TabContent = (props) => {
    let tableRef = useRef();
    const {
        initDataSource,
        onRow,
        rowClick,
        current,
        total,
        pageSize,
        pageChange
    } = props

    const [activeKey, setActiveKey] = useState('1');

    const tabChange = val => {
        setActiveKey(val);
        props.tabChange(val, props.type)
    };

    const onEdit = index => {
        console.log(index);
    };

    return (
        <div className={'tabContent'}>
            <Tabs
                onChange={tabChange}
                activeKey={activeKey}
                tabBarStyle={{ fontSize: '14px' }}
                type="line"
                onEdit={onEdit}
                tabBarGutter={0}
                animated={false}>
                {props.panes.map(pane => (
                    <TabPane tab={pane.title} key={pane.key} forceRender={false} />
                ))}
            </Tabs>
            <div className={'tableBox'} ref={c => (tableRef = c)}>
                <Table
                    onRow={(row) => {
                        return {
                            onClick: (event) => {
                                // event.persist()
                                rowClick && onRow && onRow(row)
                            }
                        }
                    }}
                    className={'cardTable'}
                    rowClassName={
                        classNames(
                            'cardTableRow',
                            rowClick && "clickRow"
                        )}
                    dataSource={initDataSource}
                    columns={props.initColumns.get(~~activeKey)}
                    footer={false}
                    pagination={{
                        current,
                        total,
                        pageSize,
                        onChange: (val) => {
                            pageChange(val)
                        },
                        hideOnSinglePage: true
                    }}
                    showHeader={false}
                    rowKey={(i, t) => t}
                />
            </div>
        </div>
    );
}

export default TabContent
