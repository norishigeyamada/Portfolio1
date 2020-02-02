
//////////////////////////////////////////////
//画面ID：GU0011_00							//
//画面名：新規注文処理画面（初期表示）		//
//作成日：2019/11/26						//
//概要	：新規注文作業画面（初期表示）		//
//											//
//////////////////////////////////////////////

//定数の設定
var prmShohin = "prmShohin";			//画面間パラメータの受注商品情報
var prmTorihiki = "prmTorihiki";		//画面間パラメータの取引先情報

//変数の設定
var varTorihiki = "";					//取引先情報保持用
var aryTorihiki = "";					//取引先配列化
var varShohin ="";						//受注商品情報保持用

var strK_id = "" ;						//顧客ID
var strN_id = "" ;						//納品先ID
var strK_name = "";						//顧客名
var strN_name = "";						//納品先名
var strN_address = "";					//送付先住所
var strN_tel = "";						//送付先電話番号
var strN_fax = "";						//送付先ＦＡＸ番号
var strN_mail = "";						//送付先メールアドレス
var strN_flg = "";						//送付先フラグ
var strOrderDate = "";					//受注日
var strDeliveryDate = "";				//納期
var strRemarks = "";					//備考

//受注商品配列
var aryShohinID = new Array();		//商品ＩＤ
var aryShohinNM = new Array();		//商品名
var aryShohinCNT = new Array();		//受注数


$(function () {
	$(".datepicker").datepicker();

	$('.datepicker2').datepicker({
		dateFormat : "yy/mm/dd"
		,dayNamesMin: ['日', '月', '火', '水', '木', '金', '土']
		,showOn: "button"
		,buttonImageOnly : true
		,buttonImage : "/PRWebApplication2/icon/Date8-1.png"
		,beforeShow : function(input,inst){
			//開く前に日付を上書き
			var year = $(this).parent().find(".year").val();
			var month = $(this).parent().find(".month").val();
			var date = $(this).parent().find(".date").val();
			$(this).datepicker( "setDate" , year + "/" + month + "/" + date)
		},
		onSelect: function(dateText, inst){
			//カレンダー確定時にフォームに反映
			var dates = dateText.split('/');
			//受注日
			$(this).parent().find("#idorderyear").val(dates[0]);
			$(this).parent().find("#idordermonth").val(dates[1]);
			$(this).parent().find("#idorderdate").val(dates[2]);
		}
	});

	$('.datepicker3').datepicker({
		dateFormat : "yy/mm/dd"
		,dayNamesMin: ['日', '月', '火', '水', '木', '金', '土']
		,showOn: "button"
		,buttonImageOnly : true
		,buttonImage : "/PRWebApplication2/icon/Date8-1.png"
		,beforeShow : function(input,inst){
			//開く前に日付を上書き
			var year = $(this).parent().find(".year").val();
			var month = $(this).parent().find(".month").val();
			var date = $(this).parent().find(".date").val();
			$(this).datepicker( "setDate" , year + "/" + month + "/" + date)
		},
		onSelect: function(dateText, inst){
			//カレンダー確定時にフォームに反映
			var dates = dateText.split('/');
			//納期
			$(this).parent().find("#idnoukiyear").val(dates[0]);
			$(this).parent().find("#idnoukimonth").val(dates[1]);
			$(this).parent().find("#idnoukidate").val(dates[2]);
		}
	});

});

//読み込んだ時に実行する
function fncLoad(){
	//取引先情報の設定を行う
	fncLoadTorihiki();
	//受注商品情報を取得・表示する
	fncLoadShohin();

}

////////////////////////////////////////////
//関数名		：fncTouroku()					//
//初回作成日	：2020/01/06					//
//概要			：新規注文を登録する			//
//												//
////////////////////////////////////////////

