import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

export default async function CouncillorsPage () {
  // Fetch councillors with their party and ward
  const councillors = await prisma.councillor.findMany({
    include: { party: true, ward: true },
    orderBy: { name: 'asc' }
  })

  return (
    <main className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Councillors</h1>

      <Table>
        <TableCaption>
          A list of all Christchurch City Councillors with their party and
          wards.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Party</TableHead>
            <TableHead>Ward</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {councillors.map(c => (
            <TableRow key={c.id}>
              <TableCell className='font-medium'>
                <Link
                  href={`/councillors/${c.id}`}
                  className='underline hover:text-blue-600'
                >
                  {c.name}
                </Link>
              </TableCell>
              <TableCell>
                {c.party?.name ? (
                  <Badge>{c.party.name}</Badge>
                ) : (
                  <Badge variant='outline'>Independent</Badge>
                )}
              </TableCell>
              <TableCell>{c.ward?.name ?? 'City-wide'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  )
}
