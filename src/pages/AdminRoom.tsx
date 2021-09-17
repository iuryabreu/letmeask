import React, { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import logoImg from '../assets/images/logo.svg';

import '../styles/room.scss';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { auth, database } from '../services/firebase';
import { Question } from '../components/Questions';
import { UseRoom } from '../hooks/useRoom';

type RoomParams = {
  id: string;
};

export const AdminRoom: React.FC = () => {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('');
  const roomId = params.id;
  const { questions, title } = UseRoom(roomId);

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === '') {
      return;
    }

    if (!user) {
      throw new Error('Voce precisa estar logado');
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion('');
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="logotipo" />
          <div>
            <RoomCode code={roomId} />
            <Button>Encerrar Sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length === 1 ? (
            <span>1 pergunta</span>
          ) : (
            <div>
              {questions.length > 0 && (
                <span>{questions.length} perguntas</span>
              )}
            </div>
          )}
        </div>

        {/* <form onSubmit={handleSendQuestion}>
          <textarea
            onChange={(event) => setNewQuestion(event.target.value)}
            placeholder="Escreva sua pergunta"
            value={newQuestion}
          />

          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta, <button>faça seu login</button>.
              </span>
            )}
            <Button type="submit" disabled={!user || newQuestion.length === 0}>
              Enviar pergunta
            </Button>
          </div>
        </form> */}
        {questions.map((question) => (
          <div className="question-list">
            <Question
              key={question.id}
              content={question.content}
              author={question.author}
            />
          </div>
        ))}
      </main>
    </div>
  );
};
