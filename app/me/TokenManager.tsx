"use client";

import { useState, useTransition } from "react";
import { useNotification } from "../components/NotificationContext";

interface TokenManagerProps {
  userId: number;
  currentToken: string | null;
  generateTokenAction: () => Promise<{ token: string }>;
  revokeTokenAction: () => Promise<void>;
}

export default function TokenManager({
  userId,
  currentToken,
  generateTokenAction,
  revokeTokenAction,
}: TokenManagerProps) {
  const { showNotification } = useNotification();
  const [token, setToken] = useState<string | null>(currentToken);
  const [isPending, startTransition] = useTransition();

  const handleGenerateToken = () => {
    startTransition(async () => {
      try {
        const result = await generateTokenAction();
        setToken(result.token);
        showNotification(" Token generated successfully", "success");
      } catch (error) {
        showNotification(" Error generating token", "error");
      }
    });
  };

  const handleRevokeToken = () => {
    startTransition(async () => {
      try {
        await revokeTokenAction();
        setToken(null);
        showNotification(" Token revoked successfully", "success");
      } catch (error) {
        showNotification(" Error revoking token", "error");
      }
    });
  };

  const copyToClipboard = async () => {
    if (!token) return;
    try {
      await navigator.clipboard.writeText(token);
      showNotification(" Token copied to clipboard", "success");
    } catch (error) {
      showNotification(" Error copying token", "error");
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-200/60 bg-zinc-50/50 p-5 dark:border-zinc-800/60 dark:bg-zinc-800/30">
        <p className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          Token Status:
        </p>
        {token ? (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <code className="flex-1 break-all rounded-lg border border-zinc-200 bg-white px-3 py-2.5 font-mono text-xs text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
              {token}
            </code>
            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className="whitespace-nowrap rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                📋 Copy
              </button>
              <button
                onClick={handleRevokeToken}
                disabled={isPending}
                className="whitespace-nowrap rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-900 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
              >
                {isPending ? "Revoking..." : "🗑️ Revoke"}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm italic text-zinc-500 dark:text-zinc-400">
            No token has been generated yet.
          </p>
        )}
      </div>

      
      {!token && (
        <button
          onClick={handleGenerateToken}
          disabled={isPending}
          className="rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          {isPending ? "Generating..." : "🔑 Generate Token"}
        </button>
      )}

      {/* Información de uso */}
      <div className="rounded-lg border border-zinc-200/60 bg-zinc-50/30 p-4 dark:border-zinc-800/60 dark:bg-zinc-800/20">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          💡 Use this token to authenticate yourself in API requests.
        </p>
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
          Ejemplo:{" "}
          <code className="rounded border border-zinc-200 bg-white px-2 py-0.5 font-mono text-[11px] text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            Authorization: Bearer &lt;token&gt;
          </code>
        </p>
      </div>
    </div>
  );
}