import $ from 'jquery';
import * as logic from './logic.js';

import {parseCode} from './code-analyzer';

//var dataset;

function showData(table,dataset) {
    //let table=document.getElementById('myTable');
    for(let i=0;i<dataset.length;i++)
    {
        var len=table.rows.length;
        var row = table.insertRow(len);
        var lineCell = row.insertCell(0);
        var typeCell = row.insertCell(1);
        var nameCell = row.insertCell(2);
        var conditionCell = row.insertCell(3);
        var valueCell = row.insertCell(4);
        lineCell.innerHTML = dataset[i][0];//getStr(dataset[i].line);
        typeCell.innerHTML = dataset[i][1];//getStr(dataset[i].type);
        nameCell.innerHTML = dataset[i][2];//getStr(dataset[i].name);
        conditionCell.innerHTML = dataset[i][3];//getStr(dataset[i].condition);
        valueCell.innerHTML = dataset[i][4];//getStr(dataset[i].value);
    }
}

function clearTable(table) {
    var len=table.rows.length;

    for (var i=0; i<len-1; i++){
        table.deleteRow(1);
    }

}

$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        var table = document.getElementById('myTable');
        clearTable(table);
        var dataset=[];

        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = parseCode(codeToParse);
        //$('#parse-dCode').val(JSON.stringify(parsedCode, null, 2));

        if (logic.isProgram(parsedCode)) {
            logic.readJSON(parsedCode,dataset);
            showData(table,dataset);
        }


    });
});
