import * as grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader"
import { Repository } from "./Repository";
import fs from 'fs'
import { Amenity } from "./Amenity";
import { Road } from "./Roads";
import { CRS } from "./CRS";
import { Entity } from "./Entity";

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

const PROTO_PATH = __dirname + "./../proto/mapservice.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const amenities: Map<number, Amenity> = readJSON<Amenity>("./data/amenities.json", Amenity);
const roads: Map<number, Road> = readJSON<Road>("./data/roads.json", Road);

Repository.initRepository(amenities, roads);

const mapServiceProt: any = grpc.loadPackageDefinition(packageDefinition).mapservice;

const amenityById = (call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) => {
  const { id } = call.request;
  const amenity = Repository.getAmenities().get(id);
  callback(null, { amenity });
};

const server = new grpc.Server();
server.addService(mapServiceProt.MapService.service, { amenityById });
const adress = "localhost:8020";

server.bindAsync(adress, grpc.ServerCredentials.createInsecure(), () => {
  console.log("Server started at localhost:8020");
});

