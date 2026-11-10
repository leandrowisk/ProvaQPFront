
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';

export default function CadastrarPessoa() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [documento, setDocumento] = useState('');

  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const isFormValid =
    nome.trim().length > 0 &&
    sobrenome.trim().length > 0 && 
    email.trim().length > 0 && 
    documento.trim().length > 0

  const limparFormulario = () => {
    setNome("");
    setSobrenome("");
    setEmail("");
    setDocumento("");
    setErro("");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    
      if (!token) {
        router.replace("/login");
      }
  }, [router]);

  useEffect(() => {
    limparFormulario();
    }, []);
    useEffect(() => {
        setTimeout(() => {
            setErro(null);
        }, 7000);
    }, [erro]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);
    setLoading(true);

    try {
      const response = await apiFetch(
        'http://localhost:8090/v1/pessoa/registrarName',
        {
          method: 'POST',
          body: JSON.stringify({
            nome,
            sobrenome,
            email,
            documento,
          }),
        }
      );

      if (!response.ok) {
        setErro('Não foi possível realizar o cadastro. Verifique os dados e tente novamente');
      } else {
        sessionStorage.setItem(
            'mensagemSucesso',
            'Pessoa cadastrada com sucesso!'
        );
        router.push('/dashboard');
        setNome("");
        setSobrenome("");
        setEmail("");
        setDocumento("");
      }
    } catch (error) {
      setErro('Não foi possível realizar o cadastro. Tente novamente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">

      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg">

        <h1 className="text-2xl font-bold text-center mb-2 text-black/60">
          Cadastrar Pessoa
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-medium mb-2 text-black/60">
              Nome *
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-black/60"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-black/60">
              Sobrenome *
            </label>
            <input
              type="text"
              value={sobrenome}
              onChange={(e) => setSobrenome(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-black/60"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-black/60">
              E-mail *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-black/60"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-black/60">
              Documento *
            </label>
            <input
              type="text"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-black/60"
            />
          </div>

          {erro && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">
              {erro}
            </div>
          )}

          <button
            type="submit"
            disabled={!isFormValid || loading}
            className={`w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition
            ${
                isFormValid
                    ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}>
          
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>

          <button
            type="button"
            onClick={() => router.push('/dashboard')}
            className="w-full text-gray-600 hover:text-gray-900 py-2"
          >
            Voltar
          </button>

        </form>
      </div>
    </main>
  );
}