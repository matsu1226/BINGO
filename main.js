'use strict'
{
    //---A,BINGOシートの実装
    //---（１）5x5列の配列を作る
    //--- 列にランダムな数字を5個格納するための関数を定義
    function createColumn(col) {
        const source = [];              //格納する5個の数字の選択肢を規定する配列を作成
        for (let i = 0; i < 15; i++) {
            //1...15
            //source[i] = i + 1 + 15 * 0
            //15...30
            //source[i] = i + 1 + 15 * 1
            //31...45
            //source[i] = i + 1 + 15 * 2 
            source[i] = i + 1 + 15 * col;  //source = [col+0, col+1, col+2, …, col+15]の作成
        }

        const column = [];   //列の5個の数字をを格納するための配列を作成
        // column[0] = source.splice(Math.floor ( Math.random() * source.length ), 1)[0]   // array.splice(取り出す要素のインデックス番号n, 取り出す要素の個数m )
        // column[1] = source.splice(Math.floor ( Math.random() * source.length ), 1)[0]   //spliceは新たな配列を作成 => 要素を取り出したいなら、末尾に[0]が必要。
        // column[2] = source.splice(Math.floor ( Math.random() * source.length ), 1)[0]
        // column[3] = source.splice(Math.floor ( Math.random() * source.length ), 1)[0]
        // column[4] = source.splice(Math.floor ( Math.random() * source.length ), 1)[0]
        for (let i = 0; i < 5; i++) {
            column[i] = source.splice(Math.floor(Math.random() * source.length), 1)[0]
        }
        return column;
    }

    //---//作成した5列を格納するための配列を作成
    function createColumns() {
        const columns = [];
        // columns[0] = createColumn(0);   
        // columns[1] = createColumn(1);
        // columns[2] = createColumn(2);
        // columns[3] = createColumn(3);
        // columns[4] = createColumn(4);
        for (let i = 0; i < 5; i++) {
            columns[i] = createColumn(i);
        }
        columns[2][2] = 'FREE!';
        return columns;
    }


    //---（２）（１）のbingo配列を記述
    //---生成した配列bingoのtbody要素内への記述
    function renderBingo(columns) {
        for (let row = 0; row < 5; row++) {             //行を５個生成するforループ
            const tr = document.createElement('tr');    //tr要素の生成の記述を定義 <= const element = document.createElement(tagName)
            for (let col = 0; col < 5; col++) {         //列を５個生成するforループ
                const td = document.createElement('td');  //td要素の生成の記述を定義
                td.textContent = columns[col][row];           //td要素に、columns[0][0]~columns[col][row]を記述／colとrowを入れ替えている点に注意
                tr.appendChild(td);                       //tr要素内の末尾にtd要素を追加
            }
            document.querySelector('tbody').appendChild(tr);    //tbody要素内の末尾にtr要素を追加
        }
    }


    //---（３）（１、２）を実行。
    const columns = createColumns();
    renderBingo(columns);





    //---B,ボタンの実装
    const btn = document.getElementById('btn');         //番号を取得するボタン
    const numBox = document.getElementById('numBox');   //番号記述されるテキストボックス
    let td = document.getElementsByTagName('td');       //tdは25個のランダムな数字を含む配列
    let li = document.getElementsByTagName('li');       //tdは25個のランダムな数字を含む配列
    td[12].style.opacity = 0.3;                         //FREEのマスは最初から選択


    const numList = [];             //numList=[0,1,2,...75]
    for (let i = 0; i < 75; i++) {
        numList[i] = i + 1;
    }

    //btnをクリックするごとに、numListからランダムに取り出した数字をnumBoxに記述
    btn.addEventListener('click', () => {
        numBox.textContent = numList.splice(Math.floor(Math.random() * numList.length), 1);
        //もし、numBox.textContent(btnで表示された数字)がtd[0~25](Sheetのいずれかの数字)と一致したら、
        //該当するtd[i]をopacity:0.3に。
        for (let i = 0; i < 25; i++) {
            if (numBox.textContent === td[i].textContent) {
                td[i].style.opacity = 0.3;
            }
        }
        //もし,li[0~75]のいずれかのtextContent(選択済み番号の要素内容)がnumBox.textContent(btnで表示された数字)と一致したら、
        //該当するli[i]を塗りつぶす。
        for (let i = 0; i < 75; i++) {
            if (numBox.textContent === li[i].textContent) {
                li[i].style.backgroundColor = "gray";
            }
        }
    })

}