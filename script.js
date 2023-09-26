const tRow = document.getElementById("TH-Row");
const tBody = document.getElementById("t-Body")

const bold_btn = document.getElementById("btn-bold");
const btn_italic= document.getElementById("btn-italic");
const underline_btn = document.getElementById("btn-underline")
const cutbtn = document.getElementById("btn-cut");
const copyBtn = document.getElementById("btn-copy");
const pasteBtn = document.getElementById("btn-paste");
const bgColor = document.getElementById("bg-color");
const font_Size = document.getElementById("font-size");
const font_Family = document.getElementById("font-style-dropdown");
const textColor = document.getElementById("text-color");

const downloadBtn = document.getElementById("btn-download");
const uploadInput = document.getElementById("btn-upload");

const addSheet = document.getElementById("btn-addSheet");



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
            cell.addEventListener('input',updateObjectInMatrix);
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
let cutcell;
let lastPressbtn;
let matrix = new Array(50);

for (let row = 0; row < 50; row++) {
  matrix[row] = new Array(26);
  // matrix[0] -> 1st
  // matrix[1] -> 2nd 
  // matrix[row] -> matrix[0]-> matrix[99]
  for(let col=0;col<26;col++){
    matrix[row][col]={};
  }
}


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


function updateObjectInMatrix() {
    // console.log(matrix[0][0]);
    let id = CurrentCell.id;
    // id[0] -> 'A' -> 'A'.charCodeAt(0) -> 65
    let col = id[0].charCodeAt(0) - 65;
    let row = id.substring(1) - 1;
    matrix[row][col] = {
      text: CurrentCell.innerText,
      style: CurrentCell.style.cssText,
      id: id, // why we are storing ids, we will see that later
    };
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
CreateRow();

font_Family.addEventListener("change",()=>{
    CurrentCell.style.fontFamily = font_Family.value;
})

font_Size.addEventListener("change",()=>{
    CurrentCell.style.fontSize = font_Size.value;
})


bgColor.addEventListener("input",()=>{
    CurrentCell.style.backgroundColor = bgColor.value
})

textColor.addEventListener("input",()=>{
    CurrentCell.style.color = textColor.value
})


function downloadMatrix() {
  // 2d matrix into a memory that's accessible outside
  const matrixString = JSON.stringify(matrix);
  // matrixString -> into a blob
  const blob = new Blob([matrixString],{ type: 'application/json'});
  console.log(blob);
  const link = document.createElement('a');
  // createObjectURL converts my blob to link
  link.href = URL.createObjectURL(blob);
  link.download = 'table.json';
  link.click();
}

downloadBtn.addEventListener("click",()=>{
    downloadMatrix();
})

function uploadMatrix(event) {
    const file = event.target.files[0];
    // FileReader helps me to read my blod
    if(file){
      const reader = new FileReader();
      reader.readAsText(file);
      // readAsText will trigger onload method
      // of reader instance
      reader.onload = function(event){
        const fileContent=JSON.parse(event.target.result);
        // console.log(fileContent);
        // update virtual memory
        matrix = fileContent;
        renderMatrix();
      }
    }
  }

  uploadInput.addEventListener('input',uploadMatrix);

cutbtn.addEventListener("click",()=>{
    lastPressbtn = 'cut';
    cutcell = {
        text:CurrentCell.innerText,
        style:CurrentCell.style.cssText
    }
    CurrentCell.innerText = ''
    CurrentCell.style.cssText = ''
    updateObjectInMatrix();
})

copyBtn.addEventListener('click',()=>{
    lastPressbtn = 'copy';
    cutcell={
      text: CurrentCell.innerText,
      style: CurrentCell.style.cssText,
    }
  })

  pasteBtn.addEventListener('click',()=>{
    CurrentCell.innerText=cutcell.text;
    CurrentCell.style=cutcell.style;
    // currentCell.style.cssText=cutCell.style;
  
    // i need to cleanup my cutcell object after paste
    // 
    if (lastPressbtn === "cut") {
      cutcell = undefined;
    }
    updateObjectInMatrix();
  })

let SheetNum = 1;
let currentSheet = 1; // index

  function genNextsheetbtn(){
    let btn = document.createElement("button");
    btn.className = 'btn'
    let cont_div = document.getElementById("second-div");
    SheetNum++;
    currentSheet = SheetNum;
    btn.innerText=`Sheet ${currentSheet}`;
    btn.setAttribute('id',`sheet-${currentSheet}`);
    // btn.setAttribute('onclick','viewSheet(event)');

   cont_div.append(btn)
  }

  addSheet.addEventListener("click",()=>{
    // saveMatrix();

    // CreateNewMatrix();

    genNextsheetbtn();
})