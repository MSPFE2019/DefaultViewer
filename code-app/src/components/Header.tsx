interface HeaderProps {
  title: string;
}

/** Recreates the rounded `Header@0.0.44` control used at the top of every screen. */
export function Header({ title }: HeaderProps) {
  return (
    <header className="app-header">
      <h1>{title}</h1>
    </header>
  );
}
