import * as olProj from 'ol/proj';

export default function handle_map_click(gate_ref, current_input_index_ref, mapa, setters_arr){

    if(mapa){
        mapa.on("click", (e) => {   //pri kliknuti na mape ulozi informace o lokaci

            if(gate_ref.current){
                var point = mapa.getCoordinateFromPixel(e.pixel)
                var lonLat = olProj.toLonLat(point); 

                var zem_delka = lonLat[0]
                var zem_sirka = lonLat[1]

                var index = current_input_index_ref.current

                var index_setter = setters_arr[index]

                var index_setter_delka = index_setter[0]
                var index_setter_sirka = index_setter[1]

                index_setter_delka(zem_delka)
                index_setter_sirka(zem_sirka)
            }
        })
    }

}