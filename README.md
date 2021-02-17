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
  import download from 'm-downloads'
  ```

#### Use examples
* GET request
  ```JS
  download('/download', {
    method: 'GET',
    filename: 'Custom file name',
  })
  .catch(error => { console.log(error) })
  .finally(() => console.log('A successful or failed operation, such as the handling of loading'))
  ```
  Note: if a custom file name is specified, the filename value in the response header Content-Disposition will be ignored

* POST request
  ```JS
  download({
    url: '/download',
    data: { id: 5, type: 1 },
  })
  .catch(error => { console.log(error) })
  .finally(() => console.log('A successful or failed operation, such as the handling of loading'))
  ```

* Get download progress
  ```JS
  download('/download', {
    method: 'GET',
    getProgress(percentage) {
      console.log(`Download progress：${percentage}`)
    }
  })
  .catch(error => { console.log(error) })
  .finally(() => console.log('A successful or failed operation, such as the handling of loading'))
  ```
  Note: you need to read the Content-Length field of the server response header to get the total size of the downloaded file

* Other configuration instructions
  ```JS
  {
    authorization: true,  // Whether token authentication is required. The default value is true
    tokenName: 'TOKEN'  // Specifies the name of the field where the token is stored locally. The default value is 'TOKEN'
  }
  ```
  
 #### 安装以及导入
 * npm 安装方式
   ```cmd
   npm install m-downloads
   ```
 
 * yarn 安装方式
   ```cmd
   yarn add m-downloads
   ```
 
 * ES 导入方式
   ```JS
   import download from 'm-downloads'
   ```
 
 #### 使用示例
 * GET请求
   ```JS
   download('/download', {
     method: 'GET',
     filename: '自定义文件名称',
   })
   .catch(error => { console.log(error) })
   .finally(() => console.log('成功或失败都进行的操作，如：loading的处理'))
   ```
   说明：如果指定了自定义文件名称，则会忽略响应头信息 Content-Disposition 中的 filename 值
 
 * POST请求
   ```JS
   download({
     url: '/download',
     data: { id: 5, type: 1 },
   })
   .catch(error => { console.log(error) })
   .finally(() => console.log('成功或失败都进行的操作，如：loading的处理'))
   ```
 
 * 获取进度
   ```JS
   download('/download', {
     method: 'GET',
     getProgress(percentage) {
       console.log(`下载进度：${percentage}`)
     }
   })
   .catch(error => { console.log(error) })
   .finally(() => console.log('成功或失败都进行的操作，如：loading的处理'))
   ```
   说明：需读取服务端响应头 Content-Length 字段，来获取下载文件的总大小
 
 * 其它配置说明
   ```JS
   {
     authorization: true,  // 是否需要 token 鉴权，默认值为 true
     tokenName: 'TOKEN'  // 指定本地存储 token 的字段名称，默认值为 'TOKEN'
   }
   ```
   