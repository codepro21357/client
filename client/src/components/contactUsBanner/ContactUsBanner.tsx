import React from "react";
import Container from "../container/Container";
import Button from "../button/Button";
import Link from "next/link";

const ContactUsBanner = () => {
  return (
    <section
      className="w-full section-padding bg-contact-banner 
        bg-cover bg-center bg-no-repeat"
    >
      <Container>
        <div className="w-full h-[300px] flex flex-col justify-center items-center gap-10">
          <h2 className="primary-heading text-center text-white">
            Do You Wanna Invest In <br className="hidden md:block" /> Crypto?
          </h2>
          <Link href="/contact">
            <Button type="primary" rounded>
              Contact Us Now
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default ContactUsBanner;
