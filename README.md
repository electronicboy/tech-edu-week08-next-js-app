This is a [Next.js](https://nextjs.org/) project bootstrapped with [
`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Reflection

For this project, I utilised NextJS to create a site listing movies/TV shows inside the main page, utilising a card
layout, which is sortable by the links on the page. The database schema used foreign keys to manage movies' genres (
categories) using a junction table and a standard 1:many relationship through the comments table. I created delete
buttons on both comments on posts; for posts, I made a DELETE route using the NextJS routes file, which allowed a more
traditional form of using fetch() to call the API route and induce a delete for the comments. I utilised a server action
that felt more fluent for the scope of an application rather than coding in another HTTP DELETE route.

Each post page has its own set of comments, which is handled through the database and uses a form to perform insertions
into, as well as the shows table. I utilised JavaScript on the client to add genres to a show before being inserted into
the DB. There is also a genres page which lists all of the available genres and shows if there are any shows under that
name; I was also planning to add a counter but never got around to designing how this would look.

Each post page has an edit button, which takes the user to a page where the user can modify the data of that entry.

Overall, I found this to be fun; NextJS caused a few headaches regarding how it operates, which caused a few minor
trip-ups in terms of trying to get "no entity" pages to work fluently. Utilising tailwind was a lot nicer in terms of
styling a page; I feel that being closer to the elements just allowed me to play around more without too much of a
context switch, so adjusting how stuff looks, was a lot faster, especially when it came to things like media queries.


