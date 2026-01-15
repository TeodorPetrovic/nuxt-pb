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

    const body = await readBody(event)
    
    const page = await prisma.page.update({
      where: { id },
      data: {
        title: body.title,
        slug: body.slug,
        content: body.content,
        published: body.published
      }
    })
    
    return page
  } catch (error) {
    console.error('Error updating page:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update page'
    })
  }
})
