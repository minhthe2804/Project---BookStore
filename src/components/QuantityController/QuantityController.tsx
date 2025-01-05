import { useState } from 'react'
import InputNumber, { InputNumberProps } from '../InputNumber'
import Button from '../Button'

interface Props extends InputNumberProps {
    max?: number
    border?: string
    setHeightBtn?: string
    setHeightInput?: string
    setWidthBtn?: string
    setWidthIcon?: string
    setColorIcon?: string
    onIncrease?: (value: number) => void
    onDecrease?: (value: number) => void
    onType?: (value: number) => void
    onFocusOut?: (value: number) => void
}

export default function QuantityController({
    max,
    onIncrease,
    onDecrease,
    onFocusOut,
    onType,
    value,
    border,
    setHeightBtn,
    setHeightInput,
    setWidthBtn,
    setWidthIcon = 'w-[10px]',
    setColorIcon = 'bg-[#333333]',
    ...rest
}: Props) {
    const [localValue, setLocalValue] = useState(Number(value) || 0)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let _value = Number(event.target.value)
        if (max !== undefined && _value > max) {
            _value = max
        } else if (_value < 1) {
            _value = 1
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        onType && onType(_value)

        // xét localValue State
        setLocalValue(_value)
    }

    const increase = () => {
        // eslint-disable-next-line prefer-const
        let _value = Number(value || localValue) + 1

        if (max !== undefined && _value > max) {
            _value = max
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        onIncrease && onIncrease(_value)
        setLocalValue(_value)
    }

    const decrease = () => {
        // eslint-disable-next-line prefer-const
        let _value = Number(value || localValue) - 1

        if (_value < 1) {
            _value = 1
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        onDecrease && onDecrease(_value)
        setLocalValue(_value)
    }

    const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        onFocusOut && onFocusOut(Number(event.target.value))
    }

    return (
        <div className={'flex items-center'}>
            <Button className={`${setWidthBtn} ${setHeightBtn} border-[1px] ${border} group `} onClick={decrease}>
                <div
                    className={`${setWidthIcon} h-[2px] ${setColorIcon} group-hover:bg-[#ff3237] transition duration-200 ease-in`}
                ></div>
            </Button>
            <InputNumber
                value={value || localValue}
                classNameInput={`w-[74px] ${setHeightInput} border-t-[1px] border-b-[1px] ${border} outline-none text-[#333333] text-center`}
                classNameError='hidden'
                className=''
                onChange={handleChange}
                onBlur={handleBlur}
                {...rest}
            />
            <Button className={`${setWidthBtn} ${setHeightBtn} border-[1px] ${border} group `} onClick={increase}>
                <div
                    className={`relative ${setWidthIcon} h-[2px] ${setColorIcon} group-hover:bg-[#ff3237] transition duration-200 ease-in`}
                ></div>
                <div
                    className={`${setWidthIcon} h-[2px] ${setColorIcon} rotate-90 absolute group-hover:bg-[#ff3237] transition duration-200 ease-in`}
                ></div>
            </Button>
        </div>
    )
}
