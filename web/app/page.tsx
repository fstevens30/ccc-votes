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
      <h1>Christchurch City Council Votes</h1>
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