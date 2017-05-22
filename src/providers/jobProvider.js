const EMPTY_VALUE = ''
const KEYWORD_SEPARATOR = ','

export default class {

  constructor(options) {
    const defaultOptions = {
      id: EMPTY_VALUE,
      name: EMPTY_VALUE,
      scope: EMPTY_VALUE,
      pagination: EMPTY_VALUE,
      selectors: {
        id: EMPTY_VALUE,
        title: EMPTY_VALUE,
        url: EMPTY_VALUE,
        location: EMPTY_VALUE,
        date: EMPTY_VALUE,
        company: EMPTY_VALUE
      }
    }

    const myOptions = Object.assign({}, defaultOptions, options)
    this.id = myOptions.id
    this.name = myOptions.name
    this.scope = myOptions.scope
    this.pagination = myOptions.pagination
    this.selectors = myOptions.selectors
  }

   /**
   * Beautify / normalize item list. Is called inmediatelly
   * after website has been scrapped.
   * This is a default and optimistic disguise implementation and
   * probably will not work for any provider implementation,
   * but it shows an example about type of things you could do there
   *
   * @params {array} items - Scrapped list of items
   */
  disguise(items = []) {
    if (items.length > 0) {
      for (let item of items) {
        item.id = this.hash(item.title + item.company)
        item.date = new Date(item.date + ' ' + new Date().getFullYear().toString())
        item.created = new Date()
        item.extra = ''
      }
    }
  }

  /**
   * Helps to filter items list using keywords exclusion
   *
   * Another filters could be implemented, just follow same implementation
   */
  filter(items, filters) {
    let filteredItems = []

    const keywords = filters.excludeByKeywords ? filters.excludeByKeywords.split(KEYWORD_SEPARATOR).map((word) => word.trim()) : false,
      //meterPrice = filters.excludeByMeterPrice || false,
      filterFunctions = [
        keywords ? this.isIncludedByNotAllowedKeywords(keywords) : this.isIncluded
        //meterPrice ? this.isIncludedByMeterPrice(meterPrice) : this.isIncluded
      ]

    //iteracion y en los filtros buscar lo que quieres
    for (let item of items) {
      let allowToInclude = 0
      for (let isIncludedItemFilter of filterFunctions) {
        if (isIncludedItemFilter(item)) {
          allowToInclude++
        } else { //Stop everything when any of filters return false
          break
        }
        //If everything went well
        if (allowToInclude === filterFunctions.length) {
          filteredItems.push(item)
        }
      }
    }

    //Could happen duplication of element during pagination
    // const currentIds = [],
    //   withoutDuplicationsItems = []
    // for (let filteredItem of filteredItems) {
    //   if (currentIds.indexOf(filteredItem.id) === -1) {
    //     withoutDuplicationsItems.push(filteredItem)
    //     currentIds.push(filteredItem.id)
    //   }
    // }

    //return withoutDuplicationsItems

    return filteredItems

  }

  isIncludedByNotAllowedKeywords(keywords = []) {
    return (item = {}) => {
      for (let keyword of keywords) {
        if (!item.title || item.title.toLowerCase().indexOf(keyword) > -1) {
          return false
        }
      }

      return true
    }
  }

  isIncluded() {
    return true
  }

  hash (str) {
    let hash = 0, i, chr
    if (str.length === 0) return hash

    for (i = 0; i < str.length; i++) {
      chr   = str.charCodeAt(i)
      hash  = ((hash << 5) - hash) + chr
      hash |= 0 // Convert to 32bit integer
    }
    return Math.abs(hash)
  }
}