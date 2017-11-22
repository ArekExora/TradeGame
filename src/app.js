var React = require('react');

require('file-loader?name=index.html!./index.html');

if (module.hot) {
    module.hot.accept();
}

var hello = document.getElementById('container');
hello.innerHTML = 'Holi!';