import React, { useState } from "react";
import useAdminStore from "../../store/useAdminStore";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { logo } from "../../assets";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { login } = useAdminStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(username, password);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      //already handled in the store
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-2">
      <form
        onSubmit={handleSubmit}
        aria-label="Admin login form"
        className="w-full max-w-md flex flex-col gap-6 sm:p-10 p-6 bg-card text-card-foreground rounded-2xl border border-border shadow-2xl transition-shadow hover:shadow-[0_12px_48px_0_rgba(31,38,135,0.18)] animate-in fade-in-0 zoom-in-95 duration-700"
      >
        <div className="flex flex-col items-center gap-2 mb-2">
          <div className="rounded-full bg-primary/10 flex items-center justify-center mb-1">
            <span className="text-3xl font-bold text-primary">
              <img
                src={logo}
                alt="logo"
                className="w-40 h-40 cursor-pointer"
                onClick={() => navigate("/")}
              />
            </span>
          </div>
          <h2 className="text-2xl font-bold text-center text-card-foreground">
            Admin Login
          </h2>
          <p className="text-muted-foreground text-sm">
            Sign in to manage PartyTime
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
          />
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pr-10"
            />
            <button
              type="button"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full mt-2 bg-primary text-primary-foreground hover:bg-primary/80 cursor-pointer"
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default AdminLogin;
