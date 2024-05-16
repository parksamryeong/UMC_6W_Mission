import { useLocation, useParams } from "react-router-dom"
import styled from 'styled-components';
import { useEffect, useState } from "react";
import axios from "axios";

const CreditContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
`;

const CreditImg = styled.img`
    width: 90px;
    height: 90px;
    margin-bottom: 5px;
    border-radius: 50px;
`;

const CreditItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
    
`;

const CreditName = styled.h4`
    font-size: 14px;
    color: white;
    padding-left: 20px;
`;

const CreditH3 = styled.h3`
    color: white;
    text-align: center;
    padding: 20px;
`;

export default function MovieDetail() {
    const { id } = useParams();
    const { state } = useLocation();
    const [creditList, setCreditList] = useState([]);

    const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500/";

    const CreditData = async () => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}/credits?api_key=0a368eaeec11c63d37d2cd0ef86203f8&language=ko-KR`
            );
            setCreditList(response.data.cast);
        } catch (error) {
            console.error("Error fetching Credits:", error);
        }
    };

    useEffect(() => {
        CreditData();
    }, []);

    const backgroundStyle = {
        backgroundImage: `url(${IMG_BASE_URL + state.backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh'

    };

    return (

        <div className="backdrop-container" >
            <div className="page-container" style={backgroundStyle}>
                <div className="content-container" style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
                    <div style={{ display: 'flex', padding: "250px", paddingTop: "50px" }}>
                        <img
                            style={{ width: "300px", height: "450px" }}
                            src={IMG_BASE_URL + state.poster_path} alt="영화포스터이미지" />
                        <div style={{ padding: "50px" }}>
                            <div style={{ fontSize: "30px", color: "white", padding: "10px", paddingLeft: "0px", border: '0px' }}>{state.title}({id})</div>
                            <div style={{ fontSize: "20px", color: "white", padding: "20px", paddingLeft: "0px" }}>평점{state.vote_average}</div>
                            <div style={{ fontSize: "20px", color: "white", padding: "20px", paddingLeft: "0px" }}>개봉일{state.release_date}</div>
                            <div style={{ fontSize: "20px", color: "white", padding: "10px", paddingLeft: "0px" }}>줄거리</div>
                            {state.overview ? (
                                <div style={{ fontSize: "15px", color: "white", padding: "20px", paddingLeft: "0px" }}>{state.overview}</div>
                            ) : (
                                <div style={{ fontSize: "15px", color: "white", padding: "20px", paddingLeft: "0px" }}>줄거리가 없습니다.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <CreditH3>출연자 및 제작진</CreditH3>
            <CreditContainer>
                {creditList.map((item) => (
                    <CreditItem key={item.id}>
                        <CreditImg
                            src={item.profile_path ? IMG_BASE_URL + item.profile_path : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz7ztleRwzXhFdiwBYqZ8cib9RvEsukVVUS3niN1YQ&s"}
                            alt={item.profile_path ? "출연진이미지" : "이미지 없음"}
                        />
                        <CreditName>{item.name}</CreditName>
                    </CreditItem>
                ))}
            </CreditContainer>
        </div>
    )
}