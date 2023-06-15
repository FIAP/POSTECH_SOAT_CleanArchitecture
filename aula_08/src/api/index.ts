import { DisciplinaController } from "@controllers/disciplina";
import { EstudanteController } from "@controllers/estudante";
import { MatriculaController } from "@controllers/matricula";
import { Disciplina } from "@entities/disciplina";
import { Estudante } from "@entities/estudante";
import { Matricula } from "@entities/matricula";
import { DbConnection } from "@interfaces/dbconnection";

import { Request, Response } from "express";

export class FaculdadeApp {
  private _dbconnection: DbConnection;

  constructor(dbconnection: DbConnection) {
    this._dbconnection = dbconnection;
  }

  start() {
    const express = require("express");
    const bodyParser = require("body-parser");

    const app = express();
    app.use(bodyParser.json());
    const port = 3000;

    app.get("/estudante", async (req: Request, res: Response) => {
      res.setHeader("Content-type", "application/json");
      const estudantes = await EstudanteController.ObterTodosEstudantes(
        this._dbconnection
      );
      res.send(estudantes);
    });

    app.post("/estudante", async (req: Request, res: Response) => {
      const nomeEstudante: string = req.body.nome;

      await EstudanteController.IncluirEstudante(
        nomeEstudante,
        this._dbconnection
      )
        .then((r) => {
          res
            .status(201)
            .send({ success: true, message: "Registrado com sucesso!" });
        })
        .catch((err) => {
          res.status(400).send({ success: false, message: err });
        });
    });

    app.post("/disciplina", async (req: Request, res: Response) => {
      const nomeDisciplina: string = req.body.nome;

      await DisciplinaController.IncluirDisciplina(
        nomeDisciplina,
        this._dbconnection
      )
        .then(() => {
          res
            .status(201)
            .send({ success: true, message: "Registrado com sucesso!" });
        })
        .catch((err) => {
          res.status(400).send({ success: false, message: err });
        });
    });

    app.get("/disciplina", async (req: Request, res: Response) => {
      res.setHeader("Content-type", "application/json");
      const disciplinas = await DisciplinaController.ObterTodasDisciplinas(
        this._dbconnection
      );
      res.send(disciplinas);
    });

    app.post("/matricula", async (req: Request, res: Response) => {
      // registrar um estudante em uma disciplina
      const estudanteId: number = parseInt(req.body.estudante);
      const disciplinaId: number = parseInt(req.body.disciplina);

      await MatriculaController.MatricularEstudanteEmDisciplina(
        estudanteId,
        disciplinaId,
        this._dbconnection
      )
        .then(() => {
          res.status(201).send({
            success: true,
            message: "Matricula efetuada com sucesso.",
          });
        })
        .catch((err) => {
          res.status(400).send({ success: false, message: err });
        });
    });

    // obter disciplinas de estudante
    app.get("/matricula/estudante/:id", async (req: Request, res: Response) => {
      const estudanteId = parseInt(req.params.id);
      const disciplinas =
        await MatriculaController.ObterDisciplinasPorEstudante(
          estudanteId,
          this._dbconnection
        );
      res.send(disciplinas);
    });

    // obter estudantes de disciplina
    app.get(
      "/matricula/disciplina/:id",
      async (req: Request, res: Response) => {
        const disciplinaId = parseInt(req.params.id);
        const estudantes =
          await MatriculaController.ObterEstudantesPorDisciplina(
            disciplinaId,
            this._dbconnection
          );
        res.send(estudantes);
      }
    );

    app.listen(port, () => {
      console.log(`Faculdade app listening on port ${port}`);
    });
  }
}
