import Image from "next/image";
import Link from "next/link";
import { SiKucoin } from "react-icons/si";

const Logo = () => {
  return (
    <Link href="/">
      <div className="relative w-[180px] h-[50px]">
        <Image fill src="/assets/logo.png" alt="logo" />
      </div>
    </Link>
  );
};

export default Logo;
