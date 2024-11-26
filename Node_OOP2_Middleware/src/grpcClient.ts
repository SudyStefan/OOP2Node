import * as protoLoader from '@grpc/proto-loader';
import * as grpc from '@grpc/grpc-js';

const packageDefinition = protoLoader.loadSync('./../shared/proto/mapservice.proto', {
  keepCase: true,
  longs: Number,
  enums: String,
  defaults: true,
  oneofs: true
});

const mapServiceProto: any = grpc.loadPackageDefinition(packageDefinition).mapservice;
const client = new mapServiceProto.MapService('localhost:8020', grpc.credentials.createInsecure());

export default client;