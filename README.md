#### Installation
* Using npm
  ```cmd
  npm install m-downloads
  ```

* Using yarn
  ```cmd
  yarn add m-downloads
  ```

#### Use examples
* Proxy interception
  ```JS
  import Download from 'm-download'
  const handler = {
    construct(target, args) {
      if (typeof args[0] === 'string') {
        args = Object.assign({}, { url: args[0] }, args[1])
      }
      if (args.method === 'POST') {
        const { data = {}, headers = {}, ...config } = args
        config.body = data ? JSON.stringify(data) : null
        config.headers = Object.assign(headers, {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': localStorage.getItem('AUTH-TOKEN')
        })
        return new target(config)
      }
    }
  }
  const ProxyDownload = new Proxy(Download, handler)
  export { Download, ProxyDownload }
  ```

* GET request
  ```JS
  const downloader = new Download('/api/download', {
    filename: 'Custom file name'
  })
  downloader
    .catch(error => { console.log(error) })
    .finally(() => console.log('A successful or failed operation, such as the handling of loading'))
  ```
  Note: if a custom file name is specified, the filename value in the response header Content-Disposition will be ignored

* POST request
  ```JS
  const downloader = new ProxyDownload({
    method: 'POST',
    url: '/api/download',
    data: { id: 5, type: 1 },
  })
  downloader
    .catch(error => { console.log(error) })
    .finally(() => console.log('A successful or failed operation, such as the handling of loading'))
  ```

* Get download progress
  ```JS
  const downloader = new Download('/api/download', {
    getProgress(percentage) {
      console.log(`Download progress：${percentage}`)
    }
  })
  downloader
    .catch(error => { console.log(error) })
    .finally(() => console.log('A successful or failed operation, such as the handling of loading'))
  ```
  Note: you need to read the Content-Length field of the server response header to get the total size of the downloaded file

* Examples of comprehensive use
  ```JS
  const BASE = '/api'

  const m = new Map()
  // Video - export workload
  m.set('video_workload', '/download/video/workload')
  // Video - export order
  m.set('video_order', '/download/video/order')
  // Video - export material
  m.set('video_material', '/download/video/material')

  const download = (key, config) => new ProxyDownload(`${BASE}${m.get(key)}`, config)

  export default download
  ```
  ```JS
  const downloader = download(type, {
    method: 'POST',
    data: { id: 5, type: 1 },
  })
  downloader
    .catch(error => { console.log(error) })
    .finally(() => console.log('A successful or failed operation, such as the handling of loading'))
  ```
