export class Entity {
  private name_: string;
  private id_: number;
  private tags_: Map<string, string>;
  private type_: string;
  
  constructor(name: string, id: number, tags: Map<string, string>, type: string) {
    this.name_ = name;
    this.id_ = id;
    this.tags_ = tags;
    this.type_ = type;
  }

  public get name(): string {
    return this.name_;
  };

  public get id(): number {
    return this.id_;
  }

  public get tags(): Map<string, string> {
    return this.tags_;
  }

  public get type(): string {
    return this.type_;
  }
}