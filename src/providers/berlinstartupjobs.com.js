import JobProvider from './jobProvider'

export default class extends JobProvider {
  constructor() {
    super({
      scope: '#primary div.product-listing-item',
      selectors: {
        title: '.product-listing-h2 a',
        url: '.product-listing-h2 a@href',
        date: '.product-listing-date',
        company: '.category-tag a:nth-of-type(1)'
      }
    })
  }
}