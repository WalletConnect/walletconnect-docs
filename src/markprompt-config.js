if (typeof window !== 'undefined') {
  window.markpromptConfigExtras = {
    references: {
      // References link mappings:
      getHref: reference => reference.file?.path,
      getLabel: reference => reference.meta?.leadHeading?.value || reference.file?.title
    },
    search: {
      // Search results link mappings:
      getHref: result => result.url,
      getHeading: result => result.hierarchy?.lvl0,
      getTitle: result => result.hierarchy?.lvl1,
      getSubtitle: result => result.hierarchy?.lvl2
    }
  }
}
