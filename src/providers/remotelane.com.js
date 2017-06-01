import JobProvider from './jobProvider'
import Chrono from 'chrono-node'


export default class extends JobProvider {
  constructor() {
    super({
      id: 'rmtlane',
      name: 'remotelane.com',
      logo: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=RmtLane&w=160&h=160',
      scope: 'div.rl-jobs div.rl-job',
      selectors: {
        title: '.rl-job__title',
        url: 'div.rl-job__footer a@href',
        date: 'div.rl-job__date',
        company: 'a.rl-job__company',
        description: 'div.rl-job__description > div.row div.col-sm-7 p'
      }
    })
  }

  refine(item) {
    item.description = this.clean(item.description)
    item.date = Chrono.parseDate(this.clean(item.date) + ' ago')
    item.title = this.clean(item.title)
  }
}