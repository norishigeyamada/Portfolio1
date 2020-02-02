package GU_Java;

import dao.ComDAO1;		//DAOクラス１

public class GU0011_10_SQL {
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
		sqlSelect		 +="t1.k_id, ";
		sqlSelect		 +="t1.n_id, ";
		sqlSelect		 +="t2.k_name, ";
		sqlSelect		 +="t1.n_name, ";
		sqlSelect		 +="t1.n_address, ";
		sqlSelect		 +="t1.n_tel, ";
		sqlSelect		 +="t1.n_fax, ";
		sqlSelect		 +="t1.n_mail ";

		return sqlSelect;
	}

	public String sqlSelectCount() {
		//Slect Count
		sqlSelectCount	 ="Select Count(*) as selectCount ";
		return sqlSelectCount;
	}

	public String sqlFrom() {
		//sqlFrom
		sqlFrom			="from nouhin as t1 left outer join kokyaku as t2 on t1.k_id=t2.k_id ";
		return sqlFrom;
	}

}
