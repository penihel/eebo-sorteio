import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sorteio',
  templateUrl: './sorteio.component.html',
  styleUrls: ['./sorteio.component.scss'],
})
export class SorteioComponent implements OnInit {
  participantesTextArea!: string;
  @Input('titulo') titulo: string = 'P';
  participantesLines() {
    return this.participantesTextArea?.split(/[\r\n]+/).filter((m) => m);
  }
  quantidadeParticipantesLines() {
    return this.participantesLines()?.length;
  }

  participantesSorteados: any[] = [];
  removerParticipanteSorteado(item: any) {
    var index = this.participantesSorteados.findIndex(
      (p) => p.nome == item.nome
    );

    if (index >= 0) {
      this.participantesSorteados.splice(index, 1);
    }

    localStorage.setItem(
      this.titulo + '_participantesSorteados',
      JSON.stringify(this.participantesSorteados)
    );
  }

  ngOnInit(): void {
    var storageParticipatnes = localStorage.getItem(
      this.titulo + '_participantes'
    );
    if (storageParticipatnes) {
      this.participantesTextArea = JSON.parse(storageParticipatnes);
    }

    var storageParticipatnesSortados = localStorage.getItem(
      this.titulo + '_participantesSorteados'
    );
    if (storageParticipatnesSortados) {
      this.participantesSorteados = JSON.parse(storageParticipatnesSortados);
    }
  }
  toArrayParticipantes(value: string) {
    this.participantesTextArea = value;

    localStorage.setItem(
      this.titulo + '_participantes',
      JSON.stringify(this.participantesTextArea)
    );
  }

  ultimoParticipanteSorteado!: string;
  sortearParticipante() {
    var lines = this.participantesLines();
    var indexSorteado = -1;
    var jasorteado = false;
    do {
      indexSorteado = Math.floor(Math.random() * lines.length);
      var participante = lines[indexSorteado];

      jasorteado = this.participantesSorteados.find(
        (p) => p.nome == participante
      );
    } while (jasorteado);

    this.ultimoParticipanteSorteado = participante.replace('\t', '<br>');

    this.participantesSorteados.unshift({ nome: participante });

    localStorage.setItem(
      this.titulo + '_participantesSorteados',
      JSON.stringify(this.participantesSorteados)
    );
  }
}
