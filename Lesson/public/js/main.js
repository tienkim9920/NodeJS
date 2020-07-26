$(document).ready(() => {
    $('#clickUsers').on('click', (e) => {
        $target = $(e.target)
        if ($target.attr('data-id') !== '5f09dcc3ee12e72b184fc496'){
            alert("Bạn Không Có Quyền Truy Cập Vào Trang Này!")
        }
    })


})

var temp = window.location.href.split('=');

var pageClick = document.getElementsByClassName('pageClick')

console.log(temp.length)

if (temp.length < 2){
    pageClick[0].setAttribute('style', 'color: #ffffff; background-color: dodgerblue')
}

for (var i = 0; i < pageClick.length; i++){
    if ((i + 1) === parseInt(temp[1])){
        pageClick[i].setAttribute('style', 'color: #ffffff; background-color: dodgerblue')
    }
}