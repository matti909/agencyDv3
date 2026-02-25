// Utility to get all services metadata
export async function getAllServices() {
  const services = [
    {
      slug: 'presencia-digital',
      module: await import('@/content/servicios/presencia-digital.mdx'),
    },
    {
      slug: 'automatizacion-ia',
      module: await import('@/content/servicios/automatizacion-ia.mdx'),
    },
    {
      slug: 'ventas-marketing',
      module: await import('@/content/servicios/ventas-marketing.mdx'),
    },
    {
      slug: 'redes-contenido',
      module: await import('@/content/servicios/redes-contenido.mdx'),
    },
    {
      slug: 'gestion-pagos',
      module: await import('@/content/servicios/gestion-pagos.mdx'),
    },
    {
      slug: 'seguridad-soporte',
      module: await import('@/content/servicios/seguridad-soporte.mdx'),
    },
  ]

  return services.map(({ slug, module }) => ({
    slug,
    metadata: module.metadata,
  }))
}

export async function getServiceBySlug(slug: string) {
  try {
    const module = await import(`@/content/servicios/${slug}.mdx`)
    return {
      slug,
      metadata: module.metadata,
      Content: module.default,
    }
  } catch (error) {
    return null
  }
}
