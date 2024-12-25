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
                  Terms & Conditions
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
                <li className={LiStyle}>Intellectual Property Rights</li>
              </ul>
              <a
                href="#IntellectualPropertyRights

"
              >
                {" "}
                <button className={buttonStyles}>
                  <HiArrowLongRight size={25} />
                </button>
              </a>
            </div>
            <hr className="border-[1px] border-gray-300" />
            <div className="list-wrapper  my-3 flex justify-evenly items-center gap-5">
              <ul className={UlStyle}>
                <li className={LiStyle}>Disclaimer of Warranties</li>
              </ul>
              <a
                href="#DisclaimerofWarranties

"
              >
                {" "}
                <button className={buttonStyles}>
                  <HiArrowLongRight size={25} />
                </button>
              </a>
            </div>
            <hr className="border-[1px] border-gray-300" />
            <div className="list-wrapper  my-3 flex justify-evenly items-center gap-5">
              <ul className={UlStyle}>
                <li className={LiStyle}>Refund Policy</li>
              </ul>
              <a
                href="#RefundPolicy

"
              >
                <button className={buttonStyles}>
                  <HiArrowLongRight size={25} />
                </button>
              </a>
            </div>
            <hr className="border-[1px] border-gray-300" />
            <div className="list-wrapper  my-3 flex justify-evenly items-center gap-5">
              <ul className={UlStyle}>
                <li className={LiStyle}>Limitation of Liability</li>
              </ul>
              <a
                href="#LimitationofLiability

"
              >
                {" "}
                <button className={buttonStyles}>
                  <HiArrowLongRight size={25} />
                </button>
              </a>
            </div>
            <hr className="border-[1px] border-gray-300" />
            <div className="list-wrapper  my-3 flex justify-evenly items-center gap-5">
              <ul className={UlStyle}>
                <li className={LiStyle}>Indemnification</li>
              </ul>
              <a
                href="#Indemnification

"
              >
                <button className={buttonStyles}>
                  <HiArrowLongRight size={25} />
                </button>
              </a>
            </div>
            <hr className="border-[1px] border-gray-300" />
            <div className="list-wrapper  my-3 flex justify-evenly items-center gap-5">
              <ul className={UlStyle}>
                <li className={LiStyle}>Miscellaneous</li>
              </ul>
              <a
                href="#Miscellaneous

