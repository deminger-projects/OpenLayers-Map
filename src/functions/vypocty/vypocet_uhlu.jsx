export default function vypocet_uhlu(spolecni_bod_delka, spolecni_bod_sirka, usecka_1_konec_delka, usecka_1_konec_sirka, usecka_2_konec_delka, usecka_2_konec_sirka){

    var velikost_vektoru_AB = Math.sqrt((usecka_1_konec_delka - spolecni_bod_delka) ** 2 + (usecka_1_konec_sirka - spolecni_bod_sirka) ** 2) 
    var velikost_vektoru_AC = Math.sqrt((usecka_2_konec_delka - spolecni_bod_delka) ** 2 + (usecka_2_konec_sirka - spolecni_bod_sirka) ** 2) 

    var skalarni_soucin = (usecka_1_konec_delka - spolecni_bod_delka) * (usecka_2_konec_delka - spolecni_bod_delka) + (usecka_1_konec_sirka - spolecni_bod_sirka) * (usecka_2_konec_sirka - spolecni_bod_sirka)

    var vysledek1 = skalarni_soucin / velikost_vektoru_AB * velikost_vektoru_AC

    var vysledek2 = Math.acos(vysledek1)

    return vysledek2
}