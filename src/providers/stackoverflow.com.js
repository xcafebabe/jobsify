import JobProvider from './jobProvider'
import Chrono from 'chrono-node'

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

  _formatDate(dateText) {
    dateText = this.clean(dateText).toLowerCase()
    if (!dateText) {
      return 'today'
    } else if (/^(<|>)/.test(dateText)) {
      return dateText.substring(1)
    } else {
      const search = dateText.charAt(1)
      let replace = ''
      switch (search) {
        default:
        case 'd':
          replace = ' days '
          break
        case 'm':
          replace = ' months '
          break
        case 'w':
          replace = ' weeks '
          break
      }
      return dateText.replace(search, replace)
    }
  }

  disguise(items = []) {
    if (items.length > 0) {
      for (let item of items) {
        item.company = this.clean(item.company)
        item.location = this.clean(item.location).substring(2) //removed '- ', from beginnig
        item.id = this.hash(item.title + item.company)
        item.description = 'Published: ' + this.clean(item.date) + ', Location: ' + item.location
        item.date = Chrono.parseDate(this._formatDate(item.date))
        item.company = item.company
        item.created = new Date()
      }
    }
  }
}