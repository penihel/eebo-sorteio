import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Rodada } from '../models/rodada.model';
import { Orquestra } from '../models/orquetra.model';

@Injectable({
  providedIn: 'root',
})
export class RodadaService {
  constructor(private messageService: MessageService) {}

  private _key = '_rodadas';
  getList(): Rodada[] {
    var v = localStorage.getItem(this._key);

    var r: Rodada[] = [];

    if (v) {
      r = JSON.parse(v);
    }

    return r;
  }

  adicionar(nome: string, orquetras: Orquestra[]) {
    if (!nome) {
      this.messageService.add({
        severity: 'error',
        summary: 'ENBO',
        detail: 'Nome obrigatório',
      });
      return;
    }

    if (!orquetras || !orquetras.length) {
      this.messageService.add({
        severity: 'error',
        summary: 'ENBO',
        detail: 'Selecione ao menos uma orquestra para a rodada',
      });
      return;
    }

    var list = this.getList();

    if (list.findIndex((i) => i.nome == nome) >= 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'ENBO',
        detail: 'Rodada já cadastrada',
      });

      return;
    }

    list.push({ nome: nome, orquestras: orquetras });

    this.save(list);
  }

  remover(item: Rodada) {
    var list = this.getList();

    var index = list.findIndex((i) => i.nome == item.nome);

    if (index >= 0) list.splice(index, 1);

    localStorage.removeItem('rodada-' + item.nome);

    this.save(list);
  }

  private save(list: Rodada[]) {
    localStorage.setItem(this._key, JSON.stringify(list));
  }
}
