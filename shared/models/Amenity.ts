import { Entity } from "./Entity";
import { CRS } from "./CRS";

export class Amenity extends Entity {
  public geom: AmenityGeometry;

  constructor(name: string, id: number, tags: Map<string, string>, type: string, geomtype: string, coordinates: number[], crs: CRS) {
    super(name, id, tags, type);
    this.geom = new AmenityGeometry(geomtype, coordinates, crs);
  }
}

class AmenityGeometry {
  public type: string;
  public coordinates: number[];
  public crs: CRS;

  constructor(type: string, coordinates: number[], crs: CRS) {
    this.type = type;
    this.coordinates = coordinates;
    this.crs = crs;
  }
}

export class AmenityBuilder {

}