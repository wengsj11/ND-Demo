//全局json数据对象
let workdata = [];
let my_work = [];
let class_work = [];

//当前分页
const pageSize = 8;
let pageNum = 1;
let totalPage;  //页数
let initDageDisplay = null;

let contentNone = document.getElementsByClassName("content-none")[0];
let content = document.getElementsByClassName("content")[0];


// 对json数据分类
function classifyData(works) {
    my_work = [];
    class_work = [];
    for (let j = 0; j < works.length; j++) {
        let work = works[j];
        if(work.type === "my"){
            my_work.push(work);
        } else if(work.type === "class"){
            class_work.push(work);
        }
    }
}

//根据当前侧边栏, 标签页，分页展示数据
function showData(tab_id, pageSize, pageNum) {

    let side_li = document.getElementsByClassName("sidebar-list")[0].getElementsByClassName("active")[0];
    let works = workdata[side_li.id];
    // 判断数据是否为空
    if(works == null){
        contentNone.style.display = 'block';
        content.style.display = 'none';
        return;
    } else {
        content.style.display = 'flex';
        contentNone.style.display = 'none';
    }

    // console.info(works);
    // 对json数据进行分类
    classifyData(works);
    //分页样式
    if(initDageDisplay ===null){
        initDageDisplay = pageDisplay();
    }
    let start = (pageNum - 1) * pageSize;
    let end = pageSize + start;

    let tpl = document.getElementById("item-tpl").innerHTML;
    let items = document.getElementsByClassName("items")[0];
    //清除模板html内容
    items.innerHTML = "";

    if(tab_id === "my"){

        for (let i = start; i < end && i< my_work.length; i++) {
            let html = tpl;
            html = html.replace("{{title}}", my_work[i].workTitle);
            html = html.replace("{{img}}", my_work[i].pic);
            html = html.replace("{{author}}", my_work[i].author);
            html = html.replace("{{time}}", my_work[i].time);
            items.innerHTML += html;
        }

    } else if(tab_id === "class") {

        for (let i = start; i < end && i<class_work.length; i++) {
            let html = tpl;
            html = html.replace("{{title}}", class_work[i].workTitle);
            html = html.replace("{{img}}", class_work[i].pic);
            html = html.replace("{{author}}", class_work[i].author);
            html = html.replace("{{time}}", class_work[i].time);
            items.innerHTML += html;
        }
    }
    let pre = document.getElementById("page-pre");
    let next = document.getElementById("page-next");
    pre.style.display = 'block';
    next.style.display = 'block';
    //判断当前是否可以翻页
    if(pageNum === 1){
        pre.style.display = 'none';
    }
    if(pageNum === totalPage){
        next.style.display = 'none';
    }
}


//侧边栏切换、
let list = document.getElementsByClassName("sidebar-list")[0].getElementsByTagName("li");
for (let i = 0; i < list.length; i++) {
    let li = list[i];
    li.onclick = function () {
        for (let i = 0; i < list.length; i++) {
            list[i].classList.remove("active");
        }
        this.classList.add('active');
        //展示数据
        showData("my", pageSize, 1);
        //刷新分页样式
        initDageDisplay = pageDisplay();
        // 直接调用分页刷新数据，点击第一页
        document.getElementById("1").click();
    }
}

//Tab标签页切换、
let items = document.getElementsByClassName("work-item");
for (let i = 0; i < items.length; i++) {
    let item = items[i];
    item.onclick = function () {
        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove("active");
        }
        this.classList.add('active');
        //刷新分页样式
        initDageDisplay = pageDisplay();

        //展示数据
        showData(this.id, pageSize, 1);
    }
}

//分页功能、
function pageClick(box) {
    let boxs = document.getElementsByClassName("page-box");
    for (let i = 0; i < boxs.length; i++) {
        boxs[i].classList.remove("select");
    }
    box.classList.add('select');

    pageNum = parseInt(box.innerHTML);
    // 当前标签页
    let tab = document.getElementsByClassName("nav-left")[0].getElementsByClassName("active")[0];
    //展示数据
    showData(tab.id, pageSize, pageNum);
}

