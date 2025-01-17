import { forwardRef, InputHTMLAttributes, useState } from 'react'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
    classNameInput?: string
    classNameError?: string
    errorMessage?: string
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberInner(
    { errorMessage, className, classNameInput, classNameError, value, onChange, onBlur, ...rest },
    ref
) {
    const [localValue, setLocalValue] = useState<string>(value as string)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        if (/^\d+$/.test(value) || value === '') {
            // Thực thi onChange callback từ bên ngoài truyền vào props
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            onChange && onChange(event)
            // Cập nhât localValue State
            setLocalValue(value)
        }
    }

    const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        onBlur && onBlur(event)
    }

    return (
        <div className={className}>
            <input
                className={classNameInput}
                onChange={handleChange}
                value={value === undefined ? localValue : value}
                onBlur={handleBlur}
                {...rest}
                ref={ref}
            />
            <div className={classNameError}>{errorMessage}</div>
        </div>
    )
})
export default InputNumber
