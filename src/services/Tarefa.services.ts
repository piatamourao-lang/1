import fs from "node:fs";
import path from "node:path";
import { Tarefa } from "@/app/types/tarefa";

const pastaData = path.join(process.cwd(), "data");
const arquivoJson = path.join(pastaData, "tarefas.json");

const dadosIniciais: Tarefa[] = [
  { id: 1, titulo: "Entender requisição GET com fetch", responsavel: "Aluno 1" },
  { id: 2, titulo: "Renderizar array na tabela via DOM", responsavel: "Aluno 2" },
];

export class TarefaService{
  private static lerArquivo(): Tarefa[] {
    if (!fs.existsSync(arquivoJson)) {
      fs.mkdirSync(pastaData, { recursive: true });
      fs.writeFileSync(arquivoJson, JSON.stringify(dadosIniciais, null, 2), "utf-8");
      return dadosIniciais;
    }

    const conteudo = fs.readFileSync(arquivoJson, "utf-8");
    return JSON.parse(conteudo) as Tarefa[];
  }

  static listar(): Tarefa[] {
    return this.lerArquivo();
  }
}