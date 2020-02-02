package GU_Java;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import COMMON.DBControl;
import COMMON.comJAVA;	//Java共通クラス
import dao.ComDAO1;		//DAOクラス１
import dao.ComDAO2;

public class GU0011_00_Act {
	//変数の生成場所
	ComDAO1 objDao1 = new ComDAO1();							//DAOクラス１
	ComDAO2 objDao2 = new ComDAO2();							//DAOクラス２
	GU0011_00_SQL objGU0011_00_SQL = new GU0011_00_SQL();		//SQLクラス
	GU0011_20_SQL objGU0011_20_SQL = new GU0011_20_SQL();		//SQLクラス
	comJAVA objcomJAVA = new comJAVA();
	private DBControl objdb;											//DBオブジェクト
	String sqlSelect = objGU0011_20_SQL.sqlSelect(); 			//ここにSelect文を入れる
	String sqlSelectCount = objGU0011_20_SQL.sqlSelectCount(); 	//ここにSelectCount文を入れる
	String sqlFrom= objGU0011_20_SQL.sqlFrom();					//ここにFrom句を入れる
	String sqlWhere = "" ;										//ここにWhere句を入れる

	public GU0011_00_Act() {
		objdb = new DBControl();
	}

	/////////////////////////////////////////
	//関数：fncRegNewOrder					//
	//概要：新規注文情報を作成する			//
	//作成：2020/01/15							//
	//戻り：成功時：受注ＮＯ					//
	//		失敗時：1							//
	//////////////////////////////////////////

	public String fncRegNewOrder(String reqData){

		//変数の設定
		String fncRegNewOrder = "";										//本処理の戻り値を格納する
    	String TimeStanp = "";												//タイムスタンプ
    	String UpDate = "";													//更新日時格納
    	String OrderNO = "";												//受注NO
    	Calendar Cal = Calendar.getInstance();								//カレンダー
    	SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");			//DateFormat(yyyymmdd)
    	SimpleDateFormat sdf2 = new SimpleDateFormat("yyyyMMddhhmmssSSS");	//DateFromat-ミリ秒まで
    	String strResult = "";												//結果格納用
    	String aryReqData[] ;												//RequestDataをDecomposeした配列
    	String prmTorihiki ="";											//取引先パラメータ
    	String prmShohin = "";												//受注商品パラメータ
    	String aryTorihiki[] ;												//取引先パラメータ（Decompose）
    	String aryShohin[];												//受注商品パラメータ(Decompose)
    	List<String> s_id = new ArrayList<>();								//商品ID
    	List<String> order_count = new ArrayList<>(); 						//商品受注数量
    	List<String> TotalOrder = new ArrayList<>();						//受注商品情報整理収納品

    	//定数の設定
    	String GID ="GU0011";												//画面ID

    	//初期値の設定
    	//Decompose⇒格納
    	aryReqData = objcomJAVA.fncDecompose2(reqData);
    	prmTorihiki = aryReqData[0];
    	prmShohin = aryReqData[1];
    	aryTorihiki = objcomJAVA.fncDecompose(prmTorihiki);
    	aryShohin = objcomJAVA.fncDecompose(prmShohin);

    	//結果の値（初期値は１：失敗としておく)
    	fncRegNewOrder = "Error:初期処理からのエラー";

		//タイムスタンプ作成
    	TimeStanp = sdf.format(Cal.getTime());
    	UpDate = sdf2.format(Cal.getTime());

    	//DB接続の実施
    	strResult = "";
    	strResult = objdb.dbcon();
    	if(strResult.contains("Error")) {
    		//接続に失敗した時
    		fncRegNewOrder = strResult;
    		return fncRegNewOrder;
    	}

    	//受注ゼロ点の確認の実施
    	strResult = "";
    	strResult = objDao2.fnczeroCount(TimeStanp,GID,objdb);

    	if (strResult.contains("Error")) {
    		//受注ゼロ点処理失敗時
    		fncRegNewOrder = strResult;		//失敗ログの取得
    		objdb.dbRollback();				//Rollbackの実行
    		objdb.dbClose();				//Closeの実施
    		return fncRegNewOrder;
    	}

    	//受注基本情報Insert
    	strResult ="";
    	//受注基本情報テーブルのInsert処理
    	strResult = objDao2.fncRegOrderStandard(TimeStanp, UpDate, aryTorihiki,GID,objdb);
    	if (strResult.contains("Error")) {
    		//受注基本情報テーブルのInsert処理失敗時
    		fncRegNewOrder = strResult;		//失敗ログの取得
    		objdb.dbRollback();				//Rollbackの実行
    		objdb.dbClose();				//Closeの実施
    		return fncRegNewOrder;
    	}

    	//作成した受注基本情報から受注ＮＯを取得する
    	//初期化
    	strResult ="";
    	OrderNO = objDao2.fncGetOrderNo(TimeStanp, UpDate, GID,objdb);
    	if(OrderNO.contains("Error")) {
    		//エラー発生時
    		fncRegNewOrder = OrderNO;		//失敗ログの取得
    		objdb.dbRollback();				//Rollbackの実行
    		objdb.dbClose();				//Closeの実施
    		return fncRegNewOrder;
    	}

    	//受注例外情報の作成
    	//初期化
    	strResult ="";
    	if (aryTorihiki[8].equals("1")) {
    		//送付先フラグが１の場合
    		strResult = objDao2.fncRegOrderException(TimeStanp, OrderNO, aryTorihiki, GID,objdb);
        	if (strResult.contains("Error")) {
        		//受注基本情報テーブルのInsert処理失敗時
        		fncRegNewOrder = strResult;		//失敗ログの取得
        		objdb.dbRollback();				//Rollbackの実行
        		objdb.dbClose();				//Closeの実施
        		return fncRegNewOrder;
        	}
    	}

    	//受注商品情報の作成
    	//商品情報を分解して配列化する

    	//変数の設定
    	int cc = 0;
    	s_id.clear();
    	order_count.clear();
    	TotalOrder.clear();

    	for (int i=0;i<aryShohin.length;i++) {
    		switch(cc){
    			case 0:
    				s_id.add(aryShohin[i]);
    				cc++;
    				break;
    			case 1:
    				cc++;
    				break;
    			case 2:
    				order_count.add(aryShohin[i]);
    				cc = 0;
    				break;
    		}
    	}

    	//項目順に値を並び替える
    	for (int i=0 ; i < s_id.size(); i++) {
    		TotalOrder.add(s_id.get(i));
    		TotalOrder.add(order_count.get(i));
    	}

    	//初期化
    	strResult ="";
    	strResult = objDao2.fncRegOrderProducts(TimeStanp, OrderNO, TotalOrder, UpDate, GID,objdb);
    	if (strResult.contains("Error")) {
    		//受注基本情報テーブルのInsert処理失敗時
    		fncRegNewOrder = strResult;		//失敗ログの取得
    		objdb.dbRollback();				//Rollbackの実行
    		objdb.dbClose();				//Closeの実施
    		return fncRegNewOrder;
    	}

    	//終了処理
    	objdb.dbCommit();
    	objdb.dbClose();

    	fncRegNewOrder = "受注番号：" + TimeStanp + "-" + OrderNO + "にて注文を登録しました。";
		return fncRegNewOrder ;

	}

}
