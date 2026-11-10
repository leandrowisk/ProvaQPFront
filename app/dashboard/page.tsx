'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const options = [
    {
      title: 'Cadastrar Pessoa',
      description: 'Cadastrar uma nova pessoa',
      route: '/cadastrar-pessoa'
    },
    {
      title: 'Pessoas Cadastradas',
      description: 'Visualizar pessoas cadastradas',
      route: '/listar-pessoa'
    },
    {
      title: 'Pesquisar Nacionalidade',
      description: 'Consultar nacionalidade por nome',
      route: '/consultar-nacionalidade'
    },
  ];

  const router = useRouter();
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      router.replace("/login");
    }
  }, [router]);
  

  useEffect(() => {
    const msg = sessionStorage.getItem('mensagemSucesso');
    if (msg) {
      setMensagem(msg);
      sessionStorage.removeItem('mensagemSucesso');
      setTimeout(() => {
        setMensagem(null);
      }, 3000)
    }
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-blue-100 px-6">
      <div className="w-full max-w-5xl">
          <div className="mensagem-sucesso mt-4 mb-4"> 
            {mensagem && (
              <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6 text-center">
                {mensagem}
              </div>
            )}
          </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      
          {options.map((option) => (
            <div
              key={option.title}
              onClick={() => router.push(option.route)}
              className="h-52 bg-white rounded-xl shadow-md
                flex flex-col items-center justify-center
                text-center p-6 cursor-pointer
                hover:shadow-xl hover:-translate-y-1
                transition-all"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                {option.title}
              </h2>

              <p className="text-gray-500 text-sm">
                {option.description}
              </p>
            </div>
          ))}

        </div>
      </div>

    </main>
  );
}