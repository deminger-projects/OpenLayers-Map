import vypocet_azimuth from '../../functions/vypocty/vypocet_azimuth';
import vypocet_delka from '../../functions/vypocty/vypocet_delka';

import { useEffect, useRef, useState } from 'react';
import Delka from '../switches/Delka';
import Uhel from '../switches/Uhel';
import vycisti_layer from '../../functions/handlers/vycisti_layer';
import handle_vykresleni from '../../functions/handlers/handle_vykresleni';
import handle_map_click from '../../functions/handlers/handle_map_click';

export default function Mereni_delky(props){

    const [delka_bod1_delka, set_delka_bod1_delka] = useState(0)
    const [delka_bod1_sirka, set_delka_bod1_sirka] = useState(0)
  
    const [delka_bod2_delka, set_delka_bod2_delka] = useState(0)
    const [delka_bod2_sirka, set_delka_bod2_sirka] = useState(0)

    const [delka, set_delka] = useState(0)
    const [azimut, set_azimut] = useState(0)

    const [body, set_body] = useState([])

    const is_onclick_event_on_map = useRef(false)
    
    const mereni_delky_gate_ref = useRef(false)

    const is_new = useRef(true)

    const current_input_index = useRef(0)

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
                handle_map_click(mereni_delky_gate_ref, current_input_index, mapa, [[set_delka_bod1_delka, set_delka_bod1_sirka], [set_delka_bod2_delka, set_delka_bod2_sirka]])
    
                is_onclick_event_on_map.current = true
            }
        }
    })


    useEffect(() => {   //vykresluje body

        handle_vykresleni([[delka_bod1_delka, delka_bod1_sirka], [delka_bod2_delka, delka_bod2_sirka]], 
            current_input_index.current, [...body], props.mapa, 1, set_body, props.delka_gate)

        if((!delka_bod1_delka || !delka_bod1_sirka || !delka_bod2_delka || !delka_bod2_sirka) && is_new.current === true){
            current_input_index.current = current_input_index.current + 1
        }else if(delka_bod1_delka && delka_bod1_sirka && delka_bod2_delka && delka_bod2_sirka){
            is_new.current = false
        }


        
    }, [delka_bod1_delka, delka_bod1_sirka, delka_bod2_delka, delka_bod2_sirka])


    useEffect(() => { //vymaze body na mape a jejich hodnoty

        vycisti_layer(props.mapa, 1, [set_delka_bod1_sirka, set_delka_bod1_delka, set_delka_bod2_sirka, set_delka_bod2_delka, set_delka, set_azimut], 
            set_body, current_input_index)

    }, [props.delka_gate])


    return(
        <>
            <div className='tlacitka_funkce'>
                <button onClick={() => {props.uhel_gate_setter(false); props.delka_gate_setter(!props.delka_gate); mereni_delky_gate_ref.current = !props.delka_gate}} className='button'>Distance measurement</button>
            </div>

            {props.delka_gate ? <>
                <div id='mereni_delky_comp'>

                <label>Point 1</label>

                    <div className='mereni_delky_items'>

                        <label htmlFor="bod1_y">Latitude</label>
                        <input type="text" className='input_my' onChange={(e) => {if(e.target.value >= -90 && e.target.value <= 90){set_delka_bod1_sirka(e.target.value)}}} onClick={() => {current_input_index.current = 0}} value={delka_bod1_sirka} id='bod1_y'/>

                        <label htmlFor="bod1_x">Longitude</label>
                        <input className='input_my' onChange={(e) => {if(e.target.value >= -180 && e.target.value <= 180){set_delka_bod1_delka(e.target.value)}}} onClick={() => {current_input_index.current = 0}} value={delka_bod1_delka} id="bod1_x" type="text" />

                    </div>

                    <br />

                    <label>Point 2</label>
                    
                    <div className='mereni_delky_items'>

                        <label htmlFor="bod2_y">Latitude</label>
                        <input className='input_my' onChange={(e) => {if(e.target.value >= -90 && e.target.value <= 90){set_delka_bod2_sirka(e.target.value)}}} value={delka_bod2_sirka} onClick={() => {current_input_index.current = 1}} id='bod2_y' type="text" />

                        <label htmlFor="bod2_x">Longitude</label>
                        <input className='input_my' onChange={(e) => {if(e.target.value >= -180 && e.target.value <= 180){set_delka_bod2_delka(e.target.value)}}} value={delka_bod2_delka} onClick={() => {current_input_index.current = 1}} id='bod2_x' type="text" />

                    </div>

                    <br />

                    <Delka hodnota={delka}></Delka>

                    <Uhel hodnota={azimut} my_label={"Azimuth"}></Uhel>                    

                </div>
            </> : <></>}
        </>
    )
}