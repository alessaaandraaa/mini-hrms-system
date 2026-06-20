import LoginForm from "@/components/login/form";
export default function Login() {
  return (
    <div className="flex flex-col gap-5 items-center justify-center min-h-screen">
      <div className="text-5xl font-extrabold text-[#3b2d26]">ALSN HRMS</div>
      <LoginForm />
    </div>
  );
}
