import { Amenity } from "../../shared/models/Amenity";
import { Road } from "../../shared/models/Roads";

export class Repository {
  private static repo: Repository;
  private static amenities: Map<number, Amenity> = new Map();
  private static roads: Map<number, Road> = new Map();

  private constructor() {}

  public static initRepository(amenities: Map<number, Amenity>, roads: Map<number, Road>) {
    if (!this.repo) {
      this.repo = new Repository();
    }
    this.amenities = amenities;
    this.roads = roads;
  }

  public static getAmenities(): Map<number, Amenity> {
    return this.amenities;
  }
  public static getRoads(): Map<number, Road> {
    return this.roads;
  }
}