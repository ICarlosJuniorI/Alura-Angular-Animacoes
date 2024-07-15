import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { Tarefa } from '../interface/tarefa';

@Injectable({
  providedIn: 'root',
})
export class TarefaService {
  private readonly API = 'http://localhost:3000/tarefas';

  /*
    BehaviorSubject é uma variante do subject (subject pode atuar como um
    observable, emitindo eventos, e também como um observer, captando eventos)
    que requer um valor inicial e emite seu valor atual sempre que é inscrito.
  */
  private tarefasSubject = new BehaviorSubject<Tarefa[]>([]);

  // Cria um novo observable cuja fonte de dados é o subject
  tarefas$ = this.tarefasSubject.asObservable();

  constructor(private http: HttpClient) {}

  listar(): void {
    let params = new HttpParams().appendAll({
      _sort: 'id',
      _order: 'desc',
    });

    this.http.get<Tarefa[]>(this.API, { params }).subscribe((tarefas) => {
      // Pega os valores do subject e passa para a variável tarefasTemporarias
      let tarefasTemporarias = this.tarefasSubject.getValue();
      // Concatena as tarefas recebidas da requisição com as tarefasTemporarias
      tarefasTemporarias = tarefasTemporarias.concat(tarefas);
      // Emite o valor atualizado
      this.tarefasSubject.next(tarefasTemporarias);
    });
  }

  criar(tarefa: Tarefa): void {
    this.http.post<Tarefa>(this.API, tarefa).subscribe((novaTarefa) => {
      const tarefas = this.tarefasSubject.getValue();
      // Adiciona a nova tarefa na primeira posição do array de tarefas
      tarefas.unshift(novaTarefa);
      // Emite os novos valores
      this.tarefasSubject.next(tarefas);
    });
  }

  editar(tarefa: Tarefa, atualizarSubject: boolean): void {
    const url = `${this.API}/${tarefa.id}`;
    this.http.put<Tarefa>(url, tarefa).subscribe((tarefaEditada) => {
      if (atualizarSubject) {
        const tarefas = this.tarefasSubject.getValue();
        // Pega o indice da tarefa
        const index = tarefas.findIndex(
          (tarefa) => tarefa.id === tarefaEditada.id
        );
        // Se o id foi encontrado
        if (index !== -1) {
          tarefas[index] = tarefaEditada;
          this.tarefasSubject.next(tarefas);
        }
      }
    });
  }

  excluir(id: number): void {
    const url = `${this.API}/${id}`;
    this.http.delete<Tarefa>(url).subscribe(() => {
      const tarefas = this.tarefasSubject.getValue();
      const index = tarefas.findIndex((tarefa) => tarefa.id === id);
      if (index !== -1) {
        tarefas.splice(index, 1);
        this.tarefasSubject.next(tarefas);
      }
    });
  }

  buscarPorId(id: number): Observable<Tarefa> {
    const url = `${this.API}/${id}`;
    return this.http.get<Tarefa>(url);
  }

  atualizarStatusTarefa(tarefa: Tarefa): void {
    tarefa.statusFinalizado = !tarefa.statusFinalizado;
    this.editar(tarefa, false);
  }
}
