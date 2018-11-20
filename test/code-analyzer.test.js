function binarySearch(X, V, n){
    let low, high, mid;
    low = 0;
    high = n - 1;
    while (low <= high) {
        mid = (low + high)/2;
        if (X < V[mid])
            high = mid - 1;
        else if (X > V[mid])
            low = mid + 1;
        else
            return mid;
    }
    return -1;
}
/* eslint-disable quotes,max-lines-per-function,complexity,indent */
import assert from 'assert';
import {parseCode} from '../src/js/code-analyzer';
import * as logic from'../src/js/logic.js';
import * as app from '../src/js/logic';

describe('The javascript parser', () => {
    it('is parsing an empty function correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('')),
            '{"type":"Program","body":[],"sourceType":"script"}'
        );
    });

    it('is parsing a simple variable declaration correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('let a = 1;')),
            '{"type":"Program","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"a"},"init":{"type":"Literal","value":1,"raw":"1"}}],"kind":"let"}],"sourceType":"script"}'
        );
    });
});

describe ('Check the identifier for',()=>{
    it('Program - Positive',()=>{
        assert.equal(logic.isProgram({'type':'Program'}),true);
    });

    it('Program - Negative',()=>{
        assert.equal(logic.isProgram({'type':'ERR'}),false);
    });


    it('FunctionDeclaration - Positive',()=>{
        assert.equal(logic.isFunctionDeclaration({'type':'FunctionDeclaration'}),true);
    });

    it('FunctionDeclaration - Negative',()=>{
        assert.equal(app.isFunctionDeclaration({'type':'ERR'}),false);
    });


    it('VariableDeclaration - Positive',()=>{
        assert.equal(app.isVariableDeclaration({'type':'VariableDeclaration'}),true);
    });

    it('VariableDeclaration - Negative',()=>{
        assert.equal(app.isVariableDeclaration({'type':'ERR'}),false);
    });


    it('Identifier - Positive',()=>{
        assert.equal(app.isIdentifier({'type':'Identifier'}),true);
    });

    it('Identifier - Negative',()=>{
        assert.equal(app.isIdentifier({'type':'ERR'}),false);
    });


    it('BlockStatement - Positive',()=>{
        assert.equal(app.isBlockStatement({'type':'BlockStatement'}),true);
    });

    it('BlockStatement - Negative',()=>{
        assert.equal(app.isBlockStatement({'type':'ERR'}),false);
    });


    it('ExpressionStatement - Positive',()=>{
        assert.equal(app.isExpressionStatement({'type':'ExpressionStatement'}),true);
    });

    it('ExpressionStatement - Negative',()=>{
        assert.equal(app.isExpressionStatement({'type':'ERR'}),false);
    });


    it('AssignmentExpression - Positive',()=>{
        assert.equal(app.isAssignmentExpression({'type':'AssignmentExpression'}),true);
    });

    it('AssignmentExpression - Negative',()=>{
        assert.equal(app.isAssignmentExpression({'type':'ERR'}),false);
    });


    it('BinaryExpression - Positive',()=>{
        assert.equal(app.isBinaryExpression({'type':'BinaryExpression'}),true);
    });

    it('BinaryExpression - Negative',()=>{
        assert.equal(app.isBinaryExpression({'type':'ERR'}),false);
    });


    it('MemberExpression - Positive',()=>{
        assert.equal(app.isMemberExpression({'type':'MemberExpression'}),true);
    });

    it('MemberExpression - Negative',()=>{
        assert.equal(app.isMemberExpression({'type':'ERR'}),false);
    });


    it('WhileStatement - Positive',()=>{
        assert.equal(app.isWhileStatement({'type':'WhileStatement'}),true);
    });

    it('WhileStatement - Negative',()=>{
        assert.equal(app.isWhileStatement({'type':'ERR'}),false);
    });


    it('ReturnStatement - Positive',()=>{
        assert.equal(app.isReturnStatement({'type':'ReturnStatement'}),true);
    });

    it('ReturnStatement - Negative',()=>{
        assert.equal(app.isReturnStatement({'type':'ERR'}),false);
    });


    it('UnaryExpression - Positive',()=>{
        assert.equal(app.isUnaryExpression({'type':'UnaryExpression'}),true);
    });

    it('UnaryExpression - Negative',()=>{
        assert.equal(app.isUnaryExpression({'type':'ERR'}),false);
    });
});

