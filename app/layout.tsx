import './globals.css';

export const metadata = {
  title: 'App Pessoas',
  description: 'Aplicação Spring Boot + Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100 min-h-screen text-gray-800">
        {children}
      </body>
    </html>
  );
}