//翻页
function pre() {
    if(pageNum-1 > 0){
        pageNum--;
    }
    //展示数据
    document.getElementById(pageNum).click();
}
function next() {
    if(pageNum+1 <= 100){
        pageNum++;
    }
    document.getElementById(pageNum).click();
}

//分页样式逻辑
function pageDisplay(){
    let tab = document.getElementsByClassName("nav-left")[0].getElementsByClassName("active")[0];
    if(tab.id === "my"){
        totalPage = my_work.length % pageSize === 0 ? my_work.length / pageSize : parseInt(my_work.length / pageSize +1);
    }else if(tab.id === "class"){
        totalPage = class_work.length % pageSize === 0 ? class_work.length / pageSize : parseInt(class_work.length / pageSize +1);
    }
    if(totalPage === 0){
        totalPage = 1;
    }

    let page_html = "<a href='#' class='page-box-arr' id='page-pre' onclick='pre();'>&lt;</a><a href='#' class='page-box select' id='1' onclick='pageClick(this)'>1</a>";

    for (let i = 1; i < totalPage; i++) {
        page_html += "<a href='#' class='page-box' id='"+(i+1)+"'onclick='pageClick(this)'>"+ (i+1) +"</a>";
    }
    page_html += "<a href='#' class='page-box-arr' id='page-next' onclick='next();'>&gt;</a>";

    document.getElementsByClassName("page")[0].innerHTML = page_html;
}


//搜索功能
let search_btn = document.getElementById("content-search");
search_btn.onclick = function () {
    // TODO
    //暂时想到的方法是先用正则对数据进行过滤，然后再调用showdata对数据渲染。

};

//新建作品modal
let newButton = document.getElementById("new-btn");
newButton.onclick = function newwork() {
    let modal = document.getElementsByClassName('modal');
    modal[0].style.display = 'flex';

    //清除input
    document.submitForm.res.value='';


    //添加modal背景
    let div = document.createElement("div");
    div.setAttribute("class", "modal-bg");
    document.body.appendChild(div);
};

//关闭新建作品modal
let modalClose = document.getElementById("modal-close");
modalClose.onclick = function(){
    let modal = document.getElementsByClassName('modal');
    modal[0].style.display = 'none';
    let div = document.getElementsByClassName('modal-bg');
    document.body.removeChild(div[0]);
};

// 添加作者modal
let addButton = document.getElementById("btn_add");
addButton.onclick =function(){
    let modal_side = document.getElementsByClassName('modal-side');
    modal_side[0].style.display = 'flex';
    let div = document.getElementsByClassName('modal-bg');
    div[0].style.zIndex = "1060";
};

//关闭添加作者modal
let modalSideClose = document.getElementById("modal-side-close");
modalSideClose.onclick = function(){
    let modal = document.getElementsByClassName('modal-side');
    modal[0].style.display = 'none';
    let div = document.getElementsByClassName('modal-bg');
    div[0].style.zIndex = "1040";
};

// 添加作者
let addName = document.getElementById("addName");
addName.onclick = function () {
    moveOption(document.getNameForm.list1, document.getNameForm.list2);
};

// 删除作者
let deleteName = document.getElementById("deleteName");
deleteName.onclick = function () {
    moveOption(document.getNameForm.list2, document.getNameForm.list1);
};

//实现selector左边移到右边
function moveOption(list1, list2){
    for (let i = 0; i <list1.options.length; i++) {
        if(list1.options[i].selected){
            let item = list1.options[i];
            list2.options.add(new Option(item.text, item.value));
            list1.remove(i);
            i = i -1;
        }
    }
}

//获取selector选择的名字
let getNames = document.getElementById("getNames");
getNames.onclick = function () {
    let allNames = "";
    let allNamesVal = [];
    let list2 = document.getNameForm.list2;
    for(let i = 0;i < list2.options.length;i++){
        allNames += "<div style='display: inline-block; padding: 0 5px'>"+ list2.options[i].value + "<img src='assets/img/author_del.png' onclick='deleteNameInput(this)'></div>";
        allNamesVal.push(list2.options[i].value);
    }
    document.getElementById("form-author").innerHTML = allNames;
    document.getElementById("input-author").value = allNamesVal.toString();
    document.getElementById("modal-side-close").click();
};

