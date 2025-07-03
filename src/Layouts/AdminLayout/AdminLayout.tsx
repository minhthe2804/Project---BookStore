import Footer from '~/components/Footer'

interface Props {
    children?: React.ReactNode
}

export default function AdminLayout({ children }: Props) {
    return (
        <div>
            {children}
            <Footer />
        </div>
    )
}
