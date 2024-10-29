import { useEffect, useState } from "react"

export default function Uhel(props){

    const [jednotky_switch, set_jednotky_switch] = useState(true)

    const [uhel_jednotky, set_uhel_jednotky] = useState("°")
    const [uhel_hodnota, set_uhel_hodnota] = useState(0)

    useEffect(() => {

        if(jednotky_switch === true){
            set_uhel_hodnota(Math.round(props.hodnota * 100) / 100)
            set_uhel_jednotky("°")
        }

        if(jednotky_switch === false){
            set_uhel_hodnota(Math.round(props.hodnota * (Math.PI / 180) * 100) / 100 )
            set_uhel_jednotky("rad")
        }

    }, [jednotky_switch])


    useEffect(() => {
        set_uhel_hodnota(Math.round(props.hodnota * 100) / 100)

    }, [props.hodnota])

    return(
        <>
            <div className='mereni_delky_items'>
                <label htmlFor="delka">{props.my_label}</label>
                <input className="input_my" value={uhel_hodnota + " " + uhel_jednotky} id='delka' type="text" disabled="disabled"/>

                <div className="swtich_button">
                    <button className='button' onClick={(e) => set_jednotky_switch(!jednotky_switch)}>Degrees/Radians</button>
                </div>
            </div>
        </>
    )

}