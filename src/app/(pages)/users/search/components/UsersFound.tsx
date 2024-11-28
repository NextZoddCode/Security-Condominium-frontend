'use client'

// Imports
import { UserSchemaArray } from "../../features/utils/types/UserSchema"
import { frontendURL } from "../../features/utils/api-url/frontend-url"
import { uploadURL } from '../../features/utils/api-url/upload-url'
import { FunctionsAndStates } from "../utils/states/functions-and-states"

// Components
import Link from "next/link"
import DivFlexColumnCenter from "../../../../../components/Divs/DivFlexColumnCenter"
import UserImage from "@/components/Images/UserImage"
import { ChangeEvent } from "react"

export default function UsersFound({ usersData }: UserSchemaArray) {

    const { handleSelectChange, selectedUser } = FunctionsAndStates()

    function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
        handleSelectChange(event, usersData)
    }

    if (usersData && usersData.length === 0) {
        return (
            <p className="text-3xl font-bold">Nenhum usuário encontrado</p>
        )
    }

    return (
        <DivFlexColumnCenter>

            {usersData && (
                <select
                    onChange={onSelectChange}
                    className="text-center font-bold p-2"
                    defaultValue=""
                >
                    <option value="" disabled>
                        Selecione um usuário
                    </option>
                    {usersData && usersData.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
            )}

            {selectedUser && (
                <div className="flex flex-col gap-8 mb-10 mt-6">
                    <h3 className="text-center text-2xl font-bold shadow-xl">
                        {selectedUser.name}
                    </h3>
                    <UserImage
                        id="userImage"
                        src={`${uploadURL}/${selectedUser.image}`}
                        alt={`User ${selectedUser.name} image`}
                    />
                    <Link
                        href={`${frontendURL}/${selectedUser.id}`}
                        className="text-center text-xl text-violet-500 font-bold 
                                   lg:text-md hover:text-2xl transition-all duration-100"
                    >
                        Ver informações
                    </Link>
                </div>
            )}
        </DivFlexColumnCenter>
    );

}