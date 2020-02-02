package GU_Java;

import dao.ComDAO1;		//DAOクラス１

public class GU0011_20_SQL {
	//変数の生成場所
	ComDAO1 objDao1 = new ComDAO1();			//DAOクラス１インスタンス生成
	String sqlSelect = "" ; 			//ここにSelect文を入れる
	String sqlSelectCount = "" ; 		//ここにSelectCount文を入れる
	String sqlFrom="";					//ここにFrom句を入れる

	//SQL文を作成・管理する
	public String sqlSelect(){
		//SQLの作成
		//Slect
		sqlSelect		 ="Select ";
		sqlSelect		 +="s_id, ";
		sqlSelect		 +="s_name ";

		return sqlSelect;
	}

	public String sqlSelectCount() {
		//Slect Count
		sqlSelectCount	 ="Select Count(*) as selectCount ";
		return sqlSelectCount;
	}

	public String sqlFrom() {
		//sqlFrom
		sqlFrom			="from shohin ";
		return sqlFrom;
	}

}
