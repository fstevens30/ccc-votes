'use client'
import { useRouter } from 'next/navigation'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

export type CouncillorRow = {
  id: number
  name: string
  party: string | null
  ward: string | null
}

function getPartyColor (partyName: string | null): string {
  switch (partyName) {
    case 'Labour':
    case "The People's Choice":
    case "Labour / The People's Choice":
      return 'bg-[#d82c20] text-white'
    case 'Independent Citizens':
      return 'bg-[#fad900] text-black'
    case 'Independent':
    case null:
    default:
      return 'bg-gray-400 text-black'
  }
}

type CouncillorsTableProps = {
  councillors: CouncillorRow[]
}

export default function CouncillorsTable ({
  councillors
}: CouncillorsTableProps) {
  const router = useRouter()

  return (
    <Table>
      <TableCaption>
        A list of all Christchurch City Councillors with their party and wards.
      </TableCaption>
      <TableHeader>
        <TableRow className='hidden md:table-row-group'>
          <TableHead>Name</TableHead>
          <TableHead>Party</TableHead>
          <TableHead>Ward</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {councillors.map(c => (
          <TableRow
            key={c.id}
            className='block md:table-row mb-4 md:mb-0 border md:border-0 rounded md:rounded-none shadow-sm md:shadow-none'
          >
            <TableCell
              onClick={() => router.push(`/councillors/${c.id}`)}
              className='flex flex-col md:table-cell font-medium md:font-normal md:align-middle md:py-4 md:px-6 py-2 px-3 cursor-pointer'
            >
              {c.name}
            </TableCell>
            <TableCell className='flex flex-col md:table-cell md:align-middle md:py-4 md:px-6 py-2 px-3'>
              <span className='md:hidden text-xs font-semibold text-gray-500 mb-1'>
                Party:
              </span>
              {c.party ? (
                <Badge className={getPartyColor(c.party)}>{c.party}</Badge>
              ) : (
                <Badge className={getPartyColor(null)}>Independent</Badge>
              )}
            </TableCell>
            <TableCell className='flex flex-col md:table-cell md:align-middle md:py-4 md:px-6 py-2 px-3'>
              <span className='md:hidden text-xs font-semibold text-gray-500 mb-1'>
                Ward:
              </span>
              {c.ward ?? 'City-wide'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
