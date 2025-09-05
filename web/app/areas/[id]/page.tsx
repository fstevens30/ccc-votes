import { prisma } from '@/lib/prisma'

export default async function AreaPage ({ params }: { params: { id: string } }) {
  const { id } = params

  // Fetch the area
  const area = await prisma.area.findUnique({
    where: { id: Number(id) },
    select: { name: true, type: true }
  })

  if (!area) {
    return <p>Area not found</p>
  }

  // Fetch motions for the area
  const motions = await prisma.motion.findMany({
    where: { areaId: Number(id) },
    orderBy: { meetingDate: 'desc' },
    select: { id: true, title: true, meetingDate: true }
  })

  return (
    <main>
      <h2>
        {area.type}: {area.name}
      </h2>
      <ul>
        {motions.map(m => (
          <li key={m.id}>
            <a href={`/motions/${m.id}`}>
              {m.meetingDate.toISOString().split('T')[0]} – {m.title}
            </a>
          </li>
        ))}
      </ul>
    </main>
  )
}
