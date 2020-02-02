package GU_Java;

import COMMON.comJAVA;	//Java共通クラス
import dao.ComDAO1;		//DAOクラス１

public class GU0011_10_Act01 {
	//変数の生成場所
	ComDAO1 objDao1 = new ComDAO1();									//DAOクラス１インスタンス生成
	GU0011_10_SQL objGU0011_10_SQL = new GU0011_10_SQL();		//SQLクラスインスタンス生成
	String sqlSelect = objGU0011_10_SQL.sqlSelect(); 			//ここにSelect文を入れる
	String sqlSelectCount = objGU0011_10_SQL.sqlSelectCount(); 	//ここにSelectCount文を入れる
	String sqlFrom= objGU0011_10_SQL.sqlFrom();					//ここにFrom句を入れる
	String sqlWhere = "Where " ;								//ここにWhere句を入れる

	public String fncSerchTorihiki(String reqData){

		//取引先の情報を取得して返す関数
		//reqDataを分解する
		int intflg = 0 ;
		comJAVA objComJava = new comJAVA();
		String[] reqAryData = objComJava.fncDecompose(reqData); //Where句の条件を抽出する。
		if (!reqAryData[0].equals("none")) {
			if(intflg == 0) {
				sqlWhere += "t1.k_id = '" + reqAryData[0] + "' ";
				intflg++;
			} else {
				sqlWhere += "AND t1.k_id = '" + reqAryData[0] + "' ";
			}
		}
		if (!reqAryData[1].equals("none")) {
			if(intflg == 0) {
				sqlWhere += "t2.k_name LIKE '%" + reqAryData[1] + "%' ";
				intflg++;
			} else {
				sqlWhere += "AND t2.k_name LIKE '%" + reqAryData[1] + "%' ";
			}
		}
		if (!reqAryData[2].equals("none")) {
			if(intflg == 0) {
				sqlWhere += "t1.n_name LIKE '%" + reqAryData[2] + "%' ";
				intflg++;
			} else {
				sqlWhere += "AND t1.n_name LIKE '%" + reqAryData[2] + "%' ";
			}
		}

		//Daoでの処理の実行
		String objResult = objDao1.selectSQL(sqlSelect, sqlSelectCount, sqlFrom, sqlWhere);

		//処理した結果を返す
		return objResult;

	}

}
