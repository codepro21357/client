"use client";

import Link from "next/link";
import Container from "../container/Container";
import Logo from "../logo/Logo";
import SocialIcons from "../socialIcons/SocialIcons";
import { MdOutlineEmail } from "react-icons/md";
import { RiPhoneFill } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { NextPageContext } from "next";
import toast from "react-hot-toast";
import { FaLocationDot } from "react-icons/fa6";

const message = `Thank you for your interest in exploring career opportunities with us. 
Unfortunately, we don't have any open positions at this time. However, we're always 
looking for talented individuals to join our team. Please check back regularly 
for updates on new job openings.`;

const Footer = () => {
  const pathname = usePathname();

  if (pathname.includes("/dashboard") || pathname === "/international") {
    return <></>;
  }

  return (
    <footer
      className={`w-full min-h-[500px] pt-[264px] bg-footer bg-cover bg-no-repeat
        ${
          pathname === "/login" || pathname === "/register" ? "bg-gray-100" : ""
        }`}
    >
      <div className="py-10 rounded-t-[20px] bg-[#374256]">
        <Container>
          <div className="flex justify-between flex-wrap gap-10 text-white">
            <div className="flex flex-col gap-6">
              <Logo />
              <p>
                &copy; 2024 Reinholders. <br />
                All Rights Reserved.
              </p>
              <SocialIcons />
            </div>
            <div>
              <h4 className="text-xl font-[500]">Resources</h4>
              <div className="mt-6">
                <ul className="flex flex-col gap-4">
                  <li>
                    <Link href="/privacy">- Privacy & Securty</Link>
                  </li>
                  <li>
                    <Link href="/terms">- Terms of Service</Link>
                  </li>
                  <li>
                    <Link href="/faqs">- FAQs</Link>
                  </li>
                  <li>
                    <Link href="/reviews">- Reviews</Link>
                  </li>
                  <li>
                    <Link href="/contact">- Get In Touch</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-[500]">Company</h4>
              <div className="mt-6">
                <ul className="flex flex-col gap-4">
                  <li>
                    <Link href="/about">- About Us</Link>
                  </li>
                  <li>
                    <Link href="/accounts">- Accounts</Link>
                  </li>
                  <li
                    className="cursor-pointer"
                    onClick={() =>
                      toast.success(message, {
                        duration: 7000,
                      })
                    }
                  >
                    - Careers and job
                  </li>
                  <li>
                    <Link href="/terms">- Terms of Use Policy</Link>
                  </li>
                  <li>
                    <Link href="/privacy">- Privacy Policy</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-[500]">Contact Info</h4>
              <div className="mt-6">
                <ul className="flex flex-col gap-4">
                  <li className="flex gap-2">
                    <MdOutlineEmail size={24} />
                    support@reinholders.com
                  </li>
                  <li className="flex gap-2">
                    <RiPhoneFill size={24} />
                    +1 (929) 207-1840
                  </li>
                  <li className="flex gap-2">
                    <FaLocationDot size={24} />
                    95 Wall St, New York, NY 10005
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className="p-2 text-[10px] text-center bg-white">
      <Container>
        <p>Disclamer: The site owner is responsible for all actions carried out on the website, not the Developers.</p>
      </Container>
    </div>
    </footer>
  );
};

export default Footer;
