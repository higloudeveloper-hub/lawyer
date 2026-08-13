import { createFileRoute } from "@tanstack/react-router";
import { RegisterForm, RegisterShell } from "@/components/site/RegisterPage";
import { content } from "@/lib/content";

export const Route = createFileRoute("/registro/abogado")({
  head: () => ({
    meta: [
      { title: `${content.es.register.lawyerCard.title} — D2LE2 Law` },
      { name: "description", content: content.es.register.lawyerCard.text },
    ],
  }),
  component: RegisterLawyer,
});

function RegisterLawyer() {
  return (
    <RegisterShell>
      <RegisterForm role="lawyer" />
    </RegisterShell>
  );
}
