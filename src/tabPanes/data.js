import React from 'react';
import moment from "moment"
import { Icon } from "antd"

const upcomingTasksSource = [
    {
        submit: true,
        a: '一段任务名称',
        b: 'TeamworkV3.1实施项目',
        c: 3,
        d: 15,
        e: 32,
        f: new Date('2020-07-06'),
        isBug: false,
    },
    {
        submit: false,
        a: '一段任务名称',
        b: 'TeamworkV3.1实施项目',
        c: 1,
        d: null,
        e: 32,
        f: new Date('2020-07-08'),
        isBug: true,
    },
    {
        submit: false,
        a: '一段任务名称',
        b: 'TeamworkV3.1实施项目',
        c: 2,
        d: 23,
        e: 32,
        f: new Date(),
        isBug: true,
    },
    {
        submit: true,
        a: '一段任务名称',
        b: 'TeamworkV3.1实施项目',
        c: 3,
        d: null,
        e: 32,
        f: new Date(),
        isBug: false,
    },
    {
        submit: false,
        a: '一段任务名称',
        b: 'TeamworkV3.1实施项目',
        c: 1,
        d: 8,
        e: 32,
        f: new Date(),
        isBug: false,
    },
    {
        submit: false,
        a: '一段任务名称',
        b: 'TeamworkV3.1实施项目',
        c: 2,
        d: 23,
        e: 32,
        f: new Date(),
    },
    {
        submit: true,
        a: '一段任务名称',
        b: 'TeamworkV3.1实施项目',
        c: 1,
        d: 15,
        e: 32,
        f: new Date(),
        isBug: true,
    },
    {
        submit: false,
        a: '一段任务名称',
        b: 'TeamworkV3.1实施项目',
        c: 3,
        d: null,
        e: 32,
        f: new Date(),
    },
    {
        submit: false,
        a: '一段任务名称',
        b: 'TeamworkV3.1实施项目',
        c: 2,
        d: 23,
        e: 32,
        f: new Date(),
    },
];

const scheduleSource = [
    {
        start: '10:00',
        end: '11:30',
        title: '信息技术部周三部门早会',
        date: new Date('2020-07-06'),
        room: '607-8',
        user: { id: 13131791, staffName: '金阿敏' },
    },
    {
        start: '10:00',
        end: '11:30',
        title: '信息技术部周三部门早会',
        date: new Date('2020-07-07'),
        room: '607-8',
        user: { id: 13131791, staffName: '金阿敏' },
    },
    {
        start: '10:00',
        end: '11:30',
        title: '信息技术部周三部门早会',
        date: new Date('2020-07-07'),
        room: '607-8',
        user: { id: 13131791, staffName: '金阿敏' },
    },
    {
        start: '10:00',
        end: '11:30',
        title: '信息技术部周三部门早会',
        date: new Date('2020-07-08'),
        room: '607-8',
        user: { id: 13131791, staffName: '金阿敏' },
    },
    {
        start: '10:00',
        end: '11:30',
        title: '信息技术部周三部门早会',
        date: new Date('2020-07-09'),
        room: '607-8',
        user: { id: 13131791, staffName: '金阿敏' },
    },
];

const questionSource = [
    {
        title: '问题名称问题名称问题名称问题名称问题名称问题名称问题名称问题名称问题名称',
        productName: '产品名称',
        status: 0,
        duration: 52,
        create: new Date('2020-07-05'),
    },
    {
        title: '问题名称问题名称问题名称',
        productName: '产品名称',
        status: 1,
        duration: 52,
        create: new Date('2020-07-05'),
    },
    {
        title: '问题名称问题名称问题名称',
        productName: '产品名称',
        status: 2,
        duration: 52,
        create: new Date('2020-07-05'),
    },
];

const questionStatus = new Map();
questionStatus.set(1, '普通');
questionStatus.set(2, '紧急');
questionStatus.set(3, '非常紧急');

const questionClass = new Map();
questionClass.set(0, 'lowStatus');
questionClass.set(1, 'mediumStatus');
questionClass.set(2, 'highStatus');

const programmeSource = [
    {
        submit: true,
        projectName: '项目名称',
        productName: '项目树',
        type: 0,
        percent: 23,
        duration: 15,
        delay: 2,
        deadline: new Date('2020-07-12'),
        productType: 'tree',
    },
    {
        submit: false,
        projectName: '项目名称1',
        productName: '商机项目树',
        type: 1,
        percent: 75,
        duration: 8,
        delay: 1,
        deadline: new Date('2020-07-13'),
        productType: 'opportunity',
    },
    {
        submit: false,
        projectName: '项目名称2',
        productName: '产品名称',
        type: 2,
        percent: 100,
        duration: 18,
        delay: 0,
        deadline: new Date('2020-07-13'),
        productType: 'product',
    },
    {
        submit: false,
        projectName: '项目名称2',
        productName: '产品名称',
        type: 2,
        percent: 100,
        duration: 18,
        delay: 0,
        deadline: new Date('2020-07-09'),
        productType: 'product',
    },
];

