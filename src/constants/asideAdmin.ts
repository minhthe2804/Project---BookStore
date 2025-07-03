import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faCartShopping, faClipboardCheck, faUser, faClock } from '@fortawesome/free-solid-svg-icons'
import { path } from './path'

interface AdminAsideItem {
    icon: IconDefinition
    title: string
    link: string
}

export const adminAside: AdminAsideItem[] = [
    {
        icon: faCartShopping,
        title: 'Quản lý sản phẩm',
        link: path.adminProducts
    },
    {
        icon: faClipboardCheck,
        title: 'Quản lý đơn hàng',
        link: path.adminOrders
    },
    {
        icon: faUser,
        title: 'Quản lý người dùng',
        link: path.adminUsers
    },
    {
        icon: faClock,
        title: 'Báo cáo doanh thu',
        link: path.adminReports
    }
]
