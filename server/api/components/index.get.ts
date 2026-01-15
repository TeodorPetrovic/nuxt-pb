import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const components = await prisma.component.findMany({
      orderBy: {
        name: 'asc'
      }
    })
    return components
  } catch (error) {
    console.error('Error fetching components:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch components'
    })
  }
})
