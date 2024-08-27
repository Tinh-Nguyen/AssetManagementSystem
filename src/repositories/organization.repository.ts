// Copyright IBM Corp. and LoopBack contributors 2020. All Rights Reserved.
// Node module: @loopback/authentication-jwt
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AMSDbDataSource} from '../datasources';
import {Organization, OrganizationWithRelations} from '../models/organization.model';
export class OrganizationRepository extends DefaultCrudRepository<
  Organization,
  typeof Organization.prototype.organization_id,
  OrganizationWithRelations
> {
  constructor(
    @inject('datasources.AMS_DB') dataSource: AMSDbDataSource,
  ) {
    super(Organization, dataSource);
  }
}
