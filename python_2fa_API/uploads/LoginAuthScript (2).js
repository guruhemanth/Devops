<style type=text/css> 
div.otlScreen
{
	position: absolute;
	background: #000000;
	left: 0px;
	top: 0px;
	padding: 0px;
	margin: 0px;
	text-align: center;
	#filter: alpha(opacity=50);
	#-moz-opacity: .50;
	opacity: .50;
	-ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(opacity=50)';

}
div.otlDIV 
{
	position: absolute;
	background-repeat:no-repeat;
	border: solid 0px #56542E;
	font-family: Verdana;
	font-size: 11px;
	color: #132E79;
	left: 100px;
	top: 15px;
	padding: 5px;
	text-align:center;
}
div.otlDIV1
{
	position: absolute;
	border: solid 2px #56542E;
	font-family: Verdana;
	font-size: 11px;
	color: #56542E;
	left: 100px;
	top: 15px;
	width: 800px;
	height: 210px;
	padding: 5px;
	text-align:left;
	font-weight:normal;
	text-indent:50px;
}
.otlTAB 
{
	background:transparent;
	font-family: Verdana;
	font-size: 11px;
	color: #132E79;
	left: 350px;
	top: 150px;
	width: 670px;
	padding: 5px;
	text-align: center;
}
input.otlBT 
{
	background: #F9E75F;
	border: solid 2px #56542E;
	font-family: Arial;
	font-size: 11px;
	font-weight: bold;
	color: #000000;
	padding: 2px;
}
input.otlText 
{
	border: solid 1px #56542E;
	font-family: Courier New;
	font-size: 13px;
	color: #000000;
	padding: 2px;
	width: 150px;
}
input.otlButton 
{
	background: #FFFFFF;
	border: solid 2px #56542E;
	font-family: Arial;
	font-size: 11px;
	font-weight: bold;
	color: #000000;
	padding: 2px;
	width:60px;
}
select.otlSel 
{
	border: solid 1px #56542E;
	font-family: Courier New;
	font-size: 13px;
	color: #000000;
	padding: 2px;
	width: 150px;
}
#otlRegTemp3
{
    width: 130px;
}
.otlClos
{
	text-align:right;	
}
.tdNumL
{
	text-indent:50px;
	font-family: Arial;
	font-size: 13px;
}
.tdNum
{
	font-family: Arial;
	font-size: 11px;
	text-align:center;
	color:#132E79;
}
.tdNumR
{
	font-family: Arial;
	font-size: 13px;
	text-align:center;
	color:#132E79;
}
#otpCode , #otpCode2
{
	-webkit-text-security: disc !important;
    text-security: disc !important;
}
input[type="checkbox"] + label:before,
input[type="radio"] + label:before 
{
	border-radius: none;
	border: none;
	content: '';
	display: inline-block;
	height: auto;
	left: 0px;
	line-height: auto;
	position: relative;
	text-align: center;
	top: 0px;
	width: auto;
}
input[type="checkbox"]:checked + label:before, input[type="radio"]:checked + label:before
{
	border-radius: none;
	border: none;
	content: '';
	display: inline-block;
	height: auto;
	left: 0px;
	line-height: auto;
	position: relative;
	text-align: center;
	top: 0px;
	width: auto;
}
</style>
<script type="text/javascript">
// 5.24.6.25 24JUNE2025
/*In firefox GLOBAL SCRIPT operations will not be executed (which is not the case in IE). We may have some operations occurring in a hapazard manner (in firefox only) due to this behavior. One such thing is the event based trapping of the form submit events being triggered with submit() functions, in which case the page needs to be reloaded. The workaround for this will be the usage of the window.onload event and perform the trap operations in the same instead of the normal GLOBAL SCRIPT operations*/
/*initialize all the necessary global variables*/
/* 1.16.8.24 16AUG2024*/
var disablenewcontrolinstall=1;
var isloginauthscriptexist=1; //Added for HDFC instance since the download script is attached with prelogin page .Add-on installation should be handled for certificate user only.
var otlAddonVersion = "1.0";
var otlSubmitName = "";
var otlSignPopup = 1;
var otlBrowser = 0;
var otlSubFlag = 0;
var otlFormFlag = 0;
var otlCtrlFlag = 0;
var otlEventFlag = 0;
var otlFirefoxVersion = 2;
var otlSubmitEvent;
var otlPreserveOnSubmit = new Array();
var otlPreserveSubmit = new Array();
var otlParam = new Array();
var otlNames = new Array();
var otlForm = new Array();
var CrData = "";
var popuptype=0;
var snklimage = "/snkl_otl/210"+SnklAppId+".jpg";

