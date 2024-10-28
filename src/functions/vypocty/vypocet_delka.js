export default function vypocet_delka(point1_lon_lat, point2_lon_lat){

    const polomer = 6371 //km

    var delka1 = point1_lon_lat[0] * (Math.PI / 180)
    var sirka1 = point1_lon_lat[1] * (Math.PI / 180)

    var delka2 = point2_lon_lat[0] * (Math.PI / 180)
    var sirka2 = point2_lon_lat[1] * (Math.PI / 180)

    const dLat = sirka2 - sirka1
    const dLon = delka2 - delka1

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(sirka1) * Math.cos(sirka2) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    var result = c * polomer    

    return Math.round(result * 100) / 100 
}