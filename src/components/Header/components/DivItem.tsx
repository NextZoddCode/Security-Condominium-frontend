export default function DivItem({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full flex flex-col justify-center items-center gap-1 py-2">
            {children}
        </div>
    );
}
