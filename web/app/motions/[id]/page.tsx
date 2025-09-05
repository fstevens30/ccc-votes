import { prisma } from '@/lib/prisma'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

export default async function MotionPage ({
  params
}: {
  params: { id: string }
}) {
  const { id } = params

  // Fetch the motion along with its category, area, and votes
  const motion = await prisma.motion.findUnique({
    where: { id: Number(id) },
    include: {
      category: { select: { name: true } },
      area: { select: { name: true } },
      votes: {
        include: {
          councillor: { include: { party: { select: { name: true } } } }
        }
      }
    }
  })

  if (!motion) {
    return <p>Motion not found</p>
  }

  return (
    <main className='space-y-6 p-4'>
      <h2 className='text-2xl font-semibold'>{motion.title}</h2>
      <p>{motion.description}</p>
      <p className='flex space-x-2'>
        <Badge variant='secondary'>
          Category: {motion.category?.name || 'N/A'}
        </Badge>
        <Badge variant='secondary'>Area: {motion.area?.name || 'N/A'}</Badge>
      </p>

      <h3 className='text-xl font-semibold'>Votes</h3>
      <div className='overflow-auto rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Councillor</TableHead>
              <TableHead>Party</TableHead>
              <TableHead>Vote</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {motion.votes.map((v, i) => (
              <TableRow key={i} className='hover:bg-muted'>
                <TableCell>{v.councillor.name}</TableCell>
                <TableCell>{v.councillor.party?.name || 'N/A'}</TableCell>
                <TableCell>{v.vote}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  )
}
