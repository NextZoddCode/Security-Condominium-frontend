// Imports
import { SearchPackageInfer } from "../lib/zod/zod-schema-search-package"
import { HookFormPackage } from "../lib/hook-form/hook-form-search-package"

// Components
import DivLabelAndInput from "@/components/Divs/DivLabelAndInput"
import NeuButton from "@/components/ui/NeuButton"
import { useState } from "react"

interface FormProps {
    setSearchPackagesData: (data: SearchPackageInfer) => void
}

export default function Form({ setSearchPackagesData }: FormProps) {

    const { handleSubmit, register } = HookFormPackage()

    const searchPackages = (data: SearchPackageInfer) => {
        setSearchPackagesData(data)
    }

    return (
        <form
            onSubmit={handleSubmit(searchPackages)}
            className="w-full my-10 flex flex-col gap-6 text-center"
        >
            <DivLabelAndInput>
                <label className="self-start" htmlFor="packageCode">Código:</label>
                <input
                    type="text"
                    placeholder="Digite o código..."
                    {...register('packageCode')}
                />
            </DivLabelAndInput>
            <DivLabelAndInput>
                <label className="self-start" htmlFor="recipient">Destinatário:</label>
                <input
                    type="text"
                    placeholder="Digite o nome do destinatário..."
                    {...register('recipient')}
                />
            </DivLabelAndInput>
            <div className="flex items-center justify-between sm:justify-start sm:gap-8">
                <DivLabelAndInput>
                    <label className="self-start" htmlFor="userUnity">Unidade:</label>
                    <input
                        type="text"
                        placeholder="Digite a unidade..."
                        {...register('userUnity')}
                    />
                </DivLabelAndInput>
                <DivLabelAndInput>
                    <label className="self-start" htmlFor="createdAt">Data cadastrada:</label>
                    <input
                        type="date"
                        placeholder="Digite a data que a encomenda foi cadastrada..."
                        {...register('createdAt')}
                    />
                </DivLabelAndInput>
            </div>
            <DivLabelAndInput>
                <label className="self-start" htmlFor="">Status:</label>
                <select
                    className="w-48"
                    defaultValue=""
                    {...register('status')}
                >
                    <option value="" disabled>Selecione o status</option>
                    <option value="Aguardando">Aguardando</option>
                    <option value="Entregue">Entregue</option>
                    <option value="Recusado">Recusado</option>
                </select>
            </DivLabelAndInput>
            <NeuButton type="submit">
                Buscar
            </NeuButton>
        </form>
    )
}