import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import * as olProj from 'ol/proj';

import vykresleni_bodu from '../../functions/vykresleni_bodu';
import vypocet_uhlu from '../../functions/vypocty/vypocet_uhlu';

import Uhel from '../switches/Uhel';
import vycisti_layer from '../../functions/vycisti_layer';

import { useEffect, useRef, useState } from 'react';

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

    const mereni_uhlu_gate_ref = useRef(false)

    const is_onclick_event_on_map = useRef(false)

    const current_input = useRef("bod_1")

    const bod_1 = useRef("")
    const bod_2 = useRef("")
    const bod_3 = useRef("")
    const bod_4 = useRef("")
    const bod_5 = useRef("")

    useEffect(() => { //vypocet uhlu

        if(bod_delka && bod_sirka && usecka_1_bod_2_delka && usecka_1_bod_2_sirka && usecka_2_bod_2_delka && usecka_2_bod_2_sirka){
            var uhel_vysledek = vypocet_uhlu(bod_delka, bod_sirka, usecka_1_bod_2_delka, usecka_1_bod_2_sirka, usecka_2_bod_2_delka, usecka_2_bod_2_sirka)

            set_uhel(uhel_vysledek)
        }

    }, [bod_delka, bod_sirka, usecka_1_bod_2_delka, usecka_1_bod_2_sirka, usecka_2_bod_2_delka, usecka_2_bod_2_sirka])


    useEffect(() => {   // vytvori onclick event na Openlayers mape

        if(is_onclick_event_on_map.current === false){
            var mapa = props.mapa
    
            if(mapa){
                mapa.on("click", (e) => {   //pri kliknuti na mape ulozi informace o lokaci

                    if(mereni_uhlu_gate_ref.current){
                        var point = mapa.getCoordinateFromPixel(e.pixel)
                        var lonLat = olProj.toLonLat(point); 
                  
                        var cords_delka = point[0]
                        var cords_sirka = point[1]

                        var zem_delka = lonLat[0]
                        var zem_sirka = lonLat[1]
                  
                        var new_point = new Feature({geometry: new Point([cords_delka, cords_sirka])})
    
                        var current_input_split = current_input.current.split("_")
                        var input_number = Number(current_input_split[current_input_split.length - 1])
                        var new_input_number = input_number + 1
            
                        switch(current_input.current){
                            case "bod_1":
                                set_usecka_1_bod_1_delka(zem_delka)
                                set_usecka_1_bod_1_sirka(zem_sirka)
                                bod_1.current = new_point
                                current_input.current = "bod_" + new_input_number
                                break
                            
                            case "bod_2":
                                set_usecka_1_bod_2_delka(zem_delka)
                                set_usecka_1_bod_2_sirka(zem_sirka)
                                bod_2.current = new_point
                                current_input.current = "bod_" + new_input_number
                                break

                            case "bod_3":
                                set_usecka_2_bod_1_delka(zem_delka)
                                set_usecka_2_bod_1_sirka(zem_sirka)
                                bod_3.current = new_point
                                current_input.current = "bod_" + new_input_number
                                break

                            case "bod_4":
                                set_usecka_2_bod_2_delka(zem_delka)
                                set_usecka_2_bod_2_sirka(zem_sirka)
                                bod_4.current = new_point
                                current_input.current = "bod_" + new_input_number
                                break

                            case "bod_5":
                                set_bod_delka(zem_delka)
                                set_bod_sirka(zem_sirka)
                                bod_5.current = new_point
                                break
    
                            default: 
                                set_usecka_1_bod_1_delka(zem_delka)
                                set_usecka_1_bod_1_sirka(zem_sirka)
                                bod_1.current = new_point
                                current_input.current = "bod_" + new_input_number
                                break
                        }
                    }
                })

                is_onclick_event_on_map.current = true
            }
        }        
    })

    useEffect(() => {   //vyobrazuje body a jejich ucesku

        var mapa = props.mapa
        var uhel_gate = props.uhel_gate

        if(mapa && uhel_gate === true){
            vykresleni_bodu(mapa, [bod_1.current, bod_2.current, bod_3.current, bod_4.current, bod_5.current], 2)
        }

    }, [usecka_1_bod_1_delka, usecka_1_bod_1_sirka, usecka_1_bod_2_delka, usecka_1_bod_2_sirka, usecka_2_bod_1_delka, usecka_2_bod_1_sirka, usecka_2_bod_2_delka, usecka_2_bod_2_sirka, bod_delka, bod_sirka])


    useEffect(() => { //vymaze body na mape a jejich hodnoty

        var mapa = props.mapa

        if(mapa){
            vycisti_layer(mapa, 2, [set_usecka_1_bod_1_delka, set_usecka_1_bod_1_sirka, set_usecka_1_bod_2_delka, set_usecka_1_bod_2_sirka, set_usecka_2_bod_1_delka, set_usecka_2_bod_1_sirka, set_usecka_2_bod_2_delka, set_usecka_2_bod_2_sirka, set_bod_delka, set_bod_sirka, set_uhel],
                [bod_1, bod_2, bod_3, bod_4, bod_5], current_input)
        }
    }, [props.uhel_gate])


    return(
        <>

            <div className='tlacitka_funkce'>
                <button onClick={() => {props.uhel_gate_setter(!props.uhel_gate); props.delka_gate_setter(false); mereni_uhlu_gate_ref.current = !props.uhel_gate}} className='button'>Měření úhlu</button>
            </div>
    

            {props.uhel_gate ? <>

            <div id='mereni_delky_comp'>
                <label htmlFor="x">Úsečka 1</label>

                <br />

                <label htmlFor="">Bod 1</label>

                <div className='mereni_delky_items'>

                    <label htmlFor="usecka_1_bod_1_sirka">Zeměpisná šířka</label>
                    <input className='input_my' id='usecka_1_bod_1_sirka' onChange={(e) => {if(e.target.value >= -90 && e.target.value <= 90){set_usecka_1_bod_1_sirka(e.target.value)}}} value={usecka_1_bod_1_sirka} onClick={() => current_input.current = "bod_1"} type="text" />

                    <label htmlFor="usecka_1_bod_1_delka">Zeměpisná délka</label>
                    <input className='input_my' id='usecka_1_bod_1_delka' onChange={(e) => {if(e.target.value >= -180 && e.target.value <= 180){set_usecka_1_bod_1_delka(e.target.value)}}} value={usecka_1_bod_1_delka} onClick={() => current_input.current = "bod_1"} type="text" />
                </div>

                <br />

                <label htmlFor="">Bod 2</label>

                <div className='mereni_delky_items'>

                    <label htmlFor="usecka_1_bod_2_sirka">Zeměpisná šířka</label>
                    <input className='input_my' id='usecka_1_bod_2_sirka' onChange={(e) => {if(e.target.value >= -90 && e.target.value <= 90){set_usecka_1_bod_2_sirka(e.target.value)}}} value={usecka_1_bod_2_sirka} onClick={() => current_input.current = "bod_2"} type="text" />

                    <label htmlFor="usecka_1_bod_2_delka">Zeměpisná délka</label>
                    <input className='input_my' id='usecka_1_bod_2_delka' onChange={(e) => {if(e.target.value >= -180 && e.target.value <= 180){set_usecka_1_bod_2_delka(e.target.value)}}} value={usecka_1_bod_2_delka} onClick={() => current_input.current = "bod_2"} type="text" />
                </div>

                <br />

                <label  htmlFor="x">Úsečka 2</label>

                <br />

                <label htmlFor="">Bod 1</label>

                <div className='mereni_delky_items'>
                    
                    <label htmlFor="usecka_2_bod_1_sirka">Zeměpisná šířka</label>
                    <input className='input_my' id='usecka_2_bod_1_sirka' onChange={(e) => {if(e.target.value >= -90 && e.target.value <= 90){set_usecka_2_bod_1_sirka(e.target.value)}}} value={usecka_2_bod_1_sirka} onClick={() => current_input.current = "bod_3"} type="text" />

                    <label htmlFor="usecka_2_bod_1_delka">Zeměpisná délka</label>
                    <input className='input_my' id='usecka_2_bod_1_delka' onChange={(e) => {if(e.target.value >= -180 && e.target.value <= 180){set_usecka_2_bod_1_delka(e.target.value)}}} value={usecka_2_bod_1_delka} onClick={() => current_input.current = "bod_3"} type="text" />

                </div>

                <br />

                <label htmlFor="">Bod 2</label>

                <div className='mereni_delky_items'>

                    <label htmlFor="usecka_2_bod_2_sirka">Zeměpisná šířka</label>
                    <input className='input_my' id='usecka_2_bod_2_sirka' onChange={(e) => {if(e.target.value >= -90 && e.target.value <= 90){set_usecka_2_bod_2_sirka(e.target.value)}}} value={usecka_2_bod_2_sirka} onClick={() => current_input.current = "bod_4"} type="text" />

                    <label htmlFor="usecka_2_bod_2_delka">Zeměpisná délka</label>
                    <input className='input_my' id='usecka_2_bod_2_delka' onChange={(e) => {if(e.target.value >= -180 && e.target.value <= 180){set_usecka_2_bod_2_delka(e.target.value)}}} value={usecka_2_bod_2_delka} onClick={() => current_input.current = "bod_4"} type="text" />

                </div>

                <br />

                <label htmlFor="">Bod</label>

                <div className='mereni_delky_items'>

                    <label htmlFor="bod_sirka">Zeměpisná šířka</label>
                    <input className='input_my' id='bod_sirka' onChange={(e) => set_bod_sirka(e.target.value)} value={bod_sirka} onClick={() => current_input.current = "bod_5"} type="text" />

                    <label className='mereni_uhlu_items' htmlFor="bod_delka">Zeměpisná délka</label>
                    <input className='input_my' id='bod_delka' onChange={(e) => set_bod_delka(e.target.value)} value={bod_delka} onClick={() => current_input.current = "bod_5"} type="text" />

                </div>
                
                <br />

                <Uhel hodnota={uhel} my_label={"Úhel mezi body"}></Uhel>

            </div>

            </> : <></>}

        </>
    )
}