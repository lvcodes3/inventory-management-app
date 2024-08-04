interface HeaderProps {
  name: string;
  className?: string;
}

export const Header = ({ name, className }: HeaderProps) => {
  return (
    <h1 className={`text-2xl font-semibold text-gray-700 ${className}`}>
      {name}
    </h1>
  );
};
