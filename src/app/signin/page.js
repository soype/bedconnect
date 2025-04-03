"use client";
import styles from "./Signin.module.scss";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    const session = document.cookie
      .split(";")
      .map((cookie) => cookie.trim()) 
      .find((cookie) => cookie.startsWith("sessionToken="));
    if (session) {
      auth.setIsLogged(true);
      router.push("/dashboard");
    }
  });

  const handleSignIn = (e) => {
    e.preventDefault();
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then(async (response) => {
      if (response.ok) {
        const { token } = await response.json();
        if (process.env.NODE_ENV === "production") {
          document.cookie = `sessionToken=${token}; secure: true; httpOnly: true; sameSite: lax; path=/;`;
        } else {
          document.cookie = `sessionToken=${token}; path=/;`;
        }
        auth.setIsLogged(true);
        router.push("/");
      } else {
        alert("Login failed");
      }
    });
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const registerHandler = (e) => {
    e.preventDefault();
    fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    }).then(async (response) => {
      if (response.ok) {
        const { session } = await response.json();
        if (process.env.NODE_ENV === "production") {
          document.cookie = `sessionToken=${session}; secure: true; httpOnly: true; sameSite: lax; path=/;`;
        } else {
          document.cookie = `sessionToken=${session}; path=/;`;
        }
        router.push("/");
      } else {
        alert("Login failed");
      }
    });
  };

  return (
    <div className={`${styles.signin} w-std clear-nav`}>
      <h1>Sign in</h1>
      <form className={styles.signin__form} onSubmit={handleSignIn}>
        <input type="email" placeholder="Email" value={email} onChange={emailHandler} required />
        {loading && <span>Loader</span>}
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <div className={styles.signin__buttons}>
          <button>Sign In</button>
          <button onClick={registerHandler}>Register Now</button>
        </div>
      </form>
    </div>
  );
}
