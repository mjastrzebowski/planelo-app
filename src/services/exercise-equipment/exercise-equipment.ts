export class IExerciseEquipment {
  createdAt?: number;
  id: number;
  key?: string;
  hide?: boolean;
  active?: boolean;
  exerciseId: number;
  equipmentId: number;
}


export class ExerciseEquipment implements IExerciseEquipment {
  id: number;
  exerciseId: number;
  equipmentId: number;

  constructor(exerciseId: number, equipmentId: number) {
    this.exerciseId = exerciseId;
    this.equipmentId = equipmentId;
  }
}
