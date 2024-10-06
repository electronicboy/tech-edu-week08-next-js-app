import {db} from "@/utils/db";
import NotFound from "next/dist/client/components/not-found-error";
import React from "react";
import Image from "next/image";
import {formatDate} from "@/utils/timeutils";
import {FaEdit} from "react-icons/fa";
import Link from "next/link";

export default async function MediaPage({params}) {
    const {mediaID} = params

    try {
        const media = (await db().query("SELECT * FROM moviereview_media WHERE id = $1", [Number(mediaID)])).rows[0];

        return (
            <div>
                <div className={"w-full text-center pt-4 pb-4"}>
                    <h2 className={"text-center text-4xl  inline"}>{media.title}</h2>
                    <Link href={`/media/${mediaID}/edit`}><FaEdit className={"inline"}/></Link>
                </div>
                <div>
                    <div>
                        <Image width={200} height={200} src={media ? media.img : ""} alt={media.title}/>
                    </div>
                    <div>
                        <div className={"whitespace-pre-wrap"}>
                        {media.description}
                        </div>
                        <div>
                            <span>{media.released ? formatDate(media.released) : "Not released"}</span>
                            <span>{media.finished && (" - " + formatDate(media.finished)) || (media.released ? "" : "")}</span>
                        </div>
                    </div>
                </div>
            </div>
        )

    } catch (e) {
        console.error(e);
    }

    return (
        <>
            <NotFound/>
        </>
    )
}
