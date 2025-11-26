'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');

assessmentButton.addEventListener(
  'click',
  function (){
    const userName = userNameInput.value;
  
      /*function () ←これを無名関数という
    無名関数とは、名前のない関数のことで、関数も引数も再利用しないものであれば省略できる。
    () => {} というアロー関数で書くこともできる。

    () =>{
    const userName = userNameInput.value;
    console.log(userName);
    }
    ↑アロー関数で書くとこうなる
  */
  if (userName.length === 0) {
      // 名前が空の時は処理を終了する
      return;
    }
      //このように、特定の処理を終了させるような処理を、ガード句と呼ぶ。

    // 診断結果表示エリアの作成
    resultDivision.innerText = '';
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivision.appendChild(header);
    /*createElementは要素を作成するメソッド
    document.createElement('タグ名');
    で指定したタグの要素を作成する。
    */ 

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivision.appendChild(paragraph);
    /*appendChildは、指定した要素の子要素として追加するメソッド
    親要素.appendChild(子要素);
    で指定した親要素の子要素として、指定した子要素を追加する。
    */
    //ツイートエリアの作成
    tweetDivision.innerText = '';
    const anchor = document.createElement('a');
    const hrefValue =
      'https://twitter.com/intent/tweet?button_hashtag=' +
      encodeURIComponent('あなたのいいところ') +
      '&ref_src=twsrc%5Etfw';
    /*URIはインターネット上などにある情報やサービスを一意に識別するためのデータ形式で、
      Uniform Resource Identifier の略称
      インターネット上の場所に限定したものとして、URL (Uniform Resource Locator の略称)と呼ぶこともある。
      
      https の部分は、URI のスキーム
      twitter.com の部分は、ホスト名
      /intent/tweet の部分は、リソース名
      ? 以降の部分は、クエリ
      と呼ぶ
     */
    anchor.setAttribute('href', hrefValue);
    anchor.setAttribute('class', 'twitter-hashtag-button');
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';

    tweetDivision.appendChild(anchor);


    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivision.appendChild(script);
  }
);

userNameInput.addEventListener(
  'keydown',
  (event) => {
    if(event.code === 'Enter') {
      assessmentButton.dispatchEvent(new Event('click'))
    }
  }
)

/*このように、すでに作られたプログラムの動作や構造を解析することをリバースエンジニアリングという。
 */
const answers = [
  '###userName###のいいところは声です。###userName###の特徴的な声は皆を惹きつけ、心に残ります。',
  '###userName###のいいところはまなざしです。###userName###に見つめられた人は、気になって仕方がないでしょう。',
  '###userName###のいいところは情熱です。###userName###の情熱に周りの人は感化されます。',
  '###userName###のいいところは厳しさです。###userName###の厳しさがものごとをいつも成功に導きます。',
  '###userName###のいいところは知識です。博識な###userName###を多くの人が頼りにしています。',
  '###userName###のいいところはユニークさです。###userName###だけのその特徴が皆を楽しくさせます。',
  '###userName###のいいところは用心深さです。###userName###の洞察に、多くの人が助けられます。',
  '###userName###のいいところは見た目です。内側から溢れ出る###userName###の良さに皆が気を惹かれます。',
  '###userName###のいいところは決断力です。###userName###がする決断にいつも助けられる人がいます。',
  '###userName###のいいところは思いやりです。###userName###に気をかけてもらった多くの人が感謝しています。',
  '###userName###のいいところは感受性です。###userName###が感じたことに皆が共感し、わかりあうことができます。',
  '###userName###のいいところは節度です。強引すぎない###userName###の考えに皆が感謝しています。',
  '###userName###のいいところは好奇心です。新しいことに向かっていく###userName###の心構えが多くの人に魅力的に映ります。',
  '###userName###のいいところは気配りです。###userName###の配慮が多くの人を救っています。',
  '###userName###のいいところはそのすべてです。ありのままの###userName###自身がいいところなのです。',
  '###userName###のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる###userName###が皆から評価されています。'
];
  /*
マルチカーソル機能とは、command＋option＋↓(↑)で複数行を同時に編集できる機能のこと
command+（方向キー）で選択したすべてのカーソルを一括で移動できる
'use strict';とは、宣言後の記述ミスをエラーとして表示してくれる機能を呼び出すための記述
宣言していない変数を使おうとしたときにエラーを出してくれる
今回constという変数を使用してる。letとの違いは、constは再代入ができない変数宣言。（変数ではなく定数）
機能	const	let	var、値の再代入	不可能	可能	可能、変数の再宣言	不可能	不可能	可能、
変数の有効範囲(スコープ)	ブロック	ブロック	関数、となっている。
なので宣言の順番はconst→let→varの順で使うのが望ましい。（verは使わない方が望ましい）
*/ 

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果
 */
/*上のコメントをドックコメントという「/**」で出てくる
今回のはJSDocという書き方
*/ 

function assessment(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfCharCode % answers.length;
  let result = answers[index];

  result = result.replaceAll('###userName###', userName);
  return result;
}
/*replaceAll()関数は
'何かしらの文字列や文章'.replaceAll('置き換える前の文字列', '置き換えた後の文字列');のように使用し、
第1引数の文字列をすべて第2引数の文字列に変換する。
console.log(
  '###userName###のいいところは優しいところです。'.replaceAll('###userName###', '太郎')
);
↑は###userName###'が'太郎'に置き換わる
 */

// テストを行う関数
function test() {
  console.log('診断結果の文章のテスト');

/*console.assertはは第 1 引数には正しいときにtrue、正しくないときにfalseとなるように
テストしたい式を書き、第2引数には第1引数がfalse、つまりテストの結果が正しくなかったときに出したいメッセージを書く。

console.assert(1 + 2 === 4, '数値が一致しません。');
↑は1 + 2 === 4がfalseなので'数値が一致しません。'と表示される。

console.assert(1 + 2 === 3, '数値が一致しません。');
↑は1 + 2 === 3がtrueなので何も表示されない。
*/

  //太郎
  console.log('太郎');
  console.assert(
    assessment('太郎') ===
      '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

  //次郎
  console.log('次郎');
  console.assert(
    assessment('次郎') ===
      '次郎のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる次郎が皆から評価されています。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

  //花子
  console.log('花子');
  console.assert(
    assessment('花子') ===
      '花子のいいところはまなざしです。花子に見つめられた人は、気になって仕方がないでしょう。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );
  
  console.log('診断結果の文章のテスト終了');

  console.log('同じ名前なら、同じ結果を出力することのテスト');

  console.log('太郎');
  console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  )

  console.log('次郎');
  console.assert(
    assessment('次郎') === assessment('次郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  )

  console.log('花子');
  console.assert(
    assessment('花子') === assessment('花子'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  )

  console.log('同じ名前なら、同じ結果を出力することのテスト終了');
}

test();