import SignInForm from "./sign-in-form";

const SignIn: React.FC = () => {
  return (
    <div className="w-full md:w-2/5 2xl:w-1/5 border-2 mx-auto rounded-md p-4">
      <h2 className="text-3xl mb-8 font-bold">使用者登入</h2>
      <SignInForm />
    </div>
  );
};

export default SignIn;
