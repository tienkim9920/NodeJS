$(document).ready(() => {
    $('#clickUsers').on('click', (e) => {
        $target = $(e.target)
        if ($target.attr('data-id') !== '5f09dcc3ee12e72b184fc496'){
            alert("Bạn Không Có Quyền Truy Cập Vào Trang Này!")
        }
    })
})
