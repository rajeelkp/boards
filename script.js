var i=0,k=0;


if (!localStorage.getItem("text") == true) {
  var text=[{}] ;
  text.todo="";
  text.say=[""];
  text.day=[""];
  text.time=[""];
  t=JSON.stringify(text);
    localStorage.setItem("text", t);


}

var obj = JSON.parse(localStorage.getItem("text"));
function object(first,date,time) {
    this.todo = first;
    this.say=[" remember this "]
    this.date=date;
    this.time=time;
    this.status=1;
    this.priority="normal";
}







function adder(){

 try
      {

         if(document.getElementById("to-do").value=="") throw "You haven't added a task !";
            if(document.getElementById("date1").value=="" || document.getElementById("time1").value=="") throw "Please specify the Date and Time !";
        //  console.log(document.getElementById("to-do").value);
    i=obj.length;
date1=document.getElementById("date1").value;
time1=document.getElementById("time1").value;
    obj[i++]= new object(document.getElementById("to-do").value,date1, time1 );


      // obj[i++].todo=;
      show();



  }

    catch(err) {
          alert( "Sorry ! " + err ) ;
       }


}

function setPriority(j){




    document.getElementById('set').innerHTML=set;
}

function changepr(j)
{
  document.getElementById('changepr').innerHTML="<select onchange='priority("+j+")' id='priority'> <option></option><option>High</option><option>Medium</option>  <option>Low</option>  </select> ";
  show();
document.getElementById('changepr').style.display = 'hide';

}
function showcomments(j){
for (l=0, q="";l<obj[j].say.length;l++)
    {
      q+="<p>"+obj[j].say[l]+ "  <a title='delcomments("+j+","+l+" )' onclick='delcomments("+j+","+l+"  )'> &times </a>  </p>";

  }
// document.getElementById('changepr').style.display = 'none';
  document.getElementById('quotes').innerHTML=q;
  document.getElementById('modal-title').innerHTML=obj[j].todo ;
  document.getElementById('modal-title').innerHTML+="<span class='prio'> Priority Level : "+obj[j].priority+"<br/><small><a onclick='changepr("+j+")'>Change priority</a></small> <div id='changepr'></div> </span> <hr/><span class='time glyphicon glyphicon-time'> "+ obj[j].time+"</span>";
  document.getElementById('modal-title').innerHTML+=" <span class='date glyphicon glyphicon-calendar'> "+obj[j].date+"</span>";

  addcomm="<input type='text' id='msg' class='form-control' placeholder='Add your Comments Here'>";
  addcomm2="<button style='width:100%;' type='button' class='btn btn-primary' onclick='addcomments("+j+")' >Add Comments  </button>";
  document.getElementById('addcomments').innerHTML=addcomm;
  document.getElementById('addcommentsbutton').innerHTML=addcomm2;
    document.getElementById('addcomments').className="show";
      document.getElementById('preview').className="hide";
k=j;
show();
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
    {
      res+= "<div id='drag' ";
        if(obj[j].priority==="High")
            res+=" class='highp' ";
        else if(obj[j].priority==="Medium")
            res+=" class='medp' ";
        else if(obj[j].priority==="Low")
            res+=" class='lowp'";

       res+=" draggable='true' ondragstart='drag("+j+")'>" + obj[j].todo +"   <span class='info'> <button class='btn btn-default'";



      res+=" data-toggle='modal' data-target='#myModal' onclick='showcomments("+j+")'> ! </button></span>  </div> ";


  }
    if(obj[j].status===2)
          {    res2+= "<div id='drag'";
                  if(obj[j].priority==="High")
                      res2+=" class='highp' ";
                  else if(obj[j].priority==="Medium")
                      res2+=" class='medp' ";
                  else if(obj[j].priority==="Low")
                      res2+=" class='lowp'";

              res2+=" draggable='true' ondragstart='drag("+j+")'>" + obj[j].todo +
              "<span class='info'> <button class='btn btn-success' title='view details' data-toggle='modal' data-target='#myModal' onclick='showcomments("+j+")' > &crarr; </a> </span> </div> ";

              }

    if(obj[j].status===3)
    {res3+= "<div id='drag' ";
        if(obj[j].priority==="High")
            res3+=" class='highp' ";
        else if(obj[j].priority==="Medium")
            res3+=" class='medp' ";
        else if(obj[j].priority==="Low")
            res3+=" class='lowp'";

    res3+=" style='text-decoration:line-through' draggable='true' ondragstart='drag("+j+")'>" + obj[j].todo +" <span class='info'> <button class='btn btn-danger' onclick='del("+j+")'>  &times; </button> </span> </div> ";
}




  }


  document.getElementById('job').innerHTML=res;
  document.getElementById('inprogress').innerHTML=res2;
  document.getElementById('completed').innerHTML=res3;

  text=JSON.stringify(obj);
 localStorage.setItem("text", text);





}


function setPriority(j)
{

setPrioritycode="<button type='button' style='float:right; width:50%;' class=\"btn btn-default\" data-dismiss=\"modal\" onclick='priority("+j+")'>Set Priority </button>"  ;
document.getElementById('modal-footer-p').innerHTML=setPrioritycode;


}

function priority(j){
p=document.getElementById('priority').value;
console.log(p);

obj[j].priority=p;
show();
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

function imageadder(j){
var canvas = document.getElementById("can");
   var ctx = canvas.getContext("2d");
  //  var imge = document.getElementById("preview");

  //  imagecode = "<img src='"+imge+"' id='im' hidden='true' >";
  //  document.getElementById('imagecode').innerHTML=imagecode;

   var img = document.getElementById("preview");
  //  console.log(img);

     ctx.drawImage(img, 10, 10);
   imageurl=canvas.toDataURL('image/png');
addcommentimg(j,imageurl);
      // imagecode2 =" <img style='border: 5px inset #414141;' src='" +q+"' id='im' >";
      // document.getElementById('imagecode2').innerHTML=imagecode2;
}

function addcommentimg(j,imageurl){
// alert(obj[j].todo);
  l=obj[j].say.length;
  obj[j].say[l] = "<img height=\"150\" width=\"150\" class=\"img-rounded\" src='"+imageurl+"'/>";
  showcomments(j);
}



function previewFile() {
      var preview = document.getElementById('preview');
      var file    = document.querySelector('input[type=file]').files[0];
      var reader  = new FileReader();

      reader.addEventListener("load", function () {
        preview.src = reader.result;
        preview.className="show";
        // document.getElementById('imageadder').className="show";
        addcommentsbutton="<button style='width:100%;' type='button' class='btn btn-primary' onclick='imageadder("+k+")' >Add Image  </button>";
        document.getElementById('addcommentsbutton').innerHTML=addcommentsbutton;
        document.getElementById('addcomments').className="hide";
      }, false);

      if (file) {
        reader.readAsDataURL(file);
      }
}