const programmeIngSource = [
    {
        submit: true,
        projectName: '项目名称',
        productName: '项目树',
        type: 0,
        percent: 23,
        duration: 15,
        delay: 2,
        deadline: new Date('2020-07-12'),
        user: { id: 13131791, staffName: '金阿敏' },
        productType: 'tree',
        programmeStatus: 1
    },
    {
        submit: false,
        projectName: '项目名称1',
        productName: '商机项目树',
        type: 1,
        percent: 75,
        duration: 8,
        delay: 1,
        deadline: new Date('2020-07-13'),
        user: { id: 13131791, staffName: '金阿敏' },
        productType: 'opportunity',
        programmeStatus: 2
    },
    {
        submit: false,
        projectName: '项目名称2',
        productName: '产品名称',
        type: 2,
        percent: 100,
        duration: 18,
        delay: 0,
        deadline: new Date('2020-07-13'),
        user: { id: 13131791, staffName: '金阿敏' },
        productType: 'product',
        programmeStatus: 1
    },
    {
        submit: false,
        projectName: '项目名称2',
        productName: '产品名称2',
        type: 2,
        percent: 100,
        duration: 18,
        delay: 0,
        deadline: new Date('2020-07-09'),
        user: { id: 13131791, staffName: '金阿敏' },
        productType: 'product',
        programmeStatus: 3
    },
];

const enjoyProductSource = [
    {
        productName: "TeamWork",
        unComplete: 80,
        onGoing: 3,
        total: 30,
        user: { id: 13131791, staffName: '金阿敏' },
    }
]

const enjoyTreeSource = [
    {
        projectName: "商机项目树名称",
        saleName: "张三",
        demand: 80,
        onGoing: 3,
        total: 30,
        user: { id: 13131791, staffName: '金阿敏' },
        productType: "opportunity"
    },
    {
        projectName: "项目树名称",
        saleName: "李四",
        demand: 80,
        onGoing: 3,
        total: 30,
        user: { id: 13131791, staffName: '金阿敏' },
        productType: "tree"
    },
    {
        projectName: "产品名称",
        saleName: "李四",
        demand: 80,
        onGoing: 3,
        total: 30,
        user: { id: 13131791, staffName: '金阿敏' },
        productType: "product"
    }
]

const programmeType = new Map();
programmeType.set(0, '通用');
programmeType.set(1, '开发');
// programmeType.set(2, '三方');
// programmeType.set(3, '预留');
programmeType.set(4, '咨询');
programmeType.set(5, '售前');
programmeType.set(6, '实施');

const progressColor = percent => {
    if (percent < 40) {
        return '#2a8ef7';
    }
    if (percent < 100) {
        return '#f59a23';
    }
    if (percent === 100) {
        return '#5bc532';
    }
};

const progressIcon = type => {
    if (type === 1) {
        return <Icon icon={'tw-list'} />;
    }
    if (type === 3) {
        return <Icon icon={'tw-moneynew'} />;
    }
    if (type === 2) {
        return <Icon icon={'tw-chanpin1'} />;
    }
};

const progressName = type => {
    if (type === 1) {
        return "项目树";
    }
    if (type === 3) {
        return "商机项目树";
    }
    if (type === 2) {
        return "产品";
    }
};

const timeTypes = new Map();
timeTypes.set(1, 'day');
timeTypes.set(2, 'week');
timeTypes.set(3, 'month');
timeTypes.set(4, 'year');

const executionOptions = [
    { label: '完成的任务数', value: 0 },
    { label: '完成的任务工时', value: 1 },
    { label: '完成任务延期率', value: 2 },
    { label: '总任务延期率', value: 3 },
    { label: '任务处理历时', value: 4 },
    { label: '任务处理耗时', value: 5 }
]

const chartUnit = new Map();
chartUnit.set(0, '单位: 个');
chartUnit.set(1, '单位: 小时');
chartUnit.set(2, '单位: %');
chartUnit.set(3, '单位: %');
chartUnit.set(4, '单位: 天');
chartUnit.set(5, '单位: 小时');

const upComingPanes = [
    { title: '待办任务', key: 1 },
    { title: '待办日程', key: 2 },
    { title: '待办问题', key: 3 },
    { title: '延期任务', key: 4 },
    { title: '延期项目', key: 5 },
    { title: '冻结项目', key: 6 },
    { title: '未完成项目', key: 7 },
];

const addAndCompletePanes = [
    { title: '新增任务', key: 1 },
    { title: '完成任务', key: 2 },
    { title: '新增项目', key: 3 },
    { title: '完成项目', key: 4 }
];

const participatePanes = [
    { title: '参与的任务', key: 1 },
    { title: '分配的任务', key: 2 },
    { title: '参与的产品', key: 3 },
    { title: '参与的项目树', key: 4 },
    { title: '参与的商机项目树', key: 5 }
];

const programmeStatus = new Map();
programmeStatus.set(1, '进行中');
programmeStatus.set(2, '挂起');
programmeStatus.set(3, '冻结');

const statusTypes = new Map();
statusTypes.set(0, '全部');
statusTypes.set(1, '普通');
statusTypes.set(2, '紧急');
statusTypes.set(3, '非常紧急');

const statusTypesClass = new Map();
statusTypesClass.set(0, 'primary');
statusTypesClass.set(1, 'primary');
statusTypesClass.set(2, 'priority');
statusTypesClass.set(3, 'veryUrgent');

export {
    upcomingTasksSource,
    scheduleSource,
    questionSource,
    questionStatus,
    questionClass,
    programmeSource,
    programmeIngSource,
    programmeType,
    progressColor,
    progressIcon,
    timeTypes,
    executionOptions,
    chartUnit,
    upComingPanes,
    addAndCompletePanes,
    programmeStatus,
    statusTypes,
    statusTypesClass,
    participatePanes,
    enjoyProductSource,
    enjoyTreeSource,
    progressName
};
