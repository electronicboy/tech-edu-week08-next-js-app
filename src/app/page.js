import {db} from "@/utils/db";
import MovieCard from "@/components/movies/MovieCard";
import ClientFormElement from "@/components/forms/makeup/ClientFormElement";
import Link from "next/link";

export default async function Home({params, searchParams}) {
    const queryRes = await db().query("SELECT id, title, type, img FROM moviereview_media");

    let comparator = undefined;
    const sortBy = searchParams.sortBy || ""
    const order = searchParams.order || ""

    if (sortBy === "release") {
        if (order === "desc") {
            comparator = (a, b) => ((a.released || 0)/1000) - ((b.released || 0)/1000)
        } else {
            comparator = (a, b) => ((b.released || 0)/1000) - ((a.released || 0)/1000)
        }
    } else if (sortBy === "name") {
        if (order === "desc") {
            comparator = (a, b) => b.title.localeCompare(a.title, 'en');
        } else {
            comparator = (a, b) => a.title.localeCompare(b.title, 'en');
        }
    }

    const media = queryRes.rows.toSorted(comparator);

    return (
        <>
            <div className={"flex justify-between"}>
                <div className={"ml-3 flex gap-3"}>
                    <span>Sort by:</span>
                    <Link href={`/?sortBy=name${order ? `&order=${order}` : ""}`}>name</Link>
                    <Link href={`/?sortBy=release${order ? `&order=${order}` : ""}`}>released</Link>
                </div>
                <div className={"ml-3 flex gap-3"}>
                    <span>order:</span>
                    <Link href={`/?${sortBy ? `sortBy=${sortBy}` : ""}&order=asc`}>asc</Link>
                    <Link href={`/?${sortBy ? `sortBy=${sortBy}` : ""}&order=desc`}>desc</Link>
                </div>

            </div>
            <div className={"flex flex-wrap gap-5 m-6"}>
                {media.map((row) => {
                    return <MovieCard key={row.id} {...row} />
                })}
            </div>
        </>
    )
        ;
}
