class Download {
  constructor(config) {
    if (typeof config === 'string') {
      config = Object.assign({}, { url: arguments[0] }, arguments[1])
    }
    this.$options = config
    return this.fetchFile()
  }
  saveAs(data, filename) {
    const blob = data instanceof Blob ? data : new Blob(data)
    const el = document.createElement('a')
    el.download = filename
    el.href = URL.createObjectURL(blob)
    el.dispatchEvent(new MouseEvent('click'))
    URL.revokeObjectURL(el.href)
  }
  fetchFile() {
    let { url, filename = null, getProgress = null, ...aside } = this.$options
    return fetch(url, {
      mode: 'cors',
      credentials: 'same-origin',
      ...aside
    }).then(response => {
      const { ok, status, statusText, headers } = response
      if (!ok) {
        return Promise.reject({ status, statusText })
      } else {
        filename = filename || decodeURI(headers.get('Content-Disposition').split('filename=')[1])
        return response
      }
    }).then(async response => {
      if (typeof getProgress !== 'function') {
        try {
          const { status, msg } = await response.clone().json()
          return Promise.reject({ status, statusText: msg })
        } catch (error) {
          this.saveAs(await response.clone().blob(), filename)
          return Promise.reject({ status: 200, statusText: 'No need to get download progress.'})
        }
      } else {
        return response
      }
    }).then(async response => {
      const { headers, body: stream } = response
      const totalSize = headers.get('Content-Length') || 0
      if (totalSize === 0) {
        return Promise.reject({ status: 400, statusText: 'Missing file size for Content-Length field.'})
      }
      const reader = stream.getReader()
      return { totalSize, reader }
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
