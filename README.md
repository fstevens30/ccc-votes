# How they *really* voted

A site to show how votes were casted by Christchurch City Councillors.

## Status / Progress
Currently the front-end and database side is setup. It's pretty slow so I'll fix that asap. The data fetching is being worked on.
- [x] Create layout
- [x] Implement Neon DB
- [ ] Build Python scripts
- [ ] Optimise data fetching

## About

In light of a somewhat questionable site being created in order to show how councillors have voted, this site has been created to show a more balanced and less biased view into voting records. All records are sourced directly from the Christchurch City Council meeting agendas, the project is also open-source in order to show transparency into how the data is gathered. 

The reason for this being created is because,
- In the original site, motions were given names that didnt properly reflect what said motion was about.
- The original version was made as a political tool to gain votes, this version aims for complete transparency.
- Not every voting record is shown in the original version, only the ones that make the creator and their "bloc" look favourable.

There is no doubt that I disagree with the original version and it's creator, however the idea is sound and can be a genuinely useful tool wth the correct setup.

All data is directly pulled from the Council site using Python scripts, found in `/scraper`.
The Next.js project is found in the `/web` directory.

## Contributing

Feel free to make contributions and changes to help keep this project accurate, message me directly for any ideas or thoughts.
You will need to create a [Neon](https://neon.com/) database to run locally. It's simple, create a project and copy the `postgresql` connection string and add to `/web/.env` as shown below.
```.env
DATABASE_URL="postgresql://neondb_owner:<PASSWORD>@<DATABASE_URL>"
```
Then follow the [Prisma](https://prisma.io) docs to setup and seed the data in `seed.ts`.

## Future

Hopefully this site is no longer needed in the near future, there is talks of an official CCC voting record tool being created internally. Similar to the Wellington City Council one. 

