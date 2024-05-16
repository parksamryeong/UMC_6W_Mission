import { useState } from "react"
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('');

    const isAnyFieldEmpty = !name || !email || !age || !password || !confirmPassword;

    //이름 검사
    const nameChange = (event) => {
        setName(event.target.value);
    };

    //이메일 검사
    const emailChange = (event) => {
        setEmail(event.target.value);
    };

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const isEmailInvalid = email.trim() !== '' && !validateEmail(email);

    //나이 검사
    const ageChange = (event) => {
        setAge(event.target.value);
    };

    //비밀번호 검사
    const passwordChange = (event) => {
        setPassword(event.target.value);
    };

    const validatePassword = (password) => {
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{4,12}$/;
        return passwordPattern.test(password);
    };

    const confirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const isPasswordMismatch = password !== '' && confirmPassword !== '' && password !== confirmPassword;

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!isAnyFieldEmpty && !isEmailInvalid && !isPasswordMismatch) {
            console.log("폼 데이터:", { name, email, age, password, confirmPassword });

            alert("가입 성공!");
            navigate("/Login");


        } else {
            console.log("유효성 검사 실패! 폼 데이터는 제출되지 않습니다.");
        }
    };

    return (
        <div style={{ padding: "100px", paddingTop: "0px", display: "flex", flexDirection: "column" }}>
            <h2 style={{ textAlign: "center", color: "white", padding: "30px", fontSize: "30px" }}>회원가입 페이지</h2>
            <div className='input-container' style={{ display: "grid", margin: "300px", marginTop: "20px", justifyContent: "center" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <input type="text" style={{ margin: "10px", borderRadius: "30px", padding: "15px", paddingLeft: "10px", paddingRight: "500px" }} placeholder="이름을 입력해주세요" value={name} onChange={nameChange}></input>
                    {name === '' && <span style={{ color: "red", paddingLeft: "20px", fontSize: "13px" }}>이름을 입력해주세요!</span>}
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <input type="text" style={{ margin: "10px", borderRadius: "30px", padding: "15px", paddingLeft: "10px", paddingRight: "500px" }} placeholder="이메일을 입력해주세요" value={email} onChange={emailChange}></input>
                    {email === '' && <span style={{ color: "red", paddingLeft: "20px", fontSize: "13px" }}>이메일을 입력해주세요!</span>}
                    {isEmailInvalid && <span style={{ color: "red", paddingLeft: "20px", fontSize: "13px" }}>이메일 형식에 맞게 다시 입력해주세요!</span>}
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <input type="text" style={{ margin: "10px", borderRadius: "30px", padding: "15px", paddingLeft: "10px", paddingRight: "500px" }} placeholder="나이를 입력해주세요" value={age} onChange={ageChange}></input>
                    {age === '' && <span style={{ color: "red", paddingLeft: "20px", fontSize: "13px" }}>나이를 입력해주세요!</span>}
                    {age != '' && isNaN(age) && <span style={{ color: "red", paddingLeft: "20px", fontSize: "13px" }}>나이를 숫자로 입력해주세요!</span>}
                    {age != '' && !isNaN(age) && parseInt(age) < 0 && <span style={{ color: "red", paddingLeft: "20px", fontSize: "13px" }}>나이는 음수가 될 수 없습니다!</span>}
                    {age != '' && !isNaN(age) && !Number.isInteger(parseFloat(age)) && <span style={{ color: "red", paddingLeft: "20px", fontSize: "13px" }}>나이는 소수가 될 수 없습니다!</span>}
                    {age != '' && !isNaN(age) && Number.isInteger(parseFloat(age)) && parseInt(age) >= 0 && parseInt(age) < 19 && <span style={{ color: "red", paddingLeft: "20px", fontSize: "13px" }}>19세 이상만 사용 가능합니다!</span>}
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <input type="password" style={{ margin: "10px", borderRadius: "30px", padding: "15px", paddingLeft: "10px", paddingRight: "500px" }} placeholder="비밀번호를 입력해주세요" value={password} onChange={passwordChange}></input>
                    {password == '' && <span style={{ color: "red", paddingLeft: "20px", fontSize: "13px" }}>비밀번호를 입력해주세요!</span>}
                    {password != '' && password.length < 4 && <span style={{ color: "red", paddingLeft: "20px", fontSize: "13px" }}>비밀번호는 4자리 이상이어야 합니다!</span>}
                    {password != '' && password.length > 12 && <span style={{ color: "red", paddingLeft: "20px", fontSize: "13px" }}>비밀번호는 12자리 이하이어야 합니다!</span>}
                    {password != '' && !validatePassword(password) && password.length >= 4 && password.length <= 12 && <span style={{ color: "red", paddingLeft: "20px", fontSize: "13px" }}>비밀번호는 영어, 숫자, 특수문자를 모두 포함해야 합니다!</span>}
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <input type="password" style={{ margin: "10px", borderRadius: "30px", padding: "15px", paddingLeft: "10px", paddingRight: "500px" }} placeholder="비밀번호 확인" value={confirmPassword} onChange={confirmPasswordChange}></input>
                    {confirmPassword == '' && <span style={{ color: "red", paddingLeft: "20px", fontSize: "13px" }}>비밀번호를 다시 입력해주세요!</span>}
                    {confirmPassword !== '' && isPasswordMismatch && <span style={{ color: "red", paddingLeft: "20px", fontSize: "13px" }}>비밀번호가 일치하지 않습니다!</span>}

                </div>

                <div style={{ paddingTop: "30px" }}>
                    <button type="summit" style={{ padding: "20px", borderRadius: "20px", paddingLeft: "315px", paddingRight: "315px" }} disabled={isAnyFieldEmpty} onClick={handleSubmit} >제출하기</button>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "30px" }}>
                    <span>이미 아이디가 있으신가요?</span>
                    <span>로그인 페이지로 이동하기</span>
                </div>
            </div>
        </div >
    )
}