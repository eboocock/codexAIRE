import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <main className="container">
      <div className="card" style={{ maxWidth: 560 }}>
        <span className="badge">Supabase Auth</span>
        <h1>Email sign-in</h1>
        <p className="muted">
          This app uses a magic link flow so you do not need to manage passwords for the MVP.
        </p>
        <LoginForm />
        <div className="notice" style={{ marginTop: 16 }}>
          In Supabase, make sure your Site URL and redirect URL include your local and Vercel URLs.
        </div>
      </div>
    </main>
  );
}
