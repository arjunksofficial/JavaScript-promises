function submitform(){
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("container").innerHTML = `<p>`+this.responseText+`</p>`;
       }
    };
    req.open("POST","http://localhost:5000/person",true);
    req.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    var obj={};
    obj.name=document.getElementById('name').value;
    obj.email=document.getElementById('email').value;
    obj.password=document.getElementById('password').value;
    req.send(JSON.stringify(obj));
}