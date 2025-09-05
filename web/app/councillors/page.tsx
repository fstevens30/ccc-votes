export const dynamic = 'force-dynamic';

import { pool } from "@/lib/dbClient";

export default async function CouncillorsPage() {
  const res = await pool.query("SELECT id, name FROM councillors ORDER BY name");
  const councillors = res.rows;

  return (
    <main>
      <h1>Councillors</h1>
      <ul>
        {councillors.map(c => <li key={c.id}>{c.name}</li>)}
      </ul>
    </main>
  );
}