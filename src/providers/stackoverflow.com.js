import JobProvider from './jobProvider'

export default class extends JobProvider {
  constructor() {
    super({
      scope: '.js-search-results .listResults div.-item',
      selectors: {
        title: '.-title h2 a',
        url: '.-title h2 a@href',
        date: '.-title .-posted-date',
        company: '.-company .-name',
        location: '.-company .-location'
      }
    })
  }

  clean(text) {
    return text && text.replace(/[\n\r]+/g, '').replace(/\s{2,10}/g, ' ').trim()
  }

  disguise(items = []) {
    if (items.length > 0) {
      for (let item of items) {
        item.company = this.clean(item.company)
        item.location = this.clean(item.location).substring(2) //removed '- ', from beginnig
        item.id = this.hash(item.title + item.company)
        item.extra = 'Published: ' + this.clean(item.date) + ', Location: ' + item.location
        item.date = new Date()
        item.company = item.company
        item.created = new Date()
      }
    }
  }
}