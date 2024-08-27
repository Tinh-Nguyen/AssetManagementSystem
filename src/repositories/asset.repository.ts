// Copyright IBM Corp. and LoopBack contributors 2020. All Rights Reserved.
// Node module: @loopback/authentication-jwt
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, repository} from '@loopback/repository';
import {AMSDbDataSource} from '../datasources';
import {Asset, AssetWithRelations} from '../models/asset.model';
import {LocationRepository} from './location.repository';
export class AssetRepository extends DefaultCrudRepository<
  Asset,
  typeof Asset.prototype.asset_id,
  AssetWithRelations
> {

  // public readonly location: HasOneRepositoryFactory<Location, number>;

  constructor(
    @inject('datasources.AMS_DB') dataSource: AMSDbDataSource,
    @repository.getter('LocationRepository') locationRepository: Getter<LocationRepository>,

  ) {
    super(Asset, dataSource);

    // this.location = this.createHasOneRepositoryFactoryFor('location', locationRepository);
    // this.registerInclusionResolver('location', this.location.inclusionResolver);
  }

}
