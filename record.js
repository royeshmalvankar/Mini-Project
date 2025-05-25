// fill in javascript code here
let Mf = document.querySelector('form');
let SF = document.querySelector('searchform');
let task = document.getElementById('task');
let cmp = document.getElementById('status');
let searchInput = document.getElementById('searchInput');
let tbody = document.querySelector('tbody');


loaddata();
let md = loadlocaldata() || [];
Mf.addEventListener('submit',function(e)
{
    e.preventDefault()

    let d ={};
    d.task = task.value;
    d.cmp = cmp.value
    md.push(d)

    savetolocaldata(md)
    tbody.innerHTML = null;
   
loadlocaldata()
loaddata()
})

function savetolocaldata(md){
    if(md!==null)
    {
        localStorage.setItem("tsk",JSON.stringify(md))
        console.log("Data saved to local storage",md);
    }
   
}

function deletedata(index,row)
{
    row.innerHTML = null;
    md.splice(index,1)
    savetolocaldata(md)
}


function loadlocaldata(){
    let data = JSON.parse(localStorage.getItem("tsk"))
    if(data == null){
        return []
    }else{
       return data
    }
}

let debounceTimeout;
SF.addEventListener("submit", () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    loaddata(searchInput.value);
  }, 300);
});

function loaddata() {
    let data1 = loadlocaldata()
    data1.forEach((ele, index) =>
    {
        let row = document.createElement('tr')
        let td1 = document.createElement('td')
        let td2 = document.createElement('td')
        let td3 = document.createElement("td")
        let td4 = document.createElement('td')
        
        
        let btnr = document.createElement("button")
        let btnc = document.createElement("button")
        btnc.setAttribute("type","checkbox")
        btnc.innerText = "change status"
        btnc.addEventListener("click", function() {
            toggleTask(index);
        });
        td3.appendChild(btnc)
        btnr.innerText = "Delete"
        td4.appendChild(btnr)

        
        btnr.addEventListener("click",function() {
            deletedata(index,row)

        })

        function toggleTask(index) {
            data1[index].completed = !data1[index].completed;
            if (data1[index].completed) {
                ele.cmp = "Completed";
                console.log(ele);
            } else {
                ele.cmp = "Pending";
                console.log(ele);

            }
            savetolocaldata(data1);
            // renderTasks(searchInput.value);
            }


        td1.innerText = ele.task;
        td2.innerText = ele.cmp;
        row.append(td1,td2,td3,td4)
        tbody.append(row)
        Mf.reset()

    })
}
