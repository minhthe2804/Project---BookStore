import classNames from 'classnames'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import BreadCrumb from '~/components/BreadCrumb'
import Button from '~/components/Button'
import Input from '~/components/Input'
import { breadCrumb } from '~/constants/breadCrumb'
import { path } from '~/constants/path'
import ForgotPassword from '../ForgotPassword'
import { schema, Schema } from '~/utils/rules'
import { useContext, useState } from 'react'
import { AppContext } from '~/contexts/createContext'
import { authApi } from '~/apis/auth.api'
import { toastNotify } from '~/constants/toastNotify'
import { setLoginSuccess, setProfileFromLS } from '~/utils/auth'


type FormData = Pick<Schema, 'email' | 'password'>
const loginSchema = schema.pick(['email', 'password'])
export default function Login() {
    const { setIsAuthenticated, setProfile } = useContext(AppContext)
    const [errorEmail, setErrorEmail] = useState<string>('')
    const [errorPassword, setErrorPassword] = useState<string>('')
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: yupResolver(loginSchema)
    })

    const navigate = useNavigate()
    const { data: dataUser } = useQuery({
        queryKey: ['user'],
        queryFn: () => authApi.login()
    })

    const onSubmit = handleSubmit((data) => {
        const { email, password } = data
        const findUser = dataUser?.data.find((user) => user.email === email)
        const comparePassword = findUser?.password === password
        if (!findUser) {
            if (errorPassword) {
                setErrorPassword('')
            }
            setErrorEmail(toastNotify.login.emailError)
            return
        }
        if (!comparePassword) {
            setErrorPassword(toastNotify.login.passwordError)
            return
        }
        setLoginSuccess(findUser.username)
        setProfileFromLS(findUser)
        setIsAuthenticated(true)
        setProfile(findUser)
        reset()
        navigate(path.home)
        toast.success(toastNotify.login.loginSuccess, { autoClose: 2000 })
    })

    return (
        <div className='pb-[100px]'>
            <BreadCrumb title={breadCrumb.login.title} />
            <div className='max-w-[1142px] mx-auto mt-[22px]'>
                <h1 className='text-[20px] text-[#555555]'>Tạo tài khoản</h1>
                <p className='text-[14px] text-[#555555]'>Nếu bạn đã có tài khoản, đăng nhập tại đây.</p>

                <div className='grid grid-cols-12 mt-4 gap-9'>
                    <div className='col-span-6'>
                        <form className='' onSubmit={onSubmit}>
                            <Input
                                classNameError='text-red-500 text-[14px] mt-1 min-h-[20px]'
                                classNameInput='w-full outline-none border-[1px] border-[#ebebeb] rounded-[4px] py-[9px] px-4 placeholder:text-[15px] placeholder:text-black focus:border-blue-400 transition duration-300 ease-in text-[15px] text-[#555d6b] mt-2'
                                label='Email'
                                register={register}
                                errorMessage={errors.email?.message}
                                name='email'
                                type='text'
                                placeholder='Email'
                                errorEmail={errorEmail}
                                inputEmail
                                setErrorEmail={setErrorEmail}
                            />
                            <Input
                                classNameError='text-red-500 text-[14px] mt-1 min-h-[20px]'
                                classNameInput='w-full outline-none border-[1px] border-[#ebebeb] rounded-[4px] py-[9px] px-4 placeholder:text-[15px] placeholder:text-black focus:border-blue-400 transition duration-300 ease-in text-[15px] text-[#555d6b] mt-2'
                                label='Mật khẩu'
                                register={register}
                                errorMessage={errors.password?.message}
                                name='password'
                                type='text'
                                placeholder='Mật khẩu'
                                errorPassword={errorPassword}
                                inputPassword
                                setErrorPassword={setErrorPassword}
                            />
                            <div className='flex items-center gap-6'>
                                <Button
                                    className={classNames(
                                        'w-[107px] py-[9px] bg-[#337ab7] text-[14px] text-white hover:bg-[#286090] transition duration-200 ease-in flex items-center justify-center',
                                        {
                                            // 'w-[126px] py-[9px] bg-[#ff3237] opacity-[0.8] rounded-[30px] text-[14px] font-[600] text-[#333333] flex items-center justify-center':
                                            //     updateCartMutation.isPending
                                        }
                                    )}
                                    // onClick={handleUpdate}
                                    // isLoading={updateCartMutation.isPending}
                                    // disabled={updateCartMutation.isPending}
                                >
                                    Đăng Nhập
                                </Button>
                                <Link
                                    to={path.register}
                                    className='text-[14px] text-[#337ab7] underline hover:text-[#f16325] cursor-pointer transtion duration-200 ease-in'
                                >
                                    Đăng ký
                                </Link>
                            </div>
                        </form>
                    </div>

                    <div className='col-span-6 mt-[-38px]'>
                        <ForgotPassword />
                    </div>
                </div>
                {/* <form className='grid grid-cols-12 mt-4 gap-x-9 '>
                    <div className='col-span-6'>
                        <Input
                            classNameError='text-red-500 text-[14px] mt-1 min-h-[20px]'
                            classNameInput='w-full outline-none border-[1px] border-[#ebebeb] rounded-[4px] py-[9px] px-4 placeholder:text-[15px] text-black focus:border-blue-400 transition duration-300 ease-in text-[15px] text-[#555d6b] mt-2'
                            label='Họ'
                            // register={register}
                            // errorMessage={errors.name?.message}
                            // name='name'
                            type='text'
                        />
                    </div>

                    <div className='col-span-6'>
                        <Input
                            classNameError='text-red-500 text-[14px] mt-1 min-h-[20px]'
                            classNameInput='w-full outline-none border-[1px] border-[#ebebeb] rounded-[4px] py-[9px] px-4 placeholder:text-[15px] text-black focus:border-blue-400 transition duration-300 ease-in text-[15px] text-[#555d6b] mt-2'
                            label='Tên'
                            // register={register}
                            // errorMessage={errors.name?.message}
                            // name='name'
                            type='text'
                        />
                    </div>
                    <div className='col-span-6'>
                        <Input
                            classNameError='text-red-500 text-[14px] mt-1 min-h-[20px]'
                            classNameInput='w-full outline-none border-[1px] border-[#ebebeb] rounded-[4px] py-[9px] px-4 placeholder:text-[15px] text-black focus:border-blue-400 transition duration-300 ease-in text-[15px] text-[#555d6b] mt-2'
                            label='Email'
                            // register={register}
                            // errorMessage={errors.name?.message}
                            // name='name'
                            type='text'
                        />
                    </div>
                    <div className='col-span-6'>
                        <Input
                            classNameError='text-red-500 text-[14px] mt-1 min-h-[20px]'
                            classNameInput='w-full outline-none border-[1px] border-[#ebebeb] rounded-[4px] py-[9px] px-4 placeholder:text-[15px] text-black focus:border-blue-400 transition duration-300 ease-in text-[15px] text-[#555d6b] mt-2'
                            label='Mật khẩu'
                            // register={register}
                            // errorMessage={errors.name?.message}
                            // name='name'
                            type='text'
                        />
                    </div>
                    <div className='col-span-6'>
                        <div className='flex items-center gap-6'>
                            <Button
                                className={classNames(
                                    'w-[90px] py-[9px] bg-[#337ab7] text-[14px] text-white hover:bg-[#286090] transition duration-200 ease-in flex items-center justify-center',
                                    {
                                        // 'w-[126px] py-[9px] bg-[#ff3237] opacity-[0.8] rounded-[30px] text-[14px] font-[600] text-[#333333] flex items-center justify-center':
                                        //     updateCartMutation.isPending
                                    }
                                )}
                                // onClick={handleUpdate}
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
                </form> */}
            </div>
        </div>
    )
}
