import BaseResponse from 'models/BaseResponse'; 

export interface VehicleTypeRequest {
  vehicleTypeName: string; 
}
export interface VehicleTypeResponse extends BaseResponse {
  vehicleTypeName: string;
}
