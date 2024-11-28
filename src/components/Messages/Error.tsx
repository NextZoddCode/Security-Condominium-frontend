export default function Erro({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-3/4 mx-auto p-4 mt-10 mb-8 bg-red-500 text-white text-center rounded">
            {children}
        </div>
    )
}