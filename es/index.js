class Download {
  static DEFAULTS = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }
  constructor(config) {
    const args = Array.from(arguments)
    if (typeof config === 'string') {
      config = args[1] || {}
      config.url = args[0]
    } else {
      config = config || {}
    }
    config.data = config.data ? JSON.stringify(config.data) : null
    this.$options = Object.assign({}, Download.DEFAULTS, config)
    return this.fetchFile()
  }
  async saveAs(data, filename) {
    const blob = data instanceof Blob ? data : new Blob(data)
    const a = document.createElement('a')
    a.download = filename
    a.href = URL.createObjectURL(blob)
    await a.dispatchEvent(new MouseEvent('click'))
    await URL.revokeObjectURL(a.href)
  }
  fetchFile() {
    let {
      url, method, headers, data, filename = '', authName = null, getProgress = null
    } = this.$options
    authName && Object.assign(headers, { 'Authorization': localStorage.getItem(authName) })
    return fetch(url, {
      method,
      headers,
      body: data,
      mode: 'cors',
      credentials: 'same-origin'
    }).then(res => {
      if (!res.ok) {
        return Promise.reject({ status: res.status, statusText: res.statusText })
      } else {
        filename = filename || decodeURI(res['headers'].get('Content-Disposition').split('filename=')[1])
        return res
      }
    }).then(async res => {
      if (typeof getProgress !== 'function') {
        this.saveAs(await res.blob(), filename)
        return Promise.reject({ status: 200, statusText: 'No need to get download progress'})
      } else {
        const totalSize = res['headers'].get('Content-Length') || 0
        if (totalSize === 0) {
          return Promise.reject({ status: 400, statusText: 'Missing Content-Length field'})
        }
        const reader = res.body.getReader()
        return { totalSize, reader }
      }
    }).then(async ({ totalSize, reader }) => {
      let receiveSize = 0, chunks = []
      while(true) {
        const { done, value } = await reader.read()
        if (!done) {
          chunks.push(value)
          receiveSize += value.length
          getProgress(Number((receiveSize / totalSize * 100).toFixed(2)))
        } else {
          break
        }
      }
      this.saveAs(chunks, filename)
    })
  }
}

export default Download
