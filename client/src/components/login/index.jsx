import { useState, useEffect } from "react";
import { usePostLoginMutation, usePostSignUpMutation } from "@/state/api";

const Login = ({ setUser, setSecret }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);
  const [triggerLogin, resultLogin] = usePostLoginMutation();
  const [triggerSignUp, resultSignUp] = usePostSignUpMutation();

  const handleLogin = () => {
    const newErrors = {};
    if (!username) newErrors.username = "Please fill in the username.";
    if (!password) newErrors.password = "Please fill in the password.";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    triggerLogin({ username, password });
  };

  const handleRegister = () => {
    const newErrors = {};
    if (!username) newErrors.username = "Please fill in the username.";
    if (!password) newErrors.password = "Please fill in the password.";
    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password.";
    if (password && confirmPassword && password !== confirmPassword){ 
    newErrors.confirmPassword = "Passwords do not match.";
    setConfirmPassword("");
  }
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    triggerSignUp({ username, password });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (isRegister) {
        handleRegister();
      } else {
        handleLogin();
      }
    }
  };

  useEffect(() => {
    if (resultLogin.data?.response) {
      localStorage.setItem("user", username);
      localStorage.setItem("secret", password);
      setUser(username);
      setSecret(password);
      const loginTime = new Date().getTime();
      localStorage.setItem("loginTime", loginTime);
    } else if (resultLogin.error) {
      setErrors({ general: "Incorrect username or password. Please try again." });
    }
  }, [resultLogin.data, resultLogin.error]); // eslint-disable-line

  useEffect(() => {
    if (resultSignUp.data?.response) {
      setSuccess("User created successfully. Please log in.");
      setIsRegister(false);
      setErrors({});
    } else if (resultSignUp.error) {
      setErrors({ general: "Registration failed. Please try again." });
      setSuccess(null);
    }
  }, [resultSignUp.data, resultSignUp.error]); // eslint-disable-line

  return (
    <div className="login-page">
      <div className={`login-container ${isRegister ? "register-mode" : ""}`}>
        <h2 className="title">AIConnect APP</h2>

        <div className="inputClass">
          <input
            className={`login-input ${errors.username ? "input-error" : ""}`}
            type="text"
            placeholder={errors.username ? errors.username : "Username"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setErrors({ ...errors, username: null })}
          />
          <input
            className={`login-input ${errors.password ? "input-error" : ""}`}
            type="password"
            placeholder={errors.password ? errors.password : "Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setErrors({ ...errors, password: null })}
          />
          {isRegister && (
            <input
              className={`login-input ${errors.confirmPassword ? "input-error" : ""}`}
              type="password"
              placeholder={errors.confirmPassword ? errors.confirmPassword : "Confirm Password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setErrors({ ...errors, confirmPassword: null })}
            />
          )}
        </div>
        {errors.general && (
          <div className="error-popup">
            <div className="error-content">
              <p>{errors.general}</p>
            </div>
          </div>
        )}
        {success && (
          <div className="success-popup">
            <div className="success-content">
              <p>{success}</p>
            </div>
          </div>
        )}
        <div className="login-actions">
          {isRegister ? (
            <button
              className="login-button"
              type="button"
              onClick={handleRegister}
            >
              Register
            </button>
          ) : (
            <button
              className="login-button"
              type="button"
              onClick={handleLogin}
            >
              Login
            </button>
          )}
          <p
            className="register-change"
            onClick={() => {
              setIsRegister(!isRegister);
              setErrors({});
              setSuccess(null);
            }}
          >
            {isRegister ? "Already a user?" : "New user? Click here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
