import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';


export default function Popularmovie() {
    const [popularList, setPopularList] = useState([]);
    const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500/";

    const poData = async () => {
        try {
            const response = await axios.get(
                "https://api.themoviedb.org/3/movie/popular?api_key=0a368eaeec11c63d37d2cd0ef86203f8&language=ko-KR"
            );
            setPopularList(response.data.results);
        } catch (error) {
            console.error("Error fetching popular movies:", error);
        }
    };

    useEffect(() => {
        poData();
    }, []);

    const Body = styled.body`
        background-color: #192F60;
    `;

    const AppContainer = styled.div`
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    `;

    const MovieContainer = styled.div`
        width: 250px;
        margin: 16px;
        background-color: #091F92;
        color: white;
        border-radius: 10px;
        box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
        
    `;

    const MovieImage = styled.img`
        max-width: 100%;
    `;

    const MovieInfo = styled.div`
        display: flex;
        padding: 20px;
        justify-content: space-between;
        align-items: center;
    `;

    const MovieTitle = styled.h4`
        margin: 0;
    `;

    const VoteAverage = styled.span`
        margin-left: 10px;
        color: gold;
    `;

    const navigate = useNavigate();
    const onClickMovieItem = (item) => {
        navigate(`/popular/${item.id}`, {
            state: item
        })
    }

    return (
        <Body>
            <AppContainer>
                {popularList.map((item) => (
                    <MovieContainer key={item.id} onClick={() => onClickMovieItem(item)}>
                        <MovieImage src={IMG_BASE_URL + item.poster_path} alt="영화포스터" />
                        <MovieInfo>
                            <MovieTitle>{item.title}</MovieTitle>
                            <VoteAverage>{item.vote_average}</VoteAverage>
                        </MovieInfo>
                    </MovieContainer>
                ))}
            </AppContainer>
        </Body>
    );
}