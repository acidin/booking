/**
 * @author huntbao
 */
export default {
    cookie: (function () {
        var cookies
        return function (name, c, C, i) {
            if (cookies) {
                return cookies[name]
            }
            c = document.cookie.split(' ')
            cookies = {}
            for (i = c.length - 1; i >= 0; i--) {
                C = c[i].split('=')
                cookies[C[0]] = C[1]
            }
            return cookies[name]
        }
    })()
}
