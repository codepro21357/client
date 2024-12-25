"use client";

import React from "react";
import Button from "@/components/button/Button";
import Container from "@/components/container/Container";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoCall, IoLocation } from "react-icons/io5";
import { RiMessage2Fill } from "react-icons/ri";
import { ContactDataType, schema } from "./schema";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { sendContact } from "@/services/contact/api";
import Loader from "@/components/loader/Loader";

const Contact = () => {
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactDataType>({
    resolver: zodResolver(schema),
  });

  const { mutate: sendContactMutation, isPending } = useMutation({
    mutationFn: sendContact,
    onSuccess: () => {
      reset();
      toast.success("Message sent. We will get back to you shortly!", {
        duration: 7000,
      });
    },
    onError: () => {
      toast.error("Something went wrong, please try again!");
    },
  });

  const values = watch();

  const onSubmit: SubmitHandler<ContactDataType> = (data) => {
    sendContactMutation(data);
  };
  return (
    <section className="w-full pt-5 md:pt-[160px] pb-10 bg">
      <Container>
        <div className="w-full flex flex-col md:flex-row gap-10">
          <div className="flex-[2] pt-[110px]">
            <h1 className="text-[30px] md:text-[52px] mb-[32px] font-neueMetana font-bold">
              Contact us
            </h1>
            <h2 className="font-bold mb-[24px] text-2xl">
              Get in touch with our dedicated <br />
              support team
            </h2>
            <p className="mb-[56px] text-gray-500">
              We are here to assist you! Whether you have questions, need
              assistance, or simply want to learn more about our trading
              services, our dedicated support team is ready to help
            </p>
            <div className="flex flex-col gap-5 pb-[56px]">
              <div className="flex gap-4">
                <RiMessage2Fill size={22} />
                <p>support@reinholders.com</p>
              </div>
              <div className="flex gap-4">
                <IoCall size={22} />
                <p>+1 (929) 207-1840</p>
              </div>
              <div className="flex gap-4">
                <IoLocation size={22} />
                <p>95 Wall St, New York, NY 10005</p>
              </div>
            </div>
          </div>
          <div
            className="border rounded-[24px] flex-[3] py-[110px] px-10 shadow-md 
            bg-image-gradient bg-size bg-no-repeat"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1
                className="text-[30px] md:text-[52px] first-line:font-neueMetana 
                font-bold mb-8 leading-[62px]"
              >
                Send us a <br /> message
              </h1>
              <div className="flex flex-col md:flex-row gap-10 py-8">
                <div className="relative flex-1 z-[1]">
                  <input
                    type="text"
                    {...register("firstName")}
                    className="peer w-full p-3 border-b outline-none border-black bg-transparent
                    md:flex md:flex-1 focus-visible:border-b-2"
                  />
                  {!values.firstName && (
                    <label
                      className={`${
                        errors.firstName ? "bottom-10" : "bottom-3"
                      } peer-focus-visible:hidden absolute 
                       left-3 z-[-1]`}
                    >
                      First name*
                    </label>
                  )}
                  {errors.firstName && (
                    <p className="text-error">{errors?.firstName?.message}</p>
                  )}
                </div>
                <div className="relative flex-1 z-[1]">
                  <input
                    type="text"
                    {...register("lastName")}
                    className="peer w-full p-3 border-b outline-none border-black bg-transparent
                    focus-visible:border-b-2 flex flex-1"
                  />
                  {!values.lastName && (
                    <label
                      className={`${
                        errors.lastName ? "bottom-10" : "bottom-3"
                      } peer-focus-visible:hidden absolute 
                       left-3 z-[-1]`}
                    >
                      Last name*
                    </label>
                  )}
                  {errors.lastName && (
                    <p className="text-error">{errors?.lastName?.message}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-10">
                <div className="relative flex-1 z-[1]">
                  <input
                    type="text"
                    {...register("email")}
                    className="peer w-full p-3 border-b outline-none border-black bg-transparent 
                    focus-visible:border-b-2"
                  />
                  {!values.email && (
                    <label
                      className={`${
                        errors.email ? "bottom-10" : "bottom-3"
                      } peer-focus-visible:hidden absolute 
                       left-3 z-[-1]`}
                    >
                      Your email address*
                    </label>
                  )}
                  {errors.email && (
                    <p className="text-error">{errors?.email?.message}</p>
                  )}
                </div>
                <div className="relative flex-1 z-[1]">
                  <input
                    type="text"
                    {...register("message")}
                    className="peer w-full p-3 border-b outline-none border-black bg-transparent
                    focus-visible:border-b-2"
                  />
                  {!values.message && (
                    <label
                      className={`${
                        errors.message ? "bottom-10" : "bottom-3"
                      } peer-focus-visible:hidden absolute 
                       left-3 z-[-1]`}
                    >
                      Describe how we can help you*
                    </label>
                  )}
                  {errors.message && (
                    <p className="text-error">{errors?.message?.message}</p>
                  )}
                </div>
              </div>
              <div className="font-bold text-white mt-[34px]">
                <Button
                  type="gradient"
                  width="full"
                  disabled={isPending === true}
                >
                  {isPending ? <Loader /> : "Submit Form"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Contact;
