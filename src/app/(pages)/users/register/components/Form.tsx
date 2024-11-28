'use client';

//Imports
import React from 'react'
import { FormPropsType } from '../lib/zod/zod';
import { hookForm } from '../lib/react-hook-form/hook-form';
import { useDataUser } from '../lib/react-query/useMutation';//Importa os resultados da função mutate do react query
import StatesAndFunctionsForm from '../utils/states-form-and-functions'; // Importa estatos em geral
import { useEffect } from 'react'; //Hooks do react


//Components
import DivLabelAndInput from '../../../../../components/Divs/DivLabelAndInput';
import ErrorMessage from '../../../../../components/Messages/FormErrorMessage';
import NeuButton from '@/components/ui/NeuButton';
import Success from '@/components/Messages/Success';
import Erro from '@/components/Messages/Error';
import { BsTrash } from 'react-icons/bs';

export default function Form() {
  const {
    register,
    handleSubmit,
    errors,
    fields,
    addUnity,
    removeUnity,
    selectImage,
    setSelectImage,
    getFilename,
    reset
  } = hookForm(); //Importando os estados e funções do arquivo useZod

  const {
    successForm,
    setSuccessForm,
    resetForm,
    errorBackend,
    setErrorBackend
  } = StatesAndFunctionsForm() // Importando os estados e funçoes do arquivo StatesAndFunctionsForm

  const {
    mutate,
    isLoading,
    isError
  } = useDataUser() // Importando os resultados da função mutate do react query

  /* Função para criar usuário. Tentei criar em arquivo separado, porém, dava erros ou não chegava no resultado */
  const createUser = (data: FormPropsType) => {

    // Checa se o usuário selecionou uma imagem
    if (!(selectImage instanceof File)) {
      setErrorBackend('A imagem é obrigatória')
      return
    }

    //Função mutate passando como parametro o data do createUser, e o valor contido dentro do selectImage
    mutate({
      formData: data,
      selectImage
    }, {
      // Em caso de sucesso no mutate, irá realizar as funções abaixo
      onSuccess: () => {
        setErrorBackend('') // Irá zerar os erros que estão na tela, caso tenha
        setSelectImage('') // Fará com que o erro que fica embaixo do botao de selecionar arquivo apareça
        setSuccessForm(true) // Muda o estado para verdadeiro, para aparecer a mensagem de sucesso na tela
        reset() // Função do mutate que reseta todos os estados
      },
      // Em caso de erro no mutate, irá gerar o erro abaixo
      onError: (error) => {
        // É necessario checar se o error parametro é da mesma instancia de Error, se não, gera erro
        if (error instanceof Error) {
          setErrorBackend(error.message)
        }
      }
    })
  };

  // Estado para toda vez que tiver um sucesso na criação de usuário, resetar após 10 segundos o sucesso na tela
  useEffect(resetForm, [successForm])

  if (isError) {
    return <Erro>Erro ao tentar cadastrar usuário. Por favor, tente novamente mais tarde!</Erro>
  }

  return (
    <>

      {successForm && (
        <Success>
          Usuário cadastrado com sucesso!
        </Success>
      )}

      {errorBackend && (
        <Erro>
          {errorBackend.toString()}
        </Erro>
      )}


      <form
        onSubmit={handleSubmit(createUser)}
        className="w-full my-10 flex flex-col gap-6"
      >

        <DivLabelAndInput>
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            {...register('name')}
            placeholder="Digite seu nome..."
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </DivLabelAndInput>

        <div className="flex justify-between items-center gap-4 md:justify-start md:gap-20">

          <div className="flex gap-2">
            Propietário?
            <input type="checkbox" {...register('owner')} />
          </div>

          <div className='flex flex-col justify-center items-center'>
            <label htmlFor="image">Selecione sua imagem</label>
            <input type="file"
              accept='.jpg,.png'
              className='text-sm text-violet-500 md:text-base'
              {...register('image', { onChange: getFilename })}
            />
            {/* Abaixo ele verifica se o usuário colocou alguma imagem, caso não, o erro irá ser true */}
            {!(selectImage instanceof File) && <ErrorMessage>Imagem é obrigatória</ErrorMessage>}

          </div>

        </div>

        <DivLabelAndInput>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            {...register('email')}
            placeholder="Digite seu e-mail..."
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </DivLabelAndInput>

        <div className="flex gap-4 sm:justify-between">

          <DivLabelAndInput>
            <label htmlFor="document">CPF</label>
            <input
              type="number"
              {...register('document')}
              placeholder="Digite seu cpf..."
            />
            {errors.document && (
              <ErrorMessage>{errors.document.message}</ErrorMessage>
            )}
          </DivLabelAndInput>

          <DivLabelAndInput>
            <label htmlFor="phone">Telefone</label>
            <input
              type="tel"
              {...register('tel')}
              placeholder="Digite seu telefone..."
            />
            {errors.tel && <ErrorMessage>{errors.tel.message}</ErrorMessage>}
          </DivLabelAndInput>

          <DivLabelAndInput>
            <label htmlFor="date">Nascimento</label>
            <input type="date"
              {...register('date',
                { /* { onChange: getDate } */ }
              )}
              placeholder='Exemplo 15/05/2022'
            //value={birthday}
            />
            {errors.date && (
              <ErrorMessage>{errors.date.message}</ErrorMessage>
            )}
          </DivLabelAndInput>

        </div>

        <div className="w-full flex flex-col gap-4">

          <label htmlFor="">
            Unidades
            <button
              onClick={addUnity}
              type="button"
              className="ml-10 text-sm text-violet-500"
            >
              Adicionar
            </button>
          </label>
          {errors.units && <ErrorMessage>{errors.units.message}</ErrorMessage>}

          {fields.map((field, index) => (

            <div key={field.id} className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <span>Unidade - {index + 1}</span>
                <input
                  type="text"
                  {...register(`units.${index}.unity`)}
                  className="w-20"
                />
                <button type="button" onClick={() => removeUnity(index)}>
                  <BsTrash color="red" size={24} />
                </button>
              </div>
              {errors.units?.[index]?.unity && (
                <ErrorMessage>{errors.units[index].unity.message}</ErrorMessage>
              )}
            </div>

          ))}
        </div>

        {isLoading && (
          <>
            <NeuButton disabled={true} type="submit">Cadastrando...</NeuButton>
          </>
        )}

        {!isLoading && (
          <>
            <NeuButton type="submit">Cadastrar</NeuButton>
          </>
        )}

      </form>
    </>
  );
}
