import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    const page = await prisma.page.create({
      data: {
        title: body.title,
        slug: body.slug,
        content: body.content || {},
        published: body.published || false
      }
    })
    
    return page
  } catch (error) {
    console.error('Error creating page:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create page'
    })
  }
})
