
//関数：fncDateCheck
//概要：日付なら”yyyymmdd”を返す。日付以外は”１”を返す

function fncDateCheck(strYear,strMonth,strDay){
	//変数の設定
	var varYear = "";
	var varMonth = "";
	var varDay =""

	//何も入っていない時は"1”を返す
	if(strYear == null || strMonth == null || strDay == null){
		return "1";
	}

	//文字を半角化する
	varYear = fncZenkakuToHankaku(strYear);
	varMonth = fncZenkakuToHankaku(strMonth);
	varDay = fncZenkakuToHankaku(strDay);

	//null or 数字でない場合はfalse
	if(varYear == null || isNaN(varYear) ||
			varMonth == null || isNaN(varMonth) ||
			varDay == null || isNaN(varDay)){
		return "1";
	}

	//年,月,日を取得する
	var y = parseInt(varYear);
	var m = parseInt(varMonth) -1;  //月は0～11で指定するため-1しています。
	var d = parseInt(varDay);
	var dt = new Date(y, m, d);

	//判定を実施
	if(y == dt.getFullYear() && m == dt.getMonth() && d == dt.getDate()){
		//すべて満たす時
		//月を0～11から1～12へ変換する
		m ++;

		var y0 = ('000' + y).slice(-4);
	    var m0 = ('0' + m).slice(-2);
	    var d0 = ('0' + d).slice(-2);
	    return y0 + m0 + d0;
	} else {
		//満たさない時
		return "1";
	}
}

//関数：fncBlancCheck
//概要：空白もしくはＮＵＬＬなら”０”を返す。空白以外は”１”を返す
//		スペースで全角・半角のみ入っている場合についても空白とみなす

function fncBlancCheck(strCheck){
	if(strCheck == null){
		return "0";
	} else {
		if(!strCheck.trim()){
			return "0";
		} else {
			return "1";
		}
	}
}

//関数：fncBanWordCheck
//概要：禁止文字が含まれているかチェックを行う。
//		含まれている場合はtrueを返す
function fncBanWordCheck(strCheck){
	var BanWord ="㈱㍾㍽㍼㍻"; 		//禁止文字
	var substr="";					//文字抽出用
	for (i=0;i<BanWord.length;i++){
		//禁止文字を一つだけ抽出する
		substr = BanWord.substring(i,i+1);
		//禁止文字が含まれているかチェックする
		if(strCheck.indexOf(substr) != -1){
			//禁止文字が含まれている場合
			return true;
		}
	}
	//禁止文字が含まれていない場合
	return false;
}

//関数：fncHankakuToZenkaku
//概要：半角を全角に変換する
function fncHankakuToZenkaku(strCheck){
	var zenkakuString="";		//全角変換後
    katakanaFm = new Array(
            'ｱ','ｲ','ｳ','ｴ','ｵ'
            ,'ｶ','ｷ','ｸ','ｹ','ｺ'
            ,'ｻ','ｼ','ｽ','ｾ','ｿ'
            ,'ﾀ','ﾁ','ﾂ','ﾃ','ﾄ'
            ,'ﾅ','ﾆ','ﾇ','ﾈ','ﾉ'
            ,'ﾊ','ﾋ','ﾌ','ﾍ','ﾎ'
            ,'ﾏ','ﾐ','ﾑ','ﾒ','ﾓ'
            ,'ﾔ','ﾕ','ﾖ'
            ,'ﾗ','ﾘ','ﾙ','ﾚ','ﾛ'
            ,'ﾜ','ｦ','ﾝ'
            ,'ｧ','ｨ','ｩ','ｪ','ｫ'
            ,'ｬ','ｭ','ｮ','ｯ'
            ,'､','｡','ｰ','｢','｣','ﾞ','ﾟ'
            ,'ｳﾞ','ｶﾞ','ｷﾞ','ｸﾞ','ｹﾞ','ｺﾞ'
            ,'ｻﾞ','ｼﾞ','ｽﾞ','ｾﾞ','ｿﾞ'
            ,'ﾀﾞ','ﾁﾞ','ﾂﾞ','ﾃﾞ','ﾄﾞ'
            ,'ﾊﾞ','ﾋﾞ','ﾌﾞ','ﾍﾞ','ﾎﾞ'
            ,'ﾊﾟ','ﾋﾟ','ﾌﾟ','ﾍﾟ','ﾎﾟ'
        );
        katakanaTo = new Array(
            'ア','イ','ウ','エ','オ'
            ,'カ','キ','ク','ケ','コ'
            ,'サ','シ','ス','セ','ソ'
            ,'タ','チ','ツ','テ','ト'
            ,'ナ','ニ','ヌ','ネ','ノ'
            ,'ハ','ヒ','フ','ヘ','ホ'
            ,'マ','ミ','ム','メ','モ'
            ,'ヤ','ユ','ヨ'
            ,'ラ','リ','ル','レ','ロ'
            ,'ワ','ヲ','ン'
            ,'ァ','ィ','ゥ','ェ','ォ'
            ,'ャ','ュ','ョ','ッ'
            ,'、','。','ー','「','」','”',''
            ,'ヴ','ガ','ギ','グ','ゲ','ゴ'
            ,'ザ','ジ','ズ','ゼ','ゾ'
            ,'ダ','ヂ','ヅ','デ','ド'
            ,'バ','ビ','ブ','ベ','ボ'
            ,'パ','ピ','プ','ペ','ポ'
        );
	//英数字のみを全角にする
	zenkakuString = strCheck.replace( /[A-Za-z0-9]/g, function(s) {
	    return String.fromCharCode(s.charCodeAt(0) + 65248);
	});
	//カタカナ等全角化する
    for (var key in katakanaFm) {
    	zenkakuString = zenkakuString.replace(new RegExp(katakanaFm[key], 'g'),katakanaTo[key]);
    }
	return zenkakuString;
}


