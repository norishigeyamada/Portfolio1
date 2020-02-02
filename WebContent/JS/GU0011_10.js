//////////////////////////////////////////////
//画面ID：GU0011_10							//
//画面名：取引先検索画面					//
//作成日：2019/12/09						//
//概要	：取引先を検索しする				//
//											//
//////////////////////////////////////////////

//変数の設定
//取引先情報
var varTorihiki="";					//取引先情報保持用
var aryTorihiki="";					//取引配列型

//Ajax通信で取得する各項目
var aryk_id = new Array();			//顧客ID
var aryn_id = new Array();			//納品先ID
var aryk_name = new Array();		//顧客名
var aryn_name = new Array();		//納品名
var aryn_address = new Array();		//納品先住所
var aryn_tel = new Array();			//納品先電話番号
var aryn_fax = new Array();			//納品先ＦＡＸ番号
var aryn_mail = new Array();		//納品先メールアドレス

//定数の設定
var prmTorihiki = "prmTorihiki";	//画面間パラメータの取引先情報取得ID

function fncLoad(){
	//現在親画面で取引先情報がある場合はそれを元に一覧を出力する
	//パラメータの取得
	if(window.opener){ 	//親ウインドウが閉じられている場合は行わない
		varTorihiki = window.opener.comfncGetPrmData(prmTorihiki);

		//取得したパラメータの判断
		if(varTorihiki !=="none"){
			aryTorihiki = comfncDecompose1(varTorihiki);
			//取得した値を元に検索の処理を行う。
			var reqData = aryTorihiki[0] + comSLT + "none" + comSLT + "none" + comSLT;
			var resData = fncAjax("fncSerchTorihiki",reqData);
		}
	}
}

//////////////////////////////////////////////
//	関数名		：fncSerchBtn()				//
//	初回作成日	：2019/12/29				//
//	概要		：検索ボタン押下時の処理	//
//											//
//											//
//////////////////////////////////////////////

function fncSerchBtn(){
	//変数の設定
	var varSerchTorihikiID = ""; 			//取引先ID
	var varSerchTorihikiNM = "";			//取引先名
	var varSerchNouhinNM = "";				//納品先名
	var serchTorihikisakiID = "";			//検索用＿取引先ID（検索）
	var serchTorihikisakiNM = "";			//検索用＿取引先名（検索）
	var serchNouhinsakiNM = "";				//検索用＿納品先名（検索）
	var checkflg = 0;						//空白の数をカウントする
	var strData = "";						//検索情報を格納する
	var resData = "";						//Ajaxからの通信結果を返す

	//検索値の取得
	varSerchTorihikiID = $("#idSerchTorihikiID").val();		//取引先ID
	varSerchTorihikiNM = $("#idSerchTorihikiNM").val();	//取引先名
	varSerchNouhinNM   = $("#idSerchNouhinNM").val();		//納品先名

	//入力チェック
	//取引先ID
	if(fncBlancCheck(varSerchTorihikiID)=="0"){
		//空白の場合
		serchTorihikisakiID = "none";
		checkflg++;
	} else {
		//値が入っている場合は半角にして格納する
		serchTorihikisakiID = fncZenkakuToHankaku(varSerchTorihikiID);
	}

	//取引先名
	if(fncBlancCheck(varSerchTorihikiNM)=="0"){
		//空白の場合
		serchTorihikisakiNM = "none";
		checkflg++;
	} else {
		//値が入っている場合は全角にして格納する
		serchTorihikisakiNM = fncHankakuToZenkaku(varSerchTorihikiNM);
	}

	//納品先名
	if(fncBlancCheck(varSerchNouhinNM)=="0"){
		//空白の場合
		serchNouhinsakiNM = "none";
		checkflg++;
	} else {
		//値が入っている場合は全角にして格納する
		serchNouhinsakiNM = fncHankakuToZenkaku(varSerchNouhinNM);
	}

	//全て空白なら終了する
	if(checkflg==3){
		alert("検索条件を1つ入れて下さい");
		return;
	}

	//検索する値をComposeする
	strData =  serchTorihikisakiID + comSLT;
	strData += serchTorihikisakiNM + comSLT;
	strData += serchNouhinsakiNM;

	//Ajax
	fncAjax("fncSerchTorihiki",strData);

}

