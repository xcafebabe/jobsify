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
}