import {db} from "@/utils/db";
import NotFound from "next/dist/client/components/not-found-error";
import React from "react";
import MediaEditorForm from "@/components/forms/MediaEditorForm";
import {revalidatePath} from "next/cache";



export default async function EditPage({params}) {
    const {mediaID} = params;

    try {
        const genres = (await db().query(/* language=PostgreSQL */ "SELECT id, name FROM moviereview_genres" )).rows
        const media = (await db().query("SELECT * FROM moviereview_media WHERE id = $1", [Number(mediaID)])).rows[0];
        console.log(media);

        async function handleSubmission(data) {
            "use server"
            const {title, type, img, description, genres} = data; // simple
            const released = data.released && new Date(data.released);
            const finished = data.released && new Date(data.finished);

            const client = await db().connect()
            try {
                await client.query(/* language=PostgreSQL */ "UPDATE moviereview_media SET title=$2, type=$3, released=$4, finished=$5, description=$6, img=$7 WHERE id = $1",
                    [mediaID, title, type, released, finished, description, img])

                await client.query("DELETE FROM moviereview_media_genre WHERE media = $1", [mediaID])

                for (const genreID of genres) {
                    await client.query(/* language=PostgreSQL */ "INSERT INTO moviereview_media_genre (media, genre) VALUES ($1, $2)", [mediaID, genreID])
                }

                await client.query("COMMIT TRANSACTION");

                revalidatePath(`/media/${mediaID}`)

                return {
                    success: true,
                    media: mediaID
                }

            } catch (e) {
                console.error(e);
                await client.query("ABORT TRANSACTION")

            } finally {
                client.release()
            }

        }

        return (
            <>
                <div className="bg-slate-600 w-full md:w-[700px] md:mx-auto md:rounded-2xl mt-20 font-ubuntu">
                    <MediaEditorForm title="Edit entry" media={media} genres={genres} submit={handleSubmission}/>
                </div>
            </>
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

