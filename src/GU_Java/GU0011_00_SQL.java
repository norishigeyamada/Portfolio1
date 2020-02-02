package GU_Java;

public class GU0011_00_SQL {
	//変数の設定
	String zeroSql ="";						//受注IDゼロ基準作成用SQL(Insert文)
	String NewOrderInsertSql=""	;			//基本受注情報作成SQL（Insert文)
	String NewOrderExceptionInsertSql="";	//受注例外情報Insert文SQL
	String NewOrderProductsInsertSql="";	//受注商品情報作成SQL(Insert文)
	String sqlSelect = "" ; 				//ここにSelect文を入れる
	String sqlSelectCount = "" ; 			//ここにSelectCount文を入れる
	String sqlFrom="";						//ここにFrom句を入れる

	//SQL文を作成・管理する

	//受注IDゼロ基準作成SQL
	public String zeroSql(String TimeStanp) {
		//値の初期化
		zeroSql ="";
		zeroSql += "INSERT INTO TBJMI0000 ";
		zeroSql += "SELECT * FROM(";
		zeroSql += "SELECT '" + TimeStanp + "'AS A,'0' AS B,'' AS C,'' AS D,'' AS E,'' AS F,'' AS G,'' AS H,'' AS I) AS TMP ";
		zeroSql += "WHERE NOT EXISTS(SELECT * FROM TBJMI0000 WHERE order_id = '" + TimeStanp + "');";
		return zeroSql;
	}


	//受注基本情報Insert文SQL
	public String NewOrderInsertSql(String TimeStanp,String UpDate,String[] aryTorihiki) {
		//値の初期化
		NewOrderInsertSql  ="";
		NewOrderInsertSql +="INSERT INTO TBJMI0000 ";
		NewOrderInsertSql +="VALUES(";
		NewOrderInsertSql +="'" + TimeStanp + "',";
		NewOrderInsertSql +="(SELECT order_no + 1 FROM TBJMI0000 AS T1 WHERE order_id ='" + TimeStanp + "' ";
		NewOrderInsertSql +="ORDER BY order_no DESC LIMIT 1),";
		NewOrderInsertSql +="'"+ aryTorihiki[0] +"',";
		NewOrderInsertSql +="'"+ aryTorihiki[1] +"',";
		NewOrderInsertSql +="'"+ aryTorihiki[8] +"',";
		NewOrderInsertSql +="'"+ aryTorihiki[9] +"',";
		NewOrderInsertSql +="'"+ aryTorihiki[10] +"',";
		NewOrderInsertSql +="'"+ aryTorihiki[11] +"',";
		NewOrderInsertSql +="'"+ UpDate +"'";
		NewOrderInsertSql +=");";
		return NewOrderInsertSql;
	}

	//受注NO取得SQL（SELECT文)
	public String GetOrderNoSql(String TimeStanp,String UpDate) {
		//値の初期化
		String GetOrderNoSql = "";
		GetOrderNoSql += "SELECT order_no FROM TBJMI0000 ";
		GetOrderNoSql += "WHERE ";
		GetOrderNoSql += "order_id ='" + TimeStanp + "' ";
		GetOrderNoSql += "AND ";
		GetOrderNoSql += "datemodification = '" + UpDate + "' ";
		GetOrderNoSql += "LIMIT 1;";

		return GetOrderNoSql;
	}

	//受注例外情報Insert文SQL
	public String NewOrderExceptionInsertSql(String TimeStanp,String OrderNO,String[] aryTorihiki) {
		NewOrderExceptionInsertSql  ="";
		NewOrderExceptionInsertSql +="INSERT INTO TBJSB0000 ";
		NewOrderExceptionInsertSql +="VALUES(";
		NewOrderExceptionInsertSql +="'" + TimeStanp + "',";
		NewOrderExceptionInsertSql +="'" + OrderNO + "',";
		NewOrderExceptionInsertSql +="'"+ aryTorihiki[3] +"',";
		NewOrderExceptionInsertSql +="'"+ aryTorihiki[4] +"',";
		NewOrderExceptionInsertSql +="'"+ aryTorihiki[5] +"',";
		NewOrderExceptionInsertSql +="'"+ aryTorihiki[6] +"',";
		NewOrderExceptionInsertSql +="'"+ aryTorihiki[7] +"'";
		NewOrderExceptionInsertSql +=");";
		return NewOrderExceptionInsertSql;
	}

	//受注商品情報Insert文SQL
	public String NewOrderProductsInsertSql(String TimeStanp,String OrderNO,String UpDate) {
		NewOrderProductsInsertSql  = "";
		NewOrderProductsInsertSql += "INSERT INTO TBJSB0001 ";
		NewOrderProductsInsertSql += "VALUES(";
		NewOrderProductsInsertSql += "(SELECT inc_no + 1 FROM TBJSB0001 AS T1 ORDER BY inc_no DESC LIMIT 1),";
		NewOrderProductsInsertSql += "'" + TimeStanp + "',";
		NewOrderProductsInsertSql += "'" + OrderNO + "',";
		NewOrderProductsInsertSql += "?,?,'0',";
		NewOrderProductsInsertSql += "'" + UpDate +"'";
		NewOrderProductsInsertSql += ")";

		return NewOrderProductsInsertSql;
	}

}
