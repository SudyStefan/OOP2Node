import { Entity } from "./Entity";
import { CRS } from "./CRS";

export class Road extends Entity {
  private geom_: RoadGeometry;

  constructor(name: string, id: number, tags: Map<string, string>, type: string, geomtype: string, coordinates: number[][], crs: CRS) {
    super(name, id, tags, type);
    this.geom_ = new RoadGeometry(geomtype, coordinates, crs);
  }

  public get geom(): RoadGeometry {
    return this.geom_;
  }
}

class RoadGeometry {
  private type_: string;
  private coordinates_: number[][];
  private crs_: CRS;

  constructor(type: string, coordinates: number[][], crs: CRS) {
    this.type_ = type;
    this.coordinates_ = coordinates;
    this.crs_ = crs;
  }

  public get type(): string {
    return this.type_;
  }

  public get coordinates(): number[][] {
    return this.coordinates_;
  }

  public get crs(): CRS {
    return this.crs_;
  }
}