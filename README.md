Node-Red-Contrib Jobsify
========================

Node-red-contrib module to help you create email alerts with job search results from different job website platforms.

It will scrap supported job portals and will give you a fancy list with usefull data able to send by email or telegram, save in a file or a mongodb collection.

Is it based on [maester](https://github.com/xcafebabe/maester)

Job Portals Currently supported:

- https://weworkremotely.com
- https://stackoverflow.com/jobs
- https://berlinstartupjobs.com
- https://jobs.github.com
- https://remoteok.io
- https://domestika.org
- https://jobs.smashingmagazine.com
- https://authenticjobs.com
- https://www.newitjobs.com


For the moment the only way to install this node is with some development mojo. If someone is interested to include more job portals, just open an issue with your request, suggestions & critics are welcome as well.

Usage
-----

If you want to try it out

```
git clone https://github.com/xcafebabe/jobsify && \
docker-compose up -d && \
firefox http://localhost:1880
```
After seeing in your browser Node-Red Main page, import this [flow](https://raw.githubusercontent.com/jobsify/master/examples/example1.json).

You will get a flow like this

<a href="https://github.com/xcafebabe/jobsify/raw/master/examples/example1a.png" target="_blank">
  <img alt="Jobsify" src="https://github.com/xcafebabe/jobsify/raw/master/examples/example1a.png" width="600px" />
</a>

Now just add some extra nodes to do what you want with data.

Nice To Have
------------

- Url Template. (No need to enter full search url from selected job portal)
- Support Job Portals based on Javascript. (Use PhantomJs to scrap websites)
- Test Environment and Unit tests.