export function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card mb-3">
      <div className="card-header">{title}</div>
      <div className="card-body">{children}</div>
    </div>
  );
}
