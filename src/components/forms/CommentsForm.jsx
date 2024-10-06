'use client'

import FormInput from "@/components/forms/makeup/FormInput";
import FormTextArea from "@/components/forms/makeup/FormTextArea";
import FormSelect from "@/components/forms/makeup/FormSelect";
import FormButton from "@/components/forms/makeup/FormButton";
import ClientFormElement from "@/components/forms/makeup/ClientFormElement";
import Comment from "@/components/Comment";

export default function CommentsForm({mediaID, submitAction}) {

    function submitComment(e) {
        const data = new FormData(e.target)
        submitAction(data)
        e.target.reset()
    }

    return (<>
        <ClientFormElement submitAction={submitComment}>
            <FormInput name={"name"} />
            <FormTextArea name={"comment"} />
            <FormSelect name={"rating"}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>4</option>
                <option value={4}>5</option>
                <option value={5}>6</option>
            </FormSelect>
            <FormButton text={"Add comment"}/>
        </ClientFormElement>
        </>)
}
