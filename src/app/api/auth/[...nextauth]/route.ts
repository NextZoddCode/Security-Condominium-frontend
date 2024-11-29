import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth from "next-auth"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Insira o username..." },
                password: { label: "Password", type: "password", placeholder: 'Insira a senha...' }
            },
            async authorize(credentials, req) {
                if (!credentials) {
                    return null
                }

                if (
                    credentials.username === 'admin' &&
                    credentials.password === 'admin123'
                ) {
                    return {
                        id: '1',
                        user: 'admin'
                    }
                }

                return null
            }
        })
    ],

    callbacks: {
        async redirect({ url, baseUrl }) {
            // Se a URL de destino for igual ao baseUrl (por exemplo, login direto),
            // redirecionar para a página principal ou a página desejada
            if (url === baseUrl) {
                return baseUrl + '/users/search';  // Aqui redirecionamos 
            }

            // Se a URL for uma página protegida, redirecionamos para ela
            if (url === `${baseUrl}/users/search`) {
                return `${baseUrl}/users/search`;  // Redireciona de volta para o dashboard
            }

            // Caso contrário, apenas retorne a URL original que o NextAuth tentou redirecionar
            return url;
        }
    }

})

export { handler as GET, handler as POST }