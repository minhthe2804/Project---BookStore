import classNames from 'classnames'
import { useState } from 'react'

import Button from '~/components/Button'
import Input from '~/components/Input'

export default function ForgotPassword() {
    const [isEmail, setIsEmail] = useState<boolean>(false)
    return (
        <div>
            <p className='text-[14px] text-[#555555]'>
                Bạn quên mật khẩu? Nhập địa chỉ email để lấy lại mật khẩu qua email.
            </p>
            <form className='mt-1'>
                <Input
                    classNameError='text-red-500 text-[14px] mt-1 min-h-[20px]'
                    classNameInput='w-full outline-none border-[1px] border-[#ebebeb] rounded-[4px] py-[9px] px-4 placeholder:text-[15px] placeholder:text-[#555d6b] focus:border-blue-400 transition duration-300 ease-in text-[15px] text-[#555d6b] mt-2'
                    label='Email'
                    isFont
                    // register={register}
                    // errorMessage={errors.name?.message}
                    // name='name'
                    type='text'
                    placeholder='Email'
                />
                {isEmail && (
                    <Input
                        classNameError='text-red-500 text-[14px] mt-1 min-h-[20px]'
                        classNameInput='w-full outline-none border-[1px] border-[#ebebeb] rounded-[4px] py-[9px] px-4 placeholder:text-[15px] placeholder:text-[#555d6b] focus:border-blue-400 transition duration-300 ease-in text-[15px] text-[#555d6b] mt-2'
                        label='Mật khẩu'
                        isFont
                        // register={register}
                        // errorMessage={errors.name?.message}
                        // name='name'
                        type='text'
                        placeholder='Đặt lại mật khẩu mới'
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
                        // onClick={handleUpdate}
                        // isLoading={updateCartMutation.isPending}
                        // disabled={updateCartMutation.isPending}
                    >
                        Xác thực Email
                    </Button>
                    <p className='text-[14px] text-[#337ab7] hover:text-[#f16325] cursor-pointer transtion duration-200 ease-in'>
                        Trở lại
                    </p>
                </div>
            </form>
        </div>
    )
}
