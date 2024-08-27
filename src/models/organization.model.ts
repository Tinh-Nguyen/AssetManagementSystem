import {Entity, model, property} from '@loopback/repository';


@model({settings: {strict: true, mysql: {schema: 'public', table: 'organizations'}}})
export class Organization extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    mysql: {
      columnName: 'organization_id',
      dataType: 'int',
      dataLength: 11,
      nullable: 'NO',
    }
  })
  organization_id: number;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'organization_name',
      dataType: 'varchar',
      dataLength: 255,
      nullable: 'NO',
    }
  })
  organization_name: string;


  constructor(data?: Partial<Organization>) {
    super(data);
  }
}

export interface OrganizationRelations {

}

export type OrganizationWithRelations = Organization & OrganizationRelations;
