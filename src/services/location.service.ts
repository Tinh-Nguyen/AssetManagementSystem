import {repository} from '@loopback/repository';
import {LocationStatus} from '../models/location.model';
import {LocationRepository} from '../repositories/location.repository';
import {OrganizationRepository} from '../repositories/organization.repository';

export class LocationService {
  constructor(
    @repository(LocationRepository) private locationRepository: LocationRepository,
    @repository(OrganizationRepository) private organizationRepository: OrganizationRepository,

  ) {

  }

  public async createMockData() {
    await this.createMockOrganization();

    await this.createMockLocationData(1, "Da Nang", "PNS", LocationStatus.Active);
    await this.createMockLocationData(2, "Ha Noi", "PNS", LocationStatus.Unactive)
    await this.createMockLocationData(3, "Ho Chi Minh", "PNS", LocationStatus.Active)
    await this.createMockLocationData(4, "Nha Trang", "PLJ", LocationStatus.Active)
    await this.createMockLocationData(5, "Can Tho", "PLJ", LocationStatus.Active)

  }

  private async createMockLocationData(location_id: number, locationName: string, organization: string, status: LocationStatus) {


    var isExist = await this.locationRepository.exists(location_id);
    if (isExist == false) {
      await this.locationRepository.create({
        location_id: location_id,
        location_name: locationName,
        organization_id: organization == "PNS" ? 1 : 2,
        status: status
      });

    }
  }
  private async createMockOrganization() {
    await this.organizationRepository.create({
      organization_id: 1,
      organization_name: "PNS"
    }).catch(error => undefined);

    await this.organizationRepository.create({
      organization_id: 2,
      organization_name: "PLJ"
    }).catch(error => undefined)

  }

}