function fncTouroku(){
	//取引先情報をまとめる
	//取引先に関連する変数の初期化(送付先フラグを除く)
	strK_id = "" ;						//顧客ID
	strN_id = "" ;						//納品先ID
	strK_name = "";						//顧客名
	strN_name = "";						//納品先名
	strN_address = "";					//送付先住所
	strN_tel = "";						//送付先電話番号
	strN_fax = "";						//送付先ＦＡＸ番号
	strN_mail = "";						//送付先メールアドレス
	strOrderDate = "";					//受注日
	strDeliveryDate = "";				//納期
	strRemarks = "";					//備考
	strCheck =""						//入力チェック結果を格納
	prmName = "";						//パラメータ名格納用
	aryColumn = new Array();			//項目配列格納用
	aryValue = new Array();				//値配列格納用

	//初期設定
	prmName = prmTorihiki;
	//入力チェック
	strCheck = fncCheck(0);
	if(strCheck == "1"){
		//入力チェックにエラーがあれば中断する
		return;
	}

	//残りの入力の実施(送付先メールアドレス,備考)
	//送付先メールアドレス
	strN_mail = $('#idNouhinMail').val();
	strRemarks = $('#idBikou').val();

	//取引先パラメータを更新する
	//納品先名
	aryColumn.push(eval(prmTorihikiIndexN_name));
	aryValue.push(strN_name);
	//送付先住所
	aryColumn.push(eval(prmTorihikiIndexSent_address));
	aryValue.push(strN_address);
	//送付先電話番号
	aryColumn.push(eval(prmTorihikiIndexSent_telno));
	aryValue.push(strN_tel);
	//送付先ＦＡＸ番号
	aryColumn.push(eval(prmTorihikiIndexSent_faxno));
	aryValue.push(strN_fax);
	//送付先メールアドレス
	aryColumn.push(eval(prmTorihikiIndexSent_mail));
	aryValue.push(strN_mail);
	//受注日
	aryColumn.push(eval(prmTorihikiIndexOrder_date));
	aryValue.push(strOrderDate);
	//納期
	aryColumn.push(eval(prmTorihikiIndexDelivery_date));
	aryValue.push(strDeliveryDate);
	//備考
	aryColumn.push(eval(prmTorihikiIndexRemarks));
	aryValue.push(strRemarks);

	//更新実施
	if(comfncCompose1(prmName,aryColumn,aryValue) == "1"){
		//失敗時
		alert("更新中にエラーが発生しました。管理者へ連絡下さい");
	}

	//パラメータの取得
	varTorihiki = comfncGetPrmData(prmTorihiki);
	varShohin = comfncGetPrmData(prmShohin);
	varData = varTorihiki + comSLT2 + varShohin;
	//Ajax通信の実施
	fncAjax("fncRegNewOrder",varData);

}

////////////////////////////////////////////
//関数名		：fncAjax()					//
//初回作成日	：2020/01/13					//
//概要			：Ajax通信処理					//
//				：成功= 受注ID エラー= 1		//
//				  (結果はRespnseより取得)		//
////////////////////////////////////////////

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
		url		:"GU0011_00_servlet",
		async	:true,
		data	:requestData,
	})
}

function fncResultOut(strResult){
	if(strResult =="1"){
		//更新処理失敗
		alert("更新処理が失敗しています。管理者へ連絡下さい");
	} else {
		alert(strResult);
		//画面の表示をクリアする
		$('#idTorihikiNM').val('');						//取引先名
		$('#idNouhinNM').val('');						//納品先名
		$('#idNouhinAddress').val('');			 		//送付先住所
		$('#idNouhinTel1').val('');						//送付先電話番号1
		$('#idNouhinTel2').val('');						//送付先電話番号2
		$('#idNouhinTel3').val('');						//送付先電話番号3
		$('#idNouhinFax1').val('');						//送付先ＦＡＸ番号1
		$('#idNouhinFax2').val('');						//送付先ＦＡＸ番号2
		$('#idNouhinFax3').val('');						//送付先ＦＡＸ番号3
		$('#idNouhinMail').val(''); 					//送付先メールアドレス
		$('#idBikou').val(''); 							//備考
		$('#idorderyear').val(''); 						//受注日（年）
		$('#idordermonth').val(''); 					//受注日（月）
		$('#idorderdate').val(''); 						//受注日（日
		$('#idnoukiyear').val(''); 						//納期（年）
		$('#idnoukimonth').val(''); 					//納期（月）
		$('#idnoukidate').val(''); 						//納期（日）
		$('#shohinList').empty();						//受注商品テーブル

		//パラメータをクリアする
		comfncSetPrmData(prmTorihiki,"none");
		comfncSetPrmData(prmShohin,"none");

	}
}

