#### Installation and import
* Using npm
  ```cmd
  npm install m-downloads
  ```

* Using yarn
  ```cmd
  yarn add m-downloads
  ```

* ES6 import mode
  ```JS
  import Download from 'm-downloads'
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
    authName: 'ctoken',
    data: { id: 5, type: 1 },
  })
  downloader
    .catch(error => { console.log(error) })
    .finally(() => console.log('成功或失败都进行的操作，如：loading的处理'))
  ```


#### 使用示例
* GET请求
  ```JS
  const downloader = new Download('/api/download', {
   method: 'GET',
   filename: '自定义文件名称',
  })
  downloader
   .catch(error => { console.log(error) })
   .finally(() => console.log('成功或失败都进行的操作，如：loading的处理'))
  ```
  说明：如果指定了自定义文件名称，则会忽略响应头信息 Content-Disposition 中的 filename 值

* POST请求
  ```JS
  const downloader = new Download({
   authName: 'TOKEN',
   url: '/api/download',
   data: { id: 5, type: 1 },
  })
  downloader
   .catch(error => { console.log(error) })
   .finally(() => console.log('成功或失败都进行的操作，如：loading的处理'))
  ```

* 获取进度
  ```JS
  const downloader = new Download('/api/download', {
   method: 'GET',
   getProgress(percentage) {
     console.log(`下载进度：${percentage}`)
   }
  })
  downloader
   .catch(error => { console.log(error) })
   .finally(() => console.log('成功或失败都进行的操作，如：loading的处理'))
  ```
  说明：需读取服务端响应头 Content-Length 字段，来获取下载文件的总大小

* 其它配置说明
  ```JS
  {
    authName: 'TOKEN'  // 指定本地存储 token 的字段名称
  }
  ```

* 综合使用实例
  ```JS
  import Download from 'm-downloads'

  const BASE = '/api'

  const m = new Map()
  // 视频 - 导出工作量
  m.set('video_workload', '/download/video/workload')
  // 视频 - 导出订单
  m.set('video_order', '/download/video/order')
  // 视频 - 导出素材
  m.set('video_material', '/download/video/material')

  const download = (key, config) => new Download(`${BASE}${m.get(key)}`, config)

  export default download
  ```
  ```JS
  const downloader = download(type, {
    authName: 'ctoken',
    data: { id: 5, type: 1 },
  })
  downloader
    .catch(error => { console.log(error) })
    .finally(() => console.log('成功或失败都进行的操作，如：loading的处理'))
  ```
