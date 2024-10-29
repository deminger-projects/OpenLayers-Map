import vypocet_uhlu from '../../functions/vypocty/vypocet_uhlu';

import Uhel from '../switches/Uhel';
import vycisti_layer from '../../functions/handlers/vycisti_layer';
import handle_vykresleni from '../../functions/handlers/handle_vykresleni';

import { useEffect, useRef, useState } from 'react';
import handle_map_click from '../../functions/handlers/handle_map_click';

export default function Mereni_uhlu(props){

    const [usecka_1_bod_1_delka, set_usecka_1_bod_1_delka] = useState(0)
    const [usecka_1_bod_1_sirka, set_usecka_1_bod_1_sirka] = useState(0)

    const [usecka_1_bod_2_delka, set_usecka_1_bod_2_delka] = useState(0)
    const [usecka_1_bod_2_sirka, set_usecka_1_bod_2_sirka] = useState(0)

    const [usecka_2_bod_1_delka, set_usecka_2_bod_1_delka] = useState(0)
    const [usecka_2_bod_1_sirka, set_usecka_2_bod_1_sirka] = useState(0)

    const [usecka_2_bod_2_delka, set_usecka_2_bod_2_delka] = useState(0)
    const [usecka_2_bod_2_sirka, set_usecka_2_bod_2_sirka] = useState(0)

    const [bod_delka, set_bod_delka] = useState(0)
    const [bod_sirka, set_bod_sirka] = useState(0)

    const [uhel, set_uhel] = useState(0)

    const [body, set_body] = useState([])

    const current_input_index = useRef(0)

    const mereni_uhlu_gate_ref = useRef(false)
    
    const is_new = useRef(true)

    const is_onclick_event_on_map = useRef(false)

    useEffect(() => { //vypocet uhlu

        if(bod_delka && bod_sirka && usecka_1_bod_2_delka && usecka_1_bod_2_sirka && usecka_2_bod_2_delka && usecka_2_bod_2_sirka){
            var uhel_vysledek = vypocet_uhlu(bod_delka, bod_sirka, usecka_1_bod_1_delka, usecka_1_bod_1_sirka, usecka_2_bod_2_delka, usecka_2_bod_2_sirka)

            set_uhel(uhel_vysledek)
        }

    }, [bod_delka, bod_sirka, usecka_1_bod_2_delka, usecka_1_bod_2_sirka, usecka_2_bod_2_delka, usecka_2_bod_2_sirka])


    useEffect(() => {   // vytvori onclick event na Openlayers mape

        if(is_onclick_event_on_map.current === false){
            var mapa = props.mapa

            if(mapa){
                handle_map_click(mereni_uhlu_gate_ref, current_input_index, mapa, [[set_usecka_1_bod_1_delka, set_usecka_1_bod_1_sirka], [set_usecka_1_bod_2_delka, set_usecka_1_bod_2_sirka], [set_usecka_2_bod_1_delka, set_usecka_2_bod_1_sirka], [set_usecka_2_bod_2_delka, set_usecka_2_bod_2_sirka], [set_bod_delka, set_bod_sirka]])
    
                is_onclick_event_on_map.current = true
            }
        }        
    })

    useEffect(() => {   //vyobrazuje body a jejich ucesku
       
        handle_vykresleni([[usecka_1_bod_1_delka, usecka_1_bod_1_sirka], [usecka_1_bod_2_delka, usecka_1_bod_2_sirka], [usecka_2_bod_1_delka, usecka_2_bod_1_sirka], [usecka_2_bod_2_delka, usecka_2_bod_2_sirka], [bod_delka, bod_sirka]], 
            current_input_index.current, [...body], props.mapa, 2, set_body, props.uhel_gate)

        if((!usecka_1_bod_1_delka || !usecka_1_bod_1_sirka || !usecka_1_bod_2_delka || !usecka_1_bod_2_sirka || !usecka_2_bod_1_delka || !usecka_2_bod_1_sirka || !usecka_2_bod_2_delka || !usecka_2_bod_2_sirka || !bod_delka || !bod_sirka) && is_new.current === true){
            current_input_index.current = current_input_index.current + 1
        }else if(usecka_1_bod_1_delka && usecka_1_bod_1_sirka && usecka_1_bod_2_delka && usecka_1_bod_2_sirka && usecka_2_bod_1_delka && usecka_2_bod_1_sirka && usecka_2_bod_2_delka && usecka_2_bod_2_sirka && bod_delka && bod_sirka){
            is_new.current = false
        }

    }, [usecka_1_bod_1_delka, usecka_1_bod_1_sirka, usecka_1_bod_2_delka, usecka_1_bod_2_sirka, usecka_2_bod_1_delka, usecka_2_bod_1_sirka, usecka_2_bod_2_delka, usecka_2_bod_2_sirka, bod_delka, bod_sirka])


    useEffect(() => { //vymaze body na mape a jejich hodnoty

        vycisti_layer(props.mapa, 2, [set_usecka_1_bod_1_delka, set_usecka_1_bod_1_sirka, set_usecka_1_bod_2_delka, set_usecka_1_bod_2_sirka, set_usecka_2_bod_1_delka, set_usecka_2_bod_1_sirka, set_usecka_2_bod_2_delka, set_usecka_2_bod_2_sirka, set_bod_delka, set_bod_sirka, set_uhel],
            set_body, current_input_index)
        
    }, [props.uhel_gate])

    return(
        <>

            <div className='tlacitka_funkce'>
                <button onClick={() => {props.uhel_gate_setter(!props.uhel_gate); props.delka_gate_setter(false); mereni_uhlu_gate_ref.current = !props.uhel_gate}} className='button'>Angle Measurement</button>
            </div>
    

            {props.uhel_gate ? <>

            <div id='mereni_delky_comp'>
                <label htmlFor="x">Line segment 1</label>

                <br />

                <label htmlFor="">Point 1</label>

                <div className='mereni_delky_items'>

                    <label htmlFor="usecka_1_bod_1_sirka">Latitude</label>
                    <input className='input_my' id='usecka_1_bod_1_sirka' onChange={(e) => {if(e.target.value >= -90 && e.target.value <= 90){set_usecka_1_bod_1_sirka(e.target.value)}}} value={usecka_1_bod_1_sirka} onClick={() => {current_input_index.current = 0}} type="text" />

                    <label htmlFor="usecka_1_bod_1_delka">Longitude</label>
                    <input className='input_my' id='usecka_1_bod_1_delka' onChange={(e) => {if(e.target.value >= -180 && e.target.value <= 180){set_usecka_1_bod_1_delka(e.target.value)}}} value={usecka_1_bod_1_delka} onClick={() => {current_input_index.current = 0}} type="text" />
                </div>

                <br />

                <label htmlFor="">Point 2</label>

                <div className='mereni_delky_items'>

                    <label htmlFor="usecka_1_bod_2_sirka">Latitude</label>
                    <input className='input_my' id='usecka_1_bod_2_sirka' onChange={(e) => {if(e.target.value >= -90 && e.target.value <= 90){set_usecka_1_bod_2_sirka(e.target.value)}}} value={usecka_1_bod_2_sirka} onClick={() => {current_input_index.current = 1}} type="text" />

                    <label htmlFor="usecka_1_bod_2_delka">Longitude</label>
                    <input className='input_my' id='usecka_1_bod_2_delka' onChange={(e) => {if(e.target.value >= -180 && e.target.value <= 180){set_usecka_1_bod_2_delka(e.target.value)}}} value={usecka_1_bod_2_delka} onClick={() => {current_input_index.current = 1}} type="text" />
                </div>

                <br />

                <label  htmlFor="x">Line segment 2</label>

                <br />

                <label htmlFor="">Point 1</label>

                <div className='mereni_delky_items'>
                    
                    <label htmlFor="usecka_2_bod_1_sirka">Latitude</label>
                    <input className='input_my' id='usecka_2_bod_1_sirka' onChange={(e) => {if(e.target.value >= -90 && e.target.value <= 90){set_usecka_2_bod_1_sirka(e.target.value)}}} value={usecka_2_bod_1_sirka} onClick={() => {current_input_index.current = 2}} type="text" />

                    <label htmlFor="usecka_2_bod_1_delka">Longitude</label>
                    <input className='input_my' id='usecka_2_bod_1_delka' onChange={(e) => {if(e.target.value >= -180 && e.target.value <= 180){set_usecka_2_bod_1_delka(e.target.value)}}} value={usecka_2_bod_1_delka} onClick={() => {current_input_index.current = 2}} type="text" />

                </div>

                <br />

                <label htmlFor="">Point 2</label>

                <div className='mereni_delky_items'>

                    <label htmlFor="usecka_2_bod_2_sirka">Latitude</label>
                    <input className='input_my' id='usecka_2_bod_2_sirka' onChange={(e) => {if(e.target.value >= -90 && e.target.value <= 90){set_usecka_2_bod_2_sirka(e.target.value)}}} value={usecka_2_bod_2_sirka} onClick={() => {current_input_index.current = 3}} type="text" />

                    <label htmlFor="usecka_2_bod_2_delka">Longitude</label>
                    <input className='input_my' id='usecka_2_bod_2_delka' onChange={(e) => {if(e.target.value >= -180 && e.target.value <= 180){set_usecka_2_bod_2_delka(e.target.value)}}} value={usecka_2_bod_2_delka} onClick={() => {current_input_index.current = 3}} type="text" />

                </div>

                <br />

                <label htmlFor="">Point</label>

                <div className='mereni_delky_items'>

                    <label htmlFor="bod_sirka">Latitude</label>
                    <input className='input_my' id='bod_sirka' onChange={(e) => set_bod_sirka(e.target.value)} value={bod_sirka} onClick={() => {current_input_index.current = 4}} type="text" />

                    <label className='mereni_uhlu_items' htmlFor="bod_delka">Longitude</label>
                    <input className='input_my' id='bod_delka' onChange={(e) => set_bod_delka(e.target.value)} value={bod_delka} onClick={() => {current_input_index.current = 4}} type="text" />

                </div>
                
                <br />

                <Uhel hodnota={uhel} my_label={"Angle between points"}></Uhel>

            </div>

            </> : <></>}

        </>
    )
}