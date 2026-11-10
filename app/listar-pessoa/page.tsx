
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from "@/lib/api";

interface Pessoa {
  nome: string;
  sobrenome: string;
  email: string;
  documento: string;
}

export default function ListarPessoas() {
  const router = useRouter();

  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
      if (!token) {
        router.replace("/login");
      }
  }, [router]);

  useEffect(() => {
    buscarPessoas();
  }, []);

  const buscarPessoas = async () => {
    try {
      const response = await apiFetch('http://localhost:8090/v1/pessoa/list');

      if (!response.ok) {
         setErro('Erro ao buscar lista de pessoas cadastradas. Tente novamente.');
      }

      const data = await response.json();

      setPessoas(data);

    } catch (err) {
      setErro('Erro ao buscar lista de pessoas cadastradas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-gray-100 p-8">
    <div className="mx-auto max-w-6xl">

    <button
        onClick={() => router.push('/dashboard')}
        className="flex items-center gap-2 rounded-lg bg-gray-800 px-5 py-2.5
                    text-sm font-medium text-white shadow-md
                    transition hover:bg-gray-700 hover:shadow-lg"
    >
        Voltar
    </button>

      <div className="mb-8 mt-8 flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Pessoas cadastradas
        </h1>
      </div>

      {loading && (
        <p className="text-center text-gray-600">
          Carregando pessoas...
        </p>
      )}

      {!loading && erro && (
        <p className="text-center text-red-600">
          {erro}
        </p>
      )}

      {!loading && !erro && pessoas.length === 0 && (
        <div className="rounded-xl bg-white p-10 text-center shadow-sm">
          <p className="text-lg font-medium text-gray-600">
            Nenhuma pessoa cadastrada.
          </p>
        </div>
      )}

      {!loading && !erro && pessoas.length > 0 && (
        <div className="overflow-hidden rounded-xl bg-white shadow-md">
          <table className="w-full border-collapse">
            <thead className="bg-black/60">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                  Nome
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                  Sobrenome
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                  E-mail
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                  Documento
                </th>
              </tr>
            </thead>

            <tbody>
              {pessoas.map((pessoa, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 transition hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-sm text-black/60">
                    {pessoa.nome}
                  </td>
                  <td className="px-6 py-4 text-sm text-black/60">
                    {pessoa.sobrenome}
                  </td>
                  <td className="px-6 py-4 text-sm text-black/60">
                    {pessoa.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-black/60">
                    {pessoa.documento}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  </div>
);
}
