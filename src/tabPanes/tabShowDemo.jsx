import React, { useRef, useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import "../index.less"
import TabsBox from "./index"
import { cloneDeep } from "lodash"
import classNames from "classnames"
import { Popover, Checkbox } from "antd"
import * as initData from "./data"
import moment from "moment"
import { Link } from "react-router-dom"


const TabShowDemo = (props) => {
    // 当前tab索引
    const myWaitRef = useRef('1');
    // listModule search内容 待办搜索列表
    const upComingList = [
        {
            field: 'bug',
            options: [
                { label: '全部', value: null },
                { label: '任务', value: 0 },
                { label: '缺陷', value: 1 },
            ],
            value: null,
            onChange: (val, index) => {
                myWaitChangeSearch(val, index);
            },
        },
        {
            field: 'sortType',
            options: [
                { label: '延期天数', value: 1 },
                { label: '截止时间', value: 2 },
                { label: '历时天数', value: 3 },
                { label: '优先级', value: 4 },
                { label: '创建时间', value: 5 },
            ],
            value: 1,
            onChange: (val, index) => {
                myWaitChangeSearch(val, index);
            },
        },
        {
            field: 'isExtension',
            options: [
                { label: '全部', value: null },
                { label: '延期', value: 0 },
                { label: '非延期', value: 1 },
            ],
            value: null,
            onChange: (val, index) => {
                myWaitChangeSearch(val, index);
            },
        },
    ];
    // 待办日程
    const scheduleList = []
    // 待办问题
    const questionList = [
        {
            field: 'priority',
            options: [
                { label: '全部', value: null },
                { label: '普通', value: 1 },
                { label: '紧急', value: 2 },
                { label: '非常紧急', value: 3 }
            ],
            value: null,
            onChange: (val, index) => {
                myWaitChangeSearch(val, index);
            },
        },
    ]
    // 延期任务
    const delayTaskList = upComingList.map(item => cloneDeep(item))
    delayTaskList.pop()
    // 待办 项目 搜索
    const delayProjectList = [
        {
            field: 'sortType',
            options: [
                { label: '截止时间', value: 2 },
                { label: '延期天数', value: 1 },
                { label: '历时天数', value: 3 },
                { label: '项目进度', value: 4 },
            ],
            value: 2,
            onChange: (val, index) => {
                myWaitChangeSearch(val, index);
            },
        },
    ]
    const freezeProjectList = cloneDeep(delayProjectList)
    const unCompleteProjectList = cloneDeep(delayProjectList)
    // 搜索条件
    const upComingListRef = useRef(upComingList);
    const scheduleListRef = useRef(scheduleList);
    const questionListRef = useRef(questionList);
    const delayTaskListRef = useRef(delayTaskList);
    const delayProjectListRef = useRef(delayProjectList);
    const freezeProjectListRef = useRef(freezeProjectList);
    const unCompleteProjectListRef = useRef(unCompleteProjectList);
    // 关联待办 搜索
    const myWaitFinishSearch = new Map()
    myWaitFinishSearch.set(1, upComingListRef.current)
    myWaitFinishSearch.set(2, scheduleListRef.current)
    myWaitFinishSearch.set(3, questionListRef.current)
    myWaitFinishSearch.set(4, delayTaskListRef.current)
    myWaitFinishSearch.set(5, delayProjectListRef.current)
    myWaitFinishSearch.set(6, freezeProjectListRef.current)
    myWaitFinishSearch.set(7, unCompleteProjectListRef.current)
    // 排序
    const upComingSortRef = useRef(true);
    const scheduleSortRef = useRef(true);
    const questionSortRef = useRef(true);
    const delayTaskSortRef = useRef(true);
    const delayProjectSortRef = useRef(true);
    const freezeProjectSortRef = useRef(true);
    const unCompleteProjectSortRef = useRef(true);
    // 待办 排序
    const myWaitSortList = new Map()
    myWaitSortList.set(1, upComingSortRef)
    myWaitSortList.set(2, scheduleSortRef)
    myWaitSortList.set(3, questionSortRef)
    myWaitSortList.set(4, delayTaskSortRef)
    myWaitSortList.set(5, delayProjectSortRef)
    myWaitSortList.set(6, freezeProjectSortRef)
    myWaitSortList.set(7, unCompleteProjectSortRef)

    const today = moment(new Date()).format('YYYY-MM-DD')
    const initDate = {
        startDate: today,
        endDate: today,
    }
    // 日期
    const upComingDateRef = useRef(initDate);
    const scheduleDateRef = useRef(initDate);
    const questionDateRef = useRef(initDate);
    const delayTaskDateRef = useRef(initDate);
    const delayProjectDateRef = useRef(initDate);
    const freezeProjectDateRef = useRef(initDate);
    const unCompleteProjectDateRef = useRef(initDate);
    // 待办 日期
    const myWaitDateList = new Map()
    myWaitDateList.set(1, upComingDateRef)
    myWaitDateList.set(2, scheduleDateRef)
    myWaitDateList.set(3, questionDateRef)
    myWaitDateList.set(4, delayTaskDateRef)
    myWaitDateList.set(5, delayProjectDateRef)
    myWaitDateList.set(6, freezeProjectDateRef)
    myWaitDateList.set(7, unCompleteProjectDateRef)
    // 页数
    const upComingPageRef = useRef(1);
    const schedulePageRef = useRef(1);
    const questionPageRef = useRef(1);
    const delayTaskPageRef = useRef(1);
    const delayProjectPageRef = useRef(1);
    const freezeProjectPageRef = useRef(1);
    const unCompleteProjectPageRef = useRef(1);
    // 待办 页数
    const myWaitPage = new Map()
    myWaitPage.set(1, upComingPageRef)
    myWaitPage.set(2, schedulePageRef)
    myWaitPage.set(3, questionPageRef)
    myWaitPage.set(4, delayTaskPageRef)
    myWaitPage.set(5, delayProjectPageRef)
    myWaitPage.set(6, freezeProjectPageRef)
    myWaitPage.set(7, unCompleteProjectPageRef)
    // 总数
    const upComingTotalRef = useRef(0);
    const scheduleTotalRef = useRef(0);
    const questionTotalRef = useRef(0);
    const delayTaskTotalRef = useRef(0);
    const delayProjectTotalRef = useRef(0);
    const freezeProjectTotalRef = useRef(0);
    const unCompleteProjectTotalRef = useRef(0);
    // 待办 数据总数
    const myWaitTotal = new Map()
    myWaitTotal.set(1, upComingTotalRef)
    myWaitTotal.set(2, scheduleTotalRef)
    myWaitTotal.set(3, questionTotalRef)
    myWaitTotal.set(4, delayTaskTotalRef)
    myWaitTotal.set(5, delayProjectTotalRef)
    myWaitTotal.set(6, freezeProjectTotalRef)
    myWaitTotal.set(7, unCompleteProjectTotalRef)
    // 待办 数据
    const upComingDataRef = useRef([]);
    const scheduleDataRef = useRef([]);
    const questionDataRef = useRef([]);
    const delayTaskDataRef = useRef([]);
    const delayProjectDataRef = useRef([]);
    const freezeProjectDataRef = useRef([]);
    const unCompleteProjectDataRef = useRef([]);
    // 待办 数据
    const myWaitData = new Map()
    myWaitData.set(1, upComingDataRef)
    myWaitData.set(2, scheduleDataRef)
    myWaitData.set(3, questionDataRef)
    myWaitData.set(4, delayTaskDataRef)
    myWaitData.set(5, delayProjectDataRef)
    myWaitData.set(6, freezeProjectDataRef)
    myWaitData.set(7, unCompleteProjectDataRef)
    // 每多一个页签 上面的内容每个多加一条内容
    // 下面的columns也要多配置一个 如果内容一样 可通过[].concat(targetList) 复制一个
    // 待办任务columns
    const tasksColumns = [
        {
            title: '提交',
            dataIndex: 'progressStatus',
            width: 40,
            render: (i, r, t) => {
                const status = i === 1
                return <Checkbox checked={status} onChange={() => onCheckChange(i, r, t)} />;
            },
        },
        {
            title: '任务名称',
            dataIndex: 'taskName',
            render: (text, row) => (
                <Popover content={text} placement="topLeft">
                    <div
                        className={classNames("taskName", row.deferredDays > 0 && "delay")}
                    >
                        {text}
                    </div>
                </Popover>
            )
        },
        {
            title: '关联项目',
            dataIndex: 'projectName',
            width: 100,
            render: (text, row) => "查看项目"
        },
        {
            title: '图标',
            dataIndex: 'bug',
            width: 40,
            render: isBug => {
                if (isBug) {
                    return <i className="iconfont icon-bug1" />
                } else {
                    return null
                }
            },
        },
        {
            title: '状态',
            dataIndex: 'priority',
            width: 90,
            render: status => (
                <div
                    className={classNames(
                        'statusTag',
                        initData.statusTypesClass.get(status)
                    )}
                >
                    {initData.statusTypes.get(status)}
                </div>
            ),
        },
        {
            title: '延期',
            dataIndex: 'deferredDays',
            width: 90,
            render: day => (day > 0 ? <div className={'delay'}>延期:{day}天</div> : null),
        },
        {
            title: '历时',
            dataIndex: 'takeTime',
            width: 90,
            render: day => <div className={"duration"}>历时:{day}天</div>,
        },
        {
            title: '截止',
            dataIndex: 'endDate',
            width: 120,
            render: (date, row) => {
                if (date) {
                    const day = moment(date).format('YYYY-MM-DD');
                    const today = moment().format('YYYY-MM-DD');
                    const isToday = day === today;
                    return (
                        <div className={classNames('deadline', row.deferredDays > 0 && 'delay', isToday && 'isToday')}>
                            {moment(date).format('MM月DD日')}截止
                        </div>
                    );
                }
                return ""
            },
        },
    ];
    const taskCreateColumns = [
        {
            title: '创建',
            dataIndex: 'f',
            width: 130,
            render: (date, row) => {
                const day = moment(date).format('YYYY-MM-DD');
                const today = moment().format('YYYY-MM-DD');
                const isToday = day === today;
                return (
                    <div className={classNames('deadline', isToday && 'isToday', row.d > 0 && 'delay')}>
                        {moment(date).format('MM月DD日')}创建
                    </div>
                );
            },
        },
    ]
    // 新增任务columns
    const newAddTaskColumns = [].concat(tasksColumns)
    newAddTaskColumns.splice(5, 1)
    newAddTaskColumns.splice(newAddTaskColumns.length - 1, 1, ...taskCreateColumns)
    // 待办日程columns
    const scheduleColumns = [
        {
            title: '时间',
            dataIndex: 'a',
            width: 60,
            render: (text, row, index) => {
                return (
                    <div>
                        <p className={'scheduleTimeStart'}>{row.start}</p>
                        <p className={'scheduleTimeEnd'}>{row.end}</p>
                    </div>
                );
            },
        },
        {
            title: '日程',
            dataIndex: 'b',
            render: (text, row, index) => {
                const targetDay = moment(row.date).format('YYYY-MM-DD');
                const today = moment(new Date()).format('YYYY-MM-DD');
                const isToday = targetDay === today;
                return (
                    <div>
                        <p className={'scheduleText scheduleTitle'}>{row.title}</p>
                        <p className={'scheduleText1'}>
                            {isToday && <span className={'todayTag'}>今日</span>}
                            {!isToday && moment(row.date).format('MM-DD')}
                            <span className={'room'}>{row.room}</span>
                        </p>
                    </div>
                );
            },
        },
        {
            title: '人员',
            dataIndex: 'user',
            align: 'right',
            render: (user, row, index) => {
                return <div>人员</div>
            },
        },
    ];
    // 待办问题columns
    const questionColumns = [
        {
            title: '问题名称',
            dataIndex: 'topic',
            render: (text, row, index) => {
                return (
                    <Popover content={text} placement="topLeft">
                        <div
                            className={"questionTitle"}
                            // style={{maxWidth: questionMaxWidth}}
                            onClick={() => {
                                // showBugDetail(row.id)
                                // showBugDetail(40621)
                            }}
                        >
                            {text}
                        </div>
                    </Popover>
                )
            }
        },
        {
            title: '产品名称',
            dataIndex: 'product',
            render: (name, row, index) => (
                <div className={'questionProduct'}>{name}</div>
            ),
        },
        {
            title: '状态',
            dataIndex: 'priority',
            width: 80,
            render: status => (
                <div className={classNames('questionStatus', initData.questionClass.get(status))}>
                    {status}
                </div>
            ),
        },
        {
            title: '历时',
            dataIndex: 'takeTime',
            width: 120,
            render: duration => <div className={'questionDuration'}>历时:{duration}天</div>,
        },
        {
            title: '创建时间',
            dataIndex: 'gmtCreate',
            width: 120,
            render: create => (
                <div>
                    {moment(create).format('MM月DD')}
                    &nbsp; 创建
                </div>
            ),
        },
    ];
    // 延期项目 冻结项目columns
    const programmeColumns = [
        {
            title: '提交',
            dataIndex: 'existStatus',
            width: 40,
            render: (i, r, t) => {
                const status = i === 1
                return <Checkbox
                    checked={status}
                    disabled={!!r.isClose}
                    onChange={() => onProjectCheckChange(i, r, t)}
                />;
            },
        },
        {
            title: '项目名称',
            dataIndex: 'projectName',
            render: (name, row) => (
                <Popover content={name} placement="topLeft">
                    <Link
                        className={classNames(
                            "projectName",
                            row.deferredDays > 0 && "delay"
                        )}
                        to={`/project/${row.id}/board`}
                        target={"_blank"}
                    >
                        {/*查看项目*/}
                        {name}
                    </Link>
                </Popover>
            )
        },
        {
            title: '产品名称',
            dataIndex: 'mainProjectName',
            width: 150,
            render: (name, row, index) => {
                const { projectType } = row
                let path
                switch (projectType) {
                    case 2:
                        path = `/product/${row.mainProject}` // 产品名称
                        break
                    case 1:
                        path = `/project/main/${row.mainProject}/projects` // 项目树
                        break
                    case 3:
                        path = `/project/impl/${row.mainProject}/dashboard` // 商机项目树
                        break
                    default:
                        break
                }
                return (
                    <Popover content={name} placement="topLeft">
                        <Link
                            className={'productName'}
                            to={path}
                            target={"_blank"}
                        >
                            {initData.progressIcon(row.projectType)}
                            &nbsp;&nbsp;
                            {/*{name}*/}
                            {initData.progressName(row.projectType)}
                        </Link>
                    </Popover>
                )
            },
        },
        {
            title: '类型',
            dataIndex: 'templateMode',
            width: 60,
            render: type => <div className={'programmeType'}>{initData.programmeType.get(type)}</div>,
        },
        {
            title: '进度',
            dataIndex: 'progress',
            width: 60,
            // render: percent => <Progress percent={~~percent} strokeColor={initData.progressColor(~~percent)} />,
            render: percent => `${~~percent}%`,
        },
        {
            title: '历时',
            dataIndex: 'takeTime',
            width: 100,
            render: day => <div className={"duration"}>历时:{~~day}天</div>,
        },
        {
            title: '延期',
            dataIndex: 'deferredDays',
            width: 100,
            render: day => (day > 0 ? <div className={'delay'}>延期:{day}天</div> : null),
        },
        {
            title: '截止',
            dataIndex: 'endDate',
            width: 120,
            render: (date, row) => {
                if (date) {
                    const day = moment(date).format('YYYY-MM-DD');
                    const today = moment().format('YYYY-MM-DD');
                    const isToday = day === today;
                    return (
                        <div className={classNames('deadline', isToday && 'isToday', row.delay > 0 && 'delay')}>
                            {moment(date).format('MM月DD日')}截止
                        </div>
                    );
                }
                return ""
            },
        },
    ];
    const columnsUser = [
        {
            title: '人员',
            dataIndex: 'manager',
            align: 'right',
            width: 60,
            render: (manager, row, index) => <div>人员</div>
        },
    ];
    const programmeDoingColumns = [].concat(programmeColumns, columnsUser);
    // 配置我的待办columns字段
    const upComingColumns = new Map();
    upComingColumns.set(1, tasksColumns);
    upComingColumns.set(2, scheduleColumns);
    upComingColumns.set(3, questionColumns);
    upComingColumns.set(4, tasksColumns);
    upComingColumns.set(5, programmeColumns);
    upComingColumns.set(6, programmeColumns);
    upComingColumns.set(7, programmeDoingColumns);

    // 初始搜索
    const [myWaitSearch, setMyWaitSearch] = useState(myWaitFinishSearch.get(1));

    const [myWaitPageSize, setMyWaitPageSize] = useState(7);
    const [myWaitActiveKey, setMyWaitActiveKey] = useState(myWaitRef.current);
    const [myWaitCurrentPage, setMyWaitCurrentPage] = useState(1);
    const [myWaitTotalNum, setMyWaitTotalNum] = useState(0);
    // 设置我的待办 表格数据
    const [upComSource, setUpComSource] = useState([]);
    // 设置页签当前排序
    const [myWaitSort, setMyWaitSort] =
        useState(myWaitSortList.get(~~myWaitActiveKey).current);
    // 设置页签当前时间
    const [myWaitDate, setMyWaitDate] =
        useState(myWaitDateList.get(~~myWaitActiveKey).current);
    // 设置任务详情弹窗状态
    const [taskModalFlag, setTaskModalFlag] = useState(false)

    useEffect(() => {
        (async () => {
            await getMyWaitData()
        })()
    }, [
        myWaitActiveKey, // tab索引
        myWaitSort, // 排序
        myWaitSearch, // 搜索条件
        myWaitDate, // 日期
        myWaitCurrentPage, // 页数
        taskModalFlag // 任务弹窗
    ])

    const initSet = () => {
        const currentKey = ~~myWaitRef.current
        const pageTarget = myWaitPage.get(currentKey)
        pageTarget.current = 1
        setMyWaitCurrentPage(1)
        myWaitData.get(currentKey).current = []
        setUpComSource(() => [...myWaitData.get(currentKey).current])
    }

    // 排序变更
    const myWaitSortChange = (status) => {
        const target = myWaitSortList.get(~~myWaitActiveKey)
        target.current = status
        setMyWaitSort(target.current)
        initSet()
        // 发送数据请求
    }
    // 日期变更
    const myWaitDateChange = (date) => {
        const target = myWaitDateList.get(~~myWaitActiveKey)
        target.current = date
        setMyWaitDate(target.current)
        initSet()
    }
    // 搜索条件变更
    const myWaitChangeSearch = (val, index) => {
        const target = myWaitFinishSearch.get(~~myWaitRef.current)
        target[index].value = val
        setMyWaitSearch([...target]);
        initSet()
    };
    // 获取数据
    const getMyWaitData = async () => {
        const target = myWaitFinishSearch.get(~~myWaitRef.current)
        const pageTarget = myWaitPage.get(~~myWaitRef.current)
        let data = {}
        const params = {}
        if ([1, 4].includes(~~myWaitRef.current)) {
            // 待办任务 延期任务 进度状态 0
            params.progressStatus = 0
            // 待办类型
            params.taskType = "upcoming"
        }
        if ([4].includes(~~myWaitRef.current)) {
            // 延期任务 延期状态 1
            params.isExtension = 1
        }
        if ([5].includes(~~myWaitRef.current)) {
            // 延期项目
            params.projectType = "extension"
        }
        if ([6].includes(~~myWaitRef.current)) {
            // 冻结项目
            params.projectType = "freezing"
        }
        if ([7].includes(~~myWaitRef.current)) {
            // 进行中项目
            params.projectType = "unfinished"
        }
        if (![5, 6, 7].includes(~~myWaitRef.current)) {
            // 不是项目模块 有时间
            // 日期 开始时间 startTime 结束时间 endTime
            params.startTime = moment(myWaitDate.startDate).startOf("day").valueOf()
            params.endTime = moment(myWaitDate.endDate).endOf("day").valueOf()
        }
        // 排序
        params.desc = myWaitSort
        // 页数
        params.pageNum = pageTarget.current
        params.pageSize = myWaitPageSize
        // 下拉框字段
        target.map(item => {
            params[item.field] = item.value
        })
        // 请求接口
        if ([1, 4].includes(~~myWaitRef.current)) {
            // 待办任务 延期任务
            // data = await getTaskList(params)
        }
        if ([3].includes(~~myWaitRef.current)) {
            // 待办问题
            // data = await getQuestionList(params)
        }
        if ([5, 6, 7].includes(~~myWaitRef.current)) {
            // 待办问题
            // data = await getProjectList(params)
        }

        if (data) {
            // 返回的列表字段需要统一  目前是list
            myWaitData.get(~~myWaitRef.current).current = data.list || []
        } else {
            myWaitData.get(~~myWaitRef.current).current = []
        }

        setUpComSource(() => myWaitData.get(~~myWaitRef.current).current)
        if (data) {
            // 设置总条数
            myWaitTotal.get(~~myWaitRef.current).current = data.total
            setMyWaitTotalNum(data.total)
        }
    }

    const onCheckChange = async (val, row, index) => {
        try {
            // const res = await taskStatusChange(row)
            const res = true
            if (res) {
                // 我的待办 checkBox选择操作
                const target = cloneDeep(myWaitData.get(~~myWaitActiveKey).current)
                // 完成状态
                target[index].progressStatus = 1 - target[index].progressStatus;
                myWaitData.get(~~myWaitActiveKey).current = target
                // 通过index 获取数据row 发送请求
                setUpComSource(() => myWaitData.get(~~myWaitActiveKey).current);
            }
        } catch (e) {

        }
    };

    const onProjectCheckChange = async (val, row, index) => {
        const callback = () => {
            const status = row.existStatus === 1 ? 0 : 1
            // 我的待办 checkBox选择操作
            const target = cloneDeep(myWaitData.get(~~myWaitActiveKey).current)
            // 完成状态
            target[index].existStatus = status;
            myWaitData.get(~~myWaitActiveKey).current = target
            // 通过index 获取数据row 发送请求
            setUpComSource(() => myWaitData.get(~~myWaitActiveKey).current);
        }

        if (row.existStatus === 1) {
            // await openProject(row, callback)
        } else {
            // await closeProject(row, callback)
        }
    };

    const tabChange = (val, type) => {
        // 列表数据切换 tab选择值修改 搜索条件修改
        if (type === "upComing") {
            myWaitRef.current = val
            setMyWaitActiveKey(myWaitRef.current)
            setUpComSource(() => myWaitData.get(~~val).current)
            const target = myWaitFinishSearch.get(~~val)
            setMyWaitSearch(target)

            const totalTarget = myWaitTotal.get(~~val)
            setMyWaitTotalNum(totalTarget.current)

            const sort = myWaitSortList.get(~~val)
            setMyWaitSort(sort.current)
            const date = myWaitDateList.get(~~val)
            setMyWaitDate(date.current)
            const pageTarget = myWaitPage.get(~~val)
            setMyWaitCurrentPage(pageTarget.current)
        }
    }

    const onPageChange = (val) => {
        const pageTarget = myWaitPage.get(~~myWaitRef.current)
        pageTarget.current = val
        setMyWaitCurrentPage(pageTarget.current)
    }

    return (
        <div className={"TabShowDemo"}>
            <TabsBox
                type={"upComing"}
                searchList={myWaitSearch}
                title={"我的待办"}
                initDataSource={upComSource}
                tabChange={tabChange}
                initColumns={upComingColumns}
                panes={initData.upComingPanes}
                rowClick={myWaitActiveKey === "2"} // 待办日程 2
                onSort={myWaitSortChange}
                sortStatus={myWaitSort}
                dateChange={myWaitDateChange}
                date={myWaitDate}
                getData={getMyWaitData}
                current={myWaitCurrentPage}
                total={myWaitTotalNum}
                pageSize={myWaitPageSize}
                pageChange={onPageChange}
                isProject={[5,6,7].includes(~~myWaitActiveKey)} // 项目 5 6 7
            />
        </div>
    )
}

export default TabShowDemo;
