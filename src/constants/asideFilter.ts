export const categories = [
    'Sách Văn Học',
    'Sách Kinh Tế',
    'Sách Kỹ Năng',
    'Sách Lịch Sử',
    'Cẩm Nang Làm Bố Mẹ',
    'Sách Thiếu Nhi',
    'Truyện Tranh'
]

export const priceRanges = [
    { title: 'Giá dưới 100.000đ', priceMin: 0, priceMax: 100000, enabled: true },
    { title: '100.000đ - 200.000đ', priceMin: 100000, priceMax: 300000, enabled: true },
    { title: '300.000đ - 500.000đ', priceMin: 300000, priceMax: 500000, enabled: true },
    { title: 'Giá trên 500.000đ', priceMin: 0, priceMax: 500000, enabled: false }
]

export const arrange = ['asc', 'desc']

export const pagination = [
    {
        pageNumber: 1,
        pageArray: [0, 12]
    },
    {
        pageNumber: 2,
        pageArray: [12, 24]
    },
    {
        pageNumber: 3,
        pageArray: [24, 36]
    },
    {
        pageNumber: 4,
        pageArray: [36, 48]
    },
    {
        pageNumber: 5,
        pageArray: [48, 54]
    }
]
