import styled from 'styled-components'

// An overlay that dims the map and indicates the fire data is being fetched
const LoadingContainer = styled.div`
    width: 100vw;
    height: 100vh;
    user-select: none;
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;
    transition: all 1s ease;
    background: ${props => props.loading ? '#000c' : '#0000'};
    
    #loading-content {
        transition: all 1s ease;
        filter: ${props => !props.loading && 'blur(10px)'};
        opacity: ${props => props.loading ? 1 : 0};
    }
`

const Load = ({ loading }) => {

    return (
        <LoadingContainer loading={loading}>
            <div id='loading-content'>
                <h1>Hold up for a sec</h1>
                <p>Let us get some data</p>
            </div>
        </LoadingContainer>
    )
}

export default Load