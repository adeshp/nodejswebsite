$(function ()
    {
    $.getJSON('api', updateFeedback);
    $('.feedback-form').submit(function (e) {
        e.preventDefault();
        $.post('api', {
            Name : $('#name').val(),
            Email : $('#email').val(),
            Feedback : $('#msg').val(),
            Like : $('input:radio[name=Like]:checked').val()
        }, updateFeedback);
    
    })

    function updateFeedback(data)
    {
        var output = "";
        $.each(data, function (key, item) {
            var bc = '<i class="glyphicon glyphicon-picture" data-toggle="tooltip" title="No feedback image submitted."></i>';
            if (item.Like == "good")
                bc = '<i><img src="/images/f_good.png" alt="Good" data-toggle="tooltip" title="Keep Working" width=20/></i>';
            else if (item.Like == "avg")
                bc = '<i><img src="/images/f_avg.png" alt="Good" data-toggle="tooltip" title="Keep Working" width=20/></i>';
            else if (item.Like == "bad")
                bc = '<i><img src="/images/f_bad.png" alt="Good" data-toggle="tooltip" title="Keep Working" width=20/></i>';
            output += '    <div style="background-color:#e1e9ee; margin-left : 8px; margin-top : 20px; margin-bottom: 20px; padding: 8px 12px; border-radius: 8px">';
        output += '    <div class="media">';
        output+='        <div class="media-left">';
        output+='            <img src="/images/avatar.png" class="media-object" style="width:60px">';
        output+='       </div>';
        output+='        <div class="media-body">';
        output+='         <h4 class="media-heading">'+item.Name+'&nbsp;'+bc+'</h4>';
        output+='            <p>'+item.Feedback+'</p>';
        output+='        </div>';
        output+='    </div>';
        output+='        </div>';
        });
        $('.feedback-messages').html(output);
    }
});