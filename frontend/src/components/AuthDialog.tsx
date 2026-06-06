import { useState, useEffect } from "react";
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

  useEffect(() => {
    if (open) setMode(defaultMode);
  }, [open, defaultMode]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signIn, signUp } = useAuth();

  const reset = () => {
    setEmail("");
    setPassword("");
    setDisplayName("");
    setError("");
    setLoading(false);
  };

  const handleClose = (next: boolean) => {
    if (!next) reset();
    onOpenChange(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "signin") {
        await signIn(email, password);
      } else {
        await signUp(email, password, displayName || undefined);
      }
      handleClose(false);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "An error occurred. Try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode((m) => (m === "signin" ? "signup" : "signin"));
    setError("");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="uppercase tracking-wide">
            {mode === "signin" ? "Sign In" : "Sign Up"}
          </DialogTitle>
          <DialogDescription>
            {mode === "signin"
              ? "Enter your email and password to access your account."
              : "Create an account to save wishlists and track orders."}
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
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-sm text-destructive font-medium">{error}</p>
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

        <p className="text-sm text-muted-foreground text-center">
          {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={switchMode}
            className="text-primary font-semibold hover:underline"
          >
            {mode === "signin" ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </DialogContent>
    </Dialog>
  );
};
