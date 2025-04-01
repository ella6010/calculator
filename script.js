const display = document.querySelector(".display"); // 디스플레이 요소 선택
const buttons = document.querySelectorAll("button"); // 모든 버튼 요소 선택

// firstOperand, operator 변수 선언
let firstOperand = null; // 첫 번째 피연산자 (숫자)
let operator = null;  // 선택된 연산자 (+, -, *, / 등)
let newResetDisplay = false; // 연산 후 새로운 숫자를 입력할 준비

/*firstOperand: 계산할 첫 번째 숫자를 저장하는 변수입니다. 초기값은 null로, 아직 입력되지 않았음을 의미합니다.
operator: 사용자가 누른 연산자 (+, -, *, / 등)를 저장하는 변수입니다. 초기값은 null입니다.
newResetDisplay: 이 변수는 계산 흐름을 제어하는 중요한 플래그(flag) 입니다.
false (기본값): 숫자를 누르면 현재 디스플레이 값 뒤에 이어서 표시됩니다.
true: 연산자 버튼을 누르거나 = 계산을 완료한 직후 상태입니다. 이 상태에서 숫자 버튼을 누르면, 
디스플레이 내용이 지워지고 새로운 숫자가 입력되기 시작합니다. */

// 계산 함수
const calculate = (firstOperand, secondOperand, operator) => { // 화살표 함수는 표현식입니다. 언제나 익명입니다.
    let result;

    if (operator === "+") {
        result = firstOperand + secondOperand;
    } else if (operator === "-") {
        result = firstOperand - secondOperand;
    } else if (operator === "*") {
        result = firstOperand * secondOperand;
    } else if (operator === "/") {
        result = secondOperand !== 0 ? firstOperand / secondOperand : "Error";
    } else if (operator === "±") {
        result = -firstOperand;
    } else if (operator === "%") {
        result = firstOperand * (secondOperand / 100);
    } else { 
        result = firstOperand;
    }

    // 소수점 두 자리로 반올림 후 숫자로 반환
    return typeof result === "number" ? Math.round(result * 100) / 100 : result;
};

/* 이 함수는 두 개의 숫자(firstOperand, secondOperand)와 연산자(operator)를 입력받아 계산을 수행하고 결과를 반환합니다.
if/else if 문을 사용하여 operator 값에 따라 덧셈, 뺄셈, 곱셈, 나눗셈, 부호 변경(±), 백분율(%) 계산을 수행합니다.
나눗셈: 0으로 나누는 경우 "Error" 문자열을 반환합니다.
부호 변경(±): firstOperand의 부호만 바꿉니다. (주의: 일반적인 계산기 로직과 약간 다를 수 있습니다. 보통 현재 화면의 숫자를 바꿉니다.)
백분율(%): firstOperand * (secondOperand / 100) 형태로 계산합니다. (주의: 이 역시 계산기마다 구현 방식이 다를 수 있습니다.)
결과 반올림: Math.round(result * 100) / 100을 사용하여 계산 결과가 숫자인 경우 소수점 세 번째 자리에서 반올림하여 두 자리까지만 표시합니다. 
이는 부동 소수점 오류를 줄이는 데 도움이 됩니다. */

