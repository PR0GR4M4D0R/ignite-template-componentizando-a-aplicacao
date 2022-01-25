import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Button } from "./Button";

interface ISideBarProps {
  onClickGender(id: number) : void,
  selectedGender: number
}

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function SideBar(props: ISideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => props.onClickGender(genre.id)}
            selected={props.selectedGender === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