////////////////////////////////////////////
//関数名		：fncCheck()					//
//初回作成日	：2020/01/10					//
//概要			：入力チェックの実施			//
//				：成功= 0 エラー= 1			//
//												//
////////////////////////////////////////////
function fncCheck(strCheckCTL){
	//変数の設定
	var strOrderYear = "";		//受注年
	var strOrderMonth = "";		//受注月
	var strOrderDay = "";		//受注日
	var strDeliveryYear = "";	//納期年
	var strDeliveryMonth = "";	//納期月
	var strDeliveryDay = "";	//納期日
	var strNouhinTel1 = "";		//電話番号1
	var strNouhinTel2 = "";		//電話番号2
	var strNouhinTel3 = "";		//電話番号3
	var strNouhinFax1 = "";		//FAX番号1
	var strNouhinFax2 = "";		//FAX番号2
	var strNouhinFax3 = "";		//FAX番号3

	//取引先情報
	//初期設定
	strOrderYear = $('#idorderyear').val();
	strOrderMonth = $('#idordermonth').val();
	strOrderDay = $('#idorderdate').val();
	strDeliveryYear = $('#idnoukiyear').val();
	strDeliveryMonth =  $('#idnoukimonth').val();
	strDeliveryDay =  $('#idnoukidate').val();
	strNouhinTel1 = $('#idNouhinTel1').val();
	strNouhinTel2 = $('#idNouhinTel2').val();
	strNouhinTel3 = $('#idNouhinTel3').val();
	intTelCheck = 0;
	strNouhinFax1 = $('#idNouhinFax1').val();
	strNouhinFax2 = $('#idNouhinFax2').val();
	strNouhinFax3 = $('#idNouhinFax3').val();
	intFaxCheck = 0;


//20200124_U_入力チェックに制御を加える_START

	if(strCheckCTL==0){
		//登録処理（制御が０）の時に行うチェック
		//納品先名のチェック
		if(fncBlancCheck($('#idNouhinNM').val()) == "0"){
			//空白の場合
			alert("納品先名を確認してください")
			return "1";
		} else {
			//空白以外の時には値を取得する
			strN_name = $('#idNouhinNM').val();
		}

		//送付先住所のチェック
		if(fncBlancCheck($('#idNouhinAddress').val()) == "0"){
			//空白の場合
			alert("納品先名を確認してください")
			return "1";
		} else {
			//空白以外の時には値を取得する
			strN_address = $('#idNouhinAddress').val();
		}

		//受注商品情報のチェック
		if(comfncGetPrmData("prmShohin")=="none"){
			//受注商品がない時
			alert("受注商品を選択して下さい");
			return "1";
		}
	}

//20200124_U_入力チェックに制御を加える_END


	//電話番号のチェック
	for(i=1 ; i <4 ; i++){
		if(fncBlancCheck(eval("strNouhinTel" + i))=="1"){
			strN_tel += eval("strNouhinTel" + i) + "-";
			intTelCheck ++;
		}
	}
	if(intTelCheck !=0 && intTelCheck != 3){
		//中途半端に電話番号が入っている場合
		alert("納品先電話番号を確認してください");
		//電話番号変数の初期化
		strN_tel = "";
		return "1";
	} else {
		strN_tel = strN_tel.substr(0,strN_tel.length -1 );
	}

	//ＦＡＸ番号のチェック
	for(i=1 ; i <4 ; i++){
		if(fncBlancCheck(eval("strNouhinFax" + i))=="1"){
			strN_fax += eval("strNouhinFax" + i) + "-"
			intFaxCheck ++;
		}
	}
	if(intFaxCheck !=0 && intFaxCheck != 3){
		//中途半端にＦＡＸ番号が入っている場合
		alert("納品先ＦＡＸ番号を確認してください");
		//FAX番号変数の初期化
		strN_fax ="";
		return "1";
	} else {
		strN_fax = strN_fax.substr(0,strN_fax.length -1);
	}

//20200124_U_入力チェックに制御を加える_START
	//受注日のチェック
	if(strCheckCTL==0){
		//登録処理の場合
		if(fncBlancCheck(strOrderYear) == "0" || fncBlancCheck(strOrderMonth) == "0" ||
				fncBlancCheck(strOrderDay) == "0"){
			//年月日のどれかが入っていない時
			alert("受注日を入れて下さい");
			return "1";
		} else {
			//値が入っている場合は日付かチェックする
			strOrderDate = fncDateCheck(strOrderYear,strOrderMonth,strOrderDay);
			if(strOrderDate == '1'){
				//日付でない場合
				alert("受注日を確認してください");
				return "1";
			}
		}
	} else {
		//登録処理以外の場合
		if(fncBlancCheck(strOrderYear) == "1" || fncBlancCheck(strOrderMonth) == "1" ||
				fncBlancCheck(strOrderDay) == "1"){
			//受注日のいずれかが空白でない場合
			strOrderDate = fncDateCheck(strOrderYear,strOrderMonth,strOrderDay);
			if(strOrderDate == '1'){
				//日付でない場合
				alert("受注日を確認してください");
				return "1";
			}
		}
	}

	//納期のチェック
	if(strCheckCTL==0){
		//登録処理の場合
		if(fncBlancCheck(strDeliveryYear) == "0" || fncBlancCheck(strDeliveryMonth) == "0" ||
				fncBlancCheck(strDeliveryDay) == "0"){
			//年月日のどれかが入っていない時
			alert("納期を入れて下さい");
			return "1";
		} else {
			//値が入っている場合は日付かチェックする
			strDeliveryDate = fncDateCheck(strDeliveryYear,strDeliveryMonth,strDeliveryDay);
			if(strDeliveryDate == '1'){
				//日付でない場合
				alert("納期を確認してください");
				return "1";
			}
		}
	} else {
		if(fncBlancCheck(strDeliveryYear) == "1" || fncBlancCheck(strDeliveryMonth) == "1" ||
				fncBlancCheck(strDeliveryDay) == "1"){
			strDeliveryDate = fncDateCheck(strDeliveryYear,strDeliveryMonth,strDeliveryDay);
			if(strDeliveryDate == '1'){
				//日付でない場合
				alert("納期を確認してください");
				return "1";
			}
		}
	}
//20200124_U_入力チェックに制御を加える_END

	return "0";
}

