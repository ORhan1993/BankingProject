import CreateUser from './components/CreateUser';

function App() {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', padding: '20px' }}>
            <h1>Bankacılık Uygulaması</h1>
            <hr />

            {/* Oluşturduğumuz bileşeni buraya ekliyoruz */}
            <CreateUser />

        </div>
    )
}

export default App;