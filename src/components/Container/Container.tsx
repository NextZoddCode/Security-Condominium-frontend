export default function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex max-w-7xl min-h-screen w-full mx-auto ">
            {children}
        </div>
    );
}
