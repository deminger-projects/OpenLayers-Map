export default function vypocet_azimuth(point1_lon_lat, point2_lon_lat){

    var delka1 = point1_lon_lat[0] * (Math.PI / 180)
    var sirka1 = point1_lon_lat[1] * (Math.PI / 180)

    var delka2 = point2_lon_lat[0] * (Math.PI / 180)
    var sirka2 = point2_lon_lat[1] * (Math.PI / 180)

  
    // Výpočet rozdílu délky
    const deltaLambda = delka2 - delka1;

    // Výpočet azimutu
    const x = Math.sin(deltaLambda) * Math.cos(sirka2);
    const y = Math.cos(sirka1) * Math.sin(sirka2) - Math.sin(sirka1) * Math.cos(sirka2) * Math.cos(deltaLambda);

    // Azimut v radiánech
    let azimuth = Math.atan2(x, y);

    // Převod na stupně
    azimuth = (azimuth * 180 / Math.PI + 360) % 360; // Normalizace na interval [0, 360)
    
    console.log("🚀 ~ vypocet_azimuth ~ azimuth:", azimuth)

    return azimuth;
}
