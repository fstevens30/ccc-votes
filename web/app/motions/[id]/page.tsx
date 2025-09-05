import { prisma } from '@/lib/prisma'

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
    <main>
      <h2>{motion.title}</h2>
      <p>{motion.description}</p>
      <p>
        Category: {motion.category?.name || 'N/A'} | Area:{' '}
        {motion.area?.name || 'N/A'}
      </p>

      <h3>Votes</h3>
      <table>
        <thead>
          <tr>
            <th>Councillor</th>
            <th>Party</th>
            <th>Vote</th>
          </tr>
        </thead>
        <tbody>
          {motion.votes.map((v, i) => (
            <tr key={i}>
              <td>{v.councillor.name}</td>
              <td>{v.councillor.party?.name || 'N/A'}</td>
              <td>{v.vote}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
