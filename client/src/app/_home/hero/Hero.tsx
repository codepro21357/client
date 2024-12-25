import React from "react";
import Container from "@/components/container/Container";
import Button from "@/components/button/Button";
import ParticlesBackground from "@/components/particlesBackground/ParticlesBackground";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="w-full bg-hero bg-cover bg-top bg-no-repeat relative">
      <ParticlesBackground id="particles" />
      <div
        className="w-full min-h-screen pt-[120px] md:pt-[190px] pb-10 
        text-white bg-soft-black/75"
      >
        <Container>
          <div className="flex flex-col items-center gap-8 relative z-[1] text-center">
            <h1 className="primary-heading">
              Invest In The Future Of <br className="hidden md:block" /> Crypto
              Currency
            </h1>
            <p className="md:w-3/5">
              Unlock the Future of Finance: Invest in the Next Generation of
              Cryptocurrencies. Our platform offers a secure, transparent, and
              innovative way to invest in the most{" "}
              <br className="hidden md:block" />
              promising digital assets.
            </p>
            <div className="flex flex-col md:flex-row items-center gap-5">
              <Link href="/register">
                <Button type="primary" rounded>
                  Invest Now
                </Button>
              </Link>
              <Link href="#more">
                <Button type="neutral" rounded>
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default Hero;
