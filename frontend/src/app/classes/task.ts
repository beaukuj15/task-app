export class Task {

  name: string;
  description: string;
  id: number;


  constructor(id: number, name: string, description: string) {
    this.name = name;
    this.description = description;
    this.id = id;
  }


}
