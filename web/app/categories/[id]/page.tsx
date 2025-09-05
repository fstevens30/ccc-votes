import { pool } from "@/lib/dbClient";

export default async function CategoryPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const categoryRes = await pool.query(`SELECT name FROM categories WHERE id = $1`, [id]);
  const category = categoryRes.rows[0];

  const motionsRes = await pool.query(`
    SELECT id, title, meeting_date
    FROM motions
    WHERE category_id = $1
    ORDER BY meeting_date DESC
  `, [id]);
  const motions = motionsRes.rows;

  return (
    <main>
      <h2>Category: {category.name}</h2>
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