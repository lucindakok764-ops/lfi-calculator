// ========================================
// LFI Calculator Pro v5.0
// ========================================

// Alle invoervelden
const fields = [
    "adac500","adac1000","adac2000",
    "adbc500","adbc1000","adbc2000",
    "asac500","asac1000","asac2000",
    "asbc500","asbc1000","asbc2000",
    "srtAD","srtAS"
];

// ----------------------------
// Waarde ophalen
// ----------------------------
function getValue(id){

    const field = document.getElementById(id);

    const value = parseInt(field.value);

    if(isNaN(value)){
        field.style.background="";
        return null;
    }

    // controle 0-120 dB
    if(value < 0 || value > 120){

        field.style.background="#ffb3b3";
        return null;

    }

    // controle op stappen van 5 dB
    if(value % 5 !==0){

        field.style.background="#ffe0e0";

    }else{

        if(field.closest(".ad"))
            field.style.background="#fff6f6";

        else if(field.closest(".as"))
            field.style.background="#f5faff";

    }

    return value;

}

// ----------------------------
// Gemiddelde berekenen
// ----------------------------
function average(a,b,c){

    if(a===null || b===null || c===null)
        return null;

    return Math.round((a+b+c)/3);

}

// ----------------------------
// Resultaat tonen
// ----------------------------
function show(id,value){

    document.getElementById(id).textContent =
        value===null ? "--" : value;

}

// ----------------------------
// Alles berekenen
// ----------------------------
function calculate(){

    const adac = average(
        getValue("adac500"),
        getValue("adac1000"),
        getValue("adac2000")
    );

    const adbc = average(
        getValue("adbc500"),
        getValue("adbc1000"),
        getValue("adbc2000")
    );

    const asac = average(
        getValue("asac500"),
        getValue("asac1000"),
        getValue("asac2000")
    );

    const asbc = average(
        getValue("asbc500"),
        getValue("asbc1000"),
        getValue("asbc2000")
    );

    show("sumADAC",adac);
    show("sumASAC",asac);

    show("sumADBC",adbc);
    show("sumASBC",asbc);

    show("sumADBC60", adbc===null ? null : adbc+60);
    show("sumASBC60", asbc===null ? null : asbc+60);

}

// ----------------------------
// Navigatie
// ----------------------------

fields.forEach((id,index)=>{

    const field=document.getElementById(id);

    field.addEventListener("focus",()=>{

        field.select();

    });

    field.addEventListener("input",()=>{

        calculate();

        // automatisch naar volgend vak
        if(field.value.length>=2){

            let next=index+1;

            if(next>=fields.length)
                next=0;

            document.getElementById(fields[next]).focus();

        }

    });

    field.addEventListener("keydown",(e)=>{

        let next=index+1;
        let prev=index-1;

        if(next>=fields.length)
            next=0;

        if(prev<0)
            prev=fields.length-1;

        switch(e.key){

            case "Enter":

            case "ArrowRight":

                e.preventDefault();

                document.getElementById(fields[next]).focus();

            break;

            case "ArrowLeft":

                e.preventDefault();

                document.getElementById(fields[prev]).focus();

            break;

            case "Backspace":

                if(field.value===""){

                    e.preventDefault();

                    document.getElementById(fields[prev]).focus();

                }

            break;

        }

    });

});

// ----------------------------
// Wis
// ----------------------------

document.getElementById("clearBtn").addEventListener("click",()=>{

    fields.forEach(id=>{

        document.getElementById(id).value="";

    });

    calculate();

    document.getElementById(fields[0]).focus();

});

// ----------------------------
// Kopiëren
// ----------------------------

document.getElementById("copyBtn").addEventListener("click",()=>{

let txt=

`LFI CALCULATOR

AD
AC : ${document.getElementById("sumADAC").textContent}
BC : ${document.getElementById("sumADBC").textContent}
BC+60 : ${document.getElementById("sumADBC60").textContent}

AS
AC : ${document.getElementById("sumASAC").textContent}
BC : ${document.getElementById("sumASBC").textContent}
BC+60 : ${document.getElementById("sumASBC60").textContent}

SRT AD : ${document.getElementById("srtAD").value}
SRT AS : ${document.getElementById("srtAS").value}
`;

navigator.clipboard.writeText(txt);

alert("Resultaten gekopieerd.");

});

// ----------------------------

calculate();