//删除作者名字按钮
function deleteNameInput(obj){
    //删除元素
    let parent = obj.parentNode;
    let grandparent = obj.parentNode.parentNode;
    grandparent.removeChild(parent);
    //TODO 删除input值
    let value = obj.parentNode.innerText;

}
//表单提交
let modal_form_submit = document.getElementById("modal-form-submit");
modal_form_submit.onclick = function () {
    let submitForm = document.submitForm;

    let res = submitForm.res;
    let author = submitForm.author;
    let pic = submitForm.pic;
    let intro = submitForm.intro;
    //表单校验
    if (!validate_required(res,'资源名称不能为空') || !validate_maxLength(res,'资源名称长度不能大于8位',8)){
        res.focus();
        return;
    }
    if (!validate_required(author,'作者不能为空')){
        author.focus();
        return;
    }
    if (!validate_maxLength(intro,'简介长度不能大于100',100)){
        intro.focus();
        return;
    }

    let params = {
        "res": res.value,
        "author": author.value,
        "pic": pic.value,
        "intro": intro.value
    };
    //表单提交
    // submitForm.submit();

    console.info(params);

    //表单清空
    res.value = "";
    author.value = "";
    pic.value = "";
    intro.value = "";
    document.getElementById("form-author").innerText = "";
};
//表单校验
function validate_required(field,alerttxt)
{
    with (field)
    {
        if (value == null || value===""){
            alert(alerttxt);
            return false;
        }
        else {
            return true;
        }
    }
}
function validate_maxLength(field,alerttxt,len)
{
    with (field)
    {
        if (value.length > len){
            alert(alerttxt);
            return false;
        }
        else {
            return true;
        }
    }
}

//ajax的封装
let Ajax = function () {
    let that = this;
    that.init = function (param) {
        that.url = param.url; //+ '?rand=' + Math.random(); //使用随机字符解决ie浏览器第二次请求获取缓存
        that.data = that.format(param.data);
        that.method = param.method || 'get';
        that.success = param.success || function () {};
        that.error = param.error || function (s) {
            // console.info('status:' + s + 'error!');
        };

        that.xhr = that.createXHR();
    };
    that.format = function (data) {
        let fData = '';
        for (let key in data) {
            if(!data.hasOwnProperty(key)) continue;
            fData += key+'='+data[key] + '&';
        }
        return fData;
    };
    that.createXHR = function () {
        let xhr = null;
        if (window.XMLHttpRequest){
            // 兼容 IE7+, Firefox, Chrome, Opera, Safari
            xhr = new XMLHttpRequest();
        } else {
            // 兼容 IE6, IE5
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onreadystatechange = function () {
            if(xhr.readyState === 4) {
                if (xhr.status === 200) {
                    that.success(this.responseText);
                }
                else {
                    that.error(this.status);
                }
            }
        };
        return xhr;
    };

    that.ajax = function (param) {
        if(param.method === 'post'){
            that.post(param);
        } else {
            that.get(param);
        }

    };

    that.get = function (param) {
        that.init(param);
        let getUrl = that.url + (that.url.indexOf('?') === -1 ? that.data :'&' + that.data);
        that.xhr.open(that.method, getUrl, true);
        that.xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    };

    that.post = function (param) {
        that.init(param);
        that.method = 'POST';
        that.xhr.open(that.method, that.url, true);
        that.xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        that.xhr.send(that.data); // post请求参数
    };
    return {
        post : that.post,
        get : that.get,
        ajax : that.ajax
    }
};


window.onload = function () {

    // 获取服务器数据
    let $ = new Ajax();
    $.post({
        url: 'http://localhost:8888/data.json',
        success: function (msg) {
            workdata = JSON.parse(msg);
        }
    });
};
