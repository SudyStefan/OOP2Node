# Responses samples

## Notes

* `name` can be extracted from the key-value pairs of the tags
* `geom` is the GeoJSON of the loaded geometry (A0: copy the response from one of the samples, the easiest is a point, A1: JTS has this functionality built-in)
* `tags` is just a map from String to String

## Amenities

`GET http://localhost:8010/amenities?point.x=15.44679&point.y=47.06646&point.d=100&take=2&amenity=restaurant`

```json
{
  "entries": [
    {
      "name": "Casineum",
      "id": 31625435,
      "geom": {
        "type": "Point",
        "crs": {
          "type": "name",
          "properties": {
            "name": "EPSG:0"
          }
        },
        "coordinates": [
          15.4379613,
          47.0699068
        ]
      },
      "tags": {
        "toilets:wheelchair": "yes",
        "wheelchair": "yes",
        "amenity": "theatre",
        "name": "Casineum"
      },
      "type": "theatre"
    },
    {
      "name": "Burgring Garage",
      "id": 21261052,
      "geom": {
        "type": "Point",
        "crs": {
          "type": "name",
          "properties": {
            "name": "EPSG:0"
          }
        },
        "coordinates": [
          15.4452594,
          47.0708341
        ]
      },
      "tags": {
        "maxheight": "1.95",
        "amenity": "parking_entrance",
        "name": "Burgring Garage",
        "vehicle": "yes"
      },
      "type": "parking_entrance"
    },
    {
      "name": "Polizeiinspektion Schmiedgasse",
      "id": 26899640,
      "geom": {
        "type": "Point",
        "crs": {
          "type": "name",
          "properties": {
            "name": "EPSG:0"
          }
        },
        "coordinates": [
          15.4393231,
          47.0686148
        ]
      },
      "tags": {
        "wheelchair": "yes",
        "addr:housenumber": "26",
        "phone": "+43 59133 6593 100",
        "amenity": "police",
        "addr:country": "AT",
        "name": "Polizeiinspektion Schmiedgasse",
        "addr:street": "Schmiedgasse",
        "addr:postcode": "8010",
        "addr:city": "Graz"
      },
      "type": "police"
    },
    {
      "name": "",
      "id": 289888353,
      "geom": {
        "type": "Point",
        "crs": {
          "type": "name",
          "properties": {
            "name": "EPSG:0"
          }
        },
        "coordinates": [
          15.4429001,
          47.0686097
        ]
      },
      "tags": {
        "collection_times": "Mo-Fr 17:00",
        "amenity": "post_box",
        "check_date:collection_times": "2022-04-13",
        "addr:country": "AT",
        "addr:street": "Hamerlinggasse",
        "addr:postcode": "8010",
        "operator": "Post",
        "addr:city": "Graz"
      },
      "type": "post_box"
    },
    {
      "name": "",
      "id": 290161198,
      "geom": {
        "type": "Point",
        "crs": {
          "type": "name",
          "properties": {
            "name": "EPSG:0"
          }
        },
        "coordinates": [
          15.4487617,
          47.071778
        ]
      },
      "tags": {
        "amenity": "telephone",
        "check_date": "2021-07-04",
        "created_by": "Potlatch 0.10f"
      },
      "type": "telephone"
    }
  ],
  "paging": {
    "take": 2,
    "total": 5,
    "skip": 0
  }
}
```

## Amenity by ID

`GET  http://localhost:8010/amenities/26899640

```json
{
  "name": "Polizeiinspektion Schmiedgasse",
  "id": 26899640,
  "geom": {
    "type": "Point",
    "crs": {
      "type": "name",
      "properties": {
        "name": "EPSG:0"
      }
    },
    "coordinates": [
      15.4393231,
      47.0686148
    ]
  },
  "tags": {
    "wheelchair": "yes",
    "addr:housenumber": "26",
    "phone": "+43 59133 6593 100",
    "amenity": "police",
    "addr:country": "AT",
    "name": "Polizeiinspektion Schmiedgasse",
    "addr:street": "Schmiedgasse",
    "addr:postcode": "8010",
    "addr:city": "Graz"
  },
  "type": "police"
}
```

## Roads

`GET http://localhost:8010/roads?bbox.tl.x=15.45534&bbox.tl.y=47.05938&bbox.br.x=15.46127&bbox.br.y=47.05709&road=residential&take=1`

