import { useMutation, useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'

import BreadCrumb from '~/components/BreadCrumb'
import Button from '~/components/Button'
import Input from '~/components/Input'
import { breadCrumb } from '~/constants/breadCrumb'
import { path } from '~/constants/path'
import { Schema, schema } from '~/utils/rules'
import { authApi } from '~/apis/auth.api'
import { toastNotify } from '~/constants/toastNotify'
import { generateCreatedAt } from '~/utils/utils'

type FormData = Pick<Schema, 'lastname' | 'name' | 'email' | 'password'>
const registerSchema = schema.pick(['lastname', 'name', 'email', 'password'])
export default function Register() {
    const [errorEmail, setErrorEmail] = useState<string>('')
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        defaultValues: {
            email: '',
            password: '',
            lastname: '',
            name: ''
        },
        resolver: yupResolver(registerSchema)
    })

    const navigate = useNavigate()
    const regiterMutation = useMutation({
        mutationFn: (body: {
            name: { firstname: string; lastname: string }
            username: string
            email: string
            password: string
            role: string
            createdAt: string
        }) => authApi.register(body)
    })

    const { data: dataUser, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: () => authApi.registerAcount()
    })

    const isEmail = (email: string) => {
        const isEmail = dataUser?.data.some((user) => user.email === email)
        if (isEmail) {
            setErrorEmail(toastNotify.register.emailError)
            return true
        }
        return false
    }

    const onSubmit = handleSubmit((data) => {
        const { email, lastname, name, password } = data
        if (isEmail(email)) return
        const registerAccount = {
            name: {
                firstname: name,
                lastname
            },
            username: lastname + name,
            email,
            password,
            role: "user",
            createdAt: generateCreatedAt()
        }
        regiterMutation.mutate(registerAccount, {
            onSuccess: (data) => {
                console.log(data)
                refetch()
                reset()
                toast.success(toastNotify.register.registerSuccess, { autoClose: 2000 })
                navigate(path.login)
            }
        })
    })

    return (
        <div className='pb-[100px]'>
            <BreadCrumb title={breadCrumb.register.title} />
            <div className='max-w-[1142px] mx-auto mt-[22px]'>
                <h1 className='text-[20px] text-[#555555]'>Tạo tài khoản</h1>
                <p className='text-[14px] text-[#555555]'>Nếu chưa có tài khoản vui lòng đăng ký tại đây</p>

                <form className='grid grid-cols-12 mt-4 gap-x-9' onSubmit={onSubmit}>
                    <div className='col-span-6'>
                        <Input
                            classNameError='text-red-500 text-[14px] mt-1 min-h-[20px]'
                            classNameInput='w-full outline-none border-[1px] border-[#ebebeb] rounded-[4px] py-[9px] px-4 placeholder:text-[15px] focus:border-blue-400 transition duration-300 ease-in text-[15px] text-[#555d6b] mt-2'
                            label='Họ'
                            register={register}
                            errorMessage={errors.lastname?.message}
                            name='lastname'
                            type='text'
                        />
                    </div>
                    <div className='col-span-6'>
                        <Input
                            classNameError='text-red-500 text-[14px] mt-1 min-h-[20px]'
                            classNameInput='w-full outline-none border-[1px] border-[#ebebeb] rounded-[4px] py-[9px] px-4 placeholder:text-[15px] focus:border-blue-400 transition duration-300 ease-in text-[15px] text-[#555d6b] mt-2'
                            label='Tên'
                            register={register}
                            errorMessage={errors.name?.message}
                            name='name'
                            type='text'
                        />
                    </div>
                    <div className='col-span-6'>
                        <Input
                            classNameError='text-red-500 text-[14px] mt-1 min-h-[20px]'
                            classNameInput='w-full outline-none border-[1px] border-[#ebebeb] rounded-[4px] py-[9px] px-4 placeholder:text-[15px] focus:border-blue-400 transition duration-300 ease-in text-[15px] text-[#555d6b] mt-2'
                            label='Email'
                            register={register}
                            errorMessage={errors.email?.message}
                            name='email'
                            type='text'
                            inputEmail
                            errorEmail={errorEmail}
                            setErrorEmail={setErrorEmail}
                        />
                    </div>
                    <div className='col-span-6'>
                        <Input
                            classNameError='text-red-500 text-[14px] mt-1 min-h-[20px]'
                            classNameInput='w-full outline-none border-[1px] border-[#ebebeb] rounded-[4px] py-[9px] px-4 placeholder:text-[15px] focus:border-blue-400 transition duration-300 ease-in text-[15px] text-[#555d6b] mt-2'
                            label='Mật khẩu'
                            register={register}
                            errorMessage={errors.password?.message}
                            name='password'
                            type='text'
                        />
                    </div>
                    <div className='col-span-6 mt-2'>
                        <div className='flex items-center gap-6'>
                            <Button
                                className={classNames(
                                    'w-[90px] py-[9px] bg-[#337ab7] text-[14px] text-white hover:bg-[#286090] transition duration-200 ease-in flex items-center justify-center',
                                    {
                                        // 'w-[126px] py-[9px] bg-[#ff3237] opacity-[0.8] rounded-[30px] text-[14px] font-[600] text-[#333333] flex items-center justify-center':
                                        //     updateCartMutation.isPending
                                    }
                                )}
                                // onClick={onClick}
                                // isLoading={updateCartMutation.isPending}
                                // disabled={updateCartMutation.isPending}
                            >
                                Đăng ký
                            </Button>
                            <Link
                                to={path.login}
                                className='text-[14px] text-[#337ab7] underline hover:text-[#f16325] cursor-pointer transtion duration-200 ease-in'
                            >
                                Đăng nhập
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
