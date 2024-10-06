import {db} from "@/utils/db";
import {revalidatePath} from "next/cache";
import {NextRequest} from "next/server";
import {redirect} from "next/navigation";

/**
 *
 * @param request {NextRequest}
 * @returns {Promise<Response>}
 * @constructor
 */
export async function DELETE(request, {params}) {

    const mediaID = Number(params.mediaID);

    const client = await db().connect();

    try {
        await client.query("BEGIN TRANSACTION")
        await client.query("DELETE FROM moviereview_reviews WHERE movie = $1", [mediaID]);
        await client.query("DELETE FROM moviereview_media_genre WHERE media = $1", [mediaID]);

        const res = await client.query("DELETE FROM moviereview_media WHERE id = $1", [mediaID])

        await client.query("COMMIT TRANSACTION")

        revalidatePath(`/media/${mediaID}`);
        if (true || res.rowCount > 0) {
            return Response.json({success: true})
        } else {
            return Response.json({success: false})
        }


    } catch (e) {
        console.log(e)
        await client.query("ABORT TRANSACTION")
    } finally {
        console.log("a")
        client.release()
    }



}
