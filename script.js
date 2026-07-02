// =============================================
// LFI Calculator Pro 6.0
// =============================================

const fields = [
    "adac500","adac1000","adac2000",
    "adbc500","adbc1000","adbc2000",
    "asac500","asac1000","asac2000",
    "asbc500","asbc1000","asbc2000"
];

// ------------------------------
// Waarde lezen
// ------------------------------

function getValue(id){

    const field=document.getElementById(id);

    const value=parseInt(field.value);

    if(isNaN(value)){

        field.style.background="";

        return null;

    }

    if(value<0 || value>120){

        field.style.background="#ffb5b5";

        return null;

    }

    if(value%5!==0){

        field.style.background="#ffe0e0";

    }else{

        if(field.closest(".right"))
            field.style.background="#fff8f8";

        if(field.closest(".left"))
            field.style.background="#f6fbff";

    }

    return value;

}

// ------------------------------
// Gemiddelde
// ------------------------------

function average(a,b,c){

    if(a===null || b===null || c===null)
        return null;

    return Math.round((a+b+c)/3);

}

// ------------------------------
// Resultaat tonen
// ------------------------------

function show(id,value){

    document.getElementById(id).textContent=
        value===null ? "--" : value;

}

// ------------------------------
// Berekenen
// ------------------------------

function calculate(){

    const rlg = average(
        getValue("adac500"),
        getValue("adac1000"),
        getValue("adac2000")
    );

    const rbg = average(
        getValue("adbc500"),
        getValue("adbc1000"),
        getValue("adbc2000")
    );

    const llg = average(
        getValue("asac500"),
        getValue("asac1000"),
        getValue("asac2000")
    );

    const lbg = average(
        getValue("asbc500"),
        getValue("asbc1000"),
        getValue("asbc2000")
    );

    show("sumADAC",rlg);
    show("sumADBC",rbg);

    show("sumASAC",llg);
    show("sumASBC",lbg);

    show("sumADBC60",rbg===null ? null : rbg+60);
    show("sumASBC60",lbg===null ? null : lbg+60);

}

// ------------------------------
// Navigatie
// ------------------------------

fields.forEach((id,index)=>{

    const field=document.getElementById(id);

    field.addEventListener("focus",()=>{

        field.select();

    });

    field.addEventListener("input",()=>{

        calculate();

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

        if(e.key==="Enter" || e.key==="ArrowRight"){

            e.preventDefault();

            document.getElementById(fields[next]).focus();

        }

        if(e.key==="ArrowLeft"){

            e.preventDefault();

            document.getElementById(fields[prev]).focus();

        }

        if(e.key==="Backspace" && field.value===""){

            e.preventDefault();

            document.getElementById(fields[prev]).focus();

        }

    });

});

// ------------------------------
// Wis
// ------------------------------

document.getElementById("clearBtn").addEventListener("click",()=>{

    fields.forEach(id=>{

        document.getElementById(id).value="";

    });

    calculate();

    document.getElementById(fields[0]).focus();

});

// ------------------------------
// Kopiëren
// ------------------------------

document.getElementById("copyBtn").addEventListener("click",()=>{

const txt=

`LFI Calculator

R LG : ${document.getElementById("sumADAC").textContent}

R BG : ${document.getElementById("sumADBC").textContent}

R BG+60 : ${document.getElementById("sumADBC60").textContent}

L LG : ${document.getElementById("sumASAC").textContent}

L BG : ${document.getElementById("sumASBC").textContent}

L BG+60 : ${document.getElementById("sumASBC60").textContent}
`;

navigator.clipboard.writeText(txt);

alert("Resultaten gekopieerd.");

});

// ------------------------------

calculate();
