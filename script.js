// ===============================
// LFI Calculator Pro 4.0
// ===============================

const inputIds = [
    "adac500","adac1000","adac2000",
    "adbc500","adbc1000","adbc2000",
    "asac500","asac1000","asac2000",
    "asbc500","asbc1000","asbc2000",
    "srtAD","srtAS"
];

function getValue(id){

    const field=document.getElementById(id);

    const value=parseFloat(field.value);

    if(isNaN(value)){

        field.style.backgroundColor="";

        return null;

    }

    if(value % 5 !==0){

        field.style.background="#ffd4d4";

    }else{

        if(field.closest(".ad"))
            field.style.background="#fff4f4";

        else if(field.closest(".as"))
            field.style.background="#f4f8ff";

    }

    return value;

}

function average(a,b,c){

    if(a===null || b===null || c===null)
        return null;

    return Math.round((a+b+c)/3);

}

function show(id,value){

    document.getElementById(id).textContent =
        value===null ? "--" : value;

}

function calculate(){

    const adac=average(
        getValue("adac500"),
        getValue("adac1000"),
        getValue("adac2000")
    );

    const adbc=average(
        getValue("adbc500"),
        getValue("adbc1000"),
        getValue("adbc2000")
    );

    const asac=average(
        getValue("asac500"),
        getValue("asac1000"),
        getValue("asac2000")
    );

    const asbc=average(
        getValue("asbc500"),
        getValue("asbc1000"),
        getValue("asbc2000")
    );

    show("sumADAC",adac);

    show("sumASAC",asac);

    show("sumADBC",adbc);

    show("sumASBC",asbc);

    show("sumADBC60",adbc===null ? null : adbc+60);

    show("sumASBC60",asbc===null ? null : asbc+60);

}

inputIds.forEach((id,index)=>{

    const field=document.getElementById(id);

    field.addEventListener("input",()=>{

        calculate();

        if(field.value.length>=2){

            let next=index+1;

            if(next>=inputIds.length)
                next=0;

            document.getElementById(inputIds[next]).focus();

        }

    });

    field.addEventListener("keydown",(e)=>{

        let next=index+1;

        let prev=index-1;

        if(next>=inputIds.length)
            next=0;

        if(prev<0)
            prev=inputIds.length-1;

        if(e.key==="Enter" || e.key==="ArrowRight"){

            e.preventDefault();

            document.getElementById(inputIds[next]).focus();

        }

        if(e.key==="ArrowLeft"){

            e.preventDefault();

            document.getElementById(inputIds[prev]).focus();

        }

        if(e.key==="Backspace" &&
            field.value===""){

            e.preventDefault();

            document.getElementById(inputIds[prev]).focus();

        }

    });

});

document.getElementById("clearBtn").onclick=function(){

    inputIds.forEach(id=>{

        document.getElementById(id).value="";

    });

    calculate();

    document.getElementById(inputIds[0]).focus();

}

document.getElementById("copyBtn").onclick=function(){

    const txt=`
RESULTAAT

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

}

calculate();
