import Container from "@/components/container/Container";
import { HiArrowLongRight } from "react-icons/hi2";
import React from "react";

const buttonStyles =
  "flex justify-center items-center h-10 w-10 border-2 border-gray-200  text-black rounded-full hover:bg-primary-400";
const UlStyle = "w-[80%] h-full";
const LiStyle = "h-full text-xl font-semibold text-primary-500";

const Privacy = () => {
  return (
    <section className="h-auto pt-[120px]">
      <Container>
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          <div className="bg-primary-400 w-full md:w-2/3 md:hidden  rounded-[12px]">
            <div className="mt-[300px] ">
              <div className="flex justify-start items-center mt-10 pl-10">
                <h1 className=" h-10 w-[200px] bg-primary-500 flex justify-center items-center text-white text-xl font-semibold rounded-3xl">
                  Documentation
                </h1>
              </div>
              <div className=" h-20 flex justify-start items-center pl-10 mt-10">
                <p className="text-4xl font-extrabold  text-primary-500">
                  Privacy Policy
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white w-full  md:w-1/3  h-[550px]">
            <div className="list-wrapper  my-3 flex justify-evenly items-center gap-5">
              <ul className={UlStyle}>
                <li className={LiStyle}>Introduction</li>
              </ul>
              <a href="#introduction">
                <button className={buttonStyles}>
                  <HiArrowLongRight size={25} />
                </button>
              </a>
            </div>
            <hr className="border-[1px] border-gray-300" />
            <div className="list-wrapper my-3  flex justify-evenly items-center gap-5">
              <ul className={UlStyle}>
                <li className={LiStyle}>Collection of Personal Data</li>
              </ul>
              <a href="#collectionOPersonalfData">
                {" "}
                <button className={buttonStyles}>
                  <HiArrowLongRight size={25} />
                </button>
              </a>
            </div>
            <hr className="border-[1px] border-gray-300" />
            <div className="list-wrapper  my-3 flex justify-evenly items-center gap-5">
              <ul className={UlStyle}>
                <li className={LiStyle}>Use of Personal Data</li>
              </ul>
              <a href="#UseofPersonalData">
                {" "}
                <button className={buttonStyles}>
                  <HiArrowLongRight size={25} />
                </button>
              </a>
            </div>
            <hr className="border-[1px] border-gray-300" />
            <div className="list-wrapper  my-3 flex justify-evenly items-center gap-5">
              <ul className={UlStyle}>
                <li className={LiStyle}>Disclosure of Personal Data</li>
              </ul>
              <a href="#DisclosureofPersonalData">
                <button className={buttonStyles}>
                  <HiArrowLongRight size={25} />
                </button>
              </a>
            </div>
            <hr className="border-[1px] border-gray-300" />
            <div className="list-wrapper  my-3 flex justify-evenly items-center gap-5">
              <ul className={UlStyle}>
                <li className={LiStyle}>Customer’s Rights</li>
              </ul>
              <a href="#Customer’sRights">
                {" "}
                <button className={buttonStyles}>
                  <HiArrowLongRight size={25} />
                </button>
              </a>
            </div>
            <hr className="border-[1px] border-gray-300" />
            <div className="list-wrapper  my-3 flex justify-evenly items-center gap-5">
              <ul className={UlStyle}>
                <li className={LiStyle}>Consent</li>
              </ul>
              <a href="#Consent">
                <button className={buttonStyles}>
                  <HiArrowLongRight size={25} />
                </button>
              </a>
            </div>
            <hr className="border-[1px] border-gray-300" />
            <div className="list-wrapper  my-3 flex justify-evenly items-center gap-5">
              <ul className={UlStyle}>
                <li className={LiStyle}>Security</li>
              </ul>
              <a href="#Security">
                <button className={buttonStyles}>
                  <HiArrowLongRight size={25} />
                </button>
              </a>
            </div>
            <hr className="border-[1px] border-gray-300" />
            <div className="list-wrapper  my-3 flex justify-evenly items-center gap-5">
              <ul className={UlStyle}>
                <li className={LiStyle}>Restriction of Responsibility</li>
              </ul>
              <a href="#RestrictionofResponsibility">
                {" "}
                <button className={buttonStyles}>
                  <HiArrowLongRight size={25} />
                </button>
              </a>
            </div>
            <hr className="border-[1px] border-gray-300" />

            <div className="list-wrapper  my-3 flex justify-evenly items-center gap-5">
              <ul className={UlStyle}>
                <li className={LiStyle}>Amendments of Policy</li>
              </ul>
              <a href="#AmendmentsofPolicy">
                {" "}
                <button className={buttonStyles}>
                  <HiArrowLongRight size={25} />
                </button>
              </a>
            </div>
            <hr className="border-[1px] border-gray-300" />
          </div>
          <div className="bg-primary-400  w-full md:w-2/3 hidden md:block  rounded-[12px]">
            <div className="mt-[300px] ">
              <div className="flex justify-start items-center mt-10 pl-10">
                <h1 className=" h-10 w-[200px] bg-primary-500 flex justify-center text-white items-center text-xl font-semibold rounded-3xl">
                  Documentation
                </h1>
              </div>
              <div className=" h-20 flex justify-start items-center pl-10 mt-10">
                <p className="text-4xl font-extrabold  text-primary-500">
                  Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="wrapper mt-20 py-10" id="introduction">
          <div className="introduction">
            <h1 className="text-3xl font-semibold my-5 py-5 text-primary-500">
              Introduction
            </h1>
            <div className="flex flex-col md:flex-row justify-between gap-5">
              <span className="w-full  md:w-1/2">
                At Reinholders, we understand that privacy is a fundamental
                aspect of trust, especially in the digital world of
                cryptocurrency. As you navigate through our platform, we are
                committed to protecting your personal information and ensuring
                that your data is handled with the utmost care.
              </span>
              <span className=" w-full md:w-1/2">
                We encourage you to read this Privacy Policy carefully to
                understand your rights and our obligations. Should you have any
                questions or concerns, our support team is always here to assist
                you. Thank you for choosing Reinholders as your cryptocurrency
                platform.
              </span>
            </div>
          </div>
          <div
            className="collectionOPersonalfData"
            id="collectionOPersonalfData"
          >
            <h1 className="text-3xl font-semibold my-5 py-5 text-primary-500">
              Collection of Personal Data
            </h1>
            <div className="flex flex-col md:flex-row justify-between gap-5">
              <span className="w-full  md:w-1/2">
                At Reinholders, the collection of personal data is an essential
                part of providing you with a secure and personalized experience
                on our cryptocurrency platform. We are committed to collecting
                only the information that is necessary for the smooth operation
                of our services, and we handle this data with the highest
                standards of privacy and security. When you interact with
                Reinholders, whether by creating an account, making
                transactions, or simply browsing our website, we may collect
                certain types of personal data. This may include, but is not
                limited to, your name, email address, contact details,
                transaction history, and IP address. In some cases, we may also
                collect additional information to verify your identity and
                comply with legal requirements, such as government-issued
                identification documents or financial information.The personal
                data we collect is primarily used to provide, maintain, and
                improve our services.
              </span>
              <span className=" w-full md:w-1/2">
                This includes verifying your identity, processing transactions,
                responding to inquiries, and enhancing your user experience
                through personalized content and features. Additionally, your
                data helps us monitor and prevent fraudulent activities,
                ensuring that Reinholders remains a safe and secure platform for
                all users. We understand the importance of your privacy, which
                is why we take great care in how we handle your personal data.
                All information collected is stored securely, and access is
                restricted to authorized personnel only. We do not sell, rent,
                or share your personal data with third parties, except where it
                is necessary to fulfill our services or as required by law. Your
                trust is our top priority, and we are dedicated to maintaining
                it by being transparent about our data collection practices.
                Should you have any concerns or questions about how your
                personal data is collected and used, our support team is
                available to assist you.
              </span>
            </div>
          </div>
          <div className="UseofPersonalData" id="UseofPersonalData">
            <h1 className="text-3xl font-semibold my-5 py-5 text-primary-500">
              Use of Personal Data
            </h1>
            <div className="flex flex-col md:flex-row justify-between gap-5">
              <span className="w-full  md:w-1/2">
                At Reinholders, we recognize that the personal data you provide
                is both valuable and sensitive. We are committed to using this
                data responsibly, ensuring that it serves to enhance your
                experience on our cryptocurrency platform while maintaining the
                highest levels of privacy and security. The personal data we
                collect from you is primarily used to deliver and improve our
                services. This includes processing transactions, verifying your
                identity, and providing you with access to the various features
                and tools available on our platform. We use your information to
                create a personalized experience, tailoring our services and
                communications to better meet your needs and preferences.
                Additionally, your data plays a crucial role in maintaining the
                security of our platform. By analyzing usage patterns and
                monitoring activities, we can identify and mitigate potential
                risks, such as fraud or unauthorized access, ensuring that
                Reinholders remains a safe environment for all users.
              </span>
              <span className=" w-full md:w-1/2">
                We may also use your personal data to communicate with you,
                keeping you informed about important updates, changes to our
                services, or promotional offers that may be of interest to you.
                However, we are mindful of your preferences and provide you with
                options to manage or opt out of such communications. Rest
                assured, Reinholders does not share your personal data with
                third parties unless it is necessary to fulfill our services or
                comply with legal obligations. We do not sell or rent your
                information to outside parties for marketing purposes. Any
                third-party service providers we engage with are carefully
                selected and required to adhere to strict data protection
                standards. Your privacy is our priority, and we are committed to
                being transparent about how your data is used. Should you have
                any questions or concerns about our data usage practices, our
                support team is here to assist you.
              </span>
            </div>
          </div>
          <div
            className="DisclosureofPersonalData"
            id="DisclosureofPersonalData"
          >
            <h1 className="text-3xl font-semibold my-5 py-5 text-primary-500">
              Disclosure of Personal Data
            </h1>
            <div className="flex flex-col md:flex-row justify-between gap-5">
              <span className="w-full  md:w-1/2">
                At Reinholders, we understand that the confidentiality of your
                personal data is essential. We are committed to ensuring that
                your information is only disclosed in circumstances that are
                absolutely necessary and in a manner that respects your privacy
                and security. We may disclose your personal data in specific
                situations where it is necessary to fulfill our obligations to
                you or comply with legal and regulatory requirements. For
                instance, if required by law, we may share your information with
                government authorities or regulatory bodies to comply with legal
                obligations, such as anti-money laundering (AML) and
                know-your-customer (KYC) regulations. This ensures that our
                platform adheres to the highest standards of legality and
                security. These third parties might include payment processors,
                identity verification services, or data analytics providers
              </span>
              <span className=" w-full md:w-1/2">
                Rest assured, these partners are carefully vetted, and we
                require them to handle your information with the same level of
                confidentiality and security that we uphold at Reinholders. They
                are only permitted to use your data for the specific purposes
                for which it was disclosed and are contractually obligated to
                protect your information. We do not sell, trade, or rent your
                personal data to third parties for marketing purposes. Your data
                is never shared with outside entities without your explicit
                consent, unless required by law. Our commitment to transparency
                means you are always informed about how and why your data might
                be disclosed. Should you have any questions or concerns about
                the disclosure of your personal data, please feel free to
                contact our support team.
              </span>
            </div>
          </div>
          <div className="Customer’sRights" id="Customer’sRights">
            <h1 className="text-3xl font-semibold my-5 py-5 text-primary-500">
              Customer’s Rights
            </h1>
            <div className="flex flex-col md:flex-row justify-between gap-5">
              <span className="w-full  md:w-1/2">
                At Reinholders, we understand that the confidentiality of your
                personal data is essential. We are committed to ensuring that
                your information is only disclosed in circumstances that are
                absolutely necessary and in a manner that respects your privacy
                and security. We may disclose your personal data in specific
                situations where it is necessary to fulfill our obligations to
                you or comply with legal and regulatory requirements. For
                instance, if required by law, we may share your information with
                government authorities or regulatory bodies to comply with legal
                obligations, such as anti-money laundering (AML) and
                know-your-customer (KYC) regulations. This ensures that our
                platform adheres to the highest standards of legality and
                security. These third parties might include payment processors,
                identity verification services, or data analytics providers
              </span>
              <span className=" w-full md:w-1/2">
                Rest assured, these partners are carefully vetted, and we
                require them to handle your information with the same level of
                confidentiality and security that we uphold at Reinholders. They
                are only permitted to use your data for the specific purposes
                for which it was disclosed and are contractually obligated to
                protect your information. We do not sell, trade, or rent your
                personal data to third parties for marketing purposes. Your data
                is never shared with outside entities without your explicit
                consent, unless required by law. Our commitment to transparency
                means you are always informed about how and why your data might
                be disclosed. Should you have any questions or concerns about
                the disclosure of your personal data, please feel free to
                contact our support team.
              </span>
            </div>
          </div>
          <div className="Consent" id="Consent">
            <h1 className="text-3xl font-semibold my-5 py-5 text-primary-500">
              Consent
            </h1>
            <div className="flex flex-col md:flex-row justify-between gap-5">
              <span className="w-full  md:w-1/2">
                At Reinholders, we believe in empowering you to make informed
                decisions about your personal data. By using our cryptocurrency
                platform, you consent to the collection, use, and disclosure of
                your personal information as outlined in this Privacy Policy. We
                strive to ensure that our data practices are transparent, so you
                understand how your information is handled and why it is
                necessary.
              </span>
              <span className=" w-full md:w-1/2">
                You have the right to withdraw your consent at any time. If you
                choose to do so, please be aware that this may affect your
                ability to fully access or use certain features of our platform.
                Should you wish to withdraw consent or have any concerns
                regarding your consent, our support team is available to assist
                you.
              </span>
            </div>
          </div>
          <div className="Security" id="Security">
            <h1 className="text-3xl font-semibold my-5 py-5 text-primary-500">
              Security
            </h1>
            <div className="flex flex-col md:flex-row justify-between gap-5">
              <span className="w-full  md:w-1/2">
                At Reinholders, we understand that the security of your personal
                data is of utmost importance, especially in the fast-evolving
                world of cryptocurrency. We are committed to safeguarding your
                information with robust security measures designed to protect
                against unauthorized access, disclosure, alteration, or
                destruction. We employ a multi-layered approach to security,
                combining industry-leading technologies and best practices to
                ensure that your personal data is kept safe at all times. This
                includes advanced encryption protocols, secure socket layer
                (SSL) technology, and firewalls to protect your data during
                transmission and storage. Our systems are regularly updated and
                monitored to defend against new and emerging threats. Access to
                your personal data is restricted to authorized personnel only,
                and these individuals are bound by strict confidentiality
                agreements.
              </span>
              <span className=" w-full md:w-1/2">
                While we take every precaution to secure your data, it is
                important to note that no method of transmission over the
                internet or electronic storage is completely infallible.
                However, we continually review and enhance our security
                practices to stay ahead of potential risks and vulnerabilities.
                In the unlikely event of a security breach that could compromise
                your personal data, we have protocols in place to promptly
                investigate, mitigate, and notify affected users in accordance
                with legal and regulatory requirements. Your trust is our
                priority, and we are dedicated to maintaining it by protecting
                your personal data with the highest levels of security. If you
                have any questions or concerns about the security of your
                information on Reinholders, please contact our support team, who
                are ready to assist you.
              </span>
            </div>
          </div>
          <div
            className="RestrictionofResponsibility"
            id="RestrictionofResponsibility"
          >
            <h1 className="text-3xl font-semibold my-5 py-5 text-primary-500">
              Restriction of Responsibility
            </h1>
            <div className="flex flex-col md:flex-row justify-between gap-5">
              <span className="w-full  md:w-1/2">
                At Reinholders, we are committed to providing a secure and
                reliable platform for your cryptocurrency activities. However,
                it is important to understand the limitations of our
                responsibilities regarding the use of our services and the
                protection of your personal data. While we take extensive
                measures to safeguard your personal information, Reinholders
                cannot guarantee absolute security. No method of data
                transmission or storage is completely foolproof, and we cannot
                be held responsible for unauthorized access, hacking, data loss,
                or other breaches that may occur despite our best efforts. It is
                essential that you also take steps to protect your information,
                such as using strong passwords, enabling two-factor
                authentication, and being vigilant about phishing attempts and
                other cyber threats. Reinholders is not responsible for the
                actions of third-party service providers or other external
                websites linked to or from our platform.
              </span>
              <span className=" w-full md:w-1/2">
                Although we strive to work with reputable partners who adhere to
                strict privacy and security standards, we cannot control or
                guarantee their data practices. We encourage you to review the
                privacy policies of any third-party services you engage with
                through our platform. Additionally, we are not liable for any
                loss or damage that may result from your reliance on the
                information provided on our website or from any interactions
                with other users. Cryptocurrency investments and transactions
                inherently carry risks, and it is your responsibility to make
                informed decisions. Reinholders does not offer financial, legal,
                or tax advice, and any decisions you make regarding
                cryptocurrency are at your own risk. By using Reinholders, you
                acknowledge and accept these limitations of responsibility. If
                you have any concerns or need further clarification, our support
                team is available to assist you.
              </span>
            </div>
          </div>
          <div className="AmendmentsofPolicy" id="AmendmentsofPolicy">
            <h1 className="text-3xl font-semibold my-5 py-5 text-primary-500">
              Amendments of Policy
            </h1>
            <div className="flex flex-col md:flex-row justify-between gap-5">
              <span className="w-full  md:w-1/2">
                At Reinholders, we are dedicated to maintaining the highest
                standards of privacy and data protection for our users. As the
                cryptocurrency industry and regulatory landscape evolve, it may
                become necessary to update or modify this Privacy Policy to
                reflect changes in our practices, legal requirements, or
                technological advancements.We reserve the right to amend this
                Privacy Policy at any time, and we encourage you to review it
                periodically to stay informed about how we are protecting your
                personal data.
              </span>
              <span className=" w-full md:w-1/2">
                We will also update the {`Last Updated`} date at the beginning
                of the policy to reflect when the most recent changes were made.
                If we make significant changes to the way we collect, use, or
                disclose your personal data, we will take reasonable steps to
                notify you of these changes. This may include sending you an
                email notification, posting an announcement on our platform, or
                providing a prominent notice on our website.
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Privacy;
