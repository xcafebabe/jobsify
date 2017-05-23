import JobProvider from './jobProvider'

export default class extends JobProvider {
  constructor() {
    super({
      scope: 'div.main table.positionlist tr',
      selectors: {
        title: '.title h4 a',
        url: '.title h4 a@href',
        date: '.meta .when',
        company: '.source .company',
        location: '.meta .location'
      }
    })
  }
}