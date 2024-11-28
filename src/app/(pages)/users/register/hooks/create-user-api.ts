'use client'

//Imports
import { FormPropsType } from '../lib/zod/zod'
import { useZodData } from '../utils/states-of-useZod' // Precisa estar importado assim, para o selectImage que esta retornado por ele no useZodData arquivo, ficar direto dentro do parametro data da função createUser abaixo.

/* Função para criar o usuário */
export const createUser = async (data: {
    formData: FormPropsType;
    selectImage: File | string; // Importada diretamente pelo useZodData
}) => {

    const { formData, selectImage } = data; // Desestruturando de data

    const formDataObject = new FormData(); // Criando um objeto FormData

    formDataObject.append('name', formData.name);
    formDataObject.append('owner', formData.owner.toString()); // Em um formData, o boolean é obrigatório passarmos para uma string, se não, gera erro
    formDataObject.append('email', formData.email);
    formDataObject.append('document', formData.document.toString()); // Em um formData, o number é obrigatório passarmos para uma string, se não, gera erro
    formDataObject.append('tel', formData.tel.toString()); // Em um formData, o number é obrigatório passarmos para uma string, se não, gera erro
    formDataObject.append('date', formData.date);
    formDataObject.append('image', selectImage);// Não é dado do data do react-hook-form, pois é um input controlado, entao não é passado do que vem do data do react-hook-form

    // Adicionar units como JSON string
    // Forma certa
    formDataObject.append('units', JSON.stringify(formData.units));

    // Forma errada
    /*formData.units.forEach((unit, index) => {
        formDataObject.append(`units[${index}].unity`, unit.unity);
    });*/

    // Try catch para poder tratar o erro caso haja
    try {

        // Chamando a url da api e passando as configurações
        const response = await fetch('http://localhost:5000/users/register', {
            method: 'POST',
            body: formDataObject,
            headers: {} // Deve existir, porém, vazio
        });

        // Checa se ouve um erro na response acima
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message)
        }

        // Caso tudo certo, retornará a response
        return await response.json();

        // Tratar o erro 
    } catch (error) {
        throw error // Passar apenas dessa forma, deste jeito sem alteração
    }

};