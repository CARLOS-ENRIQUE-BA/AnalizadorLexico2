import "../styles/Button.css";

const Button = ({ text }) => {
  return (
    <button class="btn-17">
      <span class="text-container">
      <span className="text">{text}</span>
      </span>
    </button>
  );
};

export default Button;
