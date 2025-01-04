import { faEnvelope, faLocationDot, faMap, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import BreadCrumb from '~/components/BreadCrumb'
import TitleModule from '~/components/TitleModule'
import { breadCrumb } from '~/constants/breadCrumb'
import { useState } from 'react'

interface Errors {
    name: string;
    email: string;
    phone: string;
    body: string;
}

export default function Contact() {
    const [errors, setErrors] = useState<Errors>({
        name: '',
        email: '',
        phone: '',
        body: '',
    });
    const [successMessage, setSuccessMessage] = useState<string>('');

    const validateEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePhone = (phone: string): boolean => /^[0-9\\-]+$/.test(phone);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const form = e.currentTarget;
        const name = (form['contact[name]'] as HTMLInputElement).value.trim();
        const email = (form['contact[email]'] as HTMLInputElement).value.trim();
        const phone = (form['contact[phone]'] as HTMLInputElement).value.trim();
        const body = (form['contact[body]'] as HTMLTextAreaElement).value.trim();

        console.log('Form Data:', { name, email, phone, body })
        
        const newErrors: Errors = {
            name: name ? '' : 'Vui lòng nhập họ tên.',
            email: email
                ? validateEmail(email)
                    ? ''
                    : 'Địa chỉ email không hợp lệ.'
                : 'Vui lòng nhập địa chỉ email.',
            phone: phone
                ? validatePhone(phone)
                    ? ''
                    : 'Số điện thoại không hợp lệ.'
                : 'Vui lòng nhập số điện thoại.',
            body: body ? '' : 'Vui lòng nhập nội dung.',
        };

        setErrors(newErrors);

        if (Object.values(newErrors).some((error) => error !== '')) return;

        setSuccessMessage('Liên hệ của bạn đã được gửi thành công!');
        form.reset();
        
    };

    const clearError = (field: keyof Errors): void => {
        setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
    };

    return (
        <div className='max-w-[1142px] mx-auto'>
            <BreadCrumb title={breadCrumb.contact.title} />
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 py-5'>
                <div className='col-span-1 lg:col-span-1'>
                    <h4 className='text-base font-semibold text-[#323c3f] uppercase pb-5'>Liên hệ</h4>
                    <div className='text-sm grid grid-rows-3 gap-4'>
                        <div className='flex row-span-1'>
                            <FontAwesomeIcon className='text-[#ff640b] pr-4' icon={faLocationDot} />
                            <p className='text-[#707070]'>
                                Địa chỉ: Số 87 Louis 2, Phường Đại Mỗ, Quận Nam Từ Liêm, Hà Nội, Vietnam
                            </p>
                        </div>
                        <div className='flex row-span-1'>
                            <FontAwesomeIcon className='text-[#ff640b] pr-4' icon={faPhone} />
                            <p className='text-[#707070]'>
                                Hotline:{' '}
                                <a href='tel:0828899333' className='text-[#ff640b] font-bold'>
                                    0828899333
                                </a>
                            </p>
                        </div>
                        <div className='flex row-span-1'>
                            <FontAwesomeIcon className='text-[#ff640b] pr-4' icon={faEnvelope} />
                            <p className='text-[#707070]'>
                                Email:{' '}
                                <a href='mailto:vuasachcuonline@gmail.com' className='text-[#ff640b]'>
                                    vuasachcuonline@gmail.com
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

                <div className='col-span-1 lg:col-span-1'>
                    <h4 className='text-base font-semibold text-[#323c3f]'>Hãy để lại lời nhắn cho chúng tôi</h4>
                    <form className='space-y-4 ' onSubmit={handleSubmit}>
                        <input name='form_type' type='hidden' value='contact' />
                        <input name='utf8' type='hidden' value='✓' />

                        <div>
                            <input
                                type='text'
                                name='contact[name]'
                                placeholder='Họ tên của bạn'
                                className={`text-black w-full border p-2 focus:ring ${
                                    errors.name ? 'border-red-500' : 'border-gray-300'
                                }`}
                                autoCapitalize='words'
                                onFocus={() => clearError('name')}
                            />
                            {errors.name && <p className='text-red-500 text-sm'>{errors.name}</p>}
                        </div>

                        <div>
                            <input
                                type='email'
                                name='contact[email]'
                                placeholder='Địa chỉ email của bạn'
                                className={`text-black w-full border p-2 focus:ring ${
                                    errors.email ? 'border-red-500' : 'border-gray-300'
                                }`}
                                autoCorrect='off'
                                autoCapitalize='off'
                                onFocus={() => clearError('email')}
                            />
                            {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}
                        </div>

                        <div>
                            <input
                                type='tel'
                                name='contact[phone]'
                                placeholder='Số điện thoại của bạn'
                                className={`text-black w-full border p-2 focus:ring ${
                                    errors.phone ? 'border-red-500' : 'border-gray-300'
                                }`}
                                pattern='[0-9\-]*'
                                onFocus={() => clearError('phone')}
                            />
                            {errors.phone && <p className='text-red-500 text-sm'>{errors.phone}</p>}
                        </div>

                        <div>
                            <textarea
                                name='contact[body]'
                                placeholder='Nội dung'
                                className={`text-black w-full border p-2 focus:ring ${
                                    errors.body ? 'border-red-500' : 'border-gray-300'
                                } h-[160px]`}
                                onFocus={() => clearError('body')}
                            ></textarea>
                            {errors.body && <p className='text-red-500 text-sm'>{errors.body}</p>}
                        </div>

                        <div className='flex justify-start'>
                            <button
                                type='submit'
                                className='bg-[#ff640b] text-white font-semibold px-4 py-2 rounded hover:text-[#ff640b] hover:bg-white border border-[#ff640b] focus:ring focus:ring-[#ff640b]'
                            >
                                Gửi liên hệ của bạn
                            </button>
                        </div>

                        {successMessage && <p className='text-green-500 text-sm'>{successMessage}</p>}
                    </form>
                </div>
            </div>

            <div className='pt-5 pb-10'>
                <div className='text-sm uppercase'>
                    <TitleModule width='w-[250px]' heading='Đường đến cửa hàng' icon={faMap} />
                </div>
                <div className='col-span-1 lg:col-span-1'>
                    <iframe
                        src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14901.44979757786!2d105.7803621!3d20.9781034!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134538c5f9a8169%3A0xe61d4242752171bf!2zVuG7sWEgU8OhY2ggQ8WpIC0gdnVhc2FjaGN1LmNvbQ!5e0!3m2!1svi!2s!4v1680878058481!5m2!1svi!2s'
                        className='w-[600px] h-[450px] border-0'
                        allowFullScreen
                        loading='lazy'
                    ></iframe>
                </div>
            </div>
        </div>
    )
}
