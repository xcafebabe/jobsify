import JobProvider from './jobProvider'

export default class extends JobProvider {
  constructor() {
    super({
      scope: '#job_list .jobs  article  ul li',
      selectors: {
        title: '.title',
        url: 'a@href',
        date: '.date',
        company: '.company'
      }
    })
  }

  disguise(items = []) {
    for (let item of items) {
      item.id = this.hash(item.title + item.company)
      item.date = new Date(item.date + ' ' + new Date().getFullYear().toString())
    }
  }
}