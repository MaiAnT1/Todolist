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

function updateTask(dataId, newData) {
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
  
      const newData = {
        description: newDescription,
        completed: completed,
      };
      updateTask(dataId, newData);
    }
  });

  