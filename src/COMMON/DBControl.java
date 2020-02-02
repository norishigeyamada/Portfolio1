package COMMON;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;


////////////////////////////////////////////////
//DBControl										//
//概要	：DBへの接続やSQLの実行について全ての	//
//     	処理をここで管理する					//
//作成日：2020.01.28								//
///////////////////////////////////////////////

public class DBControl {
	//共通変数の設定
    ResourceBundle rb = ResourceBundle.getBundle("comData");
	String URL = rb.getString("sqlURL");
    String USER = rb.getString("sqlUSER");
    String PASS = rb.getString("sqlPASS");
    comWords objcomWords = new comWords();
    String comSLT = objcomWords.comSLT();
	Connection con = null;								//接続オブジェクト
	List<PreparedStatement> ps = new ArrayList<>();		//PrepareStatment(List)
	List<ResultSet> rs = new ArrayList<>();				//ResultSet(List)
	List<ResultSetMetaData> md = new ArrayList<>();		//MetaData(List)
	List<Integer> rsCount = new ArrayList<>();			//ColumnCount(List)

	//各リストのインデックス番号
	int psCC = 0;
	int rsCC = 0;
	int mdCC = 0;
	int rsCountCC =0;

	//DBへの接続を行う。（AutoCommitはFalseにしておく)
	public String dbcon() {
		//変数の設定
		String dbcon = "1"; //初期値を"1"失敗とする
		try{
			con = DriverManager.getConnection(URL, USER, PASS);
			con.setAutoCommit(false);
			dbcon = "0:dbcon成功";
			return dbcon;
		} catch(Exception e) {
			dbcon = "Error:dbconの実行に失敗しました(" + e + ")";
			return dbcon;
		}
	}

	public String dbSelect(String strSql,String GID) {
		//変数の設定
		String dbSelect ="1";
		try {
			ps.add(con.prepareStatement(strSql));
			rs.add(ps.get(ps.size() -1).executeQuery());
			md.add(rs.get(rs.size() -1).getMetaData());
			rsCount.add(md.get(md.size() -1).getColumnCount());
			dbSelect = "";
			//ResultSetの取得
			while(rs.get(rs.size() -1).next()) {
				//項目の数だけ取得する
				for (int i=1;i<=rsCount.get(rsCount.size() -1);i++) {
					dbSelect += rs.get(rs.size() -1).getString(md.get(md.size() -1).getColumnName(i)) + comSLT;
				}
			}
			dbSelect = dbSelect.substring(0, dbSelect.length()-comSLT.length());
			return dbSelect;
		} catch (SQLException e) {
			// TODO 自動生成された catch ブロック
			dbSelect = "Error:dbSelectの実行に失敗しました(" + e + ":" + GID + ")";
			return dbSelect;
		}
	}

	public String dbInsert(String strSql,String GID) {
		//変数の設定
		String dbInsert ="1";
		try {
			ps.add(con.prepareStatement(strSql));
			ps.get(ps.size()-1).executeUpdate();
			dbInsert = "0:dbInsert成功";
			return dbInsert;
		} catch (Exception e) {
			dbInsert = "Error:dbInsertの実行に失敗しました(" + GID + ")";
			return dbInsert;
		}
	}

	public String dbSomeInsert(int ColumnCount,List<String> aryTotal,String strSql,String GID) {
		//変数の設定
		String dbSomeInsert ="1";
		int cc = 1; 				 //Insert時のgetStringIndex
		try {
			ps.add(con.prepareStatement(strSql));
			for(int i=0 ; i<aryTotal.size() ; i++ ) {
                ps.get(ps.size()-1).setString(cc,aryTotal.get(i));
    			cc ++;
    			if (cc > ColumnCount) {
    				//カウントが項目の数を超えた場合
    				//カウントの初期化
    				cc=1;
    				//SQL単体の実行
    				ps.get(ps.size() -1).executeUpdate();
    			}
			}
			dbSomeInsert = "0:dbSomeInsert成功";
			return dbSomeInsert;
		} catch (Exception e) {
			dbSomeInsert = "Error:dbSomeInsertの実行に失敗しました(" + e + ":" + GID + ")";
			return dbSomeInsert;
		}

	}

	//DB_Rollback
	public String dbRollback() {
		String dbRollback;
		if(con != null) {
			//接続されている時に実施
			try {
				con.rollback();
				dbRollback = "0:dbRollback成功";
				return dbRollback;
			} catch(SQLException e) {
				dbRollback = "Error:DBRollback失敗" + e ;
				return dbRollback;
			}
		}
		dbRollback ="0:dbRollback成功(接続されていません)";
		return dbRollback;
	}

	//DBへのCloseを行う
	public String dbClose() {
		//変数の設定
		String dbClose ="1"; //初期値を"1"失敗とする

		//DB接続Close
		if(con != null) {
			//接続されている時
			try{
				con.close();
			} catch(SQLException e) {
				dbClose ="Error:DBCloseに失敗しました" + e;
				return dbClose;
			}
		}

		//PreparedStatementをClose
		if(ps.size() > 0) {
			for (int i=0;i<ps.size();i++) {
				//PreparedStatementのClose
				try{
					ps.get(i).close();
				} catch(SQLException e) {
					dbClose = "Error:PreparedStatementのClose処理に失敗しました" + e;
					return dbClose;
				}
			}
		}
		dbClose = "0:dbClose成功";
		return dbClose;
	}

	//DBCommit
	public String dbCommit() {
		//変数の設定
		String dbCommit = "1" ; //初期設定値
		if(con != null) {
			try{
				con.commit();
			} catch(SQLException e) {
				dbCommit = "Error:dbCommitのClose処理に失敗しました" + e;
				return dbCommit;
			}
		}
		dbCommit = "0:dbCommit成功";
		return dbCommit;
	}

}
