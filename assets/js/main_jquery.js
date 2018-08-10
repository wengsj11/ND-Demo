//全局json数据对象
let workdata = [];
let my_work = [];
let class_work = [];

//当前分页
const pageSize = 8;
let pageNum = 1;
let totalPage;  //页数
let initDageDisplay = null;

let contentNone = $(".content-none");
let content = $(".content");


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
    let side_li =$(".sidebar-list .active")[0];
    let works = workdata[side_li.id];
    // 判断数据是否为空
    if(works == null){
        contentNone.css('display','block');
        content.css('display','none');
        return;
    } else {
        content.css('display','flex');
        contentNone.css('display','none');
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

    let tpl = $("#item-tpl").html();
    let items = $(".items");
    //清除模板html内容
    items.html("");

    if(tab_id === "my"){

        for (let i = start; i < end && i< my_work.length; i++) {
            let html = tpl;
            html = html.replace("{{title}}", my_work[i].workTitle);
            html = html.replace("{{img}}", my_work[i].pic);
            html = html.replace("{{author}}", my_work[i].author);
            html = html.replace("{{time}}", my_work[i].time);
            items.append(html);
        }

    } else if(tab_id === "class") {

        for (let i = start; i < end && i<class_work.length; i++) {
            let html = tpl;
            html = html.replace("{{title}}", class_work[i].workTitle);
            html = html.replace("{{img}}", class_work[i].pic);
            html = html.replace("{{author}}", class_work[i].author);
            html = html.replace("{{time}}", class_work[i].time);
            items.append(html);
        }
    }
    let pre = $("#page-pre");
    let next = $("#page-next");
    pre.css('display','block');
    next.css('display', 'block');
    //判断当前是否可以翻页
    if(pageNum === 1){
        pre.css('display','none');
    }
    if(pageNum === totalPage){
        next.css('display', 'none');
    }
}


//侧边栏切换、
let list = $(".sidebar-list li");
list.each(function () {
    $(this).click(function () {
        console.info('click');
        list.each(function () {
            $(this).removeClass('active');
        });
        $(this).addClass('active');
        //展示数据
        showData("my", pageSize, 1);
        //刷新分页样式
        initDageDisplay = pageDisplay();
        // 直接调用分页刷新数据，点击第一页
        $("#1").click();
    })
});

//Tab标签页切换、
let items = $(".work-item");
items.each(function () {
    $(this).click(function () {
        items.each(function () {
            $(this).removeClass('active');
        });
        $(this).addClass('active');
        //刷新分页样式
        initDageDisplay = pageDisplay();

        //展示数据
        showData($(this).attr('id'), pageSize, 1);
    })
});

//分页功能、
function pageClick(box) {
    let boxs = $(".page-box");
    boxs.each(function () {
        $(this).removeClass('select');
    });
    $(box).addClass('select');

    pageNum = parseInt($(box).html());
    // 当前标签页
    let tab = $(".nav-left .active");
    //展示数据
    showData(tab.attr('id'), pageSize, pageNum);
}

//翻页
function pre() {
    if(pageNum-1 > 0){
        pageNum--;
    }
    //展示数据
    $('#' + pageNum).click();
}
function next() {
    if(pageNum+1 <= 100){
        pageNum++;
    }
    $('#' + pageNum).click();
}

//分页样式逻辑
function pageDisplay(){
    let tab = $(".nav-left .active");
    if(tab.attr('id') === "my"){
        totalPage = my_work.length % pageSize === 0 ? my_work.length / pageSize : parseInt(my_work.length / pageSize +1);
    }else if(tab.attr('id') === "class"){
        totalPage = class_work.length % pageSize === 0 ? class_work.length / pageSize : parseInt(class_work.length / pageSize +1);
    }
    if(totalPage === 0){
        totalPage = 1;
    }

    let page_html = "<a href='#' class='page-box-arr' id='page-pre' onclick='pre();'>&lt;</a><a href='#' class='page-box select' id='1' onclick='pageClick(this)'>1</a>";

    for (let i = 1; i < totalPage; i++) {
        page_html += "<a href='#' class='page-box' id='"+(i+1)+"'onclick='pageClick(this)'>"+ (i+1) +"</a>";
    }
    page_html +="<a href='#' class='page-box-arr' id='page-next' onclick='next();'>&gt;</a>";

    $(".page").html(page_html);
}


