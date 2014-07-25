var MyApp = {};
MyApp.Url = "https://vejabi.firebaseio.com/.json";

MyApp.Turtles = [];

MyApp.Turtle = function (name, description, picture) {
    this.name = name;
    this.description = description;
    this.picture = picture;
};

MyApp.WriteTable = function () {
    var holder = "<table class='table table-striped'>";
    for (var i in MyApp.Turtles) {
        holder += "<tr>";
        holder += "<td>" + MyApp.Turtles[i].name + "</td>";
        holder += "<td>" + MyApp.Turtles[i].description + "</td>";
        holder += "<td> URL:" + MyApp.Turtles[i].picture + "</td>";
        holder += "<td>" +
            "<div class='btn btn-warning' onclick='MyApp.ShowUpdateTurtle(" + i + ")'>Edit</div>" +
            "</td>";
        holder += "</tr>";
    }
    holder += "</table>";
    document.getElementById("tableOutput").innerHTML = holder;
};

MyApp.CreateTurtle = function () {
    
    var name = document.getElementById("Name").value;
    var description = document.getElementById("Description").value;
    var picture = document.getElementById("Picture").value;
    
    var turtle = new MyApp.Turtle(name, description, picture);
   
    var request = new XMLHttpRequest();
    request.open("POST", MyApp.Url);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            
            MyApp.Turtles.push(turtle);
            MyApp.WriteTable();
            document.getElementById("Description").value = "";
            document.getElementById("Name").value = "";
            document.getElementById("Picture").value = "";
        }
        else { console.log(this.response); }
    };
    request.onerror = function () {
        console.log("Shell Shocked");
    };
    request.send(JSON.stringify(turtle));

};

MyApp.ShowUpdateTurtle = function (id) {
    var turtle = MyApp.Turtles[id];
    document.getElementById("EditName").value = turtle.name;
    document.getElementById("EditDescription").value = turtle.description;
    document.getElementById("EditPicture").value = turtle.picture;
    document.getElementById("EditId").value = id;
    document.getElementById("ModalTitle").innerHTML = "Editing " + turtle.name;
    $('#EditModal').modal();
};

MyApp.SaveUpdateTurtle = function () {
    var name = document.getElementById("EditName").value;
    var description = document.getElementById("EditDescription").value;
    var picture = document.getElementById("EditPicture").value;
    var id = document.getElementById("EditId").value;
    MyApp.Turtles[id].name = name;
    MyApp.Turtles[id].description = description;
    MyApp.Turtles[id].picture = picture;
    $('#EditModal').modal('hide');
    MyApp.WriteTable();
};

MyApp.DeleteTurtle = function () { };


MyApp.GetTurtlesDB = function () {
    MyApp.Turtles = [];
    var request = new XMLHttpRequest();
    request.open("GET", MyApp.Url);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            var data = JSON.parse(this.response);
            for (var m in data) {
                MyApp.Turtles.push(data[m]);
            }
            MyApp.WriteTable();
        }
        else { console.log("Shell Shocked " + this.response); }
    };
    request.onerror = function () { console.log("Cowabunga!!!"); };
    request.send();
};


MyApp.GetTurtlesDB();
