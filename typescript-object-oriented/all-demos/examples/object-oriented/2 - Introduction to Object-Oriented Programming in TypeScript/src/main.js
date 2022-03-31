// #### Create object using object literal
var objLiteral = {
    balance: 500
};
// #### Create object using a class
var ClassObject = /** @class */ (function () {
    function ClassObject() {
        this.balance = 1000;
    }
    return ClassObject;
}());
var classObj = new ClassObject();
// #### Create object using a function
function FunctionObject() {
    this.balance = 9000;
}
var functionObj = new FunctionObject();
// #### Create object using Object.create()
var objCreate = Object.create(objLiteral);
var render = function () {
    var total = objLiteral.balance + classObj.balance + functionObj.balance + objCreate.balance;
    document.querySelector('#viewTemplate').innerHTML = "\n        <h2>Welcome to Acme Bank!</h2><br /><h5>Your account balances:</h5><br />\n        Object Literal Object Balance: $".concat(objLiteral.balance, "\n        <br />\n        Class Object Balance: $").concat(classObj.balance, "\n        <br />\n        Function Constructor Object Balance: $").concat(functionObj.balance, "\n        <br />\n        Object.create() Object Balance: $").concat(objCreate.balance, "\n\n        <br /><br />\n        <strong>Total:</strong> $").concat(total, "\n    ");
}();
//# sourceMappingURL=main.js.map