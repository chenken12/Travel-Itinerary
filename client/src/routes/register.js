import RegisterForm from "../components/RegisterForm";

export default function Register() {
    return (
      <div className="login-body">
      <div className="auth-wrapper">
        <div className="auth-inner">
      <main style={{ padding: "1rem 0" }}>
        <h2>Registration Page</h2>
        <RegisterForm />
      </main>
      </div>
      </div>
      </div>
    );
  }