import { TextInput } from "..";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type Props = {
  closeSigninModal: () => void;
  openSignupModal: () => void;
};

const LoginForm = (props: Props) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const router = useRouter();

  const SignIn = async (e: FormEvent) => {
    e.preventDefault();

    if (!password || !email) {
      setError("All fields are required.");
    } else {
      setLoading(true);

      try {
        const res = await signIn("credentials", {
          email,
          password,
          callbackUrl: "/",
          redirect: false,
        });

        if (res?.ok) {
          props.closeSigninModal();
          router.push("/");
        }

        if (res?.error) {
          setError(res?.error);
        }
      } catch (error: any) {
        return setError(error || "Something went wrong, try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-[500px] flex flex-col gap-8">
      <h1 className="text-secondary text-xl font-bold">Login</h1>

      <form className="flex flex-col gap-4">
        <TextInput
          type="email"
          label="Email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <TextInput
          type={`${showPassword ? "text" : "password"}`}
          label="Password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          passwordField={true}
          setPasswordVisible={showPassword}
          togglePasswordIcon={() => setShowPassword((prev) => !prev)}
        />

        <button className="text-white bg-secondary h-12 mt-12" onClick={SignIn}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {error && (
        <p className="text-sm font-semibold text-red-900 self-center">
          {error}
        </p>
      )}

      <span className="text-black flex items-center gap-1 self-center">
        <p>New to the community? </p>{" "}
        <button
          className="underline hover:text-secondary"
          onClick={() => {
            props.closeSigninModal();

            props.openSignupModal();
          }}
        >
          Create an account.
        </button>
      </span>
    </div>
  );
};

export default LoginForm;
