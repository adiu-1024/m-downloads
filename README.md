#### Installing
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
  import Download from 'm-downloads'

  const m = new Map()
  m.set('POST', (url, options) => {
    const { data = {}, headers = {}, ...config } = options
    Object.assign(config, {
      url,
      body: data ? JSON.stringify(data) : null,
      headers: {
        ...headers,
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': localStorage.getItem('AUTH-TOKEN'),
      },
    })
    return config
  })
  m.set('GET', (url, options) => ({ url, ...options }))

  const handler = {
    construct(target, [url, options] = args) {
      const method = options.method ? options.method.toUpperCase() : 'GET'
      return new target(m.get(method)(url, options))
    }
  }
  const ProxyDownload = new Proxy(Download, handler)
  export default ProxyDownload
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
  const downloader = new Download('/api/download', {
    method: 'POST',
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

* Capturing JSON errors in server response
  ```JSON
  {
    "status": 500,
    "msg": "The amount of data is too large. It is recommended to export splitting conditions in batches",
  }
  ```
  ```JS
  const downloader = new Download('/api/download', {
    method: 'POST',
    data: { id: 5, type: 1 },
  })
  downloader
    .catch(error => {
      console.log('errorMsg', error.statusText)
    })
  ```
