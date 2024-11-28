//Este arquivo serve para poder importar os states abaixo no useDataUser.tsx, pois,
//se importar diretamente esses states de useZod() direto no useDataUser.tsx, irá gerar um erro.
//Então, fazendo esta manobra criando um outro arquivo e importando aqui, irá funcionar.

import { useZod } from "../form/hooks/useZod";

export function useZodData() {
    const { selectImage, setSelectImage } = useZod();
    return { selectImage, setSelectImage };
}