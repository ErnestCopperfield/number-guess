export function EmptyState({
  icon,
  title,
  text
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <section className="empty-state">
      <div className="empty-icon">{icon}</div>
      <h2 className="section-title">{title}</h2>
      <p className="muted-copy">{text}</p>
    </section>
  );
}
