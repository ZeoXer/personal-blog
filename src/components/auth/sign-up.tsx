import SignUpForm from "./sign-up-form";

const SignUp: React.FC = () => {
  return (
    <div className="w-full md:w-2/5 2xl:w-1/5 border-2 mx-auto rounded-md p-4">
      <h2 className="text-3xl mb-8 font-bold">註冊新帳號</h2>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
