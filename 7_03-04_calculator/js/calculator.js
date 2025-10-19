'use strict';

//
const elementSelect = document.getElementById("calcType");
const elementNum1 = document.getElementById("num1");
const elementNum2 = document.getElementById("num2");
const elementResult = document.getElementById("result");
const elementbtnEqual = document.getElementById("btnEqual");

elementSelect.addEventListener("change", calculate);
elementNum1.addEventListener("change", calculate);
elementNum2.addEventListener("change", calculate);

[elementSelect,elementNum1,elementNum2].forEach(el =>
    el.addEventListener("input",() => elementResult.innerHTML = "")
);

elementbtnEqual.addEventListener("click", update);
//関数「update」を作り、処理をまとめる
function update(){
    //計算結果を求める   
    const result = calculate(
        Number(elementNum1.value),
        Number(elementNum2.value),
        elementSelect.value
    );

    //画面に表示
    elementResult.innerHTML = result;
}

//
function calculate(num1, num2, calcType){
    let result;
        //
        switch(calcType){
            case "type-add":
                result = num1 + num2;
                break;
            case "type-substract":
                result = num1 - num2;
                break;
            case "type-multiply":
                result = num1 * num2;
                break;
            case "type-divide":
                result = num1 / num2;
                break;
        }
    return result;
}