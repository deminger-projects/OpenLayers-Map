
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import VectorSource from 'ol/source/Vector.js';
import VectorLayer from 'ol/layer/Vector.js';

import Mereni_delky from './funkcni_komponenty/Mereni_delky';
import Mereni_uhlu from './funkcni_komponenty/Mereni_uhlu';

import { useEffect, useRef, useState } from 'react';

export default function OpenLayers_mapa(){
  
  const [delka_gate, set_delka_gate] = useState(false)
  const [uhel_gate, set_uhel_gate] = useState(false)

  const [map, set_map] = useState("")

  const map_div_ref = useRef("")

  useEffect(() => { // vytvori mapu

    const vectorSource = new VectorSource({});

    const vectorLayer_delka = new VectorLayer({source: vectorSource});
    const vectorLayer_uhel = new VectorLayer({source: vectorSource});

    const map = new Map({
      layers: [
        new TileLayer({source: new OSM()}),
        vectorLayer_delka, vectorLayer_uhel
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
      target: map_div_ref.current,
    });

    set_map(map)

    return () => map.setTarget(undefined)
  }, [])


  return(
      <>
          <div ref={map_div_ref} id='map' className='map' width="100%" height="400px"></div>

          <div id='my_components'>

            <Mereni_delky mapa={map} delka_gate={delka_gate} delka_gate_setter={set_delka_gate} uhel_gate={uhel_gate} uhel_gate_setter={set_uhel_gate}></Mereni_delky>

            <Mereni_uhlu mapa={map} delka_gate_setter={set_delka_gate} uhel_gate={uhel_gate} uhel_gate_setter={set_uhel_gate}></Mereni_uhlu>

          </div>
      </>
  )

}