import {db} from "@/utils/db";
import Link from "next/link";

export default async function GenrePage({searchParams}) {

    let comparator = undefined;

    if (searchParams.sortBy === "total") {
        if (searchParams.order === "desc") {
            comparator = (a, b) => a.count - b.count;
        } else {
            comparator = (a, b) => b.count - a.count;
        }
    } else if (searchParams.sortBy === "name") {
        if (searchParams.order === "desc") {
            comparator = (a, b) => b.name.localeCompare(a.name, 'en');
        } else {
            comparator = (a, b) => a.name.localeCompare(b.name, 'en');
        }
    }



    /** @type {{id: number, name: string, count: string}[]}*/
    const genres = (await db().query(/* language=PostgreSQL */ "SELECT id, name, (SELECT count(*) FROM moviereview_media_genre WHERE genre = genres.id) FROM moviereview_genres AS genres")).rows

    const sorted = genres.toSorted(comparator)

    return (
        <>
            <div className={"flex flex-wrap gap-5 m-6"}>

                {sorted.map((genre) => (
                    <span key={genre.name} className={"rounded p-1 m-1 text-white" + " " + (genre.count === "0" ? "bg-red-800" : "bg-green-900")}>
                        <Link href={`/genres/${genre.id}`}>{genre.name}</Link>
                </span>
                ))}
            </div>
        </>
    )

}