otlForm[0] = _fo[0];
var otlCloseFlag = false;
var otlGlbSubmitSrc;
if( typeof XMLHttpRequest == "undefined" ) XMLHttpRequest = function() 
{
	try { return new ActiveXObject("Msxml2.XMLHTTP.6.0") } catch(e) {}
	try { return new ActiveXObject("Msxml2.XMLHTTP.3.0") } catch(e) {}
	try { return new ActiveXObject("Msxml2.XMLHTTP") } catch(e) {}
	try { return new ActiveXObject("Microsoft.XMLHTTP") } catch(e) {}
	throw new Error( "This browser does not support XMLHttpRequest." )
};
var otlEventObj = {};
var otlEventObj = 
{
	capture : function(innerHTML, name, value, src,id) 
	{
		if(innerHTML != null) { this.innerHTML = innerHTML; }
		if(name != null) { this.name = name; }
		if(value != null) { this.value = value; }
		if(src != null) { this.src = src; }
		if(id != null){this.id = id; }
	}
};
/*find the browser and verify whether the control/addon is installed*/
/*if IE then load sr_otl.cab into the browser & check the same by using a DUMMY call*/
if(navigator.userAgent.indexOf("MSIE") != -1)
{
        otlBrowser = 1;
}
else if(navigator.appName == 'Netscape' && navigator.userAgent.match('Trident/') && parseInt(navigator.appVersion.split('rv:')[1])>=11)	{ otlBrowser = 1;}
/*if not IE, then request extended privileged and check whether the addon is installed or not*/
else if(navigator.userAgent.indexOf("Safari")!=-1)
{
		otlBrowser = 2;
}
else if((navigator.userAgent.indexOf("Mozilla") != -1) && (navigator.userAgent.indexOf("Gecko") != -1) && (navigator.userAgent.indexOf("Firefox") != -1))
{
	otlFirefoxVersion=navigator.userAgent.split("Firefox/")[1].split(".")[0];
	//otlBrowser = 3;
}
/*else
{
	alert("Browser is not supported\n Supported Browser : Internet Explorer, Firefox and Safari");
}*/	
/*registration of onclick event listener for event based signing*/
document.onkeypress = otlClick;
document.onmouseup = otlClick;
/* This below case is handled for any child window opens after login */
var otlNativeClose=window.close;
var otlNativeCloseFlag=0;
window.close=function()
{
	otlNativeCloseFlag=1;
	this.focus();
	setTimeout("this.focus();",300);
}
function otlClick(event)
{
    if(otlBrowser) { field = window.event.srcElement; }
        else { field = event.target; }

	try { if(field.type == "submit"){ otlSubmitName = field.name; } } catch(e) { }
	//Below try block is specific for Sharjah Islamic bank when clicking the CLEAR button on login page
	try{
		if(field.id=="onclear"){
		window.location.href=otl_SharjLocation;
		}
	}catch(e){}
	otlEventObj.capture(field.innerHTML, field.name, field.value, field.src,field.id);
    if(otlEventFlag)
	{
		otlConfirmSign(otlParam[0], otlParam[1]);
	}
}
/*function to override the actual onsubmit in the Precursor*/
function otlReplaceSubmit(subStr)
{
	subStr = subStr.substring(subStr.indexOf("{")+1, subStr.lastIndexOf("}"));
	/*to handle onsubmit cases which are written within the handler itself*/
	if(subStr.search("return true") != -1)
	{
		subStr = subStr.replace("return true", "otlConfirmSign(this, 0)");
		otlSubFlag = 1;
	}
	/*to handle the normal onsubmit cases*/
	else
	{
		subStr = subStr.replace("return", "");
	}
	return subStr;
}
// Modified for ILFS
var tempFrm="";
var otli=0;
/*Custom onsubmit event handler*/
function otlOnSubmit(event)
{
	var rv;
	if(otlBrowser) { var formObj = window.event.srcElement; otlSubmitEvent = window.event; }
	else { var formObj = event.target; otlSubmitEvent = event; }
	tempFrm=formObj;
	for(var i=0; i<document.forms.length; i++)
	{
		if(document.forms[i] == formObj)
		{
			if(!otlPreserveOnSubmit[i])
			{
				rv = true;
				break;
			}
			rv = eval(otlPreserveOnSubmit[i]);
			break;
		}
	}
	if(!rv && rv != undefined)
	{
		return false;
	}
	otlConfirmSign(this, 0);
	//otlSubmitEvent.returnValue = false;	
}
/*Custom submit event handler*/
function otlSubmit()
{
	otlConfirmSign(this, 1);
}
/*function to prevent the submit event from happening*/
function otlStopEvent()
{
	/* set to zero for preventing event flow after cancelling the signing operation in any case */
	otlEventFlag = 0;
	try 
	{
		if(otlBrowser) { otlSubmitEvent.returnValue = false; }
		else { otlSubmitEvent.preventDefault(); }
	}
	catch(e) { }
	return false;
}
/*function to trigger the submission of the trapped form event*/
function otlProceedEvent(submitFlag, formPos)
{
	submitFlag = 1;
	if(submitFlag)
	{
		if(tfaEnabled)
		{
			document.forms[formPos].appendChild(otlAddField("authValue", otlAuthValue));
			document.forms[formPos].appendChild(otlAddField("authFactor", otlAuthType));
			document.forms[formPos].appendChild(otlAddField("authValue1", otlAuthValue1));
			document.forms[formPos].appendChild(otlAddField("authFactor1", otlAuthType1));
		}
		else
		{
			document.forms[formPos].appendChild(otlAddField("authValue", otlAuthValue));
			document.forms[formPos].appendChild(otlAddField("authFactor", otlAuthType));
		}
		document.forms[formPos].appendChild(otlAddField("setAsDefault", otlDefaultAuth));
		document.forms[formPos].submit = otlGlbSubmitSrc;
		document.forms[formPos].submit();

		/* This below case is handled for any child window opens after login */
		if(otlNativeCloseFlag==1)
		{
			window.close=otlNativeClose;
			window.close();
		}
	}
	return false;
}
/*function which adds the hidden into the form being submitted*/
function otlAddField(name, value)
{
	var element = document.createElement("input");
	element.setAttribute("type", "hidden");
	element.setAttribute("name", name);
	element.setAttribute("id", name);
	element.setAttribute("value", value);
	return element;
}
function otlInfoClose()
{
	otlGetElem('otlScreen1').style.display="none";
	otlGetElem('otlRegTemp1').style.display="none";
	if(window.location.href.indexOf("https://192.168.1.232:4443/bank/Retail_Banking/Login.htm") != -1)
	{
		window.location.href="https://192.168.1.232:4443/bank/Retail_Banking/Login.htm";
	}
	else if(window.location.href.indexOf("https://192.168.1.232:4443/bank/Retail_Banking/Login.htm") != -1)
	{
		window.location.href="https://192.168.1.232:4443/bank/Retail_Banking/Login.htm";
	}
	else if(window.location.href.indexOf("https://192.168.1.232:4443/bank/Retail_Banking/Login.htm") != -1)
	{
		window.location.href="https://192.168.1.232:4443/bank/Retail_Banking/Login.htm";
	}
}
function otlShowErrorDiv(errorCode, errorString)
{
	var msg="";
	if(errorCode == "-1504" || errorCode == -1504)
		msg="User not active. Please contact the administrator to reactivate";
	else if(errorCode == "-4211" || errorCode == -4211)
		msg="Your Session has timed out. Please login again.";
	else if(errorCode == "-1211" || errorCode == -1211)
		msg="Unknown IP address. IP white-listing enabled, please contact ENET support desk to map your IP address";
	else if(errorCode == '-5046' || errorCode == -5046) // this error comes when a migrated user intends to login in ENET - 24JUNE2025
	//Forgot password URL change
	{
		cbx_link = 'https://corporatebanking.hdfcbank.com/cbx/';
		msg = `<div style='width:80%;margin:1% auto;padding:0.1em;'>Dear User,<br><p>You are migrated to the bank's newly launched advanced Corporate Internet Banking portal, please click on the below link to access the application.</p><a href=${cbx_link} >https://corporatebanking.hdfcbank.com/cbx/</a><br>OR<br><p>Click on Wholesale Banking Tab ---> Click on Login Tab ---> Select "New Internet Banking for Corporates"</p><p>Post successful login, you will be prompted to change the password.</p></div>`;
	}
	else
	{
		if(errorString == "undefined" || errorString == undefined || errorString == null)
			msg= errorCode;
		else
			msg = errorCode+" - "+errorString;
	}
		if(!otlGetElem('otlScreen1'))
		{
			otlScreen1 = document.body.appendChild(document.createElement("div"));
			otlScreen1.style["width"] = "100%";
			otlScreen1.style["height"] = "100%"; 
			otlScreen1.style.backgroundColor= "#000";
			otlScreen1.style.top = "0px";
			if(otlBrowser == 0 || document.documentMode == 8 || otlBrowser == 2) //handled for safari 10Nov12
			otlScreen1.setAttribute('class','otlScreen');	
			else
			otlScreen1.setAttribute('className','otlScreen');
			otlScreen1.id = "otlScreen1";
			if(otlScreen1.offsetTop);
				otlScreen1.style.position = "absolute";
			otlScreen1.style.left = "0px";
			otlScreen1.style.filter="alpha(opacity=50)";
			otlScreen1.style["#filter"]="alpha(opacity=50)";
			otlScreen1.style["#-moz-opacity"]=".50";
			otlScreen1.style["opacity"] = ".50";
			try{otlScreen1.style["-ms-filter"] = "progid:DXImageTransform.Microsoft.Alpha(opacity=50)";} catch(e){}
			otlScreen1.style.zIndex = 99999;
			var otlRegTemp1 = document.body.appendChild(document.createElement("div"));
			otlRegTemp1.setAttribute('id', 'otlRegTemp1');
			otlRegTemp1.style.backgroundImage="url("+snklimage+")";	
			if(otlBrowser == 0 || document.documentMode == 8 || otlBrowser == 2) //handled for safari 10Nov12
			otlRegTemp1.setAttribute('class','otlDIV');
			else
			otlRegTemp1.setAttribute('className','otlDIV');
			otlRegTemp1.style.zIndex = 99999;
			otlRegTemp1.style.border = "solid 4px #132E79";
			var otlScreenFlag=0;
			var otlTblWidth="";
			var otlInnerTable="";
			var otlLeftPX="10";
			otlTblWidth=document.body.offsetWidth;		
			if(otlBrowser == 1 || otlBrowser == 2) //handled for safari 10Nov12
			{
				if(document.body.offsetWidth < 320)
				{
					otlScreenFlag=1;
					otlInnerTable=180;
					if(document.body.offsetWidth>180)
						otlLeftPX=(document.body.offsetWidth-180)/2;
				}
				else
					otlTblWidth=document.body.offsetWidth;		
			}
			else
			{
				if(window.innerWidth < 320)
				{
					otlScreenFlag=1;
					otlInnerTable=180;
					if(window.innerWidth>180)
						otlLeftPX=(window.innerWidth-180)/2;
				}	
				else otlTblWidth=window.innerWidth;
			}	
			if(otlScreenFlag==1)
			{
				otlRegTemp1.style["width"] = "195px";
				otlRegTemp1.style["height"] = "250px";
				otlRegTemp1.style["left"] = otlLeftPX+"px";
			}	
			else
			{		
				otlRegTemp1.style["width"] = "785px";
				otlRegTemp1.style["height"] = "145px";
				if(screen.width > 1204)
				otlRegTemp1.style["left"] = "200px";
			}	
			
			//otlRegTemp1.style["top"] = (screen.height/5)+"px";
			var page = document.body;
			otlRegTemp1.style["left"] = "21%";
			otlRegTemp1.style["top"] = "40%";
			otlRegTemp1.innerHTML="<br/><div width="+otlInnerTable+" align=center style='color:#132E79;background-color:transparent;border:0px solid black;margin:3% auto;color:#132E79;font:normal 14px helvetica;'><div style='color:#132E79;margin:1.5% auto;font-weight:600;'>Login Authentication</div><div style='color:#132E79;margin:1.5% auto;'>"+msg+"</div><div style='color:#132E79;margin:1.5% auto;'><input type=button name=cancel value='Close' style='width:auto;padding:5px 15px;background: #01337c;color: #FFFFFF;font:bold 16px arial;cursor:pointer;border-radius: 4px;text-align:center;' onclick='otlInfoClose("+errorCode+");'></div></div>";
			if(errorCode == '-5046' || errorCode == -5046)
			{
				otlGetElem('otlRegTemp1').style.height = 'auto';
				otlGetElem('otlRegTemp1').style.minHeight = '200px';
				otlGetElem('otlRegTemp1').style.top = '20%';
			}
	}
	else
	{
		otlGetElem('otlScreen1').style.display = "inline";
		otlGetElem('otlRegTemp1').style.display = "inline";
	}	
}
/*check the event and the corresponding value based constraints*/
function otlConfirmSign(formObj, submitFlag)
{
	var otlXmlFormData="";
	try{
		otlEventObj.value.length;
	}
	catch(e)
	{
		if((!otlEventFlag) && (submitFlag))
		{
			otlEventFlag = 1;
			otlParam[0] = formObj;
			otlParam[1] = submitFlag;
			/* handled for stopping the event trap for anchor tags, as the event flow need not be stopped for such types of events. Try the innerHTML attribute for future scenarios */
			if((otlEventObj.innerHTML.indexOf("<") != -1) || (!otlEventObj.innerHTML.length))
			{
				return false;
			}
		}
	}	
	// Below try to stop submit event for submit buttons.
	try{
		if(otlBrowser) { otlSubmitEvent.returnValue = false; }
		else { otlSubmitEvent.preventDefault(); }
	}catch(e){}				

	var formPos = 0;
	var index = 0;
	var otlSignFlag = 0;
	var event, eventString, formName;

	/*to find the occurrance of the form in the DOM*/
	for(var j=0; j<document.forms.length; j++)
	{
		if(formObj == document.forms[j])
		{
			formPos = j;
			break;
		}
	}

	/*to remove the custom hidden fields*/
	for(var k=1; k<5; k++)
	{
		try {
			if(k == 1) { document.forms[formPos].removeChild(document.getElementById('1_OTL_FORM_SIGNATURE')); }
			else { document.forms[formPos].removeChild(document.getElementById(k+"_OTL_FILE_SIGNATURE")); }
		}
		catch(e){ }
	}

	/*check the occurrance of the event. set otlSignFlag if the event occurred. we need to parse the whole _fo[] array unless no event is configured. if event is configured we may have another form with a different event. break the loop whenever a particular event occurs. the variant "index" carries the array index where the information should be retrieved*/
	for(var i=0; i<_fo.length; i++)
	{
		if((_fo[i] == formPos) || (formObj.name == _fo[i]) || (formObj.id == _fo[i]))
		{
			formName = _fo[i];	/*store the form name to be used for cases where no signature is required*/
			if(_event[i] != "")
			{
				eventString = _event[i].toString();
				event = eventString.split(':');
				switch(parseInt(event[0]))
				{
					case 1:
						{
							if((event[1] == otlEventObj.name) ||(event[1] == otlEventObj.id) ||(event[1] == otlEventObj.value) || (otlEventObj.hasOwnProperty('src') && otlEventObj.src.search(event[1]) != -1))
							{
								otlSignFlag = 1;
								index = i;
								break;
							}
						}
					case 2:
						{
							if(event[1] == otlEventObj.innerHTML || event[1] == 'Ok' || event[1] == 'Submit') // handled for hyperlink as well 06AUG2024
							{
								otlSignFlag = 1;
								index = i;
								break;
							}
						}
				}
				if(otlSignFlag) { break; } /*to break the loop if the event is identified*/
			}
			else { index = i; otlSignFlag = 1; break; }
		}
	}


	if(!otlSignFlag)
	{

		formObj.appendChild(otlAddField("1_OTL_FORM_SIGNATURE", formName+";-1:noevent;"));
		return otlProceedEvent(submitFlag, formPos);
	}

	for(var j=0;j<formObj.elements.length;j++)
	{
		if((formObj.elements[j].name!="") && (!formObj.elements[j].disabled) && (formObj.elements[j].type!="submit")&& (formObj.elements[j].type!="button") && (formObj.elements[j].type!="reset"))
		{
			if(formObj.name == 'forgetpwd')
			{
				otlXmlFormData+=formObj.elements[j].name+"="+encodeURIComponent(formObj.elements[j].value)+"&";
			}
			else
			{
				otlXmlFormData+=formObj.elements[j].name+"="+formObj.elements[j].value+"&";
			}
		}			
	}
	otlXmlFormData+="SNKLREQID=1&";
	//formObj.action
	var test=23;
	otlGlbSubmitSrc=otlPreserveSubmit[formPos];
//	document.forms[formPos].submit=otlGlbSubmitSrc;
	var otlXmlHttp=new XMLHttpRequest();
	otlXmlHttp.open("POST",formObj.action,true);
	otlXmlHttp.onreadystatechange=function(){
		if(otlXmlHttp.readyState==4 && otlXmlHttp.status==200)
		{
			var otlResponse=otlXmlHttp.responseText;
			otlShowAuthFactors(otlResponse, index, formPos, submitFlag, formObj);
		}
	};
	otlXmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	otlXmlHttp.send(otlXmlFormData);
}
var otlAuthType = "";
var otlDefaultAuth = false;
function otlShowAuthFactors(otlResponse, index, formPos, submitFlag, formObj)
{
	// otlResponse = '{"success":true, "signingTime":1554733159, "authFactors":["CERTSIG", "SOTP", "SMSOTP", "OTPCR"], "nonce":1554733159, "challenge":637281}';
	try 
	{
		otlResponse = JSON.parse(otlResponse);
	}
	catch(e)
	{
		renderPageResp(otlResponse);
		return;
	}
	if(otlResponse.hasOwnProperty('success') && !otlResponse.success && otlResponse.errorCode != -1507) 
	{
		otlShowErrorDiv(otlResponse.errorCode, otlResponse.errorString);
		return;
	}
	else if(otlResponse.hasOwnProperty('status') && otlResponse.status.toLowerCase() == 'failure')
	{
		otlShowErrorDiv(otlResponse.statusCode, otlResponse.data);
		return;
	}
	SnklSignTime = otlResponse.signingTime;
	SnklReqId = otlResponse.nonce;
	var AuthFactors = otlResponse.authFactors;
	otlEventFlag = 0; //29MAY2024 - 
	if(AuthFactors.indexOf("PASSUSR")!=-1)
	{
		// SnklReqId = otlResponse[1];
		return otlProceedEvent(submitFlag, formPos);
	}
	 // "cert","vasco","oathtime","oathevent","crdeviceotp,"mobileotp","smsotp"
	if(AuthFactors.length>1)
	{
		var authList = "";
		if(AuthFactors.indexOf("cert")!=-1)
			authList += "<input name='otlAuthType' type='radio' id='certUser' /><label style='padding-left:10px;' for='certUser'>Digital Certificate</label><br><br>";
		if(AuthFactors.indexOf("mobileotp")!=-1)
			authList += "<input name='otlAuthType' type='radio' id='mobileOtpUser' /><label style='padding-left:10px;' for='mobileOtpUser'>Mobile OTP</label><br><br>";
		if(AuthFactors.indexOf("deviceotp")!=-1 || AuthFactors.indexOf("crdeviceotp")!=-1)
			authList += "<input name='otlAuthType' type='radio' id='deviceOtpUser' /><label style='padding-left:10px;' for='deviceOtpUser'>Hard token OTP</label><br><br>";
		if(AuthFactors.indexOf("smsotp")!=-1)
			authList += "<input name='otlAuthType' type='radio' id='smsOtpUser' /><label style='padding-left:10px;' for='deviceOtpUser'>SMS OTP</label><br>";
		var dullDiv = document.body.appendChild(document.createElement("div"));
		var height = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight); 
		dullDiv.style.cssText = "position:absolute;position:fixed;top:0px;left:0px;width:"+(screen.width-10)+"px;height:"+height+"px;background-color:#000;filter:alpha(opacity=50);opacity:0.5;-ms-filter:progid:DXImageTransform.Microsoft.Alpha(opacity=50);z-index:99999;";
		dullDiv.className = 'otlScreen';	
		var authFactorDiv = document.body.appendChild(document.createElement("div"));
		authFactorDiv.style.cssText = "position:absolute;position:fixed;top:"+(((document.body.clientHeight||document.documentElement.clientHeight) - 250) / 2 + document.body.scrollTop)+"px;height:auto;width:520px;left:"+Math.round((screen.width - 420)/2)+"px;padding:10px;border-radius:5px;text-align:center;z-index:99999;background-image:url("+snklimage+")";
		
		authFactorDiv.innerHTML = "<div style='width:100%;' class='tdNumR'><b>Login Authentication</b></div><br><br><div style='width:90%;left:5%;text-align:center;'>Authenticate me using<br><br><div style='width:85%;left:10%;text-align:left;' id='otlAuthFactors'>"+authList+"<br><br></div><div style='width:100%;text-align:center;'><input type='checkbox' id='defaultAuth' />&nbsp;&nbsp;Set this as my default authentication<br><br></div><div style='width:100%;text-align:center;'><input type='button' value='Login' class='otlButton' id='otlChooseAuthType' /></div></div>";
		
		if(otlResponse.defaultAuthFactor && otlResponse.defaultAuthFactor == 'cert' && AuthFactors.indexOf("cert")!=-1)
			otlGetElem("certUser").checked = true;
		if(otlResponse.defaultAuthFactor && otlResponse.defaultAuthFactor == 'mobileotp' && AuthFactors.indexOf("mobileotp")!=-1)
			otlGetElem("mobileOtpUser").checked = true;
		if(otlResponse.defaultAuthFactor && ((otlResponse.defaultAuthFactor == 'deviceotp' && AuthFactors.indexOf("deviceotp")!=-1) || (otlResponse.defaultAuthFactor == 'crdeviceotp' && AuthFactors.indexOf("crdeviceotp")!=-1)))
			otlGetElem("deviceOtpUser").checked = true;
		if(otlResponse.defaultAuthFactor && otlResponse.defaultAuthFactor == 'smsotp' && AuthFactors.indexOf("smsotp")!=-1)
			otlGetElem("smsOtpUser").checked = true;
		if(otlResponse.authType == "cert") 
			otlGetElem("certUser").checked = true;
		else if(otlResponse.authType == "deviceotp" || otlResponse.authType == "crdeviceotp") 
			otlGetElem("deviceOtpUser").checked = true;
		else if(otlResponse.authType == "mobileotp") 
			otlGetElem("mobileOtpUser").checked = true;
		else if(otlResponse.authType == "smsotp") 
			otlGetElem("smsOtpUser").checked = true;
		
		otlGetElem("otlChooseAuthType").onclick = function()
		{
			if(tfaEnabled)
				otlAuthType1 = "";
			else 
				otlAuthType = "";
			otlDefaultAuth = otlGetElem("defaultAuth").checked;
			//if((otlGetElem("smsOtpUser") && otlGetElem("smsOtpUser").checked) || (otlGetElem("deviceOtpUser") && otlGetElem("deviceOtpUser").checked && AuthFactors.indexOf("deviceotp")!=-1 && !otlResponse.challenge))
			if((otlGetElem("smsOtpUser") && otlGetElem("smsOtpUser").checked) || (otlGetElem("deviceOtpUser") && otlGetElem("deviceOtpUser").checked && AuthFactors.indexOf("deviceotp")!=-1))
			{
				if(tfaEnabled)
					otlAuthType1 = (otlGetElem("smsOtpUser") && otlGetElem("smsOtpUser").checked)?"smsotp" : "deviceotp";
				else 
					otlAuthType = (otlGetElem("smsOtpUser") && otlGetElem("smsOtpUser").checked)?"smsotp" : "deviceotp";
				popuptype = 1;
				otlShowPopup(index, formPos, submitFlag,"1"); //otlResponse.otpMode - challenge or OTP
			}
			else if((otlGetElem("deviceOtpUser") && otlGetElem("deviceOtpUser").checked && AuthFactors.indexOf("crdeviceotp")!=-1) || (otlGetElem("mobileOtpUser") && otlGetElem("mobileOtpUser").checked)){
				if(otlGetElem("mobileOtpUser") && otlGetElem("mobileOtpUser").checked)
				{
					if(tfaEnabled)
						otlAuthType1 = "mobileotp";
					else 
						otlAuthType = "mobileotp";
				}
				else
					otlAuthType = "crdeviceotp";
				popuptype = 2;
				CrData = otlResponse.challenge;
				var respFlag = "3";
				if(otlGetElem("mobileOtpUser") && otlGetElem("mobileOtpUser").checked)
				{
					/*if( CrData != '' )
						respFlag = "4";
					else respFlag = "5";*/
					respFlag = "5";
				}
				otlShowPopup(index, formPos, submitFlag,respFlag);
			}
			else if(otlGetElem("certUser") && otlGetElem("certUser").checked)
			{
				if(tfaEnabled)
					otlAuthType1 = "cert";
				else 
					otlAuthType = "cert";
				var cdialog = document.createElement('script');
				cdialog.setAttribute('type','text/javascript');
				cdialog.setAttribute('src','/snkl_otl/CertDialog.js');
				if(typeof cdialog.onreadystatechange!='object')
				{
					cdialog.onload=function()
					{
						otlCheckSigningControl(function()
						{
							otlSignNSubmitFinal(index, otlResponse.tbs, submitFlag, formPos);
						});
					};
				}
				else
				{
					cdialog.onreadystatechange=function()
					{
						if(cdialog.readyState=='loaded' || cdialog.readyState=='complete')
						{
							otlCheckSigningControl(function()
							{
								otlSignNSubmitFinal(index, otlResponse.tbs, submitFlag, formPos);
							});
						}
					}
				}
				document.body.appendChild(cdialog);
			}
			else
			{ 
				alert("Please choose an authentication factor");
				return false;
			}
			if(authFactorDiv) document.body.removeChild(authFactorDiv);
			if(dullDiv) document.body.removeChild(dullDiv);
		}
	}
	else
	{
		if((AuthFactors.indexOf("deviceotp")!=-1) || (AuthFactors.indexOf("smsotp")!=-1))
		{
			if(tfaEnabled)
				otlAuthType1 = (AuthFactors.indexOf("smsotp")!=-1)?"smsotp" : "deviceotp";
			else otlAuthType = (AuthFactors.indexOf("smsotp")!=-1)?"smsotp" : "deviceotp";
			popuptype = 1;
			// otlShowPopup(index, formPos, submitFlag,otlResponse[5]);
			otlShowPopup(index, formPos, submitFlag,"1"); //otlResponse.otpMode - challenge or OTP
		}
		else if((AuthFactors.indexOf("crdeviceotp")!=-1) || (AuthFactors.indexOf("mobileotp")!=-1))
		{
			if(tfaEnabled)
				otlAuthType1 = (AuthFactors.indexOf("mobileotp")!=-1)?"mobileotp" : "crdeviceotp";
			else otlAuthType = (AuthFactors.indexOf("mobileotp")!=-1)?"mobileotp" : "crdeviceotp";
			popuptype = 2;
			CrData = otlResponse.challenge;
			var respFlag = "3";
			if(AuthFactors.indexOf("mobileotp")!=-1)
			{
				/*if(CrData!='' && CrData!=undefined&&CrData!='undefined')
					respFlag = "4";
				else respFlag = "5";*/
				respFlag = "5";
			}
			otlEventFlag = 0;
			otlShowPopup(index, formPos, submitFlag,respFlag);
		}
		else if(AuthFactors.indexOf("OTPSIG")!=-1)
		{
			popuptype = 3;
		}
		else if(AuthFactors.indexOf("cert")!=-1)
		{
			if(tfaEnabled)
				otlAuthType1 = "cert";
			else otlAuthType = "cert";
			var cdialog = document.createElement('script');
			cdialog.setAttribute('type','text/javascript');
			cdialog.setAttribute('src','/snkl_otl/CertDialog.js');
			if(typeof cdialog.onreadystatechange!='object')
			{
				cdialog.onload=function(){
					otlCheckSigningControl(function(){
						otlSignNSubmitFinal(index, otlResponse.tbs, submitFlag, formPos);
					});
				};
			}
			else
			{
				cdialog.onreadystatechange=function(){
					if(cdialog.readyState=='loaded' || cdialog.readyState=='complete')
					{
						otlCheckSigningControl(function(){
							otlSignNSubmitFinal(index, otlResponse.tbs, submitFlag, formPos);
						});
					}
				}
			}
			document.body.appendChild(cdialog);
		}
		else otlProceedEvent(submitFlag, formPos);
	}
}
var otlAuthValue,otlAuthValue1 = "";
function otlVerifySignature(data,signature, cb)
{
	var otlXmlHttp=new XMLHttpRequest();
	otlXmlHttp.open("POST","/snkl_otl/verifySignature.html",true);
	otlXmlHttp.onreadystatechange=function()
	{
		if(otlXmlHttp.readyState==4 && otlXmlHttp.status==200)
		{
			try
			{
				var resp=JSON.parse(otlXmlHttp.responseText);
				if(tfaEnabled) otlAuthValue1 = signature;
				else otlAuthValue = signature;
				cb(resp);
			}
			catch(e){document.write(otlXmlHttp.responseText);}
		}
	};
	otlXmlHttp.setRequestHeader("Content-type","application/json");
	otlXmlHttp.send(JSON.stringify({"request":"verifySignature","data":data,"signature":signature,"authFactor":"cert"}));
}
function otlCheckSigningControl(cb)
{
	var snorkletjs;
	snorkletjs = document.createElement('script');
	snorkletjs.setAttribute('type','text/javascript');
	snorkletjs.setAttribute('src','/snkl_otl/Snorklet.js');
	if(typeof snorkletjs.onreadystatechange !='object')
	{
		snorkletjs.onload=function()
		{
			var signer=new SnorkletHost('','',0,disablenewcontrolinstall);
			signer.signingEnabled(function(controlstatus)
			{
				if(controlstatus==true) cb(true);
				else{alert("Signing Control not Installed.Please Install Signing Control to Proceed");otlStopEvent();}
			});
		};
	}
	else
	{
		snorkletjs.onreadystatechange=function(){
			if(snorkletjs.readyState=='loaded' || snorkletjs.readyState=='complete')
			{
				var signer=new SnorkletHost('','',0,disablenewcontrolinstall);
				signer.signingEnabled(function(controlstatus){
				if(controlstatus==true)
				{
					cb(true);
				}
				else{alert("Signing Control not Installed.Please Install Signing Control to Proceed");otlStopEvent();}});
			}
		}
	}
	document.body.appendChild(snorkletjs);
}
var otlAlertFlag=0;
var tfaEnabled = false;
function otlSignNSubmitFinal(index, data, submitFlag, formPos)
{
	var signer=new SnorkletHost('','',0,disablenewcontrolinstall);
	signer.signingEnabled(function(controlstatus)
	{
		if(controlstatus==true)
		{
			signer.signData(data,'sha1',true,false,SnklSignTime,function(p7Sig)
			{
				if(p7Sig && !p7Sig.error)
				{
					otlVerifySignature(data,p7Sig.signature, function(resp)
					{
						if(resp.success) otlProceedEvent(submitFlag, formPos);
						else
						{
							if(resp.hasOwnProperty('errorCode') && resp.errorCode == -1507)
							{
								tfaEnabled = true;
								otlShowAuthFactors(JSON.stringify(resp), index, formPos, submitFlag);
							}
							else
							{
								if(resp.hasOwnProperty('statusCode') && resp.hasOwnProperty('data'))
								{
									alert(resp.statusCode+" - "+resp.data);
									return;
								}
								else
								{
									if(resp.hasOwnProperty('errorReason'))
									{
										if(resp.errorReason.toLowerCase() == 'invalid certificate')
											alert("Selected certificate is not registered");
										else alert(resp.errorCode+" - "+resp.errorReason);
										return;
									}
								}
								return otlStopEvent();
							}
						}
					});
				}
				else if(p7Sig)
				{
					alert(p7Sig.reason);
					return otlStopEvent();
				}
			});
		}
		else alert("Signing Control not Installed");otlStopEvent();
	});
}
/*function to collect all the values and give it to the proper sign function*/
var otlFileSign = 0;  // newly added for Chain pages..Added on 14 Nov 2008
var otlStopFlag=""; //MOD
var otlScreen="";
var opIE = 50;
var opMoz = .50;
/*function to sign using IE signing control*/
function otlShowPopup(index, formPos, submitFlag,otlResp,otlGlbSubmitSrc)
{
	otlEventFlag = 0;//29MAY2024 - added to stop sending internal request upon clicking the close button.
	//alert("comes in")
	if(!otlGetElem('otlScreen'))
	{
		otlScreen = document.body.appendChild(document.createElement("div"));
		otlScreen.style["width"] = "100%";
		//otlScreen.style["height"] = (screen.height-150)+"px";
		otlScreen.style["height"] = "100%"; //changed
		otlScreen.style.backgroundColor= "#000";
		otlScreen.style.top = "0px";
		otlScreen.style.left = "0px";
		otlScreen.style.filter="alpha(opacity=50)";
		otlScreen.style["#filter"]="alpha(opacity=50)";
		otlScreen.style["#-moz-opacity"]=".50";
		otlScreen.style["opacity"] = ".50";
		try{otlScreen.style["-ms-filter"] = "progid:DXImageTransform.Microsoft.Alpha(opacity=50)";} catch(e){}
		otlScreen.style.zIndex = 99999;
		otlScreen.setAttribute('id', 'otlScreen');
		if(otlBrowser == 0 || document.documentMode == 8 || otlBrowser == 2) //handled for safari 10Nov12
		otlScreen.setAttribute('class','otlScreen');	
		else
		otlScreen.setAttribute('className','otlScreen');
		var otlRegTemp = document.body.appendChild(document.createElement("div"));
		otlRegTemp.setAttribute('id', 'otlRegTemp');
		otlRegTemp.style.backgroundImage="url("+snklimage+")";	
		
		if(otlBrowser == 0 || document.documentMode == 8 || otlBrowser == 2) //handled for safari 10Nov12
			otlRegTemp.setAttribute('class','otlDIV');
		else
			otlRegTemp.setAttribute('className','otlDIV');
		otlRegTemp.style.top = "0px";
		if(otlRegTemp.offsetTop);
			otlRegTemp.style.position = "absolute";
		otlRegTemp.style.zIndex = 99999;
		otlRegTemp.style.border = "solid 4px #132E79";
		var otlScreenFlag=0;
		var otlTblWidth="";
		var otlInnerTable="";
		var otlLeftPX="10";
		otlTblWidth=document.body.offsetWidth;		
		if(otlBrowser == 1 || otlBrowser == 2) //handled for safari 10Nov12
		{
			if(document.body.offsetWidth < 320)
			{
				otlScreenFlag=1;
				otlInnerTable=180;
				if(document.body.offsetWidth>180)
					otlLeftPX=(document.body.offsetWidth-180)/2+"px";
					
			}
			else
				otlTblWidth=document.body.offsetWidth;	
		}
		else
		{
			if(window.innerWidth < 320)
			{
				otlScreenFlag=1;
				otlInnerTable=180;
				if(window.innerWidth>180)
					otlLeftPX=(window.innerWidth-180)/2+"px";
			}	
			else
			otlTblWidth=window.innerWidth;
		}	
			if(otlScreenFlag==1)
			{
				otlRegTemp.style["width"] = "195px";
				otlRegTemp.style["height"] = "250px";
				otlRegTemp.style["left"] = otlLeftPX+"px";
			}	
			else
			{		
				otlRegTemp.style["width"] = "675px";
				otlRegTemp.style["min-height"] = "250px";
				otlRegTemp.style["height"] = "auto";
				otlRegTemp.style["max-height"] = "300px";
				if(screen.width > 1204)
				otlRegTemp.style["left"] = (document.body.offsetWidth-675)/2+"px"; //8FEB2013
			}	
		
		//otlRegTemp.style["top"] = (screen.height/5)+"px";
		var page = document.body;	
		otlRegTemp.style.top = ((page.clientHeight||document.documentElement.clientHeight) - 275) / 2 + page.scrollTop+"px";
		//8Feb2013 : OTP prompt - removed the background and border appearing in HDFC - Enet. Changed alignment.
		var otlTemp="";
		if(popuptype == 1)
		{
			var steps = "";
				otlRegTemp.innerHTML="<br><div style='width:90%;margin:7% auto 2%;color:#132E79;background-color:transparent;border:0px solid black;text-align:left;font-size:14px'><div style='color:#132E79;margin:1.5% auto;'>To generate a OTP,</div><div style='margin:1.5% 5%;'>1. Input your PIN in the OTP device.</div><div style='margin:1.5% 5%;line-height:1.5;'>2. Press 1 to get a 6 digit OTP code. This is valid for 30 seconds.</div></div></div>";
				otlTemp = "<div id='otlRegDet' style='height:30px;width:"+otlRegTemp.style["width"]+";background-color:transparent;border:0px solid black;font-size:14px;text-align:center;'><b>Enter OTP</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class='otlText' style='border:solid 1px #326EA4;padding:0.4em 0.2em;border-radius:5px;outline:0;' type=text name=otpCode id=otpCode maxlength=6 onfocus='otlGetElem(\"otlErrStr\").innerHTML=\"\";'></div>";
				if(otlResp=="2")
				{
					otlRegTemp.style.height = "300px";
					otlTemp += "<div style='margin-top:1%;width:"+otlRegTemp.style["width"]+";background-color:transparent;border:0px solid black;font-size:14px;'><b>Enter OTP 2</b>&nbsp;&nbsp;&nbsp;<input class='otlText' type=text name=otpCode2 id=otpCode2 maxlength=6 style='border:solid 1px #326EA4;padding:0.4em 0.2em;border-radius:5px;outline:0;' onfocus='otlGetElem(\"otlErrStr\").innerHTML=\"\";'></div>";
				}
		}
		else
		{
			var tempHtm = (CrData && otlResp!=5)?"<tr><td class='tdNumR' colspan=2 style='color:#132E79;font-weight:bold;text-align:center;' ><br>The Challenge is: "+CrData+"<br><br></td></tr>" : "";
			var steps;
			/*if(otlResp=="4")
			{
				steps = "<td width='10%'></td><td class='tdNum' style='text-align:left;'>Step 1: Login to 'HDFC SnorkelOTP' mobile application</td></tr><tr><td width='10%'></td><td class='tdNum' style='text-align:left;'>Step 2: Select 'Challenge Response OTP' mode</td></tr><tr><td width='10%'></td><td class='tdNum' style='text-align:left;'>Step 3: Enter the challenge displayed above in your mobile application</td></tr><tr><td class='tdNum' colspan=2>The number displayed in your mobile application is your dynamic password</td>";
			}
			else */
			if(otlResp=="5") 
			{
				steps = "<div style='margin:1% 5%;'>1. Login to your HDFC Snorkel OTP mobile app.</div><div style='margin:1% 5%;line-height:1.5;'>2. A 6 digit OTP code will be displayed. This is valid for 30 seconds.</div>";
					
				otlRegTemp.innerHTML="<div style='width:90%;margin:7% auto 2%;color:#132E79;background-color:transparent;border:0px solid black;font-size:14px;text-align:left;'><div style='color:#132E79;margin:1.5% auto%;'>"+tempHtm+"</div><div style='color:#132E79;margin:1.5% auto;'>To generate a OTP,</div>"+steps+"</div>";
			}
			else 
			{
				steps = "<div style='margin:1% 5%;'>1. Input your PIN in the OTP device. </div><div style='margin:1% 5%;line-height:1.7;'>2. Press 2 and enter the challenge displayed above in your device.</div><div style='margin:1% 5%;line-height:1.5;'>3. A 6 digit OTP code will be displayed. This is valid for 30 seconds.</div>";
				
				otlRegTemp.innerHTML="<div style='width:90%;margin:7% auto 2%;color:#132E79;background-color:transparent;border:0px solid black;font-size:14px;text-align:left;'><div style='color:#132E79;margin:1.5% auto%;'>"+tempHtm+"</div><div style='color:#132E79;margin:1.5% auto;'>To generate a OTP,</div>"+steps+"</div>";
			}
			otlTemp = "<form name='otpForm' id='otpForm' autocomplete='off'><div id='otlRegDet' style='width:"+otlRegTemp.style["width"]+";background-color:transparent;border:0px solid black;'><div style='color:#132E79;font-size:14px;text-align:center;' ><b>Enter OTP</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class='otlText' type=text autocomplete='off' name=otpCode id=otpCode maxlength=6 style='border:solid 1px #326EA4;padding:0.4em 0.2em;border-radius:5px;outline:0;' onfocus='otlGetElem(\"otlErrStr\").innerHTML=\"\";'></div></form>";
		}
		otlTemp += "<div id='otlErrStr' style='color:red;text-align:center;font-size:13px;margin-left:15%;'></div><div style='margin:3% auto;text-align:center;'><input type=button name=register id=register value='Submit' class='otlButton' onclick='otlVerifyNo("+submitFlag+","+formPos+","+index+",\""+otlResp+"\");' style='padding:5px 15px;background:#01337c;color:#FFFFFF;font:bold 16px arial;cursor:pointer;border-radius: 4px;text-align:center;width:auto;border:none;outline:0;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type=button name=cancel value='Close ' class='otlButton'  style='padding:5px 15px;background: #01337c;color: #FFFFFF;font:bold 16px arial;cursor:pointer;border-radius: 4px;text-align:center;width:auto;border:none;outline:0;' onclick='otlClose();'></div></div>";
	
		otlRegTemp.innerHTML+=otlTemp;
	}
	else
	{
		otlGetElem('otlScreen').style.display = "inline";
		otlGetElem('otlRegTemp').style.display = "inline";
	}	
	otlGetElem("otpCode").focus();
							
}
function otlClose()
{
	otlGetElem("otpCode").value="";		
	otlGetElem("otlErrStr").innerHTML="";
	otlGetElem('otlScreen').style.display = "none";
	otlGetElem('otlRegTemp').style.display = "none";
	// This below condition is specific to LVB application to close the child window when click "Close" button in password popup
	try{loginWindow.close();}catch(e){}
		// This below condition is specific to Sharjah Islamic Bank application to enable the submit button
	try{document.getElementById('onsubmit').disabled=false;
	//	window.location.href=otl_SharjLocation;
		}catch(e){}

	var otlBaseLocation=""; 
	if(window.location.href.indexOf("?cred") != -1)
		otlBaseLocation = window.location.href.split("?")[0];
	else otlBaseLocation = window.location.href;

	window.location.href=otlBaseLocation;
	
}
(function(){
var b;b||(b=typeof OTLFUN !== 'undefined' ? OTLFUN : {});var q={},r;for(r in b)b.hasOwnProperty(r)&&(q[r]=b[r]);var u="object"===typeof window,x="function"===typeof importScripts,y="object"===typeof process&&"object"===typeof process.versions&&"string"===typeof process.versions.node,z="",A,B,C,D,E;
if(y)z=x?require("path").dirname(z)+"/":__dirname+"/",A=function(a,c){var d=F(a);if(d)return c?d:d.toString();D||(D=require("fs"));E||(E=require("path"));a=E.normalize(a);return D.readFileSync(a,c?null:"utf8")},C=function(a){a=A(a,!0);a.buffer||(a=new Uint8Array(a));assert(a.buffer);return a},B=function(a,c,d){var f=F(a);f&&c(f);D||(D=require("fs"));E||(E=require("path"));a=E.normalize(a);D.readFile(a,function(e,k){e?d(e):c(k.buffer)})},1<process.argv.length&&process.argv[1].replace(/\\/g,"/"),process.argv.slice(2),
"undefined"!==typeof module&&(module.exports=b),process.on("uncaughtException",function(a){throw a;}),process.on("unhandledRejection",G),b.inspect=function(){return"[Emscripten Module object]"};else if(u||x)x?z=self.location.href:"undefined"!==typeof document&&document.currentScript&&(z=document.currentScript.src),z=0!==z.indexOf("blob:")?z.substr(0,z.lastIndexOf("/")+1):"",A=function(a){try{var c=new XMLHttpRequest;c.open("GET",a,!1);c.send(null);return c.responseText}catch(e){if(a=F(a)){c=[];for(var d=
0;d<a.length;d++){var f=a[d];255<f&&(aa&&assert(!1,"Character code "+f+" ("+String.fromCharCode(f)+")  at offset "+d+" not in 0x00-0xFF."),f&=255);c.push(String.fromCharCode(f))}return c.join("")}throw e;}},x&&(C=function(a){try{var c=new XMLHttpRequest;c.open("GET",a,!1);c.responseType="arraybuffer";c.send(null);return new Uint8Array(c.response)}catch(d){if(a=F(a))return a;throw d;}}),B=function(a,c,d){var f=new XMLHttpRequest;f.open("GET",a,!0);f.responseType="arraybuffer";f.onload=function(){if(200==
f.status||0==f.status&&f.response)c(f.response);else{var e=F(a);e?c(e.buffer):d()}};f.onerror=d;f.send(null)};b.print||console.log.bind(console);var H=b.printErr||console.warn.bind(console);for(r in q)q.hasOwnProperty(r)&&(b[r]=q[r]);q=null;var I;b.wasmBinary&&(I=b.wasmBinary);var noExitRuntime=b.noExitRuntime||!0;"object"!==typeof WebAssembly&&G("no native wasm support detected");var J,K=!1;function assert(a,c){a||G("Assertion failed: "+c)}
function L(a){var c=b["_"+a];assert(c,"Cannot call unknown function "+a+", make sure it is exported");return c}
function ba(a,c,d,f){var e={string:function(g){var p=0;if(null!==g&&void 0!==g&&0!==g){var n=(g.length<<2)+1;p=M(n);var l=p,h=N;if(0<n){n=l+n-1;for(var v=0;v<g.length;++v){var m=g.charCodeAt(v);if(55296<=m&&57343>=m){var ka=g.charCodeAt(++v);m=65536+((m&1023)<<10)|ka&1023}if(127>=m){if(l>=n)break;h[l++]=m}else{if(2047>=m){if(l+1>=n)break;h[l++]=192|m>>6}else{if(65535>=m){if(l+2>=n)break;h[l++]=224|m>>12}else{if(l+3>=n)break;h[l++]=240|m>>18;h[l++]=128|m>>12&63}h[l++]=128|m>>6&63}h[l++]=128|m&63}}h[l]=
0}}return p},array:function(g){var p=M(g.length);O.set(g,p);return p}};a=L(a);var k=[],w=0;if(f)for(var t=0;t<f.length;t++){var Y=e[d[t]];Y?(0===w&&(w=P()),k[t]=Y(f[t])):k[t]=f[t]}d=a.apply(null,k);return d=function(g){0!==w&&ca(w);if("string"===c)if(g){for(var p=N,n=g+NaN,l=g;p[l]&&!(l>=n);)++l;if(16<l-g&&p.subarray&&da)g=da.decode(p.subarray(g,l));else{for(n="";g<l;){var h=p[g++];if(h&128){var v=p[g++]&63;if(192==(h&224))n+=String.fromCharCode((h&31)<<6|v);else{var m=p[g++]&63;h=224==(h&240)?(h&
15)<<12|v<<6|m:(h&7)<<18|v<<12|m<<6|p[g++]&63;65536>h?n+=String.fromCharCode(h):(h-=65536,n+=String.fromCharCode(55296|h>>10,56320|h&1023))}}else n+=String.fromCharCode(h)}g=n}}else g="";else g="boolean"===c?!!g:g;return g}(d)}var da="undefined"!==typeof TextDecoder?new TextDecoder("utf8"):void 0,O,N,Q,ea=[],fa=[],ha=[];function ia(){var a=b.preRun.shift();ea.unshift(a)}var R=0,S=null,T=null;b.preloadedImages={};b.preloadedAudios={};
function G(a){if(b.onAbort)b.onAbort(a);H(a);K=!0;throw new WebAssembly.RuntimeError("abort("+a+"). Build with -s ASSERTIONS=1 for more info.");}var U="data:application/octet-stream;base64,",V;V="data:application/octet-stream;base64,AGFzbQEAAAABEQRgAX8Bf2AAAGABfwBgAAF/AwYFAQACAwAEBQFwAQEBBQYBAYACgAIGCQF/AUGQiMACCwcdBwFhAgABYgAAAWMABAFkAAMBZQACAWYAAQFnAQAKLAUDAAELEAAjACAAa0FwcSIAJAAgAAsGACAAJAALBAAjAAsJACAAQaibGHML";if(!V.startsWith(U)){var ja=V;V=b.locateFile?b.locateFile(ja,z):z+ja}function la(){var a=V;try{if(a==V&&I)return new Uint8Array(I);var c=F(a);if(c)return c;if(C)return C(a);throw"both async and sync fetching of the wasm failed";}catch(d){G(d)}}
function ma(){if(!I&&(u||x)){if("function"===typeof fetch&&!V.startsWith("file://"))return fetch(V,{credentials:"same-origin"}).then(function(a){if(!a.ok)throw"failed to load wasm binary file at '"+V+"'";return a.arrayBuffer()}).catch(function(){return la()});if(B)return new Promise(function(a,c){B(V,function(d){a(new Uint8Array(d))},c)})}return Promise.resolve().then(function(){return la()})}
function W(a){for(;0<a.length;){var c=a.shift();if("function"==typeof c)c(b);else{var d=c.i;"number"===typeof d?void 0===c.h?Q.get(d)():Q.get(d)(c.h):d(void 0===c.h?null:c.h)}}}
var aa=!1,na="function"===typeof atob?atob:function(a){var c="",d=0;a=a.replace(/[^A-Za-z0-9\+\/=]/g,"");do{var f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(d++));var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(d++));var k="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(d++));var w="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(d++));f=f<<
2|e>>4;e=(e&15)<<4|k>>2;var t=(k&3)<<6|w;c+=String.fromCharCode(f);64!==k&&(c+=String.fromCharCode(e));64!==w&&(c+=String.fromCharCode(t))}while(d<a.length);return c};
function F(a){if(a.startsWith(U)){a=a.slice(U.length);if("boolean"===typeof y&&y){var c=Buffer.from(a,"base64");c=new Uint8Array(c.buffer,c.byteOffset,c.byteLength)}else try{var d=na(a),f=new Uint8Array(d.length);for(a=0;a<d.length;++a)f[a]=d.charCodeAt(a);c=f}catch(e){throw Error("Converting base64 string to bytes failed.");}return c}}var oa={};
(function(){function a(e){b.asm=e.exports;J=b.asm.a;e=J.buffer;b.HEAP8=O=new Int8Array(e);b.HEAP16=new Int16Array(e);b.HEAP32=new Int32Array(e);b.HEAPU8=N=new Uint8Array(e);b.HEAPU16=new Uint16Array(e);b.HEAPU32=new Uint32Array(e);b.HEAPF32=new Float32Array(e);b.HEAPF64=new Float64Array(e);Q=b.asm.g;fa.unshift(b.asm.b);R--;b.monitorRunDependencies&&b.monitorRunDependencies(R);0==R&&(null!==S&&(clearInterval(S),S=null),T&&(e=T,T=null,e()))}function c(e){a(e.instance)}function d(e){return ma().then(function(k){return WebAssembly.instantiate(k,
f)}).then(function(k){return k}).then(e,function(k){H("failed to asynchronously prepare wasm: "+k);G(k)})}var f={a:oa};R++;b.monitorRunDependencies&&b.monitorRunDependencies(R);if(b.instantiateWasm)try{return b.instantiateWasm(f,a)}catch(e){return H("Module.instantiateWasm callback failed with error: "+e),!1}(function(){return I||"function"!==typeof WebAssembly.instantiateStreaming||V.startsWith(U)||V.startsWith("file://")||"function"!==typeof fetch?d(c):fetch(V,{credentials:"same-origin"}).then(function(e){return WebAssembly.instantiateStreaming(e,
f).then(c,function(k){H("wasm streaming compile failed: "+k);H("falling back to ArrayBuffer instantiation");return d(c)})})})();return{}})();b.___wasm_call_ctors=function(){return(b.___wasm_call_ctors=b.asm.b).apply(null,arguments)};b._cm_fun=function(){return(b._cm_fun=b.asm.c).apply(null,arguments)};
var P=b.stackSave=function(){return(P=b.stackSave=b.asm.d).apply(null,arguments)},ca=b.stackRestore=function(){return(ca=b.stackRestore=b.asm.e).apply(null,arguments)},M=b.stackAlloc=function(){return(M=b.stackAlloc=b.asm.f).apply(null,arguments)};b.cwrap=function(a,c,d,f){d=d||[];var e=d.every(function(k){return"number"===k});return"string"!==c&&e&&!f?L(a):function(){return ba(a,c,d,arguments)}};var X;T=function pa(){X||Z();X||(T=pa)};
function Z(){function a(){if(!X&&(X=!0,b.calledRun=!0,!K)){W(fa);if(b.onRuntimeInitialized)b.onRuntimeInitialized();if(b.postRun)for("function"==typeof b.postRun&&(b.postRun=[b.postRun]);b.postRun.length;){var c=b.postRun.shift();ha.unshift(c)}W(ha)}}if(!(0<R)){if(b.preRun)for("function"==typeof b.preRun&&(b.preRun=[b.preRun]);b.preRun.length;)ia();W(ea);0<R||(b.setStatus?(b.setStatus("Running..."),setTimeout(function(){setTimeout(function(){b.setStatus("")},1);a()},1)):a())}}b.run=Z;
if(b.preInit)for("function"==typeof b.preInit&&(b.preInit=[b.preInit]);0<b.preInit.length;)b.preInit.pop()();Z();

