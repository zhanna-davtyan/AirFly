export class Airplane {
  id: number;
  model: string;
  capacity: number;

  constructor(
    id: number,
    model: string,
    capacity: number,
  ) {
    this.id = id;
    this.model = model;
    this.capacity = capacity;
  }
}
