package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import GU_Java.GU0011_20_Act;

/**
 * Servlet implementation class GU0011_10_Servlet
 */
@WebServlet("/GU0011_20_servlet")
public class GU0011_20_servlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	//関数の登録
	String fncSerchTorihiki ="fncSerchTorihiki";	//取引先検索


	/**
     * @see HttpServlet#HttpServlet()
     */
    public GU0011_20_servlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//初期設定
		//パラメータ取得
		String reqAct = request.getParameter("reqAct");
		String reqData = request.getParameter("reqData");

		//インスタンス生成
		GU0011_20_Act objGU0011_20_Act = new GU0011_20_Act();

		//変数の生成
		String strRes=""; //取得結果

		//response設定
		response.setContentType("text/html; charset=UTF-8");
		PrintWriter objPWRes=response.getWriter();

		//ここから各処理の実施を行う
		switch(reqAct) {
		case "fncSerchShohin":
			strRes = objGU0011_20_Act.fncSerchShohin(reqData);
			objPWRes.print(strRes);
			break;

		default:
			objPWRes.print("Error:リクエスト処理エラー");
		}

	}

}
