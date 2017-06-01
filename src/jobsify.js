import Xray from 'x-ray'
import WeWorkRemotely from './providers/weworkremotely.com.js'
import StackOverflow from './providers/stackoverflow.com.js'
import BerlinStartup from './providers/berlinstartupjobs.com.js'
import GithubJobs from './providers/github.com.js'
import Domestika from './providers/domestika.org.js'
import RemoteOk from './providers/remoteok.io.js'
import SmashingMagazine from './providers/smashingmagazine.com.js'
import AuthenticJobs from './providers/authenticjobs.com.js'
import NewItJobs from './providers/newitjobs.com.js'
import RemoteLane from './providers/remotelane.com.js'

const providers = {
  wework: new WeWorkRemotely(),
  stack: new StackOverflow(),
  berlin: new BerlinStartup(),
  github: new GithubJobs(),
  dmtk: new Domestika(),
  rmtk: new RemoteOk(),
  smash: new SmashingMagazine(),
  ajob: new AuthenticJobs(),
  newjob: new NewItJobs(),
  rmtlane: new RemoteLane()
}

export default (RED) => {
  class JobsifyNode {
    constructor(n) {
      RED.nodes.createNode(this, n)

      this.name = n.name
      this.url = n.url
      this.provider = providers[n.provider]
      this._scrap = Xray()
        .delay(n.delay)
        .timeout(n.timeout)

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
            //Filter Items
            let filteredItems = this.keywords ? this.provider.filter(items, { excludeByKeywords: this.keywords}) : items
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