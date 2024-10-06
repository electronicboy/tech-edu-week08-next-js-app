import {db} from "@/utils/db";
import MovieCard from "@/components/movies/MovieCard";
import ClientFormElement from "@/components/forms/makeup/ClientFormElement";

export default async function Home({params, searchParams}) {

  const queryRes = await db().query("SELECT id, title, type, img FROM moviereview_media");

  return (
    <div className={"flex flex-wrap gap-5 m-6"}>
      {queryRes.rows.map((row) => {
        return <MovieCard key={row.id} {...row} />
      })}
      <ClientFormElement >
      </ClientFormElement>
    </div>
  );
}
