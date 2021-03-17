class Download {
  constructor(config) {
    if (typeof config === 'string') {
      config = Object.assign({}, { url: arguments[0] }, arguments[1])
    }
    this.$options = config
    return this.fetchFile()
  }
  async saveAs(data, filename) {
    const blob = data instanceof Blob ? data : new Blob(data)
    const el = document.createElement('a')
    el.download = filename
    el.href = URL.createObjectURL(blob)
    await el.dispatchEvent(new MouseEvent('click'))
    await URL.revokeObjectURL(el.href)
  }
  fetchFile() {
    let { url, filename = null, getProgress = null, ...opts } = this.$options
    return fetch(url, {
      mode: 'cors',
      credentials: 'same-origin',
      ...opts
    }).then(response => {
      if (!response.ok) {
        return Promise.reject({ status: response.status, statusText: response.statusText })
      } else {
        filename = filename || decodeURI(response['headers'].get('Content-Disposition').split('filename=')[1])
        return response
      }
    }).then(async response => {
      if (typeof getProgress !== 'function') {
        this.saveAs(await response.blob(), filename)
        return Promise.reject({ status: 200, statusText: 'No need to get download progress.'})
      } else {
        const totalSize = response['headers'].get('Content-Length') || 0
        if (totalSize === 0) {
          return Promise.reject({ status: 400, statusText: 'Missing file size for Content-Length field.'})
        }
        const reader = response.body.getReader()
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
