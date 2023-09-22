const tRow = document.getElementById("TH-Row");
const tBody = document.getElementById("t-Body")

const bold_btn = document.getElementById("btn-bold")
const btn_italic= document.getElementById("btn-italic")
const underline_btn = document.getElementById("btn-underline")


function createCol(type,WhichRow,rowNum){
    for(let col=0;col<26;col++){
        let cell = document.createElement(type);
        if(type === 'th'){
            cell.innerText = String.fromCharCode(col + 65);
            cell.setAttribute("id", String.fromCharCode(col + 65));
        }
        else{
            cell.setAttribute("id", `${String.fromCharCode(col + 65)}${rowNum}`);
            cell.setAttribute('contenteditable',true);
            cell.addEventListener("focus",(event)=>{
                Handlefocus(event.target)
            })
        }
        WhichRow.append(cell)
    }
}

function SetHeadColor(element,colr){
    const col = document.getElementById(`${element.id[0]}`);
    const row = document.getElementById(`${element.id.substring(1)}`)
    
    col.style.backgroundColor = colr;
    row.style.backgroundColor = colr;
    
}


let CurrentCell;
let PreviousCell;
function Handlefocus(element){
    // console.log(element.id)
    CurrentCell = element;
    if(PreviousCell){
        // const col = document.getElementById(`${PreviousCell.id[0]}`);
        // const row = document.getElementById(`${PreviousCell.id.substring(1)}`)
        
        // col.style.backgroundColor = "transparent";
        // row.style.backgroundColor = "transparent";
        SetHeadColor(PreviousCell,"transparent")
    } 
    // const col = document.getElementById(`${element.id[0]}`);
    // const row = document.getElementById(`${element.id.substring(1)}`)
    
    // col.style.backgroundColor = "#92A8D1";
    // row.style.backgroundColor = "#92A8D1";

    PreviousCell = CurrentCell;
    SetHeadColor(CurrentCell,"#92A8D1")

}

function CreateRow(){
    for(let i=1;i<=50;i++){
        const trow = document.createElement("tr")
        let cell1 = document.createElement("th");
        cell1.innerText = i;
        trow.appendChild(cell1)
        cell1.setAttribute("id",i);
        createCol("td",trow,i)
    
        // for(let i=0;i<26;i++){
        //     let cell = document.createElement("td");
        //     trow.appendChild(cell)
        // }
       
        tBody.append(trow)
    }
}

function btnActivity(whatStyle, prop, whichBtn){
    if(CurrentCell.style[whatStyle] == prop){
        if(prop == 'underline'){
            CurrentCell.style[whatStyle] = 'none' 
        }
        else{
            CurrentCell.style[whatStyle] = 'normal'
        }
                
                whichBtn.style.backgroundColor = "transparent";
            }
            else{
                CurrentCell.style[whatStyle] = prop;
                whichBtn.style.backgroundColor = "#C0C0C0";
            }
}
bold_btn.addEventListener("click",()=>btnActivity("fontWeight", "bold", bold_btn))
//   btnActivity()

// bold_btn.addEventListener("click",()=>{
//     if(CurrentCell.style.fontWeight == 'bold'){
//         CurrentCell.style.fontWeight = 'normal'
//         bold_btn.style.backgroundColor = "transparent";
//     }
//     else{
//         CurrentCell.style.fontWeight = 'bold';
//         bold_btn.style.backgroundColor = "#C0C0C0";
//     }
// })


btn_italic.addEventListener("click",()=>btnActivity("fontStyle", "italic", btn_italic ))
// btn_italic.addEventListener("click",()=>{
//     if(CurrentCell.style.fontStyle == 'italic'){
//         CurrentCell.style.fontStyle = 'normal'
//         btn_italic.style.backgroundColor = "transparent";
//     }
//     else{
//         CurrentCell.style.fontStyle = 'italic';
//         btn_italic.style.backgroundColor = "#C0C0C0";
//     }
// })

underline_btn.addEventListener("click",()=>btnActivity("textDecoration", "underline", underline_btn))

createCol("th",tRow)
CreateRow()

