import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    const component = await prisma.component.create({
      data: {
        name: body.name,
        type: body.type,
        category: body.category,
        icon: body.icon,
        template: body.template,
        properties: body.properties || {}
      }
    })
    
    return component
  } catch (error) {
    console.error('Error creating component:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create component'
    })
  }
})
