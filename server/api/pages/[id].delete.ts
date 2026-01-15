import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Page ID is required'
      })
    }

    await prisma.page.delete({
      where: { id }
    })
    
    return { success: true }
  } catch (error) {
    console.error('Error deleting page:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete page'
    })
  }
})
