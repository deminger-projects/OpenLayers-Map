import { useEffect, useState } from "react"

export default function Delka(props){

    const [jednotky_switch, set_jednotky_switch] = useState(true)
 
    const [delka_jednotky, set_delka_jednotky] = useState("km")
    const [delka_hodnota, set_delka_hodnota] = useState(0)

    useEffect(() => {

        if(jednotky_switch === true){
            console.log(props.hodnota * 1.609344)
            set_delka_hodnota(Math.round(props.hodnota * 100) / 100)
            set_delka_jednotky("km")
        }

        if(jednotky_switch === false){
            set_delka_hodnota(Math.round(props.hodnota * 0.621371 * 100) / 100)
            set_delka_jednotky("m")
        }

    }, [jednotky_switch])


    useEffect(() => {
        set_delka_hodnota(props.hodnota)

    }, [props.hodnota])

    return(
        <>
            <div className='mereni_delky_items'>
                <label htmlFor="delka">Distance</label>
                <input className="input_my" value={delka_hodnota + " " + delka_jednotky} id='delka' type="text" disabled="disabled"/>

                <div className="swtich_button">
                    <button className='button' onClick={(e) => set_jednotky_switch(!jednotky_switch)}>Kilometers/Miles</button>
                </div>

            </div>
        </>
    )

}