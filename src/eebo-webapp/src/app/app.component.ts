import { Component, OnInit } from '@angular/core';
import { Orquestra } from './models/orquetra.model';
import { OrquestrasService } from './services/orquestras.service';
import { ConfirmationService } from 'primeng/api';
import { RodadaService } from './services/rodada.service';
import { Rodada } from './models/rodada.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private confirmationService: ConfirmationService,
    private orquestrasService: OrquestrasService,
    private rodadaService: RodadaService
  ) {}
  nomeNova!: string;
  novaRodada!: string;

  orquestras!: Orquestra[];
  rodadas!: Rodada[];
  selectedOrquestras!: Orquestra[];

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.orquestras = this.orquestrasService.getList();
    this.rodadas = this.rodadaService.getList();
  }

  adicionar() {
    this.orquestrasService.adicionar(this.nomeNova);
    this.list();
  }
  adicionarRodada() {
    this.rodadaService.adicionar(this.novaRodada, this.selectedOrquestras);
    this.list();
  }

  remover(item: Orquestra) {
    this.confirmationService.confirm({
      message: 'Deseja realmente excluir?',
      header: 'Excluir orquestra',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.orquestrasService.remover(item);
        this.list();
      },
    });
  }

  removerRodada(item: Rodada) {
    this.confirmationService.confirm({
      message: 'Deseja realmente excluir?',
      header: 'Excluir Rodada',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.rodadaService.remover(item);
        this.list();
      },
    });
  }
}
