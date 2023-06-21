const inputBox = document.getElementById("inputbox");
console.log(inputBox)
const list = document.getElementById("listcontainer");
console.log(list)
var dataApi = "http://localhost:3000/todos"



async function fetchData() {
    let response = await 
    fetch(dataApi);
    let data = await response.json();


    data.forEach(data => {
        console.log('getData: ', data);
        const divItem = document.createElement('li');
        divItem.setAttribute ('id', data.id);
        divItem.innerText = data.description;       
        listcontainer.appendChild(divItem);

        const span = document.createElement("span");
        span.classList.add("delete");
        span.innerHTML = "\u00d7";
        divItem.appendChild(span);

        const input = document.createElement("input");
        input.type = "text";
        input.value = data.description;
        divItem.appendChild(input);
        
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("completed-checkbox");
        checkbox.checked = data.completed;
        divItem.appendChild(checkbox);

        const sao = document.createElement("button");
        sao.classList.add("confirmBtn");
        sao.innerHTML = "*";
        divItem.appendChild(sao);

        sao.addEventListener("click", function() {
          divItem.classList.add("new-class");
        });


        return divItem;

    });
}
fetchData(); 



function add() {
  var description = document.getElementById("inputbox").value;
  var formData = {
      description: description
  }
  createCourse(formData)
}

function createCourse() {
    if (inputBox.value === "") {
      alert("Add your data")
    } else {
      const data = inputBox.value;
      fetch(dataApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: data,
          completed: false,
          isImportant: false,
        }),
      })
        .then((response) => response.json())
        .catch((error) => {
          console.log("Error");
        });
    }
  }

//function createCourse(data, callback) {
  //  var options = {
    //    method: 'POST',
      //  headers: {
        //    "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          //},
          //body: JSON.stringify({
            //description: data,
            //completed: false,
            //isImportant: false,
          //}),

    //};
    //fetch('http://localhost:3000/todos', options)
      //  .then(function(response) {
         //   response.json();
       // })
       // .then(callback);

//}

list.addEventListener("click", function(e){
    if(e.target.classList.contains("delete") ){
        const dataId = e.target.parentElement.getAttribute("id");
        fetch(dataApi + '/' + dataId, {
            method: "DELETE",
        })
        .then(function() {
            e.target.parentElement.remove();
        })
        .catch(function(){
            console.log("Error");
        });
    }
});

function updatedata(dataId, newData) {
    fetch(dataApi + '/' + dataId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log("Error");
      });
  }

  list.addEventListener("change", function (e) {
    if (e.target.classList.contains("completed-checkbox")) {
      const dataId = e.target.parentElement.getAttribute("id");
      const completed = e.target.checked;
      const liElement = e.target.parentElement;
      const inputTask = liElement.querySelector("input[type='text']");
      const newDescription = inputTask.value;
      const isImportant = liElement.classList.contains("is-important");
      const newData = {
        description: newDescription,
        completed: completed,
        isImportant: isImportant,
      };
      updatedata(dataId, newData);
    }
  });

  list.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
      const oldDescription = e.target.lastElementChild.value;
      const input = document.createElement("input");
      input.type = "text";
      input.value = oldDescription;
      e.target.innerHTML = "";
      e.target.appendChild(input);
  
      input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          const newDescription = event.target.value;
          const dataId = e.target.getAttribute("id");
          const completed = e.target.firstChild.checked;
          const newData = {
            description: newDescription,
            completed: completed,
          };
  
          updatedata(dataId, newData);
        }
      });
    }
  });

  function sortTodos(data) {
    data.sort((a, b) => {
      if (a.isImportant && !a.completed) return -1;
      if (b.isImportant && !b.completed) return 1;
      if (!a.completed) return -1;
      if (!b.completed) return 1;
      return 0;
    });
  
    return data;
  }

  //list.addEventListener("click", function(e){
    //if(e.target.classList.contains("confirmBtn") ){
        //const dataId = e.target.getAttribute("id");
        
       // const dataElement = document.getElementById(dataId);
       // dataElement.innerText = '*' + dataElement.innerText;
        //console.log(dataElement.innerText);
       
       // const newData = {
       //   isImportant: confirmBtn.checked,
        //};
       // updatedata(dataId, newData);
     // }   
 // });

 //list.addEventListener("click", function(e){
 // if(e.target.classList.contains("confirmBtn") ){
   // const dataId = e.target.parentElement.getAttribute("id");
    
    //  fetch(dataApi +'/'+ dataId, {
     //     method: "PUT",
     //     headers: {
     //       "Content-Type": "application/json",
      //    },
      //    body: JSON.stringify({
            

        //    isImportant: true
       //   }),
     // })
     // .then((response) => response.json())
     // .catch((error) => {
    //    console.log("Error");
    //  });
 // }
//});

list.addEventListener("click", function(e){
  if(e.target.classList.contains("confirmBtn") ){
    const dataId = e.target.parentElement.getAttribute("id");
    const liElement = e.target.parentElement;
    const inputTask = liElement.querySelector("input[type='text']");
    const task = inputTask.value;
    fetch(dataApi +'/'+ dataId, {
    method: "PUT",
    body: JSON.stringify({
      description: task, // spread existing data
      completed: false,
      isImportant: true // add isImportant property
    }),
    headers: {
      "Content-Type": "application/json"
    }
    })
  
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
  }
});






 
  

  

  
  
