import { pool } from "@/lib/dbClient";

export default async function CouncillorPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const councillorRes = await pool.query(`
    SELECT co.id, co.name, p.name AS party, a.name AS ward
    FROM councillors co
    LEFT JOIN parties p ON co.party_id = p.id
    LEFT JOIN areas a ON co.ward_id = a.id
    WHERE co.id = $1
  `, [id]);
  const councillor = councillorRes.rows[0];

  const votesRes = await pool.query(`
    SELECT v.vote, m.id AS motion_id, m.title, c.name AS category, a.name AS area
    FROM votes v
    LEFT JOIN motions m ON v.motion_id = m.id
    LEFT JOIN categories c ON m.category_id = c.id
    LEFT JOIN areas a ON m.area_id = a.id
    WHERE v.councillor_id = $1
    ORDER BY m.meeting_date DESC
  `, [id]);
  const votes = votesRes.rows;

  return (
    <main>
      <h2>{councillor.name}</h2>
      <p>Party: {councillor.party || "Independent"}</p>
      <p>Ward: {councillor.ward}</p>

      <h3>Votes</h3>
      <table>
        <thead>
          <tr><th>Date</th><th>Motion</th><th>Category</th><th>Area</th><th>Vote</th></tr>
        </thead>
        <tbody>
          {votes.map((v, i) => (
            <tr key={i}>
              <td>{v.motion_id}</td>
              <td><a href={`/motions/${v.motion_id}`}>{v.title}</a></td>
              <td>{v.category}</td>
              <td>{v.area}</td>
              <td>{v.vote}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}