interface IProps{
    value: string;
    onClick: () => void;
}

export default function Button({ value, onClick }: IProps): JSX.Element {
  return <button onClick={onClick}>{value}</button>;
}
