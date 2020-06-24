import React from 'react';
import catImg from "./img/cat.jpg"
import "./screenshot.less"

const LEFT_TOP = "leftTop"
const RIGHT_TOP = "rightTOp"
const LEFT_BOTTOM = "leftBottom"
const RIGHT_BOTTOM = "rightBottom"
const LEFT_CENTER = "leftCenter"

class Screenshot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ctx: null,
            canvas: null,
            start: false,
            borderWidth: 32,
            minWidth: 100,
            minHeight: 100,
            canvasWidth: 400,
            canvasHeight: 400
        }
        this.canvasRef = React.createRef()
        this.imgRef = React.createRef()
        this.maskRef = React.createRef()
        this.imgBoxRef = React.createRef()
    }

    componentDidMount = async () => {
        this.setCanvas()
    }

    setCanvas = async () => {
        const canvas = this.canvasRef.current
        const ctx = canvas.getContext("2d")
        await this.setState({ ctx, canvas })
    }

    onMouseDown = (e) => {
        e.preventDefault()
        e.persist()
        const { start, borderWidth } = this.state
        const imgBox = this.imgBoxRef.current
        if (!start) {
            const startX = e.clientX
            const startY = e.clientY
            const mask = this.maskRef.current
            const startW = mask.clientWidth
            const startH = mask.clientHeight
            let direction = null

            const diffX = startX - imgBox.offsetLeft - mask.offsetLeft
            const diffY = startY - imgBox.offsetTop - mask.offsetTop

            if (
                diffX > borderWidth &&
                diffY > borderWidth &&
                diffX < mask.clientWidth - borderWidth &&
                diffY < mask.clientHeight - borderWidth
            ) {
                direction = LEFT_CENTER
            } else if (diffX <= borderWidth && diffY <= borderWidth) {
                direction = LEFT_TOP
            } else if (diffX >= mask.clientWidth - borderWidth && diffY <= borderWidth) {
                direction = RIGHT_TOP
            } else if (diffX <= borderWidth && diffY >= borderWidth) {
                direction = LEFT_BOTTOM
            } else if (
                diffX >= mask.clientWidth - borderWidth &&
                diffY >= mask.clientHeight - borderWidth
            ) {
                direction = RIGHT_BOTTOM
            }

            this.setState({
                start: true,
                startX,
                startY,
                startW,
                startH,
                direction,
                startT: mask.offsetTop,
                startL: mask.offsetLeft
            })
        }
    }

    onMouseMove = async (e) => {
        e.preventDefault()
        const {
            start,
            startX,
            startY,
            direction,
            startW,
            startH,
            startT,
            startL,
            minWidth,
            minHeight
        } = this.state
        const mask = this.maskRef.current
        const img = this.imgRef.current

        if (start) {
            let moveX =  e.clientX - startX
            let moveY = e.clientY - startY
            if (direction === LEFT_TOP) {
                const dLeftTopWidth = startW - moveX
                const dLeftTopHeight = startH - moveY
                const dLeft = startL + moveX
                if (dLeftTopWidth < minWidth || dLeftTopHeight < minHeight) return
                if ((mask.offsetLeft + mask.clientWidth) > img.clientWidth) return
                const dTop = startT + moveY
                mask.style.top = dTop <= 0 ? 0 : dTop  + "px"
                mask.style.left = dLeft <= 0 ? 0 : dLeft + "px"

                mask.style.width = dLeftTopWidth < minWidth ? minWidth : dLeftTopWidth + "px"
                mask.style.height = dLeftTopHeight < minHeight ? minHeight : dLeftTopHeight + "px"
            }
            if (direction === LEFT_BOTTOM) {
                const dLeft = startL + moveX
                const dLeftBottomWidth = startW - moveX
                const dLeftBottomHeight = startH + moveY
                if (dLeftBottomWidth < minWidth || dLeftBottomHeight < minHeight) return
                if ((mask.offsetTop + mask.clientHeight) > img.clientHeight) return
                mask.style.left = dLeft <= 0 ? 0 : dLeft + "px"
                mask.style.width = dLeftBottomWidth < minWidth ? minWidth : dLeftBottomWidth + "px"
                mask.style.height = dLeftBottomHeight < minHeight ? minHeight : dLeftBottomHeight + "px"
            }
            if (direction === RIGHT_BOTTOM) {
                const dRightBottomWidth = startW + moveX
                const dRightBottomHeight = startH + moveY
                if (dRightBottomWidth < minWidth || dRightBottomHeight < minHeight) return
                if ((mask.offsetTop + mask.clientHeight) > img.clientHeight) return
                if ((mask.offsetLeft + mask.clientWidth) > img.clientWidth) return
                mask.style.width = dRightBottomWidth < minWidth ? minWidth : dRightBottomWidth + "px"
                mask.style.height = dRightBottomHeight < minHeight ? minHeight : dRightBottomHeight + "px"
            }
            if (direction === RIGHT_TOP) {
                const dTop = startT + moveY
                const dRightTopWidth = startW + moveX
                const dRightTopHeight = startH - moveY
                if (dRightTopWidth < minWidth || dRightTopHeight < minHeight) return
                if ((mask.offsetLeft + mask.clientWidth) > img.clientWidth) return
                mask.style.top = dTop <= 0 ? 0 : dTop + "px"
                mask.style.width = dRightTopWidth < minWidth ? minWidth : dRightTopWidth + "px"
                mask.style.height = dRightTopHeight < minHeight ? minHeight : dRightTopHeight + "px"
            }

            if (direction === LEFT_CENTER) {
                // 中间移动的
                const dLeft = startL + moveX
                const dTop = startT + moveY
                const mTop = img.clientHeight - mask.clientHeight
                const mLeft = img.clientWidth - mask.clientWidth
                const tTop = dTop > mTop
                const tLeft = dLeft > mLeft

                mask.style.top = (dTop <= 0 ? 0 : tTop ? mTop : dTop) + "px"
                mask.style.left = dLeft <= 0 ? 0 : tLeft ? mLeft : dLeft + "px"
            }
        }
    }

    onMouseUp = async (e) => {
        e.preventDefault()
        const mask = this.maskRef.current
        this.setState({
            start: false,
            startT: mask.offsetTop,
            startL: mask.offsetLeft
        })
        this.setCanvasImg()
    }

    onMouseLeave = async (e) => {
        e.preventDefault()
        const mask = this.maskRef.current
        this.setState({
            start: false,
            startT: mask.offsetTop,
            startL: mask.offsetLeft
        })
        this.setCanvasImg()
    }

    setCanvasImg = async () => {
        const { ctx, canvas } = this.state
        const { onChange } = this.props
        const mask = this.maskRef.current
        const img = this.imgRef.current
        ctx.clearRect(0,0, canvas.width, canvas.height);
        ctx.drawImage(
            img,
            mask.offsetLeft * 2,
            mask.offsetTop * 2,
            mask.clientWidth * 2,
            mask.clientHeight * 2,
            0, 0, canvas.width, canvas.height)
        // toDataURL(type, quality) 参数可选
        // type 默认为 image/png
        // quality 0-1 默认为 0.92
        const dataURL = canvas.toDataURL("image/jpeg", 1.0);
        onChange && onChange(dataURL)
        await this.setState({ ctx, dataURL })
    }

    render () {
        const { canvasWidth, canvasHeight} = this.state
        return (
            <div className={"screenshotBox"}>
                <div
                    className={"imgBox"}
                    ref={this.imgBoxRef}
                >
                    <img
                        id={"img"}
                        src={catImg}
                        alt=""
                        className={"img"}
                        ref={this.imgRef}
                        onMouseMove={(e) => e.preventDefault()}
                        onMouseDown={(e) => e.preventDefault()}
                        onMouseUp={this.onMouseUp}
                    />
                    <div
                        ref={this.maskRef}
                        className={"mask"}
                        onMouseDown={this.onMouseDown}
                        onMouseLeave={this.onMouseLeave}
                        onMouseMove={this.onMouseMove}
                        onMouseUp={this.onMouseUp}
                    />
                </div>
                <div className={"imgBox"}>
                    <canvas
                        width={canvasWidth}
                        height={canvasHeight}
                        id={"canvas"}
                        ref={this.canvasRef}
                    />
                </div>
            </div>
        )
    }
}

export default Screenshot;
