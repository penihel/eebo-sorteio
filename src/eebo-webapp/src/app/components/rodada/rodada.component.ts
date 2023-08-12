import { Component, Input, OnInit } from '@angular/core';
import { Orquestra } from 'src/app/models/orquetra.model';
import { Rodada } from 'src/app/models/rodada.model';
import { RodadaService } from 'src/app/services/rodada.service';

@Component({
  selector: 'app-rodada',
  templateUrl: './rodada.component.html',
  styleUrls: ['./rodada.component.scss'],
})
export class RodadaComponent implements OnInit {
  constructor(private rodadaService: RodadaService) {}
  @Input('rodada') rodada!: Rodada;

  participantesSorteio!: Orquestra[];
  jaSorteadas!: Orquestra[];
  ngOnInit(): void {
    var storageItem = localStorage.getItem('rodada-' + this.rodada.nome);

    if (storageItem) {
      this.rodada = JSON.parse(storageItem);
    }

    this.participantesSorteio = this.rodada.orquestras.filter(
      (o) => o.ordemSorteio === undefined
    );

    this.jaSorteadas = this.rodada.orquestras.filter(
      (o) => o.ordemSorteio !== undefined
    );

    this.jaSorteadas = this.jaSorteadas.sort((a, b) =>
      (a.ordemSorteio || 0) > (b.ordemSorteio || 0) ? -1 : 1
    );
  }
  sortearProxima() {
    var indexSorteado = Math.floor(
      Math.random() * this.participantesSorteio.length
    );

    var sorteada = this.participantesSorteio[indexSorteado];
    this.rodada.proxima = sorteada;

    this.salvarSorteio();
  }

  promoverEmExecucao() {
    var indexSorteado = this.participantesSorteio.findIndex(
      (o) => o.nome == this.rodada.proxima?.nome
    );

    if (indexSorteado < 0) return;

    var sorteada = this.participantesSorteio.find(
      (o) => o.nome == this.rodada.proxima?.nome
    );

    this.participantesSorteio.splice(indexSorteado, 1);

    if (sorteada) {
      sorteada.ordemSorteio = this.jaSorteadas.length + 1;

      this.jaSorteadas.unshift(sorteada);

      this.rodada.emExecucao = sorteada;

      this.sortearProxima();
    }
  }

  desfazerProxima() {
    var indexSorteado = this.jaSorteadas.findIndex(
      (o) => o.nome == this.rodada.emExecucao?.nome
    );

    if (indexSorteado < 0) return;

    var sorteada = this.jaSorteadas.find(
      (o) => o.nome == this.rodada.emExecucao?.nome
    );

    this.jaSorteadas.splice(indexSorteado, 1);

    delete sorteada?.ordemSorteio;
    this.rodada.proxima = sorteada;

    if (sorteada) this.participantesSorteio.push(sorteada);

    this.rodada.emExecucao = undefined;

    if (this.jaSorteadas.length) {
      var ultimaExecucao = this.jaSorteadas[0];

      this.rodada.emExecucao = ultimaExecucao;
    }

    this.salvarSorteio();
  }

  salvarSorteio() {
    localStorage.setItem(
      'rodada-' + this.rodada.nome,
      JSON.stringify(this.rodada)
    );
  }
}
