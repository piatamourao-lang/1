import { NextResponse } from "next/server";
import { TarefaService } from "@/src/services/Tarefa.services";

export async function GET(){
  try {
    const tarefas = TarefaService.listar();
    return NextResponse.json(tarefas, { status: 200 });
  } catch (erro) {
    return NextResponse.json(
      { erro: (erro as Error).message || "Erro ao buscar tarefas." },
      { status: 500 }
    );
  }
}