import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MovieItem = styled.div`
    text-align: center;
    background-color: #192F60;
    position: relative;
    margin: 10px;
`;

const SearchMovieInfo = styled.div`
    display: flex;
    padding: 10px;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    margin: 0;
`;

const SearchOverViewInfo = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    font-size: 11px;
    background-color: black;
    opacity: 0.7;
    display: ${({ hovered }) => (hovered ? 'flex' : 'none')};
    flex-direction: column;
    padding: 20px;
    p {
        margin-bottom: 12px;
        text-align: left;
    }
    span {
        margin-bottom: 12px;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;


const MainContainer = styled.div`
    text-align: center;
    overflow-y: auto;
    height: 100vh;
`;

const Title = styled.h1`
    font-size: 50px;
    color: white;
`;

const SearchContainer = styled.div`
    text-align: center;
    padding-right: 200px;
    padding-left: 200px;
`;

const SearchInput = styled.input`
    width: 600px;
    height: 40px;
    border-radius: 50px;
`;

const SearchButton = styled.button`
    width: 80px;
    height: 50px;
    border-radius: 50px;
`;

const MovieList = styled.div`
    display: ${({ visible }) => (visible ? 'grid' : 'none')};
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    background-color: #171769;
    overflow-y: auto;
    max-height: 500px;
`;

const LoadingMessage = styled.div`
    color: white;
    text-align: center;
    padding: 50px;
    font-size: 50px;
`;




export default function Main() {
    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hoveredId, setHoveredId] = useState(null);
    const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500/";

    useEffect(() => {
        if (search.trim()) {
            setLoading(true);
            const delaySearch = setTimeout(() => {
                fetchData();
            }, 500);

            return () => clearTimeout(delaySearch);
        } else {
            setLoading(false);
        }
    }, [search]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=0a368eaeec11c63d37d2cd0ef86203f8&language=ko-KR`
            );
            setMovies(response.data.results);
        } catch (error) {
            console.error("Error fetching movies:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        fetchData();
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            setSearch(e.target.value);
        }
    };

    const navigate = useNavigate();
    const onClickMovieItem = (movie) => {
        navigate(`/movie/${movie.id}`, {
            state: movie
        })
    }

    return (
        <MainContainer>
            <h2 style={{ backgroundColor: 'black', color: 'white', padding: '120px', margin: 0, fontWeight: 'bold' }}>Welcome!</h2>
            <Title>Find your movie!</Title>
            <SearchContainer>
                <SearchInput
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} onKeyPress={handleKeyPress}
                />
                <SearchButton onClick={handleSearch}>🔍</SearchButton>
                {loading && search.trim() ? (
                    <LoadingMessage>데이터를 받아오는 중 입니다...</LoadingMessage>
                ) : (
                    <MovieList visible={!loading && movies.length > 0}>
                        {movies.map((movie) => (
                            <MovieItem key={movie.id}
                                onMouseOver={() => setHoveredId(movie.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                onClick={() => onClickMovieItem(movie)}>
                                <img src={IMG_BASE_URL + movie.poster_path} alt={movie.title} style={{ width: '100%' }} />
                                <SearchMovieInfo>
                                    <h3>{movie.title}</h3>
                                    <p>⭐️{movie.vote_average.toFixed(1)}</p>
                                </SearchMovieInfo>

                                <SearchOverViewInfo hovered={hoveredId === movie.id}>
                                    <p>{movie.title}</p>
                                    <span>{movie.overview}</span>
                                </SearchOverViewInfo>
                            </MovieItem>

                        ))}
                    </MovieList>
                )}
            </SearchContainer>
        </MainContainer>
    );
}