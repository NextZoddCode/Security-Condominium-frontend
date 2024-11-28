// Imports
import { ChangeEvent, useState } from "react";
import { UserSchemaArray, UserSchema } from "../../../features/utils/types/UserSchema";

export function FunctionsAndStates() {

    const [selectedUser, setSelectedUser] = useState<UserSchema | null>(null);

    const handleSelectChange = (
        event: ChangeEvent<HTMLSelectElement>,
        usersData: UserSchemaArray['usersData']
    ) => {

        const userId = event.target.value;
        const user = usersData.find((user) => user.id === userId);
        setSelectedUser(user || null);

    };

    return {
        selectedUser,
        setSelectedUser,
        handleSelectChange
    }

}