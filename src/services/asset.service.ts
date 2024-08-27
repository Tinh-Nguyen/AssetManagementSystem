import {repository} from '@loopback/repository';
import {BRAsset} from '../core/br_response';
import {Asset} from '../models/asset.model';
import {LocationStatus} from '../models/location.model';
import {AssetRepository} from '../repositories/asset.repository';
import {LocationRepository} from '../repositories/location.repository';

export class AssetService {
  constructor(
    @repository(LocationRepository) private locationRepository: LocationRepository,
    @repository(AssetRepository) private assetRepository: AssetRepository,

  ) { }


  /**
   * Synchronize assets when the location already exists in the database
  * Only sync assets created in the past.and status equal active
   * @param data
   * @returns
   */
  public async isCanSync(data: BRAsset) {
    var now = Date.now();
    console.log(now, data.created_at);

    var isCreatedInPast = now < data.created_at * 1000;/// if created_at is smaller than current time
    if (isCreatedInPast) {
      return false;
    }
    //check can sync for the location
    var location = await this.locationRepository.findById(data.location_id).catch(error => undefined);
    if (location && location.status == LocationStatus.Active) {
      return true;
    }
    return false;
  }

  public async updateOrInsert(data: BRAsset) {
    var isExist = await this.assetRepository.exists(data.id);
    if (isExist) {
      //update
      return await this.assetRepository.updateById(data.id, {
        data: data,
        location_id: data.location_id,
      })
    } else {//create
      var dataCreate: Asset = new Asset();
      dataCreate.asset_id = data.id;
      dataCreate.data = data;
      dataCreate.location_id = data.location_id;
      dataCreate.date_modified = new Date();
      return await this.assetRepository.create(dataCreate);
    }
  }

}
