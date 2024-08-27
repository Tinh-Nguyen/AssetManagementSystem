import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true, mysql: {schema: 'public', table: 'assets'}}})
export class Asset extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    mysql: {
      columnName: 'asset_id',
      dataType: 'varchar',
      dataLength: 255,
      nullable: 'NO'
    },
  })
  asset_id: string;

  @property({
    type: 'number',
    mysql: {
      columnName: 'location_id',
      dataType: 'int',
      dataLength: 11,
      nullable: 'NO',
    },
  })
  location_id: number;

  @property({
    type: 'object',
    mysql: {
      columnName: 'data',
      dataType: 'longtext',
      nullable: 'NO',
    },
  })
  data?: object;

  @property({
    type: 'date',
    mysql: {
      columnName: 'date_modified',
      dataType: 'datetime',
      nullable: 'NO'
    },
  })
  date_modified?: Date;

  constructor(data?: Partial<Asset>) {
    super(data);
  }
}


export interface AssetRelations {
}

export type AssetWithRelations = Asset & AssetRelations;
