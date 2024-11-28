export default function Success({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full mx-auto p-4 mt-10 mb-8 bg-emerald-500 text-white text-center rounded md:text-2xl md:p-6 lg:p-8 ">
            {children}
        </div>
    )
}