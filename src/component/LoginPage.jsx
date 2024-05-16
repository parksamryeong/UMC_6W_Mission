export default function Login() {
    return (
        <div style={{ paddingTop: "0px", display: "flex", flexDirection: "column" }}>
            <h2 style={{ textAlign: "center", paddingTop: "50px", color: "white" }}>로그인페이지</h2>

            <div style={{ display: "flex", flexDirection: "column", padding: "50px" }}>
                <input type="text" style={{ marginLeft: "300px", marginRight: "300px", marginBottom: "30px", borderRadius: "30px", padding: "20px" }} placeholder="아이디" />
                <input type="text" style={{ marginLeft: "300px", marginRight: "300px", marginBottom: "30px", borderRadius: "30px", padding: "20px" }} placeholder="비밀번호" />
                <button type="summit" style={{ marginLeft: "300px", marginRight: "300px", borderRadius: "30px", padding: "20px" }}>로그인</button>
            </div>
        </div>
    )
}