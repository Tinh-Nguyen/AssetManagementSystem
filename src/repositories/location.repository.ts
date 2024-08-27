// Copyright IBM Corp. and LoopBack contributors 2020. All Rights Reserved.
// Node module: @loopback/authentication-jwt
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AMSDbDataSource} from '../datasources';
import {Location, LocationWithRelations} from '../models/location.model';
export class LocationRepository extends DefaultCrudRepository<
  Location,
  typeof Location.prototype.location_id,
  LocationWithRelations
> {

  constructor(
    @inject('datasources.AMS_DB') dataSource: AMSDbDataSource,
  ) {
    super(Location, dataSource);
  }

}
