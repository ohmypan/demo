<%--
  Created by IntelliJ IDEA.
  User: bigboom
  Date: 2018/8/26
  Time: 11:33
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
<body>
<h1>hello world</h1>
账号：<input id="name" type="text"/>
密码：<input id="password" type="password"/>
<input id="btnA" type="button" value="登录"/>
</body>
<script>
    $(document).ready(function(){
    });
    jQuery("#btnA").click(function(){
        console.log(jQuery("#name").val()) ;
        console.log(jQuery("#password").val()) ;
        var data={};
        data.userName=jQuery("#name").val();
        data.password=jQuery("#password").val();
        $.ajax({
            type: 'POST',
            url: '/login/doLogin',
            data: data,
            success: function () {
                alert(1);
            },
            dataType: JSON
        });
    });

</script>
</html>