```json
{
  "entries": [
    {
      "name": "Harrachgasse",
      "id": 3997985,
      "geom": {
        "type": "LineString",
        "crs": {
          "type": "name",
          "properties": {
            "name": "EPSG:0"
          }
        },
        "coordinates": [
          [
            15.4452531,
            47.0758469
          ],
          [
            15.4453456,
            47.0758901
          ]
        ]
      },
      "tags": {
        "sidewalk": "both",
        "cycleway:both": "no",
        "surface": "asphalt",
        "lit": "yes",
        "oneway:bicycle": "yes",
        "maxspeed": "30",
        "name": "Harrachgasse",
        "highway": "residential",
        "name:etymology:wikidata": "Q689050",
        "wikidata": "Q106635499",
        "oneway": "yes"
      },
      "type": "residential",
      "child_ids": [
        332085686,
        2921786347
      ]
    },
    {
      "name": "Halbärthgasse",
      "id": 3997987,
      "geom": {
        "type": "LineString",
        "crs": {
          "type": "name",
          "properties": {
            "name": "EPSG:0"
          }
        },
        "coordinates": [
          [
            15.4501904,
            47.0761661
          ],
          [
            15.449979,
            47.0763601
          ]
        ]
      },
      "tags": {
        "sidewalk": "both",
        "cycleway:both": "no",
        "surface": "asphalt",
        "lit": "yes",
        "maxspeed": "20",
        "name": "Halbärthgasse",
        "highway": "residential",
        "wikidata": "Q106635496",
        "name:etymology": "Josef Halbärth (1762-1846)",
        "name:start_date": "1844"
      },
      "type": "residential",
      "child_ids": [
        20929609,
        1392830660
      ]
    },
    {
      "name": "Alberstraße",
      "id": 4014537,
      "geom": {
        "type": "LineString",
        "crs": {
          "type": "name",
          "properties": {
            "name": "EPSG:0"
          }
        },
        "coordinates": [
          [
            15.4514959,
            47.0700555
          ],
          [
            15.4524184,
            47.0697512
          ],
          [
            15.4524811,
            47.0697243
          ]
        ]
      },
      "tags": {
        "sidewalk": "both",
        "surface": "asphalt",
        "lit": "yes",
        "maxspeed": "30",
        "name": "Alberstraße",
        "highway": "residential",
        "name:etymology:wikidata": "Q106339916",
        "wikidata": "Q106635435",
        "name:etymology": "Albin Alber",
        "name:start_date": "1860"
      },
      "type": "residential",
      "child_ids": [
        1253038341,
        9607338715,
        21271819
      ]
    },
    {
      "name": "Bürgergasse",
      "id": 4014547,
      "geom": {
        "type": "LineString",
        "crs": {
          "type": "name",
          "properties": {
            "name": "EPSG:0"
          }
        },
        "coordinates": [
          [
            15.4429019,
            47.0699889
          ],
          [
            15.4427947,
            47.0701495
          ]
        ]
      },
      "tags": {
        "bicycle": "yes",
        "surface": "asphalt",
        "lit": "yes",
        "name": "Bürgergasse",
        "highway": "pedestrian",
        "wikidata": "Q106635458",
        "name:start_date": "1785"
      },
      "type": "pedestrian",
      "child_ids": [
        21298455,
        449291553
      ]
    },
    {
      "name": "Rittergasse",
      "id": 4399899,
      "geom": {
        "type": "LineString",
        "crs": {
          "type": "name",
          "properties": {
            "name": "EPSG:0"
          }
        },
        "coordinates": [
          [
            15.4464399,
            47.0754936
          ],
          [
            15.445841,
            47.0753454
          ],
          [
            15.4458303,
            47.0753427
          ],
          [
            15.4457195,
            47.0753152
          ]
        ]
      },
      "tags": {
        "note": "blaue tafel -> cycleway",
        "bicycle": "designated",
        "surface": "cobblestone",
        "name": "Rittergasse",
        "highway": "cycleway",
        "foot": "designated",
        "segregated": "no"
      },
      "type": "cycleway",
      "child_ids": [
        26899084,
        3871899917,
        3871899916,
        20929488
      ]
    }
  ],
  "paging": {
    "take": 1,
    "total": 5,
    "skip": 0
  }
}
```

## Road By ID

`GET http://localhost:8010/roads/3997987

```json
{
  "name": "Halbärthgasse",
  "id": 3997987,
  "geom": {
    "type": "LineString",
    "crs": {
      "type": "name",
      "properties": {
        "name": "EPSG:0"
      }
    },
    "coordinates": [
      [
        15.4501904,
        47.0761661
      ],
      [
        15.449979,
        47.0763601
      ]
    ]
  },
  "tags": {
    "sidewalk": "both",
    "cycleway:both": "no",
    "surface": "asphalt",
    "lit": "yes",
    "maxspeed": "20",
    "name": "Halbärthgasse",
    "highway": "residential",
    "wikidata": "Q106635496",
    "name:etymology": "Josef Halbärth (1762-1846)",
    "name:start_date": "1844"
  },
  "type": "residential",
  "child_ids": [
    20929609,
    1392830660
  ]
}
```

## Errors

Any error you manually create should have the following very simple schema with a message of your choice (just return something that makes sense in this situation, for easiere debugability!)

```json
{
	"message": "Did not find requested entity!"
}
```