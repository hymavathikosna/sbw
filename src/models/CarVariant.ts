import BaseResponse from 'models/BaseResponse'; 
import { CarModelResponse } from './CarModel';

export interface CarVariantRequest {
  variantName: string; 
  carModelId: number | null; 
}
export interface CarVariantResponse extends BaseResponse {
  variantName: string;
  carModel : CarModelResponse
}