//////////////////////////////////////////////
//関数名		：fncResultOut()			//
//初回作成日	：2019/12/29				//
//概要			：検索結果を出力する		//
//											//
//											//
//////////////////////////////////////////////
function fncResultOut(resData){
	//変数の設定
	aryTorihiki = "";				//取引先配列を初期化
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
		aryTorihiki = comfncDecompose1(resData);
		//表の作成
		tableHyou += '<h4>検索結果：' + aryTorihiki[0] + '</h4>';
		tableHyou +='<table border="1">';
		tableHyou +='<tr>';
		tableHyou +='<td class="t002thTorihiki">取引先</td>';
		tableHyou +='<td class="t002thNouhin">納品先</td>';
		tableHyou +='<td class="t002thSoufu">送付先住所</td>';
		tableHyou +='<td class="t002thBtn"></td>';
		tableHyou +='</tr>';

		//20200111_各項目毎に配列にまとめる
		//配列の初期化
		aryk_id.length = 0 ;						//顧客ID
		aryn_id.length = 0 ;						//納期ID
		aryk_name.length = 0 ;						//顧客名
		aryn_name.length = 0 ;						//納品先名
		aryn_address.length = 0 ;					//納品先住所
		aryn_tel.length = 0 ;						//納品先電話番号
		aryn_fax.length = 0 ;						//納品先ＦＡＸ番号
		aryn_mail.length = 0 ;						//納品先メールアドレス

		//配列に格納する
		var rcCount = 1;
		for (i=1 ; i <aryTorihiki.length ; i++ ){
			switch(rcCount){
			case 1:
				aryk_id.push(aryTorihiki[i]) ;			//顧客ID
				rcCount++;
				break;
			case 2:
				aryn_id.push(aryTorihiki[i]) ;			//納期ID
				rcCount++;
				break;
			case 3:
				aryk_name.push(aryTorihiki[i]) ;		//顧客名
				rcCount++;
				break;
			case 4:
				aryn_name.push(aryTorihiki[i]) ;		//納品先名
				rcCount++;
				break;
			case 5:
				aryn_address.push(aryTorihiki[i]) ;		//納品先住所
				rcCount++;
				break;
			case 6:
				aryn_tel.push(aryTorihiki[i]) ;			//納品先電話番号
				rcCount++;
				break;
			case 7:
				aryn_fax.push(aryTorihiki[i]) ;			//納品先ＦＡＸ番号
				rcCount++;
				break;
			case 8:
				aryn_mail.push(aryTorihiki[i]) ;		//納品先メールアドレス
				rcCount = 1;
				break;
			}
		}

		//一覧をFOR文を用いて出力する
		for (i=0 ; i<aryn_mail.length ; i++){
			//表のデザイン
			if(cssflg == 0){
				tableHyou +='<tr class="t002td1">';
				cssflg = 1;
			} else {
				tableHyou +='<tr class="t002td2">';
				cssflg = 0;
			}

			//顧客名
			tableHyou +='<td>' + aryk_name[i]  + '</td>';

			//納品先名
			tableHyou +='<td>' + aryn_name[i]  + '</td>';

			//納品先住所
			tableHyou +='<td>' + aryn_address[i]  + '</td>';

			//選択ボタンの作成
			tableHyou +='<td class="t002tdBtn">';
			tableHyou +='<input class="t002Btn" type="button" value="選　択" onClick="fncChoiceBtn(\'' + i + '\')" />';
			tableHyou +='</td>'
			tableHyou +='</tr>'

		}
		$('#result').append(tableHyou);

	}
}


//////////////////////////////////////////////
//関数名		：fncChoiceBtn()			//
//初回作成日	：2019/12/30				//
//概要			：選択ボタン押下時の処理	//
//											//
//											//
//////////////////////////////////////////////

function fncChoiceBtn(varString){
	//変数の設定
	var setPrm = 1 ; 				//画面間パラメータセット結果（初期値：NG）
	var prmName = "" ;				//パラメータ更新関数（対象パラメータ名）
	var aryColumn = new Array();	//パラメータ更新関数（項目名）
	var aryValue = new Array();		//パラメータ更新関数（値）

	//親画面が開いているか確認
	if(!window.opener){
		alert("元のウインドウが閉じています。最初から処理を実施して下さい。");
	}

	//画面間パラメータへ引数をセットする
	if(varString ==''){
		//引数に何も入っていない時（連携エラー）
		alert("選択した値の引継ぎに失敗しています。開発者へ連絡下さい。");
	} else {
		//画面間パラメータへセットする
		//20200111_項目毎に交信する形式に変更する
		prmName = prmTorihiki;

		//顧客ID
		aryColumn.push(prmTorihikiIndexK_id);
		aryValue.push(aryk_id[varString]);
		//納品先ID
		aryColumn.push(prmTorihikiIndexN_id);
		aryValue.push(aryn_id[varString]);
		//顧客名
		aryColumn.push(prmTorihikiIndexK_name);
		aryValue.push(aryk_name[varString]);
		//納品先名
		aryColumn.push(prmTorihikiIndexN_name);
		aryValue.push(aryn_name[varString]);
		//送付先住所
		aryColumn.push(prmTorihikiIndexSent_address);
		aryValue.push(aryn_address[varString]);
		//送付先電話番号
		aryColumn.push(prmTorihikiIndexSent_telno);
		aryValue.push(aryn_tel[varString]);
		//送付先ＦＡＸ番号
		aryColumn.push(prmTorihikiIndexSent_faxno);
		aryValue.push(aryn_fax[varString]);
		//送付先メールアドレス
		aryColumn.push(prmTorihikiIndexSent_mail);
		aryValue.push(aryn_mail[varString]);

		//送付先フラグ
		if(aryn_name[varString] == "その他"){
			//その他ならフラグを立てる
			aryColumn.push(prmTorihikiIndexSent_flg);
			aryValue.push("1");
		} else {
			//その他以外の場合
			aryColumn.push(prmTorihikiIndexSent_flg);
			aryValue.push("0");
		}

		setPrm = window.opener.comfncCompose1(prmName,aryColumn,aryValue);
		if(setPrm == 1){
			alert("選択された値の設定処理が失敗しました。開発者へ連絡ください。");
		}
	}

	//親画面の更新処理を行う
	window.opener.fncLoad();

	//画面を閉じる
	window.close();

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
		url		:"GU0011_10_Servlet",
		async	:true,
		data	:requestData,
	})
}


//////////////////////////////////////////////
//関数名		：fncCancelBtn()			//
//初回作成日	：2019/12/30				//
//概要			：キャンセル				//
//											//
//											//
//////////////////////////////////////////////

function fncCancelBtn(){
	window.close();

}