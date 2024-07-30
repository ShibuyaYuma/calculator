import React, { useState, useEffect } from 'react';



const Number = () => {
    const [firstDisplay, setFirstDisplay] = useState([]);
    const [secondDisplay, setSecondDisplay] = useState("");
    const [count, setCount] = useState(0);
    const [num, setNum] = useState([]);
    const [ope, setOpe] = useState([]);
    const [resultDisplay, setResultDisplay] = useState(0);
    const [changeOparator, setChangeOperator] = useState(false);

    const clickButton = (text) => {
        console.log(`clickButton: ${text}`); // デバッグ用ログ

        setFirstDisplay((prevTexts) => {
            const newDisplay = [...prevTexts, text.toString()];
            console.log(`firstDisplay updated: ${newDisplay}`); // デバッグ用ログ
            return newDisplay;
        });

        setChangeOperator(false);
    };
    const clearDisplay = () => {
        setFirstDisplay([]);
        setSecondDisplay("");
        setResultDisplay(0);
        setNum([]);
        setOpe([]);
        setCount(0);
        setChangeOperator(false);
    };

    const clickOperator = (operator) => {
        let tempChangeOparator = changeOparator;
        let tempNum = num;
        let tempOpe = ope;
        let tempCount = count;
        let tempFirstDisplay = firstDisplay;
        let tempSecondDisplay = secondDisplay;
        
        if(!tempChangeOparator){
            tempNum = [...tempNum, firstDisplay.join("")]; 
            tempOpe = [...tempOpe, operator];
            tempCount++;
            tempSecondDisplay = [...tempSecondDisplay, firstDisplay.join("") + operator];
            tempFirstDisplay = "";
            tempChangeOparator = true;
        }
        else{
            let temp = "";
            tempOpe[count-1] = operator;
            for(let i = 0 ; i < count ; i++){
                temp = [...temp, tempNum[i] + " " + tempOpe[i]];
                console.log(`tenp = ${temp}`);
            }
            tempSecondDisplay = temp;
        }
        setNum(tempNum);
        setOpe(tempOpe);
        setCount(tempCount);
        setFirstDisplay(tempFirstDisplay);
        setSecondDisplay(tempSecondDisplay);
        setChangeOperator(tempChangeOparator);
    }

    const clickResult = () => {
        if(!changeOparator){
            num[count] = +firstDisplay.join("");
            let tempResult = +num[0];
            for (let i=0 ; i <= count - 1 ; i++){
                if(ope[i] === "+"){
                    tempResult += +num[i+1];
                }
                if(ope[i] === "-"){
                    tempResult -= +num[i+1];
                }
                if(ope[i] === "*"){
                    tempResult *= +num[i+1];
                }
                if(ope[i] === "/"){
                    if(num[i+1] === 0){
                        tempResult = "Error";
                    }
                    else{
                        tempResult /= +num[i+1];
                    }
                }
            }
            setResultDisplay(tempResult);
            console.log(`tempResult = ${tempResult}`);
            console.log(`result = ${resultDisplay}`);
            setFirstDisplay([]);
            setSecondDisplay([]);
            setNum([]);
            setOpe([]);
            setCount(0);
        }
        else{
            alert("error");
        }
    }

    useEffect(() => {
        const handleKeyPress = (event) => {
          const key = event.key;
          if (/[0-9]/.test(key)) {
            clickButton(+key);
          } else if (["+", "-", "*", "/"].includes(key)) {
            clickOperator(key);
          } else if (key === "Enter") {
            clickResult();
          } else if (key === "Escape") {
            clearDisplay();
          }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => {
        window.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

    return(
        <div className="text-center">
            <div
                className='min-h-40 border-solid border-2 border-black'
            >
                <h1
                    className='text-4xl font-bold'
                >
                    {resultDisplay}
                </h1>
                <h1
                    className='text-xl'
                >
                    {secondDisplay}
                </h1>
                <h1
                    className='text-2xl'
                >
                    {firstDisplay}
                </h1>
            </div>
            <div className="grid grid-cols-4 max-w-48 mx-auto mt-6">
                <div className='col-span-2'></div>
                <button 
                    type="button" 
                    className="w-12 h-12 bg-gray-300 border-solid border-2 border-black p-2 rounded-md hover:bg-gray-400 hover:text-white"
                    onClick={() => clearDisplay()}
                >CE</button>
                <button 
                    type="button" 
                    className="w-12 h-12 bg-gray-300 border-solid border-2 border-black p-2 rounded-md hover:bg-gray-400 hover:text-white"
                    onClick={() => clickOperator("/")}
                >/</button>
                <button 
                    type="button" 
                    className="w-12 h-12 bg-gray-300 border-solid border-2 border-black p-2 rounded-md hover:bg-gray-400 hover:text-white"
                    onClick={() => clickButton(7)}
                >7</button>
                <button 
                    type="button" 
                    className="w-12 h-12 bg-gray-300 border-solid border-2 border-black p-2 rounded-md hover:bg-gray-400 hover:text-white"
                    onClick={() => clickButton(8)}
                >8</button>
                <button 
                    type="button" 
                    className="w-12 h-12 bg-gray-300 border-solid border-2 border-black p-2 rounded-md hover:bg-gray-400 hover:text-white"
                    onClick={() => clickButton(9)}
                >9</button>
                <button 
                    type="button" 
                    className="w-12 h-12 bg-gray-300 border-solid border-2 border-black p-2 rounded-md hover:bg-gray-400 hover:text-white"
                    onClick={() => clickOperator("*")}
                >*</button>
                <button 
                    type="button" 
                    className="w-12 h-12 bg-gray-300 border-solid border-2 border-black p-2 rounded-md hover:bg-gray-400 hover:text-white"
                    onClick={() => clickButton(4)}
                >4</button>
                <button 
                    type="button" 
                    className="w-12 h-12 bg-gray-300 border-solid border-2 border-black p-2 rounded-md hover:bg-gray-400 hover:text-white"
                    onClick={() => clickButton(5)}
                >5</button>
                <button 
                    type="button" 
                    className="w-12 h-12 bg-gray-300 border-solid border-2 border-black p-2 rounded-md hover:bg-gray-400 hover:text-white"
                    onClick={() => clickButton(6)}
                >6</button>
                <button 
                    type="button" 
                    className="w-12 h-12 bg-gray-300 border-solid border-2 border-black p-2 rounded-md hover:bg-gray-400 hover:text-white"
                    onClick={() => clickOperator("-")}
                >-</button>
                <button 
                    type="button" 
                    className="w-12 h-12 bg-gray-300 border-solid border-2 border-black p-2 rounded-md hover:bg-gray-400 hover:text-white"
                    onClick={() => clickButton(1)}
                >1</button>
                <button 
                    type="button" 
                    className="w-12 h-12 bg-gray-300 border-solid border-2 border-black p-2 rounded-md hover:bg-gray-400 hover:text-white"
                    onClick={() => clickButton(2)}
                >2</button>
                <button 
                    type="button" 
                    className="w-12 h-12 bg-gray-300 border-solid border-2 border-black p-2 rounded-md hover:bg-gray-400 hover:text-white"
                    onClick={() => clickButton(3)}
                >3</button>
                <button 
                    type="button" 
                    className="w-12 h-12 bg-gray-300 border-solid border-2 border-black p-2 rounded-md hover:bg-gray-400 hover:text-white"
                    onClick={() => clickOperator("+")}
                >+</button>
                <button 
                    type="button" 
                    className="col-span-3 w-12 h-12 bg-gray-300 border-solid border-2 border-black p-2 rounded-md hover:bg-gray-400 hover:text-white"
                    onClick={() => clickButton(0)}
                >0</button>
                <button 
                    type="button" 
                    className="w-12 h-12 bg-gray-300 border-solid border-2 border-black p-2 rounded-md hover:bg-gray-400 hover:text-white"
                    onClick={() => clickResult("=")}
                >=</button>
                
            </div>
        </div>
    )
}

export default Number;