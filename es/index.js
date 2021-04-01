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
      const { ok, status, statusText } = response
      if (!ok) {
        return Promise.reject({ status, statusText })
      } else {
        return response
      }
    }).then(async response => {
      try {
        if (aside.method === 'POST') {
          const { status, msg } = await response.clone().json()
          return Promise.reject({ status, statusText: msg })
        } else {
          return response
        }
      } catch (error) {
        filename = filename || decodeURI(response['headers'].get('Content-Disposition').split('filename=')[1])
        return response.clone()
      }
    }).then(async response => {
      if (typeof getProgress !== 'function') {
        this.saveAs(await response.blob(), filename)
        return Promise.reject({ status: 200, statusText: 'No need to get download progress.'})
      } else {
        const { headers, body: stream } = response
        const totalSize = headers.get('Content-Length') || 0
        if (totalSize === 0) {
          return Promise.reject({ status: 400, statusText: 'Missing file size for Content-Length field.'})
        }
        const reader = stream.getReader()
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
