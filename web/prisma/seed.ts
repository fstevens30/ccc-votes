import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

const prisma = new PrismaClient()

async function main () {
  console.log('Seed script started!')

  // Create some parties
  const labour = await prisma.party.upsert({
    where: { name: 'Labour' },
    update: {},
    create: { name: 'Labour' }
  })
  const tpc = await prisma.party.upsert({
    where: { name: "The People's Choice" },
    update: {},
    create: { name: "The People's Choice" }
  })
  const icitz = await prisma.party.upsert({
    where: { name: 'Independent Citizens' },
    update: {},
    create: { name: 'Independent Citizens' }
  })
  const tpclab = await prisma.party.upsert({
    where: { name: "Labour / The People's Choice" },
    update: {},
    create: { name: "Labour / The People's Choice" }
  })
  const independent = await prisma.party.upsert({
    where: { name: 'Independent' },
    update: {},
    create: { name: 'Independent' }
  })

  // Create some wards (areas)
  const cityWide = await prisma.area.upsert({
    where: { name: 'City Wide' },
    update: {},
    create: { name: 'City Wide', type: 'City-wide' }
  })

  // Community Boards
  const banksCB = await prisma.area.upsert({
    where: { name: 'Te Pātaka o Rākaihautū Banks Peninsula' },
    update: {},
    create: {
      name: 'Te Pātaka o Rākaihautū Banks Peninsula',
      type: 'Community Board',
      parentId: cityWide.id
    }
  })
  const waitaiCB = await prisma.area.upsert({
    where: { name: 'Waitai Coastal-Burwood-Linwood' },
    update: {},
    create: {
      name: 'Waitai Coastal-Burwood-Linwood',
      type: 'Community Board',
      parentId: cityWide.id
    }
  })

  const waimaeroCB = await prisma.area.upsert({
    where: { name: 'Waimāero Fendalton-Waimairi-Harewood' },
    update: {},
    create: {
      name: 'Waimāero Fendalton-Waimairi-Harewood',
      type: 'Community Board',
      parentId: cityWide.id
    }
  })

  const waipunaCB = await prisma.area.upsert({
    where: { name: 'Waipuna Halswell-Hornby-Riccarton' },
    update: {},
    create: {
      name: 'Waipuna Halswell-Hornby-Riccarton',
      type: 'Community Board',
      parentId: cityWide.id
    }
  })

  const waipapaCB = await prisma.area.upsert({
    where: { name: 'Waipapa Papanui-Innes-Central' },
    update: {},
    create: {
      name: 'Waipapa Papanui-Innes-Central',
      type: 'Community Board',
      parentId: cityWide.id
    }
  })

  const waihoroCB = await prisma.area.upsert({
    where: { name: 'Waihoro Spreydon-Cashmere-Heathcote' },
    update: {},
    create: {
      name: 'Waihoro Spreydon-Cashmere-Heathcote',
      type: 'Community Board',
      parentId: cityWide.id
    }
  })

  // Wards
  const banksPeninsula = await prisma.area.upsert({
    where: { name: 'Banks Peninsula' },
    update: {},
    create: {
      name: 'Banks Peninsula',
      type: 'Ward',
      parentId: banksCB.id
    }
  })
  const coastal = await prisma.area.upsert({
    where: { name: 'Coastal' },
    update: {},
    create: { name: 'Coastal', type: 'Ward', parentId: waitaiCB.id }
  })
  const burwood = await prisma.area.upsert({
    where: { name: 'Burwood' },
    update: {},
    create: { name: 'Burwood', type: 'Ward', parentId: waitaiCB.id }
  })
  const linwood = await prisma.area.upsert({
    where: { name: 'Linwood' },
    update: {},
    create: { name: 'Linwood', type: 'Ward', parentId: waitaiCB.id }
  })
  const fendalton = await prisma.area.upsert({
    where: { name: 'Fendalton' },
    update: {},
    create: { name: 'Fendalton', type: 'Ward', parentId: waimaeroCB.id }
  })
  const waimairi = await prisma.area.upsert({
    where: { name: 'Waimairi' },
    update: {},
    create: { name: 'Waimairi', type: 'Ward', parentId: waimaeroCB.id }
  })
  const harewood = await prisma.area.upsert({
    where: { name: 'Harewood' },
    update: {},
    create: { name: 'Harewood', type: 'Ward', parentId: waimaeroCB.id }
  })
  const hornby = await prisma.area.upsert({
    where: { name: 'Hornby' },
    update: {},
    create: { name: 'Hornby', type: 'Ward', parentId: waipunaCB.id }
  })
  const halswell = await prisma.area.upsert({
    where: { name: 'Halswell' },
    update: {},
    create: { name: 'Halswell', type: 'Ward', parentId: waipapaCB.id }
  })
  const riccarton = await prisma.area.upsert({
    where: { name: 'Riccarton' },
    update: {},
    create: { name: 'Riccarton', type: 'Ward', parentId: waipunaCB.id }
  })
  const papanui = await prisma.area.upsert({
    where: { name: 'Papanui' },
    update: {},
    create: { name: 'Papanui', type: 'Ward', parentId: waipapaCB.id }
  })
  const innes = await prisma.area.upsert({
    where: { name: 'Innes' },
    update: {},
    create: { name: 'Innes', type: 'Ward', parentId: waipapaCB.id }
  })
  const central = await prisma.area.upsert({
    where: { name: 'Central' },
    update: {},
    create: { name: 'Central', type: 'Ward', parentId: waipapaCB.id }
  })
  const spreydon = await prisma.area.upsert({
    where: { name: 'Spreydon' },
    update: {},
    create: { name: 'Spreydon', type: 'Ward', parentId: waihoroCB.id }
  })
  const cashmere = await prisma.area.upsert({
    where: { name: 'Cashmere' },
    update: {},
    create: { name: 'Cashmere', type: 'Ward', parentId: waihoroCB.id }
  })
  const heathcote = await prisma.area.upsert({
    where: { name: 'Heathcote' },
    update: {},
    create: { name: 'Heathcote', type: 'Ward', parentId: waihoroCB.id }
  })

  // Create councillors manually using upsert
  await prisma.councillor.upsert({
    where: { name: 'Phil Mauger' },
    update: {},
    create: {
      name: 'Phil Mauger',
      partyId: independent.id,
      wardId: cityWide.id
    }
  })

  await prisma.councillor.upsert({
    where: { name: 'Tyrone Fields' },
    update: {},
    create: {
      name: 'Tyrone Fields',
      partyId: tpc.id,
      wardId: banksPeninsula.id
    }
  })

  await prisma.councillor.upsert({
    where: { name: 'Celeste Donovan' },
    update: {},
    create: {
      name: 'Celeste Donovan',
      partyId: independent.id,
      wardId: coastal.id
    }
  })

  await prisma.councillor.upsert({
    where: { name: 'Kelly Barber' },
    update: {},
    create: {
      name: 'Kelly Barber',
      partyId: independent.id,
      wardId: burwood.id
    }
  })

  await prisma.councillor.upsert({
    where: { name: 'Yani Johanson' },
    update: {},
    create: {
      name: 'Yani Johanson',
      partyId: tpclab.id,
      wardId: linwood.id
    }
  })

  await prisma.councillor.upsert({
    where: { name: 'James Gough' },
    update: {},
    create: {
      name: 'James Gough',
      partyId: icitz.id,
      wardId: fendalton.id
    }
  })

  await prisma.councillor.upsert({
    where: { name: 'Sam MacDonald' },
    update: {},
    create: {
      name: 'Sam MacDonald',
      partyId: icitz.id,
      wardId: waimairi.id
    }
  })

  await prisma.councillor.upsert({
    where: { name: 'Aaron Keown' },
    update: {},
    create: {
      name: 'Aaron Keown',
      partyId: independent.id,
      wardId: harewood.id
    }
  })

  await prisma.councillor.upsert({
    where: { name: 'Mark Peters' },
    update: {},
    create: {
      name: 'Mark Peters',
      partyId: independent.id,
      wardId: hornby.id
    }
  })

  await prisma.councillor.upsert({
    where: { name: 'Andrei Moore' },
    update: {},
    create: {
      name: 'Andrei Moore',
      partyId: independent.id,
      wardId: halswell.id
    }
  })

  await prisma.councillor.upsert({
    where: { name: 'Tyla Harrison-Hunt' },
    update: {},
    create: {
      name: 'Tyla Harrison-Hunt',
      partyId: tpc.id,
      wardId: riccarton.id
    }
  })

  await prisma.councillor.upsert({
    where: { name: 'Victoria Henstock' },
    update: {},
    create: {
      name: 'Victoria Henstock',
      partyId: independent.id,
      wardId: papanui.id
    }
  })

  await prisma.councillor.upsert({
    where: { name: 'Pauline Cotter' },
    update: {},
    create: {
      name: 'Pauline Cotter',
      partyId: tpc.id,
      wardId: innes.id
    }
  })

  await prisma.councillor.upsert({
    where: { name: 'Jake McLellan' },
    update: {},
    create: {
      name: 'Jake McLellan',
      partyId: labour.id,
      wardId: central.id
    }
  })

  await prisma.councillor.upsert({
    where: { name: 'Melanie Coker' },
    update: {},
    create: {
      name: 'Melanie Coker',
      partyId: tpclab.id,
      wardId: spreydon.id
    }
  })

  await prisma.councillor.upsert({
    where: { name: 'Tim Scandrett' },
    update: {},
    create: {
      name: 'Tim Scandrett',
      partyId: independent.id,
      wardId: cashmere.id
    }
  })

  await prisma.councillor.upsert({
    where: { name: 'Sara Templeton' },
    update: {},
    create: {
      name: 'Sara Templeton',
      partyId: independent.id,
      wardId: heathcote.id
    }
  })

  // Create a sample motion
  const sampleMotion = await prisma.motion.create({
    data: {
      title: 'Sample Motion on Environmental Sustainability',
      description:
        'This motion aims to promote environmental sustainability initiatives within the city.',
      meetingDate: new Date(),
      category: { create: { name: 'Environment' } },
      area: { connect: { id: cityWide.id } } // use connect to associate the area
    }
  })

  // Create some votes for the sample motion
  const councillors = await prisma.councillor.findMany()
  for (const councillor of councillors) {
    await prisma.vote.create({
      data: {
        motionId: sampleMotion.id,
        councillorId: councillor.id,
        vote: Math.random() > 0.5 ? 'Yes' : 'No' // Randomly assign Yes or No votes
      }
    })
  }

  console.log('Seed data created!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
