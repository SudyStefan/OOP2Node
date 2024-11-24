export class CRS {
  private type_: string;
  private properties_: Map<string, string>;

  constructor(type: string, properties: Map<string, string>) {
    this.type_ = type;
    this.properties_ = properties;
  }

  public get type(): string {
    return this.type_;
  }

  public get properties(): Map<string, string> {
    return this.properties_;
  }
}