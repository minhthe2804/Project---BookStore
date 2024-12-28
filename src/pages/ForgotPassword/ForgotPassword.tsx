import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { authApi } from '~/apis/auth.api'

import Button from '~/components/Button'
import Input from '~/components/Input'
import { path } from '~/constants/path'
import { toastNotify } from '~/constants/toastNotify'
import { schema, Schema } from '~/utils/rules'

type FormData = Pick<Schema, 'email' | 'password'>
const forgotPasswordSchema = schema.pick(['email', 'password'])
export default function ForgotPassword() {
    const [isEmail, setIsEmail] = useState<boolean>(false)
    const [count, setCount] = useState<number>(0)
    const [errorEmail, setErrorEmail] = useState<string>('')
    const [errorPassword, setErrorPassword] = useState<string>('')
    const {
        register,
        reset,
        handleSubmit,
        getValues,
        formState: { errors }
    } = useForm<FormData>({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: yupResolver(forgotPasswordSchema)
    })

    const navigate = useNavigate()
    const { data: dataUser, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: () => authApi.login()
    })

    const forgotPasswordMutation = useMutation({
        mutationFn: (bodyData: {
            id: string
            body: {
                name: { firstname: string; lastname: string }
                username: string
                email: string
                password: string
            }
        }) => authApi.forgotPassword(bodyData.id, bodyData.body)
    })

    const onSubmit = handleSubmit((data) => {
        const { email, password } = data
        const findUser = dataUser?.data.find((user) => user.email === email)
        const comparePassword = findUser?.password === password
        if (!findUser) {
            if (errorPassword) {
                setErrorPassword('')
            }
            setErrorEmail(toastNotify.forgotPassword.emailError)
            return
        }
        if (comparePassword) {
            setErrorPassword(toastNotify.forgotPassword.passwordError)
            return
        }
        const bodyData = {
            id: findUser.id,
            body: {
                ...findUser,
                password
            }
        }
        forgotPasswordMutation.mutate(bodyData, {
            onSuccess: () => {
                refetch()
                reset()
                navigate(path.login)
                toast.success(toastNotify.forgotPassword.changePasswordSuccess, {
                    autoClose: 2000
                })
            }
        })
    })

    const handleOpenPassword = () => {
        const inputEmail = getValues('email')
        const findUser = dataUser?.data.find((user) => user.email === inputEmail)
        // eslint-disable-next-line no-useless-escape
        const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (findUser) {
            setIsEmail(true)
            if (count >= 2) {
                setCount(2)
                return
            }
            setCount((prev) => prev + 1)
            setErrorEmail('')
            return
        }
        if (inputEmail.trim() === '') {
            setErrorEmail(toastNotify.forgotPassword.isEmtyEmail)
            return
        }
        if (!validEmail.test(inputEmail)) {
            setErrorEmail(toastNotify.forgotPassword.isValidEmail)
            return
        }
        setErrorEmail(toastNotify.forgotPassword.emailError)
    }

    const handleClosePassword = () => {
        setIsEmail(false)
        reset()
        setCount(0)
    }

    return (
        <div>
            <p className='text-[14px] text-[#555555]'>
                Bạn quên mật khẩu? Nhập địa chỉ email để lấy lại mật khẩu qua email.
            </p>
            <form className='mt-1' onSubmit={onSubmit}>
                <Input
                    classNameError='text-red-500 text-[14px] mt-1 min-h-[20px]'
                    classNameInput='w-full outline-none border-[1px] border-[#ebebeb] rounded-[4px] py-[9px] px-4 placeholder:text-[15px] placeholder:text-[#555d6b] focus:border-blue-400 transition duration-300 ease-in text-[15px] text-[#555d6b] mt-2'
                    label='Email'
                    isFont
                    register={register}
                    errorMessage={errors.email?.message}
                    name='email'
                    type='text'
                    placeholder='Email'
                    errorEmail={errorEmail}
                    setErrorEmail={setErrorEmail}
                    inputEmail
                />
                {isEmail && (
                    <Input
                        classNameError='text-red-500 text-[14px] mt-1 min-h-[20px]'
                        classNameInput='w-full outline-none border-[1px] border-[#ebebeb] rounded-[4px] py-[9px] px-4 placeholder:text-[15px] placeholder:text-[#555d6b] focus:border-blue-400 transition duration-300 ease-in text-[15px] text-[#555d6b] mt-2'
                        label='Mật khẩu'
                        isFont
                        register={register}
                        errorMessage={count > 1 ? errors.password?.message : ''}
                        name='password'
                        type='text'
                        placeholder='Đặt lại mật khẩu mới'
                        errorPassword={errorPassword}
                        inputPassword
                        setErrorPassword={setErrorPassword}
                    />
                )}

                <div className='flex items-center gap-6'>
                    <Button
                        className={classNames(
                            'w-[142px] py-[9px] bg-[#337ab7] text-[14px] text-white hover:bg-[#286090] transition duration-200 ease-in flex items-center justify-center',
                            {
                                // 'w-[126px] py-[9px] bg-[#ff3237] opacity-[0.8] rounded-[30px] text-[14px] font-[600] text-[#333333] flex items-center justify-center':
                                //     updateCartMutation.isPending
                            }
                        )}
                        onClick={handleOpenPassword}
                        // isLoading={updateCartMutation.isPending}
                        // disabled={updateCartMutation.isPending}
                    >
                        {isEmail ? 'Đặt lại mật khẩu' : 'Xác thực Email'}
                    </Button>
                    {isEmail && (
                        <p
                            className='text-[14px] text-[#337ab7] hover:text-[#f16325] cursor-pointer transtion duration-200 ease-in'
                            onClick={handleClosePassword}
                        >
                            Trở lại
                        </p>
                    )}
                </div>
            </form>
        </div>
    )
}
