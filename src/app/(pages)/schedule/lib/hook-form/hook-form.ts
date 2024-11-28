// Imports
import { ScheduleSchema, ScheduleSchemaInfer } from "../zod/zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const ScheduleRegisterHookForm = () => {

    const { handleSubmit, register, formState: { errors }, getValues, reset } = useForm<ScheduleSchemaInfer>({
        resolver: zodResolver(ScheduleSchema)
    })

    return {
        handleSubmit,
        register,
        errors,
        getValues,
        reset
    }

};