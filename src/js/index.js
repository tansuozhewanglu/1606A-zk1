//动态渲染页面
$(function() {
    $('#inp').on('input', function() {
        var val = $(this).val();
        if (!val) {
            $('.list-tal').html('');
            return;
        } else {
            $.ajax({
                url: '/api/list?key=' + val,
                dataType: 'json',
                success: function(res) {
                    if (res.code === 1) {
                        var html = '';
                        res.data.forEach(function(item) {
                            html += '<li>' + item.title + '</li>';
                        })
                        $('.list-tal').html(html);
                    }
                }

            })
        }
    })
})