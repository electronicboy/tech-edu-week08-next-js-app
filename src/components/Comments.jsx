import CommentsForm from "@/components/forms/CommentsForm";
import {db} from "@/utils/db";
import Comment from "@/components/Comment";
import {revalidatePath} from "next/cache";

export default async function Comments({mediaID, submitComment}) {
    const comments = (await db().query("SELECT id, name, comment, rating FROM moviereview_reviews WHERE movie = $1", [mediaID])).rows;

    async function deleteComment(id) {
        "use server"
        console.log(id)

        await db().query("DELETE FROM moviereview_reviews WHERE id = $1", [id]);
        revalidatePath(`/media/${mediaID}`)


    }

    return (
        <>
            <div className="bg-slate-600 w-full md:w-[700px] md:mx-auto md:rounded-2xl mt-20 font-ubuntu">
                <CommentsForm comments={comments} mediaID={mediaID} submitAction={submitComment}/>
            </div>
            <div>
                {comments && comments.map(comment => (
                    <Comment key={comment.id} {...comment} deleteFunction={deleteComment}/>
                ))}
            </div>
        </>
    )
}