OTLFUN = b;
_otlFun1 = OTLFUN.cwrap('cm_fun', 'number', ['number']);

WASMLOADED = false;
OTLFUN['onRuntimeInitialized'] = function() {
   console.log("WASM Loaded");
   WASMLOADED = true;
};

})();

function otlFun1(num)
{
	return _otlFun1(num);
}
function otlVerifyNo(submitFlag,formPos,index,otlResp)
{
	if(otlGetElem("register")) otlGetElem("register").disabled = true;
	var err;
	var test;
	var xmlhttp;
	var otlSendData="";
	try {
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	}
	catch(e) {
		try {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		catch(i) {
			xmlhttp = (typeof(XMLHttpRequest) != undefined) ? new XMLHttpRequest() : false;
		}
	}
	if(xmlhttp)
	{
		var details = navigator.userAgent; 
		var regexp = /android|iphone|kindle|ipad|Mobile/i; 
		var isMobileDevice = regexp.test(details); 
		  
		if (isMobileDevice) { 
			//console.log("You are using a Mobile Device"); 
			if(tfaEnabled) otlAuthValue1 = otlGetElem("otpCode").value;
			else otlAuthValue = otlGetElem("otpCode").value;
			otlProceedEvent(submitFlag, formPos);
		} else { 
			//console.log("You are using Desktop"); 
			xmlhttp.open("POST","/snkl_otl/1405.htm",false);

			if(tfaEnabled) otlAuthValue1 = otlFun1(Number(otlGetElem("otpCode").value));
			else otlAuthValue = otlFun1(Number(otlGetElem("otpCode").value));
			//var nonce = otlFun1(Number(otlGetElem("otpCode").value));
			if(otlResp=="2")
			{
				if(tfaEnabled)
					otlSendData="encAuthValue="+otlAuthValue1+"&OTPCodeNext="+otlGetElem("otpCode2").value+"&SnklReqId="+SnklReqId+"&authFactor="+otlAuthType1;
				else
					otlSendData="encAuthValue="+otlAuthValue+"&OTPCodeNext="+otlGetElem("otpCode2").value+"&SnklReqId="+SnklReqId+"&authFactor="+otlAuthType1;
			}
			else
			{
				if(tfaEnabled)
					otlSendData="encAuthValue="+otlAuthValue1+"&SnklReqId="+SnklReqId+"&authFactor="+otlAuthType1;
				else otlSendData="encAuthValue="+otlAuthValue+"&SnklReqId="+SnklReqId+"&authFactor="+otlAuthType;
			}
			xmlhttp.onreadystatechange=function()
			{
				if( xmlhttp.readyState==4 &&  xmlhttp.status==200)
				{
					resp = JSON.parse(xmlhttp.responseText);
					if((resp.hasOwnProperty('success') && resp.success) || (resp.hasOwnProperty('status') && resp.status.toLowerCase() != 'failure'))
					{
						//document.forms[formPos].appendChild(otlAddField("OTPCode", otlGetElem("otpCode").value));
						//document.forms[formPos].appendChild(otlAddField("authValue", otlGetElem("otpCode").value));
						return otlProceedEvent(submitFlag, formPos);	
					}
					else
					{
						if(otlGetElem("register")) otlGetElem("register").disabled = false;
						var errorCode="";
						var errorText="";
						if(resp.hasOwnProperty('errorCode') && resp.errorCode != undefined)
						{
							errorCode = resp.errorCode;
							errorText = resp.errorReason;
						}
						else if(resp.hasOwnProperty('statusCode') && resp.statusCode != undefined)
						{
							errorCode = resp.statusCode;
							errorText = resp.data
						}
						switch(errorCode)
						{
							case -1507:
								if(otlGetElem("otpCode")) otlGetElem("otpCode").value="";		
								if(otlGetElem("otlErrStr")) otlGetElem("otlErrStr").innerHTML="";
								if(otlGetElem('otlScreen')) document.body.removeChild(otlGetElem('otlScreen'));
								if(otlGetElem('otlRegTemp')) document.body.removeChild(otlGetElem('otlRegTemp'));
								tfaEnabled = true;
								otlShowAuthFactors(JSON.stringify(resp), index, formPos, submitFlag);
							break;
							case -1502:
								otlGetElem("otpCode").value="";		
								otlGetElem("otlErrStr").innerHTML="* Authentication failed.";
							break;
							case -1518:
								otlGetElem("otpCode").value="";		
								otlGetElem("otlErrStr").innerHTML="* Authentication is blocked.";
								otlGetElem("otpCode").parentElement.style.display = "none";
								otlGetElem("register").style.display = "none";
							break;
							case -1508:
								otlGetElem("otpCode").value="";		
								otlGetElem("otlErrStr").innerHTML="* Invalid session.";
							break;
							case -1513:
								otlGetElem("otpCode").value="";		
								otlGetElem("otlErrStr").innerHTML="* User Suspended. Please contact the administrator to reactivate.";
							break;
							case -1514:
								otlGetElem("otpCode").value="";		
								otlGetElem("otlErrStr").innerHTML="* User blocked. Please contact the administrator to reactivate.";
							break;
							case -1517:
								otlGetElem("otpCode").value="";
								if(popuptype == 1)
									otlGetElem("otlErrStr").innerHTML="<span style='color:red;position:relative;left:5%;' >"+errorCode+" - *OTP entered is incorrect.</span></br>";
								else
								{
									otlGetElem("otlErrStr").style.marginLeft = "0%";
									otlGetElem("otlErrStr").innerHTML="<span style='color:red;position:relative;left:5%;' >*OTP entered is incorrect</span></br><br><span style='color:red;position:relative;text-align:left;'>Note: If this problem presists, use 'Sync time' option in your OTP mobile app and try again.</span>";
								}
							break;
							case -4211:
								if(document.getElementById("otlRegTemp")) document.getElementById("otlRegTemp").style.display = "none";
								if(document.getElementById("otlScreen")) document.getElementById("otlScreen").style.display = "none";
								otlShowErrorDiv(resp.errorCode, resp.errorString);
								// otlGetElem("otlErrStr").style.marginLeft = "0%";
								// otlGetElem("otlErrStr").innerHTML="<span style='color:red;position:relative;left:5%;' >*Your Session has timed out. Please login again.</span>";
							break;
							case -1211:
								if(document.getElementById("otlRegTemp")) document.getElementById("otlRegTemp").style.display = "none";
								if(document.getElementById("otlScreen")) document.getElementById("otlScreen").style.display = "none";
								otlGetElem("otlErrStr").style.marginLeft = "0%";
								otlGetElem("otlErrStr").innerHTML="<span style='color:red;position:relative;left:5%;' >*Unknown IP address<br>IP white-listing enabled, please contact ENET support desk to map your IP address</span>";
							break;
							default:
								document.getElementById("otpCode").value="";		
								document.getElementById("otlErrStr").innerHTML="<span style='color:red;position:relative;left:5%;'>*"+errorCode+" - "+errorText;
							break;
						}
						//SnklReqId = err.split("#")[3];
					}
				}
			}		
			xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xmlhttp.send(otlSendData);		
		}
	}
	else
		return;
}
function otlGetElem(id){return document.getElementById(id);}
/*parse form array to filter out repeated forms*/
for(var i=0; i<_fo.length; i++)
{
	for(var j=0; j<otlForm.length; j++)
	{
		if(_fo[i] == otlForm[j])
		{
			otlFormFlag = 1;
			break;
		}
	}
	if(!otlFormFlag)
	{
		otlForm[otlForm.length] = _fo[i];
	}
otlFormFlag = 0;
}
/*parse the array and replace the configured forms with our custom submit functions*/
for(var i=0; i<otlForm.length; i++)
{
for(var j=0; j<document.forms.length; j++)
{
	document.forms[j].setAttribute('autocomplete','off');
	if((otlForm[i] == j) || (otlForm[i] == document.forms[j].name) || (otlForm[i] == document.forms[j].id))
	{
		/*override the existing onsubmit event if present*/
		if(document.forms[j].onsubmit)
		{
			otlPreserveOnSubmit[j] = otlReplaceSubmit(new String(document.forms[j].onsubmit));
			if(!otlSubFlag)
			{
				document.forms[j].onsubmit = otlOnSubmit;
			}


			else
			{
				document.forms[j].onsubmit = new Function(otlPreserveOnSubmit[j]);
				otlSubFlag = 0;
			}
		}
		/*insert our custom onsubmit if not present*/
		else
		{
			otlPreserveOnSubmit[j] = 0;
			document.forms[j].onsubmit = otlOnSubmit;
		}
					
		/*the SUBMIT event handler will be invoked only on using the submit() javascript fucntion, in which case the ONSUBMIT event handler will be bypassed*/
					
					
		otlPreserveSubmit[j] = document.forms[j].submit;
		document.forms[j].submit = otlSubmit;
		break;
	}
}
}
//Below value is got to relocate the page when CLEAR button is clicked on the login page.
var otl_SharjLocation = window.location.href;
/* This below condition handled to avoid the "Permission Denied" problem occuring in IE 6 browser ,
Normally after any Ajax request the "otlPreserveSubmit[0]" varaible couldnt accessible which contains submit event native object and this is happening because of some secuity issues */
if(navigator.userAgent.indexOf("MSIE 6")!=-1)
{
	var otlBaseLocation=window.location.href;
	var otlXmlHttpTemp=new XMLHttpRequest();
	otlXmlHttpTemp.open("POST","/snkl_otl/1.htm",false);
	otlXmlHttpTemp.send();
	try{
	if(otlPreserveSubmit[0]==false){}}catch(e){
	window.location.href=otlBaseLocation;
	}
}
function renderPageResp(otlResponse){
	document.open();
	document.write(otlResponse);
	document.close();
}
(function _otlXMLHttpRequest()
{
	var http = XMLHttpRequest;
	var open = http.prototype.open;
	var send = http.prototype.send;
	
	http.prototype.open = function(method, url, async){
		this._otlURL = url;
		this._otlMethod = method;
		this._otlAsync = async;
		open.apply(this, [method, url, async]);
	}
	
	http.prototype.send = function(data) {
		if(this._otlURL.indexOf("localhost") == -1)
			this.setRequestHeader("Otl_is_xhr",true);
		send.apply(this, arguments);
	};
})();
function ifUndefined(val){if(val == 'undefined' || val == undefined || val == '' || val == null || val == 'null') return ''; else return val;}
window.onload = function()
{
	//var userId,passwordVal,groupId;
	var url = window.location.href;
	otlEventObj = 
	{
		capture : function(innerHTML, name, value, src,id) 
		{
			if(innerHTML != null) { this.innerHTML = innerHTML; }
			if(name != null) { this.name = name; }
			if(value != null) { this.value = value; }
			if(src != null) { this.src = src; }
			if(id != null){this.id = id; }
		}
	};
	if(url.indexOf("?") != -1 && url.indexOf("cred") != -1)
	{
		var cred = atob(url.split("cred=")[1]);
		var data = cred.split(",");
		for(var i=0;i<data.length;i++)
		{
			if(data[i].split("=")[0] != 'captchatxtfldval' && document.getElementsByName(data[i].split("=")[0])[0] != undefined)
			{
				document.getElementsByName(data[i].split("=")[0])[0].value = data[i].split("=")[1];
			}
			//var data[i].split("=")[0] = data[i].split("=")[1];
			// if(data[i].split("=")[0] == 'userId') document.forms[0].getElementsByName('userId1') = data[i].split("=")[1];
			// if(data[i].split("=")[0] == 'password') document.forms[0].getElementsByName('password1') = data[i].split("=")[1];
			// if(data[i].split("=")[0] == 'groupId') document.forms[0].getElementsByName('groupId1') = data[i].split("=")[1];
			
			// if(data[i].split("=")[0] == 'userId') document.getElementsByName("userId1")[0].value = data[i].split("=")[1];
			// if(data[i].split("=")[0] == 'password') document.getElementsByName("password1")[0].value = data[i].split("=")[1];	
			// if(data[i].split("=")[0] == 'groupId') document.getElementsByName("groupId1")[0].value = data[i].split("=")[1];
		}
		otlEventObj.capture('name','Ok');
		otlEventObj.capture('innerHTML','Ok');
		if(cred.indexOf('captchatxtfldval') == -1)
		{
			document.forms[0].action = 'https://corporate1.hdfcbank.com/EnetMVC/core.login.autopwdldngpag.do';
			otlEventFlag = 0;
			document.forms[0].submit();
		}
	}
}
</script>

