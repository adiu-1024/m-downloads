#### Installation and import
* Using npm
  ```cmd
  npm install m-downloads
  ```

* Using yarn
  ```cmd
  yarn add m-downloads
  ```

#### Use examples
* GET request
  ```JS
  const downloader = new Download('/api/download', {
    method: 'GET',
    filename: 'Custom file name',
  })
  downloader
    .catch(error => { console.log(error) })
    .finally(() => console.log('A successful or failed operation, such as the handling of loading'))
  ```
  Note: if a custom file name is specified, the filename value in the response header Content-Disposition will be ignored

* POST request
  ```JS
  const downloader = new Download({
    authName: 'TOKEN',
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
    method: 'GET',
    getProgress(percentage) {
      console.log(`Download progress：${percentage}`)
    }
  })
  downloader
    .catch(error => { console.log(error) })
    .finally(() => console.log('A successful or failed operation, such as the handling of loading'))
  ```
  Note: you need to read the Content-Length field of the server response header to get the total size of the downloaded file

* Other configuration instructions
  ```JS
  {
    authName: 'TOKEN'  // Specifies the name of the field where the token is stored locally. The default value is 'TOKEN'
  }
  ```

* Examples of comprehensive use
  ```JS
  import Download from 'm-downloads'

  const BASE = '/api'

  const m = new Map()
  // Video - export workload
  m.set('video_workload', '/download/video/workload')
  // Video - export order
  m.set('video_order', '/download/video/order')
  // Video - export material
  m.set('video_material', '/download/video/material')

  const download = (key, config) => new Download(`${BASE}${m.get(key)}`, config)

  export default download
  ```
  ```JS
  const downloader = download(type, {
    authName: 'TOKEN',
    data: { id: 5, type: 1 },
  })
  downloader
    .catch(error => { console.log(error) })
    .finally(() => console.log('A successful or failed operation, such as the handling of loading'))
  ```
