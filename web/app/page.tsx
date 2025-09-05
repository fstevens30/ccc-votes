import { pool } from "@/lib/dbClient";
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const res = await pool.query(`
    SELECT m.id, m.title, m.meeting_date, c.name AS category, a.name AS area
    FROM motions m
    LEFT JOIN categories c ON m.category_id = c.id
    LEFT JOIN areas a ON m.area_id = a.id
    ORDER BY m.meeting_date DESC
  `);
  const motions = res.rows;

  return (
    <main>
      <h1>How they <i>really</i> voted.</h1>
      <p>In light of a somewhat questionable site being created in order to show how councillors have voted, this site has been created to show a more balanced and less biased view into voting records. All records are sourced directly from the Christchurch City Council meeting agendas, the project is also open-source in order to show transparency into how the data is gathered. </p>
      <ul>
        {motions.map((m) => (
          <li key={m.id}>
            <a href={`/motions/${m.id}`}>
              {new Date(m.meeting_date).toLocaleDateString()} – {m.title} ({m.category} | {m.area})
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}