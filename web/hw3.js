var audio = document.getElementById("music");
var PSbtn = document.getElementById("PSbtn");
var range1 = document.getElementById("range1");
var info = document.getElementById("info");
var song = document.getElementById("song");
var volinfo = document.getElementById("volinfo");
var progress = document.getElementById("progress");
var marguee = document.getElementsByTagName("marguee");
var book = document.getElementById("book");
var Mutebtn = document.getElementById("Mutebtn");
var song = document.getElementById("song");
var vol = "";
//單曲循環、全部循環及隨機選曲
song.addEventListener('change', function () {// addEventListener('要監聽的動作'，監聽到後要執行的funtion)
    changeMusic(song.selectedIndex);
});

//drag drop
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    if (ev.target.id == "")
        ev.target.appendChild(document.getElementById(data));
    else
        ev.target.parentNode.appendChild(document.getElementById(data));

}
function allowDrop(ev) {
    ev.preventDefault();//停止物件預設行為
}
//更新歌單
var oBook = book.children[0];
var tBook = book.children[1];
function updataMenu() {
    //移除現有歌單
    if (tBook.children.length != 0) {
        for (var j = song.children.length - 1; j >= 0; j--) {
            song.removeChild(song.children[j]);
        }
        //更新選擇的歌單
        for (var i = 0; i < tBook.children.length; i++) {
            option = document.createElement("option");
            option.innerText = tBook.children[i].innerText;
            option.value = tBook.children[i].title;
            song.appendChild(option);  //將optine附加(appenChild)到song的子層 
        }
    } else {
        for (var j = song.children.length - 1; j >= 0; j--) {
            song.removeChild(song.children[j]);
        }
        for (var i = 0; i < sbook.children.length; i++) {
            option = document.createElement("option");
            option.innerText = sbook.children[i].innerText;
            option.value = sbook.children[i].title;
            song.appendChild(option);  //將optine附加(appenChild)到song的子層 
        }
    }
    changeMusic(0);
}
//文件中.建立一個元素
var option;
var sbook = book.children[0];
for (var i = 0; i < sbook.children.length; i++) {
    sbook.children[i].draggable = "true";
    sbook.children[i].id = "song" + i;
/*    sbook.children[i].ondblclick = drop(ev);*/
    sbook.children[i].addEventListener('dragstart', function () {  //ondragstart on不用
        drag(event);
    })
    option = document.createElement("option");
    option.innerText = sbook.children[i].innerText;
    option.value = sbook.children[i].title;
    song.appendChild(option);  //將optine附加(appenChild)到song的子層
}
changeMusic(0);
//雙擊click


//單曲循環
function setloop() {
    //info.children[2].innerText = "單曲循環";
    //條件式==條件式?
    info.children[2].innerText = info.children[2].innerText == "單曲循環" ? "" : "單曲循環";
    audio.loop = !audio.loop;
}
//全部循環
function setCycle() {
    info.children[2].innerText = info.children[2].innerText == "全部循環" ? "" : "全部循環";
}
//隨機撥放
function setRandom() {
    info.children[2].innerText = info.children[2].innerText == "隨機播放" ? "" : "隨機撥放";
}
//靜音
function setMuted() {
    //taggle切換功能時，可以使用!NOT 去指定自身相反的boolean值給自己。audio.muted為boolean
    console.log(audio.muted);
    audio.muted = !audio.muted;
    //if (range1.value==0) {
    //    changeRange("80");
    //} else changeRange(-1000);
    if (Mutebtn.innerText == "U") { Mutebtn.innerText = "V" }
    else Mutebtn.innerText = "U";
    /*vol = range1.value;*/

    /*audio.muted = !audio.muted;*/
}

//上一首下一首歌
function changeSong(i) {
    var index = song.selectedIndex + i;
    if (index < 0) {
        index = song.options.length - 1;
    }

    if (index > song.options.length - 1) {
        index = 0;
    }

    changeMusic(index);
    //if (index >= 0 || index<song.options.length-1) {
    //
    //}
    console.log(song.options.selectedIndex);


}
//歌曲切換
function changeMusic(i) {
    //console.log(evt.target.options[evt.target.selectedIndex].value);
    //console.log(evt.target.selectedIndex);
    song.options[i].selected = "true";
    audio.children[0].src = song.options[i].value;
    audio.children[0].title = song.options[i].innerText;
    audio.load();
    if (PSbtn.innerText == ";") Play();
    /*            Stop();*/

    /*            audio.children[0].src =*/

}
function songBook() {
    if (book.className == "hide")
        book.className = "";
    else
        book.className = "hide";
}

