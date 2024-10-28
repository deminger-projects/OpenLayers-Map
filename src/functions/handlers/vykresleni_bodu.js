import Feature from 'ol/Feature.js';
import LineString from 'ol/geom/LineString.js';

export default function vykresleni_bodu(mapa, body, layer_index){
    var new_features = []
    var points = []

    var layers = mapa.getLayers().array_
    var mereni_delky_layer = layers[layer_index].getSource() //layers[1] je vrstva pro mereni delky, jsou zde features pro ni potrebne; layers[2] je pro mereni uhlu

    mereni_delky_layer.clear()

    for(var bod of body){
        if(bod){
            new_features.push(bod)
            points.push(bod)
        }
    }

    for (let index = 0; index < points.length; index++) {
        if((index + 1) % 2 === 0){
            var line = new Feature({geometry: new LineString([points[index].getGeometry().getCoordinates(), points[index - 1].getGeometry().getCoordinates()])})

            new_features.push(line)
        }
    } 

    mereni_delky_layer.addFeatures(new_features)
}