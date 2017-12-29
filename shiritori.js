/**
 * やること
 * ・入力された文字を取得
 * 　・文字チェック isInputEval関数
 * 　　・カタカナだけか？
 * 　　・空文字なら、alert出して再度入力)
  * 　　・前に発言していたら、alert出して再度入力
 * 　　　　入力した文字は配列に入れておいて、重複チェックに使用
 * 
 * ・勝ち負け判定 result関数
 * 　・引数は、「入力した文字」と「ユーザー名（あなた、わたし）」
 * 　・「ン」で終わっていたら「負け」と表示して終了。
 * 
 * ・入力の最後の文字を取得
 * 
 * ・入力の最後の文字(name.slice(-1))をキーに、動物リストから動物名を取得
 * ・使った動物名は削除(const word = array.splice(1, 1) ※wordには取り出した動物名が入る)
 * ・リストが空になったらコンピュータの負け('あ'.length === 0)
 * 　・勝ち負け判定関数に、「ん」を渡す
 * 
 *  * ・動物リスト（ハッシュ）の作成
 * 　データ形式：{ア：[アフリカゾウ,アリクイ]}のような感じ
 *   var animal = {ア:['アフリカゾウ','アリクイ'],イ:['インドゾウ','イタチ']}
 */

(function(){
  'use strict';
  const animalNameInput = document.getElementById('animalName');
  const answerButton = document.getElementById('answer');
  const resetButton = document.getElementById('reset');
  const resultDivided = document.getElementById('resultArea');
  const attentionDivided = document.getElementById('attentionArea');

  let usedAnimalName = []; // 回答済み動物名

  const animalString = {
    ア: 'アリクイ',
    イ: 'イヌ',
    ウ: 'ウサギ',
    エ: 'エリマキトカゲ',
    オ: 'オオカミ',
    カ: 'カンガルー',
    キ: 'キツネ',
    ク: 'クマ',
    ケ: '',
    コ: 'コアラ',
    サ: 'サーバル' ,
    シ: 'シマウマ',
    ス: 'スイギュウ',
    セ: 'セイウチ',
    ソ: '',
    タ: '',
    チ: 'チーター',
    ツ: 'ツル',
    テ: 'テナガザル',
    ト: 'トラ',
    ナ: '',
    ニ: 'ニシキヘビ',
    ヌ: '',
    ネ: 'ネコ',
    ノ: '',
    ハ: 'ハリモグラ',
    ヒ: 'ヒメネズミ',
    フ: 'フェネック',
    ヘ: 'ヘビ',
    ホ: 'ホッキョクグマ',
    マ: 'マングース',
    ミ: 'ミミズク',
    ム: 'ムカデ',
    メ: 'メガネザル',
    モ: 'モモンガ',
    ヤ: 'ヤク',
    ユ: 'ユリカモメ',
    ヨ: '',
    ラ: 'ラマ',
    リ: 'リス',
    ル: 'ルリカケス',
    レ: 'レッサーパンダ',
    ロ: 'ロバ',
    ワ: '',
    ヲ: ''
  };


  /**
   * 指定した要素の子どもを全て除去する
   * @param {HTMLElement} element HTMLの要素
  */
  function removeAllChildren(element){
    while(element.firstChild){
      element.removeChild(element.firstChild);
    }
  }

  /**
   * 指定した要素に
   * @param {HTMLElement} element HTMLの要素
   * @param {string} user ユーザー名
   * @param {string} str 入力する文字
   */
  function addChildren(element, user, str){
    const paragraph = document.createElement('p');
    paragraph.innerText = user + ': ' + str;
    element.appendChild(paragraph);
  }

  /**
   * 入力された文字が正しいか確認
   * @param {string} animalName 動物名
   * @return {boolean} 
   */
  function isInputEval(animalName){
    // 空文字かどうか？
    if(animalName === '') {
      addChildren(attentionDivided, 'PC', 'カタカナで動物の名前を入れてください');
      return false;
    }

    // カタカナのみか？
    if (!animalName.match(/^[\u30A0-\u30FF]+$/)) {
      addChildren(attentionDivided, 'PC', 'カタカナで動物の名前を入れてください');
      return false;
    }

    // 発言したことがあるか？
    for(let name of usedAnimalName){
      if(animalName === name) {
        addChildren(attentionDivided, 'PC', 'その動物名は発言したことがあります');
        return false;
      }
    }
    return true;
  }

  /**
   * 結果を判定する
   * @param {string} animalName 動物名
   * @return {boolean} true:問題なし false:負け
   */
  function isResult(animalName){
    const lastWord = animalName.slice(-1);
    if(!(lastWord === 'ン')){
      addChildren(resultDivided, 'あなた', animalName); // 'ン'で終わらないとき
      usedAnimalName.push(animalName);
      return true;
    } else {
      addChildren(resultDivided, 'PC', 'あなたの負けです'); //'ン'で終わるのとき
      return false;
    }
  }

  /**
   * プログラムの解答
   * @param {string} animalName
   */
  function pgAnswer(animalName){
    const lastWord = animalName.slice(-1);
    const answer = animalString[lastWord];
    if(answer){
      addChildren(resultDivided, 'PC', answer);
      delete animalString[lastWord];
    } else {
      addChildren(resultDivided, 'PC', 'わかりません。私の負けです');
    }
  }




  answerButton.onclick = ()=>{
    removeAllChildren(attentionDivided); // attentionAreaの初期化
    const animalNameAnswer = animalNameInput.value;
    animalNameInput.value = ''; 
 
    if(isInputEval(animalNameAnswer)){
      if(isResult(animalNameAnswer)){
        pgAnswer(animalNameAnswer)
      }
    }
  };

  resetButton.onclick = ()=>{
    location.reload();
  };

  animalNameInput.onkeydown = (event) =>{
    if(event.keyCode === 13){
      answerButton.onclick();
    }
  };




  // テストコード
  console.assert(
    isInputEval('') === false, 
    '[isInputEval]空文字の処理が正しくありません'
  );

  console.assert(
    isInputEval('あ') === false,
    '[isInputEval]カタカナのみかどうかの判定が正しくありません'
  );

  console.assert(
    (usedAnimalName.push('サーバルキャット')) &&
    isInputEval('サーバルキャット') === false,
    '[isInputEval]発言したことがあるかの判定が正しくありません'
  );

  console.assert(
    isResult('ン') === false,
    '[isResult]負けの判定が正しくありません'
  );

  // テストの後片付け
  removeAllChildren(attentionDivided);
  removeAllChildren(resultDivided);
  usedAnimalName = [];

})();

