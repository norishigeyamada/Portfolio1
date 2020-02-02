package GU_Java;

import COMMON.comJAVA;	//Java共通クラス
import dao.ComDAO1;		//DAOクラス１

public class GU0011_20_Act {
	//変数の生成場所
	ComDAO1 objDao1 = new ComDAO1();									//DAOクラス１インスタンス生成
	GU0011_20_SQL objGU0011_20_SQL = new GU0011_20_SQL();		//SQLクラスインスタンス生成
	String sqlSelect = objGU0011_20_SQL.sqlSelect(); 			//ここにSelect文を入れる
	String sqlSelectCount = objGU0011_20_SQL.sqlSelectCount(); 	//ここにSelectCount文を入れる
	String sqlFrom= objGU0011_20_SQL.sqlFrom();					//ここにFrom句を入れる
	String sqlWhere = "" ;								//ここにWhere句を入れる

	public String fncSerchShohin(String reqData){

		//取引先の情報を取得して返す関数
		//reqDataを分解する
		int intflg = 0 ;
		comJAVA objComJava = new comJAVA();
		String[] reqAryData = objComJava.fncDecompose(reqData); //Where句の条件を抽出する。
		if (!reqAryData[0].equals("none")) {
			if(intflg == 0) {
				sqlWhere += "Where s_id = '" + reqAryData[0] + "' ";
				intflg++;
			} else {
				sqlWhere += "AND s_id = '" + reqAryData[0] + "' ";
			}
		}
		if (!reqAryData[1].equals("none")) {
			if(intflg == 0) {
				sqlWhere += "Where s_name LIKE '%" + reqAryData[1] + "%' ";
				intflg++;
			} else {
				sqlWhere += "AND s_name LIKE '%" + reqAryData[1] + "%' ";
			}
		}

		//where句追加処理。Limitを追加する（最大50件）
		sqlWhere += "LIMIT 50 ";
		//Daoでの処理の実行
		String objResult = objDao1.selectSQL(sqlSelect, sqlSelectCount, sqlFrom, sqlWhere);

		//処理した結果を返す
		return objResult;

	}

}
