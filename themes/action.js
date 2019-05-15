function gotohome()
{
	location.replace("#home");
}
function showmenu()
{
	location.replace("#menu");
}
function loading()
{
	gotohome();
}
findelement="";
function loadfpmenu() {
	var xhttp = new XMLHttpRequest();
	  xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			res="<span class='w3-btn w3-red'>کلمات پربازدید : </span>";
			myobj=JSON.parse(this.responseText);
			for(i=0;i<myobj.words.length;i++)
			{
				res=res+"<span onclick='findvd("+'"'+myobj.words[i].wr+'"'+")' class='w3-btn w3-red'>"+myobj.words[i].wr+"</span>";
			}
			document.getElementById('fpmenu').innerHTML=res;
		}
	  };
	  xhttp.open("GET", "https://www.multijib.ir/mob/menu.php", true);
	  xhttp.send();
}
function loadvdlist(mor) {
	loadfpmenu();
	findf="";
	findmor="";
	if(findelement!="")
	{
		findf="?fi="+findelement;
		findmor="&fi="+findelement;
	}
	url="https://www.multijib.ir/mob/video_list.php"+findf;
	if(mor!=0)
	{
		url = "https://www.multijib.ir/mob/video_list.php?pg=" + mor+findmor;
	}
    if (url.length == 0) {
        return;
    } else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) { 
				vdlist=JSON.parse(xmlhttp.responseText);
				newsrc="";
				for(i=0;i<vdlist.video.length;i++)
				{
					newsrc=newsrc+'<div class="videobox" onclick="loadvideo('+"'"+(vdlist.video[i].videocode).trim()+"'"+');">';
					newsrc=newsrc+'<img src="'+vdlist.video[i].image+'" class="videopic">';
					newsrc=newsrc+'<div class="videotext"><br>';
					newsrc=newsrc+vdlist.video[i].title+"<br>";
					var keywordsvar;
					keywordsvar=vdlist.video[i].keywords;
					//alert(keywordsvar);
					keysbtn=keywordsvar.split(",");
					newsrc=newsrc+"<div class='scrollmenu'>";
					for(j=0;j<keysbtn.length;j++)
					{
						if(keysbtn[j].trim()!="" && keysbtn[j].trim()!="film" && keysbtn[j].trim()!="video" 
						&& keysbtn[j].trim()!="clip" && keysbtn[j].trim()!="فیلم" && keysbtn[j].trim()!="کلیپ" )
						{
							newsrc=newsrc+"<span class='w3-pink w3-btn' style='margin:5px; border-radius:5px;' onclick='findvd("+keysbtn[j].trim()+")'>"+keysbtn[j].trim()+"</span>";
						}
					}
					newsrc=newsrc+"</div>";
					/*if(mor>0)
					{
						newsrc=newsrc+'</div></div><div id="vdlist'+mor+'"></div>';
					}else{*/
						newsrc=newsrc+'</div></div><div id="vdlist"></div>';
					//}
				}
				if(mor!=0)
				{
					document.getElementById('vdlist').innerHTML=document.getElementById('vdlist').innerHTML+newsrc;
				}
				else{
					document.getElementById('vdlist').innerHTML=newsrc;
				}
				//alert(vdlist.video[0].link);
				if(mor==0)
				{
					setTimeout(loading, 3000);
					//loading();
				}
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
}
if(localStorage["searchcount"]==undefined)
{
	localStorage["searchcount"]=0;
}
function findvd(txt)
{
	if(txt!="")
	{
		if(txt.length>2)
		{
			document.getElementById('vdlist').innerHTML="";
			findelement=txt;
			loadvdlist(0);
			document.getElementById('ssid').style.display='none';
			sitem="searchitem"+localStorage["searchcount"];
			localStorage[sitem]=txt;
			localStorage["searchcount"]=Number(localStorage["searchcount"])+1;
		}
	}
}
function hideloading()
{
	document.getElementById('id01').style.display='none';
}

