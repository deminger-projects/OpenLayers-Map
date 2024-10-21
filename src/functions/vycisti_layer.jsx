export default function vycisti_layer(mapa, layer_index, setters, body, current_input){

    if(mapa){
        var layers = mapa.getLayers().array_
        var mereni_delky_layer = layers[layer_index].getSource() //layers[1] je vrstva pro mereni delky, jsou zde features pro ni potrebne
    
        mereni_delky_layer.clear()
    
        if(setters){
            for(let setter of setters){
                setter(0)
            }
        }
    
        if(body){
            for(let bod of body){
                bod.current = ""
            }
        }
    
        current_input.current = "bod_1"
    }
}