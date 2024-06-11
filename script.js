let taskList = [];

const savedHrsElm = document.getElementById('savedHrs');
const hoursPerWeek = 24*7;

const handleOnSubmit = (e) =>{
// const elm = document.getElementById("task");
const newForm = new FormData(e);

const task = newForm.get("task");
const hr = +newForm.get("hr");
const obj= {
    task,
    hr,
    id:randomIdGenerator(),
    type:"entry",
};

// check if there is enough hours left
const existingTtlHrs = taskTotal();
if (existingTtlHrs + hr > hoursPerWeek){
    return alert ("Sorry, Not Enough Time To Fit The Task From Last Week ");
}

  taskList.push(obj);
    displayEntryList();
}

const displayEntryList = () => {
   
    let str= "";

    const entryElm = document.getElementById("entryList");

    const entryList = taskList.filter((item) => item.type === 'entry' );

    entryList.map((item, i) =>{
     str+= `<tr>
    <td>${i + 1}</td>
    <td>${item.task}</td>
    <td>${item.hr}</td>
    <td class="text-end">
        <button onclick="handleOnDelete('${item.id}')" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i></button>
        <button onclick="switchTask('${item.id}', 'bad')" class="btn btn-success"><i class="fa-solid fa-arrow-right"></i></button>
    </td>
    </tr>`   
    })
    entryElm.innerHTML =str;
    taskTotal();
};

const displayBadList = () => {
   
    let str= "";

    const badElm = document.getElementById("badList");

    const badList = taskList.filter((item) => item.type ==="bad" );

   badList.map((item, i) =>{
     str+= ` <tr>
                <td>${i + 1}</td>
                <td>${item.task}</td>
                <td>${item.hr}</td>
                <td class="text-end">
                    
                    <button  onclick="switchTask('${item.id}', 'entry')" class="btn btn-warning"><i class="fa-solid fa-arrow-left"></i></button>
                    <button onclick="handleOnDelete('${item.id}')"  class="btn btn-danger"><i class="fa-solid fa-trash-can"></i></button>
                </td>
              </tr>`   
    })
    badElm.innerHTML =str;
}

const randomIdGenerator = (length = 6) =>{
const str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";

let id = "";
for (let i = 0; i<6; i++){
    const randomIndex= Math.floor(Math.random()*str.length);
    id+= str[randomIndex];
   
}
return id;
};


const handleOnDelete = (id) => {
    if (window.confirm("Are you sure, you want to delete this?")){
        taskList = taskList.filter((item) => item.id!== id);
        displayEntryList();
        displayBadList();
    }
   
};

const switchTask =(id, type)=>{
taskList = taskList.map((item) =>{
    if(item.id === id) {
        item.type = type;
    }
return item;
});
displayEntryList();
displayBadList();
};

const taskTotal = ()=> {
    const ttlHr = taskList.reduce((acc, item)=>{
        return acc + item.hr;
    }, 0);
document.getElementById("ttlHrs").innerHTML = ttlHr;
return ttlHr;
};