"use client";
import { Button } from "@/components/ui/button";
import { KeyRound } from "lucide-react";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useSearchParams, useRouter } from "next/navigation";

export default function AuthComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const params = useSearchParams();
  const next = params.get("next") || "";
  const router = useRouter(); // Initialiser useRouter

  const handleLoginWithOAuth = (provider: "github" | "google") => {
    const supabase = supabaseBrowser();
    supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: location.origin + "/auth/callback?next=" + next,
      },
    });
  };

  const handleSignInWithPassword = async () => {
    const supabase = supabaseBrowser();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error signing in:", error);
    } else {
      console.log("Signed in successfully:", data);
      // Redirection vers une nouvelle page ou page d'accueil après connexion réussie
      window.location.href = "/"; // Remplacez '/dashboard' par l'URL de la page vers laquelle vous souhaitez rediriger
    }
  };

  const handleSignUp = async () => {
    const supabase = supabaseBrowser();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: location.origin + "/auth/callback?next=" + next,
      },
    });
    if (error) {
      console.error("Error signing up:", error);
    } else {
      console.log("Signed up successfully:", data);
      // Automatically sign in after successful sign up
      await handleSignInWithPassword();
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-[70vh]">
      <div className="w-96 rounded-md border p-5 space-y-5 relative bg-slate-900">
        <div className="flex items-center gap-2">
          <KeyRound />
          <h1 className="text-2xl font-bold">Next + Supabase</h1>
        </div>

        <p className="text-sm text-gray-300">Register/SignIn Today 👇</p>
        <div className="flex flex-col gap-5">
          {isLogin ? (
            <>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded border"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded border"
              />
              <Button
                className="w-full flex items-center gap-2"
                variant="outline"
                onClick={handleSignInWithPassword}
              >
                Sign In
              </Button>
              <p className="text-sm text-gray-300 text-center">
                Don't have an account?{" "}
                <span
                  onClick={() => setIsLogin(false)}
                  className="underline cursor-pointer"
                >
                  Sign Up
                </span>
              </p>
            </>
          ) : (
            <>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded border"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded border"
              />
              <Button
                className="w-full flex items-center gap-2"
                variant="outline"
                onClick={handleSignUp}
              >
                Sign Up
              </Button>
              <p className="text-sm text-gray-300 text-center">
                Already have an account?{" "}
                <span
                  onClick={() => setIsLogin(true)}
                  className="underline cursor-pointer"
                >
                  Sign In
                </span>
              </p>
            </>
          )}
          <Button
            className="w-full flex items-center gap-2"
            variant="outline"
            onClick={() => handleLoginWithOAuth("github")}
          >
            <FaGithub /> Github
          </Button>
          <Button
            className="w-full flex items-center gap-2"
            variant="outline"
            onClick={() => handleLoginWithOAuth("google")}
          >
            <FcGoogle /> Google
          </Button>
        </div>
        <div className="glowBox -z-10"></div>
      </div>
    </div>
  );
}
