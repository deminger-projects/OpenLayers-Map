export default function vypocet_azimuth(point1_lon_lat, point2_lon_lat){

    var delka1 = point1_lon_lat[0] 
    var sirka1 = point1_lon_lat[1] 

    var delka2 = point2_lon_lat[0] 
    var sirka2 = point2_lon_lat[1] 

    var azimuth_vrsek_zavorky = Math.sin(delka2 - delka1) * Math.cos(sirka2)
    var azimuth_spodek_zavorky = Math.cos(sirka1) * Math.sin(sirka2) - Math.sin(sirka1) * Math.cos(sirka2) * Math.cos(delka2 - delka1)

    var azimuth = Math.atan2(azimuth_vrsek_zavorky, azimuth_spodek_zavorky) * 180/Math.PI

    if(azimuth < 0){
      azimuth += 360
    }

    return azimuth
}