export default function vypocet_uhlu(spolecni_bod_delka, spolecni_bod_sirka, usecka_1_konec_delka, usecka_1_konec_sirka, usecka_2_konec_delka, usecka_2_konec_sirka){

    const bod_1_sirka = spolecni_bod_sirka * (Math.PI / 180)
    const bod_1_delka = spolecni_bod_delka * (Math.PI / 180)
    const bod_2_sirka = usecka_1_konec_sirka * (Math.PI / 180)
    const bod_2_delka = usecka_1_konec_delka * (Math.PI / 180)
    const bod_3_sirka = usecka_2_konec_sirka * (Math.PI / 180)
    const bod_3_delka = usecka_2_konec_delka * (Math.PI / 180)

    // Vektory
    const ABx = Math.cos(bod_2_sirka) * Math.cos(bod_2_delka) - Math.cos(bod_1_sirka) * Math.cos(bod_1_delka);
    const ABy = Math.cos(bod_2_sirka) * Math.sin(bod_2_delka) - Math.cos(bod_1_sirka) * Math.sin(bod_1_delka);
    const ABz = Math.sin(bod_2_sirka) - Math.sin(bod_1_sirka);

    const ACx = Math.cos(bod_3_sirka) * Math.cos(bod_3_delka) - Math.cos(bod_1_sirka) * Math.cos(bod_1_delka);
    const ACy = Math.cos(bod_3_sirka) * Math.sin(bod_3_delka) - Math.cos(bod_1_sirka) * Math.sin(bod_1_delka);
    const ACz = Math.sin(bod_3_sirka) - Math.sin(bod_1_sirka);

    // Výpočet úhlu mezi vektory AB a AC
    const dotProduct = ABx * ACx + ABy * ACy + ABz * ACz;
    const magnitudeAB = Math.sqrt(ABx * ABx + ABy * ABy + ABz * ABz);
    const magnitudeAC = Math.sqrt(ACx * ACx + ACy * ACy + ACz * ACz);

    const cosTheta = dotProduct / (magnitudeAB * magnitudeAC);
    const angle = Math.acos(cosTheta); // Úhel v radiánech

    return angle * (180 / Math.PI); // Převod na stupně
}