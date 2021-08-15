type Props = {
  buttonClassName: string;
  iconClassName: string;
  callback: () => void;
};

export const Button = ({ buttonClassName, iconClassName, callback }: Props): JSX.Element => (
  <button className={buttonClassName} onClick={callback}>
    <em className={iconClassName}></em>
  </button>
);
