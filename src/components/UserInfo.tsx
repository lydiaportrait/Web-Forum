import { useAppSelector } from '../store';

export default function UserInfo() {
  const name = useAppSelector((state) => state.auth.name);
  return <>Hello, {name}, u are logged into Buby™ :o</>;
}
