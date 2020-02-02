package dao;

import java.util.List;
import java.util.ResourceBundle;

import COMMON.DBControl;
import COMMON.comSQL;
import GU_Java.GU0011_00_SQL;

///////////////////////////////////////////////////////
//		Class名	：ＤＡＯ２									//
//		概　要	：新規注文に関する全ての処理				//
//		作成日	：２０２０年１月１５日						//
//															//
///////////////////////////////////////////////////////

public class ComDAO2 {
	//MySQLアクセス情報の取得
    ResourceBundle rb = ResourceBundle.getBundle("comData");
	String url=rb.getString("sqlURL");
    String user = rb.getString("sqlUSER");
    String pass = rb.getString("sqlPASS");
    String strSql ="" ;
    private GU0011_00_SQL objGU0011_00_SQL;
    private comSQL objcomSQL;
    private DBControl objdb;

    public ComDAO2() {
    	objGU0011_00_SQL=new GU0011_00_SQL();
    	objcomSQL = new comSQL();
    }


    //受注ＩＤゼロ点を作成する
    public String fnczeroCount(String TimeStanp,String GID,DBControl objdb) {
    	//変数の設定
    	String fnczeroCount = "1"; //戻り値の設定（初期値：失敗時の1)
    	strSql = "";

    	//SQLの設定
    	strSql = objGU0011_00_SQL.zeroSql(TimeStanp);

    	//SQLの実行
    	fnczeroCount = objdb.dbInsert(strSql, GID);

    	//処理結果を返す
    	return fnczeroCount;
    }

    //受注基本情報を作成する
    public String fncRegOrderStandard(String TimeStanp,String UpDate,
    		String[] aryTorihiki,String GID,DBControl objdb) {
    	//変数の設定
    	String fncRegOrderStandard = "1";				//戻り値の設定（初期値：１（失敗時））
    	strSql = "";

    	//SQLの設定
    	strSql =objGU0011_00_SQL.NewOrderInsertSql(TimeStanp,UpDate,aryTorihiki);

    	//SQLの実行
    	fncRegOrderStandard = objdb.dbInsert(strSql,GID);

    	//処理結果を返す
    	return fncRegOrderStandard;
    }

    //受注NOを受注基本情報より取得する
    public String fncGetOrderNo(String TimeStanp,String UpDate,String GID,DBControl objdb) {
    	//変数の設定
    	String fncGetOrderNo = "Error";				//戻り値の設定（初期値：１（失敗時））
    	strSql = "";

    	//SQLの設定
    	strSql = objGU0011_00_SQL.GetOrderNoSql(TimeStanp, UpDate);

    	//SQLの実行
    	fncGetOrderNo = objdb.dbSelect(strSql, GID);

    	//処理結果を返す
    	return fncGetOrderNo;
    }

    //受注例外情報を作成する
    public String fncRegOrderException(String TimeStanp,String OrderNO,
    		String[] aryTorihiki,String GID,DBControl objdb) {
    	//変数の設定
    	String fncRegOrderException = "1";				//戻り値の設定（初期値：１（失敗時））
    	strSql = "";

    	//SQLの作成
    	strSql = objGU0011_00_SQL.NewOrderExceptionInsertSql(TimeStanp, OrderNO, aryTorihiki);

    	//SQLの実行
    	fncRegOrderException = objdb.dbInsert(strSql, GID);

    	//処理結果を返す
    	return fncRegOrderException;
    }

    //受注商品情報を作成する
    public String fncRegOrderProducts(String TimeStanp,String OrderNO,
    						List<String> TotalOrder,String UpDate,String GID,DBControl objdb) {
    	//変数の設定
    	String fncRegOrderProducts ="1";					//戻り値の設定（初期値：１（失敗時））
    	strSql = "";

    	//SQLの作成
    	strSql = objGU0011_00_SQL.NewOrderProductsInsertSql(TimeStanp, OrderNO, UpDate);

    	//SQLの実行
    	fncRegOrderProducts = objdb.dbSomeInsert(2, TotalOrder, strSql, GID);

    	//処理結果を返す
    	return fncRegOrderProducts;
    }

}
