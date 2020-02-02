//////////////////////////////////////////////
//画面ID：GU0011_21							//
//画面名：商品検索画面						//
//作成日：2020/01/02						//
//概要	：商品を検索する					//
//											//
//////////////////////////////////////////////

//変数の設定
var varTorihiki= "";					//取引先情報保持用
var aryTorihiki= "";					//取引配列型
var prmShohin  = "prmShohin";			//画面間パラメータの受注商品情報ID

//////////////////////////////////////////////
//関数名		：fncSerchBtn()				//
//初回作成日	：2020/01/02				//
//概要			：検索ボタン押下時の処理	//
//											//
//////////////////////////////////////////////

function fncSerchBtn(){
	//変数の設定
	var varSerchShohinID = ""; 		//検索商品ＩＤ
	var varSerchShohinNM = "";		//検索商品名
	var strData = "";				//Composeする検索情報

	//検索値をまとめていく
	//検索商品ＩＤ
	if (fncBlancCheck($('#idSerchShohinID').val()) == 0){
		//空白ならnoneを入れる
		varSerchShohinID = "none";
	} else {
		//空白以外なら半角にする
		varSerchShohinID = fncZenkakuToHankaku($('#idSerchShohinID').val());
	}

	//検索商品名
	if (fncBlancCheck($('#idSerchShohinNM').val()) == 0){
		//空白ならnoneを入れる
		varSerchShohinNM = "none";
	} else {
		//空白以外なら全角にする
		varSerchShohinNM = fncHankakuToZenkaku($('#idSerchShohinNM').val());
	}

	//検索する値をComposeする
	strData =  varSerchShohinID + comSLT;
	strData += varSerchShohinNM ;

	//Ajax
	fncAjax("fncSerchShohin",strData);

}

//////////////////////////////////////////////
//関数名		：fncAjax()					//
//初回作成日	：2019/12/30				//
//概要			：Ajax通信を行う			//
//											//
//											//
//////////////////////////////////////////////

function fncAjax(varAct,varData){
	fncAjaxRead(varAct,varData).done(function(resData) {
	    fncResultOut(resData);
	}).error(function(XMLHttpRequest, textStatus, errorThrown) {
		console.log("XMLHttpRequest : " + XMLHttpRequest.status);
		console.log("textStatus     : " + textStatus);
		console.log("errorThrown    : " + errorThrown.message);
		alert("通信エラーが発生しました " + XMLHttpRequest.status + " : " + textStatus);
	});
}

function fncAjaxRead(varAct,varData){
	//ここでAjax通信を行います。
	//取得した値を元に検索の処理を行う。
	var requestData = {
			reqAct	: varAct,
			reqData	: varData
	};
	return $.ajax({
		type	:"POST",
		url		:"GU0011_20_servlet",
		async	:true,
		data	:requestData,
	})
}

//////////////////////////////////////////////
//関数名		：fncResultOut()			//
//初回作成日	：2020/01/02				//
//概要			：検索結果を出力する		//
//											//
//											//
//////////////////////////////////////////////

function fncResultOut(resData){
	//変数の設定
	aryShohin = "";					//取引先配列を初期化
	var tableHyou = "";				//出力用HTML
	$("#result").empty(); 			//表を初期化
	var cssflg = 0;					//表のデザインを変更するフラグ
	var columnflg = 1;				//表の項目を決定するフラグ
	var tableCompose = "";			//表のボタンで設定する値（Compose)

	//表の作成
	if(resData == "0"){
		//検索結果が０件の場合
		tableHyou += '<h4>検索結果は０件でした。</h4>';
	} else {
		//検索結果があった時の処理
		aryShohin = comfncDecompose1(resData);
		//表の作成
		tableHyou += '<h4>検索結果：' + aryShohin[0] + '（検索結果は５０件のみ表示されます）</h4>';
		tableHyou +='<table border="1">';
		tableHyou +='<tr>';
		tableHyou +='<th style="width:60px;">ＩＤ</th>';
		tableHyou +='<th style="width:400px;">商品名</th>';
		tableHyou +='<th style="width:50px;"></th>';
		tableHyou +='</tr>';

		//一覧をFOR文を用いて出力する
		for (i=1 ; i<aryShohin.length ; i++){
			switch(columnflg){
			case 1:
				//表のデザイン
				if(cssflg == 0){
					tableHyou +='<tr>';
					cssflg = 1;
				} else {
					tableHyou +='<tr style="background:#ccffff;">';
					cssflg = 0;
				}
				//Composeの初期化と追加（商品ＩＤ）
				tableCompose = "";
				tableCompose+= aryShohin[i] + comSLT ;
				//テーブル出力
				tableHyou +='<td style="text-align:center;"><label>' + aryShohin[i] +'</label></td>';
				//Increment
				columnflg++ ;
				break;

			case 2:
				//Composeの追加（商品名）
				tableCompose+= aryShohin[i] + comSLT + 0;
				//テーブル出力
				tableHyou +='<td><label>' + aryShohin[i]  + '</label></td>';
				tableHyou +='<td>';
				tableHyou +='<input class="serch_btn" type="button" value="追 加" onClick="fncAddBtn(\'' + tableCompose+ '\')" />';
				tableHyou +='</td>';
				//初期化
				columnflg = 1;
				break;

			}
		}
		$('#result').append(tableHyou);


	}

}

//////////////////////////////////////////////////
//関数名		：fncCancelBtn()				//
//初回作成日	：2020/01/02					//
//概要			：キャンセルボタン押下時の処理	//
//												//
//////////////////////////////////////////////////

function fncCancelBtn(){
	window.close();
}

//////////////////////////////////////////////////
//関数名		：fncAddBtn()					//
//初回作成日	：2020/01/02					//
//概要			：追加ボタン押下時の処理		//
//												//
//////////////////////////////////////////////////

function fncAddBtn(strAddShohin){
	//変数の設定
	var strShohinList = "" //設定されている商品情報
	//現在の商品パラメータを取得する
	strShohinList = window.opener.opener.comfncGetPrmData(prmShohin);

	//パラメータへ収納する
	if(strShohinList == "none"){
		//まだ何も入っていない場合
		strShohinList = strAddShohin ;
	} else {
		//既に他の商品が入っている場合
		strShohinList += comSLT + strAddShohin ;
	}

	//パラメータへ設定
	window.opener.opener.comfncSetPrmData(prmShohin,strShohinList);

	//親ウインドウの更新
	window.opener.fncLoad();

	//ウインドウを閉じる
	window.close();
}


