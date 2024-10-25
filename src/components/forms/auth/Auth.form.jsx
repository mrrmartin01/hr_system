"use client";
import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, signinUser, clearAuthError } from "@/store/authSlice";
import { Label } from "@/components/ui/formUI/label";
import { Input } from "@/components/ui/formUI/input";
import { LabelInputContainer } from "@/components/ui/formUI/LabelInputContainer";
import { Button } from "@/components/ui/buttom/button";
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
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearAuthError());
  }, [isSignup, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (isSignup) {
        if (formData.password !== formData.confirmPassword) {
          dispatch(clearAuthError());
          dispatch({ type: 'auth/setError', payload: 'Passwords do not match' });
          return;
        }
        dispatch(signupUser({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password
        }));
      } else {
        dispatch(
          signinUser({ email: formData.email, password: formData.password })
        );
      }
    },
    [dispatch, formData, isSignup]
  );

  const renderInput = useCallback(
    (id, type, name, placeholder, value, showPassword, setShowPassword) => (
      <LabelInputContainer className="mb-4">
        <Label htmlFor={id}>{name}</Label>
        <div className="relative">
          <Input
            id={id}
            type={type === 'password' ? (showPassword ? "text" : "password") : type}
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
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
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
      {error && <p className="text-red-500 mb-4">{error}</p>}
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
          <span className="">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-blue-500 font-mono">
              Sign in
            </Link>{" "}
          </span>
        ) : (
          <span className="">
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