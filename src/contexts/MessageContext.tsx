'use client'

// Imports
import { createContext, Dispatch, SetStateAction, useState } from "react"

interface MessageContextProps {
    messageBackend: string | Error,
    setMessageBackend: Dispatch<SetStateAction<string | Error>>
}

const defaultMessageContextValue: MessageContextProps = {
    messageBackend: '',
    setMessageBackend: () => { }
}

export const messageContext = createContext<MessageContextProps>(defaultMessageContextValue)

export const MessageContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [messageBackend, setMessageBackend] = useState<string | Error>('')

    return (
        <messageContext.Provider value={{ messageBackend, setMessageBackend }}>
            {children}
        </messageContext.Provider>
    )
}

