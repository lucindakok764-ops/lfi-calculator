// =====================================
// LFI Calculator Pro 4.0
// =====================================

const fields = [
"adac500","adac1000","adac2000",
"adbc500","adbc1000","adbc2000",
"asac500","asac1000","asac2000",
"asbc500","asbc1000","asbc2000",
"srtAD","srtAS"
];

function value(id){

    const input=document.getElementById(id);

    const v=parseFloat(input.value);

    if(isNaN(v)){
        input.style.backgroundColor="";
        return null;
    }

    // controle op 5 dB

    if(v % 5 !==0){

        input.style.background="#ffd6d6";

    }else{

        if(input.closest(".ad"))
            input.style.background="#fff4f4";

        else if(input.closest(".as"))
            input.style.background="#f4f8ff";

        else
            input.style.background="white";

    }

    return v;

}

function average(a,b,c){

    if(a==null || b==null || c==null)
        return null;

    return Math.round((a+b+c)/3);

}

function write(id,val){

    document.getElementById(id).textContent=
        val==null ? "--" : val;

}

function calculate(){

    const adac=average(
        value("adac500"),
        value("adac1000"),
        value("adac2000")
    );

    const adbc=average(
        value("adbc500"),
        value("adbc1000"),
        value("adbc2000")
    );

    const asac=average(
        value("asac500"),
        value("asac1000"),
        value("asac2000")
    );

    const asbc=average(
        value("asbc500"),
        value("asbc1000"),
        value("asbc2000")
    );

    write("sumADAC",adac);
    write("sumASAC",asac);

    write("sumADBC",adbc);
    write("sumASBC",asbc);

    write("sumADBC60",adbc==null?null:adbc+60);
    write("sumASBC60",asbc==null?null:asbc+60);

}

fields.forEach((id,index)=>{

    const field=document.getElementById(id);

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

        if(e.key==="Enter"){

            e.preventDefault();

            document.getElementById(fields[next]).focus();

        }

        if(e.key==="ArrowRight"){

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

document.getElementById("clearBtn").onclick=function(){

    fields.forEach(id=>{

        document.getElementById(id).value="";

    });

    calculate();

    document.getElementById(fields[0]).focus();

}

document.getElementById("copyBtn").onclick=function(){

let txt=

`LFI Calculator

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
