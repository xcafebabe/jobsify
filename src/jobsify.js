import Xray from 'x-ray'
import WeWorkRemotely from './providers/weworkremotely.com.js'

const providers = {
  wework: new WeWorkRemotely()
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

      this.updateStatus('ready')

      //We are not doing nothing with payload,
      //Usually input should be an inject node with a timestamp
      this.on('input', msg => {
        let time = new Date().getTime()

        this.updateStatus('started', 'green')

        this._scrap(this.url, this.provider.scope, [this.provider.selectors])
          .paginate(this.provider.pagination)
          .limit(10)((err, items) => {
            if (err) {
              this.updateStatus('error', 'red')
              msg.payload = err
              this.error('Error ocurred during scrapping', {payload: err})
              return false
            }

            //Disguise averagues and extra format!
            this.provider.disguise(items)
            //Filter Items
            let filteredItems = this.keywords ? this.provider.filter(items, { excludeByKeywords: this.keywords}) : this.items
            this.send({
              payload: filteredItems
            })
            this.updateStatus('success', 'green')
          })

        setTimeout(() => {
          this.updateStatus('ready')
        }, 1000)
      })
    }

    updateStatus(text, color) {
      let selectedColor = color || 'grey'
      this.status({ fill: selectedColor, shape: 'ring', text: text })
    }
  }
  RED.nodes.registerType('jobsify', JobsifyNode)
}