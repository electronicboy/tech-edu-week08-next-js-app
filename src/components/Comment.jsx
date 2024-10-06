'use client'
import {FaDeleteLeft} from "react-icons/fa6";

export default function Comment({id, name, comment, rating, deleteFunction}) {
    return (
        <div className="bg-slate-600 w-full md:w-[700px] md:mx-auto md:rounded-2xl mt-20 font-ubuntu pz-1 px-4">
            <div className="flex justify-between">
                <div>
                    <span>{name}</span>
                    <FaDeleteLeft className={"inline"} onClick={() => deleteFunction(id)}/>
                </div>

                <span>{rating}</span>
            </div>
            <div>
                {comment}
            </div>
        </div>
    )


}
