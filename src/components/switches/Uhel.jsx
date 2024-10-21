import { useEffect, useRef, useState } from "react"

export default function Uhel(props){

    const [jednotktky_switch, set_jednotktky_switch] = useState(true)

    const [uhel_jednotky, set_delka_jednotky] = useState("")
    const [uhel_hodnota, set_delka_hodnota] = useState("")

    const is_first_load = useRef(true)

    useEffect(() => {

        switch(jednotktky_switch){
            case true:
                if(!is_first_load.current){
                    set_delka_hodnota(Math.round(props.hodnota * Math.PI / 180 * 100) / 100 )
                    set_delka_jednotky("°")
                }else{
                    set_delka_hodnota(props.hodnota)
                    set_delka_jednotky("°")
                    is_first_load.current = false
                }

                break

            case false:
                if(!is_first_load.current){
                    set_delka_hodnota(Math.round(props.hodnota * 180 / Math.PI))
                    set_delka_jednotky("rad")
                }else{
                    set_delka_hodnota(props.hodnota)
                    set_delka_jednotky("rad")
                    is_first_load.current = false
                }

                break

            default:
                set_delka_hodnota(props.hodnota)
                set_delka_jednotky("°")
                
                break
        }

    }, [jednotktky_switch, props.hodnota])

    return(
        <>
            <div className='mereni_delky_items'>
                <label htmlFor="delka">{props.my_label}</label>
                <input className="input_my" value={uhel_hodnota + " " + uhel_jednotky} id='delka' type="text" disabled="disabled"/>

                <div className="swtich_button">
                    <button className='button' onClick={(e) => set_jednotktky_switch(!jednotktky_switch)}>Stupně/Radianty</button>
                </div>
            </div>
        </>
    )

}