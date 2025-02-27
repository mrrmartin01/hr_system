"use client";
import React, { useState, useCallback } from "react";
import { signIn } from "next-auth/react";
import { Label } from "@/components/ui/formUI/label";
import { Input } from "@/components/ui/formUI/input";
import { LabelInputContainer } from "@/components/ui/formUI/LabelInputContainer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AuthForm({ isSignup }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { firstName, lastName, email, password, confirmPassword } = formData;

    // Basic validation
    if (!email || !password || (isSignup && (!firstName || !lastName))) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    if (isSignup && password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      if (isSignup) {
        // Check if user exists
        const resUserExists = await fetch("/api/userExists", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const { user } = await resUserExists.json();
        if (user) {
          setError("User already exists.");
          setLoading(false);
          return;
        }

        // Register user
        const resSignup = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ firstName, lastName, email, password }),
        });

        if (!resSignup.ok) {
          const errorData = await resSignup.json();
          throw new Error(errorData.message || "Registration failed.");
        }

        // Auto-signin after signup
        const signInResult = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (signInResult?.error) {
          throw new Error(signInResult.error);
        }

        router.push("/dashboard");
      } else {
        // Login flow
        const resLogin = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (resLogin?.error) {
          setError("Invalid credentials.");
          setLoading(false);
          return;
        }

        router.replace("/dashboard");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
      setLoading(false);
    }
  };

  const renderInput = useCallback(
    (id, type, label, placeholder, value, showToggle, setShowToggle) => (
      <LabelInputContainer className="mb-4">
        <Label htmlFor={id}>{label}</Label>
        <div className="relative">
          <Input
            id={id}
            type={type === "password" && showToggle ? "text" : type}
            name={id}
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
            required
            className="pr-10"
          />
          {type === "password" && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowToggle((prev) => !prev)}
            >
              {showToggle ? (
                <Eye className="h-5 w-5 text-gray-400" />
              ) : (
                <EyeOff className="h-5 w-5 text-gray-400" />
              )}
            </button>
          )}
        </div>
      </LabelInputContainer>
    ),
    [handleChange]
  );

  return (
    <form onSubmit={handleSubmit} className="my-2">
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      {isSignup && (
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
          {renderInput(
            "firstName",
            "text",
            "First Name",
            "Peter",
            formData.firstName
          )}
          {renderInput(
            "lastName",
            "text",
            "Last Name",
            "Parker",
            formData.lastName
          )}
        </div>
      )}
      {renderInput(
        "email",
        "email",
        "Email",
        "peterparker@marvel.com",
        formData.email
      )}
      {renderInput(
        "password",
        "password",
        "Password",
        "***********",
        formData.password,
        showPassword,
        setShowPassword
      )}
      {isSignup &&
        renderInput(
          "confirmPassword",
          "password",
          "Confirm Password",
          "***********",
          formData.confirmPassword,
          showConfirmPassword,
          setShowConfirmPassword
        )}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Processing..." : isSignup ? "Sign Up" : "Log In"}
      </Button>
      <div className="text-sm text-center text-gray-800 dark:text-gray-400 mt-4 font-sans">
        {isSignup ? (
          <span>
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-blue-500 font-mono">
              Sign in
            </Link>
          </span>
        ) : (
          <span>
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-blue-500 font-mono">
              Sign up
            </Link>
          </span>
        )}
      </div>
    </form>
  );
}