import { TrainingComplex, TrainingSimple } from "../../@types/NetworkTraining";

export interface ITrainingFailureData {
  description: string;
  message: string;
  data: TrainingSimple[] | TrainingComplex[]
}