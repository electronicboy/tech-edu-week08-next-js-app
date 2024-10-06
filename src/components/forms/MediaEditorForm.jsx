"use client"

import {useEffect, useState} from "react";
import FormElement from "@/components/forms/makeup/FormElement";
import FormInput from "@/components/forms/makeup/FormInput";
import FormTextArea from "@/components/forms/makeup/FormTextArea";
import FormButton from "@/components/forms/makeup/FormButton";
import FormText from "@/components/forms/makeup/FormText";
import FormSelect from "@/components/forms/makeup/FormSelect";
import {getMediaTypes} from "@/utils/mediaUtil";
import GenreSelector from "@/components/forms/makeup/GenreSelector";
import {useRouter} from "next/navigation";

export default function MediaEditorForm({title, media, submit, genres}) {
    const [formData, setFormData] = useState({type: 0})
    const [error, setError] = useState()
    const router = useRouter();

    useEffect(() => {
        if (media) {
            setFormData(media)
        }
    }, [])

    console.log("formData", formData);

    function onChange(e) {
        let value;
        if (e.target.type === "checkbox") {
            value = e.target.checked;
        } else if (e.target.type === "select-multiple") {
            let selected = [];
            for (let i = 0; i < e.target.length; i++) {
                if (e.target[i].selected) {
                    //selected.push(tags[i].id)
                }
            }
            value = selected;
        } else {
            value = e.target.value;
        }

        setFormData(prev => ({...prev, [e.target.name]: value}));
    }

    function addGenre(genre) {
        setFormData(prev => {

            const newGenres = prev.genres ? [...prev.genres] : []
            newGenres.push(genre.id);


            return {...prev, genres: newGenres}
        });
    }

    function removeGenre(removal) {

        console.log("removal", removal)
        setFormData(prev => {

            const newGenres = [];
            (prev.genres || []).forEach(genre => {
                if (genre !== removal) {
                    newGenres.push(genre);
                }
            })

            return {...prev, genres: newGenres}
        });

    }


    async function handleSubmit(e) {
        e.preventDefault();
        if (!submit) {
            alert("Missing submit handler")
            return;
        }

        const response = await submit(formData);
        console.log("response", response);
        if (response) {
            if (response.error) {
                setError(response.error);
            } else if (response.media) {
                router.push(`/media/${response.media}`);
            }
        }

    }

    return (<>
        {title && <div className={"text-center text-white text-3xl pt-3"}>{title}</div>}
        <FormElement submitAction={handleSubmit}>
            <FormInput name="title" required={true} value={formData.title} onChange={onChange}/>
            <FormSelect name="type" value={formData.type} onChange={onChange}>
                {
                    getMediaTypes().map((type, index) => (
                        <option key={index} value={type.id}>{type.display}</option>
                    ))
                }
            </FormSelect>
            <FormInput name="released" type={"date"} value={formData.released} onChange={onChange}/>
            <FormInput name="finished" type={"date"} value={formData.finished} onChange={onChange}/>
            <FormTextArea name={"description"} value={formData.description} onChange={onChange} required={true}/>
            <GenreSelector name={"genres"} genres={genres} addGenres={addGenre} removeGenres={removeGenre}
                           value={formData.genres} onChange={onChange}/>
            <FormInput name={"img"} value={formData.img} onChange={onChange} required={true}/>
            {error && <FormText error={error}/>}
            <FormButton text={"Submit"}>Submit</FormButton>
        </FormElement>
    </>)


}
