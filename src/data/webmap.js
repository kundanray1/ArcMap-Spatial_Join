import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Graphic from "@arcgis/core/Graphic";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine";
import Polygon from "@arcgis/core/geometry/Polygon";
import Circle from "@arcgis/core/geometry/Circle";
import * as colorRendererCreator from "@arcgis/core/smartMapping/renderers/color";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";
import Hexagon from "../assets/grid (4).json";
import BridgesJson from "../assets/bridge.json";
import "@arcgis/core/assets/esri/themes/light/main.css";

import Bridge from "../assets/images.png";
import { Layers } from "@material-ui/icons";

const symbol = {
  type: "picture-marker",
  url: Bridge,
  width: 20,
  height: 20,
  yoffset: 0,
};

export const webmap = new ArcGISMap({
  basemap: "streets-navigation-vector",
  // basemap: "arcgis-light-gray",
});

const app = {
  map: webmap,
  center: [-116.5, 33.8],
  scale: 25000,
  ui: {
    components: ["attribution", "zoom", "compass"],
  },
};

export let view = new MapView(app);

export async function initialize(container) {
  console.log("Entered into intialize");
  const blob = new Blob([JSON.stringify(Hexagon)], {
    type: "application/json",
  });
  const blobBridge = new Blob([JSON.stringify(BridgesJson)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const urlbridge = URL.createObjectURL(blobBridge);

  const renderer = {
    type: "simple",
    symbol: {
      type: "simple-fill",
      color: "green",
      outline: {
        color: "white",
        width: 1,
      },
    },
  };
  const rendererBridge = {
    type: "simple",
    symbol: symbol,
    // outline: {
    //   // color: "Red",
    //   width: 10,
    // },
  };
  const geojsonlayer = new GeoJSONLayer({
    url,
    opacity: 0.5,
    renderer: renderer,
    visible: true,
    popupEnabled: true,
    maxScale: 8,
  });

  const geojsonlayerBridge = new GeoJSONLayer({
    // url: "https://services7.arcgis.com/NLjNvtlX2BYq9yBK/arcgis/rest/services/bridge/FeatureServer",
    url: urlbridge,
    editingEnabled: true,
    screenSizePerspectiveEnabled: true,

    opacity: 1,
    // maxScale: 1 / 2,
    renderer: rendererBridge,
    popupTemplate: {
      title: "{bridge_nam}",
      // content: "{bridge_typ}",

      content: [
        {
          type: "fields",
          fieldInfos: [
            {
              fieldName: "status",
              label: "Status",
              isEditable: true,
              tooltip: "",
              visible: true,
              format: null,
              stringFieldOption: "text-box",
            },
            {
              fieldName: "globalid",
              label: "Globa ID",
              isEditable: false,
              tooltip: "",
              visible: true,
              format: null,
              stringFieldOption: "text-box",
            },
            {
              fieldName: "CreationDa",
              label: "Creation Date",
              isEditable: false,
              tooltip: "",
              visible: true,
              format: null,
              stringFieldOption: "text-box",
            },
            {
              fieldName: "Creator",
              label: "Creator",
              isEditable: false,
              tooltip: "",
              visible: true,
              format: null,
              stringFieldOption: "text-box",
            },

            {
              fieldName: "EditDate",
              label: "EditDate",
              isEditable: false,
              tooltip: "",
              visible: true,
              format: {
                places: 2,
                digitSeparator: true,
              },

              stringFieldOption: "text-box",
            },
            {
              fieldName: "Editor",
              label: "Editor",
              isEditable: false,
              tooltip: "",
              visible: true,
              format: null,
              stringFieldOption: "text-box",
            },
            {
              fieldName: "bridge_nam",
              label: "Bridge Name",
              isEditable: false,
              tooltip: "",
              visible: true,
              format: null,
              stringFieldOption: "text-box",
            },
            {
              fieldName: "bridge_typ",
              label: "Bridge Type",
              isEditable: false,
              tooltip: "",
              visible: true,
              format: null,
              stringFieldOption: "text-box",
            },
            {
              fieldName: "bridge_nam",
              label: "Bridge Name",
              isEditable: false,
              tooltip: "",
              visible: true,
              format: null,
              stringFieldOption: "text-box",
            },
            {
              fieldName: "length_ft",
              label: "Length",
              isEditable: false,
              tooltip: "",
              visible: true,
              format: null,
              stringFieldOption: "text-box",
            },
            {
              fieldName: "width_br_f",
              label: "Width",
              isEditable: false,
              tooltip: "",
              visible: true,
              format: null,
              stringFieldOption: "text-box",
            },
            {
              fieldName: "additional",
              label: "Additional ",
              isEditable: false,
              tooltip: "",
              visible: true,
              format: null,
              stringFieldOption: "text-box",
            },
            {
              fieldName: "span_1",
              label: "Span 1",
              isEditable: false,
              tooltip: "",
              visible: true,
              format: null,
              stringFieldOption: "text-box",
            },
            {
              fieldName: "span_2",
              label: "Span 2",
              isEditable: false,
              tooltip: "",
              visible: true,
              format: null,
              stringFieldOption: "text-box",
            },
            {
              fieldName: "span_3",
              label: "Span 3",
              isEditable: false,
              tooltip: "",
              visible: true,
              format: null,
              stringFieldOption: "text-box",
            },
            {
              fieldName: "span_4",
              label: "Span 4",
              isEditable: false,
              tooltip: "",
              visible: true,
              format: null,
              stringFieldOption: "text-box",
            },
          ],
        },
      ],
    },
    // minScale: 20,
    // featureReduction: { type: "binning" },
    // visible: true,
    // popupEnabled: true,
    // popupTemplate: {
    //   title: "{bridge_nam}",
    //   content: "{bridge_typ}",
    // },
    // screenSizePerspectiveEnabled: true,
    // maxScale: 5,
    // minScale: 10,
    // copyright: "USGS Earthquakes",
  });
  // const hexagonalPolygons = [];

  // geojsonlayerBridge.queryFeatures().then(function (results) {
  //   const features = results.features;
  //   features.forEach(function (feature) {
  //     const centerPoint = feature.geometry.extent.center;

  //     // const hexagonalPolygon = geometryEngine.
  //     // console.log("after extent");
  //     const circle = new Circle({
  //       center: view.center,
  //       radius: 600,
  //       spatialReference: view.spatialReference,
  //     });
  //     const points = geometryEngine.geodesicBuffer(
  //       circle.center,
  //       circle.radius,
  //       "meters"
  //     );

  //     const hexagonalPolygon = new Polygon({
  //       centroid: centerPoint,
  //       // rings: Polygon.createRegularPolygon(centerPoint, 600, 6),
  //       rings: [points.slice(0, 6)],

  //       spatialReference: view.spatialReference,
  //     });

  //     console.log("after hexagonalPlane");

  //     hexagonalPolygon.attributes = {
  //       status: feature.attributes.status,
  //     };

  //     hexagonalPolygons.push(hexagonalPolygon);
  //   });
  // });
  // app.map.layers = [geojsonlayerBridge, geojsonlayer];
  app.map.add(geojsonlayerBridge);
  console.log("Add bridge");

  app.map.add(geojsonlayer);
  // console.log("Add geoJson");
  // setTimeout(() => {}, 10000);
  view.when(async () => {
    const [geojsonlayerView, geojsonlayerBridgeView] = await Promise.all([
      view.whenLayerView(geojsonlayer),
      view.whenLayerView(geojsonlayerBridge),
    ]);

    // console.log(geojsonlayerView, geojsonlayerBridgeView, "Promise returns");
    // setInterval(() => {

    // }, 2000);
    // await reactiveUtils.whenOnce(() => view === false, console.log("updating"));

    const query = {
      returnGeometry: true,
      outFields: ["*"],
    };
    const geoJsonResults = await geojsonlayer.queryFeatures(query);
    const geoJsonBridgeResult = await geojsonlayerBridge.queryFeatures(query);
    console.log(
      geoJsonResults.features,
      geoJsonBridgeResult.features,
      "query result"
    );

    const features = [];
    let temp = [...geoJsonBridgeResult.features];
    let tmp2 = [];

    for (let feat of geoJsonResults.features) {
      const graphic = feat.clone();
      graphic.attributes.count = 0;
      graphic.attributes.status = "Not Specified";
      tmp2 = [...temp];
      // console.log(tmp2.length, "bridge container array size temp");
      for (let i = 0; i < tmp2.length; i++) {
        const x = temp[i];
        // if (graphic.geometry.contains(x)) {
        //   console.log(
        //     x.geometry,
        //     "geometry of points",
        //     graphic.geometry.contains(x.geometry)
        //   );
        // }
        // const isContained = geometryEngine.contains(
        //   graphic.geometry,
        //   x.geometry
        // );
        // if (isContained) {
        //   console.log(x.geometry, "yes it is contained");
        // }

        if (
          x &&
          graphic.geometry &&
          x.geometry &&
          geometryEngine.contains(graphic.geometry, x.geometry)
        ) {
          console.log("splicing");
          graphic.attributes.status = x.attributes.status;
          graphic.attributes.count++;
          temp.splice(i, 1);
        }
      }
      // console.log(graphic.attributes.count, "newly creagted features");

      features.push(graphic);
    }
    // for (let i = 0; i < features.length; i++) {
    //   if (features[i].attributes.count == 1) {
    //     console.log(features[i].geometry);
    //   }
    // }
    // console.log(temp, tmp2, "tmp console");
    app.map.removeMany([geojsonlayer]);
    const joinLayer = await createLayer(geojsonlayer, features, [
      {
        name: "count",
        alist: "Count",
        type: "integer",
      },
      {
        name: "status",
        alist: "Status",
        type: "string",
      },
    ]);
    const querys = {
      // returnGeometry: true,
      outFields: ["Count"],
    };
    const Result = await joinLayer.queryFeatures(query);
    console.log(Result.features[0].attributes.status);
    const colors = ["red", "yellow", "green"];

    const rendererProps = {
      type: "unique-value", // autocasts as new UniqueValueRenderer()
      field: "status",
      defaultSymbol: {
        type: "simple-fill",
        color: "transparent",
        outline: {
          color: "white",
          width: 1,
        },
      }, // autocasts as new SimpleFillSymbol()
      uniqueValueInfos: [
        {
          // All features with value of "North" will be blue
          value: "good",
          symbol: {
            type: "simple-fill", // autocasts as new SimpleFillSymbol()
            color: "green",
          },
        },
        {
          // All features with value of "East" will be green
          value: "fair",
          symbol: {
            type: "simple-fill", // autocasts as new SimpleFillSymbol()
            color: "yellow",
          },
        },
        {
          // All features with value of "South" will be red
          value: "risk",
          symbol: {
            type: "simple-fill", // autocasts as new SimpleFillSymbol()
            color: "red",
          },
        },
      ],
    };

    // const { renderer } = await colorRendererCreator.createContinuousRenderer({
    //   layer: joinLayer,
    //   view,
    //   field: "status",
    //   them: "above-and-below",

    // });
    console.log("returned from creagted layer");
    joinLayer.renderer = rendererProps;
    joinLayer.opacity = 0.6;
    joinLayer.maxScale = 10000;
    // joinLayer.minSc = 4;

    joinLayer.popupTemplate = {
      title: "{__OBJECTID}",
      content: [
        {
          type: "fields",
          fieldInfos: [
            {
              fieldName: `count`,
              label: "Number Of bridges",
              isEditable: false,
              tooltip: "",
              visible: true,
              format: null,
              stringFieldOption: "text-box",
            },
          ],
        },
      ],
    };
    app.map.add(joinLayer);
    console.log(view);
    // await reactiveUtils.whenOnce(() => view === false, console.log("updating"));
    // await watchUtils.whenFalseOnce(view, "updating");
  });

  view.container = container;
  // view.spatialReference = 4326;
  return view;
}

export async function createLayer(layer, source, extraFields) {
  console.log("entered into  CreateLayer");

  await layer.load();

  const fieldInfosMap = new Map();

  for (const field of [...layer.fields]) {
    console.log("loop inside inserting fieldinfos");
    fieldInfosMap.set(field.name, {
      fieldName: field.name,
      label: field.alias || field.name,
    });
  }
  const fieldInfos = [...new Set(fieldInfosMap.values())];
  // console.log(fieldInfos, "field infos");

  const featLayer = new FeatureLayer({
    title: "SPATIAL JOIN",
    objectIdField: layer.objectIdField,
    fields: [...new Set([...layer.fields, ...extraFields])],
    geometryType: layer.geometryType,
    source,
    popupTemplate: {
      title: "Copy Layer",
      contentL: [
        {
          type: "fields",
          fieldInfos: [...fieldInfos.values()],
        },
      ],
    },
  });
  return featLayer;

  // console.log(fieldInfos);
}

export async function showLocation(item) {
  const { attributes, location, extent } = item;
  const graphic = new Graphic({
    attributes,
    geometry: {
      type: "point",
      ...location,
    },
    symbol,
    popupTemplate: {
      title: "{PlaceName}",
      content: "{Place_addr}",
    },
  });
  view.graphics.add(graphic);
  view.extent = extent;
}
