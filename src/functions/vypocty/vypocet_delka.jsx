export default function vypocet_delka(point1_lon_lat, point2_lon_lat){

    var delka1 = point1_lon_lat[0] * (Math.PI / 180)
    var sirka1 = point1_lon_lat[1] * (Math.PI / 180)

    var delka2 = point2_lon_lat[0] * (Math.PI / 180)
    var sirka2 = point2_lon_lat[1] * (Math.PI / 180)

    var heversinova_formule_zavorka = Math.sin((sirka2 - sirka1) / 2) ** 2 + Math.cos(sirka1) * Math.cos(sirka2) * Math.sin((delka2 - delka1) / 2) ** 2

    var delka = 2 * 6371 * Math.asin(Math.sqrt(heversinova_formule_zavorka))

    return Math.round(delka * 100) / 100 
}