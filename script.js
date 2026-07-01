// ===== LFI Calculator Pro =====

const inputIds = [
    "adac500","adac1000","adac2000",
    "adbc500","adbc1000","adbc2000",
    "asac500","asac1000","asac2000",
    "asbc500","asbc1000","asbc2000",
    "srtAD","srtAS"
];

function waarde(id){

    const veld = document.getElementById(id);

    const v = parseFloat(veld.value);

    if(isNaN(v)){
        veld.style.backgroundColor="";
        return null;
    }

    if(v % 5 !== 0){

        veld.style.backgroundColor="#ffd6d6";

    }else{

        if(veld.closest(".ad"))
            veld.style.backgroundColor="#fff4f4";
        else if(veld.closest(".as"))
            veld.style.backgroundColor="#f4f8ff";
        else
            veld.style.backgroundColor="white";

    }

    return v;
}

function gemiddelde(a,b,c){
    if(a===null || b===null || c===null) return "";
    return Math.round((a+b+c)/3);
}

function bereken(){

    const adac = gemiddelde(
        waarde("adac500"),
        waarde("adac1000"),
        waarde("adac2000")
    );

    const adbc = gemiddelde(
        waarde("adbc500"),
        waarde("adbc1000"),
        waarde("adbc2000")
    );

    const asac = gemiddelde(
        waarde("asac500"),
        waarde("asac1000"),
        waarde("asac2000")
    );

    const asbc = gemiddelde(
        waarde("asbc500"),
        waarde("asbc1000"),
        waarde("asbc2000")
    );

    document.getElementById("adacLFI").textContent =
        adac === "" ? "" : adac + " dB HL";

    document.getElementById("adbcLFI").textContent =
        adbc === "" ? "" : adbc + " dB HL";

    document.getElementById("adbc60").textContent =
        adbc === "" ? "" : (adbc + 60) + " dB HL";

    document.getElementById("asacLFI").textContent =
        asac === "" ? "" : asac + " dB HL";

    document.getElementById("asbcLFI").textContent =
        asbc === "" ? "" : asbc + " dB HL";

    document.getElementById("asbc60").textContent =
        asbc === "" ? "" : (asbc + 60) + " dB HL";
}


// automatische berekening + Enter naar volgend vak

inputIds.forEach((id,index)=>{

    const veld = document.getElementById(id);

    veld.addEventListener("input",bereken);

    veld.addEventListener("keydown",function(e){

        if(e.key==="Enter"){

            e.preventDefault();

            let volgende=index+1;

            if(volgende>=inputIds.length)
                volgende=0;

            document.getElementById(inputIds[volgende]).focus();

        }

    });

});


// Wis-knop

document.getElementById("clearBtn").addEventListener("click",function(){

    inputIds.forEach(id=>{

        document.getElementById(id).value="";

    });

    bereken();

    document.getElementById(inputIds[0]).focus();

});


// Kopieer-knop

document.getElementById("copyBtn").addEventListener("click",function(){

    const tekst =
`LFI Calculator

AD AC : ${document.getElementById("adacLFI").textContent}
AD BC : ${document.getElementById("adbcLFI").textContent}
AD BC+60 : ${document.getElementById("adbc60").textContent}

AS AC : ${document.getElementById("asacLFI").textContent}
AS BC : ${document.getElementById("asbcLFI").textContent}
AS BC+60 : ${document.getElementById("asbc60").textContent}

SRT AD : ${document.getElementById("srtAD").value} dB HL
SRT AS : ${document.getElementById("srtAS").value} dB HL`;

    navigator.clipboard.writeText(tekst);

    alert("Resultaten gekopieerd.");

});

bereken();
