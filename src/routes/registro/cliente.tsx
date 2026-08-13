import { createFileRoute } from "@tanstack/react-router";
import { RegisterForm, RegisterShell } from "@/components/site/RegisterPage";
import { content } from "@/lib/content";

export const Route = createFileRoute("/registro/cliente")({
  head: () => ({
    meta: [
      { title: `${content.es.register.clientCard.title} — D2LE2 Law` },
      { name: "description", content: content.es.register.clientCard.text },
    ],
  }),
  component: RegisterClient,
});

function RegisterClient() {
  return (
    <RegisterShell>
      <RegisterForm role="client" />
    </RegisterShell>
  );
}
