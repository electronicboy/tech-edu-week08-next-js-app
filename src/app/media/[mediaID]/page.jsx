import {db} from "@/utils/db";
import NotFound from "next/dist/client/components/not-found-error";
import React from "react";
import Image from "next/image";
import {formatDate} from "@/utils/timeutils";
import {FaEdit} from "react-icons/fa";
import Link from "next/link";
import Comments from "@/components/Comments";
import {revalidatePath} from "next/cache";
import {notFound, redirect} from "next/navigation";
import DeletePostButton from "@/components/DeletePostButton";
import {isNotFoundError} from "@/utils/object";

export default async function MediaPage({params}) {
    const {mediaID} = params

    /**
     *
     * @param data {FormData}
     * @returns {Promise<void>}
     */
    async function submitComment(data) {
        "use server"
        const {name, comment, rating} = Object.fromEntries(data)

        const parsedRating = Number(rating)

        try {
            await db().query("INSERT INTO moviereview_reviews (movie, name, comment, rating) VALUES ($1, $2, $3, $4)",
                [mediaID, name, comment, parsedRating])
        } catch (error) {
            console.error(error)
        }
        revalidatePath(`/media/${mediaID}`)
        redirect(`/media/${mediaID}`);
    }

    try {
        const media = (await db().query("SELECT * FROM moviereview_media WHERE id = $1", [Number(mediaID)])).rows[0];

        if (!media) {
            notFound()
        }
        return (
            <div>
                <div className={"w-full text-center pt-4 pb-4 flex justify-center"}>
                    <h2 className={"text-center text-4xl  inline"}>{media.title}</h2>
                    <div className={"inline"}>
                        <DeletePostButton mediaID={mediaID}/>
                        <Link href={`/media/${mediaID}/edit`}><FaEdit className={"inline"}/></Link>
                    </div>
                </div>
                <div className={"bg-gray-200 dark:bg-slate-700 p-2"}>
                    <div className={"flex flex-col md:flex-row"}>
                        <div className={"self-center"}>
                            <Image width={200} height={200} src={media ? media.img : ""} alt={media.title}/>
                        </div>
                        <div>
                            <div className={"whitespace-pre-wrap md:pl-2"}>
                                {media.description}
                            </div>
                        </div>
                    </div>
                    <div className={"text-gray-500 dark:text-gray-300"}>
                        <span>{media.released ? formatDate(media.released) : "Not released"}</span>
                        <span>{media.finished && (" - " + formatDate(media.finished)) || (media.released ? "" : "")}</span>
                    </div>

                </div>

                <Comments mediaID={mediaID} submitComment={submitComment}/>
            </div>
        )

    } catch (e) {
        if (isNotFoundError(e)) {
            throw e;
        }
        console.error(e);
    }

    return (
        <>
            <NotFound/>
        </>
    )
}

export async function generateMetadata({params}) {
    const {mediaID} = params
    const mediaFetch = (await db().query("SELECT * FROM moviereview_media WHERE id = $1", [Number(mediaID)])).rows[0];

    if (!mediaFetch) return {
        title: "Media not found"
    }

    return {
        title: mediaFetch.title,
        description: mediaFetch.description.slice(0, 100),
        openGraph: {
            title: mediaFetch.title,
            description: mediaFetch.description.slice(0, 100),
        }
    }
}
