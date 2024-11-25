export class CRS {
  public type: string;
  public properties: Map<string, string>;

  constructor(type: string, properties: Map<string, string>) {
    this.type = type;
    this.properties = properties;
  }
}