////////////////////////////////////////////
//関数名		：fncLoadShohin()				//
//初回作成日	：2020/01/02					//
//概要			：受注商品情報を取得・出力		//
//												//
////////////////////////////////////////////

function fncLoadShohin(){
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
	$('#shohinList').empty();

	//商品パラメータの読み込み
	strShohin = comfncGetPrmData(prmShohin);

	if(strShohin == "none"){
		//何も入っていない場合
		//表の出力
		tableHtml +='<h4>選択されている商品はありません</h4>';
		$('#shohinList').append(tableHtml);
		return;
	} else {
		//何か入っている場合、Decomposeする
		aryShohin = comfncDecompose1(strShohin);
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
		tableHtml += '</tr>';
	}

	//表の出力
	$('#shohinList').append(tableHtml);

}



//取引先情報の取得～値の設定まで
function fncLoadTorihiki(){

	//変数の設定
	var intCount = 0;
	var aryNouhinTel = new Array();		//-でsplitした電話番号
	var aryNouhinFax = new Array();		//-でsplitしたFAX番号

	//ＨＴＭＬの表示の初期化
	$('#idTorihikiNM').val('')
	$('#idNouhinNM').val('')
	$('#idNouhinNM').val('')
	$('#idNouhinTel1').val('')
	$('#idNouhinTel2').val('')
	$('#idNouhinTel3').val('')
	$('#idNouhinFax1').val('')
	$('#idNouhinFax2').val('')
	$('#idNouhinFax3').val('')
	$('#idNouhinMail').val('')
	$('#idBikou').val('')

	//取引先パラメータを取得
	varTorihiki = comfncGetPrmData(prmTorihiki);
	//取引先パラメータがnone以外ならDecomposeする
	if(varTorihiki!=="none"){
		//Decompose
		var aryTorihiki = comfncDecompose1(varTorihiki);

		//それぞれの値を変数に収納する
		strK_id = aryTorihiki[intCount++];			//顧客ID
		strN_id = aryTorihiki[intCount++];			//納品先ID
		strK_name = aryTorihiki[intCount++];		//顧客名
		strN_name = aryTorihiki[intCount++];		//納品先名
		strN_address = aryTorihiki[intCount++];		//送付先住所
		strN_tel = aryTorihiki[intCount++];			//送付先電話番号
		strN_fax = aryTorihiki[intCount++];			//送付先ＦＡＸ番号
		strN_mail = aryTorihiki[intCount++];		//送付先メールアドレス
		strN_flg = aryTorihiki[intCount++];			//送付先フラグ
		strOrderDate = aryTorihiki[intCount++];		//受注日
		strDeliveryDate = aryTorihiki[intCount++];	//納期
		strRemarks = aryTorihiki[intCount++];		//備考

		//送付先名がその他の時に送付先名を空白にする
		if(strN_name=="その他"){
			strN_name = "";
		}

		//送付先フラグが１の時に編集可能にする
		if(strN_flg == "1"){
			$('#idNouhinNM').attr('readonly',false);		//納品先名
			$('#idNouhinAddress').attr('readonly',false);	//送付先
			$('#idNouhinTel1').attr('readonly',false);		//送付先電話番号
			$('#idNouhinTel2').attr('readonly',false);		//送付先電話番号
			$('#idNouhinTel3').attr('readonly',false);		//送付先電話番号
			$('#idNouhinFax1').attr('readonly',false);		//送付先ＦＡＸ番号
			$('#idNouhinFax2').attr('readonly',false);		//送付先ＦＡＸ番号
			$('#idNouhinFax3').attr('readonly',false);		//送付先ＦＡＸ番号
			$('#idNouhinMail').attr('readonly',false);		//送付先メールアドレス
		}

		//HTMLへ値を反映させる
		$('#idTorihikiNM').val(strK_name);				//取引先名
		$('#idNouhinNM').val(strN_name);				//納品先名
		$('#idNouhinAddress').val(strN_address);	 	//送付先住所

		//送付先電話番号
		if(fncBlancCheck(strN_tel) == "0"){
			//電話番号が無い場合
			$('#idNouhinTel1').val(''); 				//送付先電話番号1
			$('#idNouhinTel2').val(''); 				//送付先電話番号2
			$('#idNouhinTel3').val(''); 				//送付先電話番号3
		} else {
			//電話番号が入っている場合
			aryNouhinTel = strN_tel.split("-");
			$('#idNouhinTel1').val(aryNouhinTel[0]);	//送付先電話番号1
			$('#idNouhinTel2').val(aryNouhinTel[1]);	//送付先電話番号2
			$('#idNouhinTel3').val(aryNouhinTel[2]);	//送付先電話番号3
		}

		//送付先ＦＡＸ番号
		if(fncBlancCheck(strN_fax) == "0"){
			//FAX番号が無い場合
			$('#idNouhinFax1').val(''); 				//送付先ＦＡＸ番号1
			$('#idNouhinFax2').val(''); 				//送付先ＦＡＸ番号2
			$('#idNouhinFax3').val(''); 				//送付先ＦＡＸ番号3
		} else {
			//Fax番号が入っている場合
			aryNouhinFax = strN_fax.split("-");
			$('#idNouhinFax1').val(aryNouhinFax[0]);	//送付先ＦＡＸ番号1
			$('#idNouhinFax2').val(aryNouhinFax[1]);	//送付先ＦＡＸ番号2
			$('#idNouhinFax3').val(aryNouhinFax[2]);	//送付先ＦＡＸ番号3
		}

		$('#idNouhinMail').val(strN_mail); 				//送付先メールアドレス

		//受注日
		if(fncBlancCheck(strOrderDate) == "0"){
			//空白の場合
			$('#idorderyear').val('');								//受注日（年）
			$('#idordermonth').val('');								//受注日（月）
			$('#idorderdate').val('');								//受注日（日）
		} else {
			$('#idorderyear').val(strOrderDate.substr(0,4));		//受注日（年）
			$('#idordermonth').val(strOrderDate.substr(4,2));		//受注日（月）
			$('#idorderdate').val(strOrderDate.substr(6,2));		//受注日（日）
		}

		//納期
		if(fncBlancCheck(strDeliveryDate) == "0"){
			//空白の場合
			$('#idnoukiyear').val('');								//納期（年）
			$('#idnoukimonth').val('');								//納期（月）
			$('#idnoukidate').val('');								//納期（日）
		} else {
			$('#idnoukiyear').val(strDeliveryDate.substr(0,4));		//納期（年）
			$('#idnoukimonth').val(strDeliveryDate.substr(4,2));	//納期（月）
			$('#idnoukidate').val(strDeliveryDate.substr(6,2));		//納期（日）
		}


		//備考
		$('#idBikou').val(strRemarks);									//備考

	}
}

