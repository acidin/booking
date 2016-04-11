import './login/login.styl'

(function () {
  var name = document.getElementById('login-name')
  var form = document.getElementById('form')
  form.addEventListener('submit', function (e) {
    if (name.value.trim() === '') {
      alert('请输入用户名')
      name.focus()
      e.preventDefault()
    }
  })
})()