//関数：fncZenkakuToHankaku
//概要：全角を半角に変換する
function fncZenkakuToHankaku(strCheck){
	var hankakuString="";		//半角変換後
    katakanaFm = new Array(
            'ア','イ','ウ','エ','オ'
            ,'カ','キ','ク','ケ','コ'
            ,'サ','シ','ス','セ','ソ'
            ,'タ','チ','ツ','テ','ト'
            ,'ナ','ニ','ヌ','ネ','ノ'
            ,'ハ','ヒ','フ','ヘ','ホ'
            ,'マ','ミ','ム','メ','モ'
            ,'ヤ','ユ','ヨ'
            ,'ラ','リ','ル','レ','ロ'
            ,'ワ','ヲ','ン'
            ,'ァ','ィ','ゥ','ェ','ォ'
            ,'ャ','ュ','ョ','ッ'
            ,'、','。','ー','「','」','”',''
            ,'ヴ','ガ','ギ','グ','ゲ','ゴ'
            ,'ザ','ジ','ズ','ゼ','ゾ'
            ,'ダ','ヂ','ヅ','デ','ド'
            ,'バ','ビ','ブ','ベ','ボ'
            ,'パ','ピ','プ','ペ','ポ','ﾟ'
        );
        katakanaTo = new Array(
            'ｱ','ｲ','ｳ','ｴ','ｵ'
            ,'ｶ','ｷ','ｸ','ｹ','ｺ'
            ,'ｻ','ｼ','ｽ','ｾ','ｿ'
            ,'ﾀ','ﾁ','ﾂ','ﾃ','ﾄ'
            ,'ﾅ','ﾆ','ﾇ','ﾈ','ﾉ'
            ,'ﾊ','ﾋ','ﾌ','ﾍ','ﾎ'
            ,'ﾏ','ﾐ','ﾑ','ﾒ','ﾓ'
            ,'ﾔ','ﾕ','ﾖ'
            ,'ﾗ','ﾘ','ﾙ','ﾚ','ﾛ'
            ,'ﾜ','ｦ','ﾝ'
            ,'ｧ','ｨ','ｩ','ｪ','ｫ'
            ,'ｬ','ｭ','ｮ','ｯ'
            ,'､','｡','ｰ','｢','｣','ﾞ','ﾟ'
            ,'ｳﾞ','ｶﾞ','ｷﾞ','ｸﾞ','ｹﾞ','ｺﾞ'
            ,'ｻﾞ','ｼﾞ','ｽﾞ','ｾﾞ','ｿﾞ'
            ,'ﾀﾞ','ﾁﾞ','ﾂﾞ','ﾃﾞ','ﾄﾞ'
            ,'ﾊﾞ','ﾋﾞ','ﾌﾞ','ﾍﾞ','ﾎﾞ'
            ,'ﾊﾟ','ﾋﾟ','ﾌﾟ','ﾍﾟ','ﾎﾟ',''
        );
	//英数字のみを半角にする
	hankakuString = strCheck.replace( /[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
	    return String.fromCharCode(s.charCodeAt(0) - 65248);
	});
	//カタカナ等半角化する
    for (var key in katakanaFm) {
    	hankakuString = hankakuString.replace(new RegExp(katakanaFm[key], 'g'),katakanaTo[key]);
    }
	return hankakuString;
}

function test3(hoge){
	alert("またまた成功！！！" + hoge + "を頂きました!!!");
}
