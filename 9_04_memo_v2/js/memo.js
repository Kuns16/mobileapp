"use strict"

//ページ本体が読み込まれたタイミングで実行するコード
window.addEventListener("DOMContentLoaded",//A
    function () {

        //1.localStorageが使えるか　確認
        if (typeof localStorage === "underfined") {
            window.alert("このブラウザはLocal Storage機能が実装されていません");
            return;
        } else {
            viewStorage();     //localStorageからおのデータの取得とテーブルへ表示
            saveLocalStorage();//2.localStorageへの保存 //B
            delLocalStorage(); //3.localStorageから１件削除
            selectTable();//5.データ選択
        }
    }, false
);
//2.localStorageへの保存
function saveLocalStorage() { //C
    const save = document.getElementById("save"); //D
    save.addEventListener("click", //E
        function(e) {
            e.preventDefault()
            const key = document.getElementById("textKey").value; //F
            const value = document.getElementById("textMemo").value; //G
            if (key == "" || value === "") { //H
                window.alert("Key、Memoはいずれも必要です。");
                return;
            } else {
                let w_confirm = window.confirm("LocalStorageに\n「" + key + " " + value + "」\nを保存しますか?" );
                if (w_confirm == true){
                    localStorage.setItem(key,value); //s
                    viewStorage();
                    let w_msg = "LocalStorageに" + key + " " + value + "を保存しました。";
                    window.alert(w_msg);
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }                
            }

        }, false
    );
};

//3.localStorageから1件削除
function delLocalStorage(){
    const del = document.getElementById("del");
    del.addEventListener("click",
        function(e) {
            e.preventDefault();
            let w_sel = "0";          //選択されていれば、"1"が返却される
            w_sel = selectRadioBtn(); //テーブルからデータ選択

            if(w_sel === "1"){
                const key = document.getElementById("textKey").value;
                const value = document.getElementById("textMemo").value;
                let w_confirm = window.confirm("LocalStorageから\n" + key + " " + value + "\nを削除しますか?");
                //確認 タイアログで「OK」　を伸ばされたとき、削除する
                if(w_confirm === true){
                    localStorage.removeItem(key);
                    viewStorage(); //localStorageからのデータの取得とテーブルへ表示
                    let w_msg = "LocalStorageに" + key + " " + value + "を削除しました。";
                    window.alert(w_msg);
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            }
        }, false
    );
}

//5.データ選択
function selectTable() {
    const select = document.getElementById("select");
    select.addEventListener("click",
        function(e){
            e.preventDefault();
            selectRadioBtn(); //テーブルからデータ選択
        }, false
    );
}
//テーブルからデータ選択
function selectRadioBtn() {
    let w_sel = "0"; //選択されていれば、"1"にする
    const radio1 = document.getElementsByName("radio1"); //E
    const table1 = document.getElementById("table1"); //F

    for(let i = 0; i < radio1.length; i++){ //G
        if(radio1[i].checked){ //H
            document.getElementById("textKey").value = table1.rows[i+1].cells[1].firstChild.data; //i K
            document.getElementById("textMemo").value = table1.rows[i+1].cells[2].firstChild.data;//j K
            return w_sel = "1";
        }
    }

    window.alert("1つ選択してください。"); //L
}

//localStorageからおのデータの取得とテーブルへ表示
function viewStorage(){

    const list = document.getElementById("list");
    //htmlのテーブル初期化
    while(list.rows[0]) list.deleteRow(0);

    //localStorageすべての情報の取得
    for(let i = 0; i < localStorage.length; i++){
        let w_key = localStorage.key(i);

        //localStorageのキーと値を表示
        let tr  = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        td1.innerHTML = "<input name = 'radio1' type = 'radio'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
    }

    
}