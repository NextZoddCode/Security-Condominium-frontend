'use client'

// Imports
import { ChangeEvent, useState } from "react";


export const StatesAndFunctions = () => {

    const [isHaveVehicle, setIsHaveVehicle] = useState<boolean>()

    function getVehicle(event: ChangeEvent<HTMLInputElement>) {
        setIsHaveVehicle(event.target.checked)
    }

    return {
        isHaveVehicle,
        getVehicle
    }

}