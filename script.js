const tRow = document.getElementById("TH-Row");
const tBody = document.getElementById("t-Body")

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



createCol("th",tRow)
CreateRow()