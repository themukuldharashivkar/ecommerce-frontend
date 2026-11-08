import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../Redux/Auth/Action";
import AuthMessage from "./AuthMessage";

export default function RegisterUserForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSubmitted(true);
    dispatch(
      register({
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        password: data.get("password"),
      })
    );
  };

  return (
    <div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium text-ink">
              First name
            </label>
            <input id="firstName" name="firstName" required autoComplete="given-name" className="field" />
          </div>
          <div>
            <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium text-ink">
              Last name
            </label>
            <input id="lastName" name="lastName" required autoComplete="family-name" className="field" />
          </div>
        </div>
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
            minLength={6}
            autoComplete="new-password"
            placeholder="At least 6 characters"
            className="field"
          />
        </div>

        {submitted && auth.error && (
          <AuthMessage>We couldn’t create your account. That email may already be registered — try signing in.</AuthMessage>
        )}

        <button type="submit" disabled={auth.isLoading} className="btn-primary w-full">
          {auth.isLoading ? "Please wait…" : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-neutral-600">
        Already have an account?{" "}
        <button type="button" onClick={() => navigate("/login")} className="font-semibold text-ink underline underline-offset-4 hover:text-brand-600">
          Sign in
        </button>
      </p>
    </div>
  );
}
