export default function MenuTitle({ children }: { children: React.ReactNode }) {
    return (
        <>
            <span className="text-lg font-bold">{children}</span>
        </>
    );
}
