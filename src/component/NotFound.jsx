
import { Link } from "react-router-dom";

export default function NotFound() {
    return (

        <div style={{
            color: "white", textAlign: "center", padding: "200px", fontSize: "20px"
        }}>
            <h1>Oops!</h1>
            <h4>예상치 못한 에러가 발생했습니다;(Error)</h4>
            <h4>Not Found</h4>
            <Link to="/"><h3 style={{ color: "white" }}>메인으로 이동하기</h3></Link>
        </ div>

    )
}