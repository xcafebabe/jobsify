import JobProvider from './jobProvider'

export default class extends JobProvider {
  constructor() {
    super({
      id: 'dmtk',
      name: 'domestika.org',
      logo: 'http://4.bp.blogspot.com/-_ntAal9lU2I/T3XBljnauCI/AAAAAAAAAWo/kS3eJcZZQvs/s490/domestika-logo.gif',
      scope: 'ul.jobs-list li.job-item',
      selectors: {
        title: 'h2.job-item__title a',
        url: '.h2.job-item__title a@href',
        date: 'div.job-item__date',
        company: 'h3.job-item__company',
        location: 'div.job-item__city',
        description: 'p.job-item__excerpt'
      }
    })
  }

  refine(item) {
    item.location = this.clean(item.location)
  }
}

