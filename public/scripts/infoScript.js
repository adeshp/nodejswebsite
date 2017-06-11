$(function () {
    $.getJSON('infoapi', getMyInfo);
    function getMyInfo(data) {
        var output = "";
        $.each(data, function (key, item) {
            //output += '<p>'+item.name+'</p>';
            output += '<ul class="list-group">'; 
            output += '<li class="list-group-item"><i class="glyphicon glyphicon-education"></i> Education<ul class="list-group"><li class="list-group-item"><i>Alma mater</i> : '+item.University+'&nbsp;<a href="https://science.iit.edu/computer-science" target="_blank"><span class="glyphicon glyphicon-link"></span></a>'+'</li><li class="list-group-item"><i>Degree</i> : ' + item.Degree + '</li><li class="list-group-item"><i>Field</i> : ' + item.Area_other + '</li><li class="list-group-item"><i>Class of</i> : ' + item.Graduation_year + ' '+item.End_Semester+'</li></li><li class="list-group-item"><i>Linkedin</i> : <a href="https://www.linkedin.com/in/akshaydeshpande64" alt="Link" target="_blank">'+item.linkedin_url+'</a></li>';
            output += '</ul>'
        });
        $('.list-group1').html(output);
    }
});