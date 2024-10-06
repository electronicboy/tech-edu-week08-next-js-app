import {db} from "@/utils/db";
import MovieCard from "@/components/movies/MovieCard";
import FormElement from "@/components/forms/makeup/FormElement";

export default async function Home({params, searchParams}) {

  const queryRes = await db().query("SELECT id, title, type, img FROM moviereview_media");

  return (
    <div className={"flex flex-wrap gap-5 m-6"}>
      {queryRes.rows.map((row) => {
        return <MovieCard key={row.id} {...row} />
      })}
      <FormElement >
      </FormElement>
    </div>
  );
}
