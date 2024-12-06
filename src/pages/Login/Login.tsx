import classNames from 'classnames'
import { Link } from 'react-router-dom'

import BreadCrumb from '~/components/BreadCrumb'
import Button from '~/components/Button'
import Input from '~/components/Input'
import { breadCrumb } from '~/constants/breadCrumb'
import { path } from '~/constants/path'
import ForgotPassword from '../ForgotPassword'

export default function Login() {
    return (
        <div className='pb-[100px]'>
            <BreadCrumb title={breadCrumb.login.title} />
            <div className='max-w-[1142px] mx-auto mt-[22px]'>
                <h1 className='text-[20px] text-[#555555]'>Tạo tài khoản</h1>
                <p className='text-[14px] text-[#555555]'>Nếu bạn đã có tài khoản, đăng nhập tại đây.</p>

                <div className='grid grid-cols-12 mt-4 gap-9'>
                    <div className='col-span-6'>
                        <form className=''>
                            <Input
                                classNameError='text-red-500 text-[14px] mt-1 min-h-[20px]'
                                classNameInput='w-full outline-none border-[1px] border-[#ebebeb] rounded-[4px] py-[9px] px-4 placeholder:text-[15px] placeholder:text-black focus:border-blue-400 transition duration-300 ease-in text-[15px] text-[#555d6b] mt-2'
                                label='Email'
                                // register={register}
                                // errorMessage={errors.name?.message}
                                // name='name'
                                type='text'
                                placeholder='Email'
                            />
                            <Input
                                classNameError='text-red-500 text-[14px] mt-1 min-h-[20px]'
                                classNameInput='w-full outline-none border-[1px] border-[#ebebeb] rounded-[4px] py-[9px] px-4 placeholder:text-[15px] placeholder:text-black focus:border-blue-400 transition duration-300 ease-in text-[15px] text-[#555d6b] mt-2'
                                label='Mật khẩu'
                                // register={register}
                                // errorMessage={errors.name?.message}
                                // name='name'
                                type='text'
                                placeholder='Mật khẩu'
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
