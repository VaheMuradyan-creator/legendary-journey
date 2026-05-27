"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function StudioLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setError(data.error ?? "Login failed");
      return;
    }

    router.push("/studio");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#07060d] px-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-[#12101c] p-8"
      >
        <h1 className="font-display text-2xl font-bold">Portfolio Studio</h1>
        <p className="mt-2 text-sm text-[#a39bb8]">
          Private editor — bookmark this page. Not linked on the public site.
        </p>
        <label className="mt-6 block text-sm font-medium">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-lg border border-white/15 bg-black/40 px-4 py-3 text-foreground outline-none focus:border-[#ff6b4a]"
            autoComplete="current-password"
            required
          />
        </label>
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-[#ff6b4a] py-3 font-semibold text-black transition hover:brightness-110 disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Enter studio"}
        </button>
      </form>
    </div>
  );
}
