
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import * as olProj from 'ol/proj';

import vykresleni_bodu from '../../functions/vykresleni_bodu';
import vypocet_azimuth from '../../functions/vypocty/vypocet_azimuth';
import vypocet_delka from '../../functions/vypocty/vypocet_delka';

import { useEffect, useRef, useState } from 'react';
import Delka from '../switches/Delka';
import Uhel from '../switches/Uhel';
import vycisti_layer from '../../functions/vycisti_layer';
import text from '../../functions/text';

export default function Mereni_delky(props){

    const [delka_bod1_delka, set_delka_bod1_delka] = useState(0)
    const [delka_bod1_sirka, set_delka_bod1_sirka] = useState(0)
  
    const [delka_bod2_delka, set_delka_bod2_delka] = useState(0)
    const [delka_bod2_sirka, set_delka_bod2_sirka] = useState(0)

    const [delka, set_delka] = useState(0)
    const [azimut, set_azimut] = useState(0)

    const [bod_test, set_bod_test] = useState([])

    const is_onclick_event_on_map = useRef(false)

    const mereni_delky_gate_ref = useRef(false)

    const current_input = useRef("bod_1")
    const current_input_index = useRef(0)


    const bod_1 = useRef("")
    const bod_2 = useRef("")


    useEffect(() => { //vypocitava delku a azimuth pri zmene dat

        if(delka_bod1_delka && delka_bod1_sirka && delka_bod2_delka && delka_bod2_sirka){
            var azimut_vysledek = vypocet_azimuth([delka_bod1_delka, delka_bod1_sirka], [delka_bod2_delka, delka_bod2_sirka])
            var delka_vysledek = vypocet_delka([delka_bod1_delka, delka_bod1_sirka], [delka_bod2_delka, delka_bod2_sirka])

            set_delka(delka_vysledek)
            set_azimut(azimut_vysledek)
        }
    
      }, [delka_bod1_delka, delka_bod1_sirka, delka_bod2_delka, delka_bod2_sirka, props.jednotky_delka])


    useEffect(() => {   // vytvori onclick event na Openlayers mape

        if(is_onclick_event_on_map.current === false){
            var mapa = props.mapa
    
            if(mapa){
                mapa.on("click", (e) => {   //pri kliknuti na mape ulozi informace o lokaci

                    if(mereni_delky_gate_ref.current){
                        var point = mapa.getCoordinateFromPixel(e.pixel)
                        var lonLat = olProj.toLonLat(point); 
                  
                        var cords_delka = point[0]
                        var cords_sirka = point[1]

                        var zem_delka = lonLat[0]
                        var zem_sirka = lonLat[1]
                  
                        var new_point = new Feature({geometry: new Point([cords_delka, cords_sirka])})
    
                        var my_features = [...bod_test]
                        my_features[current_input_index.current] = new_point
                        set_bod_test(my_features)

                        switch(current_input.current){
                            case "bod_1":
                                set_delka_bod1_delka(zem_delka)
                                set_delka_bod1_sirka(zem_sirka)
                                current_input.current = "bod_2"
                                //current_input_index.current = current_input_index.current + 1
                                bod_1.current = new_point
                                break
                            
                            case "bod_2":
                                set_delka_bod2_delka(zem_delka)
                                set_delka_bod2_sirka(zem_sirka)
                                bod_2.current = new_point
                                break
    
                            default: 
                                set_delka_bod1_delka(zem_delka)
                                set_delka_bod1_sirka(zem_sirka)
                                current_input.current = "bod_2"
                                bod_1.current = new_point
                                break
                        }
                    }
                })

                is_onclick_event_on_map.current = true
            }
        }        
    })



    useEffect(() => {

        var mapa = props.mapa
        var delka_gate = props.delka_gate

        if(mapa && delka_gate === true){
            text([[delka_bod1_delka, delka_bod1_sirka], [delka_bod2_delka, delka_bod2_sirka]], current_input_index.current, [...bod_test], mapa, 1)
        }
        

    }, [delka_bod1_delka, delka_bod1_sirka, delka_bod2_delka, delka_bod2_sirka])


    useEffect(() => { //vymaze body na mape a jejich hodnoty

        vycisti_layer(props.mapa, 1, [set_delka_bod1_sirka, set_delka_bod1_delka, set_delka_bod2_sirka, set_delka_bod2_delka, set_delka, set_azimut], [bod_1, bod_2], current_input)

    }, [props.delka_gate])


    return(
        <>
            <div className='tlacitka_funkce'>
                <button onClick={() => {props.uhel_gate_setter(false); props.delka_gate_setter(!props.delka_gate); mereni_delky_gate_ref.current = !props.delka_gate}} className='button'>Měření délky</button>
            </div>

            {props.delka_gate ? <>
                <div id='mereni_delky_comp'>

                <label>Bod 1</label>

                    <div className='mereni_delky_items'>

                        <label htmlFor="bod1_y">Zeměpisná šířka</label>
                        <input type="text" className='input_my' onChange={(e) => {if(e.target.value >= -90 && e.target.value <= 90){set_delka_bod1_sirka(e.target.value)}}} onClick={() => {current_input.current = "bod_1"; current_input_index.current = 0}} value={delka_bod1_sirka} id='bod1_y'/>

                        <label htmlFor="bod1_x">Zeměpisná délka</label>
                        <input className='input_my' onChange={(e) => {if(e.target.value >= -180 && e.target.value <= 180){set_delka_bod1_delka(e.target.value)}}} onClick={() => {current_input.current = "bod_1"; current_input_index.current = 0}} value={delka_bod1_delka} id="bod1_x" type="text" />

                    </div>

                    <br />

                    <label>Bod 2</label>
                    
                    <div className='mereni_delky_items'>

                        <label htmlFor="bod2_y">Zeměpisná šířka</label>
                        <input className='input_my' onChange={(e) => {if(e.target.value >= -90 && e.target.value <= 90){set_delka_bod2_sirka(e.target.value)}}} value={delka_bod2_sirka} onClick={() => {current_input.current = "bod_2"; current_input_index.current = 1}} id='bod2_y' type="text" />

                        <label htmlFor="bod2_x">Zeměpisná délka</label>
                        <input className='input_my' onChange={(e) => {if(e.target.value >= -180 && e.target.value <= 180){set_delka_bod2_delka(e.target.value)}}} value={delka_bod2_delka} onClick={() => {current_input.current = "bod_2"; current_input_index.current = 1}} id='bod2_x' type="text" />

                    </div>

                    <br />

                    <Delka hodnota={delka}></Delka>

                    <Uhel hodnota={azimut} my_label={"Azimuth"}></Uhel>                    

                </div>
            </> : <></>}
        </>
    )
}