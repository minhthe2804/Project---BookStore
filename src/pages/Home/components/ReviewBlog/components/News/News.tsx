import { faClock, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TitleModule from '~/components/TitleModule'
import { articles } from '~/constants/articles '
import { titleModule } from '~/constants/titleModule'

const News = () => {
    const highlightedArticles = articles.filter((article) => article.highlight)
    const normalArticles = articles.filter((article) => !article.highlight)
    return (
        <div>
            <TitleModule icon={faGlobe} width='w-[214px]' heading={titleModule.news.heading} />
            <div className='mt-5'>
                <div className='max-w-[1142px] mx-auto pb-10'>
                    <div className='grid grid-cols-12 gap-[30px]'>
                        <div className='col-span-6'>
                            {highlightedArticles.map((article) => (
                                <div key={article.id}>
                                    <img src={article.img} alt={article.title} />
                                    <div className='pt-4 text-base'>
                                        <p className='cursor-pointer hover:text-red-400'>{article.title}</p>
                                        <p className='pt-2 text-sm text-gray-400'>
                                            <FontAwesomeIcon className='pr-2' icon={faClock} />
                                            {article.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='col-span-6 text-base'>
                            {normalArticles.map((article, index) => (
                                <div
                                    key={article.id}
                                    className={`space-y-6 pb-6 ${index === 0 ? '' : 'pt-4'} ${index === normalArticles.length - 1 ? 'border-b-0' : 'border-b'}`}
                                >
                                    <div className='item-blg item-full'>
                                        <div className='blog-inner flex'>
                                            <div className='blog-img w-[120px] h-[84px] overflow-hidden mr-4'>
                                                <a href={`/blogs/news/${article.id}`}>
                                                    <img
                                                        src={article.img}
                                                        alt={article.title}
                                                        className='w-full h-full object-cover'
                                                    />
                                                </a>
                                            </div>
                                            <div className='text-base flex-1'>
                                                <h3 className='hover:text-red-400'>
                                                    <a title={article.title} href={`/blogs/news/${article.id}`}>
                                                        {article.title}
                                                    </a>
                                                </h3>
                                                <span className='text-sm text-gray-400'>
                                                    <FontAwesomeIcon className='pr-2' icon={faClock} />
                                                    {article.time}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default News
