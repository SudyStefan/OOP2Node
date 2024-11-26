import { Router, Request, Response} from 'express';
import client from './grpcClient';
import { error } from 'console';

const router: Router = Router();

export const getAmenityById = (req: Request, res: Response): void => {
  const { id } = req.params;
  client.amenityById({ id: id }, (error: any, response: any) => {
    if (error) {
      console.log(error);
    } else {
      res.send(response);
    }
  });
}

export const getAmenities = (req: Request, res: Response): void => {
  client.amenities({}, (error: any, response: any) => {
    if (error) {
      console.log(error);
    } else {
      res.send(response);
    }
  });
}

export const getRoadById = (req: Request, res: Response): void => {
  const { id } = req.params;
  client.roadById({id: id}, (error: any, response: any) => {
    if (error) {
      console.log(error);
    } else {
      response.geom.coordinates = response.geom.coordinates.map((coords:any) => coords.coordinates);
      res.send(response)
    }
  })
}

export const getRoads = (req: Request, res: Response): void => {
  client.roads({}, (error: any, response: any) => {
    if (error) {
      console.log(error);
    } else {
      res.send(response);
    }
  });
}


router.get('/amenities', getAmenities);
router.get('/amenities/:id', getAmenityById);
router.get('/roads', getRoads);
router.get('/roads/:id', getRoadById);

export default router;