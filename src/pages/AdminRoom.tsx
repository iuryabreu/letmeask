import React from "react";
import { useHistory, useParams } from "react-router-dom";

import logoImg from "../assets/images/logo.svg";
import deleteImg from "../assets/images/delete.svg";
import checkImg from "../assets/images/check.svg";
import answerImg from "../assets/images/answer.svg";

import "../styles/room.scss";

import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { Question } from "../components/Questions";
import { UseRoom } from "../hooks/useRoom";
import { database } from "../services/firebase";

type RoomParams = {
  id: string;
};

export const AdminRoom: React.FC = () => {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { questions, title } = UseRoom(roomId);

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que deseja excluir essa pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleHighlightQuestion(
    questionId: string,
    isHighLighted: boolean
  ) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighLighted: !isHighLighted,
    });
  }

  async function handleMarkAsAnseweredQuestion(
    questionId: string,
    isAnswered: boolean
  ) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: !isAnswered,
    });
  }

  async function handleEndRoom() {
    database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push("/");
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="logotipo" />
          <div>
            <RoomCode code={roomId} />
            <Button danger onClick={handleEndRoom}>
              Encerrar Sala
            </Button>
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
        {questions.map((question) => (
          <div className="question-list">
            <Question
              key={question.id}
              content={question.content}
              author={question.author}
              isAwnsered={question.isAnswered}
              isHighLighted={question.isHighLighted}
            >
              {!question.isAnswered && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      handleHighlightQuestion(
                        question.id,
                        question.isHighLighted
                      )
                    }
                  >
                    <img src={answerImg} alt="Destacar pergunta" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleMarkAsAnseweredQuestion(
                        question.id,
                        question.isAnswered
                      )
                    }
                  >
                    <img src={checkImg} alt="Marcar pergunta como respondida" />
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <img src={deleteImg} alt="Remover pergunta" />
              </button>
            </Question>
          </div>
        ))}
      </main>
    </div>
  );
};
