import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export default async function HomePage() {
  const res = await pool.query("SELECT * FROM motions ORDER BY meeting_date DESC");
  const motions = res.rows;

  return (
    <main>
      <h1>Christchurch City Council Votes</h1>
      <ul>
        {motions.map((m) => (
          <li key={m.id}>{m.meeting_date} – {m.title}</li>
        ))}
      </ul>
    </main>
  );
}