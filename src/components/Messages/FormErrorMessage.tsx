export default function ErrorMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return <span className="text-left text-sm text-red-500">{children}</span>;
}