"
              >
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
                  Terms & Conditions
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
                Welcome to Reinholders, your trusted platform for navigating the
                world of cryptocurrency. By accessing and using our website, you
                agree to comply with and be bound by the following terms and
                conditions. These terms outline your rights and responsibilities
                as a user, as well as the guidelines and policies that govern
                your use of our services. Reinholders is committed to providing
                a secure, transparent, and user-friendly environment for all our
                users, and these terms are designed to ensure a safe and fair
                experience for everyone. Whether you are a seasoned investor or
                new to the cryptocurrency space, understanding and agreeing to
                these terms is essential for utilizing our platform effectively.
                Reinholders provides a variety of services, including but not
                limited to cryptocurrency trading, wallet management, market
                analysis, and educational resources. Our goal is to empower you
                with the tools and knowledge needed to make informed decisions
                in the rapidly evolving world of digital assets.
              </span>
              <span className=" w-full md:w-1/2">
                Please read these terms carefully before using our services.
                They contain important information regarding your rights,
                obligations, and the limitations of our liability. If you do not
                agree with any part of these terms, we advise you not to use our
                platform. By continuing to use Reinholders, you acknowledge that
                you have read, understood, and agree to be bound by these terms
                and conditions. We may update or modify these terms from time to
                time, and it is your responsibility to review them regularly.
                Your continued use of Reinholders after any changes indicates
                your acceptance of the updated terms. Thank you for choosing
                Reinholders as your partner in the cryptocurrency journey, and
                we look forward to helping you achieve your financial goals.
              </span>
            </div>
          </div>
          <div
            className="IntellectualPropertyRights"
            id="IntellectualPropertyRights"
          >
            <h1 className="text-3xl font-semibold my-5 py-5 text-primary-500">
              Intellectual Property Rights
            </h1>
            <div className="flex flex-col md:flex-row justify-between gap-5">
              <span className="w-full  md:w-1/2">
                All content, features, and functionality provided on the
                Reinholders platform, including but not limited to the website
                design, text, graphics, logos, icons, images, audio clips, video
                clips, digital downloads, data compilations, and software, are
                the exclusive property of Reinholders and its licensors. These
                materials are protected by international copyright, trademark,
                patent, trade secret, and other intellectual property or
                proprietary rights laws. The trademarks, logos, and service
                marks displayed on our website are registered and unregistered
                trademarks of Reinholders and third parties. Nothing in these
                terms and conditions or on the Reinholders website grants, by
                implication, estoppel, or otherwise, any license or right to use
                any trademark, logo, or service mark without the prior written
                permission of Reinholders or the respective owner.
              </span>
              <span className=" w-full md:w-1/2">
                You are granted a limited, non-commercial use, provided that you
                do not modify, copy, reproduce, republish, upload, post,
                transmit, distribute, sell, license, or create derivative works
                from any content or materials on our platform without our prior
                written consent. Any unauthorized use of the content or
                materials on Reinholders may violate copyright, trademark, and
                other applicable laws and could result in criminal or civil
                penalties. Reinholders reserves all rights not expressly granted
                to you under these terms and conditions. Any feedback, comments,
                or suggestions you may provide regarding our platform will be
                considered non-confidential and non-proprietary, and Reinholders
                will be free to use such information on an unrestricted basis.
              </span>
            </div>
          </div>
          <div className="DisclaimerofWarranties" id="DisclaimerofWarranties">
            <h1 className="text-3xl font-semibold my-5 py-5 text-primary-500">
              Disclaimer of Warranties
            </h1>
            <div className="flex flex-col md:flex-row justify-between gap-5">
              <span className="w-full  md:w-1/2">
                Reinholders provides its services, information, and content on
                an {`"as is"`} and {`"as available"`} basis, without any
                warranties or guarantees of any kind, whether express or
                implied. To the fullest extent permitted by applicable law,
                Reinholders disclaims all warranties, express or implied,
                including but not limited to implied warranties of
                merchantability, fitness for a particular purpose,
                non-infringement, and any warranties that may arise from the
                course of dealing, usage, or trade practice. While Reinholders
                strives to ensure that the information provided on our platform
                is accurate, complete, and up-to-date, we do not warrant or
                guarantee the accuracy, reliability, timeliness, or completeness
                of any information, content, or services offered through the
                platform. The cryptocurrency market is inherently volatile, and
                the information provided on Reinholders may be subject to change
                without notice. You acknowledge that any reliance on such
                information, content, or services is at your own risk.
              </span>
              <span className=" w-full md:w-1/2">
                Reinholders does not warrant that our platform will be
                uninterrupted, secure, or free of errors, viruses, or other
                harmful components. We do not guarantee that any defects or
                errors on the site will be corrected, accuracy, and protection.
                Reinholders makes no warranties or representations regarding the
                availability, suitability, or compatibility of our platform with
                your devices, operating systems, or software. We also disclaim
                any responsibility for the actions, conduct, or omissions of
                third parties or other users of the platform. By using
                Reinholders, you agree that you understand and accept these
                disclaimers. Your use of the platform is entirely at your own
                risk, and Reinholders shall not be liable for any damages,
                losses, or expenses arising from your use or inability to use
                the platform, whether based on contract, tort, negligence,
                strict liability, or otherwise.
              </span>
            </div>
          </div>
          <div className="RefundPolicy" id="RefundPolicy">
            <h1 className="text-3xl font-semibold my-5 py-5 text-primary-500">
              Refund Policy
            </h1>
            <div className="flex flex-col md:flex-row justify-between gap-5">
              <span className="w-full  md:w-1/2">
                At Reinholders, we are committed to providing a high level of
                service and transparency in all our transactions. However, due
                to the nature of cryptocurrency transactions and the digital
                services we offer, all sales made on our platform are final and
                non-refundable. Once a transaction has been completed, whether
                it involves the purchase of digital assets, subscription
                services, or any other products or services offered by
                Reinholders, it cannot be reversed or refunded. Cryptocurrency
                transactions are inherently irreversible and decentralized,
                meaning that once a transaction is confirmed on the blockchain,
                it cannot be undone or reversed by Reinholders or any other
                party. This applies to all transactions conducted on our
                platform, including but not limited to trading, wallet services,
                and other digital offerings.
              </span>
              <span className=" w-full md:w-1/2">
                We advise all users to carefully review their transactions
                before completing any purchase or transfer. Ensure that you have
                input the correct information, including wallet addresses,
                transaction amounts, and other necessary details, as Reinholders
                cannot be held responsible for any errors or losses that may
                occur due to user mistakes or misunderstandings. In the event
                that you experience technical issues or believe there has been
                an error with your transaction, please contact our support team
                immediately. While we cannot provide refunds, we will do our
                best to assist you in resolving any issues and ensuring the
                accuracy of your transactions. Please note that any promotional
                offers, discounts, or special deals provided by Reinholders are
                subject to specific terms and conditions, and these may include
                non-refundable clauses. Be sure to read the terms associated
                with any promotions carefully before participating.
              </span>
            </div>
          </div>
          <div className="LimitationofLiability" id="LimitationofLiability">
            <h1 className="text-3xl font-semibold my-5 py-5 text-primary-500">
              Limitation of Liability
            </h1>
            <div className="flex flex-col md:flex-row justify-between gap-5">
              <span className="w-full  md:w-1/2">
                Reinholders is committed to providing a reliable and secure
                platform for cryptocurrency transactions and related services.
                However, to the fullest extent permitted by applicable law,
                Reinholders, its affiliates, directors, officers, employees,
                agents, and partners shall not be liable for any direct,
                indirect, incidental, consequential, special, exemplary, or
                punitive damages, including but not limited to loss of profits,
                revenue, data, business, or goodwill, arising out of or in
                connection with your access to, use of, or inability to use our
                platform, even if Reinholders has been advised of the
                possibility of such damages. This limitation of liability
                applies to all claims, whether based on contract, tort,
                negligence, strict liability, or any other legal or equitable
                theory, and whether or not Reinholders was advised of the
                possibility of such damages. In no event shall Reinholders’
                total liability to you for all damages, losses, and causes of
                action exceed the amount you have paid, if any, for accessing or
                using the services provided by Reinholders in the six months
                preceding the date of the claim.
              </span>
              <span className=" w-full md:w-1/2">
                Reinholders does not guarantee the accuracy, completeness, or
                timeliness of any information provided on the platform, and you
                agree that you are solely responsible for verifying any
                information before relying on it. Additionally, Reinholders is
                not liable for any losses or damages resulting from third-party
                activities, including but not limited to cyber-attacks,
                unauthorized access to your account, or the actions of other
                users of the platform. Some jurisdictions do not allow the
                exclusion or limitation of certain warranties or liabilities, so
                the above limitations may not apply to you. In such cases, the
                liability of Reinholders shall be limited to the maximum extent
                permitted by applicable law. By using Reinholders, you
                acknowledge and agree to this limitation of liability, and you
                assume full responsibility for any risks associated with your
                use of our platform.
              </span>
            </div>
          </div>
          <div className="Indemnification" id="Indemnification">
            <h1 className="text-3xl font-semibold my-5 py-5 text-primary-500">
              Indemnification
            </h1>
            <div className="flex flex-col md:flex-row justify-between gap-5">
              <span className="w-full  md:w-1/2">
                By using Reinholders, you agree to indemnify, defend, and hold
                harmless Reinholders, its affiliates, directors, officers,
                employees, agents, and partners from and against any and all
                claims, liabilities, damages, losses, costs, or expenses arising
                out of or related to your use of the platform, your violation of
                these terms and conditions, or your infringement of any
                intellectual property or other rights of any third party. This
                indemnification obligation includes, but is not limited to, any
                claims or liabilities arising from: Your use of Reinholders: Any
                activity you engage in on our platform, including transactions,
                communications, and interactions with other users, that may
                result in legal action or liability. Breach of Terms: Any breach
                or violation of these terms and conditions, whether by you or
                someone acting on your behalf, that causes harm or potential
                harm to Reinholders or other users. Violation of Laws: Any
                actions taken by you that are illegal or prohibited by
                applicable laws, including but not limited to cryptocurrency
                regulations, consumer protection laws, intellectual property
                laws, and privacy laws.
              </span>
              <span className=" w-full md:w-1/2">
                Third-Party Rights: Any claim that your actions on Reinholders
                infringe upon the rights of any third party, including
                intellectual property rights, privacy rights, or contractual
                rights. You agree to cooperate fully with Reinholders in the
                defense of any claim that may arise in connection with your use
                of the platform. Reinholders reserves the right, at its own
                expense, to assume the exclusive defense and control of any
                matter subject to indemnification by you, and you agree not to
                settle any such matter without the prior written consent of
                Reinholders. This indemnification obligation will survive the
                termination of these terms and your use of the platform. By
                using Reinholders, you acknowledge and agree to this
                indemnification provision, and you accept full responsibility
                for any claims or liabilities that may arise from your use of
                our platform.
              </span>
            </div>
          </div>
          <div className="Miscellaneous" id="Miscellaneous">
            <h1 className="text-3xl font-semibold my-5 py-5 text-primary-500">
              Miscellaneous
            </h1>
            <div className="flex flex-col md:flex-row justify-between gap-5">
              <span className="w-full  md:w-1/2">
                These terms and conditions constitute the entire agreement
                between you and Reinholders concerning your use of our platform
                and supersede any prior agreements, understandings, or
                representations between you and Reinholders. No waiver of any
                provision of these terms by Reinholders shall be deemed a
                further or continuing waiver of such provision or any other
                provision, and Reinholders’ failure to assert any right or
                provision under these terms shall not constitute a waiver of
                such right or provision. If any provision of these terms and
                conditions is found to be invalid, illegal, or unenforceable by
                a court of competent jurisdiction, the remaining provisions of
                these terms shall remain in full force and effect. The invalid,
                illegal, or unenforceable provision shall be modified to the
                extent necessary to make it enforceable while preserving the
                intent of the original provision as closely as possible.
              </span>
              <span className=" w-full md:w-1/2">
                Reinholders may assign or transfer its rights and obligations
                under these terms and conditions, in whole or in part, at any
                time without notice to you. You may not assign, transfer, or
                sublicense your rights or obligations under these terms without
                the prior written consent of Reinholders. These terms and
                conditions are governed by and construed in accordance with the
                laws of the jurisdiction in which Reinholders operates, without
                regard to its conflict of law principles. Any disputes arising
                out of or related to these terms and conditions or your use of
                the Reinholders platform shall be resolved exclusively in the
                courts of that jurisdiction, and you consent to the personal
                jurisdiction of such courts.
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Privacy;
