/**
 *
 */

//////////////////////////////////////////////
//画面ID：GM0001_01							//
//画面名：メインメニュー					//
//作成日：2019/11/24						//
//概要	：初期表示された際の業務選択		//
//		メニューを出力する					//
//											//
//											//
//////////////////////////////////////////////

$(document).ready(function(){
	//新規注文が押された時の処理
	$("#new_order").click(function(){
		$("*[name=GU]", top.document).attr("src","/PRWebApplication2/GU0011_00.html");	//右フレーム
	});

	//注文検索・変更が押された時の処理
	$("#edit_order").click(function(){
		$("*[name=GU]", top.document).attr("src","/PRWebApplication2/.html");	//右フレーム
	});

	//注文削除が押された時の処理
	$("#erase_order").click(function(){
		$("*[name=GU]", top.document).attr("src","/PRWebApplication2/.html");	//右フレーム
	});



});

