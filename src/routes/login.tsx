import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import "../login.css";
import { z } from "zod";
import { useAuth } from "../lib/context";

export const Route = createFileRoute("/login")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect || "/" });
    }
  },
  component: Login,
});

function Login() {
  const auth = useAuth();
  const router = useRouter();

  async function onFormSubmit(formData: FormData) {
    const data = Object.fromEntries(formData) as {
      username: string;
      password: string;
    };

    await auth.login(data.username, data.password);
    await router.invalidate();
  }

  return (
    <div className="login__container">
      <form className="login__form" action={onFormSubmit}>
        <h1 className="login__text">Welcome</h1>

        <div className="login__fields">
          <div className="login__field">
            <label className="login__label" htmlFor="username">
              Username
            </label>
            <input className="login__input" id="username" name="username" />
          </div>
          <div className="login__field">
            <label className="login__label" htmlFor="password">
              Password
            </label>
            <div className="login__input-wrapper">
              <input
                className="login__input"
                type="password"
                id="password"
                required
                name="password"
              />
            </div>
          </div>
        </div>

        <button className="login__button">Log In</button>
      </form>
    </div>
  );
}
