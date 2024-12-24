import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import classNames from 'classnames'
import { Omit } from 'lodash'
import { useContext, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { authApi } from '~/apis/auth.api'
import BreadCrumb from '~/components/BreadCrumb'
import Button from '~/components/Button'
import Input from '~/components/Input'
import InputNumber from '~/components/InputNumber'
import { breadCrumb } from '~/constants/breadCrumb'
import { path } from '~/constants/path'
import { toastNotify } from '~/constants/toastNotify'
import { AppContext } from '~/contexts/createContext'
import { User } from '~/types/user.type'
import { setProfileFromLS } from '~/utils/auth'
import { userSchema, UserSchema } from '~/utils/rules'
import { generateUpdatedAt } from '~/utils/utils'

type FormData = Omit<UserSchema, 'username'>
const newUserSchema = userSchema.omit(['username'])
export default function UpdateProfile() {
    const { profile, setProfile } = useContext(AppContext)
    const [isUpdateProfile, setIsUpdateProfile] = useState<boolean>(false)
    const {
        control,
        register,
        setValue,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        defaultValues: {
            name: '',
            lastname: '',
            phone: '',
            address: ''
        },
        resolver: yupResolver(newUserSchema)
    })

    const updateProfileMutation = useMutation({
        mutationFn: (bodyData: { id: string; body: User }) => authApi.forgotPassword(bodyData.id, bodyData.body)
    })

    const onSubmit = handleSubmit((data) => {
        const { name, lastname, phone, address } = data
        if (profile) {
            updateProfileMutation.mutate({
                id: profile.id,
                body: {
                    ...profile,
                    name: {
                        firstname: name,
                        lastname: lastname
                    },
                    username: lastname + ' ' + name,
                    phone: data.phone as string,
                    address: data.address,
                    updatedAt: generateUpdatedAt()
                }
            })
            setProfile({
                ...profile,
                name: {
                    firstname: name,
                    lastname: lastname
                },
                username: lastname + ' ' + name,
                address: address,
                phone: phone,
                updatedAt: generateUpdatedAt()
            })
            setProfileFromLS({
                ...profile,
                name: {
                    firstname: name,
                    lastname: lastname
                },
                username: lastname + ' ' + name,
                address: address,
                phone: phone,
                updatedAt: generateUpdatedAt()
            })
            toast.success(toastNotify.updateProfile.updateSuccess, {
                autoClose: 2000
            })
        }
    })

    useEffect(() => {
        if (profile) {
            setValue('name', profile.name.firstname)
            setValue('lastname', profile.name.lastname)
            setValue('phone', profile.phone as string)
            setValue('address', profile.address as string)
        }
    }, [profile, setValue])

    return (
        <div className=''>
            <BreadCrumb title={breadCrumb.login.title} titleProduct='Thông tin khách hàng' />
            <div className='max-w-[1142px] mx-auto'>
                <h1 className='text-[20px] text-[#555555] mt-2'>Thông tin của bạn</h1>

                <div className='grid grid-cols-12 mt-2'>
                    <div className='col-span-6'>
                        <p className='text-[14px] text-[#595959] font-semibold'>
                            Tên tài khoản:
                            <span className='ml-1 font-light'>{profile?.username}</span>
                        </p>
                        <p className='text-[14px] text-[#595959] font-semibold mt-4'>
                            Địa chỉ:
                            <span className='ml-1 font-light'>{profile?.address}</span>
                        </p>
                        <p className='text-[14px] text-[#595959] font-semibold mt-4'>
                            Quốc tịch:
                            <span className='ml-1 font-light'>Việt Nam</span>
                        </p>
                        <p className='text-[14px] text-[#595959] font-semibold mt-4'>
                            Số điện thoại
                            <span className='ml-1 font-light'>{profile?.phone}</span>
                        </p>
                        <div className='flex items-center mt-[18px] gap-2'>
                            <Button
                                className={classNames(
                                    'w-[160px] py-[8px] bg-[#337ab7] text-[14px] text-white hover:bg-[#286090] transition duration-200 ease-in flex items-center justify-center '
                                )}
                                onClick={() => setIsUpdateProfile(true)}
                            >
                                Chỉnh sửa thông tin
                            </Button>
                            <Link
                                to={path.account}
                                className='w-[74px] py-[8px] bg-[#337ab7] text-[14px] text-white hover:bg-[#286090] transition duration-200 ease-in flex items-center justify-center'
                            >
                                Quay lại
                            </Link>
                        </div>
                    </div>

                    {isUpdateProfile && (
                        <div className='col-span-6'>
                            <form onSubmit={onSubmit}>
                                <div className='flex flex-col gap-1 text-[14px]'>
                                    <label className='text-[14px] text-[#555555] font-semibold'>Họ</label>
                                    <Input
                                        classNameInput='w-full outline-none border-[1px] border-[#e6e6e6] rounded-[2px] py-[7px] px-[12px] placeholder:text-[13px] text-[#374151] focus:border-blue-400 transition duration-300 ease-in text-[14px]'
                                        classNameError='text-red-500 text-[13px] mt-[2px] min-h-[20px]'
                                        className='w-[80%]'
                                        placeholder='Họ'
                                        register={register}
                                        type='text'
                                        name='lastname'
                                        errorMessage={errors.lastname?.message}
                                    />
                                </div>

                                <div className='flex flex-col gap-1 text-[14px]'>
                                    <label className='text-[14px] text-[#555555] font-semibold'>Tên</label>
                                    <Input
                                        classNameInput='w-full outline-none border-[1px] border-[#e6e6e6] rounded-[2px] py-[7px] px-[12px] placeholder:text-[13px] text-[#374151] focus:border-blue-400 transition duration-300 ease-in text-[14px]'
                                        classNameError='text-red-500 text-[13px] mt-[2px] min-h-[20px]'
                                        className='w-[80%]'
                                        placeholder='Tên'
                                        register={register}
                                        type='text'
                                        name='name'
                                        errorMessage={errors.name?.message}
                                    />
                                </div>

                                <div className='flex flex-col gap-1 text-[14px]'>
                                    <label className='text-[14px] text-[#555555] font-semibold'>Số điện thoại</label>
                                    <Controller
                                        control={control}
                                        name='phone'
                                        render={({ field }) => (
                                            <InputNumber
                                                classNameInput='w-full outline-none border-[1px] border-[#e6e6e6] rounded-[2px] py-[7px] px-[12px] placeholder:text-[13px] text-[#374151] focus:border-blue-400 transition duration-300 ease-in text-[14px]'
                                                classNameError='text-red-500 text-[13px] mt-[2px] min-h-[20px]'
                                                placeholder='Số điện thoại'
                                                className='w-[80%]'
                                                errorMessage={errors.phone?.message}
                                                {...field}
                                                onChange={(event) => {
                                                    field.onChange(event)
                                                }}
                                            />
                                        )}
                                    />
                                </div>

                                <div className='flex flex-col gap-1 text-[14px]'>
                                    <label className='text-[14px] text-[#555555] font-semibold'>Địa chỉ</label>
                                    <Input
                                        classNameInput='w-full outline-none border-[1px] border-[#e6e6e6] rounded-[2px] py-[7px] px-[12px] placeholder:text-[13px] text-[#374151] focus:border-blue-400 transition duration-300 ease-in text-[14px]'
                                        classNameError='text-red-500 text-[13px] mt-[2px] min-h-[20px]'
                                        className='w-[80%]'
                                        name='address'
                                        placeholder='Địa chỉ'
                                        register={register}
                                        type='text'
                                        errorMessage={errors.address?.message}
                                    />
                                </div>
                                <div className='flex items-center gap-2'>
                                    <Button
                                        className={classNames(
                                            'w-[160px] py-[8px] bg-[#337ab7] text-[14px] text-white hover:bg-[#286090] transition duration-200 ease-in flex items-center justify-center mt-[6px]',
                                            {
                                                'w-[80px] py-[17px] bg-[#337ab7] opacity-[0.6] rounded-[4px] text-[14px] font-[600] text-white flex items-center justify-center':
                                                    updateProfileMutation.isPending
                                            }
                                        )}
                                        isLoading={updateProfileMutation.isPending}
                                        disabled={updateProfileMutation.isPending}
                                    >
                                        Cập nhật thông tin
                                    </Button>
                                    <Button
                                        className={classNames(
                                            'w-[80px] py-[8px] bg-[#337ab7] text-[14px] text-white hover:bg-[#286090] transition duration-200 ease-in flex items-center justify-center mt-[6px]'
                                        )}
                                        onClick={() => setIsUpdateProfile(false)}
                                    >
                                        Hủy
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
