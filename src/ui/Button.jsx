/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

function Button({ children, disabled, to, onClick, type }) {
  const base =
    'inline-block rounded-full bg-yellow-400 font-bold uppercase tracking-wide text-stone-800 shadow-md transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:bg-gray-300';

  const styles = {
    primary: base + ' px-4 py-3 md:px-6 md:py-4',
    small: base + ' py-2 px-4 md:px-5 md:py-2.5 text-xs',
    secondary:
      'inline-block bg-stone-200 rounded-full px-4 py-2.5 md:px-6 md:py-3.5 font-bold uppercase tracking-wide text-stone-800 shadow-md transition hover:bg-stone-300 disabled:cursor-not-allowed disabled:bg-gray-300',
  };
  if (to)
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );
  return (
    <button disabled={disabled} className={styles[type]} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
