"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, signinUser } from "@/store/authSlice";
import { Label } from "@/components/ui/formUI/label";
import { Input } from "@/components/ui/formUI/input";
import { LabelInputContainer } from "@/components/ui/formUI/LabelInputContainer";
import { Button } from "@/components/ui/buttom/button";

const AuthForm = ({ isSignup }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signupUser(formData));
    } else {
      dispatch(signinUser({ email: formData.email, password: formData.password }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-8">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {isSignup && (
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First Name</Label>
            <Input
              id="firstname"
              type="text"
              name="firstname"
              placeholder="Peter"
              value={formData.firstname}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last Name</Label>
            <Input
              id="lastname"
              type="text"
              name="lastname"
              placeholder="Parker"
              value={formData.lastname}
              onChange={handleChange}
            />
          </LabelInputContainer>
        </div>
      )}
      <LabelInputContainer className="mb-4">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          placeholder="peterparker@marvel.com"
          onChange={handleChange}
        />
      </LabelInputContainer>
      <LabelInputContainer className="mb-4">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </LabelInputContainer>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Processing...' : (isSignup ? "Sign Up" : "Log In")}
      </Button>
    </form>
  );
};

export default AuthForm;