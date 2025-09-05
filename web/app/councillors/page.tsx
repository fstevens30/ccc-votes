export const dynamic = 'force-dynamic';

import Link from 'next/Link'
import { pool } from "@/lib/dbClient";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default async function CouncillorsPage() {
  const res = await pool.query(`
    SELECT c.id, c.name, c.party, array_agg(w.name) AS wards
    FROM councillors c
    LEFT JOIN councillor_wards cw ON c.id = cw.councillor_id
    LEFT JOIN wards w ON cw.ward_id = w.id
    GROUP BY c.id
    ORDER BY c.name
  `);

  const councillors = res.rows;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Councillors</h1>

      <Table>
        <TableCaption>
          A list of all Christchurch City Councillors with their party and wards.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Party</TableHead>
            <TableHead>Wards</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {councillors.map((c: any) => (
            <TableRow key={c.id}>
              {/* Linked name */}
              <TableCell className="font-medium">
                <Link
                  href={`/councillors/${c.id}`}
                  className="underline hover:text-blue-600"
                >
                  {c.name}
                </Link>
              </TableCell>

              {/* Party badge */}
              <TableCell>
                {c.party ? (
                  <Badge>{c.party}</Badge>
                ) : (
                  <Badge variant="outline">Independent</Badge>
                )}
              </TableCell>

              {/* Wards list */}
              <TableCell>
                {c.wards && c.wards.length > 0
                  ? c.wards.join(", ")
                  : "City-wide"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}