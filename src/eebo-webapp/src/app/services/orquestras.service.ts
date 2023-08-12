import { Injectable } from '@angular/core';
import { Orquestra } from '../models/orquetra.model';
import { Message, MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class OrquestrasService {
  constructor(private messageService: MessageService) {}

  private _key = '_orquestras';
  getList(): Orquestra[] {
    var v = localStorage.getItem(this._key);

    var r: Orquestra[] = [];

    if (v) {
      r = JSON.parse(v);
    }

    return r;
  }

  adicionar(nome: string) {
    if (!nome) {
      this.messageService.add({
        severity: 'error',
        summary: 'ENBO',
        detail: 'Nome obrigatório',
      });
      return;
    }

    var list = this.getList();

    if (list.findIndex((i) => i.nome == nome) >= 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'ENBO',
        detail: 'Orquestra já cadastrada',
      });

      return;
    }

    list.push({ nome: nome });

    this.save(list);
  }

  remover(item: Orquestra) {
    var list = this.getList();

    var index = list.findIndex((i) => i.nome == item.nome);

    if (index >= 0) list.splice(index, 1);

    this.save(list);
  }

  private save(list: Orquestra[]) {
    localStorage.setItem(this._key, JSON.stringify(list));
  }
}
