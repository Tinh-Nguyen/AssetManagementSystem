export interface BRAsset {
  type: string
  serial: string,
  status: string,
  description: string,
  created_at: number,
  updated_at: number,
  location_id: number,
  id: string
}
export type BRAssetResponse = BRAsset[]
