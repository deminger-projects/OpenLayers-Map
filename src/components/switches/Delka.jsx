import { useEffect, useRef, useState } from "react"

export default function Delka(props){

    const [jednotktky_switch, set_jednotktky_switch] = useState(true)
 
    const [delka_jednotky, set_delka_jednotky] = useState("")
    const [delka_hodnota, set_delka_hodnota] = useState("")

    const is_first_load = useRef(true)

    useEffect(() => {

        switch(jednotktky_switch){
            case true:
                if(!is_first_load.current){
                    set_delka_hodnota(Math.round(props.hodnota * 1.609344 * 100) / 100 )
                    set_delka_jednotky("km")
                }else{
                    set_delka_hodnota(props.hodnota)
                    set_delka_jednotky("km")
                    is_first_load.current = false
                }

                break

            case false:
                if(!is_first_load.current){
                    set_delka_hodnota(Math.round(props.hodnota * 0.621371 * 100) / 100)
                    set_delka_jednotky("m")
                }else{
                    set_delka_hodnota(props.hodnota)
                    set_delka_jednotky("m")
                    is_first_load.current = false
                }

                break

            default:
                set_delka_hodnota(props.hodnota)
                set_delka_jednotky("km")
                
                break
        }

    }, [jednotktky_switch, props.hodnota])

    return(
        <>
            <div className='mereni_delky_items'>
                <label htmlFor="delka">Délka</label>
                <input className="input_my" value={delka_hodnota + " " + delka_jednotky} id='delka' type="text" disabled="disabled"/>

                <div className="swtich_button">
                    <button className='button' onClick={(e) => set_jednotktky_switch(!jednotktky_switch)}>Kilometry/Míle</button>
                </div>

            </div>
        </>
    )

}