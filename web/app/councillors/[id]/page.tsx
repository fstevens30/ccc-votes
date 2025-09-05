import { prisma } from '@/lib/prisma'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

interface PageProps {
  params: { id: string }
}

export default async function CouncillorPage ({ params }: PageProps) {
  const id = Number(params.id)

  // Fetch councillor with party, ward, and votes (including motions)
  const councillor = await prisma.councillor.findUnique({
    where: { id },
    include: {
      party: true,
      ward: true,
      votes: {
        include: { motion: true },
        orderBy: { motion: { meetingDate: 'desc' } }
      }
    }
  })

  if (!councillor) {
    return (
      <main className='p-6'>
        <h1 className='text-2xl font-bold'>Councillor not found</h1>
      </main>
    )
  }

  return (
    <main className='p-6'>
      <h1 className='text-3xl font-bold mb-2'>{councillor.name}</h1>
      <div className='mb-2'>
        {councillor.party ? (
          <Badge>{councillor.party.name}</Badge>
        ) : (
          <Badge variant='outline'>Independent</Badge>
        )}
      </div>
      <p className='mb-6 text-gray-600'>
        {councillor.ward ? councillor.ward.name : 'City-wide'}
      </p>

      <h2 className='text-2xl font-semibold mb-4'>Voting History</h2>
      <Table>
        <TableCaption>
          A list of how {councillor.name} has voted on motions.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Motion</TableHead>
            <TableHead>Vote</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {councillor.votes.map(v => (
            <TableRow key={v.id}>
              <TableCell>
                {v.motion?.meetingDate
                  ? new Date(v.motion.meetingDate).toLocaleDateString()
                  : 'N/A'}
              </TableCell>
              <TableCell>{v.motion?.title ?? 'N/A'}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    v.vote === 'Yes'
                      ? 'default'
                      : v.vote === 'No'
                      ? 'destructive'
                      : 'outline'
                  }
                >
                  {v.vote}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  )
}
