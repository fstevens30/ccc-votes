import { pool } from "@/lib/dbClient";

export default async function MotionPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const motionRes = await pool.query(`
    SELECT m.id, m.title, m.description, c.name AS category, a.name AS area
    FROM motions m
    LEFT JOIN categories c ON m.category_id = c.id
    LEFT JOIN areas a ON m.area_id = a.id
    WHERE m.id = $1
  `, [id]);
  const motion = motionRes.rows[0];

  const votesRes = await pool.query(`
    SELECT v.vote, co.name AS councillor, p.name AS party
    FROM votes v
    LEFT JOIN councillors co ON v.councillor_id = co.id
    LEFT JOIN parties p ON co.party_id = p.id
    WHERE v.motion_id = $1
  `, [id]);
  const votes = votesRes.rows;

  return (
    <main>
      <h2>{motion.title}</h2>
      <p>{motion.description}</p>
      <p>Category: {motion.category} | Area: {motion.area}</p>

      <h3>Votes</h3>
      <table>
        <thead>
          <tr><th>Councillor</th><th>Party</th><th>Vote</th></tr>
        </thead>
        <tbody>
          {votes.map((v, i) => (
            <tr key={i}>
              <td>{v.councillor}</td>
              <td>{v.party}</td>
              <td>{v.vote}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}