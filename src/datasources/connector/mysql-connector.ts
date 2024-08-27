var connector = require('loopback-connector-mysql');
var g = require('strong-globalize')();
var SqlConnector = require('loopback-connector').SqlConnector;
var ParameterizedSQL = SqlConnector.ParameterizedSQL;


const _buildExpression = connector.MySQL.prototype.buildExpression;
// console.log(connector.MySQL.prototype);
// console.log(connector.MySQL.prototype.buildExpression.toString());



function updateFunctionBuildExpressionForMySQL(){
  connector.MySQL.prototype.buildExpression = function (columnName: string, operator: string, operatorValue: any, propertyDefinition: any) {
    // var dataSplit = columnName.split("->$.");
    // console.log("buildExpression",columnName,operator, operatorValue,propertyDefinition);
    
    // if (dataSplit.length > 1) {
    //   ///ABC->$.SSS
    //   var columnJSONName = dataSplit[0];
    //   var properties = dataSplit.slice(1);
      
    //   operatorValue = JSON.parse(operatorValue);
    //   const keys = Object.keys(operatorValue);
    //   if (keys.length > 1) {
    //     g.warn('{{MySQL}} {{json}} syntax can only receive one key, received ' + keys.length);
    //   }
    //   // const jsonPointer = "$." + keys[0];
    //   const value = operatorValue[keys[0]];
    //   const column = `JSON_EXTRACT(${columnJSONName}, "$.${properties}")`;
    //    console.log(column);
      
    //   if (value && value.constructor === Object) {
    //     // this includes another operator, apply it on the built column
    //     const operator = Object.keys(value)[0];
    //     return _buildExpression.apply(this, [column, operator, value[operator], propertyDefinition]);
    //   }
    //   const clause = `${column} = ?`;
    //   return new ParameterizedSQL(clause, [value]);
      
    //   ///ABC->$.SSS
    // }
    if (operator === 'json') {
      operatorValue = JSON.parse(operatorValue);
      const keys = Object.keys(operatorValue);
      if (keys.length > 1) {
        g.warn('{{MySQL}} {{json}} syntax can only receive one key, received ' + keys.length);
      }
      const jsonPointer = "$." + keys[0];
      const value = operatorValue[keys[0]];
      const column = `JSON_EXTRACT(${columnName}, "${jsonPointer}")`;
      if (value && value.constructor === Object) {
        // this includes another operator, apply it on the built column
        const operator = Object.keys(value)[0];
        return _buildExpression.apply(this, [column, operator, value[operator], propertyDefinition]);
      }
      const clause = `${column} = ?`;
      return new ParameterizedSQL(clause, [value]);
    } 
    else {
      return _buildExpression.apply(this, [columnName, operator, operatorValue, propertyDefinition])
    }
  };
}
export default {updateFunctionBuildExpressionForMySQL};