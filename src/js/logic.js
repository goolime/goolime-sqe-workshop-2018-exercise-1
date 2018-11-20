var lineNum;

function addData(dataset,type, name, condition,  value){

    var tmp=new Array(5);
    tmp[0]=lineNum;
    tmp[1]=type;
    tmp[2]=name;
    tmp[3]=condition;
    tmp[4]=value;
    dataset[dataset.length]=tmp;
}

function isType(jsonObj, type){
    return jsonObj!=null && new String(type).valueOf() == new String(jsonObj['type']).valueOf();
}

export function isProgram(jsonObj){
    return isType(jsonObj,'Program');
}

export function isFunctionDeclaration(jsonObj){
    return isType(jsonObj,'FunctionDeclaration');
}

export function isVariableDeclaration(jsonObj){
    return isType(jsonObj, 'VariableDeclaration');
}

export function isIdentifier(jsonObj){
    return isType(jsonObj, 'Identifier');
}

export function isBlockStatement(jsonObj){
    return isType(jsonObj,'BlockStatement');
}

export function isExpressionStatement(jsonObj){
    return isType(jsonObj,'ExpressionStatement');
}

export function isAssignmentExpression(jsonObj){
    return isType(jsonObj,'AssignmentExpression');
}

export function isBinaryExpression(jsonObj){
    return isType(jsonObj,'BinaryExpression');
}

function isLiteral(jsonObj){
    return isType(jsonObj,'Literal');
}

export function isMemberExpression(jsonObj) {
    return isType(jsonObj,'MemberExpression');
}

export function isWhileStatement(jsonObj){
    return isType(jsonObj,'WhileStatement');
}

export function isIfStatement(jsonObj){
    return isType(jsonObj,'IfStatement');
}

export function isReturnStatement(jsonObj){
    return isType(jsonObj,'ReturnStatement');
}

export function isUnaryExpression(jsonObj){
    return isType(jsonObj,'UnaryExpression');
}

function readProgram(jsonObj,dataset) {
    let len=jsonObj.body.length;
    for (let i=0; i<len; i++){
        //lineNum++;
        readData(jsonObj.body[i],dataset);
    }
}

function readFunctionDeclaration(jsonObj,dataset) {
    addData(dataset,'function declaration',readIdentifier(jsonObj.id),null,null);
    let len=jsonObj['params'].length;
    for (let i=0; i<len; i++){
        addData(dataset,'Param',readIdentifier(jsonObj.params[i]),null,null);
    }
    lineNum++;
    //document.getElementById('demo').innerHTML=JSON.stringify(jsonObj['body'],null,2);
    readData(jsonObj['body'],dataset);
}

function readVariableDeclarator(bodyElement,dataset) {
    addData(dataset,'variable declarator',readIdentifier(bodyElement.id),null ,readVariable(bodyElement.init));
}

function readVariableDeclaration(jsonObj,dataset) {
    let len=jsonObj['declarations'].length;
    for (let i=0; i<len; i++){
        readVariableDeclarator(jsonObj['declarations'][i],dataset);
    }
    lineNum++;
}

function readIdentifier(jsonObj) {
    return new String(jsonObj['name']);
}

function readBlockStatement(jsonObj,dataset) {
    let len=jsonObj['body'].length;
    for (let i=0; i<len; i++){
        //lineNum++;
        readData(jsonObj.body[i],dataset);
    }
}

function readExpressionStatement(jsonObj,dataset) {
    if(isAssignmentExpression(jsonObj.expression)) readAssignmentExpression(jsonObj.expression,dataset);
    lineNum++;
}

function readAssignmentExpression(jsonObj,dataset){
    let val=readVariable(jsonObj['right']);
    //if (new String(val).valueOf() == new String(jsonObj['undefined']).valueOf()) val='null (or nothing)';
    addData(dataset,'assignment expression',readIdentifier(jsonObj.left),null,val);
}

function readMemberExpression(jsonObj) {
    return readVariable(jsonObj.object) + '[' + readVariable(jsonObj.property) +']';
}

function readVariable(jsonObj){
    let ans='null (or nothing)';
    if (isBinaryExpression(jsonObj)) ans= readBinaryExpression(jsonObj);
    else if(isUnaryExpression(jsonObj)) ans= readUnaryExpression(jsonObj);
    else if(isIdentifier(jsonObj)) ans= readIdentifier(jsonObj);
    else if(isMemberExpression(jsonObj)) ans= readMemberExpression(jsonObj);
    else if (isLiteral(jsonObj)) ans= readLiteral(jsonObj);

    return ans;
}

function readBinaryExpression(jsonObj) {
    let left,right,operator;

    left=readVariable(jsonObj.left);
    right=readVariable(jsonObj.right);
    operator=jsonObj.operator;

    return left + operator + right;

}

function readLiteral(jsonObj) {
    return jsonObj.raw;
}

function readWhileStatement(jsonObj,dataset) {
    let test;

    if (isBinaryExpression(jsonObj.test)) test=readBinaryExpression(jsonObj.test);
    else if (isUnaryExpression(jsonObj.test)) test=readUnaryExpression(jsonObj.test);
    addData(dataset,'while statement', null, test, null);
    lineNum++;
    readData(jsonObj.body,dataset);
    //lineNum++;
}

function readIfStatement(jsonObj,dataset, flag) {
    let test=readVariable(jsonObj['test']);
    if (flag) addData(dataset,' else if statement', null, test, null);
    else addData(dataset,'if statement', null, test, null);
    lineNum ++;
    readData(jsonObj.consequent,dataset);
    //lineNum++;
    if (isIfStatement(jsonObj['alternate'])) readIfStatement(jsonObj['alternate'],dataset ,true);
    else readData(jsonObj.alternate,dataset);
    lineNum++;
}

function readReturnStatement(jsonObj,dataset) {
    addData(dataset,'return statement',null,null,readVariable(jsonObj.argument));
    lineNum++;
}

function readUnaryExpression(jsonObj) {
    let argument, operator;

    argument = readVariable(jsonObj.argument);
    operator = jsonObj.operator;

    return operator + argument;
}

function readData(jsonObj,dataset){
    if (jsonObj==null) return null;
    else if (isFunctionDeclaration(jsonObj)) readFunctionDeclaration(jsonObj,dataset);
    else if (isVariableDeclaration(jsonObj)) readVariableDeclaration(jsonObj,dataset);
    else if (isBlockStatement(jsonObj)) readBlockStatement(jsonObj,dataset);
    else if (isExpressionStatement(jsonObj)) readExpressionStatement(jsonObj,dataset);
    else if (isWhileStatement(jsonObj)) readWhileStatement(jsonObj,dataset);
    else if (isIfStatement(jsonObj)) readIfStatement(jsonObj,dataset,false);
    else if (isReturnStatement(jsonObj)) readReturnStatement(jsonObj,dataset);
    //else dataset= -1;
}

export function readJSON(parsedCode,dataset) {
    lineNum=1;
    readProgram(parsedCode,dataset);

}

/*
function getStr(val) {
    let ans;
    if (typeof val === 'string' || val instanceof String) ans=val;
    else ans=val.toString();
    return ans;
}
*/