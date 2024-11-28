// Import
import { SearchScheduleProps, SearchScheduleInfer } from "../zod/zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const SearchScheduleHookForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<SearchScheduleInfer>({
        resolver: zodResolver(SearchScheduleProps)
    })

    return {
        register,
        handleSubmit,
        errors
    }

}