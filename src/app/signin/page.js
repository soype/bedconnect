"use client";
import styles from "./Signin.module.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const auth = useAuth();

  const handleSignIn = (e) => {
    e.preventDefault();
    auth.setIsLogged(true);
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
        const { session } = await response.json();
        document.cookie = `sessionToken=${session}; path=/;`;
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

  return (
    <div className={`${styles.signin} w-std clear-nav`}>
      <h1>Sign in</h1>
      <form className={styles.signin__form} onSubmit={handleSignIn}>
        <input type="email" placeholder="Email" value={email} onChange={emailHandler} required />
        {loading && <span>Loader</span>}
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button>Sign In</button>
      </form>
    </div>
  );
}
