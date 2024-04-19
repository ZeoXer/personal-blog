"use client";

import React from "react";
import { FieldPath, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../form-fields/input";
import clsx from "clsx";
import { useDarkMode } from "../../hooks/use-dark-mode";
import { signUp } from "../../data/auth";
import { FrontendRoutes } from "../../routes";
import { EnvelopeIcon, UserIcon } from "@heroicons/react/24/outline";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Define the form schema using Zod
const signUpSchema = z.object({
  username: z.string().min(1, { message: "請輸入使用者名稱" }),
  email: z
    .string()
    .min(1, { message: "請輸入信箱" })
    .email({ message: "信箱格式不正確" }),
  password: z.string().min(6, { message: "密碼長度至少為 6 個字元" }),
});

type SignInFormData = z.infer<typeof signUpSchema>;

const SignUpForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  const { isDarkMode } = useDarkMode();
  const router = useRouter();

  const onSubmit = handleSubmit((data) => {
    signUp(data.username, data.email, data.password)
      .then((response) => {
        if (!response.status) {
          setError(response.data as FieldPath<SignInFormData>, {
            message: response.message,
          });
        } else {
          console.log(response.data);
          router.push(FrontendRoutes.LOGIN);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-8">
        <Input
          label="使用者名稱"
          icon={<UserIcon className="w-7 mb-1" />}
          {...register("username")}
          inputClassName="w-full"
          containerClassName="mb-4"
          error={errors.username?.message}
        />
        <Input
          label="信箱"
          type="email"
          icon={<EnvelopeIcon className="w-7 mb-1" />}
          {...register("email")}
          inputClassName="w-full"
          containerClassName="mb-4"
          error={errors.email?.message}
        />
        <Input
          label="密碼"
          type="password"
          icon={<LockClosedIcon className="w-7 mb-1" />}
          inputClassName="w-full"
          containerClassName="mb-4"
          {...register("password")}
          error={errors.password?.message}
        />
      </div>
      <button
        type="submit"
        className={clsx(
          "text-2xl w-full mx-auto py-2 block transition rounded-md md:active:scale-90",
          isDarkMode ? "bg-green-700 text-white" : "bg-green-300"
        )}
      >
        註冊帳號
      </button>
      <Link
        href={FrontendRoutes.LOGIN}
        className={clsx(
          "text-2xl w-full mx-auto py-2 block transition rounded-md md:active:scale-90 text-center mt-4",
          isDarkMode ? "bg-orange-700 text-white" : "bg-orange-300"
        )}
      >
        前往登入
      </Link>
    </form>
  );
};
export default SignUpForm;