if(localStorage["vdcount"]==undefined)
{
	localStorage["vdcount"]=0;
}
function loadvideo(id)
{
	document.getElementById('id01').style.display='block';
	url="https://www.multijib.ir/mob/video_info.php?id="+id;
    if (url.length == 0) {
        return;
    } else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) { 
				videoinfo=JSON.parse(xmlhttp.responseText);
				newsrc='<video width="320" height="240" controls class="videopic"';
				newsrc=newsrc+'<source src="'+videoinfo.video+'" type="video/mp4">';
				newsrc=newsrc+'</video>';
				newsrc=newsrc+"<div style='width:100%; text-align:center; padding-top:20px; color:#3388cc; font-size:30px;'>";
				
				newsrc=newsrc+"<span style='margin-left:10px; margin-right:10px; display:none;'><i class='fas fa-heart'></i></span>";
				
				newsrc=newsrc+"<span style='margin-left:10px; margin-right:10px; display:none;'><i class='far fa-heart'></i></span>";
				
				newsrc=newsrc+"<span style='margin-left:10px; margin-right:10px;' onclick='addfave("+'"'+id+'"'+","+'"'+videoinfo.title+'"'+")'><i class='fas fa-star'></i></span>";
				
				newsrc=newsrc+"<span style='margin-left:10px; margin-right:10px; display:none;'><i class='far fa-star'></i></span>";
				
				newsrc=newsrc+"<span style='margin-left:10px; margin-right:10px;' onclick='document.getElementById("+'"'+"sharemd"+'"'+").style.display="+'"'+"block"+'"'+"'><i class='fas fa-share-alt-square'></i></span>";
				
				newsrc=newsrc+"<a style='margin-left:10px; margin-right:10px;' href='https://www.multijib.ir/showvsource.php?download=1&id="+videoinfo.id+"&vc="+id+"' target='_blank'><i class='fas fa-download'></i></a>";
				
				newsrc=newsrc+"</div>";
				newsrc=newsrc+'<h1 class="videotitle">'+videoinfo.title+'</h1>';
				newsrc=newsrc+'<p class="videomortext">'+videoinfo.text+'</p>';
				//newsrc=newsrc+'<p class="keybox">';
				//newsrc=newsrc+'<b class="keytitle">'+videoinfo.keywords+'</b><br><br>';
				//newsrc=newsrc+'<span class="keytext">'+videoinfo.jaygasht+'</span>';
				newsrc=newsrc+'</p>';
				keywordsvar=videoinfo.keywords;
					//alert(keywordsvar);
					keysbtn=keywordsvar.split(",");
					for(j=0;j<keysbtn.length;j++)
					{
						if(keysbtn[j].trim()!="" && keysbtn[j].trim()!="film" && keysbtn[j].trim()!="video" 
						&& keysbtn[j].trim()!="clip" && keysbtn[j].trim()!="فیلم" && keysbtn[j].trim()!="کلیپ" )
						{
							newsrc=newsrc+"<span class='w3-btn w3-green' style='margin:5px; border-radius:5px; max-width:300px;' onclick='findvd("+'"'+keysbtn[j].trim()+'"'+")'>"+keysbtn[j].trim()+"</span>";
						}
					}
				
				document.getElementById('mainvideo').innerHTML=newsrc;
				vdid="vdid"+localStorage["vdcount"];
				localStorage[vdid]=id;
				vdtitle="vdtitle"+localStorage["vdcount"];
				localStorage[vdtitle]=videoinfo.title;
				localStorage["vdcount"]=Number(localStorage["vdcount"])+1;
				document.getElementById('swhatsapp').href="https://wa.me/?text=https://www.multijib.ir/index.php?video="+videoinfo.id;
				document.getElementById('stelegram').href="tg://msg?text="+videoinfo.title+"&link=https://www.multijib.ir/index.php?video="+videoinfo.id;
				document.getElementById('semail').href="mailto:?subject="+videoinfo.title+"&body=https://www.multijib.ir/index.php?video="+videoinfo.id;
				document.getElementById('ssms').href="sms:?&body="+videoinfo.title+" https://www.multijib.ir/index.php?video="+videoinfo.id;
				location.replace("#video");
				setTimeout(hideloading, 2200);
				//document.getElementById('id01').style.display='none';
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
}
var mor = 2;
var morc = 0;
loadvdlist(0);
function morepg(mors) {
	if (morc > 100) {
		console.log(url);
		loadvdlist(mors);
		morc = 0;
		mors = mors + 1;
	}
	morc++
	return mors;
}
function refresh(){
	findelement="";
	document.getElementById('vdlist').innerHTML="";
	loadvdlist(0);
}

