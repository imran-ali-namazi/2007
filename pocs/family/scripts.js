
var nfo; var timer; 
var SingleCall = "false"; 
var loc=document.getElementById("distribution");

function ShowLineage(key)
{
  window.open('hmagn-lineage.html','Lineage','scrollbars=yes, width=520, height=400, top=160, left=140');
}

function init() {
  nfo=document.getElementById("information");
  //setTitleForClass("location"); //using span class='tt' title='location: ''
  setTitleForClass("alias");
  setTitleForClass("nb");
  setTitleForClass("note");

  attachEvents(false); //
  nfo.style.display = "none";
  //ShowStartMessage();
}

function ShowStartMessage()
{ 
  //if (window.location.IndexOf('#tks') != -1)
  //alert(window.location.lastindexOf("#tks"));
}

function ApplyTheme(Theme)
{
  document.body.id=Theme;
  return;
}

function attachEvents(CollapseHeadsOnStart) {
  //Add "Toggle Visibility" & rollover For Heads
  var heads = getElementsByClass("head");
	for (var i=0; i<heads.length; i++) //
  {
    heads[i].onclick= function()      { toggleChildren(this); }
    if (heads[i].className.indexOf("child") == -1) /* We dont want an unmarried person (child) to jhave a rollover effect */
    {
  		heads[i].onmouseover=function()   { this.className+=" rollover";  }
  		heads[i].onmouseout=function()    { this.className=this.className.replace(new RegExp(" rollover\\b"), ""); }
  		if (CollapseHeadsOnStart == true) { toggleChildren(heads[i],true);}
  	}
  }
  
  //
  var bios = getElementsByClass("info");
	for (var i=0; i<bios.length; i++)
  { bios[i].onclick= function()       { show(this.innerText); }       }
  
  var nls = getElementsByClass("newline"); //When a family is rather large
	for (var i=0; i<nls.length; i++)
  { nls[i].onclick= function()        { ToggleClear(this); }          }
}

function ToggleClear(obj)
{
  var par = obj.parentElement;
  if (obj.className == "newline")
  { obj.className+=" pressed"; par.className+=" cleared"; }
  else
  { obj.className = "newline"; par.className =par.className.replace(new RegExp(" cleared\\b"), ""); ; }
  setSingleCallFlag();
}


function hide(obj) { obj.style.display = "none"; }

function show(person) 
{
  //nfo.style.padding-top = obj.top;  
  var found = getArrayIndex(name,person);
  if (found==0)
    { nfo.innerHTML = "<a href=\"javascript:hide(nfo)\" class=\"close\"></a><h3>" + person + " <u>not found!</u></h3>"; }
  else
  {
    nfo.innerHTML= "<a href=\"javascript:hide(nfo)\" class=\"close\"></a>"
      + "<h3>" + person + "</h3>";
    if (info[i]) { nfo.innerHTML += "<h6>Info:</h6>" + info[i] }
    if (bio[i])  { nfo.innerHTML += "<h6>Bio:</h6>" + bio[i]  }
  }

  setSingleCallFlag();

  var ev = window.event;
  mousePos = mouseCoords(ev);
  //alert(mousePos.x + " " + mousePos.y);
  nfo.style.top  = mousePos.y + 20 // - tip.clientHeight - 10;
  nfo.style.left = mousePos.x - 20 // - ( tip.clientWidth / 2 );
  nfo.style.display = "";
}


function toggleChildren(obj,ProgramCall) {
  //this funcion is recursively called from the innermost child => need to use a timer to block
  if (SingleCall=="true") { /*alert("returning");*/ return; }
  
  if (obj.className.indexOf("child") == -1) /* We dont want an unmarried person (child) to cause a collape of his parent */
  {
    //Change Icon & Get Style to set
    if (obj.className.indexOf("collapsed") != -1)
      obj.className= obj.className.replace(new RegExp(" collapsed\\b"), "");
    else
      obj.className += " collapsed"; //styleToSet="none" }
    
    //Get the objects to collapse
    if (document.all.HideSpouse.checked == true)
      tags=getElementsByClass("person",obj,"div");
    else
      tags=getElementsByClass("children",obj);
    
    //set styles (display) to hide / unhide
  	for (var i=0; i<tags.length; i++) 
      tags[i].style.display = ((tags[i].style.display=="none") ? "" : "none");
  }
  //disallow this function from being called on the parents of the actual object to collapse/expand
  if (ProgramCall + "" == "undefined")
    setSingleCallFlag();
}

/* Options Box Functions */
function changeAliasVisibility() 
{
  tags=getElementsByClass("alias",document.getElementById("family"),"span")
  var show = ((document.all.ShowAliases.checked) ? "" : "none")
	for (var i=0; i<tags.length; i++) 
    { tags[i].style.display = show; }
}

function ToggleNewLine(obj)
{
}


/* Helper Functions */
function setSingleCallFlag()
{ timer=setInterval("clearSingleCallFlag()",200); SingleCall="true"; }
function clearSingleCallFlag() 
{ SingleCall="false"; }

function setTitleForClass(cssclass)
{
	var tags = getElementsByClass(cssclass,null,"span");
	var endText = cssclass != "nb" ? ")" : "...)";
	//alert(tags.length);
	for (var i=0; i<tags.length; i++) 
  {
		if (cssclass != "nb" && cssclass != "note") tags[i].title = cssclass;
		if (cssclass == "location")
      loc.innerHTML += tags[i].innerText + ", ";
    if (cssclass != "info")
      tags[i].innerText = "(" + tags[i].innerText + endText; //loc.innerHtml += tags[i].innerText + "<br>";
	}
}

/* http://www.dustindiaz.com/top-ten-javascript/ */
/* tag is to more specifically target only TAGs having class searchClass */
function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp('(^|\\s)'+searchClass+'(\\s|$)');
	for (i = 0, j = 0; i < elsLen; i++) 
  {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

/* http://www.netlobo.com/javascript_tooltips.html */
function mouseCoords(ev)
{
  if(ev.pageX || ev.pageY){
    return {x:ev.pageX, y:ev.pageY};
  }
  return {
    x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
    y:ev.clientY + document.body.scrollTop  - document.body.clientTop
  };
}

function getArrayIndex(arr,query) //these arrays must not have values @ 0th index
{
  for (i = 1; i < arr.length; i++)
  { if (arr[i] == query) return i; }
  return 0;
}

/* Data */
var name = new Array();
var bio  = new Array();
var info  = new Array();
 name[1] = "Haji Mirza Abdul Gani Namazi";
 info[1]  = "The last of  11 children of Haji Mirza Abdul Karim Namazi.";

 name[2] = "Imran Ali";
 info[2]  = "<s>email</s>: Imran@cselian.com<br><s>date of birth</s>: 15 Oct 1983"

 name[3] = "Haji Mirza Abdul Karim";
  bio[3]  = "Came to Madras towards the end of the 19th century with his brother Mohd. Bawker. <p> Married Zahra Begum,  one of the daughters of Karam Khan. His brother Bawker married Kulsum, another daughter of Karam Khan. <p>Karam Khan was married into the family of Tipu Sultan.";

