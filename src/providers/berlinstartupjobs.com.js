import JobProvider from './jobProvider'

export default class extends JobProvider {
  constructor() {
    super({
      id: 'berlin',
      name: 'berlinstartupjobs.com',
      logo: 'http://22iiaa2jpzc63c93rf3p9oti14j8.wpengine.netdna-cdn.com/wp-content/uploads/bsj-logo-460-1.png',
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