//取引先編集ボタンをクリックされた時の処理
function fncMoveTorihikiSerch(){
	//変数の設定
	strResult ="";

	//現在の取引先情報を元にパラメータの更新を行う
	strResult = fncUpdateTorihiki(1);

	//更新結果の確認
	if(strResult=="1"){
		return;
	}

	var LinkURL="/PRWebApplication2/GU0011_10.html"; //リンク先URL
	var LinkOption="width=1300px,height=800px,left=200px;,top=40px;,menubar=no,toolbar=no,location=no"; //オプション
	var WinName="GU0011_10"
	var objWin=window.open(LinkURL,WinName,LinkOption);
	objWin.focus();
}

//受注商品編集ボタンをクリックされた時の処理
function fncMoveShohinEdit(){
	//変数の設定
	strResult ="";

	//現在の取引先情報を元にパラメータの更新を行う
	strResult = fncUpdateTorihiki(1);

	//更新結果の確認
	if(strResult=="1"){
		return;
	}

	var LinkURL="/PRWebApplication2/GU0011_20.html"; //リンク先URL
	var LinkOption="width=800px,height=800px,left=200px;,top=40px;,menubar=no,toolbar=no,location=no"; //オプション
	var WinName="GU0011_20"
	var objWin=window.open(LinkURL,WinName,LinkOption);
	objWin.focus();
}

