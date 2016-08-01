import './login/login.styl'

(function () {
    var name = document.getElementById('login-name')
    var form = document.getElementById('form')
    form.addEventListener('submit', function (e) {
        if (name.value.trim() === '') {
            alert('Name must be not empty')
            name.focus()
            e.preventDefault()
        }
    })
})()