import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";

type AuthMode = "signin" | "signup";

type AuthDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultMode?: AuthMode;
};

export const AuthDialog = ({
  open,
  onOpenChange,
  defaultMode = "signin",
}: AuthDialogProps) => {
  const [mode, setMode] = useState<AuthMode>(defaultMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  const { signIn, signUp, resetPassword } = useAuth();

  useEffect(() => {
    if (open) setMode(defaultMode);
  }, [open, defaultMode]);

  const reset = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setDisplayName("");
    setShowPassword(false);
    setShowConfirmPassword(false);
    setError("");
    setNotice("");
    setLoading(false);
  };

  const handleClose = (next: boolean) => {
    if (!next) reset();
    onOpenChange(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setNotice("");
    setLoading(true);

    try {
      if (mode === "signin") {
        await signIn(email, password);
        handleClose(false);
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      await signUp(email, password, displayName || undefined);
      setNotice("Please verify your email first, then sign in. Firebase has sent a verification link to your inbox.");
      setMode("signin");
      setPassword("");
      setConfirmPassword("");
      setShowPassword(false);
      setShowConfirmPassword(false);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "An error occurred. Try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setError("");
    setNotice("");

    if (!email.trim()) {
      setError("Enter your email first, then click Forgot password.");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(email.trim());
      setNotice("Password reset email sent. Please check your inbox.");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Could not send password reset email.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode((m) => (m === "signin" ? "signup" : "signin"));
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
    setError("");
    setNotice("");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90svh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="uppercase tracking-wide">
            {mode === "signin" ? "Sign In" : "Sign Up"}
          </DialogTitle>
          <DialogDescription>
            {mode === "signin"
              ? "Enter your verified email and password to access your account."
              : "Create an account. Please verify your email first, then sign in."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="displayName">Name</Label>
              <Input
                id="displayName"
                type="text"
                placeholder="Your name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="uppercase tracking-wide"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {mode === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((value) => !value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          )}

          {mode === "signin" && (
            <button
              type="button"
              onClick={handleResetPassword}
              disabled={loading}
              className="text-sm font-semibold text-primary hover:underline disabled:opacity-60"
            >
              Forgot password?
            </button>
          )}

          {notice && (
            <p className="rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-foreground">
              {notice}
            </p>
          )}

          {error && (
            <p className="text-sm font-medium text-destructive">{error}</p>
          )}

          <Button
            type="submit"
            className="w-full uppercase tracking-wider"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : mode === "signin"
                ? "Sign In"
                : "Sign Up"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={switchMode}
            className="font-semibold text-primary hover:underline"
          >
            {mode === "signin" ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </DialogContent>
    </Dialog>
  );
};
