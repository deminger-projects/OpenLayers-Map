export default function vycisti_layer(mapa, layer_index, setters, body_setter, current_input_index){

    if(mapa){
        var layers = mapa.getLayers().array_
        var mereni_delky_layer = layers[layer_index].getSource() //layers[1] je vrstva pro mereni delky, jsou zde features pro ni potrebne; layers[2] je pro mereni uhlu
    
        mereni_delky_layer.clear()
    
        if(setters){
            for(let setter of setters){
                setter(0)
            }
        }
    
        body_setter([])
    
        current_input_index.current = 0
    }
}