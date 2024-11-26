export interface CRSProto {
  type: string;
  properties: Object;
}

export interface AmenityGeometryProto {
  type: string;
  coordinates: number[];
  crs: CRSProto;
}

export interface AmenityProto {
  name: string;
  id: number;
  tags: Object;
  type: string;
  geom: AmenityGeometryProto;
}

export interface CoordinateList {
  coordinates: number[];
}

export interface RoadGeometryProto {
  type: string;
  coordinates: CoordinateList[];
  crs: CRSProto;
}

export interface RoadProto {
  name: string;
  id: number;
  tags: Object;
  type: string;
  geom: RoadGeometryProto;
  child_ids: number[];
}