describe ('Check reader function :', ()=>{
    it ('case #1',()=> {
        var ans = true;
        let dataset = [];
        let parsedCode = {
            'type': "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "binarySearch"
                    },
                    "params": [
                        {
                            "type": "Identifier",
                            "name": "X"
                        },
                        {
                            "type": "Identifier",
                            "name": "V"
                        },
                        {
                            "type": "Identifier",
                            "name": "n"
                        }
                    ],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "VariableDeclaration",
                                "declarations": [
                                    {
                                        "type": "VariableDeclarator",
                                        "id": {
                                            "type": "Identifier",
                                            "name": "low"
                                        },
                                        "init": null
                                    },
                                    {
                                        "type": "VariableDeclarator",
                                        "id": {
                                            "type": "Identifier",
                                            "name": "high"
                                        },
                                        "init": null
                                    },
                                    {
                                        "type": "VariableDeclarator",
                                        "id": {
                                            "type": "Identifier",
                                            "name": "mid"
                                        },
                                        "init": null
                                    }
                                ],
                                "kind": "let"
                            },
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "AssignmentExpression",
                                    "operator": "=",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "low"
                                    },
                                    "right": {
                                        "type": "Literal",
                                        "value": 0,
                                        "raw": "0"
                                    }
                                }
                            },
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "AssignmentExpression",
                                    "operator": "=",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "high"
                                    },
                                    "right": {
                                        "type": "BinaryExpression",
                                        "operator": "-",
                                        "left": {
                                            "type": "Identifier",
                                            "name": "n"
                                        },
                                        "right": {
                                            "type": "Literal",
                                            "value": 1,
                                            "raw": "1"
                                        }
                                    }
                                }
                            },
                            {
                                "type": "WhileStatement",
                                "test": {
                                    "type": "BinaryExpression",
                                    "operator": "<=",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "low"
                                    },
                                    "right": {
                                        "type": "Identifier",
                                        "name": "high"
                                    }
                                },
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [
                                        {
                                            "type": "ExpressionStatement",
                                            "expression": {
                                                "type": "AssignmentExpression",
                                                "operator": "=",
                                                "left": {
                                                    "type": "Identifier",
                                                    "name": "mid"
                                                },
                                                "right": {
                                                    "type": "BinaryExpression",
                                                    "operator": "/",
                                                    "left": {
                                                        "type": "BinaryExpression",
                                                        "operator": "+",
                                                        "left": {
                                                            "type": "Identifier",
                                                            "name": "low"
                                                        },
                                                        "right": {
                                                            "type": "Identifier",
                                                            "name": "high"
                                                        }
                                                    },
                                                    "right": {
                                                        "type": "Literal",
                                                        "value": 2,
                                                        "raw": "2"
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            "type": "IfStatement",
                                            "test": {
                                                "type": "BinaryExpression",
                                                "operator": "<",
                                                "left": {
                                                    "type": "Identifier",
                                                    "name": "X"
                                                },
                                                "right": {
                                                    "type": "MemberExpression",
                                                    "computed": true,
                                                    "object": {
                                                        "type": "Identifier",
                                                        "name": "V"
                                                    },
                                                    "property": {
                                                        "type": "Identifier",
                                                        "name": "mid"
                                                    }
                                                }
                                            },
                                            "consequent": {
                                                "type": "ExpressionStatement",
                                                "expression": {
                                                    "type": "AssignmentExpression",
                                                    "operator": "=",
                                                    "left": {
                                                        "type": "Identifier",
                                                        "name": "high"
                                                    },
                                                    "right": {
                                                        "type": "BinaryExpression",
                                                        "operator": "-",
                                                        "left": {
                                                            "type": "Identifier",
                                                            "name": "mid"
                                                        },
                                                        "right": {
                                                            "type": "Literal",
                                                            "value": 1,
                                                            "raw": "1"
                                                        }
                                                    }
                                                }
                                            },
                                            "alternate": {
                                                "type": "IfStatement",
                                                "test": {
                                                    "type": "BinaryExpression",
                                                    "operator": ">",
                                                    "left": {
                                                        "type": "Identifier",
                                                        "name": "X"
                                                    },
                                                    "right": {
                                                        "type": "MemberExpression",
                                                        "computed": true,
                                                        "object": {
                                                            "type": "Identifier",
                                                            "name": "V"
                                                        },
                                                        "property": {
                                                            "type": "Identifier",
                                                            "name": "mid"
                                                        }
                                                    }
                                                },
                                                "consequent": {
                                                    "type": "ExpressionStatement",
                                                    "expression": {
                                                        "type": "AssignmentExpression",
                                                        "operator": "=",
                                                        "left": {
                                                            "type": "Identifier",
                                                            "name": "low"
                                                        },
                                                        "right": {
                                                            "type": "BinaryExpression",
                                                            "operator": "+",
                                                            "left": {
                                                                "type": "Identifier",
                                                                "name": "mid"
                                                            },
                                                            "right": {
                                                                "type": "Literal",
                                                                "value": 1,
                                                                "raw": "1"
                                                            }
                                                        }
                                                    }
                                                },
                                                "alternate": {
                                                    "type": "ReturnStatement",
                                                    "argument": {
                                                        "type": "Identifier",
                                                        "name": "mid"
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                }
                            },
                            {
                                "type": "ReturnStatement",
                                "argument": {
                                    "type": "UnaryExpression",
                                    "operator": "-",
                                    "argument": {
                                        "type": "Literal",
                                        "value": 1,
                                        "raw": "1"
                                    },
                                    "prefix": true
                                }
                            }
                        ]
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                }
            ],
            "sourceType": "script"
        }
        let checkset = [[1,     'function declaration',     'binarySearch',    null,            null],
                        [1,     'Param',                    'X',               null,            null],
                        [1,     'Param',                    'V',               null,            null],
                        [1,     'Param',                    'n',               null,            null],
                        [2,     'variable declaration',     'low',             null,            'null (or nothing)'],
                        [2,     'variable declaration',     'high',            null,            'null (or nothing)'],
                        [2,     'variable declaration',     'mid',             null,            'null (or nothing)'],
                        [3,     'assignment expression',    'low',             null,            '0'],
                        [4,     'assignment expression',    'high',            null,            'n-1'],
                        [5,     'while statement',          null,              'low<=high',     null],
                        [6,     'assignment expression',    'mid',             null,            'low+high/2'],
                        [7,     'if statement',             null,              'X',             null],
                        [8,     'assignment expression',    'high',            null,            'mid-1'],
                        [9,     'else if statement',        null,              'X>V[mid]',      null],
                        [10,    'assignment expression',    'low',             null,            'mid+1'],
                        [12,    'return statement',         null,              null,            'mid'],
                        [14,    'return statement',         null,              null,            '-1']


        ];
        logic.readJSON(parsedCode, dataset);


        if (checkset.length == dataset.length) {
            for (var i = 0; i < dataset.length && ans; i++) {
                if (checkset[i].length==dataset[i].length){
                    for (var j=0;j<dataset.length && ans;j++){
                        if (!((dataset[i][j]===null && checkset[i][j]===null) && new String(dataset[i][j]).valueOf() === new String(checkset[i][j]).valueOf())){
                            throw new Error(new String(dataset[i][j]) + ' , ' + new String(checkset[i][j]));
                        }
                    }
                }else ans=false;
            }
        } else ans=false;
        assert.equal(ans,true);
    });

});

