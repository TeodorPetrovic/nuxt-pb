import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const pages = await prisma.page.findMany({
      orderBy: {
        updatedAt: 'desc'
      }
    })
    return pages
  } catch (error) {
    console.error('Error fetching pages:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch pages'
    })
  }
})
