//////////////////////////////////////////////
//画面ID：GU0011_20							//
//画面名：受注商品編集画面					//
//作成日：2020/01/03						//
//概要	：受注された商品情報を編集する		//
//		：商品を追加する際には別の画面に	//
//		：遷移する							//
//////////////////////////////////////////////

//変数の設定
var prmShohin = "prmShohin";			//画面間パラメータの受注商品情報ID

//受注商品配列
var aryShohinID = new Array();		//商品ＩＤ
var aryShohinNM = new Array();		//商品名
var aryShohinCNT = new Array();		//受注数

//////////////////////////////////////////////
//関数名		：fncLoad()					//
//初回作成日	：2020/01/03				//
//概要			：画面読み込み時の処理		//
//											//
//////////////////////////////////////////////

function fncLoad(){
	//変数の設定
	var strShohin = ""; 				//商品パラメータ収納用
	var aryShohin = new Array(); 		//Decompose後の商品パラメータ
	var aryCount = 1;					//分解区分
	var tableHtml = "";					//表のＨＴＭＬ
	var tableCssFlg =0;					//表のカラー変更フラグ

	//配列初期化
	aryShohinID.length = "";			//商品ＩＤ
	aryShohinNM.length = "";			//商品名
	aryShohinCNT.length = "";			//受注数

	//表の初期化
	$('#shohinEdit').empty();

	//商品パラメータの読み込み
	strShohin = window.opener.comfncGetPrmData(prmShohin);

	if(strShohin == "none"){
		//何も入っていない場合
		//表の出力
		$('#shohinEdit').append(tableHtml);
		return;
	} else {
		//何か入っている場合、Decomposeする
		aryShohin = window.opener.comfncDecompose1(strShohin);
	}

	//取得したパラメータを分解していく
	for(i=0 ; i<aryShohin.length ; i++){
		switch(aryCount){
		//商品ＩＤ
		case 1:
			//値の入力
			aryShohinID.push(aryShohin[i]);
			//Increment
			aryCount++;
			break;

		//商品名
		case 2:
			//値の入力
			aryShohinNM.push(aryShohin[i]);
			//Increment
			aryCount++;
			break;

		//受注数量
		case 3:
			//値の入力
			aryShohinCNT.push(aryShohin[i]);
			//カウントの初期化
			aryCount = 1;
			break;
		}
	}

	//表の作成
	$("#shohinEdit").empty(); 			//表を初期化

	tableHtml +='<h4>現在の商品数：' + aryShohinCNT.length + '</h4>';
	tableHtml +='<table border="1">';
	tableHtml +='<tr>';
	tableHtml +='<th style="width:100px;">商品ＩＤ</th>';
	tableHtml +='<th style="width:500px;">商品名</th>';
	tableHtml +='<th style="width:35px;">数量</th>';
	tableHtml +='<th style="width:50px;"></th>';
	tableHtml +='</tr>';

	//ここから選択された商品を出力していく
	for(i=0 ; i<aryShohinCNT.length ; i++){
		//Backgroundの設定1(<tr>タグでの設定)
		if(tableCssFlg ==0){
			tableHtml += '<tr>';
			//cssFlgの変更
			tableCssFlg = 1;
		} else {
			tableHtml += '<tr style="background:#ccffff;">';
			//cssFlgの変更
			tableCssFlg = 0;
		}

		tableHtml += '<td><label>' + aryShohinID[i] + '</label></td>';
		tableHtml += '<td><label>' + aryShohinNM[i] + '</label></td>';
		tableHtml += '<td>';
		tableHtml += '<input type="text" id="idShohinCNT' + i + '" style="width:35px; border-style:none; text-align:right; font-size:16px; background-color:transparent;" value="' + aryShohinCNT[i] + '"  maxlength = "2">';
		tableHtml += '</td>';
		tableHtml += '<td><input type="button" class="delete_btn" value = "削　除" onClick="fncDelete(\'' + i + '\')"></td>';
		tableHtml += '</tr>';
	}

	//表の出力
	$('#shohinEdit').append(tableHtml);

}

//////////////////////////////////////////////
//関数名		：fncMoveShohinSerch()		//
//初回作成日	：2020/01/01				//
//概要			：追加ボタン押下時の処理	//
//											//
//////////////////////////////////////////////

