import * as grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader"
import { Repository } from "./Repository";
import fs from 'fs'
import { Amenity } from "../../shared/models/Amenity";
import { Road } from "../../shared/models/Roads";
import { CRS } from "../../shared/models/CRS";
import { EntityProto, CRSProto, AmenityGeometryProto, AmenityProto, CoordinateList, RoadGeometryProto, RoadProto } from "../../shared/models/ProtoModels";

function readJSON<T>(filePath: string, ctor: new (...args: any[]) => T): Map<number, T> {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const parseData = JSON.parse(data);

    const map = new Map<number, T>(
      parseData.map((item: any) => {
        item.id,
        new ctor(item.name, item.id, item.tags, item.type, item.geom.type, item.geom.coordinates, new CRS(item.geom.crs.type, item.geom.crs.properties));
      })
    );
    return map;
  } catch (error) {
    console.log(error);
    return new Map();
  }
}

const PROTO_PATH = "./../shared/proto/mapservice.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const amenityData = JSON.parse(fs.readFileSync("./data/amenities.json", 'utf-8'));
const amenities = new Map<number, Amenity>(
  amenityData.map((item: any) => [
    item.id, 
    new Amenity(
      item.name, 
      item.id, 
      item.tags, 
      item.type, 
      item.geom.type, 
      item.geom.coordinates, 
      new CRS(item.geom.crs.type, item.geom.crs.properties)
    )
  ])
);

const roadData = JSON.parse(fs.readFileSync("./data/roads.json", 'utf-8'));
const roads = new Map<number, Road>(
  roadData.map((item: any) => [
    item.id, 
    new Road(
      item.name, 
      item.id, 
      item.tags, 
      item.type, 
      item.geom.type, 
      item.geom.coordinates, 
      new CRS(item.geom.crs.type, item.geom.crs.properties)
    )
  ])
);

Repository.initRepository(amenities, roads);

const mapServiceProt: any = grpc.loadPackageDefinition(packageDefinition).mapservice;

const amenityById = (call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) => {
  const { id } = call.request;
  const amenity = Repository.getAmenities().get(parseInt(id));
  if (amenity !== undefined) {
    callback(null, amenityToProto(amenity));
  } else {
    callback({code: grpc.status.NOT_FOUND, message: `No amenity found with id: ${id}`});
  }
};

const roadById = (call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) => {
  const { id } = call.request;
  const road = Repository.getRoads().get(id);
  callback(null, { road });
};

const server = new grpc.Server();
server.addService(mapServiceProt.MapService.service, { amenityById, roadById });
const adress = "localhost:8020";

server.bindAsync(adress, grpc.ServerCredentials.createInsecure(), () => {
  console.log("Server started at localhost:8020");
});

function amenityToProto(amenity: Amenity): AmenityProto {

  const entityProto: EntityProto = {
    name: amenity.name,
    id: amenity.id,
    tags: amenity.tags,
    type: amenity.type
  };

  const geomProto: AmenityGeometryProto = {
    type: amenity.geom.type,
    coordinates: amenity.geom.coordinates,
    crs: amenity.geom.crs
  };

  const proto: AmenityProto = {
    entity: entityProto,
    geom: geomProto
  }; 

  return proto;
}

function roadToProto(road: Road): RoadProto {
  const entityProto: EntityProto = {
    name: road.name,
    id: road.id,
    tags: road.tags,
    type: road.type
  };
  
  const coords: CoordinateList[] = road.geom.coordinates.map(inner => (
    { coordinates: inner }
  ));

  const geomProto: RoadGeometryProto = {
    type: road.geom.type,
    coordinates: coords,
    crs: road.geom.crs
  };
  
  const proto: RoadProto = {
    entity: entityProto,
    geom: geomProto
  }; 

  return proto;
}