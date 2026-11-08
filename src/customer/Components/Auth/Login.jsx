import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../Redux/Auth/Action";
import AuthMessage from "./AuthMessage";

export default function LoginUserForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSubmitted(true);
    dispatch(login({ email: data.get("email"), password: data.get("password") }));
  };

  return (
    <div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
            Email
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className="field" />
        </div>
        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="Your password"
            className="field"
          />
        </div>

        {submitted && auth.error && <AuthMessage>We couldn’t sign you in. Check your email and password and try again.</AuthMessage>}

        <button type="submit" disabled={auth.isLoading} className="btn-primary w-full">
          {auth.isLoading ? "Please wait…" : "Sign in"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-neutral-600">
        New to Bazaarly?{" "}
        <button type="button" onClick={() => navigate("/register")} className="font-semibold text-ink underline underline-offset-4 hover:text-brand-600">
          Create an account
        </button>
      </p>
    </div>
  );
}
