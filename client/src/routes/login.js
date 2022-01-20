import LoginForm from "../components/LoginForm";

export default function Login() {
    return (
      <div className="login-body">
      <div className="auth-wrapper">
        <div className="auth-inner">
      <main style={{ padding: "1rem 0" }}>
        <h2>Login Page</h2>
        <LoginForm />
      </main>
      </div>
      </div>
      </div>
    );
  }