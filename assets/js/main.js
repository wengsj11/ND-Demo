//侧边栏切换、
let lis = document.getElementsByClassName("sidebar-list")[0].getElementsByTagName("li");
for (let i = 0; i < lis.length; i++) {
    let li = lis[i];
    li.onclick = function () {
        for (let i = 0; i < lis.length; i++) {
            lis[i].classList.remove("active");
        }
        this.classList.add('active');
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
    }
}
//分页功能、
let boxs = document.getElementsByClassName("page-box");
for (let i = 0; i < boxs.length; i++) {
    let box = boxs[i];
    box.onclick = function () {
        for (let i = 0; i < boxs.length; i++) {
            boxs[i].classList.remove("select");
        }
        this.classList.add('select');
    }
}
//新建作品功能
document.getElementById("new-btn").onclick = function newwork() {
    let modal = document.getElementsByClassName('modal');
    modal[0].style.display = 'flex';

    //清除input
    document.submitForm.res.value='';


    //添加背景
    let div = document.createElement("div");
    div.setAttribute("class", "modal-bg");
    document.body.appendChild(div);
};
//关闭
document.getElementById("modal-close").onclick = function(){
    let modal = document.getElementsByClassName('modal');
    modal[0].style.display = 'none';
    let div = document.getElementsByClassName('modal-bg');
    document.body.removeChild(div[0]);
};

document.getElementById("btn_add").onclick =function(){
    let modal_side = document.getElementsByClassName('modal-side');
    modal_side[0].style.display = 'flex';
    let div = document.getElementsByClassName('modal-bg');
    div[0].style.zIndex = "1060";
};
//关闭
document.getElementById("modal-side-close").onclick = function(){
    let modal = document.getElementsByClassName('modal-side');
    modal[0].style.display = 'none';
    let div = document.getElementsByClassName('modal-bg');
    div[0].style.zIndex = "1040";
};

document.getElementById("addName").onclick = function () {
    moveOption(document.getNameForm.list1, document.getNameForm.list2);
};
document.getElementById("deleteName").onclick = function () {
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
//获取选择的名字
 document.getElementById("getNames").onclick = function () {
     let allNames = "";
     let list2 = document.getNameForm.list2;
     for(let i = 0;i < list2.options.length;i++){
         allNames += list2.options[i].value + "<img src='assets/img/author_del.png'>";
     }
     document.getElementById("author").value = allNames;
     document.getElementById("modal-side-close").click();
 }