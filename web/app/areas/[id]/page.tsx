import { pool } from "@/lib/dbClient";

export default async function AreaPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const areaRes = await pool.query(`SELECT name, type FROM areas WHERE id = $1`, [id]);
  const area = areaRes.rows[0];

  const motionsRes = await pool.query(`
    SELECT id, title, meeting_date
    FROM motions
    WHERE area_id = $1
    ORDER BY meeting_date DESC
  `, [id]);
  const motions = motionsRes.rows;

  return (
    <main>
      <h2>{area.type}: {area.name}</h2>
      <ul>
        {motions.map(m => (
          <li key={m.id}>
            <a href={`/motions/${m.id}`}>{m.meeting_date} – {m.title}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}