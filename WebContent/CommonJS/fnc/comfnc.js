//共通関数

function fncgetTorihiki(){
	//取引先の情報を取得する
	varTorihiki = top.document.getElementById("prmTorihiki").value ;
	return varTorihiki;
}

//画面間パラメータ関数
//画面間パラメータで指定されたパラメータの値を取得して返す。
function comfncGetPrmData(prmid){
	//変数の設定
	var PrmData =""; //取得した画面間パラメータ値
	//共通関数
	//top.htmlの画面間パラメータを取得する
	try {
		var PrmData = top.document.getElementById(prmid).value ;
		return PrmData ;
	} catch(e) {
		console.log("Error:" + e);
	}
}

//指定された画面間パラメータに指定された値を入れる。
//戻り値：成功時=0,失敗時=1
function comfncSetPrmData(prmid,prmdata){
	//セットを行う
	try {
		top.document.getElementById(prmid).value = prmdata ;
		return '0' ;
	} catch(e) {
		console.log("Error:" + e);
		return '1' ;
	}
}

//Decompose処理１。共通定数comsplterを基準にSplitする。
function comfncDecompose1(strData){
	try{
		var aryString = String(strData).split(comSLT);
		return aryString;
	} catch(e) {
		conslole.log(e);
	}
}

//Compose処理。指定されたパラメータを更新してセットし直す
//戻り値。成功時=0,失敗時=1
function comfncCompose1(prmName,aryColumn,aryValue){
	//変数の設定
	var strPrm = "";				//現在のパラメータを入れる
	var aryPrm = new Array();		//パラメータをDecomposeした状態
	var strSetPrm ="";				//更新後のパラメータを入れる

	//空白の場合はエラーを返す
	if(prmName=="" || aryColumn.length == 0 || aryValue.length == 0){
		return "1";
	}

	//現在のパラメータの取得
	strPrm = comfncGetPrmData(prmName);

	if(fncBlancCheck(strPrm.replace(comSLT,"")) == "0" || strPrm == "none"){
		//まだ設定されていない時は配列を作成する
		aryPrm = Array(eval(prmName + "Max"));
		//全ての値を初期化（全角スペース）する
		for(i=0 ; i < aryPrm.length ; i++){
			aryPrm[i] = "　";
		}
	} else {
		//設定されている場合(Decompose処理)
		aryPrm = comfncDecompose1(strPrm);
	}

	//更新処理の実施
	for (i=0 ; i<aryColumn.length ; i++){
		aryPrm[eval(aryColumn[i])] = aryValue[i];
	}

	//Composeを行う
	for (i=0 ; i<aryPrm.length ; i++){
		strSetPrm += aryPrm[i] + comSLT;
	}

	//最後のcomSLTを削除する
	strSetPrm = strSetPrm.substr(0,strSetPrm.length - comSLT.length);

	//更新されたパラメータをSetする
	comfncSetPrmData(prmName,strSetPrm)

	return "0";

}

//テストの実施
function test1(){
	//取得した値を元に検索の処理を行う。
	var Data="送信されてますか？"
	var requestData = {
			reqAct : "fncSerchTorihiki",
			reqData : Data
	};
	$.ajax({
		type	:"POST",
		url		:"GU0011_10_Servlet",
		async	:true,
		data	:requestData,
	}).success(function(data) {
	    alert('success!!');
	}).error(function(XMLHttpRequest, textStatus, errorThrown) {
	    alert('error!!!');
	console.log("XMLHttpRequest : " + XMLHttpRequest.status);
	console.log("textStatus     : " + textStatus);
	console.log("errorThrown    : " + errorThrown.message);
	});

//	alert("呼んだ～?");
}