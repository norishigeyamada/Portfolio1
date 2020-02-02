package COMMON;

public class comJAVA {
	comWords objcomWords = new comWords();

	//comSLTによるDecomposeを行う
	public String[] fncDecompose(String reqData) {
		String comSLT = "";
		comSLT = objcomWords.comSLT();
		String[] resData = reqData.split(comSLT,-1);
		return resData;
	}

	//comSLTによるDecomposeを行う
	public String[] fncDecompose2(String reqData) {
		String comSLT2 = "";
		comSLT2 =objcomWords.comSLT2();
		String[] resData = reqData.split(comSLT2,-1);
		return resData;
	}

}
