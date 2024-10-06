import {useRef} from "react";
import {objectPropsAsString} from "@/utils/object";

/**
 *
 * @param name
 * @param {{name: string}[]} genres
 * @param addGenres
 * @param removeGenres
 * @param value
 * @returns {JSX.Element}
 * @constructor
 */
export default function GenreSelector({name, genres, addGenres, removeGenres, value}) {

    const selector = useRef()

    function handleAdd(e) {
        e.preventDefault()

        /** @type {HTMLSelectElement} */
        const selectorElement = selector.current
        const genrename = selectorElement.value

        let found = genres.find(genre => genre.name === genrename);
        if (found) {
            addGenres(found)
        }
    }
    return (
        <>
            <div className={"m-5"}>
                <div className={"text-2xl text-slate-200"}>
                    <label htmlFor={name}>{name}</label>
                </div>
                <div className={"flex flex-wrap"}>
                    {(value || []).map(value => {
                        const genre = genres.find(genre => genre.id === value)
                        if (!genre) return <></>
                        return <div className={"mx-2"} key={genre.id} onClick={() => {removeGenres(value)}}>{genre.name}</div>
                    })}
                </div>

                <div className={"flex gap-8"}>
                    <select id={name}
                            ref={selector}
                            className={"text-xl text-black p-1 pl-3 pr-3 w-full"}>
                        {genres.map(genre => {
                            if ((value || []).includes(genre.id)) {
                                return <></>
                            } else {
                                return <option key={genre.name} value={genre.name}>{genre.name}</option>
                            }

                        })}
                    </select>
                    <button className={"bg-green-700 font-bold rounded-xl px-3 py-1"} onClick={(e) => handleAdd(e)}>Add</button>
                </div>
            </div>
        </>
    )

}
