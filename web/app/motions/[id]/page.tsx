import { prisma } from '@/lib/prisma'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default async function MotionPage ({
  params
}: {
  params: { id: string }
}) {
  const { id } = params

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

  // Separate votes into Yes and No groups
  const yesVotes = motion.votes.filter(v => v.vote.toLowerCase() === 'yes')
  const noVotes = motion.votes.filter(v => v.vote.toLowerCase() === 'no')

  return (
    <main className='p-6 space-y-6 mb-4'>
      <h2 className='text-2xl font-bold'>{motion.title}</h2>
      <p>{motion.description}</p>
      <p className='text-sm text-gray-600'>
        Category: {motion.category?.name || 'N/A'} | Area:{' '}
        {motion.area?.name || 'N/A'}
      </p>

      <h3 className='text-xl font-semibold mt-6'>Votes</h3>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Yes voters */}
        <div>
          <h4 className='text-green-600 font-semibold mb-3'>Yes</h4>
          <div className='space-y-3'>
            {yesVotes.map(v => (
              <div key={v.id} className='flex items-center space-x-3'>
                <Avatar>
                  <AvatarImage
                    src={`/councillors/${v.councillor.id}.jpg`}
                    alt={v.councillor.name}
                  />
                  <AvatarFallback>{v.councillor.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className='font-medium'>{v.councillor.name}</p>
                  <p className='text-sm text-gray-500'>
                    {v.councillor.party?.name || 'Independent'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* No voters */}
        <div>
          <h4 className='text-red-600 font-semibold mb-3'>No</h4>
          <div className='space-y-3'>
            {noVotes.map(v => (
              <div key={v.id} className='flex items-center space-x-3'>
                <Avatar>
                  <AvatarImage
                    src={`/councillors/${v.councillor.id}.jpg`}
                    alt={v.councillor.name}
                  />
                  <AvatarFallback>{v.councillor.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className='font-medium'>{v.councillor.name}</p>
                  <p className='text-sm text-gray-500'>
                    {v.councillor.party?.name || 'Independent'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
