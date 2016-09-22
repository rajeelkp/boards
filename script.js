var i=0,k=0;


if (!localStorage.getItem("text") == true) {
  var text=[{}] ;
  text.todo="";
  text.say=[""];
  t=JSON.stringify(text);
    localStorage.setItem("text", t);


}

var obj = JSON.parse(localStorage.getItem("text"));
function object(first) {
    this.todo = first;

    this.say=["remember this", ]
    this.status=1;
}
function adder(){

 try
      {

         if(document.getElementById("to-do").value=="") throw "You haven't added a task !";
         console.log(document.getElementById("to-do").value);
    i=obj.length;

    obj[i++]= new object(document.getElementById("to-do").value);


      // obj[i++].todo=;
      show();



  }

    catch(err) {
          alert( "Sorry ! " + err ) ;
       }


}
function showcomments(j){
for (l=0, q="";l<obj[j].say.length;l++)
    {
      q+="<p>"+obj[j].say[l]+ "  <a title='delcomments("+j+","+l+" )' onclick='delcomments("+j+","+l+"  )'> &times </a>  </p>";

  }
  document.getElementById('quotes').innerHTML=q;
  document.getElementById('modal-title').innerHTML=obj[j].todo ;
  addcomm="<input type='text' id='msg' class='form-control' placeholder='Add your Comments Here'>";
  addcomm+="<button style='width:100%;' type='button' class='btn btn-primary' onclick='addcomments("+j+")' >Add Comments  </button>";
  document.getElementById('addcomments').innerHTML=addcomm;


}

function addcomments(j){

  l=obj[j].say.length;
  obj[j].say[l] = document.getElementById('msg').value;
showcomments(j);
}

function delcomments(j,l)
{
  console.log(obj[j].say[l] , j, l)
obj[j].say.splice(l, 1);
showcomments(j);
}

function show()
{
  var res="  <div class='wrap-title'>To Do </div>";
  var res2="<div  class='wrap-title'>In Progress </div>";
  var res3="  <div class='wrap-title'> Completed  </div>" ;
 j=0;

  for(j in obj)
  {
    if(obj[j].status===1)
    res+= "<div id='drag' draggable='true' ondragstart='drag("+j+")'>" + obj[j].todo +"  </div> ";

    if(obj[j].status===2)
{    res2+= "<div id='drag' draggable='true' ondragstart='drag("+j+")'>" + obj[j].todo +
"<span class='info'> <button class='btn btn-success' title='view details' data-toggle='modal' data-target='#myModal' onclick='showcomments("+j+")' > &crarr; </a> </span> </div> ";

}

    if(obj[j].status===3)
    res3+= "<div id='drag' style='text-decoration:line-through' draggable='true' ondragstart='drag("+j+")'>" + obj[j].todo +" <span class='info'> <button class='btn btn-danger' onclick='del("+j+")'>  &times; </button> </span> </div> ";


  }


  document.getElementById('job').innerHTML=res;
  document.getElementById('inprogress').innerHTML=res2;
  document.getElementById('completed').innerHTML=res3;

  text=JSON.stringify(obj);
 localStorage.setItem("text", text);





}



function allowDrop(a) {
      a.preventDefault();

  }

function complete(k){
  obj[k].status=3;
  show();
}
function redo(k){
  obj[k].status=1;
  show();
}

function progress(k){
  obj[k].status=2;
  show();
}


function drag(a) {
  k=a;

}

function del(j)
{
alert("Item No "+j+ " : " +  obj[j].todo  + " is completed and removed!");
obj.splice(j, 1);
show();
}
