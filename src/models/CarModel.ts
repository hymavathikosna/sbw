import BaseResponse from 'models/BaseResponse'; 
import { CarMakeResponse } from './CarMake';

export interface CarModelRequest {
  modelName: string; 
  carMakeId: number | null; 
}
export interface CarModelResponse extends BaseResponse {
  modelName: string;
  carMake:CarMakeResponse
}
