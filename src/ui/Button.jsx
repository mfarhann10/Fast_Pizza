import { Link } from 'react-router-dom';

function Button({ children, disabled, to }) {
  const className =
    'inline-block rounded-full bg-yellow-400 px-4 py-3 font-bold uppercase tracking-wide text-stone-800 shadow-md transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:bg-gray-300';
  if (to)
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    );
  return (
    <button disabled={disabled} className={className}>
      {children}
    </button>
  );
}

export default Button;
