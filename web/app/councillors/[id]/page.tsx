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

function getVoteColor (vote: string): string {
  switch (vote) {
    case 'Yes':
      return 'bg-green-500 text-white'
    case 'No':
      return 'bg-red-500 text-white'
    case 'Abstain':
    default:
      return 'bg-gray-300 text-black'
  }
}

function getPartyColor (partyName: string | null): string {
  switch (partyName) {
    case 'Labour':
      return 'bg-red-500 text-white'
    case "The People's Choice":
    case "Labour / The People's Choice":
      return 'bg-red-700 text-white'
    case 'Independent Citizens':
      return 'bg-yellow-400 text-black'
    case 'Independent':
    case null:
    default:
      return 'bg-gray-400 text-black'
  }
}

export default async function CouncillorPage ({ params }: PageProps) {
  const id = Number(params.id)

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
        <Badge className={getPartyColor(councillor.party.name)}>
          {councillor.party?.name ?? 'Independent'}
        </Badge>
      </div>
      <p className='mb-6 text-gray-600'>
        {councillor.ward ? councillor.ward.name : 'City-wide'}
      </p>

      <h2 className='text-2xl font-semibold mb-4'>Voting History</h2>

      <div className='overflow-x-auto'>
        <Table>
          <TableCaption>
            A list of how {councillor.name} has voted on motions.
          </TableCaption>
          <TableHeader>
            <TableRow className='hidden md:table-row-group'>
              <TableHead>Date</TableHead>
              <TableHead>Motion</TableHead>
              <TableHead>Vote</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {councillor.votes.map(v => (
              <TableRow
                key={v.id}
                className='block md:table-row mb-4 md:mb-0 border md:border-0 rounded md:rounded-none shadow-sm md:shadow-none'
              >
                <TableCell className='flex flex-col md:table-cell md:align-middle md:py-4 md:px-6 py-2 px-3'>
                  <span className='md:hidden text-xs font-semibold text-gray-500 mb-1'>
                    Date:
                  </span>
                  {v.motion?.meetingDate
                    ? new Date(v.motion.meetingDate).toLocaleDateString()
                    : 'N/A'}
                </TableCell>
                <TableCell className='flex flex-col md:table-cell md:align-middle md:py-4 md:px-6 py-2 px-3'>
                  <span className='md:hidden text-xs font-semibold text-gray-500 mb-1'>
                    Motion:
                  </span>
                  {v.motion?.title ?? 'N/A'}
                </TableCell>
                <TableCell className='flex flex-col md:table-cell md:align-middle md:py-4 md:px-6 py-2 px-3'>
                  <span className='md:hidden text-xs font-semibold text-gray-500 mb-1'>
                    Vote:
                  </span>
                  <Badge className={getVoteColor(v.vote)}>{v.vote}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  )
}
