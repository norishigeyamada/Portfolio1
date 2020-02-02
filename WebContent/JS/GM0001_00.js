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

//注文業務がクリックされた時の処理を行う
$(document).ready(function(){
	$("#act_order").click(function(){
		$("*[name=GU]", top.document).attr("src","/PRWebApplication2/GU0010_00.html");	//右フレーム
		$("*[name=GM]", top.document).attr("src","/PRWebApplication2/GM0100_00.html"); //左フレーム
	});
});

//商品管理業務がクリックされた時の処理を行う