function fncMoveShohinSerch(){
	//変数の設定
	var strShohin = "";			//商品パラメータ取得用
	//商品パラメータの読み込み
	strShohin = window.opener.comfncGetPrmData(prmShohin);

	//何か商品がある時には受注数量を更新する
	if(strShohin != "none"){
		//受注数量の更新
		for(i=0 ; i < aryShohinCNT.length ; i++){
			aryShohinCNT[i] = $('#idShohinCNT' + i).val();
		}
		//商品パラメータの更新
		fncEditprmShohin();
	}

	//検索画面を開く
	var LinkURL="/PRWebApplication2/GU0011_21.html"; //リンク先URL
	var moveLeft = window.screenX + 20; //開く場所をウインドウから右に20ずらす
	var moveTop = window.screenY + 10; //開く場所をウインドウから下に10ずらす
	var LinkOption="width=700px,height=800px,left=" + moveLeft + ";,top=" + moveTop + ";,menubar=no,toolbar=no,location=no"; //オプション
	var WinName="GU0011_21"
	var objWin=window.open(LinkURL,WinName,LinkOption);
	objWin.focus();
}

//////////////////////////////////////////////
//関数名		：fncDelete()				//
//初回作成日	：2020/01/04				//
//概要			：削除ボタン押下時の処理	//
//											//
//////////////////////////////////////////////

function fncDelete(intDelete){
	//受注数量の更新
	for(i=0 ; i < aryShohinCNT.length ; i++){
		aryShohinCNT[i] = $('#idShohinCNT' + i).val();
	}
	//指定された要素を削除する
	aryShohinID.splice(intDelete,1);
	aryShohinNM.splice(intDelete,1);
	aryShohinCNT.splice(intDelete,1);

	//パラメータへ反映
	fncEditprmShohin();
}

//////////////////////////////////////////////
//関数名		：fncCommit()				//
//初回作成日	：2020/01/04				//
//概要			：確定ボタン押下時の処理	//
//											//
//////////////////////////////////////////////

function fncCommit(){
	//変数の設定
	var strShohin = "";			//商品パラメータ取得用
	//商品パラメータの読み込み
	strShohin = window.opener.comfncGetPrmData(prmShohin);

	//何か商品がある時には受注数量を更新する
	if(strShohin != "none"){
		//入力チェック
		for(i=0 ; i < aryShohinCNT.length ; i++){
			if(isNaN(fncZenkakuToHankaku($('#idShohinCNT' + i).val())) || fncZenkakuToHankaku($('#idShohinCNT' + i).val()) == 0){
				//数字でない場合
				alert("受注数量を確認してください。");
				$('#idShohinCNT' + i).css({'background':'#ff99cc','font-weight':'bold'});
				return;
			} else {
				//問題ない場合
				$('#idShohinCNT' + i).css('background-color','transparent');
			}
		}

		//受注数量の更新
		for(i=0 ; i < aryShohinCNT.length ; i++){
			aryShohinCNT[i] = fncZenkakuToHankaku($('#idShohinCNT' + i).val());
		}
		//商品パラメータの更新
		fncEditprmShohin();
	}

	//親画面の表示を更新
	window.opener.fncLoad();

	//画面を閉じる
	window.close();


}

//////////////////////////////////////////////
//関数名		：fncEditprmShohin()		//
//初回作成日	：2020/01/04				//
//概要			：JS内共通関数				//
//				：商品パラメータを更新する	//
//											//
//////////////////////////////////////////////

function fncEditprmShohin(){
	//変数の設定
	var strShohin = "";

	//各受注商品配列に何も入っていない場合は初期化する
	if(aryShohinCNT.length == 0){
		//何も入っていない場合
		window.opener.comfncSetPrmData(prmShohin,"none");
	} else {
		//何か入っている場合
		for(i=0 ; i < aryShohinCNT.length ; i++){
			//全て順番に格納していく
			strShohin += aryShohinID[i] + comSLT;					//受注商品ＩＤ
			strShohin += aryShohinNM[i] + comSLT;					//受注商品名
			strShohin += aryShohinCNT[i] + comSLT;					//受注数量
		}
		//最後のcomSLTを削除する
		strShohin = strShohin.substring(0,strShohin.length - 5);

		//パラメータへセットする
		window.opener.comfncSetPrmData(prmShohin,strShohin);

	}

	//画面初期化
	fncLoad();

}