This is an E-COMMERCE project made by Lucas de la Fuente. I used the following technologies:
TypeScript.js, Next.JS, Node.JS, PostgreSQL & Prisma.


## Getting Started

## First, run the development server:

1. Clone the repository.
2. Create a copy of ```.env.template```, then rename it to ```.env```, and change the enviornment var.
3. Instal dependencies ```pnpm install``` o ```pnpm dlx install```.
4. Up database ```docker compose up -d```.
5. Run the project ```pnpm run dev```.


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!


## Run in production:
1. 
2. 
3. 

# DATABASE
1. Set the ```DATABASE_URL``` in the ```.env``` file to point to your existing database. If your database has no tables yet, read ```https://pris.ly/d/getting-started```
2. Run ```prisma db pull``` to turn your database schema into a Prisma schema.
3. Run ```prisma generate``` to generate the Prisma Client. You can then start querying your database.
4. Tip: Explore how you can extend the ORM with scalable connection pooling, global caching, and real-time database events. Read: ```https://pris.ly/cli/beyond-orm```



## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