// 각 버튼에 클릭 이벤트 리스너를 추가
buttons.forEach((button) => { /* buttons.forEach(...): 앞에서 선택한 모든 버튼(buttons)을 하나씩 순회합니다. */
    button.addEventListener("click", (event) => { /* button.addEventListener("click", ...): 각 버튼에 대해 'click' 이벤트가 발생했을 때 실행될 함수(이벤트 핸들러)를 등록합니다. */
        const clickedButton = event.target; // 클릭한 버튼
        const clickedValue = clickedButton.textContent; // 클릭된 버튼의 텍스트 값 (예: "7", "+", "C")
        let currentDisplay = display.textContent; // 현재 디스플레이 값
        // 버튼이 클릭되었을 때, 클래스가 number인 경우 디스플레이에 값을 표시

        /* 클릭 이벤트가 발생하면, 이벤트 객체(event)에서 실제 클릭된 버튼 요소(event.target)와 그 버튼의 텍스트 내용(textContent)을 가져옵니다.
        현재 디스플레이 값도 currentDisplay 변수에 저장해 둡니다 */

        if (button.classList.contains("number")) {
            if (display.textContent === "0" || newResetDisplay) { 
                // or 연산자 사용해서 두 개의 조건을 평가하여 하나라도 true면 전체 결과가 true, 둘 다 false면 최종 결과도 false
                display.textContent = clickedValue; // 디스플레이가 0일 때는 클릭한 숫자로 변경
                newResetDisplay = false; // 리셋 상태 해제 (이제부터 숫자 추가 모드)                    
            } else {
                display.textContent += clickedValue; // 디스플레이가 0이 아닐 때는 클릭한 숫자가 뒤에 추가
            }
        }

        /* 디스플레이가 "0"이거나, newResetDisplay가 true (연산자 누른 직후 또는 계산 완료 직후)이면, 클릭한 숫자로 디스플레이를 덮어씁니다. 
        그리고 newResetDisplay를 false로 바꿔서 다음 숫자부터는 뒤에 이어 붙이도록 합니다.
        그 외의 경우 (숫자를 계속 입력 중인 경우)에는 클릭한 숫자를 디스플레이 내용 뒤에 추가합니다. */
        
        // C 버튼 클릭 시
        if (clickedValue === "C") {
            display.textContent = "0"; // 디스플레이 초기화
            firstOperand = null;// 첫 번째 피연산자 초기화
            operator = null; // 연산자 초기화
            newResetDisplay = false; // 리셋 상태 해제
        }

        // 소수점 버튼 클릭
        if (clickedValue === ".") {
            // 현재 디스플레이 값에 소수점이 없고, 새로운 숫자를 입력할 준비가 되었을 때만 소수점 추가
            if (currentDisplay.indexOf(".") === -1 && !newResetDisplay) {
                display.textContent += clickedValue; // 소수점 없고, 리셋 상태 아닐 때 추가
            } else if (newResetDisplay) {
                // 새로운 숫자를 입력하려는 상태에서 첫 번째 숫자에 소수점 추가
                display.textContent = "0."; // 리셋 상태면 "0."으로 시작
                newResetDisplay = false; // 리셋 상태 해제
            }
        }

        /* 현재 디스플레이 값에 소수점(.)이 없고(indexOf(".") === -1), newResetDisplay가 false인 경우에만 소수점을 추가합니다 
        (예: "12" -> "12."). 이렇게 하면 "1.2.3"과 같이 소수점이 여러 개 찍히는 것을 방지합니다.
        만약 newResetDisplay가 true인 상태에서 소수점을 누르면 (예: 5 + 누른 후 .), 디스플레이를 "0."으로 설정하여 소수 부분 입력을 시작합니다. 
        그리고 newResetDisplay를 false로 바꿉니다. */

        // 연산자 버튼 클릭 시
        if (button.classList.contains("operator") && clickedValue !== "=" && clickedValue !== ".") { 
            // operator를 = 또는 .이 아닌 경우 실행
            if (firstOperand === null) {
                firstOperand = parseFloat(currentDisplay); // 첫 연산자면 현재 값을 firstOperand로
            } else if (!newResetDisplay) {
                // 연산자 연속 입력 시 (예: 5 + 3 -) 이전 계산 수행
                // 기존에 입력된 숫자와 연산자를 기준으로 계산하고 결과를 디스플레이에 표시
                firstOperand = calculate(firstOperand, parseFloat(currentDisplay), operator);
                display.textContent = firstOperand; // 중간 결과 표시
            }
            operator = clickedValue; // 새로 누른 연산자 저장
            newResetDisplay = true; // true를 설정해, 다음 숫자 입력 시 기존 숫자를 지우고 새롭게 입력되도록 설정
        }

        /* 클래스에 "operator"가 있고, "="나 "."가 아닌 버튼 (즉, +, -, *, / 등)을 눌렀을 때 실행됩니다.
        firstOperand가 null이면 (첫 연산을 시작하는 경우), 현재 디스플레이 값을 parseFloat (문자열을 숫자로 변환)하여 firstOperand에 저장합니다.
        firstOperand에 이미 값이 있고 (else if), newResetDisplay가 false인 경우 (즉, 5 + 3처럼 두 번째 숫자를 입력한 후 다음 연산자 -를 누른 경우), 이전 연산을 먼저 수행합니다. 
        calculate 함수를 호출하여 firstOperand와 현재 디스플레이 값(parseFloat(currentDisplay))을 저장된 operator로 계산하고, 그 결과를 다시 firstOperand에 저장합니다. 그리고 중간 결과를 디스플레이에 보여줍니다.
        어떤 경우든, 마지막에는 현재 클릭한 연산자를 operator 변수에 저장합니다.
        매우 중요: newResetDisplay를 true로 설정합니다. 이는 연산자를 눌렀으므로, 다음에 숫자 버튼을 누르면 디스플레이를 지우고 새로운 숫자를 입력받아야 한다는 신호입니다. */

        // = 버튼 클릭 시 계산 수행
        if (clickedValue === "=") {
            if (firstOperand !== null && operator) { // 첫 번째 숫자와 연산자가 존재할 때만 연산 수행
                let secondOperand = parseFloat(display.textContent); // 두 번째 피연산자
                let result = calculate(firstOperand, secondOperand, operator); // calculate 함수 호출 // 계산 수행
                // 결과 나온 뒤 리셋
                display.textContent = result; // 계산 결과를 display에 출력.
                firstOperand = null; // 상태 초기화 (다음 계산 준비)
                operator = null;
                newResetDisplay = true; // 결과가 표시된 후 새로운 숫자를 입력하면 기존 결과를 지우고 새롭게 입력 // 다음 숫자 입력 시 디스플레이 리셋하도록 설정
            }

            /* firstOperand와 operator가 모두 설정되어 있는 경우에만 (즉, 5 + 3 처럼 계산에 필요한 요소가 다 있는 경우) 계산을 수행합니다.
            현재 디스플레이 값을 parseFloat하여 secondOperand로 가져옵니다.
            calculate 함수를 호출하여 최종 결과를 얻습니다.
            결과를 디스플레이에 표시합니다.
            firstOperand와 operator를 null로 초기화하여 계산을 완료하고 새로운 계산을 시작할 수 있도록 준비합니다. 
            (이 부분 때문에 5 + 3 = 8 + 2 = 와 같은 연속 계산은 바로 되지 않습니다. = 이후 새 계산을 시작해야 합니다.)
            newResetDisplay를 true로 설정합니다. 계산 결과가 표시된 상태에서 사용자가 새 숫자를 입력하면, 기존 결과가 지워지고 새 입력이 시작됩니다. */
        }
    });
});