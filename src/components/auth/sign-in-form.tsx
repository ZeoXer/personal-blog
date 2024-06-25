"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../form-fields/input";
import clsx from "clsx";
import { useDarkMode } from "../../hooks/use-dark-mode";
import { login } from "../../data/auth";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { FrontendRoutes } from "@/routes";
import { useRouter } from "next/navigation";
import { setAuthToken } from "@/data/client/token";
import { useState } from "react";
import Modal from "../common/modal";

// Define the form schema using Zod
const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "請輸入信箱" })
    .email({ message: "信箱格式不正確" }),
  password: z.string().min(6, { message: "密碼長度至少為 6 個字元" }),
});

type SignInFormData = z.infer<typeof signInSchema>;

const SignInForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isDarkMode } = useDarkMode();
  const router = useRouter();

  const handleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await login(data.email, data.password);
      if (response.status) {
        setAuthToken(response.data.token.toString());
        router.push(FrontendRoutes.HOME);
      }
    } catch (error) {
      console.log(error);
      handleLoginModal();
    }
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="mb-8">
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
            "text-2xl w-full mx-auto py-2 block transition rounded-lg md:active:scale-90",
            isDarkMode ? "bg-green-700 text-white" : "bg-green-300"
          )}
        >
          登入
        </button>
        <Link
          href={FrontendRoutes.SIGNUP}
          className={clsx(
            "text-2xl w-full mx-auto py-2 block transition rounded-lg md:active:scale-90 text-center mt-4",
            isDarkMode ? "bg-orange-700 text-white" : "bg-orange-300"
          )}
        >
          註冊帳號
        </Link>
      </form>
      <Modal
        title="登入失敗"
        isOpen={isLoginModalOpen}
        setIsOpen={setIsLoginModalOpen}
      >
        帳號或密碼錯誤
      </Modal>
    </>
  );
};

export default SignInForm;
