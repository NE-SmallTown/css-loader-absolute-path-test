import './index.less';

render();

console.log(1);

function render () {
    const div = document.createElement('div');
    div.innerHTML = '<h1>Hello world icon：<i class="ne-modal icon-chenggong"></i> <div class="img"></div></h1>';
    document.body.appendChild(div);
}