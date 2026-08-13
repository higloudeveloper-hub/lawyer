import { createFileRoute } from "@tanstack/react-router";
import { RegisterPicker, RegisterShell } from "@/components/site/RegisterPage";
import { content } from "@/lib/content";

export const Route = createFileRoute("/registro/")({
  head: () => ({
    meta: [
      { title: `${content.es.register.label} — D2LE2 Law` },
      { name: "description", content: content.es.register.text },
    ],
  }),
  component: RegisterIndex,
});

function RegisterIndex() {
  return (
    <RegisterShell>
      <RegisterPicker />
    </RegisterShell>
  );
}
