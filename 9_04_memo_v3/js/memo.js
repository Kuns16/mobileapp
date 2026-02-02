"use strict"

//ページ本体が読み込まれたタイミングで実行するコード
window.addEventListener("DOMContentLoaded",//A
    function () {

        //1.localStorageが使えるか　確認
        if (typeof localStorage === "underfined") {
            window.alert("このブラウザはLocal Storage機能が実装されていません");
            return;
        } else {
            viewStorage();          //localStorageからおのデータの取得とテーブルへ表示
            saveLocalStorage();     //2.localStorageへの保存 //B
            delLocalStorage();      //3.localStorageから１件削除
            allClearLocalStorage(); //4.localStorageから全て削除
            selectTable();          //5.データ選択
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
                //確認 タイアログで「OK」　を伸ばされたとき、削除する version-up1 add
                if (w_confirm == true){ //version-up1 add
                    localStorage.setItem(key,value); //s
                    viewStorage();
                    let w_msg = "LocalStorageに" + key + " " + value + "を保存しました。";
                    window.alert(w_msg);
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }   //version-up1 add             
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
            const chkbox1 = document.getElementsByName("chkbox1");
            const table1 = document.getElementById("table1");
            let w_cnt = 0;          //選択されていれば、"1"が返却される
            w_cnt = selectCheckBox("del"); //テーブルからデータ選択

            if(w_cnt >= 1){
                //const key = document.getElementById("textKey").value;
                //const value = document.getElementById("textMemo").value;
                let w_confirm = window.confirm("LocalStorageから選択されている" + w_cnt + "件を削除しますか?"); //version-up1 add
                //確認 タイアログで「OK」　を伸ばされたとき、削除する 
                if(w_confirm === true) {
                    for(let i = 0; i < chkbox1.length; i++){
                        if(chkbox1[i].checked){
                            localStorage.removeItem(table1.rows[i+1].cells[1].firstChild.data);
                        }
                    }
                    viewStorage(); //localStorageからのデータの取得とテーブルへ表示
                    let w_msg = "LocalStorageから選択されている" + w_cnt + "件を削除しました。";
                    window.alert(w_msg);
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            }
        }, false
    );
}

//4.localStorageから全て削除
function allClearLocalStorage() {
    const allClear = document.getElementById("allClear");
    allClear.addEventListener("click",
        function(e) {
            e.preventDefault();
            let w_confirm = window.confirm("LocalStorageのデータを全て削除します。\nよろしいですか?");
            //確認　ダイアログで　「OK」を伸ばされたとき、全て削除する。
            if(w_confirm === true){
                localStorage.clear();
                viewStorage();
                let w_msg = "LocalStorageのデータを全て削除しました。";
                window.alert(w_msg);
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
            }
        }, false
    );
};

//5.データ選択
function selectTable() {
    const select = document.getElementById("select");
    select.addEventListener("click",
        function(e){
            e.preventDefault();
            selectCheckBox("select"); //テーブルからデータ選択
        }, false
    );
}
//テーブルからデータ選択
function selectCheckBox(mode) { //引数：なし　＝＝＞　mode
    //let w_sel = "0"; //選択されていれば、"1"にする
    let w_cnt = 0; //選択されているチェックボックスの数
    const chkbox1 = document.getElementsByName("chkbox1"); //E
    const table1 = document.getElementById("table1"); //F
    let w_textKey = ""; 
    let w_textMemo = "";

    for(let i = 0; i < chkbox1.length; i++){ //G
        if(chkbox1[i].checked){ //H
            if(w_cnt === 0){
                w_textKey = table1.rows[i+1].cells[1].firstChild.data;
                w_textMemo = table1.rows[i+1].cells[2].firstChild.data;
            }
            w_cnt++; //選択されているチェックボックスの数をカウント
        }
    }

    document.getElementById("textKey").value = w_textKey;
    document.getElementById("textMemo").value = w_textMemo;

    if(mode === "select"){
        if(w_cnt === 1){
            return w_cnt;
        }else{
            window.alert("1つ選択してください。");
        }
    }

    if(mode === "del"){
        if(w_cnt >= 1){
            return w_cnt;
        }
        else{
            window.alert("1つ以上選択してください。");
        }
    }
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

        td1.innerHTML = "<input name = 'chkbox1' type = 'checkbox'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
    }

    
}