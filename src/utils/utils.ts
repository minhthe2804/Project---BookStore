export function formatCurrency(currency: number) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
    }).format(currency)
}

export function formatCurrencySum(amount1: number, amount2: number) {
    const total = amount1 + amount2
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
    }).format(total)
}

export function formatNumberToSocialStyle(value: number) {
    return new Intl.NumberFormat('en', {
        notation: 'compact',
        maximumFractionDigits: 1
    })
        .format(value)
        .replace('.', ',')
        .toLowerCase()
}

const removeSpecialCharacter = (str: string) => {
    if (!str) return ''
    // eslint-disable-next-line no-useless-escape
    return str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')
}

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
    return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`
}

export const generateId = (id: string) => {
    return id
}

export const getIdFromNameId = (nameId: string) => {
    const arr = nameId.split('-i-')
    return arr[arr.length - 1]
}

export function generateOrderId() {
    const timestamp = Date.now().toString(36).substring(4) // Lấy một phần của timestamp
    const randomPart = Math.random().toString(36).substring(2, 2)
    return `DH${timestamp}${randomPart}`.toUpperCase()
}

export function getDateString() {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0') // Tháng bắt đầu từ 0, nên cần +1
    const day = String(now.getDate()).padStart(2, '0')
    return `${day}/${month}/${year}` // Kết quả: YYYYMMDD
}

export function getTimeString() {
    const now = new Date()
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')
    return `${hours}:${minutes}:${seconds}` // Kết quả: HHMMSS
}

export function getLastPart(str: string) {
    if (str.includes('/')) {
        return str.split('/').pop()
    }
    return str
}

export const generateCartId = () => {
    const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000)
    return `${randomNumber}`
}

export function generateCreatedAt() {
    return `${new Date().toISOString()}`
}

export function generateUpdatedAt() {
    return `${new Date().toISOString()}`
}

export function formatDate(isoString: string) {
    // Tạo đối tượng Date từ chuỗi ISO
    const date = new Date(isoString)

    // Trích xuất ngày, tháng, năm
    const day = date.getUTCDate()
    const month = date.getUTCMonth() + 1 // Tháng bắt đầu từ 0 nên cần +1
    const year = date.getUTCFullYear()

    // Trả về chuỗi ngày/tháng/năm
    return `${day}/${month}/${year}`
}
