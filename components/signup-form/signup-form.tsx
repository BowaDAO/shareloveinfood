import { TextInput, RadioButtons } from "..";
import { useState, FormEvent } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {
  closeSignupModal: () => void;
};

const SignupForm = (props: Props) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const router = useRouter();

  const SignUp = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || !password || !email || !role) {
      setError("All fields are required.");
    } else {
      setLoading(true);

      await axios
        .post(
          "/api/createAccount",
          JSON.stringify({ name, password, email, role })
        )
        .then(async (res) => {
          const signInRes = await signIn("credentials", {
            email,
            password,
            callbackUrl: "/",
            redirect: false,
          });

          if (signInRes?.ok) {
            props.closeSignupModal();

            router.push(res.data.role === "giver" ? "/giver" : "/recipient");
          }
        })
        .catch((error) => {
          setError(error?.response?.data?.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div className="w-[500px] flex flex-col gap-8">
      <h1 className="text-secondary text-xl font-bold">
        One step away from #SharingLoveInFood.
      </h1>

      <form className="flex flex-col gap-4">
        <TextInput
          type="text"
          label="Name"
          id="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          disabled={loading}
        />

        <TextInput
          type="email"
          label="Email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          disabled={loading}
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
          disabled={loading}
        />

        <RadioButtons role={role} setRole={setRole} />

        <button onClick={SignUp} className="text-white bg-secondary h-12 mt-8">
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      {error && (
        <p className="text-sm font-semibold text-red-900 self-center">
          {error}
        </p>
      )}
    </div>
  );
};

export default SignupForm;