//搜索功能
let search_btn = $("#content-search");
search_btn.click(function () {
    // TODO
    //暂时想到的方法是先用正则对数据进行过滤，然后再调用showdata对数据渲染。

});

//新建作品modal
let newButton = $("#new-btn");
newButton.click(function newwork() {
    let modal = $('.modal:eq(0)');
    modal.css('display', 'flex');

    //清除input
    $("form[name='submitForm'] input[name='res']").val('');


    //添加modal背景
    let div = $("<div></div>");
    div.addClass("modal-bg");
    div.appendTo("body");
});

//关闭新建作品modal
let modalClose = $("#modal-close");
modalClose.click(function(){
    let modal = $('.modal:eq(0)');
    modal.css('display','none');
    let div = $('.modal-bg');
    div.remove();
});

// 添加作者modal
let addButton = $("#btn_add");
addButton.click(function(){
    let modal_side = $('.modal-side');
    modal_side.css('display','flex');
    let div = $('.modal-bg');
    div.css("zIndex", "1060");
});

//关闭添加作者modal
let modalSideClose = $("#modal-side-close");
modalSideClose.click(function(){
    let modal = $('.modal-side');
    modal.css('display', 'none');
    let div = $('.modal-bg');
    div.css('zIndex', '1040');
});

// 添加作者
let addName = $("#addName");
addName.click(function () {
    moveOption($("form[name='list1']"), $("form[name='list2']"));
});

// 删除作者
let deleteName = $("#deleteName");
deleteName.click(function () {
    moveOption($("form[name='list2']"), $("form[name='list1']"));
});

//实现selector左边移到右边
function moveOption(list1, list2){
    // list1.each(function () {
    //     if($(this).selected){
    //         list2.options.add(new Option(this.text, this.value))
    //         list1.remove(this);
    //     }
    // })

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
let getNames = $("#getNames");
getNames.click(function () {
    let allNames = "";
    let allNamesVal = [];
    let list2 = $("select[name='list2'] option");
    list2.each(function () {
        allNames += "<div style='display: inline-block; padding: 0 5px'>"+ $(this).val() + "<img src='assets/img/author_del.png' onclick='deleteNameInput(this)'></div>";
        allNamesVal.push($(this).val());
    });
    $("#form-author").html(allNames);
    $("#input-author").val(allNamesVal.toString());
    $("#modal-side-close").click();
});

//删除作者名字按钮
function deleteNameInput(obj){
    //删除元素
    let parent = $(obj).parent();
    parent.remove();
    //删除input值
    let author = $("#input-author");
    let value = $(obj).parent().text();
    let val = author.val().replace(new RegExp(","+value+"|"+value+","), "");
    author.val(val);
}
//表单提交
let modal_form_submit = $("#modal-form-submit");
modal_form_submit.click(function () {

    let res = $("#form-res");
    let author = $("#input-author");
    let pic = $("#form-pic");
    let intro = $("#form-intro");
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
        "res": res.val(),
        "author": author.val(),
        "pic": pic.val(),
        "intro": intro.val()
    };
    //表单提交
    // submitForm.submit();

    console.info(params);

    //表单清空
    res.val("");
    author.val("");
    pic.val("");
    intro.val("");
    $("#form-author").text("");
});
//表单校验
function validate_required(field,alerttxt)
{
    let val = field.val();
    if (val.length == null || val===""){
        alert(alerttxt);
        return false;
    }
    else {
        return true;
    }
}
function validate_maxLength(field,alerttxt,len)
{

    let val = field.val();
    if (val.length > len){
        alert(alerttxt);
        return false;
    }
    else {
        return true;
    }
}


$(document).ready(function () {
    // 获取服务器数据
    $.ajax({
        type: "POST",
        url: "http://localhost:8888/data.json",
        success: function(data){
            workdata = JSON.parse(data);
        }
    });


});
