"use client";

import React from "react";
import Container from "../container/Container";
import Button from "../button/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { NewsletterDataType, schema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createNewsletter } from "@/services/newsletter/api";
import Loader from "../loader/Loader";

const NewsLetter = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<NewsletterDataType>({
    resolver: zodResolver(schema),
  });

  const { mutate: createNewsletterMutation, isPending } = useMutation({
    mutationFn: createNewsletter,
    onSuccess: () => {
      reset();
      toast.success("Thanks for subscribing to our newsletter!");
    },
    onError: () => {
      toast.error("Something went wrong, please try again!");
    },
  });

  const onSubmit: SubmitHandler<NewsletterDataType> = (data) => {
    createNewsletterMutation(data);
  };

  return (
    <section className="w-full section-padding text-white bg-primary-500">
      <Container>
        <div className="flex justify-center">
          <div>
            <h2 className="primary-heading text-center">
              Subscribe to our newsletter <br className="hidden md:block" />
              and get updates
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-10 flex flex-col md:flex-row gap-5"
            >
              <div className="flex-1 flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Enter Your Email Address"
                  {...register("email")}
                  className="flex-1 p-4 rounded-full text-black"
                />
                {errors.email && (
                  <p className="text-red-400">{errors?.email?.message}</p>
                )}
              </div>
              <div className="self-start">
                <Button rounded type="neutral" disabled={isPending === true}>
                  {isPending ? (
                    <Loader color="blue" indicator="Subscribing..." />
                  ) : (
                    "Subscribe"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default NewsLetter;
