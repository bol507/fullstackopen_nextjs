import { redirect } from "next/navigation";
import { getCurrentUser } from "../services/session";
import { generateToken, revokeToken } from "../actions/users";
import TokenManager from "./TokenManager";

export default async function MePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 font-sans text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-100">
      <div className="w-full max-w-2xl rounded-2xl border border-zinc-200/60 bg-white p-8 shadow-sm dark:border-zinc-800/60 dark:bg-zinc-900 sm:p-10">
        
        {/* Sección de Perfil */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 text-2xl font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              {user.name}
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              @{user.username}
            </p>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-zinc-200/60 pt-8 dark:border-zinc-800/60">
          
          {/* Título de la sección de Token */}
          <h2 className="mb-4 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            🔑 API Token
          </h2>
          
          <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
            Usa este token para autenticar solicitudes a la API. Manténlo en secreto.
          </p>

          {/* Componente de Gestión de Token */}
          <TokenManager 
            userId={user.id} 
            currentToken={user.token || null}
            generateTokenAction={generateToken}
            revokeTokenAction={revokeToken}
          />
        </div>
        
      </div>
    </div>
  );
}