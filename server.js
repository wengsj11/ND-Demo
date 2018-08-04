const http = require('http');
const fs = require('fs');//引入文件读取模块

let server= http.createServer(function(req,res){
    // 设置允许被跨域访问
    res.setHeader('Access-Control-Allow-Origin', '*');
    //客户端输入的url，例如如果输入localhost:8888/index.html
    //那么这里的url == /index.html

    console.log(req.url);
    let file = req.url;
    fs.readFile(__dirname + file , function(err,data){
    /*
        一参为文件路径
        二参为回调函数
            回调函数的一参为读取错误返回的信息，返回空就没有错误
            二参为读取成功返回的文本内容
    */
        if(err){
            res.writeHeader(404,{
                'content-type' : 'text/html;charset="utf-8"'
            });
            res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
            res.end();
        }else{
            res.write(data);//将index.html显示在客户端
            res.end();
        }
    });
}).listen(8888);
console.log('port8888服务器开启成功');