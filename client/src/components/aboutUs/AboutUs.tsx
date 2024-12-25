import React from "react";
import Container from "../container/Container";
import Card from "../card/Card";

const AboutUs = () => {
  const cards = [
    {
      id: 1,
      icon: "invest.png",
      title: "Crypto Investment",
      desc: "Crypto investment refers to the process of investing in cryptocurrencies, such as Bitcoin, Ethereum, or others, with the goal of earning a profit. Cryptocurrencies are digital or virtual currencies that use cryptography for security and are decentralized, meaning they are not controlled by any government or financial institution.",
    },
    {
      id: 2,
      icon: "idea.png",
      title: "Mining Solutions",
      desc: "Miners use powerful computers to solve complex mathematical problems, which helps to secure the network and verify transactions. In return, they are rewarded with a certain amount of cryptocurrency. The decentralized nature of crypto mining makes it a secure and transparent process.",
    },
    {
      id: 3,
      icon: "secure.png",
      title: "Blockchain Education",
      desc: "Blockchain is a digitally distributed, decentralized, public ledger that exists across a network. It is most noteworthy in its use with cryptocurrencies, but its applications extend far beyond digital currencies.",
    },
  ];
  return (
    <section
      id="more"
      className="w-full min-h-screen section-padding scroll-mt-14"
    >
      <Container>
        <div className="flex flex-col items-center">
          <h2 className="secondary-heading text-center">
            Learn More About What We Have to Offer
          </h2>
          <p className="md:w-4/5 md:text-center">
            Cryptocurrency investment can be a high-reward venture. It can also
            provide a hedge against inflation and market volatility.
            Additionally, it allows for fast and easy transactions, portfolio
            diversification, and the possibility of passive income through
            staking.
          </p>
          <div className="flex flex-col md:flex-row gap-5 mt-14">
            {cards.map((card) => (
              <Card
                key={card.id}
                icon={card.icon}
                title={card.title}
                desc={card.desc}
                bg
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutUs;
