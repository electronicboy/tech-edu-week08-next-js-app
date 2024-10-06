import {db} from "@/utils/db";
import MovieCard from "@/components/movies/MovieCard";

export default async function GenreViewPage({params}) {
    const {genreID} = params;

    const movies = (await db().query(/* language=PostgreSQL */ "SELECT * FROM moviereview_media_genre INNER JOIN moviereview_media media ON moviereview_media_genre.media = media.id WHERE moviereview_media_genre.genre = $1", [genreID])).rows


    return (
        <>
            <div className={"flex flex-wrap gap-5 m-6"}>
                {movies.map((row) => {
                    return <MovieCard key={row.id} {...row} />
                })}
            </div>
        </>
    )
}
