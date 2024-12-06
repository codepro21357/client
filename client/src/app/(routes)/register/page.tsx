"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Button from "@/components/button/Button";
import Container from "@/components/container/Container";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import Loader from "@/components/loader/Loader";
import { RegisterDataType, schema } from "./schema";
import { createUser } from "@/services/users/api";
import { useAppDispatch } from "@/hooks/redux";
import { addUser } from "@/redux/slice/userSlice";
import { countries } from "@/data";

const networkError =
  "getaddrinfo ENOTFOUND cluster0-shard-00-00.v33pl.mongodb.net";
// Tailwind classes
const formGroupStyles =
  "w-full md:w-[calc(calc(100%-20px)/2)] flex flex-col gap-2";
const inputStyles = "flex-1 px-4 py-2 border-2 rounded-md";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [img, setImg] = useState("");
  const [imgError, setImgError] = useState("");
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const recaptchaRef = useRef(null);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const { mutateAsync: createUserMutation, isPending } = useMutation({
    mutationFn: createUser,
    onSuccess: (user) => {
      dispatch(addUser(user));
      router.push("/dashboard");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDataType>({
    defaultValues: { country: "" },
    resolver: zodResolver(schema),
  });

  const handleRecaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };

  const onSubmit: SubmitHandler<RegisterDataType> = async (data) => {
    if (!img) {
      return setImgError("Profile picture is required");
    }

    data.avatar = img;

    try {
      await createUserMutation({ ...data, captcha: captchaValue });
    } catch (err: any) {
      let message = "Network error";

      if (err?.response) {
        if (err?.response?.data?.message?.includes(networkError)) {
          message = "Network error, please check your internet connection";
        } else {
          message = err?.response?.data?.message;
        }
      }

      toast.error(message);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        setImg(base64String);
        setImgError("");
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0 && !img) {
      setImgError("Profile picture is required");
    }
  }, [errors, img]);

  return (
    <section className="w-full pt-[120px] pb-[80px] bg-gray-100">
      <Container>
        <div className="h-full my-10 flex justify-center items-center">
          <div className="h-full w-[700px] px-5 py-6 rounded-md bg-white">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex justify-center items-center flex-col mt-5">
                <h1 className="font-bold text-[30px] md:text-4xl mb-4">
                  Create Account
                </h1>
                <p className="font-semibold">
                  Open a free account and start trading
                </p>
              </div>
              <div className="mt-5 flex flex-col md:flex-row flex-wrap gap-5">
                <div className={formGroupStyles}>
                  <input
                    type="text"
                    placeholder="First Name"
                    {...register("firstName")}
                    className={inputStyles}
                  />
                  {errors.firstName && (
                    <p className="text-error">{errors?.firstName?.message}</p>
                  )}
                </div>
                <div className={formGroupStyles}>
                  <input
                    type="text"
                    placeholder="Last Name"
                    {...register("lastName")}
                    className={inputStyles}
                  />
                  {errors.lastName && (
                    <p className="text-error">{errors?.lastName?.message}</p>
                  )}
                </div>
                <div className={formGroupStyles}>
                  <input
                    type="text"
                    placeholder="Email eg:email@gmail.com"
                    {...register("email")}
                    className={inputStyles}
                  />
                  {errors.email && (
                    <p className="text-error">{errors?.email?.message}</p>
                  )}
                </div>
                <div className={formGroupStyles}>
                  <input
                    type="text"
                    placeholder="Phone Number +1 (123) 456-7890"
                    {...register("phoneNumber")}
                    className={inputStyles}
                  />
                  {errors.phoneNumber && (
                    <p className="text-error">{errors?.phoneNumber?.message}</p>
                  )}
                </div>
                <div className={formGroupStyles}>
                  <select
                    {...register("country")}
                    className="border-2 w-full px-[10px] py-2 rounded-md"
                  >
                    <option value="" disabled>
                      Country
                    </option>
                    {countries.map((country, index) => (
                      <option key={index}>{country}</option>
                    ))}
                  </select>
                  {errors.country && (
                    <p className="text-error">{errors?.country?.message}</p>
                  )}
                </div>
                <div className={formGroupStyles}>
                  <input
                    type="text"
                    placeholder="Enter your address"
                    {...register("address")}
                    className={inputStyles}
                  />
                  {errors.address && (
                    <p className="text-error">{errors?.address?.message}</p>
                  )}
                </div>
                <div className={formGroupStyles}>
                  <div
                    className="w-full flex justify-center items-center gap-2 
                  rounded-md border-2 focus-within:border-black"
                  >
                    <input
                      type={`${showPassword ? "text" : "password"}`}
                      placeholder="Password"
                      {...register("password")}
                      className="w-[40px] px-4 py-2 flex-[9] focus-visible:outline-none"
                    />
                    <div
                      onClick={() => setShowPassword(!showPassword)}
                      className="mr-2 text-gray-500 cursor-pointer"
                    >
                      {showPassword ? (
                        <IoEye size={20} />
                      ) : (
                        <IoEyeOff size={20} />
                      )}
                    </div>
                  </div>
                  {errors.password && (
                    <p className="text-error">{errors?.password?.message}</p>
                  )}
                </div>
                <div className={formGroupStyles}>
                  <div
                    className="w-full flex justify-center items-center gap-2 
                  rounded-md border-2 focus-within:border-black"
                  >
                    <input
                      type={`${showConfirmPassword ? "text" : "password"}`}
                      placeholder="Confirm Password"
                      {...register("confirmPassword")}
                      className="w-[40px] px-4 py-2 flex-[9] focus-visible:outline-none"
                    />
                    <div
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="mr-2 text-gray-500 cursor-pointer"
                    >
                      {showConfirmPassword ? (
                        <IoEye size={20} />
                      ) : (
                        <IoEyeOff size={20} />
                      )}
                    </div>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-error">
                      {errors?.confirmPassword?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-5 mt-5">
                <div className="flex-1">
                  <label className="font-semibold">Profile Picture</label>
                  <input
                    className="w-full"
                    type="file"
                    onChange={handleChange}
                  />
                  {imgError && <p className="mt-2 text-error">{imgError}</p>}
                </div>
                <div className="flex-1">
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      className="w-[20px] cursor-pointer"
                      {...register("agreement")}
                    />
                    <div className="wrapper flex gap-3 flex-[8]">
                      <p>
                        I accept the
                        <span className="ml-1">
                          <Link href="#" className="text-blue-400">
                            terms and conditions.
                          </Link>
                        </span>
                      </p>
                    </div>
                  </div>
                  {errors.agreement && (
                    <p className="mt-2 text-error">
                      {errors?.agreement?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="my-5">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}
                  onChange={handleRecaptchaChange}
                />
              </div>
              <div className="mt-5 text-white">
                <Button
                  type="gradient"
                  width="full"
                  disabled={isPending === true}
                >
                  {isPending ? <Loader /> : " Create Account"}
                </Button>
              </div>
              <div className="flex justify-center items-center gap-3 mt-3 pb-2">
                <p>Have account already?</p>
                <Link href="/login" className="text-blue-400">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Register;
