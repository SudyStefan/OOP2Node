import * as grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader"
import { Repository } from "./Repository";
import fs from 'fs'
import { Amenity } from "../../shared/models/Amenity";
import { Road } from "../../shared/models/Roads";
import { CRS } from "../../shared/models/CRS";
import { AmenityGeometryProto, AmenityProto, CoordinateList, CRSProto, RoadGeometryProto, RoadProto } from "../../shared/models/ProtoModels";
import { readOSM } from "./osmParser";

const filePath = './data/styria_reduced.osm';
readOSM(filePath);

const PROTO_PATH = "./../shared/proto/mapservice.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: Number,
  enums: String,
  defaults: true,
  oneofs: true
});

const mapServiceProt: any = grpc.loadPackageDefinition(packageDefinition).mapservice;

const amenityById = (call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) => {
  const { id } = call.request;
  const amenity = Repository.getAmenities().get(parseInt(id));
  if (amenity !== undefined) {
    callback(null, amenityToProto(amenity));
  } else {
    callback({code: grpc.status.NOT_FOUND, message: `No amenity found with id: ${id}`}, null);
  }
};

const amenities = (call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) => {
  const amenitiesProto: AmenityProto[] = Array.from(Repository.getAmenities().entries()).map(([key, amenity]) => {
    return amenityToProto(amenity);
  });
  callback(null, { amenities: amenitiesProto });
}

const roadById = (call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) => {
  const { id } = call.request;
  const road = Repository.getRoads().get(parseInt(id));
  console.log(road);
  if (road !== undefined) {
    callback(null, roadToProto(road));
  } else {
    callback({code: grpc.status.NOT_FOUND, message: `No road found with id: ${id}`}, null);
  }
};

const roads = (call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) => {
  const roadsProto: RoadProto[] = Array.from(Repository.getRoads().entries()).map(([key, roads]) => {
    return roadToProto(roads);
  });
  callback(null, { roads: roadsProto });
}

const server = new grpc.Server();
server.addService(mapServiceProt.MapService.service, { amenityById, roadById, amenities, roads });
const adress = "localhost:8020";

server.bindAsync(adress, grpc.ServerCredentials.createInsecure(), () => {
  console.log("Server started at localhost:8020");
});

function amenityToProto(amenity: Amenity): AmenityProto {
  const crsProto: CRSProto = {
    type: amenity.geom.crs.type,
    properties: Object.fromEntries(amenity.geom.crs.properties)
  };

  const geomProto: AmenityGeometryProto = {
    type: amenity.geom.type,
    coordinates: amenity.geom.coordinates,
    crs: crsProto
  };

  const proto: AmenityProto = {
    name: amenity.name,
    id: amenity.id,
    tags: Object.fromEntries(amenity.tags),
    type: amenity.type,
    geom: geomProto
  }; 

  return proto;
}

function roadToProto(road: Road): RoadProto {
  const coords: CoordinateList[] = road.geom.coordinates.map(inner => (
    { coordinates: inner }
  ));

  const crsProto: CRSProto = {
    type: road.geom.crs.type,
    properties: Object.fromEntries(road.geom.crs.properties)
  };

  const geomProto: RoadGeometryProto = {
    type: road.geom.type,
    coordinates: coords,
    crs: crsProto
  };

  const proto: RoadProto = {
    name: road.name,
    id: road.id,
    tags: Object.fromEntries(road.tags),
    type: road.type,
    geom: geomProto,
    child_ids: road.child_ids
  }; 

  console.log(proto);
  return proto;
}