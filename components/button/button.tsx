type Props = {
  label: string;
  onClick: () => void;
};

const Button = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      className="border-2 px-12 py-3 hover:opacity-70 "
    >
      {props.label}
    </button>
  );
};

export default Button;
