export class Entity {
  public name: string;
  public id: number;
  public tags: Map<string, string>;
  public type: string;
  
  constructor(name: string, id: number, tags: Map<string, string>, type: string) {
    this.name = name;
    this.id = id;
    this.tags = tags;
    this.type = type;
  }
}