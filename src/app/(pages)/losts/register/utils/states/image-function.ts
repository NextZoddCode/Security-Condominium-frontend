//Imports
import React from "react";
import { useState } from "react";

export const imageFunction = () => {

    const [selectedImage, setSelectedImage] = useState<File | string>()

    const imageOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const file = event.target.files ? event.target.files[0] : ''

        setSelectedImage(file)
    }

    return {
        selectedImage,
        setSelectedImage,
        imageOnchange
    }

}

