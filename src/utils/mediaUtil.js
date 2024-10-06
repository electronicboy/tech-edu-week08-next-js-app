const types = [{id: 0, slug: "tv", display: "TV"}, {id: 1, slug: "movie", display: "Movie"}, {id: 2, slug: "anime", display: "Anime"}];

export function getMediaTypes() {
    return types.map(type => { return {...type} })
}
