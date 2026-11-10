
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokenMessage, setTokenMensagem] = useState('');
  const router = useRouter();

  const isFormValid =
    email.trim().length > 0 &&
    password.trim().length > 0;
  
  useEffect(() => {
    const tokenExpiration = sessionStorage.getItem("tokenExpirado");
    if (tokenExpiration) {
      setTokenMensagem(tokenExpiration);
      sessionStorage.removeItem("tokenExpirado");
      setTimeout(() => {
        setTokenMensagem(null);
      }, 4000)
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8090/v1/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        setError("Email ou senha inválidos");
        setTimeout(() => {
          setError(null)
        }, 3000)
        return;
      }

      const data = await response.json();

      localStorage.setItem("token", data.token);

      router.replace("/dashboard");

    } catch {
      setError("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-blue-100 px-4">

     
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <div className="mt-8">
          {tokenMessage && (
            <p className="text-red-500 text-sm text-center mt-2">
              {tokenMessage}
            </p>
          )}
        </div>
      
        <h1 className="text-2xl font-bold text-center mb-2 text-black/60">
          Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-5">

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2 text-black/60">
              E-mail *
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-black/60"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-black/60">
              Senha *
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-black/60"
              required
            />
          </div>


       {error && (
        <p className="text-red-500 text-sm mt-4">
          E-mail ou senha incorretos. Tente novamente.
        </p>
      )}
          

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-3 rounded-lg font-semibold text-white transition
              ${
                isFormValid
                  ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
          >
            Entrar
          </button>

        </form>
      </div>
    </main>
  );
}
