//Imports
import type { Metadata } from 'next';
import './globals.css';

//Components
import Header from '@/components/Header/Header';
import Container from '@/components/Container/Container';
import Aside from '@/components/Aside/Aside';
import Main from '@/components/Main/Main';
import QueryClientProviderComponent from '@/components/QueryClientProvider/QueryClientProviderComponent';

// Contexts
import { MessageContextProvider } from '@/contexts/MessageContext';

export const metadata: Metadata = {
  title: 'Security Condominium',
  description: 'Your condominium safe',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Container>
          <Aside />
          <QueryClientProviderComponent>
            <Main>
              <MessageContextProvider>
                {children}
              </MessageContextProvider>
            </Main>
          </QueryClientProviderComponent>
        </Container>
      </body>
    </html>
  );
}
