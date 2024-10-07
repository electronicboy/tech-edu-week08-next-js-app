import MediaEditorForm from "@/components/forms/MediaEditorForm";
import {db} from "@/utils/db";
import {revalidatePath} from "next/cache";
import sanitizeHtml from 'sanitize-html';


export default async function CreatePage() {
    const genres = (await db().query(/* language=PostgreSQL */ "SELECT id, name FROM moviereview_genres" )).rows

/// {
//   title: 'dwadwad',
//   description: 'dwadwadwad',
//   img: 'dwadwada',
//   released: '1111-11-11',
//   finished: '1111-11-11'
// }

    async function handleSubmission(data) {
        "use server"
        let {title, type, img, description, genres} = data; // simple
        const released = data.released && new Date(data.released);
        const finished = data.released && new Date(data.finished);
        title = sanitizeHtml(title, {allowedAttributes: false, allowedTags: false});
        description = sanitizeHtml(description, {allowedAttributes: false, allowedTags: false});

        if (!img.startsWith("https")) {
            return {
                error: "Image url is invalid (must be https)"
            }
        }

        const client = await db().connect();
        try {

            await client.query("BEGIN TRANSACTION");

            const query = await client.query(/* language=PostgreSQL */ "INSERT INTO moviereview_media (title, type, released, finished, description, img) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
                [title, type, released, finished, description, img])
            const id = query.rows[0].id;

            if (genres !== undefined) {
                for (const genreID of genres) {
                    await client.query(/* language=PostgreSQL */ "INSERT INTO moviereview_media_genre (media, genre) VALUES ($1, $2)", [id, genreID])
                }
            }

            await client.query("COMMIT TRANSACTION");

            revalidatePath("/")

            return {
                success: true,
                media: id
            }

        }catch (e){
            console.error(e);
            await client.query("ABORT TRANSACTION")
        } finally {
            client.release();
        }

        console.log(title, img, description, released, finished);

        console.log(data);

    }

    return (
        <>
            <div className="bg-slate-600 w-full md:w-[700px] md:mx-auto md:rounded-2xl mt-20 font-ubuntu">
                <MediaEditorForm title="Create entry" genres={genres} submit={handleSubmission}/>
            </div>
        </>
    )
}
