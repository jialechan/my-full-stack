class Util {
  // 访问登录页
  gotoLoginPage() {
    window.location.replace('/')
  }

  // sha256算法，把字符串算出一个64长度的字符串
  async sha265(message) {
    const encoder = new TextEncoder()
    const data = encoder.encode(message)
    const hash = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hash)) // convert buffer to byte array
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('') // convert bytes to hex string
    return hashHex
  }
}
const util = new Util()
export default util
