import BaseResponse from 'models/BaseResponse'; 
import { VehicleTypeResponse } from './VehicleType';

export interface CarMakeRequest {
  makeName: string; 
  vehicleTypeId: number | null; 
}
export interface CarMakeResponse extends BaseResponse {
  makeName: string;
  vehicleType: VehicleTypeResponse;
}
