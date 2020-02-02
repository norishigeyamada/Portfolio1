package COMMON;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.List;
import java.util.ResourceBundle;

public class comSQL {
	//共通定数の設定
    ResourceBundle rb = ResourceBundle.getBundle("comData");
	String URL = rb.getString("sqlURL");
    String USER = rb.getString("sqlUSER");
    String PASS = rb.getString("sqlPASS");


    /////////////////////////////////////
    //関数名：runInsertSQL				//
    //作成日：2020/01/18					//
    //概　要：単一のInsert処理を行う		//
    //戻り値：０＝成功、失敗はそれ以外	//
    //										//
    /////////////////////////////////////


	public String runInsertSQL(String strSQL,String GID) {
		//変数の設定
		String runInsertSQL = "";

		//初期値
		runInsertSQL = "1"; //戻り値（初期値は失敗：１）とする

		//ＤＢへの接続
		try(Connection conn = DriverManager.getConnection(URL, USER, PASS)){
			//AutoCommit解除
			conn.setAutoCommit(false);

			//SQLの実行
			try(PreparedStatement ps = conn.prepareStatement(strSQL)){
				ps.executeUpdate();
				conn.commit();
			} catch (Exception e) {
				conn.rollback();
				runInsertSQL = "Error:runInsertSQLの実行に失敗しました(" + GID + ")";
				return runInsertSQL;
			}
		} catch(Exception e) {
			runInsertSQL = "Error:DBへの接続に失敗しました（" + e + "," + GID + ")";
			return runInsertSQL;
		}
		//成功時
		runInsertSQL = "0";
		return runInsertSQL;
	}

	public String runOneSelect(String strSQL , String selectColumn , String GID) {
		//変数の設定
		String runOneSelect = "1"; //戻り値の初期・変数設定（初期値：1,失敗)

		//ＤＢへの接続
		try(Connection conn = DriverManager.getConnection(URL, USER, PASS)){

			//SQLの実行
			try(PreparedStatement ps = conn.prepareStatement(strSQL)){

				ResultSet rs=ps.executeQuery();

				//Countの取得
				while(rs.next()) {
					runOneSelect = rs.getString(selectColumn);
				}
			} catch (Exception e) {
				runOneSelect = "Error:runOneSelect_SQLの実行に失敗しました(" + GID + ")";
				return runOneSelect;
			}
		}  catch(Exception e) {
			runOneSelect = "Error:DBへの接続に失敗しました（" + e + "," + GID + ")";
			return runOneSelect;
		}
		return runOneSelect;
	}

	public String runCount(String strSQL , String cntColumn , String GID) {
		//変数の設定
		String runCount = "1"; //戻り値の初期・変数設定（初期値：1,失敗)

		//ＤＢへの接続
		try(Connection conn = DriverManager.getConnection(URL, USER, PASS)){

			//SQLの実行
			try(PreparedStatement ps = conn.prepareStatement(strSQL)){

				ResultSet rs=ps.executeQuery();

				//Countの取得
				while(rs.next()) {
					runCount = rs.getString(cntColumn);
				}
			} catch (Exception e) {
				runCount = "Error:runCount_SQLの実行に失敗しました(" + GID + ")";
				return runCount;
			}
		}  catch(Exception e) {
			runCount = "Error:DBへの接続に失敗しました（" + e + "," + GID + ")";
			return runCount;
		}
		return runCount;
	}

	public String runSomeInsert(int ColumnCount,List<String> aryTotal,String strSQL,String GID) {

		//変数の設定
		String runSomeInsert = "1"; //戻り値の初期・変数設定（初期値：1,失敗)
		int cc = 1; 				 //Insert時のgetStringIndex

		//ＤＢへの接続
		try(Connection conn = DriverManager.getConnection(URL, USER, PASS)){
			//AutoCommit解除
			conn.setAutoCommit(false);

			//SQLの実行
			try(PreparedStatement ps = conn.prepareStatement(strSQL)){

				for(int i=0 ; i<aryTotal.size() ; i++ ) {
	                ps.setString(cc,aryTotal.get(i));
	    			cc ++;
	    			if (cc > ColumnCount) {
	    				//カウントが項目の数を超えた場合
	    				//カウントの初期化
	    				cc=1;

	    				//SQL単体の実行
	    				ps.executeUpdate();
	    			}
				}

				conn.commit();

			} catch (Exception e) {
				conn.rollback();
				runSomeInsert = "Error:runSomeInsertの実行に失敗しました(" + GID + ")";
				return runSomeInsert;
			}
		} catch(Exception e) {
			runSomeInsert = "Error:DBへの接続に失敗しました（" + e + "," + GID + ")";
			return runSomeInsert;
		}
		//成功時
		runSomeInsert = "0";
		return runSomeInsert;
	}

}
