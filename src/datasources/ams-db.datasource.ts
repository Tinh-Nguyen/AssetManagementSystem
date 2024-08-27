import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import MysqlConnector from "./connector/mysql-connector";

const config = {
  name: 'ams_db',
  connector: 'mysql',
  url: '',
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'ams_db'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class AMSDbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'AMS_DB';
  static readonly defaultConfig = config;

  constructor(
    @inject("datasources.config.AMS_DB", {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
    MysqlConnector.updateFunctionBuildExpressionForMySQL()
    // console.log(MysqlConnector.MySQL.prototype.buildExpression.toString());

  }
}
