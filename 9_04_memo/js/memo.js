"use strict"

//ページ本体が読み込まれたタイミングで実行するコード
window.addEventListener("DOMContentLoaded",//A
    function () {

        //1.localStorageが使えるか　確認
        if (typeof localStorage === "underfined") {
            window.alert("このブラウザはLocal Storage機能が実装されていません");
            return;
        } else {
            saveLocalStorage();//2.localStorageへの保存 //B
        }
    }, false
);
    //2.
    function saveLocalStorage() { //C
        const save = document.getElementById("save"); //D
        save.addEventListener("click", //E
            function (e) {
                e.preventDefault()
                const key = document.getElementById("textKey").value; //F
                const value = document.getElementById("textMemo").value; //G
                if (key == "" || value === "") { //H
                    window.alert("Key、Memoはいずれも必要です。");
                    return;
                } else {
                    localStorage.setItem(key,value); //s
                    let w_msg = "LocalStorageに" + key + " " + value + "を保存しました。";
                    window.alert(w_msg);
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }

            }, false
        );
    };