import { createFileRoute, redirect } from "@tanstack/react-router";
import { useAuth } from "../lib/context";

export const Route = createFileRoute("/")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: Index,
});

function Index() {
  const auth = useAuth();

  return (
    <>
      <h1>Hello {auth.user}</h1>
      <p>You are logged in</p>
    </>
  );
}
