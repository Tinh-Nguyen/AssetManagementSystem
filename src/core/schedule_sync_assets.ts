import fetch from 'node-fetch';
import schedule from "node-schedule";
import {BRAsset, BRAssetResponse} from '../core/br_response';
import {enviroment} from '../enviroments/enviroment';
import {AssetService} from '../services/asset.service';

export class ScheduleSyncData {
  constructor(
    private assetService: AssetService
  ) {
    this.initSchedulerSyncData();
    console.log("ScheduleSyncData");
    this.startSyncDataFromBR()

  }

  public initSchedulerSyncData() {
    //Run at 2:00:00AM every day.
    schedule.scheduleJob("0 0 2 * * *", this.startSyncDataFromBR);
  }
  private async startSyncDataFromBR() {
    try {
      var data = await this.fetchDataBRAssets();
      console.log(data);
      await this.processBRData(data);

    } catch (error) {
      ///handle error
      console.log(error);

    }
  }

  private async fetchDataBRAssets(numRetry: number = 0): Promise<BRAssetResponse> {
    var apiResponse = await fetch(enviroment.API_GET_ASSETS_FROM_BR);
    if (apiResponse.status = 200) {
      var data: BRAsset[] = await apiResponse.json().catch(error => undefined) as BRAssetResponse;
      return data;
    }
    if (numRetry <= 3) {
      await new Promise(r => setTimeout(r, 1000));
      return this.fetchDataBRAssets(++numRetry)
    }
    throw ("Error fetchData:" + apiResponse.statusText);
  }

  private async processBRData(data: BRAsset[]) {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      let isCanSync = await this.assetService.isCanSync(element);
      console.log("isCanSync", isCanSync);
      if (isCanSync) {
        await this.assetService.updateOrInsert(element);
      }
    }
  }
}