function showact(){
	res="";
	for(i=Number(localStorage["searchcount"])-1;i>=0;i--)
	{
		sitem="searchitem"+i;
		res=res+"<span class='w3-btn w3-green' style='margin:3px;' onclick='findvd("+'"'+localStorage.getItem(sitem)+'"'+")'>"+localStorage.getItem(sitem)+"</span>";
	}
	document.getElementById('mysearch').innerHTML=res;
	res="";
	for(i=Number(localStorage["vdcount"])-1;i>=0;i--)
	{
		sitem="vdtitle"+i;
		sitem2="vdid"+i;
		res=res+"<div style='width:100%; margin-top:10px; margin-bottom:10px; border-bottom-style:dashed; border-bottom-width:1px; border-bottom-color:blue;'><span style='margin:3px; color:#6ebbf8; font-size:12px; font-weight:bold;' onclick='loadvideo("+'"'+localStorage.getItem(sitem2)+'"'+")'> - "+(localStorage.getItem(sitem)).substr(0,70)+"...<br><br></span></div>";
	}
	document.getElementById('myvdlist').innerHTML=res;
	location.replace("#myact");
}
if(localStorage["favecount"]==undefined)
{
	localStorage["favecount"]=0;
}
function addfave(id,title){
	for(i=0;i<Number(localStorage["favecount"]);i++)
	{
		testitem="ifave"+i;
		if(id==localStorage[testitem])
		{
			alert("این ویدئو قبلا توسط شما منتخب شده است...");
			return;
		}
	}
	titem="tfave"+localStorage["favecount"];
	localStorage[titem]=title;
	iitem="ifave"+localStorage["favecount"];
	localStorage[iitem]=id;
	showfave="showfave"+Number(localStorage["favecount"])
	localStorage[showfave]=true;
	localStorage["favecount"]=Number(localStorage["favecount"])+1;
	alert("این ویدئو به لیست منتخب اضافه شد.");
	
}
function delfave(faveid){
	localStorage[faveid]=false;
	showfave();
}
function showfave(){
	res="";
	for(i=Number(localStorage["favecount"])-1;i>=0;i--)
	{
		sitem="ifave"+i;
		sitem2="tfave"+i;
		visi="showfave"+i;
		if(localStorage[visi]=="true")
		{
			res=res+"<div style='width:100%; margin-top:10px; margin-bottom:10px; border-bottom-style:dashed; border-bottom-width:1px; border-bottom-color:blue;'><span onclick='delfave("+'"'+visi+'"'+")' class='w3-red' style='text-align:center; padding:8px; border-radius:50%; font-size:12px;'><i class='far fa-trash-alt'></i></span><span style='margin:3px; color:#6ebbf8; font-size:12px; font-weight:bold;' onclick='loadvideo("+'"'+localStorage.getItem(sitem)+'"'+")'> - "+(localStorage.getItem(sitem2)).substr(0,70)+"...<br><br></span></div>";
		}
	}
	document.getElementById('myfave').innerHTML=res;
	location.replace("#favepage");
}
function delact(){
	for(i=0;i<localStorage["vdcount"];i++)
	{
		itemid="vdid"+i;
		localStorage.removeItem(itemid);
		itemtitle="vdtitle"+i;
		localStorage.removeItem(itemtitle);
	}
	localStorage["vdcount"]=0;
	for(i=0;i<localStorage["searchcount"];i++)
	{
		sitem="searchitem"+i;
		localStorage.removeItem(sitem);
	}
	localStorage["searchcount"]=0;
	showact();
}