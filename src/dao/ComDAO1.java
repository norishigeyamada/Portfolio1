package dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ResourceBundle;

//////////////////////////////////////////////////////////////
//		Class名	：DAO1										//
//		概　要	：DBへアクセスして結果を返す				//
//		作成日	：２０１９年１２月１７日					//
//															//
//////////////////////////////////////////////////////////////

public class ComDAO1 {
	//MySQLアクセス情報の取得
    ResourceBundle rb = ResourceBundle.getBundle("comData");
	String url=rb.getString("sqlURL");
    String user = rb.getString("sqlUSER");
    String pass = rb.getString("sqlPASS");

    //検索結果件数を取得する処理
    public String selectSQL(String sqlSelect,String sqlSelectCount,String sqlFrom,String sqlWhere) {
		String strSQL ="";			//SQL格納用
		String resultCount="0";
		String resultCompose="";	//成功時に値を収納する

		try(Connection con=DriverManager.getConnection(url, user, pass)){
			//SlectCountの実行

			//SQL初期化
			strSQL = "";

			strSQL = sqlSelectCount + sqlFrom + sqlWhere + " ;";

			PreparedStatement st=con.prepareStatement(strSQL);
			ResultSet rs=st.executeQuery();

			while(rs.next()) {
				resultCount=rs.getString("selectCount");
			}
			//検索結果が0件であった場合
			if (resultCount.equals("0")) {
				st.close();
				con.close();
				return resultCount;
			}
			//Selectの実行
			//SQL初期化
			strSQL = "";
			//SelectCount
			strSQL = sqlSelect + sqlFrom + sqlWhere + " ;";

			PreparedStatement st2=con.prepareStatement(strSQL);
			rs=st2.executeQuery();
			ResultSetMetaData meta =rs.getMetaData();
			Integer rsCount=meta.getColumnCount();
			String comSLT =rb.getString("comSLT");

			//件数を最初に入れる
			resultCompose += resultCount + comSLT;
			while(rs.next()) {
				for (int i=1;i<=rsCount;i++) {
						resultCompose += rs.getString(meta.getColumnName(i)) + comSLT;
				}
			}
			resultCompose = resultCompose.substring(0, resultCompose.length()-comSLT.length());
			st.close();
			con.close();
			return resultCompose ;

		} catch(SQLException e) {
			//エラー時
			e.printStackTrace();
			return "Error:" + e;
		}
    }
}
