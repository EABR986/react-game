

import './Button.css';

// eslint-disable-next-line react/prop-types
function Button({ onClick, label }) {
  return (
    <button className="button" onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;
