// Imports
import { useState } from "react";


export default function StatesAndFunctionsForm() {

    // Estado para verificar se o formulário for um true ou false
    const [successForm, setSuccessForm] = useState<boolean>(false)

    // Estado para passar a mensagem de erro que vem direto do backend
    const [errorBackend, setErrorBackend] = useState<string | Error>('')

    // Função para remover o sucesso da tela
    function resetForm() {
        // Checa se teve o sucesso do form, 10 segundos depois ele tira a mensagem de sucesso da tela
        if (successForm) {
            setTimeout(() => {
                setSuccessForm(false)
            }, 10000)
        }
    }

    return {
        successForm,
        setSuccessForm,
        resetForm,
        errorBackend,
        setErrorBackend
    }

} 