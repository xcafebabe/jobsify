import Xray from 'x-ray'
import WeWorkRemotely from './providers/weworkremotely.com.js'
import StackOverflow from './providers/stackoverflow.com.js'
import BerlinStartup from './providers/berlinstartupjobs.com.js'
import GithubJobs from './providers/github.com.js'

const providers = {
  wework: new WeWorkRemotely(),
  stack: new StackOverflow(),
  berlin: new BerlinStartup(),
  github: new GithubJobs()
}

export default (RED) => {
  class JobsifyNode {
    constructor(n) {
      RED.nodes.createNode(this, n)

      this.name = n.name
      this.url = n.url
      this.provider = providers[n.provider]
      this._scrap = Xray().delay(n.delay).timeout(n.timeout)
      this.keywords = n.keywords
      this.topic = n.topic

      this.updateStatus('ready')

      //Usually input should be an inject node with a timestamp
      this.on('input', msg => {
        this.updateStatus('started', 'green')

        this._scrap(this.url, this.provider.scope, [this.provider.selectors])
          .paginate(this.provider.pagination)((err, items) => {
            if (err) {
              this.updateStatus('error', 'red')
              this.error('Error ocurred during scrapping', {payload: err})
              return false
            }

            //Disguise averagues and extra format!
            this.provider.disguise(items)
            console.log(items)
            //Filter Items
            let filteredItems = this.keywords ? this.provider.filter(items, { excludeByKeywords: this.keywords}) : this.items
            this.send({
              payload: filteredItems,
              topic: this.topic,
              provider: n.provider
            })
            this.updateStatus('success', 'green')
          })
      })
    }

    updateStatus(text, color) {
      let selectedColor = color || 'grey'
      this.status({ fill: selectedColor, shape: 'ring', text: text })
    }
  }
  RED.nodes.registerType('jobsify', JobsifyNode)
}