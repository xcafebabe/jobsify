import JobProvider from './jobProvider'

export default class extends JobProvider {
  constructor() {
    super({
      id: 'ajob',
      name: 'authenticjobs.com',
      logo: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=Authentic&w=160&h=160',
      scope: 'ul#listings li[id^="listing_"]',
      selectors: {
        title: 'a.listing div.details h3',
        url: 'a.listing@href',
        company: 'a.listing div.details h4@title'
      }
    })
  }

  refine(item) {
    item.date = new Date()
    item.company = item.company.trim()
  }
}