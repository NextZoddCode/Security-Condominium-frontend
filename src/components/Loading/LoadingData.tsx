export default function LoadingData({ children }: { children: React.ReactNode }) {
    return (
        <div className="m-12 text-center tex-lg">
            <span>{children}</span>
        </div>
    )
}