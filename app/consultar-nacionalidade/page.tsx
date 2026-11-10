
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';

export default function PesquisarNacionalidade() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [resultado, setResultado] = useState<string | null>(null);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem("token");
    
      if (!token) {
        router.replace("/login");
      }
  }, [router]);
  useEffect(() => {
    setNome("");
    setErro(null);
    setLoading(null);
    setResultado(null)
  }, []);

  const pesquisar = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!nome.trim()) return;

    setLoading(true);
    setErro('');
    setResultado(null);

    try {
      const response = await apiFetch(
        `http://localhost:8090/v1/pessoa/findNacionalityByPerson/${encodeURIComponent(nome.trim())}`,
        {
          method: 'GET',
        }
      );

      if (!response.ok) {
        setErro('Erro ao consultar nacionalidade. Tente novamente.');
      }

      const data = await response.text();

      try {
        const json = JSON.parse(data);
        setResultado(JSON.stringify(json, null, 2));
      } catch {
        setResultado(data);
      }

    } catch (error) {
      setErro('Erro ao consultar nacionalidade. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-3xl">

      <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2 rounded-lg bg-gray-800 px-5 py-2.5
                       text-sm font-medium text-white shadow-md transition
                       hover:bg-gray-700 hover:shadow-lg"
          >
            Voltar
          </button>
       
        <div className="mb-8 mt-8 flex items-center justify-center">
          <h1 className="text-2xl font-bold text-gray-800 text-black text-center">
            Pesquisar Nacionalidade
          </h1>
        </div>
        <div className="rounded-xl bg-white p-8 shadow-md">

          <form onSubmit={pesquisar}>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Nome da pessoa
            </label>

            <div className="flex gap-3">
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite o nome"
                className="flex-1 rounded-lg border border-gray-300 px-4 py-3
                           text-gray-800 outline-none transition
                           focus:border-gray-600 focus:ring-2 focus:ring-gray-200"
                required
              />

              <button
                type="submit"
                disabled={loading || !nome.trim()}
                className="rounded-lg bg-gray-800 px-6 py-3 font-medium text-white
                           transition hover:bg-gray-700
                           disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'Pesquisando...' : 'Pesquisar'}
              </button>
            </div>
          </form>

          {erro && (
            <p className="mt-6 text-sm text-red-600">
              {erro}
            </p>
          )}

          {resultado !== null && (
            <div className="mt-8 rounded-lg bg-gray-100 p-5">
              <h2 className="mb-3 text-lg text-gray-800">
                 {resultado}
              </h2>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
