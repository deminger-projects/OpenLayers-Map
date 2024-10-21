import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import * as olProj from 'ol/proj';
import vykresleni_bodu from './vykresleni_bodu';

export default function text(lon_lat_data_arr, bod_index, body_state, mapa, layer_index){

    var my_bod = lon_lat_data_arr[bod_index]

    if(my_bod[0] && my_bod[1]){
        var cords = olProj.fromLonLat(my_bod)
    
        var zem_delka = cords[0]
        var zem_sirka = cords[1]

        var new_point = new Feature({geometry: new Point([zem_delka, zem_sirka])})

        body_state[bod_index] = new_point

        vykresleni_bodu(mapa, body_state, layer_index)
    }
}
