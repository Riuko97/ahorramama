import { Suspense } from "react";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Admin · AhorraMamá",
  robots: { index: false },
};

export default function LoginPage() {
  return (
    <div className="page" style={{ maxWidth: 420, margin: "80px auto", textAlign: "center" }}>
      <h1 style={{ fontSize: 22, marginBottom: 8 }}>Acceso administrador</h1>
      <p style={{ color: "var(--muted)", marginBottom: 24 }}>
        Introduce tus credenciales para gestionar el catálogo.
      </p>
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
