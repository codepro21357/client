import Link from "next/link";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { LuInstagram } from "react-icons/lu";

const circle = `w-[35px] h-[35px] rounded-full flex items-center 
    justify-center text-white cursor-pointer`;

const SocialIcons = () => {
  return (
    <div className="flex items-center gap-3">
      <Link href="https://web.facebook.com/">
        <div className={`${circle} bg-purple-500`}>
          <FaFacebookF size={18} />
        </div>
      </Link>
      <Link href="https://x.com/">
        <div className={`${circle} bg-blue-400`}>
          <BsTwitterX size={18} />
        </div>
      </Link>
      <Link href="https://www.instagram.com/">
        <div className={`${circle} bg-red-400`}>
          <LuInstagram size={18} />
        </div>
      </Link>
      <Link href="https://www.linkedin.com/login">
        <div className={`${circle} bg-[#4430c4]`}>
          <FaLinkedinIn size={18} />
        </div>
      </Link>
    </div>
  );
};

export default SocialIcons;