////////////////////////////////////////////////
//関数名		：fncUpdateTorihiki()				//
//初回作成日	：2020/01/11						//
//概要			：取引先パラメータの更新を行う	//
//				：成功時：0　失敗時：1				//
////////////////////////////////////////////////

function fncUpdateTorihiki(strCheckCTL){
	//現在の入力されている顧客情報を更新する
	//変数の設定
	var prmName = prmTorihiki;		//共通関数（Compose１）の引数①
	var aryColumn = new Array();	//共通関数（Compose１）の引数②
	var aryValue = new Array();		//共通関数（Compose１）の引数③
	var strCheck ="";				//入力チェック結果格納
	var strOrderDate ="";			//受注日格納用
	var strNoukiDate ="";			//納期格納用
	var strUpdate = ""				//共通関数（Compose１）の結果格納用

	//入力チェック
	strCheck = fncCheck(strCheckCTL);

	if (strCheck == "1"){
		return "1";
	}

	//パラメータ更新処理
	//共通変数の初期化（全角スペースにする）
	//※顧客ID・顧客名・納品先ID・送付先フラグは更新対象外とする
	strN_name ="　";
	strN_address ="　";
	strN_tel ="　";
	strN_fax ="　";
	strN_mail ="　";
	strOrderDate ="　";
	strDeliveryDate ="　";
	strRemarks ="　";

	//値が入力されている場合に限り共通変数を更新していく

	//納品先名
	if(fncBlancCheck($('#idNouhinNM').val())=="1"){
		strN_name = $('#idNouhinNM').val();
	}

	//納品先住所
	if(fncBlancCheck($('#idNouhinAddress').val())=="1"){
		strN_address = $('#idNouhinAddress').val();
	}

	//納品先電話番号
	if(fncBlancCheck($('#idNouhinTel1').val())=="1"){
		strN_tel = $('#idNouhinTel1').val() + "-" + $('#idNouhinTel2').val() + "-" + $('#idNouhinTel3').val();
	}

	//納品先FAX番号
	if(fncBlancCheck($('#idNouhinFax1').val())=="1"){
		strN_fax  = $('#idNouhinFax1').val() + "-" + $('#idNouhinFax2').val() + "-" + $('#idNouhinFax3').val();
	}

	//納品先メールアドレス
	if(fncBlancCheck($('#idNouhinMail').val())=="1"){
		strN_mail = $('#idNouhinMail').val();
	}

	//受注日
	if(fncBlancCheck($('#idorderyear').val())=="1"){
		strOrderDate  = $('#idorderyear').val();
		strOrderDate += ("0" + $('#idordermonth').val()).slice(-2);
		strOrderDate += ("0" + $('#idorderyear').val()).slice(-2);
	}

	//納期
	if(fncBlancCheck($('#idnoukiyear').val())=="1"){
		strDeliveryDate  = $('#idnoukiyear').val();
		strDeliveryDate += ("0" + $('#idnoukimonth').val()).slice(-2);
		strDeliveryDate += ("0" + $('#idnoukidate').val()).slice(-2);
	}

	//備考
	if(fncBlancCheck($('#idBikou').val())=="1"){
		strRemarks = $('#idBikou').val()
	}

	//パラメータ更新関数への準備

	//納品先名
	aryColumn.push("prmTorihikiIndexN_name");
	aryValue.push(strN_name);

	//送付先住所
	aryColumn.push("prmTorihikiIndexSent_address");
	aryValue.push(strN_address);

	//送付先電話番号
	aryColumn.push("prmTorihikiIndexSent_telno");
	aryValue.push(strN_tel);

	//送付先FAX番号
	aryColumn.push("prmTorihikiIndexSent_faxno");
	aryValue.push(strN_fax );

	//納品先メールアドレス
	aryColumn.push("prmTorihikiIndexSent_mail");
	aryValue.push(strN_mail);

	//受注日
	aryColumn.push("prmTorihikiIndexOrder_date");
	aryValue.push(strOrderDate);

	//納期
	aryColumn.push("prmTorihikiIndexDelivery_date");
	aryValue.push(strDeliveryDate);

	//備考
	aryColumn.push("prmTorihikiIndexRemarks");
	aryValue.push(strRemarks);

	//更新処理
	if(aryColumn.length > 0){
		strUpdate = comfncCompose1(prmName,aryColumn,aryValue);
	}

	//更新結果の確認
	if (strUpdate == "1"){
		alert("更新処理に失敗しました:fncUpdateTorihiki");
		return "1";
	}

	return "0";
}


