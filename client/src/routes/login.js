import LoginForm from "../components/LoginForm";
import NavBar from "../components/navBar";

export default function Login() {
    return (
      <div className="login-body">
      <div className="auth-wrapper">
        <div className="auth-inner">
        <NavBar />
      <main style={{ padding: "1rem 0" }}>
        <h2>Login Page</h2>
        <LoginForm />
      </main>
      </div>
      </div>
      </div>
    );
  }