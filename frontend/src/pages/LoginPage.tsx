import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthDialog } from "@/components/AuthDialog";
import { useAuth } from "@/context/AuthContext";

const LoginPage = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const returnTo =
    (location.state as { from?: string } | null)?.from || "/";

  // if the dialog closes or user already signed in, send them elsewhere
  useEffect(() => {
    if (user) {
      navigate(returnTo, { replace: true });
      return;
    }

    if (!open) {
      navigate(returnTo, { replace: true });
    }
  }, [open, returnTo, user, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center overflow-y-auto bg-gray-100 px-4 py-8">
      {/* the dialog will close itself when the user signs in or cancels */}
      <AuthDialog open={open} onOpenChange={setOpen} />
    </div>
  );
};

export default LoginPage;
