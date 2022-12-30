// import React, { useRef, useEffect } from "react";
// import Bookmarks from "@arcgis/core/widgets/Bookmarks";
// import Expand from "@arcgis/core/widgets/Expand";
// import MapView from "@arcgis/core/views/MapView";
// import WebMap from "@arcgis/core/WebMap";
// import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
// import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

// import WebStyleSymbol from "@arcgis/core/symbols/WebStyleSymbol";
// import PortalItem from "@arcgis/core/portal/PortalItem";

// // import Hexagon from "../src/assets/utah_hexLayer.json";
// import Hexagon from "../src/assets/grid.json";

// import "./App.css";

// function App() {
//   const mapDiv = useRef(null);

//   useEffect(() => {
//     if (mapDiv.current) {
//       /**
//        * Initialize application
//        */
//       // const markerStyle = new WebStyleSymbol({
//       //   name: "hexagon-3",
//       //   styleName: "Esri2DPointSymbolsStyle",
//       // });
//       const blob = new Blob([JSON.stringify(Hexagon)], {
//         type: "application/json",
//       });
//       const url = URL.createObjectURL(blob);

//       const renderer = {
//         type: "simple",
//         symbol: {
//           type: "simple-fill",
//           color: "#8db82e",
//           outline: {
//             color: "white",
//             width: 0.7,
//           },
//         },
//       };
//       const geojsonlayer = new GeoJSONLayer({
//         url,
//         opacity: 0.5,
//         renderer: renderer,
//         maxScale: 4,
//         popupEnabled: true,

//         // screenSizePerspectiveEnabled: true,
//         // maxScale: 20,
//         // minScale: 10,
//         // copyright: "USGS Earthquakes",
//       });

//       let item = new PortalItem({
//         id: "aa1d3f80270146208328cf66d022e09c",
//         // id: "f1fb14ed2f2d4c99a2a603105133b2a2",
//       });
//       item.load();
//       const webmap = new WebMap({
//         // portalItem: {
//         //   id: "aa1d3f80270146208328cf66d022e09c",
//         // },
//         portalItem: item,
//       });
//       webmap.add(geojsonlayer);

//       const view = new MapView({
//         container: mapDiv.current,
//         map: webmap,
//       });
//       function changeHandler(evt) {
//         var extent = evt.extent,
//           zoomed = evt.levelChange;
//         // ... Do something ...
//         console.log(zoomed, "event");
//         // in some cases, you may want to disconnect the event listener
//       }
//       var a = view.on("extent-change", changeHandler);

//       // console.log(view.on.name);
//       // const bookmarks = new Bookmarks({
//       //   view,
//       //   // allows bookmarks to be added, edited, or deleted
//       //   editingEnabled: true,
//       // });

//       // const bkExpand = new Expand({
//       //   view,
//       //   content: bookmarks,
//       //   expanded: true,
//       // });

//       // Add the widget to the top-right corner of the view
//       // view.ui.add(bkExpand, "top-right");
//       // console.log(webmap.editableLayers);
//       // bonus - how many bookmarks in the webmap?
//       webmap.when(() => {
//         // if (webmap.bookmarks && webmap.bookmarks.length) {
//         //   console.log("Bookmarks: ", webmap.bookmarks.length);
//         // } else {
//         //   console.log("No bookmarks in this webmap.");
//         // }
//         // console.log(webmap, "after webmap laod");
//       });
//     }
//   }, []);

//   return <div className="mapDiv" ref={mapDiv}></div>;
// }

// export default App;
