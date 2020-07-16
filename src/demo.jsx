import React, { useState, useEffect, useRef } from "react";
import { Button } from "antd"

const Demo = () => {
    const numRef = useRef(1)
    const [num, changeNum] = useState(numRef.current)
    const [str, changeStr] = useState("现在数字是1")

    const getNum = () => {
        const newStr = "现在数字是" + numRef.current
        changeStr(newStr)
    }

    const setNum = () => {
        numRef.current = num + 1
        changeNum(numRef.current)
        getNum()
    }


    return (
        <div>
            <Button onClick={setNum}>点我+1</Button>
            <div>{num}</div>
            <div>{str}</div>
        </div>
    )
}

export default Demo
