'use client'
import { useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

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
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
      {councillors.map(c => (
        <div
          key={c.id}
          onClick={() => router.push(`/councillors/${c.id}`)}
          className='cursor-pointer p-4 border rounded shadow flex flex-col items-center text-center'
        >
          <Avatar className='w-16 h-16 mb-4'>
            <AvatarImage src={`/councillors/${c.id}.jpg`} alt={c.name} />
            <AvatarFallback>{c.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className='text-lg font-bold mb-1'>{c.name}</h2>
          <p className='text-sm text-gray-600 mb-2'>{c.ward ?? 'City-wide'}</p>
          {c.party ? (
            <Badge className={getPartyColor(c.party)}>{c.party}</Badge>
          ) : (
            <Badge className={getPartyColor(null)}>Independent</Badge>
          )}
        </div>
      ))}
    </div>
  )
}
