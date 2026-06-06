import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthDialog } from "@/components/AuthDialog";
import { useAuth } from "@/context/AuthContext";

const LoginPage = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  // if the dialog closes or user already signed in, send them elsewhere
  useEffect(() => {
    if (!open || user) {
      navigate("/", { replace: true });
    }
  }, [open, user, navigate]);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      {/* the dialog will close itself when the user signs in or cancels */}
      <AuthDialog open={open} onOpenChange={setOpen} />
    </div>
  );
};

export default LoginPage;
