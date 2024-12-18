import { XMLParser, X2jOptions } from 'fast-xml-parser';
import fs from 'fs';
import { Amenity } from "../../shared/models/Amenity";
import { Road } from "../../shared/models/Roads";
import { CRS } from "../../shared/models/CRS";
import { Repository } from './Repository';


const crs = new CRS('name', new Map<string, string>().set("name", "EPSG:0"));

export function readOSM(filePath: string): void {

  const parseOptions: X2jOptions = {
    ignoreAttributes: false,
    attributeNamePrefix: ''
  };

  const file = fs.readFileSync(filePath);
  const parsedOSM = new XMLParser(parseOptions).parse(file);

  const amenities: Map<number, Amenity> = processNodes(parsedOSM.osm.node);
  const roads: Map<number, Road> = processWays(parsedOSM.osm.way, amenities);

  Repository.initRepository(amenities, roads);
}

function processNodes(nodes: any): Map<number, Amenity> {
  const amenities: Map<number, Amenity> = new Map<number, Amenity>(nodes.map((node: any) => {
    let tags: Map<string, string>;
    if (node.tag) {
      if (!node.tag.k) {
        tags = new Map(node.tag.map((tag: any) => [tag.k, tag.v]));
      } else {
        tags = new Map<string, string>().set(node.tag.k, node.tag.v);
      }
      const name = tags.get('name') ?? "";
      const type = tags.get('amenity') ?? "";
      return [parseInt(node.id), new Amenity(name, parseInt(node.id), tags, type, "Point", [parseFloat(node.lon), parseFloat(node.lat)], crs)];
    } else {
      return [parseInt(node.id), new Amenity("", parseInt(node.id), new Map<string, string>(), "", "Point", [parseFloat(node.lon), parseFloat(node.lat)], crs)];
    }
  })); 

  return amenities;
}

function processWays(ways: any, amenities: Map<number, Amenity>): Map<number, Road> {
  const roads: Map<number, Road> = new Map<number, Road>(ways.map((way: any) => {
    let tags: Map<string, string>;
    let child_ids: number[] = [];
    const coordinates: number[][] = way.nd.map((nd: any) => {
      child_ids.push(parseInt(nd.ref));
      return amenities.get(parseInt(nd.ref))?.geom.coordinates ?? [];
    });
    if (way.tag) {
      if (!way.tag.k) {
        tags = new Map(way.tag.map((tag: any) => [tag.k, tag.v]));
      } else {
        tags = new Map<string, string>().set(way.tag.k, way.tag.v);
      }
      const name = tags.get('name') ?? "";
      const type = tags.get('highway') ?? "";


      return [parseInt(way.id), new Road(name, parseInt(way.id), tags, type, "LineString", coordinates, crs, child_ids)];
    } else {
      return [parseInt(way.id), new Road("", parseInt(way.id), new Map<string, string>(), "", "LineString", coordinates, crs, child_ids)];
    }
  })); 

  return roads;
}

function processRelations() {

}