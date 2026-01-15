import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Page ID is required'
      })
    }

    const page = await prisma.page.findUnique({
      where: { id }
    })

    if (!page) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Page not found'
      })
    }

    return page
  } catch (error) {
    console.error('Error fetching page:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch page'
    })
  }
})
