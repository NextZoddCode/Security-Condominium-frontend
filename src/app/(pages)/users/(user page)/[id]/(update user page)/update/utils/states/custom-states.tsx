'use client'

// Imports
import { ChangeEvent, useRef, useState } from "react"

export const CustomStates = () => {

    // Ref para rastrear se as unidades foram adicionadas
    const unitsAddedRef = useRef(false);

    //Estado da imagem que o usuário escolhe
    const [previewImage, setPreviewImage] = useState<undefined | string>('')

    //Função para pegar o File selecionado
    function getFilename(event: ChangeEvent<HTMLInputElement>) {

        const file = event.target.files?.[0]

        if (file) {
            //Cria uma URL temporária para uma arquivo
            const objectImage = URL.createObjectURL(file)
            // Atualiza o estado com a URL da imagem
            setPreviewImage(objectImage)
        }
    }

    return {
        unitsAddedRef,
        previewImage,
        setPreviewImage,
        getFilename
    }
}