//時間格式轉換
var min = 0, sec = 0, min2 = 0, sec2 = 0;
function getTimeFormat(timesec) {
    min = parseInt(timesec / 60);
    sec = parseInt(timesec % 60);
    //if (min < 10) min = "0" + min;
    min = min < 10 ? "0" + min : min;
    //if (sec < 10) sec = "0" + sec;
    sec = sec < 10 ? "0" + sec : sec;
    return min + ":" + sec;
}

console.log(audio.children[0].title);
//取得歌曲撥放時間
function getDuration() {
    progress.max = parseInt(audio.duration);
    progress.value = parseInt(audio.currentTime);
    var w = (audio.currentTime / audio.duration * 100) + "%";
    progress.style.backgroundImage = "-webkit-linear-gradient(left,#b60000,#b60000 " + w + ", #c8c8c8 " + w + ",#c8c8c8)";
    //progress.value = parseInt(audio.currentTime/audio.duration*100);
    //console.log(progress.value);
    info.children[1].innerText = getTimeFormat(audio.currentTime) + "/" + getTimeFormat(audio.duration);
    //歌曲播完時換下一首

    if (audio.currentTime == audio.duration && audio.loop == false) {
        if (info.children[2].innerText == "隨機撥放") {
            var i = Math.floor(Math.random() * song.options.length);
            changeMusic(i);
        }
        else if (info.children[2].innerText == "全部循環") {
            var index = song.selectedIndex + 1;
            if (index < 0) {
                index = song.options.length - 1;
            }
            if (index > song.options.length - 1) {
                index = 0;
            }
            changeMusic(index);
        }
        else if (audio.currentTime == audio.duration && song.selectedIndex == song.options.length - 1) {
            console.log(song.selectedIndex);
            Stop();
        } else changeSong(1);
    }
    setTimeout(getDuration, 10);
    ////全部循環
    //if (index < 0) {
    //    index = song.options.length - 1;
    //}
    //if (index > song.options.length - 1) {
    //    index = 0;
    //}

    //隨機撥放

    /* if (audio.currentTime < audio.duration)*/

    //if (audio.currentTime < audio.duration) {
    //    setTimeout(getDuration, 10);
    //}else{
    //    (audio.currentTime == audio.duration) 
    //    changeSong(1);                
    //}
}


//function SoundVolume(v) {
//    audio.volume += v;
//    range1.value += (v*1000);
//    console.log(audio.volume);

//}

//撥放與暫停功能
function Play() {
    if (audio.paused) {
        audio.play();
        PSbtn.innerText = ";";
        info.children[0].innerText = "目前撥放" + audio.children[0].title;
        getDuration();
    } else {
        audio.pause();
        PSbtn.innerText = "4";
        info.children[0].innerText = "目前音樂暫停中";
    }
}

//暫停播放功能
function Stop() {
    audio.pause();
    audio.currentTime = 0;
    PSbtn.innerText = "4";
    info.children[0].innerText = "目前音樂已停止";
}

//進度條拉取
function setTimeBar() {
    audio.currentTime = progress.value;
}

//快轉與倒轉功能
function changeTime(t) {
    audio.currentTime += t;
    //if (t==-5 && audio.currentTime <= 5) {
    //audio.currentTime = 0;
    //} else
    console.log(audio.currentTime);
}

var rgbNum = [];
var rgb;
//托放音量bar改變音量
function SoundVolume1() {
    audio.muted = false;
    Mutebtn.innerText = "U";
    volinfo.value = range1.value;
    audio.volume = parseInt(range1.value) / 100;
    var z = range1.value + "%";
    ///*            var color = "#FFFFFF";*/

    for (i = 0; i <= 2; i++) {
        var x = Math.floor(Math.random() * 256);
        x = x.toString(16);
        if (x.length == 1) {
            x = "0" + x;
        } else { }
        rgbNum[i] = x;
    }
    rgb = rgbNum[0] + rgbNum[1] + rgbNum[2];
    /*rgb=rgb.toString(16);*/
    //HighTime
    console.log(rgb);
    console.log(typeof (rgb));
    range1.style.backgroundImage = "-webkit-linear-gradient(left," + "#" + rgb + "," + "#" + rgb + " " + z + ", #c8c8c8 " + z + ",#c8c8c8)";
    song.style.color = "#" + rgb;
    console.log(`#($rgb)`);


    //range1.style.backgroundImage = "-webkit-linear-gradient(left,#b60000,#b60000 " + z + ", #c8c8c8 " + z + ",#c8c8c8)";

    console.log(audio.volume);
    console.log(range1.value);
}
//音量增減函數
function changeRange(i) {
    range1.value = parseInt(range1.value) + i;
    SoundVolume1();




    /*audio.volume = parseInt(range1.value) / 100;*/
    //    console.log(audio.volume);
    //    console.log(range1.value);
}
