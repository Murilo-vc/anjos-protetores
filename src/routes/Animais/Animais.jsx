import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
export default function Animais() {
  const [animals, setAnimals] = useState(null);
  const [busy, setBusy] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/api/animals");
        setAnimals(data);
      } catch (e) {
        console.error(e);
        alert("Não foi possível carregar o perfil.");
      } finally {
        setBusy(false);
      }
    })();
  }, []);

  const handleAdoptClick = () => {
        window.location.href = '/adocao';
    };

  if (busy)
    return (
      <div className="container">
        <p>Carregando...</p>
      </div>
    );

  return <div className="animal-list">
            {animals.map((animal) => (
                <div 
                    key={animal.id} 
                    className={`list-item`}
                >
                    <div className="dog-card">
                        <div className="dog-image">
                            <img src={animal.image} alt={animal.name} />
                            <div className="dog-overlay">
                                <button className="adopt-me-btn" onClick={handleAdoptClick}>Quero Adotar</button>
                            </div>
                        </div>
                        <div className="dog-info">
                            <h3>{animal.name}</h3>
                            {/* <p><strong>Raça:</strong> {animal.race.name}</p> */}
                            <p><strong>Especie:</strong> {animal.specie.name}</p>
                            <p>{animal.description}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
}