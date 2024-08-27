import {Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {Asset} from './asset.model';
import {Organization} from './organization.model';
export enum LocationStatus {
  Active = 1,
  Unactive = 2
}
@model({settings: {strict: true, mysql: {schema: 'public', table: 'locations'}}})
export class Location extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    mysql: {
      columnName: 'location_id',
      dataType: 'int',
      dataLength: 11,
      nullable: 'NO',
    }
  })
  location_id: number;

  @property({
    type: 'string',
    mysql: {
      columnName: 'location_name',
      dataType: 'varchar',
      dataLength: 255,
      nullable: 'NO',
    },
  })
  location_name?: string;

  @property({
    type: 'number',
    mysql: {
      columnName: 'status',
      dataType: 'tinyint',
      dataLength: 4,
      nullable: 'NO',
    },
  })
  status: LocationStatus;


  @property({
    type: 'number',
    mysql: {
      columnName: 'organization_id',
      dataType: 'int',
      dataLength: 11,
      nullable: 'NO',
    },
  })
  organization_id: number;


  @hasOne(() => Organization, {name: "organization", keyFrom: "organization_id", keyTo: "organization_id"})
  organization?: Organization;

  @hasMany(() => Asset, {name: "assets", keyFrom: "location_id", keyTo: "location_id"})
  assets?: Asset[];

  constructor(data?: Partial<Location>) {
    super(data);
  }
}

export interface LocationRelations {
  organization?: Organization
  assets?: Asset[];
}

export type LocationWithRelations = Location & LocationRelations;
